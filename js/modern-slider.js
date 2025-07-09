// Modern Slider JavaScript
class ModernSlider {
  constructor() {
    this.currentSlide = this.getStoredSlide() || 1;
    this.totalSlides = this.calculateTotalSlides();
    this.init();
  }

  calculateTotalSlides() {
    // Dynamically count the number of slides
    const slides = document.querySelectorAll(".slide");
    return slides.length;
  }

  // Get stored slide from localStorage or URL hash
  getStoredSlide() {
    try {
      // First check URL hash
      const hash = window.location.hash;
      if (hash && hash.startsWith("#slide-")) {
        const slideNumber = parseInt(hash.replace("#slide-", ""), 10);
        if (slideNumber > 0) {
          return slideNumber;
        }
      }

      // Then check localStorage
      const stored = localStorage.getItem("presentation-current-slide");
      if (stored) {
        const slideNumber = parseInt(stored, 10);
        return slideNumber > 0 ? slideNumber : 1;
      }
    } catch (error) {
      console.warn("Error reading stored slide:", error);
    }
    return 1;
  }

  // Save current slide to localStorage and URL hash
  saveCurrentSlide() {
    try {
      localStorage.setItem(
        "presentation-current-slide",
        this.currentSlide.toString()
      );
      // Update URL hash without triggering page reload
      history.replaceState(null, null, `#slide-${this.currentSlide}`);
    } catch (error) {
      console.warn("Error saving current slide:", error);
    }
  }

  init() {
    // Set up slide counter
    this.updateSlideCounter();

    // Set up keyboard navigation
    this.setupKeyboardNavigation();

    // Set up touch/swipe support
    this.setupTouchNavigation();

    // Set up hash change handling for browser back/forward
    this.setupHashNavigation();

    // Set up scroll indicator
    this.setupScrollIndicator();

    // Initialize current slide (from storage or default to 1)
    this.showSlide(this.currentSlide);

    // Auto-highlight code blocks
    this.highlightCode();

    // Save initial slide
    this.saveCurrentSlide();
  }

