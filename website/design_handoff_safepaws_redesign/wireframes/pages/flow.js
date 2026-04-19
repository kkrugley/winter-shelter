window.SP_PAGES = window.SP_PAGES || {};

(function() {
  window.SP_PAGES.flow = function() {
    return `
    <div class="sheet" style="position:relative;">
      <span class="sheet-tag">Site map · общая архитектура</span>

      <h1>Архитектура сайта</h1>
      <p class="mt small muted" style="max-width:620px;">
        Упрощение против текущего: одна логика «решение → материал → файл» + три параллельных пути (сделать / помочь / узнать).
      </p>

      <!-- SITEMAP -->
      <div class="box-filled mt-lg" style="padding:32px;">
        <div class="center">
          <div class="box" style="display:inline-block; padding:14px 28px; background:var(--accent); color:white; border-color:var(--ink);">
            <h3 style="color:white;">/ Home</h3>
            <p class="xs" style="opacity:0.9;">развилка: сделать / помочь / узнать</p>
          </div>
        </div>

        <div class="arrow-down"></div>

        <div class="grid g-3 gap">
          <!-- PATH A: BUILD -->
          <div class="flex flex-col gap">
            <div class="box-accent center"><span class="mono">путь · сделать</span><h4 class="mt">/ solutions</h4><p class="xs muted">каталог + фильтры</p></div>
            <div class="arrow-down" style="margin:0 auto;"></div>
            <div class="box center"><h4>/ solutions/[slug]</h4><p class="xs muted">cozy · family · purrtap · edc</p></div>
            <div class="arrow-down" style="margin:0 auto;"></div>
            <div class="box center"><h4>/ download</h4><p class="xs muted">модель → материал → файл</p></div>
          </div>

          <!-- PATH B: HELP -->
          <div class="flex flex-col gap">
            <div class="box-accent center"><span class="mono">путь · помочь</span><h4 class="mt">/ help</h4><p class="xs muted">матрица участия</p></div>
            <div class="arrow-down" style="margin:0 auto;"></div>
            <div class="box center"><h4>поделиться · донат</h4><p class="xs muted">перевод · партнёрство</p></div>
            <div class="arrow-down" style="margin:0 auto;"></div>
            <div class="box center"><h4>форма истории</h4><p class="xs muted">+ точка на карте</p></div>
          </div>

          <!-- PATH C: LEARN -->
          <div class="flex flex-col gap">
            <div class="box-accent center"><span class="mono">путь · узнать</span><h4 class="mt">/ stories</h4><p class="xs muted">карта + истории</p></div>
            <div class="arrow-down" style="margin:0 auto;"></div>
            <div class="box center"><h4>/ about</h4><p class="xs muted">миссия · автор · статистика</p></div>
            <div class="arrow-down" style="margin:0 auto;"></div>
            <div class="box center"><h4>контакты</h4><p class="xs muted">telegram · github · email</p></div>
          </div>
        </div>
      </div>

      <!-- KEY PRINCIPLES -->
      <div class="grid g-3 gap mt-xl">
        <div class="box-accent">
          <span class="mono">принцип 1</span>
          <h3 class="mt">Один путь на 1 экран</h3>
          <p class="small mt">На главной посетитель сразу видит 3 варианта действий. Не больше.</p>
        </div>
        <div class="box-accent">
          <span class="mono">принцип 2</span>
          <h3 class="mt">Каталог — центр</h3>
          <p class="small mt">Все продукты в одной сетке, с фильтром и сравнением. Новый продукт = новая карточка.</p>
        </div>
        <div class="box-accent">
          <span class="mono">принцип 3</span>
          <h3 class="mt">PurrTap равноправен</h3>
          <p class="small mt">Не отдельная фича, а полноценное решение в каталоге. Расширяет аудиторию ×2.</p>
        </div>
      </div>

      <!-- BEFORE / AFTER -->
      <div class="mt-xl">
        <h2 class="mb">Было → стало</h2>
        <div class="grid g-2 gap">
          <div class="box">
            <span class="mono">было</span>
            <h4 class="mt">index.html + /download + /learn-more + /about</h4>
            <p class="small muted mt">Плоская иерархия, всё через dropdown «Скачать». PurrTap отсутствует. Фокус на «чертежах», не на помощи.</p>
            <div class="flex gap-sm mt"><span class="chip">dropdown choice</span><span class="chip">нет каталога</span><span class="chip">нет карты</span></div>
          </div>
          <div class="box-accent">
            <span class="mono">стало</span>
            <h4 class="mt">/ + /solutions + /solutions/[slug] + /help + /stories + /about</h4>
            <p class="small mt">3 явных пути с главной. Каталог как центр. PurrTap равноправный. Карта и истории — отдельная сущность.</p>
            <div class="flex gap-sm mt"><span class="chip chip-accent">quiz/фильтр/сравнение</span><span class="chip chip-accent">карта 47 точек</span><span class="chip chip-accent">масштабируемо</span></div>
          </div>
        </div>
      </div>

      <!-- PAGES NAVIGATION HINT -->
      <div class="mt-xl center">
        <p class="hand" style="font-size:22px; color:var(--accent);">↑ переключайся между страницами во вкладках наверху</p>
      </div>
    </div>`;
  };
})();
