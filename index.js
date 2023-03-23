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
      console.log("Updated : ", await data.payload)
      return await data.payload;
    } catch (error) {
      document.querySelector("body").style.backgroundColor = 'red';
      console.error(error);
    }
  }
  
async function updateData() {
    const data = await getData();
    let divs = document.querySelectorAll('div');
    
    // create new divs if necessary
    if (divs.length < data.length) {
        for (let i = divs.length; i < data.length; i++) {
            div = document.createElement('div');

            const placeTag = document.createElement('p');
            placeTag.textContent = '';
            div.appendChild(placeTag);

            const statusTag = document.createElement('p');
            statusTag.textContent = 'Status: ';
            div.appendChild(statusTag);
            
            const idTag = document.createElement('p');
            idTag.textContent = 'ID: ';
            div.appendChild(idTag);
        
            document.querySelector("body").appendChild(div);
        }
        divs = document.querySelectorAll('div');
    }
    
    // update existing divs
    data.forEach((item, index) => {
        const [id, status, place] = item;
        const placeTag = divs[index].querySelector('p:first-of-type');
        placeTag.textContent = `${place}`;
      
        const statusTag = divs[index].querySelector('p:nth-of-type(2)');
        statusTag.textContent = `Status: ${status}`;
        if (status === 'good') {
            statusTag.style.color = '#02bf02';
        } else if (status === 'bad') {
            statusTag.style.color = '#ba2222';
        }
        
        const idTag = divs[index].querySelector('p:last-of-type');
        idTag.textContent = `ID: ${id}`;
    });
  }
  
  updateData()
  setInterval(updateData, 10000);
  