  // Handle browser back/forward navigation
  setupHashNavigation() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#slide-")) {
        const slideNumber = parseInt(hash.replace("#slide-", ""), 10);
        if (
          slideNumber > 0 &&
          slideNumber <= this.totalSlides &&
          slideNumber !== this.currentSlide
        ) {
          this.showSlide(slideNumber);
        }
      }
    });
  }

  updateSlideCounter() {
    const currentSlideElement = document.getElementById("currentSlide");
    const totalSlidesElement = document.getElementById("totalSlides");

    if (currentSlideElement)
      currentSlideElement.textContent = this.currentSlide;
    if (totalSlidesElement) totalSlidesElement.textContent = this.totalSlides;

    // Update navigation buttons
    this.updateNavButtons();
  }

  updateNavButtons() {
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (prevBtn) {
      prevBtn.disabled = this.currentSlide === 1;
    }

    if (nextBtn) {
      nextBtn.disabled = this.currentSlide === this.totalSlides;
    }
  }

  showSlide(slideNumber) {
    const slides = document.querySelectorAll(".slide");

    // Hide all slides
    slides.forEach((slide, index) => {
      slide.classList.remove("active", "prev");

      if (index + 1 === slideNumber) {
        slide.classList.add("active");
        // Reset scroll position to top when showing a slide
        setTimeout(() => {
          slide.scrollTop = 0;
          this.checkScrollability(slide);
        }, 100);
      } else if (index + 1 < slideNumber) {
        slide.classList.add("prev");
      }
    });

    this.currentSlide = slideNumber;
    this.updateSlideCounter();
    this.saveCurrentSlide();

    // Trigger slide-specific initialization
    this.initSlideContent(slideNumber);
  }

  // Check if current slide is scrollable and show/hide indicator
  checkScrollability(slide = null) {
    const currentSlide = slide || document.querySelector(".slide.active");
    const scrollIndicator = document.getElementById("scrollIndicator");

    if (!currentSlide || !scrollIndicator) return;

    const isScrollable = currentSlide.scrollHeight > currentSlide.clientHeight;
    const isAtBottom =
      currentSlide.scrollTop + currentSlide.clientHeight >=
      currentSlide.scrollHeight - 10;

    if (isScrollable && !isAtBottom) {
      scrollIndicator.classList.add("show");
    } else {
      scrollIndicator.classList.remove("show");
    }
  }

  // Set up scroll listeners for the scroll indicator
  setupScrollIndicator() {
    const slides = document.querySelectorAll(".slide");

    slides.forEach((slide) => {
      slide.addEventListener("scroll", () => {
        if (slide.classList.contains("active")) {
          this.checkScrollability(slide);
        }
      });
    });

    // Check scrollability when window is resized
    window.addEventListener("resize", () => {
      setTimeout(() => this.checkScrollability(), 100);
    });
  }

  initSlideContent(slideNumber) {
    // Initialize any slide-specific content
    switch (slideNumber) {
      case 27: // Debouncing & Throttling
        if (typeof initPerformanceDemo === "function") {
          initPerformanceDemo();
        }
        break;
      case 30: // Playground (was 20, now 30)
        this.initPlayground();
        break;
      case 31: // Event Loop Visualizer (was 21, now 31)
        this.initVisualizer();
        break;
      default:
        break;
    }
  }

  initVisualizer() {
    // Initialize the event loop visualizer
    const visualCallStack = document.getElementById("visualCallStack");
    const visualTaskQueue = document.getElementById("visualTaskQueue");
    const visualMicrotaskQueue = document.getElementById(
      "visualMicrotaskQueue"
    );

    if (visualCallStack) visualCallStack.innerHTML = "";
    if (visualTaskQueue) visualTaskQueue.innerHTML = "";
    if (visualMicrotaskQueue) visualMicrotaskQueue.innerHTML = "";
  }

  initPlayground() {
    // Initialize the playground
    const codeEditor = document.getElementById("codeEditor");
    const playgroundOutput = document.getElementById("playgroundOutput");

    if (playgroundOutput) {
      playgroundOutput.innerHTML =
        '<div style="opacity: 0.6; font-style: italic;">Enter code above and click "Run Code" to see results</div>';
    }
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.showSlide(this.currentSlide + 1);
    }
  }

  previousSlide() {
    if (this.currentSlide > 1) {
      this.showSlide(this.currentSlide - 1);
    }
  }

  goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
      this.showSlide(slideNumber);
    }
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          this.nextSlide();
          break;
        case "ArrowLeft":
          e.preventDefault();
          this.previousSlide();
          break;
        case "ArrowDown":
          e.preventDefault();
          this.scrollCurrentSlide(200);
          break;
        case "ArrowUp":
          e.preventDefault();
          this.scrollCurrentSlide(-200);
          break;
        case "Home":
          e.preventDefault();
          this.goToSlide(1);
          break;
        case "End":
          e.preventDefault();
          this.goToSlide(this.totalSlides);
          break;
        case "PageDown":
          e.preventDefault();
          this.scrollCurrentSlide(400);
          break;
        case "PageUp":
          e.preventDefault();
          this.scrollCurrentSlide(-400);
          break;
      }
    });
  }

  // Smooth scroll within current slide
  scrollCurrentSlide(amount) {
    const currentSlide = document.querySelector(".slide.active");
    if (currentSlide) {
      currentSlide.scrollBy({
        top: amount,
        behavior: "smooth",
      });
    }
  }

  setupTouchNavigation() {
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left (next slide)
          this.nextSlide();
        } else {
          // Swipe right (previous slide)
          this.previousSlide();
        }
      }
    };

    this.handleSwipe = handleSwipe;
  }

  // Reset presentation to first slide and clear storage
  resetPresentation() {
    try {
      localStorage.removeItem("presentation-current-slide");
      history.replaceState(null, null, window.location.pathname);
      this.showSlide(1);
    } catch (error) {
      console.warn("Error resetting presentation:", error);
      this.showSlide(1);
    }
  }

  // Get current slide number (useful for external access)
  getCurrentSlide() {
    return this.currentSlide;
  }

  // Get total slides (useful for external access)
  getTotalSlides() {
    return this.totalSlides;
  }

  highlightCode() {
    // Highlight code blocks if Prism is available
    if (typeof Prism !== "undefined") {
      setTimeout(() => {
        Prism.highlightAll();
      }, 100);
    }
  }
}

