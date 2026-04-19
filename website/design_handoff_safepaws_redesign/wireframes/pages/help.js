window.SP_PAGES = window.SP_PAGES || {};

(function() {
  const header = `
    <div class="wf-header mb">
      <div class="flex items-center gap-sm"><span class="ic ic-accent">🐾</span><strong class="hand" style="font-size:22px;">SafePaws</strong></div>
      <nav class="wf-nav">
        <a>Решения</a><a style="color:var(--accent);">Как помочь</a><a>Истории</a><a>О нас</a>
        <span class="chip">RU ▾</span><button class="btn btn-sm btn-primary">Скачать</button>
      </nav>
    </div>`;

  window.SP_PAGES.help = function() {
    return `
    <div class="sheet" style="position:relative;">
      <span class="sheet-tag">Help · как помочь</span>
      ${header}
      <div class="mono mb">главная / <span style="color:var(--accent);">как помочь</span></div>

      <h1>Помогать можно по-разному.</h1>
      <p class="mt" style="max-width:560px;">Не у всех есть лобзик. Не у всех есть время. Но у каждого есть хоть что-то. Вот пути.</p>

      <!-- FILTER BY CAPABILITY -->
      <div class="box mt-lg" style="padding:12px 16px;">
        <div class="flex items-center gap flex-wrap">
          <span class="mono">у меня есть:</span>
          <button class="chip chip-accent">всё показать</button>
          <button class="chip">🔨 руки/инструмент</button>
          <button class="chip">🕐 время</button>
          <button class="chip">💸 средства</button>
          <button class="chip">📱 голос/сеть</button>
        </div>
      </div>

      <!-- WAYS TO HELP GRID -->
      <div class="grid g-3 gap mt-lg">
        <!-- BUILD -->
        <div class="box-accent">
          <span class="ic ic-accent ic-lg">🔨</span>
          <h3 class="mt">Собрать домик</h3>
          <p class="small mt">Скачай чертёж, вырежи и установи. Или найди ближайший хакспейс.</p>
          <div class="flex gap-sm mt"><span class="chip">2 часа</span><span class="chip">фанера</span></div>
          <button class="btn btn-sm btn-primary mt">К каталогу →</button>
        </div>
        <!-- PURRTAP -->
        <div class="box-accent">
          <span class="ic ic-accent ic-lg">💧</span>
          <h3 class="mt">Поставить PurrTap</h3>
          <p class="small mt">Простая поилка из бутылки. Инструкция на 1 страницу.</p>
          <div class="flex gap-sm mt"><span class="chip">20 минут</span><span class="chip">бутылка</span></div>
          <button class="btn btn-sm btn-primary mt">Инструкция →</button>
        </div>
        <!-- INSTALL -->
        <div class="box">
          <span class="ic ic-lg">📍</span>
          <h3 class="mt">Забрать готовый</h3>
          <p class="small mt">В 3 городах мы собираем домики партиями — можешь забрать и поставить.</p>
          <div class="flex gap-sm mt"><span class="chip">Минск</span><span class="chip">Брест</span><span class="chip">Гродно</span></div>
          <button class="btn btn-sm mt">Записаться →</button>
        </div>
        <!-- SHARE -->
        <div class="box">
          <span class="ic ic-lg">📣</span>
          <h3 class="mt">Рассказать</h3>
          <p class="small mt">Поделиться в соцсетях, переслать другу с CNC.</p>
          <div class="flex gap-sm mt"><button class="btn btn-sm btn-ghost">Telegram</button><button class="btn btn-sm btn-ghost">VK</button><button class="btn btn-sm btn-ghost">Копировать</button></div>
        </div>
        <!-- STORY -->
        <div class="box">
          <span class="ic ic-lg">✍️</span>
          <h3 class="mt">Добавить историю</h3>
          <p class="small mt">Уже есть домик? Добавь точку на карту и фото. Это мотивирует других.</p>
          <button class="btn btn-sm mt">Форма истории →</button>
        </div>
        <!-- DONATE -->
        <div class="box">
          <span class="ic ic-lg">❤</span>
          <h3 class="mt">Поддержать</h3>
          <p class="small mt">Донат идёт на материалы и раздачу готовых домиков.</p>
          <div class="flex gap-sm mt"><button class="btn btn-sm">PayPal</button><button class="btn btn-sm">карта</button><button class="btn btn-sm">Boosty</button></div>
        </div>
        <!-- TRANSLATE -->
        <div class="box">
          <span class="ic ic-lg">🌐</span>
          <h3 class="mt">Перевести сайт</h3>
          <p class="small mt">Помоги локализовать на другой язык — файлы в GitHub.</p>
          <button class="btn btn-sm mt">Открыть GitHub →</button>
        </div>
        <!-- PARTNER -->
        <div class="box">
          <span class="ic ic-lg">🤝</span>
          <h3 class="mt">Партнёрство</h3>
          <p class="small mt">Хакспейс, приют, компания — готовы сотрудничать.</p>
          <button class="btn btn-sm mt">Написать →</button>
        </div>
        <!-- VOLUNTEER NETWORK -->
        <div class="box-dashed">
          <span class="ic ic-lg">👥</span>
          <h3 class="mt">Сеть волонтёров</h3>
          <p class="small mt">Чат в Telegram, где обсуждаем установки и помогаем новичкам.</p>
          <button class="btn btn-sm mt">Вступить →</button>
        </div>
      </div>

      <!-- BIG CALL -->
      <div class="box-filled mt-xl center">
        <h2>Пока ты читаешь это, на улице –5°C.</h2>
        <p class="mt">Любое действие с этой страницы — шаг в правильную сторону.</p>
        <div class="flex gap justify-center mt"><button class="btn btn-primary">Самое простое: скачать PurrTap</button><button class="btn">Пройти квиз</button></div>
      </div>
    </div>`;
  };
})();
