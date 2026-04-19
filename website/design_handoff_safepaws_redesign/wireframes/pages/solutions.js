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
  const crumbs = `<div class="mono mb">главная / <span style="color:var(--accent);">решения</span></div>`;

  function v1() {
    return `
    <div class="sheet" style="position:relative;">
      <span class="sheet-tag">Solutions · вариант A · сетка + фильтры</span>
      ${header}${crumbs}

      <div class="flex items-end justify-between gap mb">
        <div>
          <h1>Каталог решений</h1>
          <p class="mt small muted">Всё, что можно собрать или установить. Фильтруй по цели и материалу.</p>
        </div>
        <span class="mono">4 решения · обновлено 04.26</span>
      </div>

      <!-- FILTERS -->
      <div class="box mt" style="padding:12px 16px;">
        <div class="flex items-center gap flex-wrap">
          <span class="mono">тип:</span>
          <button class="chip chip-accent">все</button>
          <button class="chip">укрытия</button>
          <button class="chip">поение</button>
          <button class="chip">кормление</button>
          <span class="mono" style="margin-left:12px;">материал:</span>
          <button class="chip">3 мм фанера</button>
          <button class="chip">6 мм фанера</button>
          <button class="chip">другое</button>
          <span class="mono" style="margin-left:12px;">статус:</span>
          <button class="chip chip-ok">готов</button>
          <button class="chip">скоро</button>
          <span style="flex:1;"></span>
          <span class="chip">сортировка: популярные ▾</span>
        </div>
      </div>

      <!-- GRID -->
      <div class="grid g-3 gap mt-lg">
        ${[
          ['Cozy Shelter', '1–2 кота', 'укрытие · фанера 3/6 мм', 'готов', false],
          ['Family Shelter', '4–5 котов', 'укрытие · фанера 3/6 мм', 'готов', false],
          ['PurrTap', 'поилка', 'поение · бутылка + крепёж', 'NEW', true],
          ['EDC Feeder', 'портативная кормушка', 'кормление · 3D-печать', 'скоро', false],
          ['Insulated Cozy', 'утеплённая версия', 'укрытие · +пенофол', 'прототип', false],
          ['Colony Kit', 'для 10+ котов', 'укрытие + поение', 'скоро', false],
        ].map(([name, size, meta, status, newtag]) => `
          <div class="product-card">
            <div class="ph ${newtag?'ph-accent':''}" style="min-height:150px;">${name} · рендер</div>
            <div class="flex items-center justify-between"><strong>${name}</strong><span class="chip ${newtag?'chip-accent':''}">${status}</span></div>
            <p class="xs muted">${meta}</p>
            <p class="xs"><strong>${size}</strong></p>
            <div class="flex gap-sm"><button class="btn btn-sm btn-primary">Детали →</button>${status==='готов'||status==='NEW'?'<button class="btn btn-sm">Скачать</button>':'<button class="btn btn-sm btn-ghost">Уведомить</button>'}</div>
          </div>`).join('')}
      </div>

      <!-- COMPARE CTA -->
      <div class="box-accent mt-xl center">
        <h3>Не знаешь, что выбрать?</h3>
        <p class="mt small">Сравни решения рядом или пройди квиз.</p>
        <div class="flex gap justify-center mt"><button class="btn btn-primary">Сравнить все →</button><button class="btn">Пройти квиз</button></div>
      </div>
    </div>`;
  }

  function v2() {
    const rows = [
      ['', 'Cozy', 'Family', 'PurrTap', 'EDC Feeder'],
      ['для кого', '1–2 кота', '4–5 котов', 'любые', 'уличная кошка'],
      ['размер', '40×40×30 см', '60×50×40 см', '20 см', '15×10 см'],
      ['материал', 'фанера 3/6 мм', 'фанера 3/6 мм', 'бутылка + лазер', 'PLA 3D-печать'],
      ['время сборки', '~2 часа', '~3 часа', '20 минут', 'зависит'],
      ['инструмент', 'лобзик/CNC', 'лобзик/CNC', 'ножовка', '3D-принтер'],
      ['файлы', 'DXF + PDF', 'DXF + PDF', 'PDF инструкция', 'STL + инструкция'],
      ['статус', 'готов', 'готов', 'готов', 'скоро'],
    ];
    return `
    <div class="sheet" style="position:relative;">
      <span class="sheet-tag">Solutions · вариант B · сравнение</span>
      ${header}${crumbs}

      <h1>Сравни и выбери</h1>
      <p class="mt small muted">Все решения на одном экране — чтобы было понятно, что чем отличается.</p>

      <!-- COMPARE TABLE -->
      <div class="box mt-lg" style="padding:0; overflow:hidden;">
        <table style="width:100%; border-collapse:collapse; font-family:'Kalam', sans-serif;">
          ${rows.map((r, i) => `
            <tr style="border-bottom:${i===rows.length-1?'none':'1.5px dashed var(--ink-muted)'};">
              ${r.map((c, j) => `
                <${i===0 ? 'th' : 'td'} style="padding:14px 16px; text-align:left; vertical-align:top; ${j===0 ? 'width:160px; color:var(--ink-3); font-family:JetBrains Mono, monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.06em;' : ''} ${i===0 && j>0 ? 'font-size:18px; font-family:Caveat, cursive; font-weight:700;' : ''}">
                  ${c}
                </${i===0 ? 'th' : 'td'}>`).join('')}
            </tr>`).join('')}
        </table>
      </div>

      <!-- ACTION ROW -->
      <div class="grid g-4 gap mt">
        <div class="box center"><div class="ph mb">Cozy</div><button class="btn btn-sm btn-primary">Скачать</button></div>
        <div class="box center"><div class="ph mb">Family</div><button class="btn btn-sm btn-primary">Скачать</button></div>
        <div class="box center"><div class="ph ph-accent mb">PurrTap</div><button class="btn btn-sm btn-primary">Инструкция</button></div>
        <div class="box center" style="opacity:0.7;"><div class="ph mb">EDC</div><button class="btn btn-sm">Уведомить</button></div>
      </div>

      <div class="annot center" style="display:block; margin-top:12px;">↑ таблица-сравнение = минимум кликов, максимум информации перед выбором</div>
    </div>`;
  }

  window.SP_PAGES.solutions = function(v) { return v1(); };
})();
