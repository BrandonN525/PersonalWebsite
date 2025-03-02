document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  updateCounter();
});

// Smooth scrolling for navigation links
function setupNavigation() {
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = document.querySelector(this.getAttribute("href"));
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.open(href, "_blank"); // Redirect to new pages
      }
    });
  });
}

// Fetch the visit counter with error handling
async function updateCounter() {
  try {
    const visitsElement = document.getElementById("visits");
    if (!visitsElement) {
      console.error("Visit counter element not found in the DOM.");
      return;
    }

    const response = await fetch(
      "https://2g03j5b0b1.execute-api.us-east-1.amazonaws.com/Prod/counter",
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    animateCounter(data.counter);
  } catch (error) {
    console.error("Failed to fetch the visit counter:", error);
  }
}

// Animate the counter from 0 to the target number
function animateCounter(target, duration = 2000) {
  const startTime = performance.now();
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentCount = Math.floor(progress * target);
    document.getElementById("visits").innerText = `Visits: ${currentCount}`;
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  requestAnimationFrame(updateCounter);
}
