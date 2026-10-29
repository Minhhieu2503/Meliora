/**
 * MELIORA - Vietnamese Artisan Tea Bombs Landing Page
 * Interactive Logic:
 * - Floating Petals Parallax Canvas
 * - Sticky Glass Nav & Mobile Menu
 * - 4-Step Interactive Tea Bomb Bloom Simulator
 * - 3D Perspective Tilt on Flavor Cards
 * - Dynamic Background Accent Shift on Flavor Hover
 * - FAQ Accordion
 * - Video Modal Preview
 * - Ripple Effects & Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  initPetalsCanvas();
  initNavigation();
  initScrollReveal();
  initBloomSimulator();
  initFlavor3DTilt();
  initFaqAccordion();
  initMomentsModal();
  initButtonRipples();
});

/* ==========================================================================
   1. FLOATING PETALS CANVAS ENGINE
   ========================================================================== */
function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / width - 0.5) * 2;
    mouseY = (e.clientY / height - 0.5) * 2;
  });

  // Petal types: 0 = Pink Rose Petal, 1 = Golden Chamomile Petal, 2 = Green Tea Leaf
  const petalCount = window.innerWidth < 768 ? 20 : 38;
  const petals = [];

  const colorPalettes = [
    { fill: 'rgba(242, 167, 184, 0.75)', stroke: 'rgba(222, 130, 150, 0.4)' }, // Lotus pink
    { fill: 'rgba(246, 178, 107, 0.75)', stroke: 'rgba(224, 149, 73, 0.4)' },  // Apricot gold
    { fill: 'rgba(168, 198, 134, 0.7)', stroke: 'rgba(139, 168, 105, 0.4)' }   // Matcha green
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -30;
      this.size = Math.random() * 12 + 10;
      this.speedY = Math.random() * 0.9 + 0.4;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
      this.swingOffset = Math.random() * Math.PI * 2;
      this.swingSpeed = Math.random() * 0.015 + 0.01;
      this.type = Math.floor(Math.random() * 3);
      this.opacity = Math.random() * 0.45 + 0.4;
    }

    update() {
      this.swingOffset += this.swingSpeed;
      this.y += this.speedY;
      this.x += Math.sin(this.swingOffset) * 0.8 + this.speedX + mouseX * 0.3;
      this.rotation += this.rotSpeed;

      if (this.y > height + 40 || this.x < -50 || this.x > width + 50) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;

      const palette = colorPalettes[this.type];
      ctx.fillStyle = palette.fill;
      ctx.strokeStyle = palette.stroke;
      ctx.lineWidth = 0.8;

      ctx.beginPath();
      if (this.type === 0) {
        // Curved Rose Petal
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.5, this.size * 0.9, this.size * 0.6, 0, this.size);
        ctx.bezierCurveTo(-this.size * 0.9, this.size * 0.6, -this.size * 0.8, -this.size * 0.5, 0, -this.size);
      } else if (this.type === 1) {
        // Golden Chamomile / Floret
        ctx.ellipse(0, 0, this.size * 0.45, this.size, 0, 0, Math.PI * 2);
      } else {
        // Slender Tea Leaf
        ctx.moveTo(0, -this.size * 1.1);
        ctx.quadraticCurveTo(this.size * 0.5, 0, 0, this.size * 1.1);
        ctx.quadraticCurveTo(-this.size * 0.5, 0, 0, -this.size * 1.1);
      }
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-links a');

  // Sticky nav scroll styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        drawer.classList.add('open');
        toggle.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Active section spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   3. SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-fade-up');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   4. INTERACTIVE TEA BOMB BLOOM SIMULATOR
   ========================================================================== */
