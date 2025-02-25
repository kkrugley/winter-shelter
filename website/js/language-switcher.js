document.addEventListener('DOMContentLoaded', function () {
  // Функция для получения предпочитаемого языка из браузера/ОС
  function getBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage; // Получаем язык браузера
    const supportedLanguages = ['ru', 'en', 'pl', 'be']; // Поддерживаемые языки

    // Проверяем, поддерживается ли язык браузера
    const langCode = browserLang.split('-')[0]; // Берем только первые две буквы (например, "en" из "en-US")
    return supportedLanguages.includes(langCode) ? langCode : 'ru'; // Если язык не поддерживается, используем "ru"
  }

  // Загрузка предпочитаемого языка из localStorage или установка языка браузера/ОС
  const savedLanguage = localStorage.getItem('preferred-language') || getBrowserLanguage();

  // Инициализация сайта с сохраненным или дефолтным языком
  changeLanguage(savedLanguage);

  // Отметить активную кнопку языка
  highlightActiveLanguage(savedLanguage);

  // Добавление обработчиков на кнопки переключения языка
  const languageButtons = document.querySelectorAll('.language-switcher button');
  languageButtons.forEach(button => {
    button.addEventListener('click', function () {
      const language = this.getAttribute('data-lang');
      changeLanguage(language);
      highlightActiveLanguage(language);

      // Сохранение выбора пользователя в localStorage
      localStorage.setItem('preferred-language', language);

      // Обновление атрибута lang у тега html
      document.documentElement.setAttribute('lang', language);
    });
  });

  /**
   * Изменяет язык всех элементов с атрибутом data-lang-key
   * @param {string} language - Код языка (ru, en, pl, be)
   */
  function changeLanguage(language) {
    const elements = document.querySelectorAll('[data-lang-key]');
    elements.forEach(element => {
      const key = element.getAttribute('data-lang-key');
      if (translations[language] && translations[language][key]) {
        // Для мета-тегов обновляем атрибут content
        if (element.tagName === 'META') {
          element.setAttribute('content', translations[language][key]);
        }
        // Для заголовка страницы
        else if (element.tagName === 'TITLE') {
          element.textContent = translations[language][key];
        }
        // Для остальных элементов обновляем содержимое
        else {
          element.textContent = translations[language][key];
        }
      }
    });

    // Установка атрибута lang у тега html
    document.documentElement.setAttribute('lang', language);
  }

  /**
   * Выделяет активную кнопку языка
   * @param {string} language - Код активного языка
   */
  function highlightActiveLanguage(language) {
    const languageButtons = document.querySelectorAll('.language-switcher button');
    languageButtons.forEach(button => {
      if (button.getAttribute('data-lang') === language) {
        button.classList.remove('btn-outline-secondary');
        button.classList.add('btn-secondary');
      } else {
        button.classList.remove('btn-secondary');
        button.classList.add('btn-outline-secondary');
      }
    });
  }
});