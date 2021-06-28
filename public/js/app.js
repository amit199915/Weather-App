// console.log('client side js')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const infoOne = document.querySelector('#info-1')
const infoTwo = document.querySelector('#info-2')
const infoThree = document.querySelector('#info-3')
const infoFour = document.querySelector('#info-4')
const img = document.getElementById("weatherPic");


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    infoOne.textContent = 'Loading.....';
    infoTwo.textContent = '';
    infoThree.textContent = '';
    infoFour.textContent = '';
    img.src = "";
    const location = search.value;
    const url = '/weather?address=' + location;
    // console.log(url);
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                infoOne.textContent = data.error
            } else {

                // console.log(data.location);
                console.log(data);
                infoOne.textContent = 'Location: ' + data.location;
                infoTwo.textContent = 'Weather Report: ' + data.forecast.weather + '. Temperature is ' + data.forecast.temperature + ' °C';
                infoThree.textContent = 'Wind Speed: ' + data.forecast.wind_speed + ' Km/hr';
                infoFour.textContent = 'Humidity: ' + data.forecast.humidity + ' %';
                img.src = data.forecast.icon;
            }
        })
    })
})