function initBloomSimulator() {
  const stageLayers = document.querySelectorAll('.bloom-image-layer');
  const stepTabs = document.querySelectorAll('.step-tab');
  const stepBadge = document.getElementById('sim-step-badge');
  const stepTitle = document.getElementById('sim-step-title');
  const stepDesc = document.getElementById('sim-step-desc');
  const playBtn = document.getElementById('sim-play-btn');
  const bubblesContainer = document.getElementById('sim-bubbles');

  if (!stageLayers.length || !stepTabs.length) return;

  const stepData = [
    {
      num: 'GIAI ĐOẠN 01',
      title: 'Viên trà nguyên vẹn',
      desc: 'Lớp vỏ Isomalt trong suốt như khối ngọc lưu ly pha lê, ôm trọn cánh hoa sấy thăng hoa và búp trà thơm ngát bên trong mà chưa hề tiếp xúc với nước.',
      bubbles: false
    },
    {
      num: 'GIAI ĐOẠN 02',
      title: 'Thả vào nước nóng (85°C - 90°C)',
      desc: 'Nhiệt độ đánh thức khối pha lê. Hàng ngàn bọt khí li ti bắt đầu reo vui quanh bề mặt khi tinh thể isomalt bắt đầu hấp thụ nhiệt êm dịu.',
      bubbles: true
    },
    {
      num: 'GIAI ĐOẠN 03',
      title: 'Vỏ Isomalt tan dần',
      desc: 'Lớp vỏ bảo vệ tan hòa tự nhiên vào nước. Làn hương thảo mộc nguyên bản đầu tiên bắt đầu len lỏi và lan tỏa ngập tràn không gian thư thái.',
      bubbles: true
    },
    {
      num: 'GIAI ĐOẠN 04',
      title: 'Trà, hoa & quả bung nở rực rỡ',
      desc: 'Từng cánh hoa hồng, đóa cúc hoàng kim và búp trà bung xòe mềm mại, chuyển động như một bức tranh thủy mặc sống động ngay trong tách thủy tinh.',
      bubbles: true
    }
  ];

  let currentStep = 1;
  let autoTimer = null;
  let isPlaying = false;

  function renderBubbles(active) {
    if (!bubblesContainer) return;
    bubblesContainer.innerHTML = '';
    if (!active) return;

    const count = currentStep === 4 ? 24 : 18;
    for (let i = 0; i < count; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      const size = Math.random() * 8 + 3;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 84 + 8}%`;
      bubble.style.bottom = `${Math.random() * 20}%`;
      bubble.style.animationDuration = `${Math.random() * 1.6 + 1.2}s`;
      bubble.style.animationDelay = `${Math.random() * 1.2}s`;
      bubblesContainer.appendChild(bubble);
    }
  }

  function setStep(stepIndex) {
    currentStep = stepIndex;
    const data = stepData[stepIndex - 1];

    stageLayers.forEach((layer) => {
      const stageNum = parseInt(layer.getAttribute('data-stage'), 10);
      if (stageNum === stepIndex) {
        layer.classList.add('active');
      } else {
        layer.classList.remove('active');
      }
    });

    stepTabs.forEach((tab, idx) => {
      if (idx + 1 === stepIndex) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    if (stepBadge) stepBadge.textContent = data.num;
    if (stepTitle) stepTitle.textContent = data.title;
    if (stepDesc) stepDesc.textContent = data.desc;

    renderBubbles(data.bubbles);
  }

  stepTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      stopAutoPlay();
      const step = parseInt(tab.getAttribute('data-step'), 10);
      setStep(step);
    });
  });

  function startAutoPlay() {
    isPlaying = true;
    if (playBtn) playBtn.innerHTML = '<span>⏸ Tạm dừng mô phỏng</span>';
    autoTimer = setInterval(() => {
      let nextStep = currentStep + 1;
      if (nextStep > 4) nextStep = 1;
      setStep(nextStep);
    }, 2800);
  }

  function stopAutoPlay() {
    isPlaying = false;
    if (playBtn) playBtn.innerHTML = '<span>▶ Xem mô phỏng tan chảy</span>';
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    });
  }

  // Initialize with step 1
  setStep(1);
}

/* ==========================================================================
   5. 3D TILT EFFECT & AMBIENT COLOR SHIFT ON FLAVOR CARDS
   ========================================================================== */
function initFlavor3DTilt() {
  const cards = document.querySelectorAll('.flavor-card');
  const ambientBg = document.querySelector('.ambient-blob.blob-2');

  const defaultBlobColor = 'radial-gradient(circle, var(--apricot) 0%, rgba(246, 178, 107, 0) 70%)';

  cards.forEach((card) => {
    const colorTheme = card.getAttribute('data-theme-color');

    // 3D Mouse Tilt
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      if (ambientBg) {
        ambientBg.style.background = defaultBlobColor;
      }
    });

    // Dynamic Ambient Background Shift
    card.addEventListener('mouseenter', () => {
      if (ambientBg && colorTheme) {
        ambientBg.style.background = `radial-gradient(circle, ${colorTheme} 0%, rgba(255, 255, 255, 0) 70%)`;
      }
    });
  });
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. VIDEO MODAL (TIKTOK / REEL EXPERIENCE)
   ========================================================================== */
function initMomentsModal() {
  const momentCards = document.querySelectorAll('.moment-card');
  const modalBackdrop = document.getElementById('video-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-video-title');
  const modalDesc = document.getElementById('modal-video-desc');

  if (!modalBackdrop) return;

  momentCards.forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-moment-title') || 'Khoảnh khắc trà nở hoa Meliora';
      const desc = card.getAttribute('data-moment-desc') || 'Xem trọn vẹn vũ điệu bung nở của cánh hoa trên TikTok Meliora.';

      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;

      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. BUTTON RIPPLE EFFECT
   ========================================================================== */
function initButtonRipples() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      circle.classList.add('ripple');

      const rect = this.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;

      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });
}
