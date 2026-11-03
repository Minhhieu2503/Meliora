/* ==========================================================================
   MELIORA — Artisan Beverage Bombs
   Shop (SKU catalog), product pages, gift builder, cart and order hand-off.
   Orders are sent to Meliora through Zalo / Messenger: there is no backend,
   so the site never claims an order was received before the customer sends it.
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     0. CONFIG — change contact channels / prices here
     ------------------------------------------------------------------------ */
  const CONTACT = {
    phone: '+84 842 097 274',
    tel: '+84842097274',
    zalo: 'https://zalo.me/0842097274',
    messenger: 'https://m.me/meliora.vietnam',
    email: 'hellomelioravn@gmail.com'
  };
  const BOX = {
    3: { sku: 'GS-3', name: 'Gift Set 3', price: 100000, image: 'assets/products/set3.webp', mustTry: true },
    6: { sku: 'GS-6', name: 'Gift Set 6', price: 190000, image: 'assets/products/set6.webp' }
  };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reload always starts at the top of the page (product deep links #/san-pham/... still work)
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.hash && !location.hash.startsWith('#/')) history.replaceState(null, '', location.pathname + location.search);
  window.scrollTo(0, 0);
  window.addEventListener('load', () => { if (!location.hash.startsWith('#/')) window.scrollTo(0, 0); });

  /* ------------------------------------------------------------------------
     1. CATALOG — SKU list from brief section 4.3
     status: 'available' | 'soldout' | 'soon'  (update to match real stock)
     ------------------------------------------------------------------------ */
  const LINE = {
    tea: { name: 'Tea Bomb', long: 'Hot-Infusion Tea Bomb' },
    mocktail: { name: 'Mocktail Bomb', long: 'Sparkling Mocktail Bomb' }
  };

  const LABEL = {
    tea: {
      storage: 'Giữ trong bao bì kín cản ẩm, tránh ánh nắng trực tiếp. Mở túi sử dụng ngay.',
      caution: 'Sử dụng ly chịu nhiệt. Không dùng nếu mẫn cảm với thành phần. Sản phẩm có chứa trà, có thể chứa caffeine tự nhiên.',
      steps: [
        ['Mở gói', 'Lấy 01 viên ra khỏi lớp bọc.'],
        ['Chuẩn bị nước', 'Rót 250 mL nước nóng khoảng 90°C.'],
        ['Thả viên', 'Thả viên vào ly; chờ lớp vỏ tan.'],
        ['Ủ trà & thưởng thức', 'Ủ 5 phút.']
      ],
      note: 'Dùng ly chịu nhiệt. Cẩn thận khi pha với nước nóng.'
    },
    mocktail: {
      storage: 'Giữ trong bao bì kín cản ẩm, tránh ánh nắng trực tiếp. Mở túi sử dụng ngay.',
      caution: 'Không dùng nếu mẫn cảm với thành phần.',
      steps: [
        ['Mở gói', 'Lấy 01 viên ra khỏi lớp bọc.'],
        ['Chuẩn bị nước', 'Rót 250 mL nước có gas lạnh vào ly.'],
        ['Thả viên', 'Thả viên, chờ sủi tan 2–3 phút.'],
        ['Khuấy & thưởng thức', 'Khuấy nhẹ, thêm đá nếu thích.']
      ],
      note: 'Không pha trong chai kín. Có thể thay bằng nước lạnh.'
    }
  };

  const products = [
    {
      sku: 'TB-PO', line: 'tea', en: 'Peach Oolong', vn: 'Đào Ô Long', color: '#E8A06A',
      notes: 'Trà ô long dịu, đào sấy ngọt nhẹ và chút hương hoa mộc.',
      weight: '17 g',
      ingredients: 'Isomalt (E953), trà ô long khô, đào sấy khô, hoa mộc khô dùng cho thực phẩm.',
      lot: 'TB-PO-261101-01', mfg: '01/11/2026', exp: '01/12/2026'
    },
    {
      sku: 'TB-OC', line: 'tea', en: 'Orange Cinnamon', vn: 'Cam Quế', color: '#C9702E',
      notes: 'Cam sấy thơm vỏ cùng quế ấm, vị trà tròn và ấm.'
    },
    {
      sku: 'TB-MPF', line: 'tea', en: 'Mango Passion Fruit', vn: 'Xoài Chanh Dây', color: '#EDA93C',
      notes: 'Xoài sấy ngọt, chanh dây chua nhẹ, ly trà màu vàng nắng.'
    },
    {
      sku: 'TB-SR', line: 'tea', en: 'Strawberry Rose', vn: 'Dâu Hoa Hồng', color: '#E07E86',
      notes: 'Dâu sấy và cánh hồng khô, vị chua ngọt, ly trà ngả hồng.'
    },
    {
      sku: 'TB-AG', line: 'tea', en: 'Apple Ginger', vn: 'Táo Gừng', color: '#D69A4A',
      notes: 'Táo sấy ngọt thanh, gừng ấm nhẹ ở hậu vị.'
    },
    {
      sku: 'TB-BL', line: 'tea', en: 'Blueberry Lavender', vn: 'Việt Quất Oải Hương', color: '#6E4A78',
      notes: 'Việt quất và oải hương, ly trà màu tím, hương dịu.'
    },
    {
      sku: 'TB-CRG', line: 'tea', en: 'Chamomile, Red Date and Goji', vn: 'Hoa Cúc Táo Đỏ Kỷ Tử', color: '#E7B456',
      notes: 'Hoa cúc, táo đỏ và kỷ tử, vị ngọt hiền, nhẹ nhàng.'
    },

    {
      sku: 'MB-WBL', line: 'mocktail', en: 'Wild Berry Lemon', vn: 'Chanh Dâu Rừng', color: '#D98A9B',
      notes: 'Dâu rừng chua ngọt gặp chanh vàng, sủi bọt tươi mát.'
    },
    {
      sku: 'MB-PM', line: 'mocktail', en: 'Peach Mango', vn: 'Đào Xoài', color: '#E9B43C',
      notes: 'Đào và xoài chín, ngọt mềm, màu vàng cam.'
    },
    {
      sku: 'MB-CM', line: 'mocktail', en: 'Citrus Mint', vn: 'Cam Chanh Bạc Hà', color: '#9DBF7A',
      notes: 'Cam chanh tươi và bạc hà mát lạnh, hợp ngày nóng.'
    },
    {
      sku: 'MB-PC', line: 'mocktail', en: 'Pomegranate Cherry', vn: 'Lựu Cherry', color: '#B23A5C',
      notes: 'Lựu và cherry, sắc đỏ, vị chua ngọt cân bằng.'
    }
  ].map(p => ({
    status: 'available',
    price: 30000,
    image: `assets/products/${p.sku}.jpg`,
    slug: p.sku.toLowerCase(),
    ...p
  }));

  const bySku = Object.fromEntries(products.map(p => [p.sku, p]));
  const bySlug = Object.fromEntries(products.map(p => [p.slug, p]));
  const STATUS = { available: 'Còn hàng', soldout: 'Sold Out', soon: 'Coming Soon' };

  /* ------------------------------------------------------------------------
     2. HELPERS
     ------------------------------------------------------------------------ */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const vnd = n => new Intl.NumberFormat('vi-VN').format(n) + '₫';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
  };
  const productUrl = p => `#/san-pham/${p.slug}`;
  const HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.5 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.5 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg>';
  const plusIcon = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v12M2 8h12"/></svg>';
  const canBuy = p => p.status === 'available';

  /* ------------------------------------------------------------------------
     3. HERO: load sequence + petals
     ------------------------------------------------------------------------ */
  const startHero = () => document.body.classList.add('is-loaded');
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 900))]).then(() => requestAnimationFrame(startHero));
  } else {
    requestAnimationFrame(startHero);
  }

  const petalField = $('#petal-field');
  if (petalField && !reduceMotion) {
    const colors = ['#E9B3B4', '#DFA0A3', '#F0C9C6', '#B9C9A8', '#9FB592'];
    const count = window.innerWidth < 700 ? 6 : 12;
    let html = '';
    for (let i = 0; i < count; i++) {
      const leaf = i % 4 === 3;
      const s = leaf ? 14 + Math.random() * 10 : 10 + Math.random() * 12;
      const t = 18 + Math.random() * 14;
      html += `<span class="petal" style="--x:${(Math.random() * 100).toFixed(1)}%;--s:${s.toFixed(0)}px;--t:${t.toFixed(1)}s;--delay:${(-Math.random() * t).toFixed(1)}s;--dx:${(Math.random() * 160 - 80).toFixed(0)}px;--r:${(Math.random() * 540 - 270).toFixed(0)}deg;--c:${leaf ? colors[3 + (i % 2)] : colors[i % 3]};opacity:${(0.4 + Math.random() * 0.4).toFixed(2)}"><svg><use href="#i-${leaf ? 'leaf' : 'petal'}"/></svg></span>`;
    }
    petalField.innerHTML = html;
  }

  /* ------------------------------------------------------------------------
     4. HEADER, NAV HIGHLIGHT, MOBILE MENU
     ------------------------------------------------------------------------ */
  const header = $('#site-header');
  const mobileNav = $('#mobile-nav');
  const menuToggle = $('#menu-toggle');
  let lastY = window.scrollY;

  function onScrollHeader() {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    lastY = y; // header stays fixed and visible at all times
  }

  function setMobileNav(open) {
    mobileNav.classList.toggle('is-open', open);
    mobileNav.setAttribute('aria-hidden', String(!open));
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    document.body.style.overflow = open ? 'hidden' : '';
    header.classList.remove('is-hidden');
  }
  menuToggle.addEventListener('click', () => setMobileNav(!mobileNav.classList.contains('is-open')));

  const navLinks = $$('.main-nav a');
  if ('IntersectionObserver' in window) {
    const sectionObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const id = e.target.id === 'gift' ? 'gift' : e.target.id;
        navLinks.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === '#' + id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['shop', 'how', 'gift', 'story', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObs.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     5. SMOOTH SCROLL + ROUTER (home sections / product pages)
     ------------------------------------------------------------------------ */
  const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let scrollAnim = null;

  function scrollToEl(el, instant) {
    if (!el) return;
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 72;
    const target = Math.max(0, el.getBoundingClientRect().top + window.scrollY - (el.id === 'top' ? 0 : offset - 1));
    if (reduceMotion || instant) { window.scrollTo(0, target); return; }
    const start = window.scrollY;
    const dist = target - start;
    const dur = Math.min(1400, Math.max(600, Math.abs(dist) * 0.42));
    const t0 = performance.now();
    cancelAnimationFrame(scrollAnim);
    const step = now => {
      const p = Math.min(1, (now - t0) / dur);
      window.scrollTo(0, start + dist * easeInOut(p));
      if (p < 1) scrollAnim = requestAnimationFrame(step);
    };
    scrollAnim = requestAnimationFrame(step);
  }
  ['wheel', 'touchstart', 'keydown'].forEach(ev => window.addEventListener(ev, () => cancelAnimationFrame(scrollAnim), { passive: true }));

  const productPage = $('#product-page');
  const homeSections = () => $$('#main > section:not(#product-page)');
  let homeScrollY = 0;

  function showHome() {
    if (!document.body.classList.contains('on-product')) return;
    document.body.classList.remove('on-product');
    productPage.hidden = true;
    productPage.innerHTML = '';
    homeSections().forEach(s => { s.hidden = false; });
    document.title = 'Meliora — Tea Bomb & Sparkling Mocktail Bomb | Chạm nước, Bung hương, Vương vị';
  }

  function route() {
    const m = location.hash.match(/^#\/san-pham\/([a-z0-9-]+)/i);
    if (m && bySlug[m[1].toLowerCase()]) {
      if (!document.body.classList.contains('on-product')) homeScrollY = window.scrollY;
      renderProductPage(bySlug[m[1].toLowerCase()]);
      return;
    }
    if (document.body.classList.contains('on-product')) {
      showHome();
      requestAnimationFrame(() => {
        const id = location.hash.slice(1);
        const el = id && document.getElementById(id);
        if (el) scrollToEl(el, true);
        else window.scrollTo(0, homeScrollY);
        frame();
      });
    }
  }
  window.addEventListener('hashchange', route);

  // buttons that scroll to a section (e.g. "Xem cách pha")
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-scroll]');
    if (!btn) return;
    const el = document.getElementById(btn.dataset.scroll);
    if (el) scrollToEl(el);
  });

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href.startsWith('#/')) {
      if (mobileNav.classList.contains('is-open')) setMobileNav(false);
      closeAllOverlays();
      return; // router handles product pages
    }
    const id = href.slice(1);
    if (!id) return;
    e.preventDefault();
    if (mobileNav.classList.contains('is-open')) setMobileNav(false);
    closeAllOverlays();
    if (a.dataset.filter) setShopFilter(a.dataset.filter, true);
    const wasProduct = document.body.classList.contains('on-product');
    if (wasProduct) showHome();
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'DETAILS') el.open = true;
    history.replaceState(null, '', location.pathname + location.search); // keep URL clean so reload starts at top
    if (wasProduct) requestAnimationFrame(() => { scrollToEl(el, true); frame(); });
    else scrollToEl(el);
  });

  /* ------------------------------------------------------------------------
     6. REVEAL + PARALLAX
     ------------------------------------------------------------------------ */
  let io = null;
  function observeReveal(root = document) {
    const els = $$('[data-reveal]:not(.is-in), [data-clip]:not(.is-in)', root);
    if (!io) { els.forEach(el => el.classList.add('is-in')); return; }
    const targets = new Map();
    els.forEach(el => {
      const watch = el.hasAttribute('data-clip') ? el.parentElement : el;
      if (!targets.has(watch)) targets.set(watch, []);
      targets.get(watch).push(el);
    });
    targets.forEach((list, watch) => { watch._reveal = (watch._reveal || []).concat(list); io.observe(watch); });
  }
  if ('IntersectionObserver' in window && !reduceMotion) {
    io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        (e.target._reveal || []).forEach(el => el.classList.add('is-in'));
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
  }
  observeReveal();

  const parallaxEls = reduceMotion ? [] : $$('[data-parallax]');
  let ticking = false;
  function frame() {
    ticking = false;
    onScrollHeader();
    const vh = window.innerHeight;
    parallaxEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const k = parseFloat(el.dataset.parallax) || 0;
      el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * k).toFixed(1)}px, 0)`;
    });
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  window.addEventListener('resize', () => requestAnimationFrame(frame));
  frame();

  /* ------------------------------------------------------------------------
     7. HOW IT WORKS TABS
     ------------------------------------------------------------------------ */
  const segBtns = $$('.seg-btn');
  const segThumb = $('.seg-thumb');
  const placeThumb = btn => {
    if (!segThumb || !btn) return;
    segThumb.style.width = btn.offsetWidth + 'px';
    segThumb.style.transform = `translateX(${btn.offsetLeft}px)`;
  };
  function selectTab(btn, focus) {
    segBtns.forEach(b => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(b.getAttribute('aria-controls'));
      panel.hidden = !on;
      panel.classList.toggle('is-active', on);
    });
    placeThumb(btn);
    if (focus) btn.focus();
  }
  segBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => selectTab(btn));
    btn.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      selectTab(segBtns[(i + (e.key === 'ArrowRight' ? 1 : -1) + segBtns.length) % segBtns.length], true);
    });
  });
  window.addEventListener('resize', () => placeThumb($('.seg-btn.is-active')));
  requestAnimationFrame(() => placeThumb($('.seg-btn.is-active')));
  if (document.fonts) document.fonts.ready.then(() => placeThumb($('.seg-btn.is-active')));

  /* ------------------------------------------------------------------------
     8. SHOP GRID (product card fields from brief 4.1)
     ------------------------------------------------------------------------ */
  const shopTrack = $('#shop-track');
  const shopViewport = $('#shop-viewport');
  const shopPrev = $('#shop-prev');
  const shopNext = $('#shop-next');
  const shopDots = $('#shop-dots');
  const shopCounter = $('#shop-counter');
  const PER_PAGE = 4;
  let shopPage = 0;
  let shopPages = 1;
  let shopFilter = 'all';

  const statusBadge = p => `<span class="status status-${p.status}">${STATUS[p.status]}</span>`;

  function productCard(p) {
    return `
      <article class="card" style="--fc:${p.color}" data-sku="${p.sku}">
        <a class="card-img" href="${productUrl(p)}" aria-label="Xem chi tiết ${esc(p.vn)}">
          <img src="${p.image}" alt="Viên ${esc(LINE[p.line].name)} ${esc(p.vn)}" loading="lazy" width="880" height="1100" />
          ${statusBadge(p)}
          ${p.mustTry ? `<span class="must-try">${HEART}Must try</span>` : ''}
        </a>
        <div class="card-body">
          <p class="card-line card-line-${p.line}">${LINE[p.line].name}</p>
          <h3 class="card-title"><a href="${productUrl(p)}">${esc(p.vn)}</a></h3>
          <p class="card-en">${esc(p.en)} <span class="sku">${p.sku}</span></p>
          <p class="card-notes">${esc(p.notes)}</p>
          <p class="card-price">${vnd(p.price)}</p>
          <div class="card-actions">
            <a class="btn btn-line btn-sm" href="${productUrl(p)}" aria-label="View Details: ${esc(p.vn)}">View Details</a>
            <button class="btn btn-solid btn-sm add-btn" data-add="${p.sku}" ${canBuy(p) ? '' : 'disabled'} aria-label="Add to Cart: ${esc(p.vn)}">${canBuy(p) ? plusIcon + '<span>Add to Cart</span>' : STATUS[p.status]}</button>
          </div>
        </div>
      </article>`;
  }

  function giftCard(size) {
    const b = BOX[size];
    return `
      <article class="card card-gift">
        <button class="card-img card-img-box" data-start-builder="${size}" aria-label="Chọn ${b.name}">
          <img src="${b.image}" alt="Hộp quà Meliora ${size} viên" loading="lazy" width="1000" height="1000" />
          <span class="status status-available">Còn hàng</span>
          ${b.mustTry ? `<span class="must-try">${HEART}Must try</span>` : ''}
        </button>
        <div class="card-body">
          <p class="card-line card-line-gift">Gift Set</p>
          <h3 class="card-title"><button data-start-builder="${size}">${b.name}</button></h3>
          <p class="card-en">${size} viên tự chọn vị <span class="sku">${b.sku}</span></p>
          <p class="card-notes">Hộp quà Meliora có cửa sổ trong suốt, kèm thiệp và muỗng.</p>
          <p class="card-price">${vnd(b.price)}</p>
          <div class="card-actions card-actions-one">
            <button class="btn btn-solid btn-sm" data-start-builder="${size}">Chọn Gift Set</button>
          </div>
        </div>
      </article>`;
  }

  function renderShop() {
    const list = shopFilter === 'gift' ? [] : products.filter(p => shopFilter === 'all' || p.line === shopFilter);
    const gifts = shopFilter === 'all' || shopFilter === 'gift' ? [3, 6] : [];
    const cards = list.map(productCard).concat(gifts.map(giftCard));
    shopPages = Math.max(1, Math.ceil(cards.length / PER_PAGE));
    let html = '';
    for (let i = 0; i < shopPages; i++) {
      html += `<div class="shop-page" role="group" aria-roledescription="trang" aria-label="Trang ${i + 1} / ${shopPages}">${cards.slice(i * PER_PAGE, (i + 1) * PER_PAGE).join('')}</div>`;
    }
    shopTrack.innerHTML = html;
    shopDots.innerHTML = Array.from({ length: shopPages }, (_, i) =>
      `<button class="dot" data-page="${i}" aria-label="Trang ${i + 1}"></button>`).join('');
    $$('.shop-page', shopTrack).forEach(pg => $$('.card', pg).forEach((c, i) => { c.style.animationDelay = `${i * 60}ms`; }));
    goShopPage(0, true);
  }

  function goShopPage(n, instant) {
    shopPage = Math.max(0, Math.min(shopPages - 1, n));
    const pages = $$('.shop-page', shopTrack);
    shopTrack.style.transition = instant || reduceMotion ? 'none' : '';
    shopTrack.style.transform = `translateX(calc(${-shopPage} * (100% + var(--page-gap))))`;
    pages.forEach((pg, i) => {
      const on = i === shopPage;
      pg.setAttribute('aria-hidden', String(!on));
      pg.inert = !on;
    });
    if (pages[shopPage]) shopViewport.style.height = pages[shopPage].offsetHeight + 'px';
    shopPrev.disabled = shopPage === 0;
    shopNext.disabled = shopPage === shopPages - 1;
    shopCounter.textContent = `${shopPage + 1} / ${shopPages}`;
    $$('.dot', shopDots).forEach((d, i) => { d.classList.toggle('is-on', i === shopPage); d.setAttribute('aria-current', i === shopPage ? 'true' : 'false'); });
    $('.shop-nav').hidden = shopPages < 2;
  }

  shopPrev.addEventListener('click', () => goShopPage(shopPage - 1));
  shopNext.addEventListener('click', () => goShopPage(shopPage + 1));
  shopDots.addEventListener('click', e => { const d = e.target.closest('[data-page]'); if (d) goShopPage(Number(d.dataset.page)); });
  window.addEventListener('resize', () => goShopPage(shopPage, true));
  shopViewport.addEventListener('load', () => goShopPage(shopPage, true), true);

  // Drag with the mouse, swipe on touch, or scroll sideways on a trackpad to change page
  let drag = null;
  let dragMoved = false;
  shopViewport.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag = { x: e.clientX, y: e.clientY, id: e.pointerId, w: shopViewport.clientWidth, locked: false };
    dragMoved = false;
  });
  shopViewport.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (!drag.locked) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; } // vertical: let the page scroll
      drag.locked = true;
      dragMoved = true;
      shopViewport.setPointerCapture(e.pointerId);
      shopViewport.classList.add('is-dragging');
      shopTrack.style.transition = 'none';
    }
    // resist at the first / last page
    const edge = (shopPage === 0 && dx > 0) || (shopPage === shopPages - 1 && dx < 0);
    const off = edge ? dx * 0.3 : dx;
    shopTrack.style.transform = `translateX(calc(${-shopPage} * (100% + var(--page-gap)) + ${off}px))`;
  });
  const endDrag = e => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    const wasLocked = drag.locked;
    drag = null;
    shopViewport.classList.remove('is-dragging');
    if (!wasLocked) return;
    shopTrack.style.transition = '';
    const threshold = Math.min(120, shopViewport.clientWidth * 0.12);
    if (dx < -threshold) goShopPage(shopPage + 1);
    else if (dx > threshold) goShopPage(shopPage - 1);
    else goShopPage(shopPage);
  };
  shopViewport.addEventListener('pointerup', endDrag);
  shopViewport.addEventListener('pointercancel', endDrag);
  // a drag should not also count as a click on a card
  shopViewport.addEventListener('click', e => {
    if (dragMoved) { e.preventDefault(); e.stopPropagation(); dragMoved = false; }
  }, true);
  shopViewport.addEventListener('dragstart', e => e.preventDefault());

  let wheelLock = 0;
  shopViewport.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 12) return;
    e.preventDefault();
    const now = Date.now();
    if (now < wheelLock) return;
    wheelLock = now + 700;
    goShopPage(shopPage + (e.deltaX > 0 ? 1 : -1));
  }, { passive: false });

  function setShopFilter(filter, silent) {
    if (filter === shopFilter && !silent) return;
    shopFilter = filter;
    $$('.filter-btn').forEach(b => {
      const on = b.dataset.shopFilter === filter;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    if (silent || reduceMotion) { renderShop(); return; }
    shopViewport.classList.add('is-filtering');
    setTimeout(() => { renderShop(); shopViewport.classList.remove('is-filtering'); }, 220);
  }

  $$('.filter-btn').forEach(b => b.addEventListener('click', () => setShopFilter(b.dataset.shopFilter)));
  $('[data-count="all"]').textContent = products.length + 2;
  $('[data-count="tea"]').textContent = products.filter(p => p.line === 'tea').length;
  $('[data-count="mocktail"]').textContent = products.filter(p => p.line === 'mocktail').length;
  $('[data-count="gift"]').textContent = 2;
  renderShop();

  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add && !add.disabled) { addProduct(add.dataset.add, 1, add); return; }
    const start = e.target.closest('[data-start-builder]');
    if (start) startBuilder(Number(start.dataset.startBuilder));
  });

  /* ------------------------------------------------------------------------
     9. PRODUCT DETAIL PAGE (brief 4.2)
     ------------------------------------------------------------------------ */
  function renderProductPage(p) {
    closeAllOverlays();
    document.body.classList.add('on-product');
    homeSections().forEach(s => { s.hidden = true; });
    productPage.hidden = false;
    document.title = `${p.vn} (${p.en}) — ${LINE[p.line].long} | Meliora`;

    const label = LABEL[p.line];
    const gallery = [
      { src: p.image, alt: `Viên ${p.vn}`, cap: 'Viên nguyên vẹn' },
      { src: BOX[3].image, alt: 'Hộp quà Meliora 3 viên', cap: 'Hộp quà 3 viên' },
      { src: BOX[6].image, alt: 'Hộp quà Meliora 6 viên', cap: 'Hộp quà 6 viên' }
    ];
    const rows = [
      ['Tên sản phẩm', `Viên ${p.line === 'tea' ? 'trà' : 'sủi'} ${p.vn}`],
      ['SKU', p.sku],
      ['Dòng', LINE[p.line].long],
      ['Giá / khối lượng', `${vnd(p.price)}/viên${p.weight ? ' · ' + p.weight : ''}`],
      ['Thành phần', p.ingredients || 'Đang cập nhật, in trên nhãn sản phẩm.'],
      ['Bảo quản', label.storage],
      ['Lưu ý', label.caution],
      ...(p.lot ? [['Số lô', p.lot], ['NSX / HSD', `${p.mfg} / ${p.exp}`]] : []),
      ['Xuất xứ', 'Việt Nam'],
      ['Đơn vị chịu trách nhiệm', 'Meliora Vietnam Company Limited'],
      ['Địa chỉ', '04 Nguyễn Bình, Hoà Cường, Hải Châu, Đà Nẵng'],
      ['Hotline / Email', `${CONTACT.phone} · ${CONTACT.email}`]
    ];
    const similar = products.filter(x => x.line === p.line && x.sku !== p.sku).slice(0, 4);

    productPage.innerHTML = `
      <div class="pp wrap" style="--fc:${p.color}">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a href="#top">Trang chủ</a><span aria-hidden="true">/</span>
          <a href="#shop" data-filter="${p.line}">${LINE[p.line].name}s</a><span aria-hidden="true">/</span>
          <span aria-current="page">${esc(p.vn)}</span>
        </nav>

        <div class="pp-grid">
          <div class="pp-gallery">
            <div class="pp-main"><img id="pp-main-img" src="${gallery[0].src}" alt="${esc(gallery[0].alt)}" width="880" height="1100" /></div>
            <div class="pp-thumbs" role="group" aria-label="Ảnh sản phẩm">
              ${gallery.map((g, i) => `
                <button class="pp-thumb${i === 0 ? ' is-on' : ''}" data-src="${g.src}" data-alt="${esc(g.alt)}" aria-label="${esc(g.cap)}">
                  <img src="${g.src}" alt="" loading="lazy" /><span>${esc(g.cap)}</span>
                </button>`).join('')}
            </div>
          </div>

          <div class="pp-info">
            <p class="card-line card-line-${p.line}">${LINE[p.line].long}</p>
            <h1 class="pp-title">${esc(p.vn)}</h1>
            <p class="pp-en">${esc(p.en)} <span class="sku">SKU ${p.sku}</span></p>
            <p class="pp-notes">${esc(p.notes)}</p>
            <div class="pp-price-row">
              <span class="pp-price">${vnd(p.price)}<small> / viên${p.weight ? ' · ' + p.weight : ''}</small></span>
              ${statusBadge(p)}
            </div>

            <div class="pp-buy">
              <div class="qty qty-lg" aria-label="Số lượng">
                <button type="button" data-pq="-1" aria-label="Giảm">−</button>
                <span id="pp-qty" aria-live="polite">1</span>
                <button type="button" data-pq="1" aria-label="Tăng">+</button>
              </div>
              <button class="btn btn-line" id="pp-add" ${canBuy(p) ? '' : 'disabled'}>Add to Cart</button>
              <button class="btn btn-solid" id="pp-order" ${canBuy(p) ? '' : 'disabled'}>Order Now</button>
            </div>
            ${canBuy(p) ? '' : `<p class="pp-unavail">${p.status === 'soon' ? 'Vị này sắp mở bán.' : 'Vị này tạm hết hàng.'} Nhắn Meliora qua <a href="${CONTACT.zalo}" target="_blank" rel="noopener">Zalo</a> để được báo khi có hàng.</p>`}

            <div class="pp-brew">
              <h2>Cách pha</h2>
              <ol>${label.steps.map((s, i) => `<li><span>0${i + 1}</span><strong>${s[0]}</strong> — ${s[1]}</li>`).join('')}</ol>
              <p class="pp-brew-note"><strong>Lưu ý:</strong> ${label.note}</p>
            </div>

            <dl class="pp-label">
              ${rows.map(r => `<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join('')}
            </dl>
          </div>
        </div>

        <section class="pp-similar" aria-labelledby="similar-title">
          <h2 id="similar-title">Bạn có thể thích</h2>
          <div class="shop-grid shop-grid-4">${similar.map(productCard).join('')}</div>
        </section>
      </div>`;

    let qty = 1;
    const qtyEl = $('#pp-qty');
    $$('[data-pq]', productPage).forEach(b => b.addEventListener('click', () => {
      qty = Math.max(1, Math.min(30, qty + Number(b.dataset.pq)));
      qtyEl.textContent = qty;
    }));
    $('#pp-add').addEventListener('click', e => addProduct(p.sku, qty, e.currentTarget));
    $('#pp-order').addEventListener('click', e => { addProduct(p.sku, qty, null, true); openCheckout(e.currentTarget); });

    const mainImg = $('#pp-main-img');
    $$('.pp-thumb', productPage).forEach(t => t.addEventListener('click', () => {
      $$('.pp-thumb', productPage).forEach(x => x.classList.toggle('is-on', x === t));
      mainImg.classList.add('is-swapping');
      setTimeout(() => {
        mainImg.src = t.dataset.src;
        mainImg.alt = t.dataset.alt;
        mainImg.classList.remove('is-swapping');
      }, reduceMotion ? 0 : 180);
    }));

    window.scrollTo(0, 0);
    header.classList.remove('is-hidden');
    $('.pp-title').setAttribute('tabindex', '-1');
    $('.pp-title').focus({ preventScroll: true });
  }

  /* ------------------------------------------------------------------------
     10. OVERLAYS (drawer + modals) with focus handling
     ------------------------------------------------------------------------ */
  const overlayStack = [];
  const cartDrawer = $('#cart-drawer');
  const cartScrim = $('#cart-scrim');

  function openOverlay(el, opener) {
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    overlayStack.push({ el, opener: opener || document.activeElement });
    setTimeout(() => {
      const first = el.querySelector('[data-close], .icon-btn, button, input');
      if (first) first.focus({ preventScroll: true });
    }, 60);
  }

  function closeOverlay(el, keepFocus) {
    const idx = overlayStack.findIndex(o => o.el === el);
    if (idx === -1) return;
    const { opener } = overlayStack.splice(idx, 1)[0];
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    if (el === cartDrawer) cartScrim.classList.remove('is-open');
    if (!overlayStack.length && !mobileNav.classList.contains('is-open')) document.body.style.overflow = '';
    if (!keepFocus && opener && document.contains(opener)) opener.focus({ preventScroll: true });
  }

  function closeAllOverlays() { [...overlayStack].reverse().forEach(o => closeOverlay(o.el, true)); }

  $$('.modal').forEach(m => m.addEventListener('click', e => {
    if (e.target === m || e.target.closest('[data-close]')) closeOverlay(m);
  }));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (overlayStack.length) closeOverlay(overlayStack[overlayStack.length - 1].el);
      else if (mobileNav.classList.contains('is-open')) setMobileNav(false);
    }
    if (e.key === 'Tab' && overlayStack.length) {
      const top = overlayStack[overlayStack.length - 1].el;
      const f = $$('button:not([disabled]), a[href], input, textarea', top).filter(x => x.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ------------------------------------------------------------------------
     11. GIFT BUILDER (brief 4.4)
     ------------------------------------------------------------------------ */
  const giftBox = $('#gift-box');
  const wellsEl = $('#box-wells');
  const boxStatus = $('#box-status');
  const builderTotal = $('#builder-total');
  const builderAdd = $('#builder-add');
  const giftNote = $('#gift-note');
  const noteCount = $('#note-count');
  let boxSize = 3;
  let slots = [null, null, null];

  const bombThumb = p => `<span class="bomb-thumb" style="--fc:${p.color}"><img src="${p.image}" alt="" loading="lazy" /></span>`;

  function renderChips() {
    ['tea', 'mocktail'].forEach(line => {
      $('#chips-' + line).innerHTML = products.filter(p => p.line === line).map(p =>
        `<button type="button" class="chip" data-chip="${p.sku}" ${canBuy(p) ? '' : 'disabled'}>${bombThumb(p)}${esc(p.vn)}</button>`).join('');
    });
  }

  function renderWells(animateIndex = null, regrid = false) {
    const next = slots.indexOf(null);
    wellsEl.innerHTML = slots.map((sku, i) => {
      const p = sku && bySku[sku];
      return `<div class="well"${regrid ? ` style="animation-delay:${i * 40}ms"` : ' style="animation:none"'}>
        <button type="button" class="well-btn${i === next ? ' is-next' : ''}" data-well="${i}" ${p ? '' : 'disabled'}
          aria-label="${p ? `Ô ${i + 1}: ${esc(p.vn)}. Bấm để lấy ra` : `Ô ${i + 1} trống`}">
          ${p ? `<span class="well-bomb${i === animateIndex ? ' is-dropping' : ''}"><img src="${p.image}" alt="" /></span>` : '<span class="well-empty"></span>'}
        </button>
      </div>`;
    }).join('');
    updateBuilder();
  }

  function updateBuilder() {
    const empty = slots.filter(s => !s).length;
    boxStatus.textContent = empty ? `Còn trống ${empty} ô` : 'Hộp đã đủ viên';
    builderTotal.textContent = vnd(BOX[boxSize].price);
    builderAdd.disabled = empty > 0;
    $$('.chip').forEach(c => { c.disabled = empty === 0 || !canBuy(bySku[c.dataset.chip]); });
  }

  function setBoxSize(size) {
    if (size === boxSize) return;
    boxSize = size;
    slots = Array.from({ length: size }, (_, i) => slots[i] || null);
    giftBox.dataset.size = String(size);
    $$('.size-opt').forEach(o => {
      const on = Number(o.dataset.size) === size;
      o.classList.toggle('is-active', on);
      o.setAttribute('aria-checked', String(on));
      o.tabIndex = on ? 0 : -1;
    });
    renderWells(null, true);
  }

  function startBuilder(size) {
    if (document.body.classList.contains('on-product')) { showHome(); history.replaceState(null, '', location.pathname + location.search); }
    setBoxSize(size);
    requestAnimationFrame(() => scrollToEl($('#builder')));
  }

  $$('.size-opt').forEach((o, i, all) => {
    o.addEventListener('click', () => setBoxSize(Number(o.dataset.size)));
    o.addEventListener('keydown', e => {
      if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      e.preventDefault();
      const next = all[(i + 1) % all.length];
      setBoxSize(Number(next.dataset.size));
      next.focus();
    });
  });

  document.addEventListener('click', e => {
    const chip = e.target.closest('[data-chip]');
    if (chip && !chip.disabled) {
      const i = slots.indexOf(null);
      if (i === -1) return;
      slots[i] = chip.dataset.chip;
      renderWells(i);
      return;
    }
    const well = e.target.closest('[data-well]');
    if (well && !well.disabled) {
      const i = Number(well.dataset.well);
      const b = well.querySelector('.well-bomb');
      const done = () => { slots[i] = null; renderWells(); };
      if (b && !reduceMotion) { b.classList.add('is-leaving'); setTimeout(done, 300); } else done();
    }
  });

  giftNote.addEventListener('input', () => { noteCount.textContent = giftNote.value.length; });

  $('#builder-clear').addEventListener('click', () => {
    slots = slots.map(() => null);
    giftNote.value = '';
    noteCount.textContent = '0';
    renderWells();
  });

  builderAdd.addEventListener('click', () => {
    if (slots.includes(null)) return;
    const b = BOX[boxSize];
    cart.push({
      key: 'box-' + Date.now(),
      kind: 'box',
      sku: b.sku,
      size: boxSize,
      name: b.name,
      price: b.price,
      qty: 1,
      flavors: [...slots],
      note: giftNote.value.trim().slice(0, 150)
    });
    saveCart();
    renderCart(true);
    toast(`Đã thêm ${b.name} vào giỏ`);
    slots = slots.map(() => null);
    giftNote.value = '';
    noteCount.textContent = '0';
    renderWells();
    openCart(builderAdd);
  });

  renderChips();
  renderWells(null, true);

  /* ------------------------------------------------------------------------
     12. CART (F04)
     ------------------------------------------------------------------------ */
  const cartItems = $('#cart-items');
  const cartFoot = $('#cart-foot');
  let cart = store.get('meliora_cart_v3', []).filter(i => i && (i.kind === 'box' ? BOX[i.size] : bySku[i.sku]));

  const saveCart = () => store.set('meliora_cart_v3', cart);
  const subtotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);

  function openCart(opener) {
    cartScrim.classList.add('is-open');
    openOverlay(cartDrawer, opener);
  }
  $('#open-cart-btn').addEventListener('click', e => openCart(e.currentTarget));
  $('#close-cart-btn').addEventListener('click', () => closeOverlay(cartDrawer));
  cartScrim.addEventListener('click', () => closeOverlay(cartDrawer));

  function addProduct(sku, qty = 1, opener, quiet) {
    const p = bySku[sku];
    if (!p || !canBuy(p)) return;
    const row = cart.find(i => i.kind === 'single' && i.sku === sku);
    if (row) row.qty += qty;
    else cart.push({ key: 'p-' + sku, kind: 'single', sku, name: p.vn, price: p.price, qty });
    saveCart();
    renderCart(true);
    if (quiet) return;
    toast(`Đã thêm ${qty} viên ${p.vn} vào giỏ`);
    if (opener) {
      opener.classList.remove('is-added');
      void opener.offsetWidth;
      opener.classList.add('is-added');
    }
  }

  function cartThumb(item) {
    if (item.kind === 'box') return `<div class="cart-thumb cart-thumb-box"><img src="${BOX[item.size].image}" alt="" /></div>`;
    const p = bySku[item.sku];
    return `<div class="cart-thumb"><img src="${p.image}" alt="" /></div>`;
  }

  function itemDetail(item) {
    if (item.kind === 'box') {
      return `<p class="cart-sub">${item.flavors.map(s => esc(bySku[s] ? bySku[s].vn : s)).join(', ')}</p>
        ${item.note ? `<p class="cart-sub">Thiệp: “${esc(item.note)}”</p>` : ''}`;
    }
    const p = bySku[item.sku];
    return `<p class="cart-sub">${LINE[p.line].name} · ${p.sku}</p>`;
  }

  function renderCart(bump = false) {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    $$('[data-cart-count]').forEach(b => {
      b.textContent = count;
      if (bump && b.classList.contains('cart-count')) {
        b.classList.remove('bump');
        void b.offsetWidth;
        b.classList.add('bump');
      }
    });
    $('#cart-subtotal').textContent = vnd(subtotal());
    cartFoot.hidden = !cart.length;

    if (!cart.length) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <img src="assets/logo-mark.png" alt="" width="90" />
          <p>Giỏ hàng đang trống. Chọn một vị hoặc một hộp quà để bắt đầu.</p>
          <a href="#shop" class="btn btn-line">Xem hương vị</a>
        </div>`;
      return;
    }

    cartItems.innerHTML = cart.map(item => `
      <div class="cart-row" data-key="${item.key}">
        ${cartThumb(item)}
        <div class="cart-info">
          <h4>${esc(item.name)}</h4>
          ${itemDetail(item)}
          <p class="cart-price">${vnd(item.price)} × ${item.qty} = <strong>${vnd(item.price * item.qty)}</strong></p>
          <div class="qty">
            <button type="button" data-cart-q="-1" aria-label="Giảm số lượng ${esc(item.name)}">−</button>
            <span>${item.qty}</span>
            <button type="button" data-cart-q="1" aria-label="Tăng số lượng ${esc(item.name)}">+</button>
          </div>
        </div>
        <button type="button" class="cart-remove" data-cart-remove aria-label="Xoá ${esc(item.name)}">Xoá</button>
      </div>`).join('');
  }

  cartItems.addEventListener('click', e => {
    const row = e.target.closest('.cart-row');
    if (!row) return;
    const item = cart.find(i => i.key === row.dataset.key);
    if (!item) return;
    const remove = () => {
      const finish = () => { cart = cart.filter(i => i !== item); saveCart(); renderCart(); };
      if (reduceMotion) finish();
      else { row.classList.add('is-removing'); setTimeout(finish, 360); }
    };
    const q = e.target.closest('[data-cart-q]');
    if (q) {
      item.qty += Number(q.dataset.cartQ);
      if (item.qty <= 0) { remove(); return; }
      saveCart();
      renderCart();
      $$('.cart-row', cartItems).forEach(r => { r.style.animation = 'none'; });
    } else if (e.target.closest('[data-cart-remove]')) {
      remove();
    }
  });

  renderCart();
  $$('.cart-row', cartItems).forEach(r => { r.style.animation = 'none'; });

  /* ------------------------------------------------------------------------
     13. CHECKOUT → SEND ORDER (F06, F07)
     No backend yet: the order is handed to Meliora through Zalo / Messenger.
     The page only says the order is complete after the customer confirms they sent it.
     ------------------------------------------------------------------------ */
  const checkoutModal = $('#checkout-modal');
  const sendModal = $('#send-modal');
  const checkoutForm = $('#checkout-form');
  const orderError = $('#order-error');
  const PHONE_RE = /^(\+?84|0)\d{9,10}$/;
  let pendingOrder = null;

  function summaryHtml() {
    return `
      ${cart.map(i => `<div class="co-row"><span>${esc(i.name)} × ${i.qty}</span><span>${vnd(i.price * i.qty)}</span></div>`).join('')}
      <div class="co-row"><span>Phí giao hàng</span><span>Báo khi xác nhận</span></div>
      <div class="co-row total"><span>Tạm tính</span><span>${vnd(subtotal())}</span></div>`;
  }

  function openCheckout(opener) {
    if (!cart.length) { toast('Giỏ hàng đang trống'); return; }
    $('#co-summary').innerHTML = summaryHtml();
    orderError.textContent = '';
    closeOverlay(cartDrawer, true);
    openOverlay(checkoutModal, opener);
  }
  $('#checkout-btn').addEventListener('click', e => openCheckout(e.currentTarget));

  function orderText(o) {
    const lines = o.items.map(i => {
      if (i.kind === 'box') {
        return `- ${i.name} x${i.qty} (${vnd(i.price * i.qty)}): ${i.flavors.map(s => bySku[s] ? bySku[s].vn : s).join(', ')}${i.note ? ` | Thiệp: "${i.note}"` : ''}`;
      }
      return `- ${i.name} [${i.sku}] x${i.qty} (${vnd(i.price * i.qty)})`;
    });
    return [
      `ĐƠN HÀNG MELIORA ${o.code}`,
      ...lines,
      `Tạm tính: ${vnd(o.subtotal)} (chưa gồm phí giao)`,
      `Người nhận: ${o.customer.name}`,
      `SĐT: ${o.customer.phone}`,
      `Địa chỉ: ${o.customer.address}`,
      `Thanh toán: ${o.pay === 'bank' ? 'Chuyển khoản' : 'COD'}`,
      o.customer.note ? `Ghi chú: ${o.customer.note}` : ''
    ].filter(Boolean).join('\n');
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch { /* fall back */ }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }

  checkoutForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#order-name').value.trim();
    const phone = $('#order-phone').value.replace(/[\s.]/g, '');
    const address = $('#order-address').value.trim();
    const note = $('#order-note').value.trim();
    const pay = $('input[name="pay"]:checked', checkoutForm).value;

    $$('.field', checkoutForm).forEach(f => f.classList.remove('has-error'));
    const bad = [];
    if (!name) bad.push('#order-name');
    if (!PHONE_RE.test(phone)) bad.push('#order-phone');
    if (!address) bad.push('#order-address');
    if (bad.length) {
      bad.forEach(s => $(s).closest('.field').classList.add('has-error'));
      orderError.textContent = bad.length === 1 && bad[0] === '#order-phone'
        ? 'Số điện thoại chưa đúng. Nhập 10 số, ví dụ 0842097274.'
        : 'Vui lòng điền họ tên, số điện thoại và địa chỉ nhận hàng.';
      $(bad[0]).focus();
      return;
    }

    pendingOrder = {
      code: 'MEL-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000),
      customer: { name, phone, address, note },
      pay,
      items: cart.map(i => ({ ...i })),
      subtotal: subtotal()
    };
    closeOverlay(checkoutModal, true);
    showSendStep();
  });

  function showSendStep() {
    const o = pendingOrder;
    const text = orderText(o);
    $('#send-body').innerHTML = `
      <h3 id="send-title">Gửi đơn cho Meliora</h3>
      <ol class="co-steps" aria-label="Các bước đặt hàng"><li class="is-done">Thông tin</li><li class="is-on">Gửi đơn</li></ol>
      <p class="send-lead">Đơn <strong>${o.code}</strong> <strong>chưa được gửi</strong>. Nội dung đơn đã được sao chép.
        Mở Zalo hoặc Messenger của Meliora, dán vào khung chat và bấm gửi. Meliora sẽ nhắn lại để xác nhận đơn và phí giao.</p>
      <pre class="order-text" tabindex="0" aria-label="Nội dung đơn hàng">${esc(text)}</pre>
      <div class="send-actions">
        <a class="btn btn-solid" href="${CONTACT.zalo}" target="_blank" rel="noopener" data-send="zalo">Mở Zalo để gửi đơn</a>
        <a class="btn btn-solid" href="${CONTACT.messenger}?text=${encodeURIComponent(text)}" target="_blank" rel="noopener" data-send="messenger">Mở Messenger để gửi đơn</a>
        <button type="button" class="btn btn-line" id="copy-order">Sao chép lại nội dung đơn</button>
      </div>
      <p class="send-alt">Không dùng Zalo hay Messenger? Gọi <a href="tel:${CONTACT.tel}">${CONTACT.phone}</a> và đọc mã đơn.</p>
      <div class="send-confirm">
        <button type="button" class="btn btn-ghost" id="back-edit">Sửa thông tin</button>
        <button type="button" class="btn btn-line" id="sent-done">Tôi đã gửi đơn</button>
      </div>`;
    openOverlay(sendModal);

    copyText(text).then(ok => toast(ok ? 'Đã sao chép nội dung đơn' : 'Hãy chọn và sao chép nội dung đơn bên dưới'));
    $('#copy-order').addEventListener('click', () => copyText(text).then(ok => toast(ok ? 'Đã sao chép nội dung đơn' : 'Không sao chép được, hãy chọn nội dung đơn để sao chép')));
    $$('[data-send]', sendModal).forEach(a => a.addEventListener('click', () => copyText(text)));
    $('#back-edit').addEventListener('click', () => { closeOverlay(sendModal, true); openCheckout(); });
    $('#sent-done').addEventListener('click', confirmSent);
  }

  function confirmSent() {
    const o = pendingOrder;
    const history = store.get('meliora_orders', []);
    history.unshift({ ...o, sentAt: new Date().toLocaleString('vi-VN') });
    store.set('meliora_orders', history.slice(0, 20));
    cart = [];
    saveCart();
    renderCart();
    checkoutForm.reset();
    $('#send-body').innerHTML = `
      <div class="sent-ok">
        <img src="assets/logo-mark.png" alt="" class="confirm-mark" />
        <h3 id="send-title">Cảm ơn bạn</h3>
        <p>Mã đơn của bạn là <strong>${o.code}</strong>. Meliora sẽ trả lời tin nhắn của bạn để xác nhận đơn, phí giao và thời gian giao.</p>
        <p class="send-alt">Chưa thấy Meliora trả lời? Gọi <a href="tel:${CONTACT.tel}">${CONTACT.phone}</a>.</p>
        <button type="button" class="btn btn-solid" data-close>Tiếp tục xem</button>
      </div>`;
    pendingOrder = null;
    $('[data-close]', sendModal).focus();
  }

  /* ------------------------------------------------------------------------
     14. FAQ — animated <details>
     ------------------------------------------------------------------------ */
  $$('.faq-item').forEach(d => {
    const summary = d.querySelector('summary');
    const body = d.querySelector('.faq-a');
    summary.addEventListener('click', e => {
      if (reduceMotion || !body.animate) return;
      e.preventDefault();
      if (d.dataset.busy) return;
      d.dataset.busy = '1';
      if (!d.open) {
        $$('.faq-item[open]').forEach(o => { if (o !== d) o.querySelector('summary').click(); });
        d.open = true;
        const h = body.scrollHeight;
        body.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 480, easing: 'cubic-bezier(.22,1,.36,1)' })
          .onfinish = () => delete d.dataset.busy;
      } else {
        const h = body.scrollHeight;
        body.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 340, easing: 'cubic-bezier(.45,0,.2,1)' })
          .onfinish = () => { d.open = false; delete d.dataset.busy; };
      }
    });
  });

  /* ------------------------------------------------------------------------
     15. TOAST
     ------------------------------------------------------------------------ */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2600);
  }

  /* initial route (deep link to a product page) */
  route();
})();
