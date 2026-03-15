/* ==============================================
   SCRIPT.JS — Portfolio Interactions & Logic
   ============================================== */

(function () {
  'use strict';

  /* ------------------------------------------
     DOM REFERENCES
  ------------------------------------------ */
  const preloader = document.getElementById('preloader');
  const scrollProgress = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  const themeToggle = document.getElementById('themeToggle');
  const navLinks = document.querySelectorAll('.navbar__link');
  const backToTopBtn = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const typewriterText = document.getElementById('typewriterText');
  const heroParticles = document.getElementById('heroParticles');
  const filterBtns = document.querySelectorAll('.projects__filter-btn');
  const projectCards = document.querySelectorAll('.projects__card');
  const statNumbers = document.querySelectorAll('.about__stat-number');

  /* ------------------------------------------
     PRELOADER
  ------------------------------------------ */
  window.addEventListener('load', function () {
    setTimeout(function () {
      preloader.classList.add('preloader--hidden');
    }, 800);
  });

  /* ------------------------------------------
     THEME TOGGLE (Dark / Light)
  ------------------------------------------ */
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light') {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('portfolio-theme', 'light');
    }
  });

  /* ------------------------------------------
     NAVBAR — Hide on Scroll Down, Show on Up
  ------------------------------------------ */
  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleNavbarScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.classList.add('navbar--hidden');
    } else {
      navbar.classList.remove('navbar--hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(handleNavbarScroll);
      ticking = true;
    }
  });

  /* ------------------------------------------
     SCROLL PROGRESS BAR
  ------------------------------------------ */
  function updateScrollProgress() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }
  window.addEventListener('scroll', updateScrollProgress);

  /* ------------------------------------------
     ACTIVE NAV LINK ON SCROLL
  ------------------------------------------ */
  const sections = document.querySelectorAll('.section');

  function highlightActiveNav() {
    const scrollY = window.scrollY + 150;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('navbar__link--active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('navbar__link--active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightActiveNav);

  /* ------------------------------------------
     HAMBURGER MENU (Mobile)
  ------------------------------------------ */
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('navbar__hamburger--active');
    navMenu.classList.toggle('navbar__menu--open');
  });

  // Close mobile menu on link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('navbar__hamburger--active');
      navMenu.classList.remove('navbar__menu--open');
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target) && navMenu.classList.contains('navbar__menu--open')) {
      hamburger.classList.remove('navbar__hamburger--active');
      navMenu.classList.remove('navbar__menu--open');
    }
  });

  /* ------------------------------------------
     BACK TO TOP BUTTON
  ------------------------------------------ */
  function handleBackToTop() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('back-to-top--visible');
    } else {
      backToTopBtn.classList.remove('back-to-top--visible');
    }
  }
  window.addEventListener('scroll', handleBackToTop);

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ------------------------------------------
     TYPEWRITER EFFECT
  ------------------------------------------ */
  var typewriterWords = [
    'Full Stack Developer',
    'React.js Developer',
    'Node.js Developer',
    'UI/UX Enthusiast',
    'Open Source Contributor'
  ];
  var wordIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typeSpeed = 100;

  function typewrite() {
    var currentWord = typewriterWords[wordIndex];

    if (isDeleting) {
      typewriterText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typewriterText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typewriterWords.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(typewrite, typeSpeed);
  }
  typewrite();

  /* ------------------------------------------
     PARTICLE BACKGROUND (Hero)
  ------------------------------------------ */
  function createParticles() {
    var particleCount = 60;
    for (var i = 0; i < particleCount; i++) {
      var particle = document.createElement('div');
      particle.classList.add('hero__particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 8 + 4) + 's';
      particle.style.animationDelay = (Math.random() * 5) + 's';
      particle.style.width = (Math.random() * 3 + 1) + 'px';
      particle.style.height = particle.style.width;
      heroParticles.appendChild(particle);
    }
  }
  createParticles();

  /* ------------------------------------------
     INTERSECTION OBSERVER — Reveal on Scroll
  ------------------------------------------ */
  function setupRevealAnimations() {
    // Add reveal class to elements
    var revealTargets = [
      '.about__image-col',
      '.about__info-col',
      '.about__stat-card',
      '.timeline__item',
      '.projects__card',
      '.skills__domain-card',
      '.certifications__card',
      '.contact__info-card',
      '.contact__form'
    ];

    revealTargets.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el, index) {
        el.classList.add('reveal');
        el.style.transitionDelay = (index * 0.1) + 's';
      });
    });

    // Add directional reveals for timeline items
    document.querySelectorAll('.timeline__item--left').forEach(function (el) {
      el.classList.remove('reveal');
      el.classList.add('reveal--left');
    });
    document.querySelectorAll('.timeline__item--right').forEach(function (el) {
      el.classList.remove('reveal');
      el.classList.add('reveal--right');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal--left, .reveal--right').forEach(function (el) {
      observer.observe(el);
    });
  }
  setupRevealAnimations();

  /* ------------------------------------------
     SKILL TAGS — Stagger Animation
  ------------------------------------------ */
  function setupSkillTagAnimation() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var tags = entry.target.querySelectorAll('.skills__tag');
          tags.forEach(function (tag, index) {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            setTimeout(function () {
              tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              tag.style.opacity = '1';
              tag.style.transform = 'translateY(0)';
            }, index * 60);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skills__domain-card').forEach(function (card) {
      observer.observe(card);
    });
  }
  setupSkillTagAnimation();

  /* ------------------------------------------
     STATS COUNTER — Count Up Animation
  ------------------------------------------ */
  var statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    statNumbers.forEach(function (stat) {
      var target = parseInt(stat.getAttribute('data-target'), 10);
      var duration = 1500;
      var start = 0;
      var startTime = null;

      function updateCount(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        stat.textContent = Math.floor(eased * target);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
        }
      }

      requestAnimationFrame(updateCount);
    });

    statsAnimated = true;
  }

  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateStats();
      }
    });
  }, { threshold: 0.5 });

  var aboutStats = document.querySelector('.about__stats');
  if (aboutStats) {
    statsObserver.observe(aboutStats);
  }

  /* ------------------------------------------
     PROJECT FILTER
  ------------------------------------------ */
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button
      filterBtns.forEach(function (b) {
        b.classList.remove('projects__filter-btn--active');
      });
      btn.classList.add('projects__filter-btn--active');

      var filter = btn.getAttribute('data-filter');

      projectCards.forEach(function (card) {
        var category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.classList.remove('projects__card--hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(function () {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(function () {
            card.classList.add('projects__card--hidden');
          }, 300);
        }
      });
    });
  });

  /* ------------------------------------------
     CONTACT FORM — Validation & Submit
  ------------------------------------------ */
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('contactName').value.trim();
    var email = document.getElementById('contactEmail').value.trim();
    var subject = document.getElementById('contactSubject').value.trim();
    var message = document.getElementById('contactMessage').value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      showToast('Please fill in all fields.', true);
      return;
    }

    // Basic email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast('Please enter a valid email address.', true);
      return;
    }

    // Show success (in production, integrate EmailJS or backend)
    showToast('Message sent! I\'ll get back to you soon.', false);
    contactForm.reset();
  });

  function showToast(message, isError) {
    var toastIcon = toast.querySelector('i');
    var toastText = toast.querySelector('span');

    toastText.textContent = message;
    if (isError) {
      toast.style.background = '#EF4444';
      toastIcon.className = 'fas fa-exclamation-circle';
    } else {
      toast.style.background = '';
      toastIcon.className = 'fas fa-check-circle';
    }

    toast.classList.add('toast--visible');

    setTimeout(function () {
      toast.classList.remove('toast--visible');
    }, 3500);
  }

  /* ------------------------------------------
     SMOOTH SCROLL for anchor links
  ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offsetTop = target.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

})();
