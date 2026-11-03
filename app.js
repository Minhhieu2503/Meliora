/* ==========================================================================
   MELIORA — Artisan Beverage Bombs
   Catalog, flavor menu, gift-box builder, cart, checkout and page motion.
   ========================================================================== */

(() => {
  'use strict';

  const HOTLINE = '0842097274';
  const FREE_SHIP = 200000;
  const SHIP_FEE = 25000;
  const BOX_PRICE = { 3: 100000, 6: 190000 };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. CATALOG — flavors from the Meliora brief (7 hot tea, 4 sparkling)
     ------------------------------------------------------------------------ */
  const HOT = 'tea';
  const COLD = 'mocktail';
  const LINE_NAME = { tea: 'Hot-Infusion Tea Bomb', mocktail: 'Sparkling Mocktail Bomb' };

  const TEA_LABEL = {
    storage: 'Giữ trong bao bì kín cản ẩm, tránh ánh nắng trực tiếp. Mở túi sử dụng ngay.',
    caution: 'Sử dụng ly chịu nhiệt. Không dùng nếu mẫn cảm với thành phần.',
    brew: 'Rót 250 mL nước nóng khoảng 90°C, thả viên, ủ 5 phút.'
  };
  const COLD_LABEL = {
    storage: 'Giữ trong bao bì kín cản ẩm, tránh ánh nắng trực tiếp. Mở túi sử dụng ngay.',
    caution: 'Không pha trong chai kín. Không dùng nếu mẫn cảm với thành phần.',
    brew: 'Rót 250 mL nước có gas lạnh, thả viên, chờ sủi tan 2–3 phút rồi khuấy nhẹ.'
  };

  const flavors = [
    {
      id: 'peach-oolong', line: HOT, name: 'Peach Oolong', vn: 'Viên trà ô long đào', color: '#E8A06A',
      image: 'assets/bomb2_rose.png',
      notes: 'Trà ô long dịu, đào sấy ngọt nhẹ và chút hương hoa mộc.',
      ingredients: 'Isomalt (E953), trà ô long khô, đào sấy khô, hoa mộc khô dùng cho thực phẩm.',
      extra: 'Sản phẩm có chứa trà, có thể chứa caffeine tự nhiên.'
    },
    { id: 'orange-cinnamon', line: HOT, name: 'Orange Cinnamon', vn: 'Viên trà cam quế', color: '#D4813A',
      notes: 'Cam sấy thơm vỏ, quế ấm, hợp những tối trời se lạnh.' },
    { id: 'mango-passion', line: HOT, name: 'Mango Passion Fruit', vn: 'Viên trà xoài chanh dây', color: '#EDB240',
      notes: 'Xoài chín ngọt, chanh dây chua nhẹ, màu vàng nắng trong ly.' },
    { id: 'strawberry-rose', line: HOT, name: 'Strawberry Rose', vn: 'Viên trà dâu hoa hồng', color: '#D46A7E',
      image: 'assets/bomb4_ruby.png',
      notes: 'Dâu đỏ và cánh hồng khô, ly trà ngả sắc hồng khi vỏ tan.' },
    { id: 'apple-ginger', line: HOT, name: 'Apple Ginger', vn: 'Viên trà táo gừng', color: '#C7A055',
      notes: 'Táo ngọt thanh, gừng ấm cay nhẹ ở hậu vị.' },
    { id: 'blueberry-lavender', line: HOT, name: 'Blueberry Lavender', vn: 'Viên trà việt quất oải hương', color: '#7D6CA8',
      image: 'assets/bomb3_lavender.png',
      notes: 'Việt quất và oải hương, màu tím nhạt, hương thơm dịu.' },
    { id: 'chamomile-date-goji', line: HOT, name: 'Chamomile, Red Date & Goji', vn: 'Viên trà cúc La Mã, táo đỏ, kỷ tử', color: '#E3BE6E',
      notes: 'Hoa cúc La Mã, táo đỏ và kỷ tử, vị ngọt hiền cho buổi tối.' },

    { id: 'wild-berry-lemon', line: COLD, name: 'Wild Berry Lemon', vn: 'Viên sủi dâu rừng chanh vàng', color: '#B44A6E',
      notes: 'Dâu rừng chua ngọt gặp chanh vàng, sủi bọt tươi mát.' },
    { id: 'peach-mango', line: COLD, name: 'Peach Mango', vn: 'Viên sủi đào xoài', color: '#F0A35C',
      notes: 'Đào và xoài chín, ngọt mềm, màu cam đào.' },
    { id: 'citrus-mint', line: COLD, name: 'Citrus Mint', vn: 'Viên sủi cam chanh bạc hà', color: '#9DBF7A',
      image: 'assets/bomb1_citrus.png',
      notes: 'Cam chanh tươi và bạc hà mát lạnh, rất hợp ngày nóng.' },
    { id: 'pomegranate-cherry', line: COLD, name: 'Pomegranate Cherry', vn: 'Viên sủi lựu anh đào', color: '#A8354C',
      notes: 'Lựu và anh đào, sắc đỏ ruby, vị chua ngọt cân bằng.' }
  ].map(f => ({ ...f, price: 30000 }));

  const byId = Object.fromEntries(flavors.map(f => [f.id, f]));

  /* ------------------------------------------------------------------------
     2. HELPERS
     ------------------------------------------------------------------------ */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const vnd = n => new Intl.NumberFormat('vi-VN').format(n) + '₫';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sphere = f => `<span class="sph is-${f.line}" style="--c:${f.color}" aria-hidden="true"></span>`;
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
  };
  const plusIcon = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v12M2 8h12"/></svg>';

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
    const colors = ['#E9B3B4', '#DFA0A3', '#F0C9C6', '#E3C9A0', '#D9B98A'];
    const count = window.innerWidth < 700 ? 8 : 15;
    let html = '';
    for (let i = 0; i < count; i++) {
      const leaf = i % 4 === 3;
      const s = leaf ? 14 + Math.random() * 10 : 10 + Math.random() * 12;
      const t = 16 + Math.random() * 14;
      html += `<span class="petal" style="--x:${(Math.random() * 100).toFixed(1)}%;--s:${s.toFixed(0)}px;--t:${t.toFixed(1)}s;--delay:${(-Math.random() * t).toFixed(1)}s;--dx:${(Math.random() * 160 - 80).toFixed(0)}px;--r:${(Math.random() * 540 - 270).toFixed(0)}deg;--c:${leaf ? colors[3 + (i % 2)] : colors[i % 3]};opacity:${(0.45 + Math.random() * 0.45).toFixed(2)}"><svg><use href="#i-${leaf ? 'leaf' : 'petal'}"/></svg></span>`;
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
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (!mobileNav.classList.contains('is-open')) {
      if (goingDown && y > 480) header.classList.add('is-hidden');
      else if (goingUp || y < 480) header.classList.remove('is-hidden');
    }
    lastY = y;
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
        navLinks.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['story', 'lines', 'brew', 'menu', 'gift', 'faq', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObs.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     5. SMOOTH ANCHOR SCROLL (eased, respects header height)
     ------------------------------------------------------------------------ */
  const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let scrollAnim = null;

  function scrollToEl(el) {
    if (!el) return;
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 72;
    const target = Math.max(0, el.getBoundingClientRect().top + window.scrollY - (el.id === 'top' ? 0 : offset - 1));
    if (reduceMotion) { window.scrollTo(0, target); return; }
    const start = window.scrollY;
    const dist = target - start;
    const dur = Math.min(1400, Math.max(600, Math.abs(dist) * 0.45));
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

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const el = id ? document.getElementById(id) : null;
    if (!el) return;
    e.preventDefault();
    if (a.dataset.filter) setMenuFilter(a.dataset.filter);
    if (mobileNav.classList.contains('is-open')) setMobileNav(false);
    closeAllOverlays();
    scrollToEl(el);
    history.replaceState(null, '', '#' + id);
  });

  /* ------------------------------------------------------------------------
     6. REVEAL + PARALLAX
     ------------------------------------------------------------------------ */
  const revealEls = $$('[data-reveal], [data-clip]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    // [data-clip] starts fully clipped (zero visible area), so watch its parent instead
    const targets = new Map();
    revealEls.forEach(el => {
      const watch = el.hasAttribute('data-clip') ? el.parentElement : el;
      if (!targets.has(watch)) targets.set(watch, []);
      targets.get(watch).push(el);
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        targets.get(e.target).forEach(el => el.classList.add('is-in'));
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach((_, watch) => io.observe(watch));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  const parallaxEls = reduceMotion ? [] : $$('[data-parallax]');
  const parallaxBg = reduceMotion ? null : $('[data-parallax-bg] img');
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
    if (parallaxBg) {
      const box = parallaxBg.parentElement.getBoundingClientRect();
      if (box.bottom > 0 && box.top < vh) {
        const p = (vh - box.top) / (vh + box.height); // 0 → 1 while passing
        parallaxBg.style.transform = `translate3d(0, ${(-p * 16).toFixed(2)}%, 0)`;
      }
    }
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  window.addEventListener('resize', () => requestAnimationFrame(frame));
  frame();

  /* ------------------------------------------------------------------------
     7. BREWING TABS (sliding thumb)
     ------------------------------------------------------------------------ */
  const segBtns = $$('.seg-btn');
  const segThumb = $('.seg-thumb');

  function placeThumb(btn) {
    if (!segThumb || !btn) return;
    segThumb.style.width = btn.offsetWidth + 'px';
    segThumb.style.transform = `translateX(${btn.offsetLeft}px)`;
  }

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
     8. FLAVOR MENU + STICKY PREVIEW
     ------------------------------------------------------------------------ */
  const menuList = $('#menu-list');
  const previewStage = $('#preview-stage');
  const previewImg = $('#preview-img');
  const previewSphere = $('#preview-sphere');
  const previewName = $('#preview-name');
  const previewLine = $('#preview-line');
  let menuFilter = 'all';
  let previewId = null;
  let swapTimer = null;

  function renderMenu() {
    const groups = [HOT, COLD].filter(l => menuFilter === 'all' || menuFilter === l);
    menuList.innerHTML = groups.map(line => {
      const items = flavors.filter(f => f.line === line);
      return `
        <div class="menu-group">
          <h3 class="menu-group-title">${LINE_NAME[line]} <small>${items.length} vị</small></h3>
          ${items.map(f => `
            <div class="flavor" data-id="${f.id}" style="--fc:${f.color}">
              ${sphere(f)}
              <button class="flavor-name" data-open="${f.id}" aria-label="Xem chi tiết ${esc(f.name)}">
                <strong>${esc(f.name)}</strong>
                <span>${esc(f.vn)}</span>
              </button>
              <span class="flavor-price">${vnd(f.price)}</span>
              <button class="add-btn" data-add="${f.id}" aria-label="Thêm ${esc(f.name)} vào giỏ">${plusIcon}</button>
            </div>`).join('')}
        </div>`;
    }).join('');
  }

  function showPreview(id) {
    if (id === previewId) return;
    const f = byId[id];
    if (!f) return;
    previewId = id;
    $$('.flavor', menuList).forEach(r => r.classList.toggle('is-hot', r.dataset.id === id));
    clearTimeout(swapTimer);
    previewStage.classList.add('is-swapping');
    previewStage.style.setProperty('--pc', f.color);
    swapTimer = setTimeout(() => {
      if (f.image) {
        previewImg.src = f.image;
        previewImg.dataset.hidden = 'false';
        previewSphere.dataset.hidden = 'true';
      } else {
        previewImg.dataset.hidden = 'true';
        previewSphere.dataset.hidden = 'false';
        previewSphere.className = `preview-sphere sph is-${f.line}`;
        previewSphere.style.setProperty('--c', f.color);
      }
      previewName.textContent = f.name;
      previewLine.textContent = LINE_NAME[f.line];
      requestAnimationFrame(() => previewStage.classList.remove('is-swapping'));
    }, reduceMotion ? 0 : 260);
  }

  function setMenuFilter(filter) {
    if (filter === menuFilter) return;
    menuFilter = filter;
    $$('.filter-btn').forEach(b => {
      const on = b.dataset.menuFilter === filter;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    menuList.classList.add('is-filtering');
    setTimeout(() => {
      renderMenu();
      previewId = null;
      showPreview(flavors.find(f => filter === 'all' || f.line === filter).id);
      requestAnimationFrame(() => menuList.classList.remove('is-filtering'));
    }, reduceMotion ? 0 : 300);
  }

  $$('.filter-btn').forEach(b => b.addEventListener('click', () => setMenuFilter(b.dataset.menuFilter)));

  menuList.addEventListener('pointerover', e => {
    const row = e.target.closest('.flavor');
    if (row) showPreview(row.dataset.id);
  });
  menuList.addEventListener('focusin', e => {
    const row = e.target.closest('.flavor');
    if (row) showPreview(row.dataset.id);
  });
  menuList.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    const open = e.target.closest('[data-open]');
    if (add) addFlavor(add.dataset.add, 1, add);
    else if (open) openProduct(open.dataset.open, open);
  });

  renderMenu();
  showPreview(flavors[0].id);

  /* ------------------------------------------------------------------------
     9. OVERLAYS (modals + drawer) with focus handling
     ------------------------------------------------------------------------ */
  const overlayStack = [];

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

  function closeOverlay(el) {
    const idx = overlayStack.findIndex(o => o.el === el);
    if (idx === -1) return;
    const { opener } = overlayStack.splice(idx, 1)[0];
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    if (el === cartDrawer) cartScrim.classList.remove('is-open');
    if (!overlayStack.length && !mobileNav.classList.contains('is-open')) document.body.style.overflow = '';
    if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
  }

  function closeAllOverlays() {
    [...overlayStack].reverse().forEach(o => closeOverlay(o.el));
  }

  $$('.modal').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m || e.target.closest('[data-close]')) closeOverlay(m);
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (overlayStack.length) closeOverlay(overlayStack[overlayStack.length - 1].el);
      else if (mobileNav.classList.contains('is-open')) setMobileNav(false);
    }
    if (e.key === 'Tab' && overlayStack.length) {
      const top = overlayStack[overlayStack.length - 1].el;
      const focusables = $$('button:not([disabled]), a[href], input, textarea', top).filter(x => x.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ------------------------------------------------------------------------
     10. PRODUCT MODAL (styled after the round ingredient card)
     ------------------------------------------------------------------------ */
  const productModal = $('#product-modal');
  const pmBody = $('#pm-body');

  function openProduct(id, opener) {
    const f = byId[id];
    if (!f) return;
    const label = f.line === HOT ? TEA_LABEL : COLD_LABEL;
    pmBody.style.setProperty('--fc', f.color);
    pmBody.innerHTML = `
      <div class="pm-visual">
        ${f.image ? `<img src="${f.image}" alt="${esc(f.vn)}" />` : sphere(f)}
      </div>
      <div class="pm-text">
        <p class="pm-line">${LINE_NAME[f.line]}</p>
        <h3 id="pm-title">${esc(f.name)}</h3>
        <p class="pm-vn">${esc(f.vn)}</p>
        <p class="pm-notes">${esc(f.notes)}</p>
        <dl class="pm-label">
          <div><dt>Thành phần</dt><dd>${f.ingredients ? esc(f.ingredients) : 'Thành phần chi tiết in trên card sản phẩm đi kèm.'}</dd></div>
          <div><dt>Cách pha</dt><dd>${label.brew}</dd></div>
          <div><dt>Bảo quản</dt><dd>${label.storage}</dd></div>
          <div><dt>Lưu ý</dt><dd>${label.caution}${f.extra ? ' ' + esc(f.extra) : ''}</dd></div>
        </dl>
        <div class="pm-buy">
          <span class="pm-price">${vnd(f.price)}</span>
          <div class="qty" aria-label="Số lượng">
            <button type="button" data-q="-1" aria-label="Giảm">−</button>
            <span id="pm-qty">1</span>
            <button type="button" data-q="1" aria-label="Tăng">+</button>
          </div>
          <button class="btn btn-solid" id="pm-add" type="button">Thêm vào giỏ</button>
        </div>
      </div>`;

    let qty = 1;
    const qtyEl = $('#pm-qty', pmBody);
    $$('[data-q]', pmBody).forEach(b => b.addEventListener('click', () => {
      qty = Math.max(1, Math.min(20, qty + Number(b.dataset.q)));
      qtyEl.textContent = qty;
    }));
    $('#pm-add', pmBody).addEventListener('click', () => {
      closeOverlay(productModal);
      addFlavor(f.id, qty);
    });
    openOverlay(productModal, opener);
  }

  /* ------------------------------------------------------------------------
     11. GIFT BOX BUILDER
     ------------------------------------------------------------------------ */
  const giftBox = $('#gift-box');
  const wellsEl = $('#box-wells');
  const boxStatus = $('#box-status');
  const builderTotal = $('#builder-total');
  const builderAdd = $('#builder-add');
  const giftNote = $('#gift-note');
  let boxSize = 3;
  let slots = [null, null, null];

  function renderChips() {
    [HOT, COLD].forEach(line => {
      $('#chips-' + line).innerHTML = flavors.filter(f => f.line === line).map(f =>
        `<button type="button" class="chip" data-chip="${f.id}">${sphere(f)}${esc(f.name)}</button>`).join('');
    });
  }

  function renderWells(animateId = null) {
    const nextEmpty = slots.indexOf(null);
    wellsEl.innerHTML = slots.map((id, i) => {
      const f = id && byId[id];
      return `<div class="well" style="animation-delay:${i * 40}ms">
        <button type="button" class="well-btn${i === nextEmpty ? ' is-next' : ''}" data-well="${i}" ${f ? '' : 'disabled'}
          aria-label="${f ? `Ô ${i + 1}: ${esc(f.name)}. Bấm để lấy ra` : `Ô ${i + 1} trống`}">
          ${f ? `<span class="sph is-${f.line}" style="--c:${f.color};${i === animateId ? '' : 'animation:none'}"></span>` : '<span class="well-empty"></span>'}
        </button>
      </div>`;
    }).join('');
    // keep the wells' entrance animation only when the grid itself changes size
    if (animateId !== 'resize') $$('.well', wellsEl).forEach(w => { w.style.animation = 'none'; });
    updateBuilder();
  }

  function updateBuilder() {
    const empty = slots.filter(s => !s).length;
    boxStatus.textContent = empty ? `Còn trống ${empty} ô` : 'Hộp đã đủ viên';
    builderTotal.textContent = vnd(BOX_PRICE[boxSize]);
    builderAdd.disabled = empty > 0;
    $$('.chip').forEach(c => { c.disabled = empty === 0; });
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
    renderWells('resize');
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
    if (chip) {
      const i = slots.indexOf(null);
      if (i === -1) return;
      slots[i] = chip.dataset.chip;
      renderWells(i);
      return;
    }
    const well = e.target.closest('[data-well]');
    if (well && !well.disabled) {
      const i = Number(well.dataset.well);
      const sph = well.querySelector('.sph');
      const done = () => { slots[i] = null; renderWells(); };
      if (sph && !reduceMotion) { sph.classList.add('is-leaving'); sph.style.animation = ''; setTimeout(done, 330); } else done();
    }
  });

  $('#builder-clear').addEventListener('click', () => {
    slots = slots.map(() => null);
    giftNote.value = '';
    renderWells();
  });

  builderAdd.addEventListener('click', () => {
    if (slots.includes(null)) return;
    const note = giftNote.value.trim().slice(0, 150);
    cart.push({
      key: 'box-' + Date.now(),
      kind: 'box',
      name: `Hộp quà ${boxSize} viên`,
      price: BOX_PRICE[boxSize],
      qty: 1,
      flavors: [...slots],
      note
    });
    saveCart();
    renderCart(true);
    toast(`Đã thêm hộp ${boxSize} viên vào giỏ`);
    slots = slots.map(() => null);
    giftNote.value = '';
    renderWells();
    openCart(builderAdd);
  });

  renderChips();
  renderWells('resize');

  /* ------------------------------------------------------------------------
     12. CART
     ------------------------------------------------------------------------ */
  const cartDrawer = $('#cart-drawer');
  const cartScrim = $('#cart-scrim');
  const cartItems = $('#cart-items');
  let cart = store.get('meliora_cart_v2', []).filter(i => i && (i.kind === 'box' || byId[i.id]));

  const saveCart = () => store.set('meliora_cart_v2', cart);
  const subtotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);

  function openCart(opener) {
    cartScrim.classList.add('is-open');
    openOverlay(cartDrawer, opener);
  }
  $('#open-cart-btn').addEventListener('click', e => openCart(e.currentTarget));
  $('#close-cart-btn').addEventListener('click', () => closeOverlay(cartDrawer));
  cartScrim.addEventListener('click', () => closeOverlay(cartDrawer));

  function addFlavor(id, qty = 1, opener) {
    const f = byId[id];
    if (!f) return;
    const row = cart.find(i => i.kind === 'single' && i.id === id);
    if (row) row.qty += qty;
    else cart.push({ key: 'f-' + id, kind: 'single', id, name: f.name, price: f.price, qty });
    saveCart();
    renderCart(true);
    toast(`Đã thêm ${qty} viên ${f.name} vào giỏ`);
    openCart(opener);
  }

  function thumb(item) {
    if (item.kind === 'box') {
      return `<div class="cart-thumb"><span class="mini-box">${item.flavors.map(id => `<i style="--c:${byId[id] ? byId[id].color : '#ccc'}"></i>`).join('')}</span></div>`;
    }
    const f = byId[item.id];
    return `<div class="cart-thumb" style="--fc:${f.color}">${f.image ? `<img src="${f.image}" alt="" />` : sphere(f)}</div>`;
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

    const sub = subtotal();
    $('#cart-subtotal').textContent = vnd(sub);
    const pct = Math.min(100, Math.round((sub / FREE_SHIP) * 100));
    $('#ship-fill').style.width = pct + '%';
    $('#ship-text').textContent = sub >= FREE_SHIP
      ? 'Đơn của bạn được freeship.'
      : `Thêm ${vnd(FREE_SHIP - sub)} để được freeship.`;

    if (!cart.length) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          ${sphere(byId['strawberry-rose'])}
          <p>Giỏ hàng đang trống. Chọn một vị để bắt đầu.</p>
          <a href="#menu" class="btn btn-line">Xem hương vị</a>
        </div>`;
      return;
    }

    cartItems.innerHTML = cart.map(item => `
      <div class="cart-row" data-key="${item.key}">
        ${thumb(item)}
        <div class="cart-info">
          <h4>${esc(item.name)}</h4>
          ${item.kind === 'box'
            ? `<p class="cart-sub">${item.flavors.map(id => esc(byId[id] ? byId[id].name : id)).join(', ')}</p>
               ${item.note ? `<p class="cart-sub">Lời nhắn: “${esc(item.note)}”</p>` : ''}`
            : `<p class="cart-sub">${esc(byId[item.id].vn)}</p>`}
          <p class="cart-price">${vnd(item.price * item.qty)}</p>
          <div class="qty">
            <button type="button" data-cart-q="-1" aria-label="Giảm số lượng">−</button>
            <span>${item.qty}</span>
            <button type="button" data-cart-q="1" aria-label="Tăng số lượng">+</button>
          </div>
        </div>
        <button type="button" class="cart-remove" data-cart-remove>Xoá</button>
      </div>`).join('');
  }

  cartItems.addEventListener('click', e => {
    const row = e.target.closest('.cart-row');
    if (!row) return;
    const item = cart.find(i => i.key === row.dataset.key);
    if (!item) return;
    const q = e.target.closest('[data-cart-q]');
    const remove = () => {
      const finish = () => { cart = cart.filter(i => i !== item); saveCart(); renderCart(); };
      if (reduceMotion) finish();
      else { row.classList.add('is-removing'); setTimeout(finish, 380); }
    };
    if (q) {
      item.qty += Number(q.dataset.cartQ);
      if (item.qty <= 0) { item.qty = 0; remove(); return; }
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
     13. CHECKOUT
     ------------------------------------------------------------------------ */
  const checkoutModal = $('#checkout-modal');
  const confirmModal = $('#confirm-modal');
  const checkoutForm = $('#checkout-form');
  const orderError = $('#order-error');

  const shipFee = sub => (sub >= FREE_SHIP ? 0 : SHIP_FEE);

  $('#checkout-btn').addEventListener('click', e => {
    if (!cart.length) { toast('Giỏ hàng đang trống'); return; }
    const sub = subtotal();
    const fee = shipFee(sub);
    $('#co-summary').innerHTML = `
      ${cart.map(i => `<div class="co-row"><span>${esc(i.name)} × ${i.qty}</span><span>${vnd(i.price * i.qty)}</span></div>`).join('')}
      <div class="co-row"><span>Phí giao hàng</span><span>${fee ? vnd(fee) : 'Miễn phí'}</span></div>
      <div class="co-row total"><span>Tổng</span><span>${vnd(sub + fee)}</span></div>`;
    orderError.textContent = '';
    closeOverlay(cartDrawer);
    openOverlay(checkoutModal, e.currentTarget);
  });

  checkoutForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#order-name').value.trim();
    const phone = $('#order-phone').value.replace(/\s|\./g, '');
    const address = $('#order-address').value.trim();
    const note = $('#order-note').value.trim();
    const pay = $('input[name="pay"]:checked', checkoutForm).value;

    $$('.field', checkoutForm).forEach(f => f.classList.remove('has-error'));
    const missing = [];
    if (!name) missing.push('#order-name');
    if (!/^(\+?84|0)\d{9,10}$/.test(phone)) missing.push('#order-phone');
    if (!address) missing.push('#order-address');
    if (missing.length) {
      missing.forEach(s => $(s).closest('.field').classList.add('has-error'));
      orderError.textContent = missing.includes('#order-phone') && missing.length === 1
        ? 'Số điện thoại chưa đúng. Nhập 10 số, ví dụ 0842097274.'
        : 'Vui lòng điền họ tên, số điện thoại và địa chỉ nhận hàng.';
      $(missing[0]).focus();
      return;
    }

    const sub = subtotal();
    const fee = shipFee(sub);
    const order = {
      code: 'MEL-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toLocaleString('vi-VN'),
      customer: { name, phone, address, note },
      pay,
      items: cart.map(i => ({ ...i })),
      subtotal: sub,
      shippingFee: fee,
      total: sub + fee
    };
    const history = store.get('meliora_orders', []);
    history.unshift(order);
    store.set('meliora_orders', history);

    cart = [];
    saveCart();
    renderCart();
    checkoutForm.reset();
    closeOverlay(checkoutModal);
    showConfirm(order);
  });

  function showConfirm(order) {
    const lines = order.items.map(i => `${i.name} x${i.qty}${i.kind === 'box' ? ` (${i.flavors.map(id => byId[id] ? byId[id].name : id).join(', ')})` : ''}`);
    const zaloText = encodeURIComponent(
      `Chào Meliora, mình vừa đặt đơn ${order.code} trên website.\n` +
      `Người nhận: ${order.customer.name} (${order.customer.phone})\n` +
      `Địa chỉ: ${order.customer.address}\n` +
      `Đơn: ${lines.join('; ')}\n` +
      `Tổng: ${vnd(order.total)}` + (order.customer.note ? `\nGhi chú: ${order.customer.note}` : '')
    );
    const next = {
      cod: 'Meliora sẽ gọi để xác nhận đơn, bạn thanh toán khi nhận hàng.',
      bank: 'Meliora sẽ gọi xác nhận đơn và gửi thông tin chuyển khoản cho bạn.',
      zalo: 'Bấm nút bên dưới để gửi đơn qua Zalo cho Meliora.'
    }[order.pay];

    $('#confirm-body').innerHTML = `
      <img src="assets/logo-mark.png" alt="" class="confirm-mark" />
      <h3 id="cf-title">Đã nhận đơn của bạn</h3>
      <p class="confirm-code">Mã đơn <strong>${order.code}</strong></p>
      <div class="confirm-list">
        ${order.items.map(i => `<div class="co-row"><span>${esc(i.name)} × ${i.qty}</span><span>${vnd(i.price * i.qty)}</span></div>`).join('')}
        <div class="co-row"><span>Phí giao hàng</span><span>${order.shippingFee ? vnd(order.shippingFee) : 'Miễn phí'}</span></div>
        <div class="co-row total"><span>Tổng</span><span>${vnd(order.total)}</span></div>
      </div>
      <p class="confirm-next">${next}</p>
      <div class="confirm-actions">
        <a class="btn ${order.pay === 'zalo' ? 'btn-solid' : 'btn-line'}" href="https://zalo.me/${HOTLINE}?text=${zaloText}" target="_blank" rel="noopener">Gửi đơn qua Zalo</a>
        <button type="button" class="btn btn-ghost" data-close-confirm>Tiếp tục xem</button>
      </div>`;
    $('[data-close-confirm]').addEventListener('click', () => closeOverlay(confirmModal));
    openOverlay(confirmModal);
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
        body.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 520, easing: 'cubic-bezier(.22,1,.36,1)' })
          .onfinish = () => delete d.dataset.busy;
      } else {
        const h = body.scrollHeight;
        body.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 380, easing: 'cubic-bezier(.45,0,.2,1)' })
          .onfinish = () => { d.open = false; delete d.dataset.busy; };
      }
    });
  });

  /* ------------------------------------------------------------------------
     15. CONTACT + NEWSLETTER
     ------------------------------------------------------------------------ */
  const contactForm = $('#contact-form');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#contact-name').value.trim();
    const phone = $('#contact-phone').value.replace(/\s|\./g, '');
    const msg = $('#contact-msg').value.trim();
    const err = $('#contact-error');
    $$('.field', contactForm).forEach(f => f.classList.remove('has-error'));
    if (!name || !/^(\+?84|0)\d{9,10}$/.test(phone)) {
      if (!name) $('#contact-name').closest('.field').classList.add('has-error');
      if (!/^(\+?84|0)\d{9,10}$/.test(phone)) $('#contact-phone').closest('.field').classList.add('has-error');
      err.textContent = 'Vui lòng nhập tên và số điện thoại (10 số) để Meliora gọi lại.';
      return;
    }
    err.textContent = '';
    const list = store.get('meliora_inquiries', []);
    list.push({ name, phone, msg, date: new Date().toLocaleString('vi-VN') });
    store.set('meliora_inquiries', list);
    contactForm.reset();
    toast(`Đã gửi. Meliora sẽ gọi lại cho ${name} sớm.`);
  });

  $('#newsletter-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#newsletter-email');
    const email = input.value.trim();
    if (!input.checkValidity()) { toast('Email chưa đúng định dạng'); return; }
    const subs = store.get('meliora_subscribers', []);
    if (!subs.includes(email)) subs.push(email);
    store.set('meliora_subscribers', subs);
    input.value = '';
    toast('Đã đăng ký. Meliora sẽ báo khi có vị mới.');
  });

  /* ------------------------------------------------------------------------
     16. TOAST
     ------------------------------------------------------------------------ */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2800);
  }
})();
