async function getCounter() {
    const response = await fetch('https://2g03j5b0b1.execute-api.us-east-1.amazonaws.com/Prod/counter', {
      method: 'GET'
    });
    let data = await response.json();
    document.getElementById("visits").innerHTML = "Page Visits: " + data['counter'];
    console.log(data);
    return data;
}

getCounter();