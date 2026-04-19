window.SP_PAGES = window.SP_PAGES || {};

(function() {
  const header = `
    <div class="wf-header mb">
      <div class="flex items-center gap-sm"><span class="ic ic-accent">🐾</span><strong class="hand" style="font-size:22px;">SafePaws</strong></div>
      <nav class="wf-nav">
        <a>Решения</a><a>Как помочь</a><a style="color:var(--accent);">Истории</a><a>О нас</a>
        <span class="chip">RU ▾</span><button class="btn btn-sm btn-primary">Скачать</button>
      </nav>
    </div>`;

  window.SP_PAGES.stories = function() {
    return `
    <div class="sheet" style="position:relative;">
      <span class="sheet-tag">Stories · карта + сетка</span>
      ${header}
      <div class="mono mb">главная / <span style="color:var(--accent);">истории</span></div>

      <div class="flex items-end justify-between gap mb">
        <div>
          <h1>Где уже стоят домики</h1>
          <p class="mt small muted">Каждая точка — реальный собранный и установленный домик или поилка.</p>
        </div>
        <button class="btn btn-primary btn-sm">+ добавить свою историю</button>
      </div>

      <!-- FILTERS -->
      <div class="box mt" style="padding:10px 16px;">
        <div class="flex items-center gap flex-wrap">
          <button class="chip chip-accent">все</button>
          <button class="chip">Cozy</button>
          <button class="chip">Family</button>
          <button class="chip">PurrTap</button>
          <span class="mono" style="margin-left:12px;">страна:</span>
          <button class="chip">BY</button><button class="chip">PL</button><button class="chip">LT</button><button class="chip">все</button>
          <span style="flex:1;"></span>
          <button class="chip">вид: карта</button><button class="chip chip-accent">вид: карта + сетка</button>
        </div>
      </div>

      <!-- MAP + LIST -->
      <div class="grid gap mt" style="grid-template-columns: 1.3fr 1fr;">
        <div class="map-placeholder" style="min-height:440px;">
          <div class="pin" style="top:20%; left:30%;"></div>
          <div class="pin" style="top:35%; left:40%;"></div>
          <div class="pin" style="top:50%; left:25%;"></div>
          <div class="pin" style="top:45%; left:60%;"></div>
          <div class="pin" style="top:60%; left:45%;"></div>
          <div class="pin" style="top:30%; left:70%;"></div>
          <div class="pin" style="top:70%; left:55%;"></div>
          <div class="box" style="position:absolute; top:24px; left:24px; padding:10px; background:var(--paper);">
            <span class="mono">47 точек</span><p class="xs"><strong>BY 28 · PL 12 · LT 5 · другие 2</strong></p>
          </div>
        </div>
        <div class="flex flex-col gap" style="max-height:440px; overflow:hidden;">
          <div class="product-card"><div class="flex gap"><div class="ph" style="width:100px; min-height:80px;">ф</div><div><span class="chip">Минск · Cozy</span><strong>«5 котят пережили зиму»</strong><p class="xs muted mt">Лена · 04.26</p></div></div></div>
          <div class="product-card"><div class="flex gap"><div class="ph" style="width:100px; min-height:80px;">ф</div><div><span class="chip">Брест · Family</span><strong>«2 домика у дома»</strong><p class="xs muted mt">Паша · 11.24</p></div></div></div>
          <div class="product-card"><div class="flex gap"><div class="ph" style="width:100px; min-height:80px;">ф</div><div><span class="chip chip-accent">Варшава · PurrTap</span><strong>«Поилка у подъезда»</strong><p class="xs muted mt">Марта · 02.26</p></div></div></div>
          <div class="product-card"><div class="flex gap"><div class="ph" style="width:100px; min-height:80px;">ф</div><div><span class="chip">Гродно · Cozy</span><strong>«Семейная сборка»</strong><p class="xs muted mt">Козловские · 01.25</p></div></div></div>
        </div>
      </div>

      <!-- ALL STORIES GRID -->
      <div class="mt-xl">
        <h2 class="mb">Все истории</h2>
        <div class="grid g-3 gap">
          ${Array.from({length:6}).map((_,i)=>`
            <div class="product-card">
              <div class="ph" style="min-height:140px;">фото · история ${i+1}</div>
              <span class="chip">${['Минск','Брест','Варшава','Гродно','Вильнюс','Познань'][i]}</span>
              <strong>«Короткая цитата из истории»</strong>
              <p class="xs muted">автор · дата</p>
              <button class="btn btn-sm btn-ghost">Читать →</button>
            </div>
          `).join('')}
        </div>
        <div class="center mt-lg"><button class="btn">Загрузить ещё</button></div>
      </div>

      <!-- ADD STORY CTA -->
      <div class="box-accent mt-xl center">
        <h2>Собрал домик? Расскажи.</h2>
        <p class="mt">2 фото + пара строк — и точка появится на карте.</p>
        <button class="btn btn-primary mt">Добавить историю →</button>
      </div>
    </div>`;
  };
})();
