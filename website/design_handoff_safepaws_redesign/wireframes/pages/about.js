window.SP_PAGES = window.SP_PAGES || {};

(function() {
  const header = `
    <div class="wf-header mb">
      <div class="flex items-center gap-sm"><span class="ic ic-accent">🐾</span><strong class="hand" style="font-size:22px;">SafePaws</strong></div>
      <nav class="wf-nav">
        <a>Решения</a><a>Как помочь</a><a>Истории</a><a style="color:var(--accent);">О нас</a>
        <span class="chip">RU ▾</span><button class="btn btn-sm btn-primary">Скачать</button>
      </nav>
    </div>`;

  window.SP_PAGES.about = function() {
    return `
    <div class="sheet" style="position:relative;">
      <span class="sheet-tag">About · миссия + автор</span>
      ${header}
      <div class="mono mb">главная / <span style="color:var(--accent);">о проекте</span></div>

      <div class="grid g-2 gap-lg" style="align-items:center;">
        <div>
          <span class="sec-label">миссия</span>
          <h1 class="mt">Добро должно быть <span class="scribble">простым.</span></h1>
          <p class="mt" style="max-width:520px;">SafePaws — открытый проект: чертежи и решения, чтобы любой человек мог с минимальным усилием помочь уличным животным пережить зиму.</p>
          <div class="flex gap-sm mt"><span class="chip">open source</span><span class="chip">CC BY 4.0</span><span class="chip">2023 →</span></div>
        </div>
        <div class="ph" style="min-height:280px;">фото автора / команды</div>
      </div>

      <!-- STATS -->
      <div class="box-filled mt-xl">
        <div class="grid g-4 gap">
          <div><span class="mono">скачиваний</span><h2 style="font-size:36px;">1 200+</h2></div>
          <div><span class="mono">установленных</span><h2 style="font-size:36px;">47</h2></div>
          <div><span class="mono">стран</span><h2 style="font-size:36px;">4</h2></div>
          <div><span class="mono">языков</span><h2 style="font-size:36px;">4</h2></div>
        </div>
      </div>

      <!-- STORY OF PROJECT -->
      <div class="mt-xl">
        <span class="sec-label">история</span>
        <h2 class="mt">Как это началось</h2>
        <div class="grid g-2 gap-lg mt">
          <div>
            <p>В 2023-м Паша сделал один домик для кошек у подъезда. Потом второй. Потом соседи попросили чертёж.</p>
            <p class="mt">Так и появился SafePaws — чтобы чертёж, который уже есть, мог скачать и сделать каждый.</p>
            <p class="mt">Сегодня в проекте 2 модели домиков, поилка PurrTap, и в планах кормушка EDC.</p>
          </div>
          <div class="box">
            <div class="flex gap items-center"><div class="ic ic-lg ic-accent">П</div><div><strong>Паша · автор проекта</strong><p class="xs muted">Брест · делаю это в свободное время</p></div></div>
            <p class="hand mt" style="font-size:20px;">«Привет, я Паша. Если хочется помочь — пиши в Telegram.»</p>
            <div class="flex gap-sm mt"><button class="btn btn-sm">Telegram</button><button class="btn btn-sm btn-ghost">Email</button></div>
          </div>
        </div>
      </div>

      <!-- TIMELINE -->
      <div class="mt-xl">
        <span class="sec-label">хронология</span>
        <h2 class="mt">Шаги проекта</h2>
        <div class="grid g-4 gap mt">
          <div class="box"><span class="mono">2023 · осень</span><p class="mt"><strong>Первый домик</strong></p><p class="xs muted">Прототип у подъезда.</p></div>
          <div class="box"><span class="mono">2024 · весна</span><p class="mt"><strong>Cozy v1</strong></p><p class="xs muted">Первый публичный чертёж.</p></div>
          <div class="box"><span class="mono">2024 · зима</span><p class="mt"><strong>Family + сайт</strong></p><p class="xs muted">4 языка, Vercel.</p></div>
          <div class="box"><span class="mono">2026</span><p class="mt"><strong>PurrTap · redesign</strong></p><p class="xs muted">Новый сайт + каталог.</p></div>
        </div>
      </div>

      <!-- PARTNERS / THANKS -->
      <div class="mt-xl">
        <span class="sec-label">спасибо</span>
        <h2 class="mt">Кто помогает</h2>
        <div class="grid g-4 gap mt">
          ${['Хакспейс Брест','Приют «Дом»','Волонтёры Минск','И 40+ других']
            .map(n=>`<div class="box center"><div class="ph mb" style="min-height:60px;">лого</div><strong>${n}</strong></div>`).join('')}
        </div>
      </div>

      <!-- CONTACTS -->
      <div class="box-accent mt-xl">
        <div class="grid g-2 gap-lg">
          <div><h2>Связаться</h2><p class="mt">Вопрос, предложение, партнёрство — пиши любым способом.</p></div>
          <div class="flex flex-col gap-sm">
            <button class="btn">Telegram · @safepaws</button>
            <button class="btn">Email · hi@safepaws.org</button>
            <button class="btn">GitHub · safepaws/website</button>
          </div>
        </div>
      </div>
    </div>`;
  };
})();
