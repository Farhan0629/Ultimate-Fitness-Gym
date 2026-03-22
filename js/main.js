(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuClose = document.getElementById('mobile-menu-close');
    const overlay = document.getElementById('mobile-menu-overlay');

    if (!menuBtn || !overlay || !menuClose) return;

    const closeMenu = () => {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };

    const openMenu = () => {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    };

    menuBtn.addEventListener('click', () => {
      if (overlay.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menuClose.addEventListener('click', closeMenu);

    overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    });
  }

  function initLightbox() {
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!galleryItems.length || !lightbox || !lightboxImage || !closeBtn || !prevBtn || !nextBtn) return;

    const images = galleryItems.map((item) => ({
      src: item.dataset.src || item.querySelector('img')?.getAttribute('src') || '',
      alt: item.dataset.alt || item.querySelector('img')?.getAttribute('alt') || 'Gym Image'
    }));

    let activeIndex = 0;

    const open = (index) => {
      activeIndex = (index + images.length) % images.length;
      const image = images[activeIndex];
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
    };

    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
    };

    const next = () => open(activeIndex + 1);
    const prev = () => open(activeIndex - 1);

    galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      if (img) {
        img.addEventListener('error', () => {
          img.src = 'https://placehold.co/1200x900/111111/e10600?text=Ultimate+Fitness+Gym';
        }, { once: true });
      }

      item.addEventListener('click', () => open(index));
    });

    closeBtn.addEventListener('click', close);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) close();
    });

    document.addEventListener('keydown', (event) => {
      if (!lightbox.classList.contains('open')) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') prev();
    });
  }

  function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas || prefersReducedMotion) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const particles = [];
    const particleCount = 65;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.r = Math.random() * 1.8 + 0.4;
      }

      step() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -20 || this.x > canvas.width + 20 || this.y < -20 || this.y > canvas.height + 20) {
          this.reset();
        }
      }

      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 59, 46, 0.75)';
        context.fill();
      }
    }

    for (let i = 0; i < particleCount; i += 1) {
      particles.push(new Particle());
    }

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.step();
        p.draw();

        for (let j = i + 1; j < particles.length; j += 1) {
          const n = particles[j];
          const dx = p.x - n.x;
          const dy = p.y - n.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 110) {
            const opacity = 0.22 * (1 - dist / 110);
            context.strokeStyle = `rgba(225, 6, 0, ${opacity})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(n.x, n.y);
            context.stroke();
          }
        }
      }

      window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    window.requestAnimationFrame(render);
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('form-success');

    const clearErrors = () => {
      [nameInput, emailInput, phoneInput, messageInput].forEach((el) => {
        if (el) {
          el.classList.remove('error');
          const errorEl = document.getElementById(`${el.id}-error`);
          if (errorEl) errorEl.textContent = '';
        }
      });
    };

    const showError = (element, message) => {
      const errorEl = document.getElementById(`${element.id}-error`);
      if (errorEl) {
        errorEl.textContent = message;
      }
      element.classList.add('error');
    };

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
      if (!phone.trim()) return true; // Optional field
      // Basic phone validation: at least 10 digits, can have +, spaces, dashes
      return /^[\d\s\+\-]{10,}$/.test(phone);
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      clearErrors();

      let isValid = true;

      // Name validation
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name');
        isValid = false;
      }

      // Email validation
      const email = emailInput.value.trim();
      if (!email) {
        showError(emailInput, 'Please enter your email');
        isValid = false;
      } else if (!validateEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }

      // Phone validation (optional but if filled, validate format)
      const phone = phoneInput.value.trim();
      if (phone && !validatePhone(phone)) {
        showError(phoneInput, 'Please enter a valid phone number (11 digits starting with 07)');
        isValid = false;
      }

      // Message validation
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Please enter your message');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
      }

      if (!isValid) return;

      // Create submission object
      const submission = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: nameInput.value.trim(),
        email: email,
        phone: phone,
        message: messageInput.value.trim(),
        date: new Date().toISOString()
      };

      // Save to localStorage
      try {
        const existing = localStorage.getItem('gym_contact_submissions');
        const submissions = existing ? JSON.parse(existing) : [];
        submissions.push(submission);
        localStorage.setItem('gym_contact_submissions', JSON.stringify(submissions));

        // Show success
        if (successMessage) {
          successMessage.hidden = false;
        }
        form.reset();

        // Hide success after 5 seconds
        setTimeout(() => {
          if (successMessage) {
            successMessage.hidden = true;
          }
        }, 5000);

        // Focus on success message for screen readers
        successMessage?.focus();
      } catch (error) {
        console.error('Failed to save submission:', error);
        showError(messageInput, 'Unable to save your message. Please try again.');
      }
    });

    // Clear error when user starts typing
    [nameInput, emailInput, phoneInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('error');
          const errorEl = document.getElementById(`${input.id}-error`);
          if (errorEl) errorEl.textContent = '';
        });
      }
    });
  }

  function init() {
    if (document.getElementById('entrance-overlay')) {
      document.body.classList.add('entrance-lock');
    }

    initMobileMenu();
    initSmoothAnchors();
    initParticleCanvas();
    initLightbox();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
