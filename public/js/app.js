console.log("Client side javascript loaded");


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#msg1');
const p2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const location = search.value;
    
    p1.textContent = "";
    p2.textContent = "";

    fetch('/weather?address='+location).then((resp) => {
    resp.json().then((data) => {
        if (data.error) {
            //console.log(data.error);
            p1.textContent = data.error;
        }
        else {
            //console.log(data.location);
            //console.log(data.forecast);
            p1.textContent = data.location
            p2.textContent = data.forecast
        }
       
    })
})
})