// Global functions for external access
function nextSlide() {
  if (window.modernSlider) {
    window.modernSlider.nextSlide();
  }
}

function previousSlide() {
  if (window.modernSlider) {
    window.modernSlider.previousSlide();
  }
}

function goToSlide(slideNumber) {
  if (window.modernSlider) {
    window.modernSlider.goToSlide(slideNumber);
  }
}

function resetPresentation() {
  if (window.modernSlider) {
    window.modernSlider.resetPresentation();
  }
}

function getCurrentSlide() {
  return window.modernSlider ? window.modernSlider.getCurrentSlide() : 1;
}

function getTotalSlides() {
  return window.modernSlider ? window.modernSlider.getTotalSlides() : 0;
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.modernSlider = new ModernSlider();
  console.log("Modern Slider initialized successfully!");
  console.log(`📖 Presentation loaded with ${getTotalSlides()} slides`);
  console.log(`📍 Starting at slide ${getCurrentSlide()}`);
});

// Utility functions for smooth animations
function fadeIn(element, duration = 300) {
  element.style.opacity = "0";
  element.style.display = "block";

  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;

    const progress = (timestamp - start) / duration;
    element.style.opacity = Math.min(progress, 1);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function fadeOut(element, duration = 300) {
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;

    const progress = (timestamp - start) / duration;
    element.style.opacity = Math.max(1 - progress, 0);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.style.display = "none";
    }
  }

  requestAnimationFrame(animate);
}

// Add loading animation
function showLoading(element) {
  element.innerHTML =
    '<div style="text-align: center; opacity: 0.6;"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
}

// Clear output helper
function clearOutput(outputId) {
  const output = document.getElementById(outputId);
  if (output) {
    output.innerHTML = "";
  }
}

// Add message to output
function addToOutput(outputId, message, type = "info") {
  const output = document.getElementById(outputId);
  if (!output) return;

  const messageElement = document.createElement("div");
  messageElement.style.marginBottom = "5px";
  messageElement.style.padding = "5px 10px";
  messageElement.style.borderRadius = "5px";

  // Style based on type
  switch (type) {
    case "success":
      messageElement.style.backgroundColor = "rgba(76, 175, 80, 0.2)";
      messageElement.style.borderLeft = "3px solid #4caf50";
      break;
    case "error":
      messageElement.style.backgroundColor = "rgba(244, 67, 54, 0.2)";
      messageElement.style.borderLeft = "3px solid #f44336";
      break;
    case "warning":
      messageElement.style.backgroundColor = "rgba(255, 193, 7, 0.2)";
      messageElement.style.borderLeft = "3px solid #ffc107";
      break;
    default:
      messageElement.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      messageElement.style.borderLeft = "3px solid #2196f3";
  }

  messageElement.textContent = message;
  output.appendChild(messageElement);

  // Auto-scroll to bottom
  output.scrollTop = output.scrollHeight;
}

// Format time for display
function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
}

// Delay function for demos
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Safe async function executor
async function safeExecute(fn, errorMessage = "An error occurred") {
  try {
    await fn();
  } catch (error) {
    console.error(errorMessage, error);
    // Don't show error to user unless in development
    if (window.location.hostname === "localhost") {
      alert(`${errorMessage}: ${error.message}`);
    }
  }
}

// Performance monitoring
function measurePerformance(name, fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();

  console.log(`${name} took ${(end - start).toFixed(2)}ms`);
  return result;
}

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ModernSlider,
    nextSlide,
    previousSlide,
    goToSlide,
    fadeIn,
    fadeOut,
    showLoading,
    clearOutput,
    addToOutput,
    formatTime,
    delay,
    safeExecute,
    measurePerformance,
  };
}
