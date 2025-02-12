
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  updateCounter();
});

// Smooth scrolling for navigation links
function setupNavigation() {
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = document.querySelector(this.getAttribute('href'));
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Fetch and animate the visit counter with error handling
async function updateCounter() {
  try {
    const response = await fetch('https://2g03j5b0b1.execute-api.us-east-1.amazonaws.com/Prod/counter', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    animateCounter(data.counter);
  } catch (error) {
    console.error('Failed to fetch the visit counter:', error);
  }
}

// Animate the counter from 0 to the target number
function animateCounter(target) {
  let count = 0;
  const interval = setInterval(() => {
    document.getElementById('visits').innerText = `Visits: ${count}`;
    if (count++ >= target) clearInterval(interval);
  }, 50);
}
