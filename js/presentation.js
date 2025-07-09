// Clean, stable presentation initialization
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Initializing presentation...");

  // Initialize Reveal.js with safe configuration
  try {
    Reveal.initialize({
      hash: true,
      transition: "slide",
      transitionSpeed: "default",
      backgroundTransition: "fade",
      controls: true,
      progress: true,
      center: false,
      touch: true,
      loop: false,
      rtl: false,
      navigationMode: "default",
      plugins: [RevealNotes, RevealHighlight],
      // Safe scrolling configuration
      disableLayout: false,
      embedded: false,
      autoSlide: 0,
      autoSlideStoppable: true,
      mouseWheel: false,
      overview: true,
      focusBodyOnPageVisibilityChange: true,
      hideInactiveCursor: true,
      hideCursorTime: 5000,
    });

    console.log("✅ Reveal.js initialized successfully");
  } catch (error) {
    console.error("❌ Error initializing Reveal.js:", error);
  }

  // Initialize syntax highlighting safely
  try {
    if (typeof Prism !== "undefined") {
      Prism.highlightAll();
      console.log("✅ Syntax highlighting initialized");
    }
  } catch (error) {
    console.error("❌ Error initializing syntax highlighting:", error);
  }

  // Initialize demo environment safely
  try {
    initializeDemoEnvironment();
    console.log("✅ Demo environment initialized");
  } catch (error) {
    console.error("❌ Error initializing demo environment:", error);
  }

  // Initialize scroll functionality safely
  try {
    initializeScrolling();
    console.log("✅ Scrolling initialized");
  } catch (error) {
    console.error("❌ Error initializing scrolling:", error);
  }
});

