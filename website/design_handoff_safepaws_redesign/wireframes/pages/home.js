window.SP_PAGES = window.SP_PAGES || {};

(function() {
  const header = `
    <div class="wf-header mb">
      <div class="flex items-center gap-sm">
        <span class="ic ic-accent">🐾</span>
        <strong class="hand" style="font-size:22px;">SafePaws</strong>
      </div>
      <nav class="wf-nav">
        <a>Решения</a><a>Как помочь</a><a>Истории</a><a>О нас</a>
        <span class="chip">RU ▾</span>
        <button class="btn btn-sm btn-primary">Скачать</button>
      </nav>
    </div>
  `;

  const footer = `
    <div class="box mt-xl" style="background:var(--paper-2);">
      <div class="grid g-4 gap">
        <div>
          <div class="flex items-center gap-sm mb-sm"><span class="ic ic-sm ic-accent">🐾</span><strong class="hand" style="font-size:20px;">SafePaws</strong></div>
          <p class="small muted">Открытый проект: чертежи и решения для уличных животных.</p>
        </div>
        <div>
          <div class="mono mb-sm">Решения</div>
          <p class="small">Cozy · Family · PurrTap · Скоро</p>
        </div>
        <div>
          <div class="mono mb-sm">Участие</div>
          <p class="small">Собрать · Установить · Поделиться · Поддержать</p>
        </div>
        <div>
          <div class="mono mb-sm">Связь</div>
          <p class="small">GitHub · Telegram · Email · RU/EN/BE/PL</p>
        </div>
      </div>
    </div>
  `;

  // ============ V1 — Three-path fork ============
  function v1() {
    return `
    <div class="sheet" style="position:relative;">
      <span class="sheet-tag">Home · вариант A · трёхпутевая развилка</span>
      ${header}

      <!-- HERO -->
      <div class="grid g-2 gap-lg mt-lg" style="align-items:center;">
        <div>
          <span class="sec-label mb-sm" style="display:inline-block;">миссия · 1 секция</span>
          <h1 class="mt" style="margin-top:12px;">Зима приходит.<br><span class="scribble">Им некуда спрятаться.</span></h1>
          <p class="mt" style="font-size:17px; max-width:440px;">
            SafePaws — открытые чертежи домиков и поилок для бездомных кошек.
            Скачай, собери, установи — или помоги иначе.
          </p>
          <div class="flex gap mt">
            <button class="btn btn-primary">Начать помогать →</button>
            <button class="btn btn-ghost">Посмотреть каталог</button>
          </div>
          <div class="flex gap mt" style="margin-top:20px;">
            <span class="chip chip-ok">● 1200+ скачиваний</span>
            <span class="chip chip-ok">● 47 домиков в мире</span>
            <span class="chip">open source</span>
          </div>
        </div>
        <div class="ph" style="min-height:320px;">фото котов зимой / hero · 16:10</div>
      </div>

      <!-- 3-PATH FORK -->
      <div class="mt-xl">
        <div class="flex items-center gap-sm mb"><span class="sec-label">развилка</span><span class="annot">← главное: сразу понять, куда идти</span></div>
        <h2 class="mb">Как ты хочешь помочь?</h2>
        <div class="grid g-3 gap">
          <div class="box-accent">
            <span class="ic ic-accent ic-lg">🔨</span>
            <h3 class="mt">У меня есть руки</h3>
            <p class="small muted mt">Собрать домик по чертежам или поилку PurrTap.</p>
            <div class="flex gap-sm mt"><span class="chip chip-accent">CNC/лобзик</span><span class="chip">фанера</span></div>
            <button class="btn btn-sm mt" style="margin-top:14px;">Выбрать чертёж →</button>
          </div>
          <div class="box-accent">
            <span class="ic ic-accent ic-lg">❤</span>
            <h3 class="mt">Хочу поддержать</h3>
            <p class="small muted mt">Рассказать о проекте, донатом или временем.</p>
            <div class="flex gap-sm mt"><span class="chip">share</span><span class="chip">donate</span><span class="chip">stories</span></div>
            <button class="btn btn-sm mt" style="margin-top:14px;">Варианты →</button>
          </div>
          <div class="box-accent">
            <span class="ic ic-accent ic-lg">?</span>
            <h3 class="mt">Просто смотрю</h3>
            <p class="small muted mt">Узнать, что это и кому нужно.</p>
            <div class="flex gap-sm mt"><span class="chip">истории</span><span class="chip">о нас</span></div>
            <button class="btn btn-sm mt" style="margin-top:14px;">Истории людей →</button>
          </div>
        </div>
      </div>

      <!-- CATALOG PREVIEW -->
      <div class="mt-xl">
        <div class="flex items-center justify-between mb">
          <h2>Каталог решений</h2>
          <a class="hand" style="color:var(--accent); font-size:20px;">все решения →</a>
        </div>
        <div class="grid g-4 gap">
          <div class="product-card">
            <div class="ph">Cozy · рендер</div>
            <div class="flex items-center justify-between"><strong>Cozy Shelter</strong><span class="chip">1–2 кота</span></div>
            <p class="xs muted">Фанера 3/6 мм · DXF + PDF</p>
            <button class="btn btn-sm">Детали →</button>
          </div>
          <div class="product-card">
            <div class="ph">Family · рендер</div>
            <div class="flex items-center justify-between"><strong>Family Shelter</strong><span class="chip">4–5 котов</span></div>
            <p class="xs muted">Фанера 3/6 мм · DXF + PDF</p>
            <button class="btn btn-sm">Детали →</button>
          </div>
          <div class="product-card">
            <div class="ph ph-accent">PurrTap · фото</div>
            <div class="flex items-center justify-between"><strong>PurrTap</strong><span class="chip chip-accent">NEW</span></div>
            <p class="xs muted">Поилка для двора · инструкция</p>
            <button class="btn btn-sm">Как установить →</button>
          </div>
          <div class="product-card" style="opacity:0.7;">
            <div class="ph">EDC Feeder · soon</div>
            <div class="flex items-center justify-between"><strong>EDC Feeder</strong><span class="chip">soon</span></div>
            <p class="xs muted">Портативная кормушка</p>
            <button class="btn btn-sm">Уведомить →</button>
          </div>
        </div>
      </div>

      <!-- HOW IT WORKS -->
      <div class="mt-xl">
        <span class="sec-label">3 шага</span>
        <h2 class="mt">Как это работает</h2>
        <div class="grid g-3 gap mt">
          <div class="box">
            <div class="flex items-center gap"><span class="step-num">1</span><strong>Скачай чертёж</strong></div>
            <p class="small muted mt">Выбери модель и материал — получи DXF и PDF.</p>
          </div>
          <div class="box">
            <div class="flex items-center gap"><span class="step-num">2</span><strong>Собери</strong></div>
            <p class="small muted mt">Сам или на ближайшем хакспейсе / CNC.</p>
          </div>
          <div class="box">
            <div class="flex items-center gap"><span class="step-num">3</span><strong>Установи и расскажи</strong></div>
            <p class="small muted mt">Помести во двор и поделись историей.</p>
          </div>
        </div>
      </div>

      <!-- STORIES STRIP -->
      <div class="mt-xl">
        <div class="flex items-center justify-between mb"><h2>Истории</h2><a class="hand" style="color:var(--accent); font-size:20px;">все истории →</a></div>
        <div class="grid g-3 gap">
          <div class="product-card"><div class="ph">Брест · фото</div><strong>Брест, 2 домика</strong><p class="xs muted">Паша и соседи · ноябрь 2024</p></div>
          <div class="product-card"><div class="ph">Гродно · фото</div><strong>Гродно, 5 кошек</strong><p class="xs muted">семья Козловских · январь 2025</p></div>
          <div class="product-card"><div class="ph">Минск · фото</div><strong>Минск, двор</strong><p class="xs muted">волонтёры · февраль 2025</p></div>
        </div>
      </div>

      <!-- CTA -->
      <div class="box-accent mt-xl center">
        <h2>Готов начать?</h2>
        <p class="mt">Все файлы бесплатные и открытые.</p>
        <div class="flex gap justify-center mt"><button class="btn btn-primary">Открыть каталог</button><button class="btn">Как помочь без инструментов</button></div>
      </div>

      ${footer}
    </div>`;
  }

  // ============ V5 — Map-as-intro (bold) ============
  function v5() {
    return `
    <div class="sheet" style="position:relative;">
      <span class="sheet-tag">Home · вариант Б · карта-как-интро (смелый)</span>
      ${header}

      <!-- MAP HERO -->
      <div class="mt-lg" style="position:relative;">
        <div class="map-placeholder" style="min-height:440px;">
          <div class="pin" style="top:30%; left:22%;"></div>
          <div class="pin" style="top:42%; left:28%;"></div>
          <div class="pin" style="top:58%; left:35%;"></div>
          <div class="pin" style="top:48%; left:48%;"></div>
          <div class="pin" style="top:35%; left:55%;"></div>
          <div class="pin" style="top:62%; left:68%;"></div>
          <div class="pin" style="top:45%; left:72%;"></div>
          <div style="position:absolute; top:36px; left:36px; max-width:420px;">
            <span class="chip chip-accent">живая карта · 47 точек</span>
            <h1 class="mt" style="font-size:48px; line-height:1;">47 домиков.<br>Где будет <span class="scribble">48-й</span>?</h1>
            <p class="mt">SafePaws — открытые чертежи и поилки для уличных котов. Каждая точка — реальный собранный домик.</p>
            <div class="flex gap mt">
              <button class="btn btn-primary">Поставить свой →</button>
              <button class="btn">Смотреть истории</button>
            </div>
          </div>
          <div class="box" style="position:absolute; top:35%; left:58%; background:var(--paper); padding:10px; width:180px;">
            <span class="chip chip-accent">Минск · 04.25</span>
            <p class="xs mt"><strong>«5 котят пережили зиму»</strong></p>
            <p class="xs muted">читать историю →</p>
          </div>
        </div>
        <div class="annot center" style="display:block; margin-top:8px;">↑ смелый ход: вместо hero-фото — сразу доказательство действия</div>
      </div>

      <!-- 3 ROUTES BELOW MAP -->
      <div class="mt-xl grid g-3 gap">
        <div class="box-filled">
          <div class="flex items-center gap"><span class="ic ic-accent ic-lg">+</span><h3>Поставить домик</h3></div>
          <p class="small muted mt">Открыть каталог, скачать чертёж, собрать и добавить точку на карту.</p>
          <button class="btn btn-sm mt">В каталог →</button>
        </div>
        <div class="box-filled">
          <div class="flex items-center gap"><span class="ic ic-accent ic-lg">💧</span><h3>Установить PurrTap</h3></div>
          <p class="small muted mt">Простая поилка, её может пополнять любой прохожий.</p>
          <button class="btn btn-sm mt">Как сделать →</button>
        </div>
        <div class="box-filled">
          <div class="flex items-center gap"><span class="ic ic-accent ic-lg">❤</span><h3>Помочь без инструментов</h3></div>
          <p class="small muted mt">Поделиться, донат, добавить перевод, написать историю.</p>
          <button class="btn btn-sm mt">Варианты →</button>
        </div>
      </div>

      <!-- LATEST STORIES STRIP -->
      <div class="mt-xl">
        <div class="flex items-center justify-between mb"><h2>Свежие истории с карты</h2><a class="hand" style="color:var(--accent); font-size:20px;">все истории →</a></div>
        <div class="grid g-4 gap">
          <div class="product-card"><div class="ph">фото</div><span class="chip">Минск</span><p class="xs"><strong>«5 котят»</strong></p></div>
          <div class="product-card"><div class="ph">фото</div><span class="chip">Брест</span><p class="xs"><strong>«2 домика у нас»</strong></p></div>
          <div class="product-card"><div class="ph">фото</div><span class="chip">Варшава</span><p class="xs"><strong>«PurrTap у подъезда»</strong></p></div>
          <div class="product-card"><div class="ph">фото</div><span class="chip">Гродно</span><p class="xs"><strong>«Семейная сборка»</strong></p></div>
        </div>
      </div>

      <!-- QUICK CATALOG -->
      <div class="mt-xl">
        <h2 class="mb">Что можно собрать</h2>
        <div class="grid g-3 gap">
          <div class="product-card"><div class="ph">Cozy</div><strong>Cozy Shelter</strong><p class="xs muted">1–2 кота · фанера 3/6 мм</p><button class="btn btn-sm btn-primary">Скачать</button></div>
          <div class="product-card"><div class="ph">Family</div><strong>Family Shelter</strong><p class="xs muted">4–5 котов · фанера 3/6 мм</p><button class="btn btn-sm btn-primary">Скачать</button></div>
          <div class="product-card"><div class="ph ph-accent">PurrTap</div><strong>PurrTap</strong><p class="xs muted">поилка · NEW</p><button class="btn btn-sm btn-primary">Инструкция</button></div>
        </div>
      </div>

      ${footer}
    </div>`;
  }

  // ============ V-HYBRID — A + D ============
  // Three-path fork + quiz integrated into the "У меня есть руки" and as expandable "не уверен".
  function vHybrid() {
    return `
    <div class="sheet" style="position:relative;">
      <span class="sheet-tag">Home · гибрид A+Д · развилка + квиз</span>
      ${header}

      <!-- HERO — same as A -->
      <div class="grid g-2 gap-lg mt-lg" style="align-items:center;">
        <div>
          <span class="sec-label mb-sm" style="display:inline-block;">миссия</span>
          <h1 class="mt" style="margin-top:12px;">Зима приходит.<br><span class="scribble">Им некуда спрятаться.</span></h1>
          <p class="mt" style="font-size:17px; max-width:440px;">
            SafePaws — открытые чертежи домиков и поилок для бездомных кошек.
            Скачай, собери, установи — или помоги иначе.
          </p>
          <div class="flex gap mt">
            <button class="btn btn-primary">Начать помогать →</button>
            <button class="btn btn-ghost">Посмотреть каталог</button>
          </div>
          <div class="flex gap mt" style="margin-top:20px;">
            <span class="chip chip-ok">● 1200+ скачиваний</span>
            <span class="chip chip-ok">● 47 домиков в мире</span>
            <span class="chip">open source</span>
          </div>
        </div>
        <div class="ph" style="min-height:320px;">фото котов зимой / hero · 16:10</div>
      </div>

      <!-- FORK + QUIZ INTEGRATION -->
      <div class="mt-xl">
        <div class="flex items-center gap-sm mb">
          <span class="sec-label">развилка · с мини-подбором</span>
          <span class="annot">← если пользователь знает, что хочет — выбирает карточку. Если нет — проходит квиз.</span>
        </div>
        <h2 class="mb">Как ты хочешь помочь?</h2>

        <div class="grid g-3 gap">
          <div class="box-accent">
            <span class="ic ic-accent ic-lg">🔨</span>
            <h3 class="mt">У меня есть руки</h3>
            <p class="small muted mt">Собрать домик по чертежам или поилку PurrTap.</p>
            <div class="flex gap-sm mt"><span class="chip chip-accent">CNC/лобзик</span><span class="chip">фанера</span></div>
            <button class="btn btn-sm mt" style="margin-top:14px;">Выбрать чертёж →</button>
          </div>
          <div class="box-accent">
            <span class="ic ic-accent ic-lg">❤</span>
            <h3 class="mt">Хочу поддержать</h3>
            <p class="small muted mt">Рассказать о проекте, донатом или временем.</p>
            <div class="flex gap-sm mt"><span class="chip">share</span><span class="chip">donate</span><span class="chip">stories</span></div>
            <button class="btn btn-sm mt" style="margin-top:14px;">Варианты →</button>
          </div>
          <div class="box-accent">
            <span class="ic ic-accent ic-lg">?</span>
            <h3 class="mt">Просто смотрю</h3>
            <p class="small muted mt">Узнать, что это и кому нужно.</p>
            <div class="flex gap-sm mt"><span class="chip">истории</span><span class="chip">о нас</span></div>
            <button class="btn btn-sm mt" style="margin-top:14px;">Истории людей →</button>
          </div>
        </div>

        <!-- QUIZ ENTRY — appears right under the fork as a 4th option / invitation -->
        <div class="box mt" style="padding:20px; border-style:dashed; border-color:var(--accent); background: color-mix(in oklab, var(--accent) 6%, var(--paper));">
          <div class="flex items-center gap-lg flex-wrap">
            <div style="flex:1; min-width:280px;">
              <div class="flex items-center gap-sm mb-sm">
                <span class="chip chip-accent">опросник · 30 сек</span>
                <span class="annot">← мягко интегрирован: только для тех, кто ещё не выбрал</span>
              </div>
              <h3>Не уверен, какой путь твой?</h3>
              <p class="small mt">3 коротких вопроса — подскажем, какое решение ближе именно тебе.</p>
            </div>
            <div class="flex gap-sm">
              <button class="btn btn-primary">Подобрать за 30 сек →</button>
              <button class="btn btn-ghost btn-sm">позже</button>
            </div>
          </div>

          <!-- Preview of quiz flow (inline, collapsed-state hint for wireframe clarity) -->
          <div class="flex gap mt" style="margin-top:18px; align-items:stretch;">
            <div class="box flex-1" style="padding:10px; background:var(--paper);">
              <span class="chip">шаг 1</span>
              <p class="xs mt"><strong>Что у тебя есть?</strong></p>
              <p class="xs muted">руки · время · средства · голос</p>
            </div>
            <div style="align-self:center;" class="hand" style="font-size:24px; color:var(--accent);">→</div>
            <div class="box flex-1" style="padding:10px; background:var(--paper);">
              <span class="chip">шаг 2</span>
              <p class="xs mt"><strong>Сколько животных рядом?</strong></p>
              <p class="xs muted">1–2 · 4–5 · колония · не знаю</p>
            </div>
            <div style="align-self:center;" class="hand" style="font-size:24px; color:var(--accent);">→</div>
            <div class="box flex-1" style="padding:10px; background:var(--paper);">
              <span class="chip">шаг 3</span>
              <p class="xs mt"><strong>Когда хочешь начать?</strong></p>
              <p class="xs muted">на выходных · 1–2 недели · потом</p>
            </div>
            <div style="align-self:center;" class="hand" style="font-size:24px; color:var(--accent);">→</div>
            <div class="box-accent flex-1" style="padding:10px;">
              <span class="chip chip-accent">результат</span>
              <p class="xs mt"><strong>Рекомендация + файл</strong></p>
              <p class="xs muted">напр. Cozy 6 мм + истории похожих волонтёров</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CATALOG PREVIEW — same as A -->
      <div class="mt-xl">
        <div class="flex items-center justify-between mb">
          <h2>Каталог решений</h2>
          <a class="hand" style="color:var(--accent); font-size:20px;">все решения →</a>
        </div>
        <div class="grid g-4 gap">
          <div class="product-card">
            <div class="ph">Cozy · рендер</div>
            <div class="flex items-center justify-between"><strong>Cozy Shelter</strong><span class="chip">1–2 кота</span></div>
            <p class="xs muted">Фанера 3/6 мм · DXF + PDF</p>
            <button class="btn btn-sm">Детали →</button>
          </div>
          <div class="product-card">
            <div class="ph">Family · рендер</div>
            <div class="flex items-center justify-between"><strong>Family Shelter</strong><span class="chip">4–5 котов</span></div>
            <p class="xs muted">Фанера 3/6 мм · DXF + PDF</p>
            <button class="btn btn-sm">Детали →</button>
          </div>
          <div class="product-card">
            <div class="ph ph-accent">PurrTap · фото</div>
            <div class="flex items-center justify-between"><strong>PurrTap</strong><span class="chip chip-accent">NEW</span></div>
            <p class="xs muted">Поилка для двора · инструкция</p>
            <button class="btn btn-sm">Как установить →</button>
          </div>
          <div class="product-card" style="opacity:0.7;">
            <div class="ph">EDC Feeder · soon</div>
            <div class="flex items-center justify-between"><strong>EDC Feeder</strong><span class="chip">soon</span></div>
            <p class="xs muted">Портативная кормушка</p>
            <button class="btn btn-sm">Уведомить →</button>
          </div>
        </div>
      </div>

      <!-- HOW IT WORKS -->
      <div class="mt-xl">
        <span class="sec-label">3 шага</span>
        <h2 class="mt">Как это работает</h2>
        <div class="grid g-3 gap mt">
          <div class="box">
            <div class="flex items-center gap"><span class="step-num">1</span><strong>Скачай чертёж</strong></div>
            <p class="small muted mt">Выбери модель и материал — получи DXF и PDF.</p>
          </div>
          <div class="box">
            <div class="flex items-center gap"><span class="step-num">2</span><strong>Собери</strong></div>
            <p class="small muted mt">Сам или на ближайшем хакспейсе / CNC.</p>
          </div>
          <div class="box">
            <div class="flex items-center gap"><span class="step-num">3</span><strong>Установи и расскажи</strong></div>
            <p class="small muted mt">Помести во двор и поделись историей.</p>
          </div>
        </div>
      </div>

      <!-- STORIES STRIP -->
      <div class="mt-xl">
        <div class="flex items-center justify-between mb"><h2>Истории</h2><a class="hand" style="color:var(--accent); font-size:20px;">все истории →</a></div>
        <div class="grid g-3 gap">
          <div class="product-card"><div class="ph">Брест · фото</div><strong>Брест, 2 домика</strong><p class="xs muted">Паша и соседи · ноябрь 2024</p></div>
          <div class="product-card"><div class="ph">Гродно · фото</div><strong>Гродно, 5 кошек</strong><p class="xs muted">семья Козловских · январь 2025</p></div>
          <div class="product-card"><div class="ph">Минск · фото</div><strong>Минск, двор</strong><p class="xs muted">волонтёры · февраль 2025</p></div>
        </div>
      </div>

      <!-- CTA -->
      <div class="box-accent mt-xl center">
        <h2>Готов начать?</h2>
        <p class="mt">Все файлы бесплатные и открытые.</p>
        <div class="flex gap justify-center mt"><button class="btn btn-primary">Открыть каталог</button><button class="btn">Как помочь без инструментов</button></div>
      </div>

      ${footer}
    </div>`;
  }

  window.SP_PAGES.home = function(variant) {
    if (variant === 'v5') return v5();
    if (variant === 'hybrid') return vHybrid();
    return v1();
  };
})();
