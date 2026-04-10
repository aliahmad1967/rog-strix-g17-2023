/**
 * ROG STRIX G17 2023 - MAIN JAVASCRIPT
 */

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavigation();
  initScrollProgress();
  initBackToTop();
  initSmoothScroll();
  initCounters();
  initTestimonialSlider();
  initDesignGallery();
  initCoolingFeatures();
  initRGBController();
  initImageLoading();
});

// Loading Screen
function initLoader() {
  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
      document.body.style.overflow = "auto";
    }, 2000);
  });
}

// Navigation
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile toggle
  navToggle?.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Close menu on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
}

// Scroll Progress Bar
function initScrollProgress() {
  const progressBar = document.getElementById("progressBar");

  window.addEventListener("scroll", () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

// Back to Top
function initBackToTop() {
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offset = 80;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });
}

// Counter Animation
function initCounters() {
  const counters = document.querySelectorAll(".hz-number");

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target);
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 60;
  const duration = 2000;
  const stepTime = duration / 60;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

// Testimonial Slider
function initTestimonialSlider() {
  const slider = document.getElementById("testimonialsSlider");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");
  const dots = document.querySelectorAll(".dot");

  if (!slider) return;

  let currentIndex = 0;
  const cardWidth = 420; // card width + gap

  function updateSlider() {
    slider.scrollTo({
      left: currentIndex * cardWidth,
      behavior: "smooth",
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  prevBtn?.addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateSlider();
  });

  nextBtn?.addEventListener("click", () => {
    const maxIndex = slider.children.length - 1;
    currentIndex = Math.min(maxIndex, currentIndex + 1);
    updateSlider();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
  });

  // Auto-scroll
  setInterval(() => {
    const maxIndex = slider.children.length - 1;
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  }, 5000);
}

// Design Gallery
function initDesignGallery() {
  const mainImage = document.getElementById("designMainImage");
  const thumbs = document.querySelectorAll(".thumb");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const newImage = thumb.dataset.image;
      mainImage.style.opacity = "0";

      setTimeout(() => {
        mainImage.src = `images/design/${newImage}`;
        mainImage.style.opacity = "1";
      }, 300);

      thumbs.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
}

// Cooling Features
function initCoolingFeatures() {
  const features = document.querySelectorAll(".cooling-feature");
  const image = document.getElementById("coolingImage");
  const imageMap = {
    "liquid-metal": "images/cooling/liquid-metal.png",
    "arc-flow": "images/cooling/arc-flow.png",
    fins: "images/cooling/fins.png",
    "3d-flow": "images/cooling/3d-flow.png",
  };

  features.forEach((feature) => {
    feature.addEventListener("click", () => {
      features.forEach((f) => f.classList.remove("active"));
      feature.classList.add("active");

      const imageType = feature.dataset.image;
      const newSrc = imageMap[imageType] || `images/cooling/${imageType}.png`;
      if (image && imageType) {
        if (image.src.includes(newSrc)) return;
        image.style.opacity = "0.5";
        setTimeout(() => {
          image.src = newSrc;
          image.style.opacity = "1";
        }, 300);
      }
    });
  });

  // Hotspot tooltips
  document.querySelectorAll(".hotspot").forEach((hotspot) => {
    hotspot.addEventListener("click", () => {
      const info = hotspot.dataset.info;
      showToast(info);
    });
  });
}

// RGB Controller
function initRGBController() {
  const colorBtns = document.querySelectorAll(".color-btn");
  const effectBtns = document.querySelectorAll(".effect-btn");
  const keyboard = document.querySelector(".keyboard-image");

  colorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      colorBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const color = btn.dataset.color;
      if (keyboard) {
        keyboard.style.filter = `drop-shadow(0 20px 40px ${color}40)`;
      }
    });
  });

  effectBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      effectBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

// Image Loading
function initImageLoading() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
    }
  });
}

// Toast Notification
function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.9);
        color: #fff;
        padding: 1rem 2rem;
        border-radius: 12px;
        border: 1px solid #ff003c;
        z-index: 10000;
        animation: fadeInUp 0.3s;
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "fadeOut 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Temperature Simulation
function simulateTemperatures() {
  const cpuTemp = document.getElementById("cpuTemp");
  const gpuTemp = document.getElementById("gpuTemp");

  if (!cpuTemp || !gpuTemp) return;

  setInterval(() => {
    const cpu = 40 + Math.floor(Math.random() * 15);
    const gpu = 38 + Math.floor(Math.random() * 12);

    cpuTemp.textContent = cpu + "°C";
    gpuTemp.textContent = gpu + "°C";

    // Color coding
    cpuTemp.style.color = cpu > 50 ? "#ff6b00" : "#76b900";
    gpuTemp.style.color = gpu > 48 ? "#ff6b00" : "#76b900";
  }, 3000);
}

// Initialize temperature simulation
simulateTemperatures();
