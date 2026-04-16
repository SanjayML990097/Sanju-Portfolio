(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var resumeLink = document.getElementById("resume-link");
  if (resumeLink) {
    resumeLink.addEventListener("click", function (e) {
      if (resumeLink.getAttribute("href") === "#") {
        e.preventDefault();
      }
    });
  }

  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      var submitBtn = contactForm.querySelector('.contact-form__submit');
      var originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        var formData = new FormData(contactForm);
        var response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success - show message and reset form
          submitBtn.textContent = 'Message Sent!';
          submitBtn.style.background = '#10B981'; // Green color for success
          contactForm.reset();

          // Reset button after 3 seconds
          setTimeout(function() {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 3000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Error:', error);
        submitBtn.textContent = 'Error - Try Again';
        submitBtn.style.background = '#EF4444'; // Red color for error

        // Reset button after 3 seconds
        setTimeout(function() {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }

  document.querySelectorAll(".cert-card__btn[href='#']").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });

  var certFilterBtns = document.querySelectorAll(".cert-filter__btn");
  var certCards = document.querySelectorAll(".cert-card[data-category]");
  if (certFilterBtns.length && certCards.length) {
    certFilterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-filter");
        certFilterBtns.forEach(function (item) {
          item.classList.remove("is-active");
        });
        btn.classList.add("is-active");

        certCards.forEach(function (card) {
          var category = card.getAttribute("data-category");
          var show = target === "all" || category === target;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  var progressFills = document.querySelectorAll(".skill-progress__fill[data-progress]");
  if (progressFills.length && "IntersectionObserver" in window) {
    var progressObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var val = Number(el.getAttribute("data-progress")) || 0;
          el.style.width = Math.max(0, Math.min(100, val)) + "%";
          progressObserver.unobserve(el);
        });
      },
      { root: null, threshold: 0.25 }
    );
    progressFills.forEach(function (bar) {
      progressObserver.observe(bar);
    });
  } else {
    progressFills.forEach(function (bar) {
      var val = Number(bar.getAttribute("data-progress")) || 0;
      bar.style.width = Math.max(0, Math.min(100, val)) + "%";
    });
  }

  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  function setNavOpen(open) {
    if (!navToggle || !nav) return;
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      setNavOpen(!expanded);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        setNavOpen(false);
      }
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }

  // Hide loader
  var loader = document.getElementById('loader');
  if (loader) {
    setTimeout(function() {
      loader.classList.add('loader--hidden');
    }, 500);
  }

  // Navbar active link on scroll
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav a');

  function setActiveLink() {
    var scrollY = window.pageYOffset;

    sections.forEach(function(section) {
      var sectionTop = section.offsetTop - 100;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('is-active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // Initial call

  // Header scroll effect
  var header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });
})();
