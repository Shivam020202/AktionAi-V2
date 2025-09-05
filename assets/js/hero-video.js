/**
 * AktionAI - Enhanced Video Controls and Tab Rotation
 * Namespaced implementation to prevent conflicts with other scripts
 */
(function () {
  // Create isolated namespaces
  window.AktionAI = window.AktionAI || {};
  window.AktionAI.TabRotation = window.AktionAI.TabRotation || {};
  window.AktionAI.VideoControls = window.AktionAI.VideoControls || {};

  // Tab Rotation Implementation
  window.AktionAI.TabRotation = {
    initialized: false,
    tabs: null,
    currentIndex: 0,
    intervalId: null,
    intervalTime: 10000, // 10 seconds

    initialize: function () {
      // Only initialize once
      if (this.initialized) return;

      // Get all tabs
      this.tabs = document.querySelectorAll(".tab-button .nav-link");

      // If no tabs found, retry after a short delay
      if (this.tabs.length === 0) {
        setTimeout(() => this.initialize(), 100);
        return;
      }

      this.initialized = true;

      // Find currently active tab (if any)
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].classList.contains("active")) {
          this.currentIndex = i;
          break;
        }
      }

      // Start rotation
      this.startRotation();

      console.log("AktionAI Tab Rotation successfully initialized");
    },

    startRotation: function () {
      // Clear any existing interval
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      // Set new interval
      this.intervalId = setInterval(() => this.switchTab(), this.intervalTime);
    },

    switchTab: function () {
      // Safety check
      if (!this.tabs || this.tabs.length === 0) return;

      try {
        // Remove active class from current tab
        this.tabs[this.currentIndex].classList.remove("active");

        const currentTarget = this.tabs[this.currentIndex].dataset.bsTarget;
        if (currentTarget) {
          const currentPane = document.querySelector(currentTarget);
          if (currentPane) {
            currentPane.classList.remove("show", "active");
          }
        }

        // Move to the next tab
        this.currentIndex = (this.currentIndex + 1) % this.tabs.length;

        // Add active class to the new tab
        this.tabs[this.currentIndex].classList.add("active");

        const newTarget = this.tabs[this.currentIndex].dataset.bsTarget;
        if (newTarget) {
          const newPane = document.querySelector(newTarget);
          if (newPane) {
            newPane.classList.add("show", "active");
          }
        }
      } catch (error) {
        console.error("Error switching tabs:", error);
      }
    },
  };

  // Video Controls Implementation
  window.AktionAI.VideoControls = {
    initialized: false,
    video: null,
    soundToggle: null,
    soundIcon: null,
    playbackRate: 1,

    initialize: function () {
      // Only initialize once
      if (this.initialized) return;

      // Get video elements
      this.video = document.getElementById("uniqueVideoPlayer");
      this.soundToggle = document.getElementById("uniqueSoundToggle");
      this.soundIcon = document.getElementById("uniqueSoundIcon");

      // If elements not found, retry after a short delay
      if (!this.video || !this.soundToggle || !this.soundIcon) {
        setTimeout(() => this.initialize(), 100);
        return;
      }

      this.initialized = true;

      // Set initial playback rate
      this.video.playbackRate = this.playbackRate;

      // Setup sound toggle
      this.soundToggle.addEventListener("click", () => this.toggleSound());

      // Update icon to match initial state
      this.updateSoundIcon();

      // Add error handling for video
      this.video.addEventListener("error", (e) => {
        console.error("Video error:", e);
      });

      console.log("AktionAI Video Controls successfully initialized");
    },

    toggleSound: function () {
      if (!this.video) return;

      this.video.muted = !this.video.muted;
      this.updateSoundIcon();
    },

    updateSoundIcon: function () {
      if (!this.video || !this.soundIcon) return;

      this.soundIcon.textContent = this.video.muted ? "🔇" : "🔊";
    },
  };

  // Initialize both features at various points to ensure they run
  function initializeAll() {
    window.AktionAI.TabRotation.initialize();
    window.AktionAI.VideoControls.initialize();
  }

  // DOM content loaded event
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAll);
  } else {
    // DOM already loaded, initialize immediately
    initializeAll();
  }

  // Backup initialization after window load
  window.addEventListener("load", initializeAll);

  // Start initial attempt
  initializeAll();
})();
