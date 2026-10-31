/* ==========================================================================
   DEUX Landing Page Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Meliora Products Catalog
  const products = {
    'citrus-matcha': {
      id: 'citrus-matcha',
      name: 'Citrus & Matcha Fizz Bomb',
      price: 14.0,
      image: 'assets/catigorie1.jpg'
    },
    'rose-amber': {
      id: 'rose-amber',
      name: 'Rose Amber Herbal Bomb',
      price: 14.0,
      image: 'assets/categorie2.jpg'
    },
    'lavender-pea': {
      id: 'lavender-pea',
      name: 'Lavender Butterfly Pea Bomb',
      price: 15.0,
      image: 'assets/categorie3.jpg'
    },
    'ruby-hibiscus': {
      id: 'ruby-hibiscus',
      name: 'Ruby Hibiscus Blossom Bomb',
      price: 14.0,
      image: 'assets/categorie4.jpg'
    }
  };

  // Cart State
  let cart = [];

  // DOM Elements
  const header = document.querySelector('.main-header');
  const cartTriggerBtn = document.getElementById('open-cart-btn');
  const cartCloseBtn = document.getElementById('close-cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartCountBadge = document.getElementById('cart-count');
  const cartItemsQty = document.getElementById('cart-items-qty');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartSubtotalVal = document.getElementById('cart-subtotal-val');
  const shippingProgress = document.getElementById('shipping-progress');
  const shippingText = document.getElementById('shipping-text');
  const toast = document.getElementById('toast-notif');
  const toastMsg = toast.querySelector('.toast-msg');
  const emptyShopBtn = document.getElementById('empty-shop-now');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  /* --------------------------------------------------------------------------
     1. Header Scroll Effect
     -------------------------------------------------------------------------- */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* --------------------------------------------------------------------------
     2. Tab Switching (Scoop It / Bake It / Reuse It)
     -------------------------------------------------------------------------- */
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Update button active state
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Switch panels
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.add('active');
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     3. Cart Management
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

  cartTriggerBtn.addEventListener('click', openCart);
  cartCloseBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartDrawer.classList.contains('open')) {
      closeCart();
    }
  });

  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('[data-action="add-to-cart"]');
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = btn.getAttribute('data-target');
      addToCart(productId);
    });
  });

  function addToCart(productId) {
    const product = products[productId];
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({
        ...product,
        qty: 1
      });
    }

    renderCart();
    showToast(`Added ${product.name} to bag!`);
    openCart();
  }

  function updateItemQty(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      cart[itemIndex].qty += delta;
      if (cart[itemIndex].qty <= 0) {
        cart.splice(itemIndex, 1);
      }
    }
    renderCart();
  }

  function renderCart() {
    // Total count
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadge.textContent = totalCount;
    cartItemsQty.textContent = totalCount;

    // Subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    cartSubtotalVal.textContent = `$${subtotal.toFixed(2)}`;

    // Free shipping threshold ($50)
    const freeShippingThreshold = 50.0;
    if (subtotal >= freeShippingThreshold) {
      shippingProgress.style.width = '100%';
      shippingText.textContent = "🎉 You've unlocked FREE standard shipping!";
    } else {
      const remaining = freeShippingThreshold - subtotal;
      const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
      shippingProgress.style.width = `${progressPercent}%`;
      shippingText.textContent = `Add $${remaining.toFixed(2)} more for FREE shipping!`;
    }

    // Render items list
    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <p>Giỏ hàng của bạn đang trống!</p>
          <button class="hero-cta-btn" id="empty-shop-now-dynamic">Khám Phá Sản Phẩm</button>
        </div>
      `;
      const dynamicEmptyBtn = document.getElementById('empty-shop-now-dynamic');
      if (dynamicEmptyBtn) {
        dynamicEmptyBtn.addEventListener('click', () => {
          closeCart();
          document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
        });
      }
    } else {
      cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
          <div class="cart-item-thumb">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="item-price">$${(item.price * item.qty).toFixed(2)}</div>
            <div class="item-qty-control">
              <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
              <span>${item.qty}</span>
              <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="cart-remove-item" data-action="remove" data-id="${item.id}" title="Remove item" style="color: #999; font-size: 1.25rem;">&times;</button>
        </div>
      `).join('');

      // Attach qty listeners
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
          const itemIndex = cart.findIndex(item => item.id === id);
          if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
            renderCart();
          }
        });
      });
    }
  }

  // Toast Functionality
  let toastTimer = null;
  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMsg.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // Checkout button interaction
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Please add items before checking out!');
      return;
    }
    showToast('Redirecting to secure checkout...');
  });

  // Empty state button
  if (emptyShopBtn) {
    emptyShopBtn.addEventListener('click', () => {
      closeCart();
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Initial cart render
  renderCart();
});
