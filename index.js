url = "https://code-checker.onrender.com/api/checker"
async function getData() {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data.payload;
    } catch (error) {
      document.body.style.backgroundColor = 'red';
      console.error(error);
    }
  }
  
async function updateData() {
    const data = await getData();
    let divs = document.querySelectorAll('div');
    
    // create new divs if necessary
    if (divs.length < data.length) {
      for (let i = divs.length; i < data.length; i++) {
        const div = document.createElement('div');
        const idTag = document.createElement('p');
        idTag.textContent = 'ID: ';
        div.appendChild(idTag);
        const statusTag = document.createElement('p');
        statusTag.textContent = 'Status: ';
        div.appendChild(statusTag);
        const placeTag = document.createElement('p');
        placeTag.textContent = 'Place: ';
        div.appendChild(placeTag);
        document.querySelector("body").appendChild(div);
      }
      divs = document.querySelectorAll('div');
    }
    
    // update existing divs
    data.forEach((item, index) => {
      const [id, status, place] = item;
      const idTag = divs[index].querySelector('p:first-of-type');
      idTag.textContent = `ID: ${id}`;
      const statusTag = divs[index].querySelector('p:nth-of-type(2)');
      statusTag.textContent = `Status: ${status}`;
      if (status === 'good') {
        statusTag.style.color = 'green';
      } else if (status === 'bad') {
        statusTag.style.color = 'red';
      }
      const placeTag = divs[index].querySelector('p:last-of-type');
      placeTag.textContent = `Place: ${place}`;
    });
  }
  
  updateData()
  setInterval(updateData, 10000);
  