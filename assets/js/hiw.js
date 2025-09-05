/**
 * AktionAI Feature Tabs - Enhanced Implementation
 * Creates isolated namespace with unique identifiers to prevent conflicts
 */
(function () {
  // Create a unique namespace for our functionality
  window.AktionAI_FeatureTabs = window.AktionAI_FeatureTabs || {};

  // Initialize function with retry mechanism
  window.AktionAI_FeatureTabs.initialize = function () {
    // Only initialize once
    if (window.AktionAI_FeatureTabs.initialized) return;

    // Check if DOM is ready and elements exist
    const tabButtons = document.querySelectorAll(".bxl-tab-button");
    const contentPanels = document.querySelectorAll(".bxl-content-panel");

    if (tabButtons.length === 0 || contentPanels.length === 0) {
      // Elements not found yet, retry after a short delay
      setTimeout(window.AktionAI_FeatureTabs.initialize, 100);
      return;
    }

    // Mark as initialized to prevent duplicate event listeners
    window.AktionAI_FeatureTabs.initialized = true;

    // Handle tab click with event delegation for better performance
    const tabList = document.querySelector(".bxl-tab-list");
    if (tabList) {
      tabList.addEventListener("click", function (event) {
        // Find closest button if clicked on child element
        const button = event.target.closest(".bxl-tab-button");
        if (!button) return;

        // Get tab index
        const tabIndex = button.getAttribute("data-bxl-tab");
        if (!tabIndex) return;

        // Update active tab
        window.AktionAI_FeatureTabs.setActiveTab(tabIndex);
      });
    }

    // Public method to set active tab
    window.AktionAI_FeatureTabs.setActiveTab = function (tabIndex) {
      // Remove active class from all tabs
      tabButtons.forEach((btn) => {
        btn.classList.remove("bxl-tab-active");
      });

      // Add active class to selected tab
      const activeButton = document.querySelector(
        `.bxl-tab-button[data-bxl-tab="${tabIndex}"]`
      );
      if (activeButton) {
        activeButton.classList.add("bxl-tab-active");
      }

      // Hide all panels
      contentPanels.forEach((panel) => {
        panel.classList.remove("bxl-panel-active");
      });

      // Show the selected panel
      const activePanel = document.getElementById("bxlTab" + tabIndex);
      if (activePanel) {
        activePanel.classList.add("bxl-panel-active");
      }
    };

    // Ensure first tab is active (if none already is)
    if (!document.querySelector(".bxl-tab-button.bxl-tab-active")) {
      const firstTab = document.querySelector(".bxl-tab-button");
      if (firstTab) {
        const firstTabIndex = firstTab.getAttribute("data-bxl-tab");
        if (firstTabIndex) {
          window.AktionAI_FeatureTabs.setActiveTab(firstTabIndex);
        }
      }
    }

    console.log("AktionAI Feature Tabs successfully initialized");
  };

  // Multiple initialization points to ensure the script runs
  // DOM content loaded event
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      window.AktionAI_FeatureTabs.initialize
    );
  } else {
    // DOM already loaded, initialize immediately
    window.AktionAI_FeatureTabs.initialize();
  }

  // Backup initialization after window load (for slow-loading resources)
  window.addEventListener("load", window.AktionAI_FeatureTabs.initialize);

  // Start initial attempt
  window.AktionAI_FeatureTabs.initialize();
})();