// Safe demo environment initialization
function initializeDemoEnvironment() {
  // Initialize global variables safely
  window.demoTimers = window.demoTimers || [];
  window.demoIntervals = window.demoIntervals || [];
  window.demoWorkers = window.demoWorkers || [];

  // Clear existing timers safely
  if (window.demoTimers && window.demoTimers.length > 0) {
    window.demoTimers.forEach((timer) => {
      try {
        clearTimeout(timer);
      } catch (e) {
        console.warn("Error clearing timer:", e);
      }
    });
    window.demoTimers = [];
  }

  if (window.demoIntervals && window.demoIntervals.length > 0) {
    window.demoIntervals.forEach((interval) => {
      try {
        clearInterval(interval);
      } catch (e) {
        console.warn("Error clearing interval:", e);
      }
    });
    window.demoIntervals = [];
  }

  // Safe output logging function
  window.logToOutput = function (outputId, message, type = "info") {
    try {
      const outputElement = document.getElementById(outputId);
      if (!outputElement) {
        console.warn(`Output element not found: ${outputId}`);
        return;
      }

      const logEntry = document.createElement("div");
      logEntry.className = `log-entry ${type}`;
      logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;

      outputElement.appendChild(logEntry);
      outputElement.scrollTop = outputElement.scrollHeight;
      outputElement.style.display = "block";
    } catch (error) {
      console.error("Error logging to output:", error);
    }
  };

  // Safe output clearing function
  window.clearOutput = function (outputId) {
    try {
      const outputElement = document.getElementById(outputId);
      if (outputElement) {
        outputElement.innerHTML = "";
        outputElement.style.display = "none";
      }
    } catch (error) {
      console.error("Error clearing output:", error);
    }
  };

  // Safe progress update function
  window.updateProgress = function (progressId, percentage) {
    try {
      const progressElement = document.getElementById(progressId);
      if (progressElement) {
        progressElement.style.width =
          Math.max(0, Math.min(100, percentage)) + "%";
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  // Safe code execution function
  window.executeCode = function (code, outputId) {
    try {
      const originalConsoleLog = console.log;
      const originalConsoleError = console.error;
      const logs = [];

      // Capture console output
      console.log = function (...args) {
        logs.push({ type: "log", args });
        originalConsoleLog.apply(console, args);
      };

      console.error = function (...args) {
        logs.push({ type: "error", args });
        originalConsoleError.apply(console, args);
      };

      try {
        // Execute the code in a safe way
        new Function(code)();
      } catch (execError) {
        window.logToOutput(outputId, `Error: ${execError.message}`, "error");
      }

      // Display captured logs
      logs.forEach((log) => {
        const message = log.args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(" ");

        window.logToOutput(
          outputId,
          message,
          log.type === "error" ? "error" : "success"
        );
      });

      // Restore original console methods
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
    } catch (error) {
      console.error("Error executing code:", error);
      window.logToOutput(
        outputId,
        `Execution error: ${error.message}`,
        "error"
      );
    }
  };
}

// Safe scrolling initialization
function initializeScrolling() {
  // Safe scroll to bottom function
  window.scrollToBottom = function () {
    try {
      const currentSlide = Reveal.getCurrentSlide();
      if (currentSlide) {
        currentSlide.scrollTo({
          top: currentSlide.scrollHeight,
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.error("Error scrolling to bottom:", error);
    }
  };

  // Safe scroll to top function
  window.scrollToTop = function () {
    try {
      const currentSlide = Reveal.getCurrentSlide();
      if (currentSlide) {
        currentSlide.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.error("Error scrolling to top:", error);
    }
  };

  // Safe element scrolling
  window.scrollToElement = function (elementId) {
    try {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    } catch (error) {
      console.error("Error scrolling to element:", error);
    }
  };

  // Initialize scroll indicator safely
  setTimeout(() => {
    try {
      initializeScrollIndicator();
    } catch (error) {
      console.error("Error initializing scroll indicator:", error);
    }
  }, 1000);
}

// Safe scroll indicator
function initializeScrollIndicator() {
  const scrollIndicator = document.getElementById("scrollIndicator");
  if (!scrollIndicator) {
    console.warn("Scroll indicator element not found");
    return;
  }

  function checkScrollability() {
    try {
      const currentSlide = Reveal.getCurrentSlide();
      if (currentSlide) {
        const isScrollable =
          currentSlide.scrollHeight > currentSlide.clientHeight;
        const isAtBottom =
          currentSlide.scrollTop + currentSlide.clientHeight >=
          currentSlide.scrollHeight - 10;

        if (isScrollable && !isAtBottom) {
          scrollIndicator.classList.add("show");
        } else {
          scrollIndicator.classList.remove("show");
        }
      }
    } catch (error) {
      console.error("Error checking scrollability:", error);
    }
  }

  // Safe event listeners
  try {
    if (typeof Reveal !== "undefined" && Reveal.on) {
      Reveal.on("slidechanged", checkScrollability);
    }
  } catch (error) {
    console.error("Error setting up slide change listener:", error);
  }

  try {
    document.addEventListener("scroll", checkScrollability, true);
  } catch (error) {
    console.error("Error setting up scroll listener:", error);
  }

  // Initial check
  setTimeout(checkScrollability, 500);
}

// Safe cleanup
window.addEventListener("beforeunload", function () {
  try {
    // Clean up timers
    if (window.demoTimers) {
      window.demoTimers.forEach((timer) => {
        try {
          clearTimeout(timer);
        } catch (e) {
          console.warn("Error clearing timer:", e);
        }
      });
    }

    if (window.demoIntervals) {
      window.demoIntervals.forEach((interval) => {
        try {
          clearInterval(interval);
        } catch (e) {
          console.warn("Error clearing interval:", e);
        }
      });
    }

    // Clean up workers
    if (window.demoWorkers) {
      window.demoWorkers.forEach((worker) => {
        try {
          if (worker && worker.terminate) {
            worker.terminate();
          }
        } catch (e) {
          console.warn("Error terminating worker:", e);
        }
      });
    }
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
});

// Safe utility functions
window.delay = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
};

window.randomDelay = function (min = 100, max = 1000) {
  const delay = Math.random() * (max - min) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

window.createPromise = function (value, delay = 1000, shouldReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error(`Promise rejected with value: ${value}`));
      } else {
        resolve(value);
      }
    }, Math.max(0, delay));
  });
};

console.log("📝 Presentation script loaded successfully");
