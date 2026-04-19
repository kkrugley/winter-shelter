window.SP_PAGES = window.SP_PAGES || {};

(function() {
  const header = `
    <div class="wf-header mb">
      <div class="flex items-center gap-sm"><span class="ic ic-accent">🐾</span><strong class="hand" style="font-size:22px;">SafePaws</strong></div>
      <nav class="wf-nav">
        <a>Решения</a><a>Как помочь</a><a>Истории</a><a>О нас</a>
        <span class="chip">RU ▾</span><button class="btn btn-sm btn-primary">Скачать</button>
      </nav>
    </div>`;

  window.SP_PAGES.download = function() {
    return `
    <div class="sheet" style="position:relative;">
      <span class="sheet-tag">Download flow · модель → материал → файл</span>
      ${header}
      <div class="mono mb">главная / <span style="color:var(--accent);">скачать</span></div>

      <h1>Скачать чертежи</h1>
      <p class="mt small muted">Три шага: выбери модель, материал, получи файл. Всё бесплатно.</p>

      <!-- STEP PROGRESS -->
      <div class="flex items-center gap mt-lg">
        <span class="step-num" style="background:var(--accent); color:white; border-color:var(--accent);">1</span><strong>модель</strong>
        <div style="flex:1; height:2px; background:var(--accent); opacity:0.4;"></div>
        <span class="step-num">2</span><strong class="muted">материал</strong>
        <div style="flex:1; height:2px; background:var(--ink-muted); opacity:0.4;"></div>
        <span class="step-num">3</span><strong class="muted">файл</strong>
      </div>

      <!-- STEP 1 -->
      <div class="box mt-lg">
        <span class="sec-label">шаг 1 / 3</span>
        <h2 class="mt">Выбери модель</h2>
        <div class="grid g-3 gap mt">
          <div class="product-card" style="border-color:var(--accent); border-width:3px;">
            <div class="ph ph-accent" style="min-height:150px;">Cozy</div>
            <strong>Cozy Shelter</strong><p class="xs muted">1–2 кота · компактный</p>
            <span class="chip chip-accent">выбрано</span>
          </div>
          <div class="product-card">
            <div class="ph" style="min-height:150px;">Family</div>
            <strong>Family Shelter</strong><p class="xs muted">4–5 котов · просторный</p>
          </div>
          <div class="product-card">
            <div class="ph" style="min-height:150px;">PurrTap</div>
            <strong>PurrTap</strong><p class="xs muted">поилка — инструкция PDF</p>
          </div>
        </div>
      </div>

      <!-- STEP 2 -->
      <div class="box mt-lg">
        <span class="sec-label">шаг 2 / 3</span>
        <h2 class="mt">Выбери материал</h2>
        <div class="grid g-2 gap mt">
          <div class="box-accent">
            <div class="flex items-center justify-between"><strong>Фанера 6 мм</strong><span class="chip chip-accent">рекомендовано</span></div>
            <p class="xs muted mt">Прочнее, теплее. Лучше для улицы.</p>
            <p class="small mt">✓ 1 лист 1525×1525 мм · лобзик / CNC</p>
          </div>
          <div class="box">
            <strong>Фанера 3 мм</strong>
            <p class="xs muted mt">Легче резать на маломощном лазере.</p>
            <p class="small mt">✓ 1 лист · лазер ≥ 60W</p>
          </div>
        </div>
      </div>

      <!-- STEP 3 -->
      <div class="box-filled mt-lg">
        <span class="sec-label">шаг 3 / 3 · твой файл</span>
        <div class="flex items-center justify-between gap mt">
          <div>
            <h3>Cozy Shelter · фанера 6 мм</h3>
            <p class="small muted mt">SafePawsCozyShelter_6mm.zip · 2.4 MB</p>
            <p class="xs muted mt">внутри: DXF (раскрой) + PDF (инструкция сборки) + README</p>
          </div>
          <button class="btn btn-primary">⬇ Скачать</button>
        </div>
      </div>

      <!-- NEXT -->
      <div class="grid g-3 gap mt-xl">
        <div class="box"><span class="mono">дальше</span><h4 class="mt">Прочти инструкцию</h4><p class="xs muted mt">5 минут — сэкономят часы.</p></div>
        <div class="box"><span class="mono">дальше</span><h4 class="mt">Нет инструмента?</h4><p class="xs muted mt">Список хакспейсов рядом.</p></div>
        <div class="box"><span class="mono">когда соберёшь</span><h4 class="mt">Добавь историю</h4><p class="xs muted mt">Фото + точка на карте.</p></div>
      </div>
    </div>`;
  };
})();
