/*!
 * Analytics de trafico — 100% vanilla JS, autocontenido, SIN dependencias externas.
 * NO usa Google Analytics ni peticiones de red: todo se guarda en localStorage
 * del navegador que visita la pagina.
 *
 * Datos guardados (claves en localStorage):
 *   apt_visitor_id        -> UUID del visitante (crypto.randomUUID)
 *   visits_YYYY-MM-DD     -> array de visitor IDs unicos vistos ese dia
 *   pv_YYYY-MM-DD         -> pageviews crudas de ese dia
 *   apt_dur_total_ms      -> suma de duraciones de sesion medidas (ms)
 *   apt_dur_count         -> numero de sesiones medidas
 *   apt_sessions          -> cargas de pagina totales
 *   apt_clicks            -> { "TAG|texto|href": {n, tag, text, href} }
 *   apt_clicks_total      -> clicks totales en <a> / <button>
 *
 * Panel de administracion oculto: Ctrl + Shift + A
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* storage seguro                                                      */
  /* ------------------------------------------------------------------ */
  var LS = (function () {
    try {
      var t = '__apt_probe__';
      window.localStorage.setItem(t, '1');
      window.localStorage.removeItem(t);
      return window.localStorage;
    } catch (e) {
      return null; // modo privado / storage bloqueado -> analitica desactivada
    }
  })();

  function get(k, def) {
    if (!LS) return def;
    try {
      var v = LS.getItem(k);
      return v === null ? def : JSON.parse(v);
    } catch (e) {
      return def;
    }
  }

  function set(k, v) {
    if (!LS) return;
    try {
      LS.setItem(k, JSON.stringify(v));
    } catch (e) { /* quota llena: se ignora sin romper la pagina */ }
  }

  function allKeys() {
    var out = [];
    if (!LS) return out;
    try {
      for (var i = 0; i < LS.length; i++) out.push(LS.key(i));
    } catch (e) {}
    return out;
  }

  function del(k) {
    if (!LS) return;
    try { LS.removeItem(k); } catch (e) {}
  }

  /* ------------------------------------------------------------------ */
  /* utilidades                                                          */
  /* ------------------------------------------------------------------ */
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  // clave de dia en hora LOCAL del visitante: YYYY-MM-DD
  function dayKey(offsetDays) {
    var d = new Date();
    if (offsetDays) d.setDate(d.getDate() + offsetDays);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function uuid() {
    try {
      if (window.crypto && typeof window.crypto.randomUUID === 'function') {
        return window.crypto.randomUUID();
      }
    } catch (e) {}
    var b = new Uint8Array(16);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(b);
    } else {
      for (var i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256);
    }
    b[6] = (b[6] & 15) | 64;
    b[8] = (b[8] & 63) | 128;
    var h = [];
    for (var j = 0; j < 16; j++) h.push((b[j] + 0x100).toString(16).slice(1));
    return h.slice(0, 4).join('') + '-' + h.slice(4, 6).join('') + '-' +
           h.slice(6, 8).join('') + '-' + h.slice(8, 10).join('') + '-' +
           h.slice(10).join('');
  }

  function fmtDur(ms) {
    if (!ms || ms < 0) return '—';
    var s = Math.round(ms / 1000);
    if (s < 60) return s + 's';
    var m = Math.floor(s / 60), r = s % 60;
    if (m < 60) return m + 'm ' + pad2(r) + 's';
    var h = Math.floor(m / 60);
    return h + 'h ' + pad2(m % 60) + 'm';
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function short(s, n) {
    s = String(s == null ? '' : s);
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  }

  /* ------------------------------------------------------------------ */
  /* 1) identidad del visitante                                          */
  /* ------------------------------------------------------------------ */
  var K_VID = 'apt_visitor_id';
  var VID = get(K_VID, null);
  if (typeof VID !== 'string' || VID.length < 8) {
    VID = uuid();                       // primer acceso -> UUID unico
    set(K_VID, VID);
  }

  /* ------------------------------------------------------------------ */
  /* 2) visitas por dia (unicos) + pageviews + sesiones                  */
  /* ------------------------------------------------------------------ */
  var today = dayKey(0);
  var yesterday = dayKey(-1);

  var kVisits = 'visits_' + today;
  var uniq = get(kVisits, []);
  if (!Array.isArray(uniq)) uniq = [];
  if (uniq.indexOf(VID) === -1) {
    uniq.push(VID);
    set(kVisits, uniq);
  }

  var kPv = 'pv_' + today;
  var pvToday = get(kPv, 0);
  set(kPv, (typeof pvToday === 'number' ? pvToday : 0) + 1);

  var sessions = get('apt_sessions', 0);
  set('apt_sessions', (typeof sessions === 'number' ? sessions : 0) + 1);
  set('apt_last_seen', new Date().toISOString());

  /* ------------------------------------------------------------------ */
  /* 3) duracion de sesion                                               */
  /* ------------------------------------------------------------------ */
  var K_DUR_T = 'apt_dur_total_ms';
  var K_DUR_N = 'apt_dur_count';
  var lastTick = Date.now();
  var flushLock = false;

  function flushDuration() {
    if (flushLock) return;
    var t = Date.now() - lastTick;
    lastTick = Date.now();
    if (t < 1000 || t > 6 * 3600 * 1000) return; // ignora ruido y pestanas olvidadas
    flushLock = true;
    var total = get(K_DUR_T, 0);
    var count = get(K_DUR_N, 0);
    set(K_DUR_T, (typeof total === 'number' ? total : 0) + t);
    set(K_DUR_N, (typeof count === 'number' ? count : 0) + 1);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      flushDuration();
    } else {
      flushLock = false;
      lastTick = Date.now();
    }
  });
  window.addEventListener('pagehide', flushDuration);
  window.addEventListener('beforeunload', flushDuration);

  /* ------------------------------------------------------------------ */
  /* 4) clicks en <a> y <button>                                         */
  /* ------------------------------------------------------------------ */
  var K_CLICKS = 'apt_clicks';

  function trackClick(el) {
    var tag = el.tagName.toLowerCase();
    var href = tag === 'a' ? (el.getAttribute('href') || '') : '';
    var text = (el.getAttribute('data-analytics-label') ||
                el.getAttribute('aria-label') ||
                el.textContent || '').replace(/\s+/g, ' ').trim();
    if (text.length > 60) text = text.slice(0, 57) + '…';
    if (!text) text = href || tag;

    var key = (tag + '|' + text + '|' + href).slice(0, 220);
    var clicks = get(K_CLICKS, {});
    if (!clicks || typeof clicks !== 'object' || Array.isArray(clicks)) clicks = {};

    var rec = clicks[key] || { n: 0, tag: tag, text: text, href: href };
    rec.n = (rec.n || 0) + 1;
    clicks[key] = rec;

    // si no cabe, descarta los destinos con menos clicks
    try {
      set(K_CLICKS, clicks);
    } catch (e) {}

    var ct = get('apt_clicks_total', 0);
    set('apt_clicks_total', (typeof ct === 'number' ? ct : 0) + 1);
  }

  document.addEventListener('click', function (ev) {
    var node = ev.target;
    if (node && node.closest && node.closest('#apt-analytics-overlay')) return; // no trackear el panel
    while (node && node.nodeType === 1) {
      var tn = node.tagName;
      if (tn === 'A' || tn === 'BUTTON') { trackClick(node); return; }
      node = node.parentNode;
    }
  }, true);

  /* ------------------------------------------------------------------ */
  /* 5) agregacion de metricas                                           */
  /* ------------------------------------------------------------------ */
  function collect() {
    var ks = allKeys();
    var byDay = {};      // fecha -> {unicos, pv}
    var distinct = {};   // unicos historicos
    var totalUniqDays = 0;
    var totalPv = 0;

    for (var i = 0; i < ks.length; i++) {
      var k = ks[i], arr, n;
      if (k.indexOf('visits_') === 0) {
        arr = get(k, []);
        if (!Array.isArray(arr)) arr = [];
        var d = k.slice(7);
        byDay[d] = byDay[d] || { unicos: 0, pv: 0 };
        byDay[d].unicos = arr.length;
        totalUniqDays += arr.length;
        for (var j = 0; j < arr.length; j++) distinct[arr[j]] = 1;
      } else if (k.indexOf('pv_') === 0) {
        n = get(k, 0);
        n = typeof n === 'number' ? n : 0;
        var d2 = k.slice(3);
        byDay[d2] = byDay[d2] || { unicos: 0, pv: 0 };
        byDay[d2].pv = n;
        totalPv += n;
      }
    }

    var durTotal = get(K_DUR_T, 0); durTotal = typeof durTotal === 'number' ? durTotal : 0;
    var durCount = get(K_DUR_N, 0); durCount = typeof durCount === 'number' ? durCount : 0;

    var clicks = get(K_CLICKS, {});
    var clickList = [];
    if (clicks && typeof clicks === 'object' && !Array.isArray(clicks)) {
      for (var kk in clicks) {
        if (!Object.prototype.hasOwnProperty.call(clicks, kk)) continue;
        var r = clicks[kk] || {};
        clickList.push({
          label: short(r.text || kk, 60),
          tag: r.tag || '',
          text: r.text || '',
          href: r.href || '',
          count: typeof r.n === 'number' ? r.n : 0
        });
      }
    }
    clickList.sort(function (a, b) { return b.count - a.count; });

    var dates = Object.keys(byDay).sort();

    return {
      visitor_id: VID,
      hoy: byDay[today] ? byDay[today].unicos : (uniq.length || 0),
      hoy_pv: byDay[today] ? byDay[today].pv : (typeof pvToday === 'number' ? pvToday : 0),
      ayer: byDay[yesterday] ? byDay[yesterday].unicos : 0,
      ayer_pv: byDay[yesterday] ? byDay[yesterday].pv : 0,
      total_unicos_dia: totalUniqDays,
      unicos_historicos: Object.keys(distinct).length,
      sesiones: (function () { var s = get('apt_sessions', 0); return typeof s === 'number' ? s : 0; })(),
      pageviews_total: totalPv,
      dur_total: durTotal,
      dur_count: durCount,
      dur_prom: durCount > 0 ? durTotal / durCount : 0,
      clicks_total: (function () { var c = get('apt_clicks_total', 0); return typeof c === 'number' ? c : 0; })(),
      top: clickList.slice(0, 5),
      clicks_unicos: clickList.length,
      por_dia: byDay,
      dias: dates,
      ultimo: get('apt_last_seen', null)
    };
  }

  /* ------------------------------------------------------------------ */
  /* 6) panel oculto (Ctrl + Shift + A)                                  */
  /* ------------------------------------------------------------------ */
  var STYLE_ID = 'apt-analytics-styles';
  var overlay = null;

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = [
      '#apt-analytics-overlay{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483000;',
      'background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;padding:16px;',
      'font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;}',
      '#apt-analytics-panel{width:min(700px,100%);max-height:88vh;overflow:auto;box-sizing:border-box;',
      'background:#050905;border:1px solid #12401f;border-radius:14px;padding:20px 22px 18px;',
      'color:#3cff8f;font-size:13px;line-height:1.5;text-shadow:0 0 6px rgba(60,255,143,.35);',
      'box-shadow:0 0 0 1px #000,0 24px 60px rgba(0,0,0,.85),0 0 34px rgba(0,255,120,.10);}',
      '#apt-analytics-panel *{box-sizing:border-box;}',
      '#apt-analytics-panel h2{margin:0;font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:#5dffa8;}',
      '#apt-analytics-head{display:flex;align-items:center;justify-content:space-between;gap:12px;',
      'border-bottom:1px dashed #1c5c2e;padding-bottom:12px;margin-bottom:14px;}',
      '#apt-analytics-close{background:transparent;border:1px solid #1c5c2e;border-radius:8px;color:#3cff8f;',
      'font:inherit;cursor:pointer;padding:2px 9px;}',
      '#apt-analytics-close:hover{background:#0d2a16;}',
      '#apt-analytics-panel .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:16px;}',
      '#apt-analytics-panel .kpi{border:1px solid #12401f;border-radius:10px;padding:10px 12px;background:#071008;}',
      '#apt-analytics-panel .kpi .lbl{display:block;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#2fbf68;opacity:.85;}',
      '#apt-analytics-panel .kpi .val{display:block;font-size:22px;font-weight:700;color:#7dffb4;margin-top:2px;}',
      '#apt-analytics-panel .kpi .sub{display:block;font-size:10px;color:#2fbf68;opacity:.7;}',
      '#apt-analytics-panel h3{margin:0 0 8px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#5dffa8;}',
      '#apt-analytics-panel table{width:100%;border-collapse:collapse;}',
      '#apt-analytics-panel td{padding:5px 6px;border-bottom:1px dotted #123f1f;vertical-align:middle;}',
      '#apt-analytics-panel td.rk{color:#2fbf68;width:26px;}',
      '#apt-analytics-panel td.dest{color:#7dffb4;word-break:break-word;}',
      '#apt-analytics-panel td.bar{color:#2fbf68;white-space:nowrap;text-align:right;letter-spacing:-1px;width:90px;}',
      '#apt-analytics-panel td.n{color:#e8ffe8;text-align:right;width:46px;font-weight:700;}',
      '#apt-analytics-panel .href{display:block;font-size:10px;color:#2fbf68;opacity:.75;word-break:break-all;}',
      '#apt-analytics-panel .empty{color:#2fbf68;opacity:.7;font-style:italic;}',
      '#apt-analytics-foot{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;',
      'border-top:1px dashed #1c5c2e;margin-top:16px;padding-top:12px;}',
      '#apt-analytics-panel button.act{background:#062012;border:1px solid #1c5c2e;border-radius:8px;color:#3cff8f;',
      'font:inherit;cursor:pointer;padding:7px 12px;}',
      '#apt-analytics-panel button.act:hover{background:#0d2a16;border-color:#2fbf68;}',
      '#apt-analytics-panel button.act.warn{color:#ff9b6b;border-color:#5c2c1c;}',
      '#apt-analytics-panel button.act.warn:hover{background:#2a1206;}',
      '#apt-analytics-panel .stamp{font-size:10px;color:#2fbf68;opacity:.8;}',
      '#apt-analytics-panel .scan{font-size:10px;color:#2fbf68;opacity:.55;white-space:nowrap;overflow:hidden;}',
      '@media(max-width:520px){#apt-analytics-panel{padding:16px;font-size:12px;}',
      '#apt-analytics-panel .kpi .val{font-size:18px;}}'
    ].join('');
    var st = document.createElement('style');
    st.id = STYLE_ID;
    st.appendChild(document.createTextNode(css));
    document.head.appendChild(st);
  }

  function bars(n, max) {
    var slots = 8;
    var filled = max > 0 ? Math.max(1, Math.round((n / max) * slots)) : 0;
    var s = '';
    for (var i = 0; i < slots; i++) s += i < filled ? '█' : '·';
    return s;
  }

  function renderPanel() {
    var d = collect();
    var maxN = d.top.length ? d.top[0].count : 0;

    var rows = d.top.map(function (c, i) {
      return '<tr>' +
        '<td class="rk">#' + (i + 1) + '</td>' +
        '<td class="dest">' + esc(short(c.text, 44)) +
          (c.href ? '<span class="href">' + esc(short(c.href, 70)) + '</span>' : '') +
        '</td>' +
        '<td class="bar">' + bars(c.count, maxN) + '</td>' +
        '<td class="n">' + c.count + '</td>' +
      '</tr>';
    }).join('');

    if (!rows) {
      rows = '<tr><td colspan="4" class="empty">Sin clicks registrados todavia.</td></tr>';
    }

    var ultimo = d.ultimo ? new Date(d.ultimo).toLocaleString('es-CO') : '—';
    var dias = d.dias.length;
    var rango = dias ? (d.dias[0] + ' → ' + d.dias[dias - 1]) : 'sin datos';

    return '' +
      '<div id="apt-analytics-head">' +
        '<h2>▚ Traffic Monitor</h2>' +
        '<button id="apt-analytics-close" type="button" title="Cerrar (Esc)">✕</button>' +
      '</div>' +

      '<div class="kpis">' +
        '<div class="kpi"><span class="lbl">Visitas hoy</span><span class="val">' + d.hoy +
          '</span><span class="sub">' + d.hoy_pv + ' páginas vistas</span></div>' +
        '<div class="kpi"><span class="lbl">Visitas ayer</span><span class="val">' + d.ayer +
          '</span><span class="sub">' + d.ayer_pv + ' páginas vistas</span></div>' +
        '<div class="kpi"><span class="lbl">Total únicos/día</span><span class="val">' + d.total_unicos_dia +
          '</span><span class="sub">' + d.unicos_historicos + ' únicos histórico</span></div>' +
        '<div class="kpi"><span class="lbl">Duración promedio</span><span class="val">' + fmtDur(d.dur_prom) +
          '</span><span class="sub">' + d.dur_count + ' sesiones medidas</span></div>' +
        '<div class="kpi"><span class="lbl">Sesiones totales</span><span class="val">' + d.sesiones +
          '</span><span class="sub">' + d.pageviews_total + ' pageviews</span></div>' +
        '<div class="kpi"><span class="lbl">Clicks totales</span><span class="val">' + d.clicks_total +
          '</span><span class="sub">' + d.clicks_unicos + ' destinos distintos</span></div>' +
      '</div>' +

      '<h3>Top 5 elementos más clickeados</h3>' +
      '<table>' + rows + '</table>' +

      '<div id="apt-analytics-foot">' +
        '<button class="act" id="apt-analytics-export" type="button">⬇ Exportar JSON</button>' +
        '<button class="act warn" id="apt-analytics-reset" type="button">⌫ Borrar datos</button>' +
        '<span class="stamp">' +
          'actualizado ' + new Date().toLocaleString('es-CO') +
          ' · días: ' + dias + ' (' + esc(rango) + ')<br>' +
          'última visita: ' + esc(ultimo) +
        '</span>' +
      '</div>' +
      '<div class="scan">' + esc(VID) + '</div>';
  }

  function paint() {
    var body = document.getElementById('apt-analytics-body');
    if (body) body.innerHTML = renderPanel();
  }

  function open() {
    if (overlay) { paint(); return; }
    ensureStyles();
    overlay = document.createElement('div');
    overlay.id = 'apt-analytics-overlay';
    overlay.innerHTML = '<div id="apt-analytics-panel" role="dialog" aria-label="Panel de trafico">' +
      '<div id="apt-analytics-body"></div></div>';
    document.body.appendChild(overlay);
    paint();

    overlay.addEventListener('click', function (ev) {
      if (ev.target === overlay) close();
    });
    var btn = document.getElementById('apt-analytics-close');
    if (btn) btn.addEventListener('click', close);

    var ex = document.getElementById('apt-analytics-export');
    if (ex) ex.addEventListener('click', exportJSON);

    var rs = document.getElementById('apt-analytics-reset');
    if (rs) rs.addEventListener('click', function () {
      if (!LS) return;
      if (!window.confirm('¿Borrar todas las métricas guardadas en este navegador?')) return;
      var ks = allKeys();
      for (var i = 0; i < ks.length; i++) {
        var k = ks[i];
        if (k.indexOf('visits_') === 0 || k.indexOf('pv_') === 0 || k.indexOf('apt_') === 0) del(k);
      }
      VID = uuid();
      set(K_VID, VID);
      set('visits_' + dayKey(0), [VID]);
      paint();
    });
  }

  function close() {
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    overlay = null;
  }

  function toggle() { overlay ? close() : open(); }

  /* export ---------------------------------------------------------- */
  function exportJSON() {
    var d = collect();
    var payload = {
      generated_at: new Date().toISOString(),
      site: window.location.href,
      visitor_actual: d.visitor_id,
      resumen: {
        visitas_hoy: d.hoy,
        visitas_ayer: d.ayer,
        total_unicos_por_dia: d.total_unicos_dia,
        unicos_historicos: d.unicos_historicos,
        sesiones_totales: d.sesiones,
        pageviews_totales: d.pageviews_total,
        duracion_promedio_ms: Math.round(d.dur_prom),
        duracion_promedio_legible: fmtDur(d.dur_prom),
        sesiones_medidas: d.dur_count,
        clicks_totales: d.clicks_total,
        destinos_distintos: d.clicks_unicos
      },
      visitas_por_dia: d.por_dia,
      top_clicks: d.top,
      clicks_detalle: (function () {
        var c = get(K_CLICKS, {});
        var out = [];
        if (c && typeof c === 'object' && !Array.isArray(c)) {
          for (var k in c) {
            if (!Object.prototype.hasOwnProperty.call(c, k)) continue;
            out.push({ destino: k, tag: c[k].tag, texto: c[k].text, href: c[k].href, clicks: c[k].n });
          }
        }
        out.sort(function (a, b) { return b.clicks - a.clicks; });
        return out;
      })(),
      nota: 'Datos locales del navegador (localStorage). Sin dependencias externas.'
    };

    try {
      var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'analytics-' + dayKey(0) + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    } catch (e) {
      window.prompt('Copia los datos:', JSON.stringify(payload));
    }
  }

  /* atajo: Ctrl + Shift + A ----------------------------------------- */
  document.addEventListener('keydown', function (ev) {
    var k = ev.key || '';
    if (ev.ctrlKey && ev.shiftKey && (k === 'A' || k === 'a' || ev.code === 'KeyA')) {
      ev.preventDefault();
      toggle();
      return;
    }
    if (k === 'Escape' && overlay) close();
  });

  window.__aptAnalytics = {
    show: open,
    hide: close,
    toggle: toggle,
    data: collect,
    export: exportJSON
  };
})();
