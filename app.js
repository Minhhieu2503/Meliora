/* ==========================================================================
   MELIORA — Artisan Beverage Bombs Interactive Application
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. PRODUCT CATALOG DATA WITH VERIFIED ASSET PATHS
  const catalog = {
    'citrus-matcha': {
      id: 'citrus-matcha',
      sku: 'MEL-MCK-01',
      name: 'Citrus & Matcha Fizz Bomb',
      category: 'mocktail',
      categoryLabel: 'Mocktail Bomb (Đồ Uống Sủi)',
      badge: 'Mát Lạnh Sảng Khoái',
      price: 30000,
      image: 'assets/bomb1_citrus.png',
      netWeight: '35g (01 viên)',
      tastingNotes: 'Tươi mát bùng nổ từ tinh chất cam chanh mọng nước kết hợp vị matcha thanh khiết cùng bọt sủi sống động.',
      ingredients: 'Bột sủi khoáng thảo mộc, bột Matcha Uji cao cấp, tinh chất vỏ cam vàng và chanh sấy thăng hoa, đường Isomalt.',
      brewing: 'Cho đá viên vào 2/3 ly. Rót 200 - 250ml soda hoặc nước có ga lạnh. Thả viên bomb vào, ngắm bọt sủi trong 30s và khuấy đều.',
      shelfLife: '03 tháng kể từ ngày sản xuất khi bảo quản kín khí.',
      storage: 'Bảo quản nơi khô ráo thoáng mát, tránh tiếp xúc không khí ẩm trước khi pha.',
      allergen: 'Sử dụng bột Matcha nguyên chất, phù hợp cho người ăn thuần chay.'
    },
    'rose-amber': {
      id: 'rose-amber',
      sku: 'MEL-TEA-01',
      name: 'Rose Amber Herbal Bomb',
      category: 'tea',
      categoryLabel: 'Tea Bomb (Trà Nóng)',
      badge: 'Bán Chạy Nhất',
      price: 30000,
      image: 'assets/bomb2_rose.png',
      netWeight: '35g (01 viên)',
      tastingNotes: 'Hương hoa hồng Damascus nồng nàn quyện cùng thảo mộc hổ phách ấm áp và vị ngọt thanh nhẹ tao nhã.',
      ingredients: 'Vỏ đường Isomalt thực vật từ củ cải đường, nụ hoa hồng Damascus khô, lá trà đen Shan Tuyết cổ thụ, hổ phách thảo mộc.',
      brewing: 'Cho vào ly thủy tinh, rót 250 - 300ml nước sôi ở 85°C - 90°C. Đợi 45 - 60s để hoa nở bung và thưởng thức.',
      shelfLife: '03 tháng kể từ ngày sản xuất khi bảo quản trong túi nhôm kín.',
      storage: 'Bảo quản nơi khô ráo thoáng mát (dưới 28°C), tránh ẩm ướt và ánh nắng trực tiếp. Không để trong tủ lạnh.',
      allergen: 'Không chứa chất bảo quản nhân tạo, không phẩm màu tổng hợp, không chứa gluten.'
    },
    'lavender-pea': {
      id: 'lavender-pea',
      sku: 'MEL-TEA-02',
      name: 'Lavender Butterfly Pea Bomb',
      category: 'tea',
      categoryLabel: 'Tea Bomb (Trà Nóng)',
      badge: 'Thư Giãn Tinh Thần',
      price: 30000,
      image: 'assets/bomb3_lavender.png',
      netWeight: '35g (01 viên)',
      tastingNotes: 'Nốt hương oải hương thư thái kết hợp sắc xanh lam quyến rũ từ hoa đậu biếc tự nhiên, mang lại cảm giác bình yên sâu lắng.',
      ingredients: 'Vỏ Isomalt thực vật, hoa đậu biếc sấy lạnh nguyên bông, nụ hoa Lavender Pháp, lá trà thảo mộc hoa cúc la mã.',
      brewing: 'Dùng với 250 - 300ml nước sôi 85°C - 90°C. Ngắm sắc xanh huyền ảo chuyển động trong ly khi vỏ tan dần.',
      shelfLife: '03 tháng kể từ NSX.',
      storage: 'Bảo quản nơi khô ráo, tránh ánh sáng chiếu trực tiếp.',
      allergen: '100% thảo mộc tự nhiên, không caffein, thích hợp uống thư giãn buổi tối.'
    },
    'ruby-hibiscus': {
      id: 'ruby-hibiscus',
      sku: 'MEL-MCK-02',
      name: 'Ruby Hibiscus Blossom Bomb',
      category: 'mocktail',
      categoryLabel: 'Mocktail Bomb (Đồ Uống Sủi)',
      badge: 'Màu Sắc Kiêu Kỳ',
      price: 30000,
      image: 'assets/bomb4_ruby.png',
      netWeight: '35g (01 viên)',
      tastingNotes: 'Sắc đỏ hồng ngọc kiêu sa từ hoa atiso đỏ (hibiscus), vị chua ngọt thanh mát đánh thức mọi giác quan tràn đầy sức sống.',
      ingredients: 'Bột sủi khoáng hữu cơ, đài hoa Hibiscus đỏ hữu cơ sấy thăng hoa, chiết xuất dâu rừng tự nhiên, Isomalt.',
      brewing: 'Cho đá vào ly, rót 200 - 250ml soda lạnh. Thả viên bomb vào ngắm dòng thác bọt sủi đỏ ruby rực rỡ.',
      shelfLife: '03 tháng kể từ NSX.',
      storage: 'Để nơi khô ráo, thoáng mát dưới 28°C.',
      allergen: 'Giàu vitamin C tự nhiên từ hoa atiso đỏ.'
    },
    'gift-set-3': {
      id: 'gift-set-3',
      sku: 'MEL-SET-03',
      name: 'Hộp Quà 3 Viên Tùy Chọn (Gift Set)',
      category: 'gifts',
      categoryLabel: 'Hộp Quà Tặng',
      badge: 'Lựa Chọn Phổ Biến',
      price: 100000,
      image: 'assets/tier2_set3.jpg',
      netWeight: '105g (03 viên)',
      tastingNotes: 'Hộp quà cứng cao cấp phủ nhũ kim sang trọng, tùy chọn 3 vị bất kỳ kết hợp cùng thiệp viết tay và muỗng khuấy nghệ thuật.',
      ingredients: 'Bao gồm: 03 viên Beverage Bombs tự chọn, 01 hộp quà cao cấp, 01 thiệp viết tay lời chúc, 01 muỗng khuấy vàng đồng.',
      brewing: 'Tùy theo vị trà hoặc mocktail trong hộp, tham khảo hướng dẫn pha chuẩn đi kèm bên trong nắp hộp.',
      shelfLife: '03 tháng kể từ ngày đóng gói.',
      storage: 'Bảo quản hộp nơi khô mát, tránh ẩm.',
      allergen: 'Tùy theo các vị bạn lựa chọn trong hộp.'
    },
    'gift-set-6': {
      id: 'gift-set-6',
      sku: 'MEL-SET-06',
      name: 'Hộp Quà 6 Viên Tinh Tuyển (Gift Set)',
      category: 'gifts',
      categoryLabel: 'Hộp Quà Tặng',
      badge: 'Trọn Vẹn & Sang Trọng',
      price: 190000,
      image: 'assets/tier3_set6.jpg',
      netWeight: '210g (06 viên)',
      tastingNotes: 'Bộ sưu tập đầy đủ các vị Tea Bombs & Mocktail Bombs cao cấp trong hộp nắp nam châm tinh xảo, ruy băng lụa trang nhã.',
      ingredients: 'Bao gồm: 06 viên Beverage Bombs (đầy đủ các hương vị), hộp nắp nam châm, thiệp viết tay trang trọng, muỗng khuấy mạ vàng.',
      brewing: 'Kèm sổ tay hướng dẫn thưởng thức nghệ thuật đồ uống Meliora chi tiết.',
      shelfLife: '03 tháng kể từ ngày đóng gói.',
      storage: 'Bảo quản nơi khô ráo thoáng mát.',
      allergen: 'Thảo mộc tự nhiên tuyển chọn.'
    }
  };

  // 2. HELPER FUNCTIONS
  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
  };

  // 3. CART STATE (Saved to localStorage)
  let cart = [];
  try {
    const savedCart = localStorage.getItem('meliora_cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (err) {
    console.error('Could not load cart from storage', err);
    cart = [];
  }

  function saveCart() {
    try {
      localStorage.setItem('meliora_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage save failed', e);
    }
  }

  // 4. DOM ELEMENTS
  const header = document.getElementById('main-header');
  const openCartBtn = document.getElementById('open-cart-btn');
  const headerCartBtn = document.getElementById('header-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartCountBadges = [
    document.getElementById('cart-count'),
    document.getElementById('header-cart-count'),
    document.getElementById('mobile-cart-qty')
  ].filter(Boolean);
  const cartItemsQty = document.getElementById('cart-items-qty');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartSubtotalVal = document.getElementById('cart-subtotal-val');
  const shippingProgress = document.getElementById('shipping-progress');
  const shippingText = document.getElementById('shipping-text');
  const checkoutBtn = document.getElementById('checkout-btn');
  const toast = document.getElementById('toast-notif');
  const toastMsg = toast.querySelector('.toast-msg');

  // Mobile Drawer elements
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileCartAction = document.getElementById('mobile-cart-action');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Product Modal elements
  const productModal = document.getElementById('product-detail-modal');
  const productModalBody = document.getElementById('product-modal-body');
  const closeProductModalBtn = document.getElementById('close-product-modal');

  // Checkout Modal elements
  const checkoutModal = document.getElementById('checkout-modal');
  const closeCheckoutModalBtn = document.getElementById('close-checkout-modal');
  const checkoutMiniSummary = document.getElementById('checkout-mini-summary');
  const checkoutOrderForm = document.getElementById('checkout-order-form');

  // Order Confirm Modal elements
  const orderConfirmModal = document.getElementById('order-confirm-modal');
  const confirmModalBody = document.getElementById('confirm-modal-body');

  /* --------------------------------------------------------------------------
     5. SCROLL EFFECTS: PROGRESS BAR, HEADER SCROLLED & REVEAL ON SCROLL
     -------------------------------------------------------------------------- */
  const scrollProgressBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    // Scroll progress bar
    if (scrollProgressBar) {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgressBar.style.width = scrolled + '%';
    }

    // Header scrolled state
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Reveal On Scroll with IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* --------------------------------------------------------------------------
     6. MOBILE MENU DRAWER
     -------------------------------------------------------------------------- */
  function openMobileMenu() {
    mobileNavDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileNavDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileMenu);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  if (mobileCartAction) {
    mobileCartAction.addEventListener('click', () => {
      closeMobileMenu();
      openCart();
    });
  }

  /* --------------------------------------------------------------------------
     7. INTERACTIVE LIFESTYLE TABS (Scallop Blob Photo Switching)
     -------------------------------------------------------------------------- */
  const lifestyleTabBtns = document.querySelectorAll('.tab-btn');
  const lifestyleTabPanels = document.querySelectorAll('.tab-panel');

  lifestyleTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      lifestyleTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      lifestyleTabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.add('active');
        }
      });
    });
  });

  const exploreShopBtn = document.querySelector('[data-action="explore-shop"]');
  if (exploreShopBtn) {
    exploreShopBtn.addEventListener('click', () => {
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     8. PRODUCT CATALOG RENDER & FILTER (Hiện 4 sản phẩm, có nút chuyển qua)
     -------------------------------------------------------------------------- */
  const productsCatalogContainer = document.getElementById('products-catalog');
  const filterButtons = document.querySelectorAll('.filter-tab-btn');
  const catalogPrevBtn = document.getElementById('catalog-prev-btn');
  const catalogNextBtn = document.getElementById('catalog-next-btn');
  const catalogPageCounter = document.getElementById('catalog-page-counter');
  const catalogPaginationWrap = document.getElementById('catalog-pagination-wrap');

  let currentCatalogFilter = 'all';
  let currentCatalogPage = 1;
  const PRODUCTS_PER_PAGE = 4;

  function renderCatalog(filter = currentCatalogFilter, page = currentCatalogPage) {
    if (!productsCatalogContainer) return;
    currentCatalogFilter = filter;
    currentCatalogPage = page;

    const filteredItems = Object.values(catalog).filter(item => {
      if (filter === 'all') return true;
      return item.category === filter;
    });

    const totalPages = Math.ceil(filteredItems.length / PRODUCTS_PER_PAGE) || 1;
    if (currentCatalogPage > totalPages) currentCatalogPage = 1;
    if (currentCatalogPage < 1) currentCatalogPage = 1;

    const startIndex = (currentCatalogPage - 1) * PRODUCTS_PER_PAGE;
    const pageItems = filteredItems.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    // Update pagination controls
    if (catalogPrevBtn && catalogNextBtn && catalogPaginationWrap) {
      if (totalPages <= 1) {
        catalogPrevBtn.style.visibility = 'hidden';
        catalogNextBtn.style.visibility = 'hidden';
        catalogPaginationWrap.style.display = 'none';
      } else {
        catalogPrevBtn.style.visibility = 'visible';
        catalogNextBtn.style.visibility = 'visible';
        catalogPaginationWrap.style.display = 'flex';

        catalogPrevBtn.disabled = (currentCatalogPage === 1);
        catalogNextBtn.disabled = (currentCatalogPage === totalPages);

        if (catalogPageCounter) {
          catalogPageCounter.textContent = `Trang ${currentCatalogPage} / ${totalPages} (${filteredItems.length} sản phẩm)`;
        }
      }
    }

    productsCatalogContainer.innerHTML = pageItems.map(item => `
      <article class="product-floating-card reveal-on-scroll is-revealed" data-id="${item.id}" data-category="${item.category}">
        <div class="product-image-box" data-action="view-detail" data-id="${item.id}" title="Nhấn để xem chi tiết ${item.name}">
          <img src="${item.image}" alt="${item.name}" class="product-image" loading="lazy" />
        </div>
        <div class="product-info-minimal">
          <h3 class="product-name">${item.name}</h3>
          <span class="product-tag">${item.categoryLabel}</span>
          <div class="product-price">${formatVND(item.price)}</div>
        </div>
        <div class="product-buttons-row">
          <button class="product-cta-btn" data-action="add-to-cart" data-id="${item.id}">
            Thêm Vào Giỏ
          </button>
          <button class="product-detail-link" data-action="view-detail" data-id="${item.id}">
            Xem Chi Tiết & Thành Phần
          </button>
        </div>
      </article>
    `).join('');

    // Reattach event listeners to new cards
    productsCatalogContainer.querySelectorAll('[data-action="view-detail"]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        openProductModal(id);
      });
    });

    productsCatalogContainer.querySelectorAll('[data-action="add-to-cart"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        addToCart(id);
      });
    });
  }

  // Prev / Next button listeners
  if (catalogPrevBtn) {
    catalogPrevBtn.addEventListener('click', () => {
      if (currentCatalogPage > 1) {
        currentCatalogPage--;
        renderCatalog(currentCatalogFilter, currentCatalogPage);
      }
    });
  }

  if (catalogNextBtn) {
    catalogNextBtn.addEventListener('click', () => {
      const filteredItems = Object.values(catalog).filter(item => {
        if (currentCatalogFilter === 'all') return true;
        return item.category === currentCatalogFilter;
      });
      const totalPages = Math.ceil(filteredItems.length / PRODUCTS_PER_PAGE) || 1;
      if (currentCatalogPage < totalPages) {
        currentCatalogPage++;
        renderCatalog(currentCatalogFilter, currentCatalogPage);
      }
    });
  }

  function setCatalogFilter(filter) {
    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-filter') === filter) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });
    currentCatalogPage = 1;
    renderCatalog(filter, 1);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      setCatalogFilter(filter);
    });
  });

  // Hero CTAs and Navigation links with data-filter
  document.querySelectorAll('[data-filter]').forEach(trigger => {
    if (trigger.classList.contains('filter-tab-btn')) return;
    trigger.addEventListener('click', (e) => {
      const filter = trigger.getAttribute('data-filter');
      setCatalogFilter(filter);
      const shopSection = document.getElementById('shop');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* --------------------------------------------------------------------------
     9. PRODUCT DETAIL MODAL
     -------------------------------------------------------------------------- */
  function openProductModal(productId) {
    const item = catalog[productId];
    if (!item) return;

    productModalBody.innerHTML = `
      <div class="modal-product-layout">
        <div class="modal-product-gallery">
          <img src="${item.image}" alt="${item.name}" class="modal-product-img"
               onerror="this.onerror=null; this.src='assets/categorie2.jpg';" />
          <div class="modal-badge-overlay">${item.categoryLabel}</div>
        </div>
        <div class="modal-product-info">
          <span class="modal-sku">${item.sku} • ${item.netWeight}</span>
          <h2 class="modal-title" id="modal-product-title">${item.name}</h2>
          <div class="modal-price">${formatVND(item.price)}</div>
          
          <div class="modal-desc-block">
            <h4>Hương Vị Đặc Trưng:</h4>
            <p>${item.tastingNotes}</p>
          </div>

          <div class="modal-specs-accordion">
            <div class="spec-row">
              <strong>Thành phần:</strong>
              <span>${item.ingredients}</span>
            </div>
            <div class="spec-row">
              <strong>Hướng dẫn pha:</strong>
              <span>${item.brewing}</span>
            </div>
            <div class="spec-row">
              <strong>Bảo quản & HSD:</strong>
              <span>${item.storage} (Hạn dùng: ${item.shelfLife})</span>
            </div>
            <div class="spec-row">
              <strong>Ghi chú an toàn:</strong>
              <span>${item.allergen}</span>
            </div>
          </div>

          <div class="modal-action-row">
            <div class="modal-qty-selector">
              <button class="modal-qty-btn" id="modal-qty-minus">−</button>
              <input type="number" id="modal-qty-input" value="1" min="1" max="99" readonly />
              <button class="modal-qty-btn" id="modal-qty-plus">+</button>
            </div>
            <button class="modal-add-btn" id="modal-confirm-add" data-id="${item.id}">
              Thêm Vào Giỏ Hàng (${formatVND(item.price)})
            </button>
          </div>
        </div>
      </div>
    `;

    let qty = 1;
    const qtyInput = document.getElementById('modal-qty-input');
    const minusBtn = document.getElementById('modal-qty-minus');
    const plusBtn = document.getElementById('modal-qty-plus');
    const addBtn = document.getElementById('modal-confirm-add');

    minusBtn.addEventListener('click', () => {
      if (qty > 1) {
        qty--;
        qtyInput.value = qty;
        addBtn.textContent = `Thêm Vào Giỏ Hàng (${formatVND(item.price * qty)})`;
      }
    });

    plusBtn.addEventListener('click', () => {
      qty++;
      qtyInput.value = qty;
      addBtn.textContent = `Thêm Vào Giỏ Hàng (${formatVND(item.price * qty)})`;
    });

    addBtn.addEventListener('click', () => {
      addToCart(item.id, qty);
      closeProductModal();
    });

    productModal.classList.add('open');
    productModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    productModal.classList.remove('open');
    productModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeProductModalBtn) closeProductModalBtn.addEventListener('click', closeProductModal);
  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) closeProductModal();
    });
  }

  /* --------------------------------------------------------------------------
     10. INTERACTIVE GIFT BUILDER (Tự Phối Vị Set 3 & Set 6 + Viết Thiệp)
     -------------------------------------------------------------------------- */
  const builderSlotsGrid = document.getElementById('builder-slots-grid');
  const builderSize3Btn = document.getElementById('builder-size-3');
  const builderSize6Btn = document.getElementById('builder-size-6');
  const builderCardMsg = document.getElementById('builder-card-msg');
  const summarySetTitle = document.getElementById('summary-set-title');
  const summaryFlavorsList = document.getElementById('summary-flavors-list');
  const summaryCardStatus = document.getElementById('summary-card-status');
  const summaryPriceVal = document.getElementById('summary-price-val');
  const builderAddToCartBtn = document.getElementById('builder-add-to-cart-btn');
  const startBuilder3Btn = document.getElementById('start-builder-3');
  const startBuilder6Btn = document.getElementById('start-builder-6');

  let currentBuilderSize = 3;
  let currentBuilderFlavors = ['rose-amber', 'citrus-matcha', 'lavender-pea'];

  const availableSingleFlavors = [
    { id: 'rose-amber', name: 'Rose Amber (Trà Hồng Hổ Phách)' },
    { id: 'citrus-matcha', name: 'Citrus & Matcha (Matcha Cam Chanh)' },
    { id: 'lavender-pea', name: 'Lavender Pea (Trà Đậu Biếc Oải Hương)' },
    { id: 'ruby-hibiscus', name: 'Ruby Hibiscus (Mocktail Hồng Ngọc)' }
  ];

  function renderBuilderSlots() {
    if (!builderSlotsGrid) return;

    builderSlotsGrid.innerHTML = '';
    for (let i = 0; i < currentBuilderSize; i++) {
      const selectedFlavorId = currentBuilderFlavors[i] || availableSingleFlavors[i % availableSingleFlavors.length].id;
      currentBuilderFlavors[i] = selectedFlavorId;

      const slotEl = document.createElement('div');
      slotEl.className = 'slot-select-card';
      slotEl.innerHTML = `
        <div class="slot-num">Vị trí #${i + 1}</div>
        <select class="slot-flavor-dropdown" data-slot="${i}">
          ${availableSingleFlavors.map(f => `
            <option value="${f.id}" ${f.id === selectedFlavorId ? 'selected' : ''}>
              ${f.name}
            </option>
          `).join('')}
        </select>
      `;
      builderSlotsGrid.appendChild(slotEl);
    }

    builderSlotsGrid.querySelectorAll('.slot-flavor-dropdown').forEach(dropdown => {
      dropdown.addEventListener('change', (e) => {
        const slotIdx = parseInt(e.target.getAttribute('data-slot'));
        currentBuilderFlavors[slotIdx] = e.target.value;
        updateBuilderSummary();
      });
    });

    updateBuilderSummary();
  }

  function updateBuilderSummary() {
    if (!summarySetTitle) return;

    const isSet3 = currentBuilderSize === 3;
    const price = isSet3 ? 100000 : 190000;

    summarySetTitle.textContent = isSet3 ? 'Hộp Quà 3 Viên Tự Chọn' : 'Hộp Quà 6 Viên Tinh Tuyển';
    summaryPriceVal.textContent = formatVND(price);

    summaryFlavorsList.innerHTML = currentBuilderFlavors.map((fid, idx) => {
      const flavorObj = availableSingleFlavors.find(f => f.id === fid);
      return `<div class="summary-flavor-item"><span>#${idx + 1}:</span> ${flavorObj ? flavorObj.name : fid}</div>`;
    }).join('');

    const msg = builderCardMsg ? builderCardMsg.value.trim() : '';
    if (msg) {
      summaryCardStatus.textContent = `"${msg.length > 50 ? msg.slice(0, 50) + '...' : msg}"`;
      summaryCardStatus.classList.remove('italic-text');
    } else {
      summaryCardStatus.textContent = 'Chưa nhập lời nhắn (Meliora sẽ gửi thiệp trống)';
      summaryCardStatus.classList.add('italic-text');
    }
  }

  function setBuilderSize(size) {
    currentBuilderSize = size;
    if (size === 3) {
      builderSize3Btn.classList.add('active');
      builderSize6Btn.classList.remove('active');
      currentBuilderFlavors = currentBuilderFlavors.slice(0, 3);
      if (currentBuilderFlavors.length < 3) {
        currentBuilderFlavors = ['rose-amber', 'citrus-matcha', 'lavender-pea'];
      }
    } else {
      builderSize6Btn.classList.add('active');
      builderSize3Btn.classList.remove('active');
      while (currentBuilderFlavors.length < 6) {
        currentBuilderFlavors.push(availableSingleFlavors[currentBuilderFlavors.length % availableSingleFlavors.length].id);
      }
    }
    renderBuilderSlots();
  }

  if (builderSize3Btn && builderSize6Btn) {
    builderSize3Btn.addEventListener('click', () => setBuilderSize(3));
    builderSize6Btn.addEventListener('click', () => setBuilderSize(6));
  }

  if (builderCardMsg) {
    builderCardMsg.addEventListener('input', updateBuilderSummary);
  }

  if (startBuilder3Btn) {
    startBuilder3Btn.addEventListener('click', () => {
      setBuilderSize(3);
      document.getElementById('gift-builder').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (startBuilder6Btn) {
    startBuilder6Btn.addEventListener('click', () => {
      setBuilderSize(6);
      document.getElementById('gift-builder').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (builderAddToCartBtn) {
    builderAddToCartBtn.addEventListener('click', () => {
      const isSet3 = currentBuilderSize === 3;
      const baseProductId = isSet3 ? 'gift-set-3' : 'gift-set-6';
      const baseProduct = catalog[baseProductId];
      const cardMessage = builderCardMsg ? builderCardMsg.value.trim() : '';

      const flavorNames = currentBuilderFlavors.map(fid => {
        const found = availableSingleFlavors.find(f => f.id === fid);
        return found ? found.name.split(' (')[0] : fid;
      });

      const customGiftItem = {
        id: `custom-gift-${Date.now()}`,
        name: isSet3 ? 'Set Quà 3 Viên Tự Phối' : 'Set Quà 6 Viên Tự Phối',
        price: isSet3 ? 100000 : 190000,
        image: baseProduct.image,
        qty: 1,
        isCustomGift: true,
        flavors: flavorNames,
        cardMessage: cardMessage || 'Không có lời nhắn'
      };

      cart.push(customGiftItem);
      renderCart();
      saveCart();
      showToast(`Đã thêm ${customGiftItem.name} vào giỏ hàng!`);
      openCart();
    });
  }

  /* --------------------------------------------------------------------------
     11. SHOPPING CART MANAGEMENT
     -------------------------------------------------------------------------- */
  function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (headerCartBtn) headerCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cartDrawer.classList.contains('open')) closeCart();
      if (productModal.classList.contains('open')) closeProductModal();
      if (checkoutModal.classList.contains('open')) closeCheckoutModal();
      if (orderConfirmModal.classList.contains('open')) closeOrderConfirmModal();
      if (mobileNavDrawer.classList.contains('open')) closeMobileMenu();
    }
  });

  function addToCart(productId, qty = 1) {
    const product = catalog[productId];
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId && !item.isCustomGift);
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: qty,
        isCustomGift: false
      });
    }

    renderCart();
    saveCart();
    showToast(`Đã thêm ${product.name} vào giỏ hàng!`);
    openCart();
  }

  function updateItemQty(itemId, delta) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      cart[itemIndex].qty += delta;
      if (cart[itemIndex].qty <= 0) {
        cart.splice(itemIndex, 1);
      }
    }
    renderCart();
    saveCart();
  }

  function removeItem(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      cart.splice(itemIndex, 1);
      renderCart();
      saveCart();
    }
  }

  function renderCart() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
    });
    if (cartItemsQty) cartItemsQty.textContent = totalCount;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (cartSubtotalVal) cartSubtotalVal.textContent = formatVND(subtotal);

    const freeShippingThreshold = 200000;
    if (shippingProgress && shippingText) {
      if (subtotal >= freeShippingThreshold && totalCount > 0) {
        shippingProgress.style.width = '100%';
        shippingText.innerHTML = 'Bạn đã nhận được <strong>MIỄN PHÍ VẬN CHUYỂN</strong> toàn quốc!';
      } else {
        const remaining = Math.max(0, freeShippingThreshold - subtotal);
        const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
        shippingProgress.style.width = `${progressPercent}%`;
        shippingText.innerHTML = `Thêm <strong>${formatVND(remaining)}</strong> để được MIỄN PHÍ vận chuyển!`;
      }
    }

    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <p>Giỏ hàng của bạn đang trống!</p>
          <button class="empty-shop-cta" id="empty-shop-now-btn">Khám Phá Hương Vị Ngay</button>
        </div>
      `;
      const emptyShopBtn = document.getElementById('empty-shop-now-btn');
      if (emptyShopBtn) {
        emptyShopBtn.addEventListener('click', () => {
          closeCart();
          document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
        });
      }
    } else {
      cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
          <div class="cart-item-thumb">
            <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='assets/categorie2.jpg';">
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            ${item.isCustomGift ? `
              <div class="cart-gift-details">
                <p><strong>Vị:</strong> ${item.flavors.join(' • ')}</p>
                <p><strong>Thiệp:</strong> "${item.cardMessage}"</p>
              </div>
            ` : ''}
            <div class="cart-item-price">${formatVND(item.price * item.qty)}</div>
            <div class="item-qty-control">
              <button class="qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Giảm">−</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" data-action="increase" data-id="${item.id}" aria-label="Tăng">+</button>
            </div>
          </div>
          <button class="cart-remove-item" data-action="remove" data-id="${item.id}" title="Xóa sản phẩm" aria-label="Xóa">&times;</button>
        </div>
      `).join('');

      cartItemsList.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const action = btn.getAttribute('data-action');
          updateItemQty(id, action === 'increase' ? 1 : -1);
        });
      });

      cartItemsList.querySelectorAll('.cart-remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          removeItem(id);
        });
      });
    }
  }

  // Toast Functionality
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    if (toastTimer) clearTimeout(toastTimer);
    toastMsg.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  /* --------------------------------------------------------------------------
     12. CHECKOUT & ORDER SUBMISSION (VietQR & Zalo Direct)
     -------------------------------------------------------------------------- */
  function openCheckoutModal() {
    if (cart.length === 0) {
      showToast('Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng!');
      return;
    }

    closeCart();

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shippingFee = subtotal >= 200000 ? 0 : 25000;
    const finalTotal = subtotal + shippingFee;

    checkoutMiniSummary.innerHTML = `
      <div class="summary-receipt">
        <div class="summary-items-list">
          ${cart.map(item => `
            <div class="summary-row">
              <span>${item.name} <strong>x${item.qty}</strong></span>
              <span>${formatVND(item.price * item.qty)}</span>
            </div>
          `).join('')}
        </div>
        <div class="summary-divider"></div>
        <div class="summary-row">
          <span>Tiền hàng:</span>
          <span>${formatVND(subtotal)}</span>
        </div>
        <div class="summary-row">
          <span>Phí vận chuyển:</span>
          <span>${shippingFee === 0 ? '<strong style="color:#0F3B26;">MIỄN PHÍ</strong>' : formatVND(shippingFee)}</span>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-row total-highlight">
          <span>Tổng thanh toán:</span>
          <strong>${formatVND(finalTotal)}</strong>
        </div>
      </div>
    `;

    checkoutModal.classList.add('open');
    checkoutModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckoutModal() {
    checkoutModal.classList.remove('open');
    checkoutModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckoutModal);
  if (closeCheckoutModalBtn) closeCheckoutModalBtn.addEventListener('click', closeCheckoutModal);

  if (checkoutOrderForm) {
    checkoutOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullname = document.getElementById('order-fullname').value.trim();
      const phone = document.getElementById('order-phone').value.trim();
      const address = document.getElementById('order-address').value.trim();
      const note = document.getElementById('order-note').value.trim();
      const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

      if (!fullname || !phone || !address) {
        alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng!');
        return;
      }

      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const shippingFee = subtotal >= 200000 ? 0 : 25000;
      const finalTotal = subtotal + shippingFee;
      const orderCode = 'MEL-' + Math.floor(100000 + Math.random() * 900000);

      const orderData = {
        code: orderCode,
        createdAt: new Date().toLocaleString('vi-VN'),
        customer: { fullname, phone, address, note },
        paymentMethod,
        items: [...cart],
        subtotal,
        shippingFee,
        finalTotal
      };

      try {
        const orderHistory = JSON.parse(localStorage.getItem('meliora_orders') || '[]');
        orderHistory.unshift(orderData);
        localStorage.setItem('meliora_orders', JSON.stringify(orderHistory));
      } catch (err) {
        console.warn('Could not save order history', err);
      }

      closeCheckoutModal();
      cart = [];
      saveCart();
      renderCart();

      showOrderConfirmation(orderData);
    });
  }

  function showOrderConfirmation(order) {
    const paymentLabel = order.paymentMethod === 'vietqr'
      ? 'Chuyển khoản Ngân Hàng (VietQR)'
      : order.paymentMethod === 'zalo'
      ? 'Đặt hàng hỗ trợ qua Zalo'
      : 'Thanh toán tiền mặt khi nhận hàng (COD)';

    const zaloMsg = encodeURIComponent(
      `Chào Meliora, tôi vừa đặt đơn hàng #${order.code} trên website:\n` +
      `- Khách hàng: ${order.customer.fullname} (${order.customer.phone})\n` +
      `- Địa chỉ: ${order.customer.address}\n` +
      `- Đơn gồm: ${order.items.map(i => `${i.name} (x${i.qty})`).join(', ')}\n` +
      `- Tổng tiền: ${formatVND(order.finalTotal)}\n` +
      `- Ghi chú: ${order.customer.note || 'Không có'}`
    );
    const zaloUrl = `https://zalo.me/0988250399?text=${zaloMsg}`;

    confirmModalBody.innerHTML = `
      <div class="confirm-card-content">
        <h2 class="confirm-title">Đặt Hàng Thành Công!</h2>
        <p class="confirm-subtitle">
          Cảm ơn bạn đã lựa chọn Meliora. Mã đơn hàng của bạn là: <strong class="order-code-badge">#${order.code}</strong>
        </p>

        <div class="order-receipt-box">
          <div class="receipt-section">
            <h4>Thông Tin Người Nhận:</h4>
            <p><strong>Người nhận:</strong> ${order.customer.fullname}</p>
            <p><strong>Số điện thoại:</strong> ${order.customer.phone}</p>
            <p><strong>Địa chỉ:</strong> ${order.customer.address}</p>
            ${order.customer.note ? `<p><strong>Ghi chú:</strong> ${order.customer.note}</p>` : ''}
            <p><strong>Hình thức:</strong> ${paymentLabel}</p>
          </div>

          <div class="receipt-divider"></div>

          <div class="receipt-section">
            <h4>Chi Tiết Đơn Hàng:</h4>
            ${order.items.map(item => `
              <div class="receipt-item-row">
                <span>${item.name} x${item.qty}</span>
                <strong>${formatVND(item.price * item.qty)}</strong>
              </div>
            `).join('')}
            <div class="receipt-divider"></div>
            <div class="receipt-item-row total">
              <span>Tổng thanh toán:</span>
              <strong class="receipt-total-price">${formatVND(order.finalTotal)}</strong>
            </div>
          </div>
        </div>

        ${order.paymentMethod === 'vietqr' ? `
          <div class="vietqr-payment-box">
            <h4>Thông Tin Chuyển Khoản Qua VietQR:</h4>
            <div class="qr-mockup-wrapper">
              <img src="https://api.vietqr.io/image/970422-0988250399-vWjZ82v.jpg?accountName=MELIORA%20BEVERAGE&amount=${order.finalTotal}&addInfo=MELIORA%20${order.code}"
                   alt="Mã QR Thanh Toán Meliora" class="vietqr-image"
                   onerror="this.src='assets/logo.jpg'; this.style.maxHeight='100px';" />
              <div class="qr-details">
                <p>Ngân hàng: <strong>MB Bank (Ngân Hàng Quân Đội)</strong></p>
                <p>Số tài khoản: <strong>0988.250.399</strong></p>
                <p>Chủ tài khoản: <strong>MELIORA BEVERAGE</strong></p>
                <p>Số tiền: <strong>${formatVND(order.finalTotal)}</strong></p>
                <p>Nội dung CK: <strong class="copy-tag">MELIORA ${order.code}</strong></p>
              </div>
            </div>
            <p class="qr-note">Đơn hàng sẽ được nhân viên Meliora gọi điện xác nhận và gửi ngay sau khi nhận thông báo.</p>
          </div>
        ` : ''}

        <div class="confirm-actions-row">
          <a href="${zaloUrl}" target="_blank" rel="noopener noreferrer" class="btn-zalo-direct">
            Gửi Đơn & Chat Nhanh Qua Zalo
          </a>
          <button class="btn-continue-shopping" id="btn-done-order">
            Tiếp Tục Mua Sắm
          </button>
        </div>
      </div>
    `;

    orderConfirmModal.classList.add('open');
    orderConfirmModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const doneOrderBtn = document.getElementById('btn-done-order');
    if (doneOrderBtn) {
      doneOrderBtn.addEventListener('click', closeOrderConfirmModal);
    }
  }

  function closeOrderConfirmModal() {
    orderConfirmModal.classList.remove('open');
    orderConfirmModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* --------------------------------------------------------------------------
     13. FAQ ACCORDION
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isExpanded) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* --------------------------------------------------------------------------
     14. QUICK INQUIRY FORM & NEWSLETTER SUBSCRIPTION
     -------------------------------------------------------------------------- */
  const quickInquiryForm = document.getElementById('quick-inquiry-form');
  if (quickInquiryForm) {
    quickInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inquiry-name').value.trim();
      const phone = document.getElementById('inquiry-phone').value.trim();
      const msg = document.getElementById('inquiry-msg').value.trim();

      const inquiries = JSON.parse(localStorage.getItem('meliora_inquiries') || '[]');
      inquiries.push({ name, phone, msg, date: new Date().toLocaleString('vi-VN') });
      localStorage.setItem('meliora_inquiries', JSON.stringify(inquiries));

      alert(`Cảm ơn ${name}! Yêu cầu tư vấn của bạn đã được gửi. Đội ngũ Meliora sẽ liên hệ qua SĐT ${phone} trong thời gian sớm nhất.`);
      quickInquiryForm.reset();
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const email = emailInput.value.trim();

      const subscribers = JSON.parse(localStorage.getItem('meliora_subscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('meliora_subscribers', JSON.stringify(subscribers));
      }

      showToast('Cảm ơn bạn! Meliora đã ghi nhận email ưu đãi của bạn.');
      emailInput.value = '';
    });
  }

  /* --------------------------------------------------------------------------
     15. INITIALIZATION
     -------------------------------------------------------------------------- */
  renderCatalog('all');
  renderBuilderSlots();
  renderCart();
});
