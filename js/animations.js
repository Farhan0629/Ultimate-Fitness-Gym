(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function hasGSAP() {
    return typeof window.gsap !== 'undefined';
  }

  function safeRegisterTrigger() {
    if (hasGSAP() && typeof window.ScrollTrigger !== 'undefined') {
      window.gsap.registerPlugin(window.ScrollTrigger);
      return true;
    }
    return false;
  }

  function revealWithoutGSAP() {
    document.querySelectorAll('.section-reveal').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  function animateEntranceOverlay() {
    const overlay = document.getElementById('entrance-overlay');
    if (!overlay) return;

    if (!hasGSAP() || prefersReducedMotion) {
      overlay.style.display = 'none';
      document.body.classList.remove('entrance-lock');
      return;
    }

    const timeline = window.gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    timeline
      .from('#entrance-title', { y: 40, autoAlpha: 0, duration: 0.85 })
      .from('#entrance-line', { y: 20, autoAlpha: 0, duration: 0.55 }, '-=0.45')
      .to(overlay, {
        delay: 0.35,
        yPercent: -100,
        duration: 0.95,
        ease: 'power4.inOut',
        onComplete: () => {
          overlay.remove();
          document.body.classList.remove('entrance-lock');
        }
      });
  }

  function animateHero() {
    if (!hasGSAP()) return;
    const heroHeadline = document.querySelector('.hero-headline');
    const heroSubheadline = document.querySelector('.hero-subheadline');
    const heroActions = document.querySelector('.hero-actions');

    if (!heroHeadline || !heroSubheadline || !heroActions) return;

    window.gsap.from([heroHeadline, heroSubheadline, heroActions], {
      autoAlpha: 0,
      y: 40,
      scale: 0.96,
      duration: 0.9,
      stagger: 0.14,
      delay: 0.2,
      ease: 'power3.out'
    });
  }

  function createFloatingParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 40;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
        this.opacity = Math.random() * 0.9 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  function animateScrollSections() {
    if (!hasGSAP() || !safeRegisterTrigger() || prefersReducedMotion) {
      revealWithoutGSAP();
      return;
    }

    window.gsap.utils.toArray('.section-reveal').forEach((section) => {
      window.gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 84%'
        }
      });
    });
  }

  function animateServiceCards() {
    if (!hasGSAP() || !safeRegisterTrigger() || prefersReducedMotion) return;

    const cards = window.gsap.utils.toArray('.service-card');
    if (!cards.length) return;

    window.gsap.from(cards, {
      opacity: 0,
      y: 36,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#services',
        start: 'top 75%'
      }
    });
  }

  function animateGalleryCards() {
    if (!hasGSAP() || !safeRegisterTrigger() || prefersReducedMotion) return;

    const cards = window.gsap.utils.toArray('.gallery-item');
    if (!cards.length) return;

    window.gsap.from(cards, {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#gallery-grid',
        start: 'top 82%'
      }
    });
  }

  function init() {
    animateEntranceOverlay();
    animateHero();
    animateScrollSections();
    animateServiceCards();
    animateGalleryCards();
    createFloatingParticles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
