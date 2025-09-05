document.addEventListener("DOMContentLoaded", function () {
  // Get all tab elements
  const tabButtons = document.querySelectorAll(".aktion-tab-button");
  const tabPanes = document.querySelectorAll(".aktion-tab-pane");
  let currentTabIndex = 0;
  let autoRotateInterval;

  // Function to show a specific tab
  function showTab(index) {
    // Deactivate all tabs
    tabButtons.forEach((button) => {
      button.classList.remove("active");
    });

    tabPanes.forEach((pane) => {
      pane.classList.remove("active");
    });

    // Activate the selected tab
    tabButtons[index].classList.add("active");
    const targetId = tabButtons[index].getAttribute("data-aktion-target");
    const targetPane = document.getElementById(targetId);

    if (targetPane) {
      targetPane.classList.add("active");

      // Ensure video in active tab is playing
      const activeVideo = targetPane.querySelector("video");
      if (activeVideo) {
        activeVideo.currentTime = 0;
        activeVideo.play().catch((e) => console.error("Video play error:", e));
      }
    }

    // Stop videos in inactive tabs
    tabPanes.forEach((pane) => {
      if (!pane.classList.contains("active")) {
        const video = pane.querySelector("video");
        if (video) {
          video.pause();
        }
      }
    });

    currentTabIndex = index;
  }

  // Add click event listeners to tabs
  tabButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      showTab(index);

      // Reset the auto-rotation timer
      clearInterval(autoRotateInterval);
      startAutoRotation();
    });
  });

  // Auto-rotate tabs every 10 seconds
  function startAutoRotation() {
    autoRotateInterval = setInterval(() => {
      currentTabIndex = (currentTabIndex + 1) % tabButtons.length;
      showTab(currentTabIndex);
    }, 10000);
  }

  // Initial setup - activate first tab and start rotation
  showTab(0);
  startAutoRotation();
});
