document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const checkWeatherBtn = document.getElementById('checkWeatherBtn');
    const weatherResultDiv = document.getElementById('weatherResult');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const checkWeatherBtnText = document.getElementById('checkWeatherBtnText');
    const suggestionsListDiv = document.getElementById('suggestionsList');

    // --- ВАШ API КЛЮЧ ЯНДЕКСА ---
    // Важно: Этот ключ будет виден в коде фронтенда.
    // Для большей безопасности можно использовать бэкенд-прокси.
    const MAP_API_KEY = 'b75a34f5-3ac8-454a-be0f-dc7354f0868a';
    const GEOCODE_API_KEY = '2be7449c-8297-478b-ad45-aecb1a526f73';

    let debounceTimer; // Таймер для задержки запроса подсказок

    // --- Обработчик ввода в поле города (для подсказок) ---
    cityInput.addEventListener('input', () => {
        const query = cityInput.value.trim();
        clearTimeout(debounceTimer); // Сбросить предыдущий таймер

        if (query.length < 3) { // Начинаем искать после 2 символов
            clearSuggestions();
            return;
        }

        // Установить новый таймер
        debounceTimer = setTimeout(() => {
            fetchSuggestions(query);
        }, 300); // Задержка 300 мс
    });

    // --- Функция для запроса подсказок (Suggest API) ---
    async function fetchSuggestions(query) {
        // Ограничение bbox (bounding box) - опционально, можно указать границы страны/региона
        // Пример для Мира: &bbox=~-180,-90,180,90
        // Пример для Беларуси: &bbox=~23.17,51.25,32.76,56.17
        const suggestUrl = `https://suggest-maps.yandex.ru/v1/suggest?apikey=${MAP_API_KEY}&text=${encodeURIComponent(query)}&print_address=1&types=locality,province,country`; // Ищем населенные пункты, регионы, страны

        console.log('Fetching suggestions for:', query);

        try {
            const response = await fetch(suggestUrl);
            if (!response.ok) {
                throw new Error(`Suggest API bad response: ${response.status}`);
            }
            const data = await response.json();
            console.log('Suggestions received:', data);

            displaySuggestions(data.results || []);

        } catch (error) {
            console.error('Failed to fetch suggestions:', error);
            clearSuggestions(); // Очистить список в случае ошибки
        }
    }

    // --- Функция для отображения подсказок ---
    function displaySuggestions(suggestions) {
        suggestionsListDiv.innerHTML = ''; // Очистить предыдущие

        if (suggestions.length === 0) {
            suggestionsListDiv.classList.remove('d-block'); // Скрыть, если пусто
            return;
        }

        const ul = document.createElement('ul');
        ul.className = 'list-group list-group-flush'; // Используем Bootstrap классы

        suggestions.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
             // Отображаем основной текст и адрес (если есть)
            li.textContent = item.title.text + (item.address && item.address.formatted_address ? ` (${item.address.formatted_address})` : '');
            li.dataset.fullText = item.title.text; // Сохраняем только название для подстановки

            li.addEventListener('click', () => {
                cityInput.value = li.dataset.fullText; // Подставить выбранный город в инпут
                clearSuggestions(); // Скрыть список
                cityInput.focus(); // Вернуть фокус в инпут (опционально)
            });
            ul.appendChild(li);
        });

        suggestionsListDiv.appendChild(ul);
        suggestionsListDiv.classList.add('d-block'); // Показать список
    }

    // --- Функция для очистки и скрытия списка подсказок ---
    function clearSuggestions() {
        suggestionsListDiv.innerHTML = '';
        suggestionsListDiv.classList.remove('d-block');
    }

    // --- Скрытие подсказок при потере фокуса или клике вне ---
    cityInput.addEventListener('blur', () => {
        // Небольшая задержка перед скрытием, чтобы успел сработать click по подсказке
        setTimeout(clearSuggestions, 150);
    });


    // --- Обработчик клика по кнопке проверки погоды ---
    checkWeatherBtn.addEventListener('click', checkWeather);

    // --- Основная функция проверки погоды ---
    async function checkWeather() {
        const cityName = cityInput.value.trim();
        if (!cityName) {
            displayResultMessage('Please enter a city name.', 'warning');
            return;
        }

        clearSuggestions(); // Скрыть подсказки при проверке
        console.log(`Checking weather for: ${cityName}`);

        // --- UI: Показать загрузку ---
        loadingSpinner.classList.remove('d-none');
        checkWeatherBtnText.textContent = 'Checking...';
        checkWeatherBtn.disabled = true;
        weatherResultDiv.innerHTML = '';
        weatherResultDiv.classList.add('d-none');

        try {
            // --- 1. Геокодирование через HTTP API ---
            const geocodeUrl = `https://geocode-maps.yandex.ru/v1/?apikey=${GEOCODE_API_KEY}&geocode=${encodeURIComponent(cityName)}&format=json&results=1`;
            console.log('Fetching geocode data...');

            let lat, lon, foundCityName;

            try {
                const geocodeResponse = await fetch(geocodeUrl);
                 if (!geocodeResponse.ok) {
                     throw new Error(`Geocode API bad response: ${geocodeResponse.status}`);
                 }
                 const geocodeData = await geocodeResponse.json();
                 console.log('Geocode data received:', geocodeData);

                 // Парсинг ответа геокодера
                 const featureMember = geocodeData.response?.GeoObjectCollection?.featureMember;
                 if (!featureMember || featureMember.length === 0) {
                     throw new Error('CityNotFound');
                 }

                 const geoObject = featureMember[0].GeoObject;
                 const point = geoObject?.Point?.pos; // Координаты в виде "долгота широта"
                 foundCityName = geoObject?.name || cityName; // Используем найденное имя или введенное

                 if (!point) {
                     throw new Error('CoordinatesNotFound');
                 }

                 const coords = point.split(' '); // Разделяем строку "долгота широта"
                 lon = parseFloat(coords[0]); // Долгота
                 lat = parseFloat(coords[1]); // Широта

                 console.log(`Geocoding successful. Lat: ${lat}, Lon: ${lon}, Name: ${foundCityName}`);

            } catch (geoError) {
                console.error('Geocoding failed:', geoError);
                 if (geoError.message === 'CityNotFound' || geoError.message === 'CoordinatesNotFound') {
                     throw new Error('CityNotFound'); // Перебрасываем для общего обработчика
                 } else {
                     throw new Error('GeocodingFailed'); // Общая ошибка геокодинга
                 }
            }

            // --- 2. Запрос погоды с Open-Meteo (логика та же) ---
            const today = new Date();
            let winterYear = today.getFullYear();
            if (today.getMonth() < 2) { // Январь/Февраль
                 winterYear--;
            } else if (today.getMonth() < 11) { // Март-Ноябрь
                 winterYear--;
            }
            // Если Декабрь, winterYear остается текущим

            const startDate = `${winterYear}-12-01`;
            const febLastDay = new Date(winterYear + 1, 2, 0).getDate();
            const endDate = `${winterYear + 1}-02-${febLastDay}`;

            console.log(`Fetching weather for period: ${startDate} to ${endDate}`);
            const openMeteoUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_min&timezone=auto`;
            console.log('Open-Meteo URL:', openMeteoUrl);

            let weatherData;
             try {
                const weatherResponse = await fetch(openMeteoUrl);
                if (!weatherResponse.ok) {
                     throw new Error(`Open-Meteo fetch failed: ${weatherResponse.status}`);
                 }
                 weatherData = await weatherResponse.json();
                 console.log('Open-Meteo response data:', weatherData);
             } catch (fetchError) {
                  console.error('Network or fetch error calling Open-Meteo:', fetchError);
                  throw new Error('FetchWeatherError');
             }

            if (weatherData.error) {
                 console.error("Open-Meteo API returned an error:", weatherData.reason);
                 throw new Error('WeatherApiError');
            }

            if (!weatherData.daily?.temperature_2m_min || weatherData.daily.temperature_2m_min.length === 0) {
                console.error("No temperature data in Open-Meteo response");
                throw new Error('NoWeatherData');
            }

            // --- 3. Расчет средней температуры (логика та же) ---
            const minTemps = weatherData.daily.temperature_2m_min.filter(temp => temp !== null && typeof temp === 'number');
            if (minTemps.length === 0) {
                 console.error("No valid temperature data points found after filtering.");
                 throw new Error('NoValidData');
            }
            const sum = minTemps.reduce((acc, temp) => acc + temp, 0);
            const averageMinTemp = sum / minTemps.length;
            const roundedTemp = Math.round(averageMinTemp * 10) / 10;
            console.log(`Average min temp calculated: ${roundedTemp}°C`);

            // --- 4. Отображение результата (логика та же) ---
            displayWeatherResult(roundedTemp, foundCityName);

        } catch (error) {
            console.error("Error during weather check process:", error);
            let userMessage = 'An unexpected error occurred. Please try again later.';
            if (error.message === 'CityNotFound') {
                 userMessage = 'Could not find coordinates for the specified city. Please check the spelling.';
            } else if (error.message === 'GeocodingFailed') {
                 userMessage = 'Could not contact the location service. Please try again.';
            } else if (error.message === 'FetchWeatherError' || error.message === 'WeatherApiError') {
                userMessage = 'Failed to fetch weather data. Please try again later.';
            } else if (error.message === 'NoWeatherData' || error.message === 'NoValidData') {
                 userMessage = 'Could not retrieve valid historical temperature data for this location.';
            }
            displayResultMessage(userMessage, 'danger');
        } finally {
            // --- UI: Скрыть загрузку ---
            loadingSpinner.classList.add('d-none');
            checkWeatherBtnText.textContent = 'Check Weather';
            checkWeatherBtn.disabled = false;
            console.log('Weather check finished.');
        }
    }

     // --- Функция отображения результата ПОГОДЫ ---
    function displayWeatherResult(temp, city) {
        const threshold = 5;
        let alertClass = temp < threshold ? 'alert-danger' : 'alert-success';
        let message = temp < threshold
            ? `Yes, in ${city} it gets cold (avg winter min: ${temp.toFixed(1)}°C). A TeploDom shelter is definitely needed!`
            : `It's relatively warm in ${city} (avg winter min: ${temp.toFixed(1)}°C). Street kitties might manage, but a shelter still offers comfort and safety!`;
        let buttonClass = temp < threshold ? 'btn-light' : 'btn-dark';

        const resultHTML = `
            <div class="alert ${alertClass} d-flex flex-column flex-sm-row align-items-sm-center justify-content-between" role="alert">
                <div class="mb-2 mb-sm-0 me-sm-3">
                   ${message}
                 </div>
                <a href="https://safepaws.vercel.app/download" class="btn btn-sm ${buttonClass} px-3 flex-shrink-0" role="button" target="_blank">Download Blueprint</a>
            </div>
        `;
        weatherResultDiv.innerHTML = resultHTML;
        weatherResultDiv.classList.remove('d-none');
    }

    // --- Функция для отображения ОБЩИХ сообщений/ошибок ---
    function displayResultMessage(message, type = 'info') {
        const alertClass = `alert-${type}`;
        const resultHTML = `
            <div class="alert ${alertClass}" role="alert">
                ${message}
            </div>
        `;
        weatherResultDiv.innerHTML = resultHTML;
        weatherResultDiv.classList.remove('d-none');
    }

}); // Конец DOMContentLoaded