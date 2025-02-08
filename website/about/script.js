// Локализация
const translations = {
    en: {
        greeting: "Hello, World!",
        description: "This is a simple, minimalist page with dark theme and language switching.",
        buttonText: "Switch to Russian"
    },
    ru: {
        greeting: "Привет, мир!",
        description: "Это простая минималистичная страница с темной темой и переключением языка.",
        buttonText: "Переключить на английский"
    }
};

// Элементы DOM
const greeting = document.getElementById("greeting");
const description = document.getElementById("description");
const langSwitchButton = document.getElementById("lang-switch");

// Переменная для текущего языка
let currentLang = "ru";

// Функция для обновления текста
function updateText(lang) {
    greeting.textContent = translations[lang].greeting;
    description.textContent = translations[lang].description;
    langSwitchButton.textContent = translations[lang].buttonText;
}

// Обработчик кнопки
langSwitchButton.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ru" : "en";
    updateText(currentLang);
});

// Инициализация
updateText(currentLang);