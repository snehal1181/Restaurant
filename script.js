document.addEventListener('DOMContentLoaded', () => {

  // --- PAGE LOADER ---
  const loader = document.getElementById('page-loader');
  if (loader) {
    // Hide loader slightly after fully loaded for effect
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => loader.remove(), 600);
      }, 1000);
    });
  }

  // --- NAVBAR SCROLL EFFECT ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- MOBILE NAVIGATION TOGGLE ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  // --- COUNTER SETUP ---
  const statItems = document.querySelectorAll('.stat-item h3');
  statItems.forEach(el => {
    const text = el.innerText;
    el.setAttribute('data-target', parseInt(text.replace(/[^0-9]/g, '')));
    el.setAttribute('data-suffix', text.replace(/[0-9]/g, ''));
    el.innerText = '0' + el.getAttribute('data-suffix');
  });

  // --- SCROLL REVEAL ANIMATION (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        if (entry.target.classList.contains('stat-item')) {
          const counterEl = entry.target.querySelector('h3');
          if (counterEl) {
            setTimeout(() => {
              let startTimestamp = null;
              const duration = 2000;
              const target = parseInt(counterEl.getAttribute('data-target'));
              const suffix = counterEl.getAttribute('data-suffix');
              
              const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const easeProgress = 1 - Math.pow(1 - Math.min(progress, 1), 3);
                counterEl.innerText = Math.floor(easeProgress * target) + suffix;
                if (progress < 1) {
                  window.requestAnimationFrame(step);
                } else {
                  counterEl.innerText = target + suffix;
                }
              };
              window.requestAnimationFrame(step);
            }, 300);
          }
        }

        observer.unobserve(entry.target); // only reveal once
      }
    });
  }, {
    root: null,
    threshold: 0.15, // trigger when 15% visible
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- MENU PAGE TABS ---
  const menuTabs = document.querySelectorAll('.menu-tab-btn');
  const menuPanels = document.querySelectorAll('.menu-panel');

  if (menuTabs.length > 0 && menuPanels.length > 0) {
    menuTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs & panels
        menuTabs.forEach(t => t.classList.remove('active'));
        menuPanels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-category');
        document.getElementById(targetId).classList.add('active');
      });
    });
  }

  // --- GALLERY FILTER & LIGHTBOX ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    // Filtering logic
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300); // match transition duration
          }
        });
      });
    });

    // Lightbox Open
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const fullSrc = item.getAttribute('data-src');
        if(fullSrc) {
          lightboxImg.src = fullSrc;
          lightbox.classList.add('open');
        }
      });
    });

    // Lightbox Close
    if (lightboxClose && lightbox) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('open');
      });
      // Close on background click
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.classList.remove('open');
        }
      });
    }
  }

  // --- TESTIMONIALS CAROUSEL ---
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');

  if (slides.length > 0 && dots.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));

      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });

    // Auto Advance Testimonials
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 6000);
  }

  // --- CONTACT FORM SUBMISSION ---
  const form = document.getElementById('reservation-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('button[type="submit"] span');
      const originalText = btn.innerText;
      
      btn.innerText = 'Processing...';
      form.style.pointerEvents = 'none';
      form.style.opacity = '0.7';

      // Simulate API Call
      setTimeout(() => {
        btn.innerText = originalText;
        form.style.pointerEvents = 'auto';
        form.style.opacity = '1';
        
        successMsg.style.display = 'block';
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

});
