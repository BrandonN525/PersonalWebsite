async function getCounter() {
    const response = await fetch('https://2g03j5b0b1.execute-api.us-east-1.amazonaws.com/Prod/counter', {
      method: 'GET'
    });
    let data = await response.json();
    document.getElementById("visits").innerHTML = "Visits: " + data['counter'];
    console.log(data);
    return data;
}

getCounter();
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

async function updateCounter() {
  const data = await getCounter();
  let count = 0;
  const target = data.counter;
  const interval = setInterval(() => {
    document.getElementById("visits").innerText = `Visits: ${count}`;
    if (count++ >= target) clearInterval(interval);
  }, 50);
}
updateCounter();
