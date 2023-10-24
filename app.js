const key = '11e01c7bf36ef932e903f3149e9e1adb';
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search_bar = document.getElementById("search_bar");
const weather = document.querySelector(".weather");

const details = document.querySelector(".details");
const icon = document.querySelector(".icon");

var src  = "";
const getWeather = async (cityName) => {
    if(cityName == ""){
      weather.innerHTML = `Please, Enter a City Name`;
      document.querySelector('.details').innerHTML = "";
      return;
    }
    weather.innerHTML = "Loading.....";
    const response = await fetch(url + cityName + `&appid=${key}`);
    var data = await response.json();
    search_bar.value = "";
    if (data.cod == 404) {
        document.querySelector('.weather').innerHTML = 'Oops! City Not Found';
        document.querySelector('.details').innerHTML = "";
    } else {
      if(data.weather[0].main == "Mist"){
        src = 'mist.png'
      }else if(data.weather[0].main == "Clouds"){
        src = 'clouds.png'
      }else if(data.weather[0].png == "Drizzle"){
        src = 'drizzle.png'
      }else if(data.weather[0].png == "Snow"){
        src = 'snow.png'
      }else if(data.weather[0].png == "Rain"){
        src = 'rain.png'
      }else{
        src = 'clear.png'
      }
        weather.innerHTML = `
        <img src=${src}>
        <h1 class="temp">${Math.round(data.main.temp)}°c</h1>
        <h2 class="city">${data.name}</h2>`
        details.innerHTML = `<div class="col">
        <img src="humidity.png" alt="">
        <div class="temp-dtls">
          <h3 class="humidity">
            ${data.main.humidity}%
          </h3>
          <h5>
            Humidity
          </h5>
        </div>
      </div>
      <div class="col">
        <img src="wind.png" alt="">
        <div class="temp-dtls">
          <h3 class="wind">
            ${data.wind.speed}km/h
          </h3>
          <h5>
            Wind Speed
          </h5>
        </div>
      </div>`
        console.log(data);
    }
}

icon.addEventListener("click", () => {

    getWeather(search_bar.value);

})