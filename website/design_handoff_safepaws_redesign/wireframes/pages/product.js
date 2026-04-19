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

  function v1() {
    return `
    <div class="sheet" style="position:relative;">
      <span class="sheet-tag">Product · Cozy Shelter (пример карточки)</span>
      ${header}
      <div class="mono mb">главная / решения / <span style="color:var(--accent);">cozy shelter</span></div>

      <!-- Hero row -->
      <div class="grid g-2 gap-lg" style="align-items:flex-start;">
        <!-- GALLERY -->
        <div>
          <div class="ph" style="min-height:340px;">Cozy · главное фото / 3D</div>
          <div class="grid g-4 gap-sm mt">
            <div class="ph" style="min-height:70px;">1</div>
            <div class="ph" style="min-height:70px;">2</div>
            <div class="ph" style="min-height:70px;">3</div>
            <div class="ph" style="min-height:70px;">схема</div>
          </div>
        </div>
        <!-- INFO + ACTION -->
        <div>
          <div class="flex gap-sm"><span class="chip chip-ok">готов</span><span class="chip">укрытие</span><span class="chip">open source</span></div>
          <h1 class="mt">Cozy Shelter</h1>
          <p class="hand" style="color:var(--accent); font-size:22px;">«Уютный» — компактный домик на 1–2 кота.</p>
          <p class="mt">Тёплое убежище из листа фанеры. Два входа, защита от ветра, минимальный набор инструмента.</p>

          <!-- KEY FACTS GRID -->
          <div class="grid g-2 gap-sm mt-lg">
            <div class="box" style="padding:10px;"><span class="mono">размер</span><p><strong>40 × 40 × 30 см</strong></p></div>
            <div class="box" style="padding:10px;"><span class="mono">материал</span><p><strong>фанера 3 или 6 мм</strong></p></div>
            <div class="box" style="padding:10px;"><span class="mono">время сборки</span><p><strong>~ 2 часа</strong></p></div>
            <div class="box" style="padding:10px;"><span class="mono">инструмент</span><p><strong>лобзик или CNC</strong></p></div>
          </div>

          <!-- DOWNLOAD PANEL -->
          <div class="box-accent mt-lg">
            <span class="mono">выбери материал:</span>
            <div class="flex gap-sm mt-sm mb">
              <button class="chip chip-accent">6 мм · рекомендовано</button>
              <button class="chip">3 мм</button>
            </div>
            <div class="flex gap">
              <button class="btn btn-primary">⬇ Скачать DXF + PDF (6 мм)</button>
              <button class="btn btn-ghost">посмотреть пример инструкции</button>
            </div>
            <p class="xs muted mt">размер архива ~ 2.4 MB · CC BY 4.0</p>
          </div>

          <!-- SECONDARY -->
          <div class="flex gap-sm mt">
            <button class="btn btn-sm">Сравнить с Family →</button>
            <button class="btn btn-sm btn-ghost">Поделиться</button>
          </div>
        </div>
      </div>

      <!-- WHY -->
      <div class="mt-xl">
        <span class="sec-label">почему именно этот</span>
        <h2 class="mt">Когда выбрать Cozy</h2>
        <div class="grid g-3 gap mt">
          <div class="box"><strong>✓ В подъезде / на балконе</strong><p class="xs muted mt">Компактный, помещается за дверью.</p></div>
          <div class="box"><strong>✓ Первый раз</strong><p class="xs muted mt">Простая сборка, мало деталей.</p></div>
          <div class="box"><strong>✓ 1–2 кота рядом</strong><p class="xs muted mt">Больше — бери Family.</p></div>
        </div>
      </div>

      <!-- ASSEMBLY TIMELINE -->
      <div class="mt-xl">
        <span class="sec-label">процесс сборки</span>
        <h2 class="mt">За 4 шага</h2>
        <div class="grid g-4 gap mt">
          <div class="box"><span class="step-num">1</span><h4 class="mt">Скачай архив</h4><div class="ph mt" style="min-height:70px;">пик</div></div>
          <div class="box"><span class="step-num">2</span><h4 class="mt">Вырежи детали</h4><div class="ph mt" style="min-height:70px;">пик</div></div>
          <div class="box"><span class="step-num">3</span><h4 class="mt">Собери в коробку</h4><div class="ph mt" style="min-height:70px;">пик</div></div>
          <div class="box"><span class="step-num">4</span><h4 class="mt">Установи и оформи</h4><div class="ph mt" style="min-height:70px;">пик</div></div>
        </div>
      </div>

      <!-- MATERIAL CALC -->
      <div class="box-filled mt-xl">
        <div class="flex items-center gap"><span class="sec-label">калькулятор материалов</span><span class="annot">← фича, которой не было: чётко сказать, сколько купить</span></div>
        <div class="grid g-4 gap mt">
          <div><span class="mono">лист фанеры</span><h3>1 лист 1525×1525</h3></div>
          <div><span class="mono">саморезы</span><h3>~ 24 шт</h3></div>
          <div><span class="mono">крепёж</span><h3>клей ПВА</h3></div>
          <div><span class="mono">доп.</span><h3>утеплитель (опц.)</h3></div>
        </div>
      </div>

      <!-- STORIES WITH PRODUCT -->
      <div class="mt-xl">
        <div class="flex items-center justify-between mb"><h2>Кто уже собрал Cozy</h2><a class="hand" style="color:var(--accent); font-size:20px;">все истории →</a></div>
        <div class="grid g-3 gap">
          <div class="product-card"><div class="ph">Брест</div><strong>«Поставили 2 домика»</strong><p class="xs muted">Паша, 11.24</p></div>
          <div class="product-card"><div class="ph">Варшава</div><strong>«Первый опыт сборки»</strong><p class="xs muted">Катя, 01.25</p></div>
          <div class="product-card"><div class="ph">Минск</div><strong>«Домик в подъезде»</strong><p class="xs muted">Аня, 02.25</p></div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="mt-xl">
        <span class="sec-label">faq</span>
        <h2 class="mt">Частые вопросы</h2>
        <div class="grid gap mt">
          <div class="box"><strong>Какую фанеру лучше взять — 3 или 6 мм?</strong><p class="xs muted mt">6 мм прочнее и теплее. 3 мм — если режешь на маломощном лазере.</p></div>
          <div class="box"><strong>Нужна ли пропитка?</strong><p class="xs muted mt">Да, любой водоотталкивающей. Подробности в PDF-инструкции.</p></div>
          <div class="box"><strong>Коты реально заходят?</strong><p class="xs muted mt">Да, см. истории выше. Важно разместить там, где они уже привыкли.</p></div>
        </div>
      </div>

      <!-- NEXT/PREV -->
      <div class="flex justify-between mt-xl">
        <button class="btn btn-ghost">← PurrTap</button>
        <button class="btn btn-ghost">Family Shelter →</button>
      </div>
    </div>`;
  }

  window.SP_PAGES.product = function() { return v1(); };
})();
