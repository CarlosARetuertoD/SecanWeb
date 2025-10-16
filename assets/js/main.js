/**
* Template Name: LeadPage
* Template URL: https://bootstrapmade.com/leadpage-bootstrap-landing-page-template/
* Updated: Aug 12 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initialize carousel auto-play with enhanced features
   */
  function initCarousel() {
    const carousel = document.getElementById('carousel-example-generic');
    if (carousel) {
      // Precargar imágenes para transiciones más suaves
      const images = [
        'assets/img/backgrounds/south_africa.jpg',
        'assets/img/backgrounds/south_africa_1.jpg',
        'assets/img/backgrounds/south_africa_2.jpg'
      ];
      
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
      
      // Mejorar transiciones de fondo
      carousel.addEventListener('slide.bs.carousel', function() {
        const activeSlide = carousel.querySelector('.carousel-item.active');
        const nextSlide = carousel.querySelector('.carousel-item-next');
        
        if (activeSlide && nextSlide) {
          // Aplicar efecto de crossfade
          activeSlide.style.opacity = '0';
          nextSlide.style.opacity = '1';
          
          setTimeout(() => {
            activeSlide.style.opacity = '';
            nextSlide.style.opacity = '';
          }, 800);
        }
      });
      
      // Reiniciar animaciones cuando cambie el slide
      carousel.addEventListener('slide.bs.carousel', function() {
        // Pequeño delay para asegurar que el slide esté activo
        setTimeout(() => {
          const activeSlide = carousel.querySelector('.carousel-item.active');
          if (activeSlide) {
            const animatedElements = activeSlide.querySelectorAll('.carousel-caption h2, .carousel-caption h3, .carousel-caption p');
            animatedElements.forEach(element => {
              element.style.animation = 'none';
              element.offsetHeight; // Trigger reflow
              element.style.animation = null;
            });
          }
        }, 50);
      });
    }
  }
  window.addEventListener('load', initCarousel);

  /**
   * Initialize WOW.js animations
   */
  function initWow() {
    new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true
    }).init();
  }
  window.addEventListener('load', initWow);

  /**
   * Reinitialize WOW.js on carousel slide change
   */
  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel-example-generic');
    if (carousel) {
      carousel.addEventListener('slide.bs.carousel', function() {
        setTimeout(function() {
          new WOW().init();
        }, 100);
      });
    }
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });
  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
  //Fetch del footer
  document.addEventListener("DOMContentLoaded", () => {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
      fetch("/partials/footer.html")
        .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
        .then((html) => (footerPlaceholder.outerHTML = html))
        .catch((err) => console.error("Error cargando footer:", err));
    }
  });
  /**
   * Language Switcher
   */
  let currentLanguage = 'es'; // Default language
  
  window.changeLanguage = function(lang) {
    // Activar bandera para prevenir scroll automático
    isChangingLanguage = true;
    
    // Guardar la posición actual del scroll de manera más robusta
    savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    currentLanguage = lang;
    
    // Update all elements with data-translate attribute (except typed elements)
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
      // Skip typed elements to preserve their functionality
      if (element.classList.contains('typed')) {
        return;
      }
      
      const key = element.getAttribute('data-translate');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
    
    // Update language button
    const currentLangSpan = document.querySelector('.current-lang');
    if (currentLangSpan) {
      currentLangSpan.textContent = lang.toUpperCase();
    }
    
    // Update active dropdown item
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-lang') === lang) {
        item.classList.add('active');
      }
    });
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
    
    // Restaurar la posición del scroll de manera más robusta
    requestAnimationFrame(() => {
      window.scrollTo({
        top: savedScrollPosition,
        behavior: 'instant'
      });
    });
    
    // Backup: restaurar después de un delay más largo
    setTimeout(() => {
      window.scrollTo({
        top: savedScrollPosition,
        behavior: 'instant'
      });
      // Desactivar bandera después de restaurar
      isChangingLanguage = false;
    }, 300);
  }
  
  function initLanguage() {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && translations[savedLang]) {
      changeLanguage(savedLang);
    }
  }
  
  // Prevenir scroll automático al cambiar idioma
  let isChangingLanguage = false;
  let savedScrollPosition = 0;
  
  // Interceptar cualquier scroll automático durante el cambio de idioma
  window.addEventListener('scroll', function() {
    if (isChangingLanguage) {
      window.scrollTo(0, savedScrollPosition);
      return false;
    }
  });
  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
    
    // Initialize language switcher
    initLanguage();
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
