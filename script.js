/* ==============================================
   SCRIPT.JS — Portfolio Interactions & Logic
   No preloader. Page loads instantly.
   ============================================== */

(function () {
  'use strict';

  /* ------------------------------------------
     DOM REFERENCES
  ------------------------------------------ */
  var scrollProgress = document.getElementById('scrollProgress');
  var navbar = document.getElementById('navbar');
  var navMenu = document.getElementById('navMenu');
  var hamburger = document.getElementById('hamburger');
  var themeToggle = document.getElementById('themeToggle');
  var navLinks = document.querySelectorAll('.navbar__link');
  var backToTopBtn = document.getElementById('backToTop');
  var contactForm = document.getElementById('contactForm');
  var toast = document.getElementById('toast');
  var typewriterText = document.getElementById('typewriterText');
  var heroParticles = document.getElementById('heroParticles');
  var filterBtns = document.querySelectorAll('.projects__filter-btn');
  var projectCards = document.querySelectorAll('.projects__card');
  var statNumbers = document.querySelectorAll('.about__stat-number');
  var sections = document.querySelectorAll('.section');
  var mediaModal = document.getElementById('mediaModal');
  var mediaModalBody = document.getElementById('mediaModalBody');
  var mediaModalClose = document.getElementById('mediaModalClose');

  /* ------------------------------------------
     THEME TOGGLE (Dark / Light)
  ------------------------------------------ */
  var savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', function () {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
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
  var lastScrollY = window.scrollY;
  var navTicking = false;

  function handleNavbarScroll() {
    var currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.classList.add('navbar--hidden');
    } else {
      navbar.classList.remove('navbar--hidden');
    }
    lastScrollY = currentScrollY;
    navTicking = false;
  }

  window.addEventListener('scroll', function () {
    if (!navTicking) {
      window.requestAnimationFrame(handleNavbarScroll);
      navTicking = true;
    }
  });

  /* ------------------------------------------
     SCROLL PROGRESS BAR
  ------------------------------------------ */
  function updateScrollProgress() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }
  window.addEventListener('scroll', updateScrollProgress);

  /* ------------------------------------------
     ACTIVE NAV LINK ON SCROLL
  ------------------------------------------ */
  function highlightActiveNav() {
    var scrollY = window.scrollY + 150;
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');
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
    'AI & Data Science Enthusiast',
    'React.js Developer',
    'Node.js Developer',
    'Problem Solver'
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
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typewriterWords.length;
      typeSpeed = 400;
    }

    setTimeout(typewrite, typeSpeed);
  }
  typewrite();

  /* ------------------------------------------
     PARTICLE BACKGROUND (Hero)
  ------------------------------------------ */
  function createParticles() {
    for (var i = 0; i < 60; i++) {
      var particle = document.createElement('div');
      particle.classList.add('hero__particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 8 + 4) + 's';
      particle.style.animationDelay = (Math.random() * 5) + 's';
      var size = (Math.random() * 3 + 1) + 'px';
      particle.style.width = size;
      particle.style.height = size;
      heroParticles.appendChild(particle);
    }
  }
  createParticles();

  /* ------------------------------------------
     INTERSECTION OBSERVER — Reveal on Scroll
  ------------------------------------------ */
  function setupRevealAnimations() {
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

    // Directional reveals for timeline
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
  function normalizeCertificateName(value) {
    return (value || '')
      .toLowerCase()
      .replace(/\.[^.]+$/, '')
      .replace(/&/g, ' and ')
      .replace(/\bcertification\b/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function toReadableTitle(fileName) {
    var cleaned = (fileName || '')
      .replace(/\.[^.]+$/, '')
      .replace(/[_-]+/g, ' ')
      .replace(/\b(cert|certificate)\b/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return cleaned
      .split(' ')
      .map(function (word) {
        var lower = word.toLowerCase();
        if (lower === 'mongodb') return 'MongoDB';
        if (lower === 'mysql') return 'MySQL';
        if (lower === 'ibm') return 'IBM';
        if (lower === 'ai') return 'AI';
        if (!word) return word;
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join(' ');
  }

  function setCertificateButton(button, fileName, title) {
    if (!button) return;
    var filePath = './certificate/' + encodeURIComponent(fileName);
    button.innerHTML = 'View Certificate <i class="fas fa-external-link-alt"></i>';
    button.setAttribute('href', filePath);
    button.setAttribute('data-cert-src', filePath);
    button.setAttribute('data-cert-title', title || 'Certificate');
    button.classList.remove('certifications__view-btn--disabled');
    button.removeAttribute('aria-disabled');
    button.removeAttribute('tabindex');
  }

  function disableCertificateButton(button) {
    if (!button) return;
    button.innerHTML = 'View Certificate <i class="fas fa-external-link-alt"></i>';
    button.removeAttribute('data-cert-src');
    button.removeAttribute('data-cert-title');
    button.removeAttribute('href');
    button.classList.add('certifications__view-btn--disabled');
    button.setAttribute('aria-disabled', 'true');
    button.setAttribute('tabindex', '-1');
  }

  function createCertificateCard(title, fileName) {
    var card = document.createElement('div');
    card.className = 'certifications__card';
    card.innerHTML = [
      '<div class="certifications__card-icon"><i class="fas fa-trophy"></i></div>',
      '<h3 class="certifications__card-title"></h3>',
      '<a class="certifications__view-btn" target="_blank" rel="noopener">',
      'View Certificate <i class="fas fa-external-link-alt"></i>',
      '</a>'
    ].join('');

    var cardTitle = card.querySelector('.certifications__card-title');
    cardTitle.textContent = title;
    setCertificateButton(card.querySelector('.certifications__view-btn'), fileName, title);
    return card;
  }

  function dedupeImageFiles(files) {
    var seen = {};
    return files.filter(function (file) {
      var key = file.toLowerCase();
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    });
  }

  function extractImageFileNamesFromHtml(htmlText) {
    var files = [];
    var doc = new DOMParser().parseFromString(htmlText, 'text/html');

    doc.querySelectorAll('a[href]').forEach(function (link) {
      var href = decodeURIComponent(link.getAttribute('href') || '');
      var fileName = href.split('/').pop() || '';
      if (/\.(png|jpe?g|webp)$/i.test(fileName)) {
        files.push(fileName);
      }
    });

    if (files.length === 0) {
      var matches = htmlText.match(/[^"'\s<>]+\.(?:png|jpe?g|webp)/gi) || [];
      matches.forEach(function (match) {
        files.push(decodeURIComponent(match.split('/').pop()));
      });
    }

    return dedupeImageFiles(files);
  }

  async function getCertificateImageFiles() {
    var files = [];
    var pathsToTry = ['./certificate/', './certificate'];

    for (var i = 0; i < pathsToTry.length; i++) {
      try {
        var response = await fetch(pathsToTry[i]);
        if (!response.ok) continue;
        var html = await response.text();
        files = extractImageFileNamesFromHtml(html);
        if (files.length > 0) break;
      } catch (error) {
        files = [];
      }
    }

    return dedupeImageFiles(files).filter(function (file) {
      return /\.(png|jpe?g|webp)$/i.test(file);
    });
  }

  function openMediaModal(imageSrc, imageTitle) {
    if (!mediaModal || !mediaModalBody) return;

    mediaModalBody.innerHTML = '';

    var image = document.createElement('img');
    image.className = 'media-modal__image';
    image.src = imageSrc;
    image.alt = imageTitle || 'Certificate image';
    image.loading = 'lazy';
    mediaModalBody.appendChild(image);

    mediaModal.classList.add('media-modal--open');
    mediaModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMediaModal() {
    if (!mediaModal || !mediaModalBody) return;
    mediaModal.classList.remove('media-modal--open');
    mediaModal.setAttribute('aria-hidden', 'true');
    mediaModalBody.innerHTML = '';
    document.body.style.overflow = '';
  }

  async function setupCertificateLinks() {
    var certGrid = document.querySelector('.certifications__grid');
    if (!certGrid) {
      setupRevealAnimations();
      return;
    }

    var existingCards = Array.prototype.slice.call(
      certGrid.querySelectorAll('.certifications__card')
    );

    var imageFiles = await getCertificateImageFiles();

    var fileMap = {};
    imageFiles.forEach(function (file) {
      var key = normalizeCertificateName(toReadableTitle(file));
      if (key && !fileMap[key]) {
        fileMap[key] = file;
      }
    });

    var usedFiles = {};

    existingCards.forEach(function (card) {
      var titleEl = card.querySelector('.certifications__card-title');
      var button = card.querySelector('.certifications__view-btn');
      if (!titleEl || !button) return;

      var title = titleEl.textContent.trim();
      var existingHref = (button.getAttribute('href') || '').trim();

      if (existingHref && existingHref !== './certificate/' && existingHref !== './certificate') {
        button.setAttribute('data-cert-src', existingHref);
        button.setAttribute('data-cert-title', title || 'Certificate');
        button.classList.remove('certifications__view-btn--disabled');
        button.removeAttribute('aria-disabled');
        button.removeAttribute('tabindex');
        return;
      }

      var titleKey = normalizeCertificateName(title);
      var matchedFile = fileMap[titleKey] || null;

      if (!matchedFile) {
        Object.keys(fileMap).some(function (fileKey) {
          if (usedFiles[fileMap[fileKey]]) return false;
          if (titleKey && (fileKey.indexOf(titleKey) !== -1 || titleKey.indexOf(fileKey) !== -1)) {
            matchedFile = fileMap[fileKey];
            return true;
          }
          return false;
        });
      }

      if (matchedFile) {
        usedFiles[matchedFile] = true;
        setCertificateButton(button, matchedFile, title);
      } else {
        disableCertificateButton(button);
      }
    });

    var existingTitleMap = {};
    certGrid.querySelectorAll('.certifications__card-title').forEach(function (titleNode) {
      existingTitleMap[normalizeCertificateName(titleNode.textContent)] = true;
    });

    imageFiles.forEach(function (file) {
      if (usedFiles[file]) return;
      var title = toReadableTitle(file);
      var normalizedTitle = normalizeCertificateName(title);
      if (existingTitleMap[normalizedTitle]) return;
      certGrid.appendChild(createCertificateCard(title, file));
      existingTitleMap[normalizedTitle] = true;
    });

    setupRevealAnimations();
  }

  setupCertificateLinks();

  if (mediaModalClose) {
    mediaModalClose.addEventListener('click', closeMediaModal);
  }

  if (mediaModal) {
    mediaModal.addEventListener('click', function (event) {
      if (event.target.hasAttribute('data-close-modal')) {
        closeMediaModal();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mediaModal && mediaModal.classList.contains('media-modal--open')) {
      closeMediaModal();
    }
  });

  if (!document.querySelector('.certifications__grid')) {
    setupRevealAnimations();
  }

  /* ------------------------------------------
     SKILL BARS — Animate Fill on Scroll
  ------------------------------------------ */
  function setupSkillBarAnimation() {
    var skillBars = document.querySelectorAll('.skills__bar-fill');
    if (skillBars.length === 0) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bars = entry.target.querySelectorAll('.skills__bar-fill');
          bars.forEach(function (bar, index) {
            setTimeout(function () {
              bar.style.width = bar.getAttribute('data-width') + '%';
            }, index * 150);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    // Observe the parent card that contains the bars
    var barContainer = document.querySelector('.skills__bars');
    if (barContainer) {
      observer.observe(barContainer.closest('.skills__domain-card'));
    }
  }
  setupSkillBarAnimation();

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
      if (card.querySelector('.skills__tags')) {
        observer.observe(card);
      }
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
      var startTime = null;

      function updateCount(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / duration, 1);
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

  var aboutStats = document.querySelector('.about__stats');
  if (aboutStats) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateStats();
        }
      });
    }, { threshold: 0.5 });
    statsObserver.observe(aboutStats);
  }

  /* ------------------------------------------
     PROJECT FILTER
  ------------------------------------------ */
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
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
     CONTACT FORM — Validation & Submit (Formspree)
  ------------------------------------------ */
  contactForm.addEventListener('submit', function (e) {
    var name = document.getElementById('contactName').value.trim();
    var subject = document.getElementById('contactSubject').value.trim();
    var message = document.getElementById('contactMessage').value.trim();

    if (!name || !subject || !message) {
      e.preventDefault();
      showToast('Please fill in all fields.', true);
      return;
    }

    // Formspree will handle submission
    showToast('Message sent successfully', false);
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
