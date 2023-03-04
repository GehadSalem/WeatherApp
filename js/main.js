const wrapper = document.querySelector(".wrapper"),
inpuPart = wrapper.querySelector(".input-part"),
infoText = inpuPart.querySelector(".info-txt"),
inputField = inpuPart.querySelector(".cityInput"),
locationBtn = inpuPart.querySelector("button"),
wIcon = wrapper.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keypress", e =>{
  if(e.key === "Enter" && inputField.value != ""){
    requestCityCode(inputField.value);
  }
})

locationBtn.addEventListener("click", function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }else{
    alert("Your browser not support geolocation api");
  }
});

async function onSuccess(position){
  const{lat, lon} = position.coords;
  api= await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=f98cbc6bb5757a3c281eda852f0640b8`).then(Response => Response.json());

  const city = api.name;
  const country = api.sys.country;
  const {description, id} = api.weather[0];
  const {feels_like, humidity, temp} = api.main;

  if(id == 800){
    wIcon.src = "images/clear.svg";
  }else if(id >= 200 && id <= 232){
    wIcon.src = "images/storm.svg";
  }else if(id >= 600 && id <= 622){
    wIcon.src = "images/snow.svg";
  }else if(id >= 701 && id <= 781){
    wIcon.src = "images/haze.svg";
  }else if(id >= 801 && id <= 804){
    wIcon.src = "images/cloud.svg";
  }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
    wIcon.src = "images/rain.svg";
  }

  wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
  wrapper.querySelector(".weather").innerText = description;
  wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
  wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
  wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
  wrapper.classList.add("active");
  
}

function onError(error){
  infoText.innerText = error.message;
  infoText.classList.add("error");
}

async function requestCityCode(cityName){
  let cityApi = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=f98cbc6bb5757a3c281eda852f0640b8`).then(Response => Response.json());
  // await fetch(cityApi).then(Response => console.log(Response.json()));

  let cityLat = await cityApi[0].lat;
  let cityLon = await cityApi[0].lon;
  api = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&units=metric&appid=f98cbc6bb5757a3c281eda852f0640b8`).then(Response => Response.json());

  const city = api.name;
  const country = api.sys.country;
  const {description, id} = api.weather[0];
  const {feels_like, humidity, temp} = api.main;

  if(id == 800){
    wIcon.src = "images/clear.svg";
  }else if(id >= 200 && id <= 232){
    wIcon.src = "images/storm.svg";
  }else if(id >= 600 && id <= 622){
    wIcon.src = "images/snow.svg";
  }else if(id >= 701 && id <= 781){
    wIcon.src = "images/haze.svg";
  }else if(id >= 801 && id <= 804){
    wIcon.src = "images/cloud.svg";
  }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
    wIcon.src = "images/rain.svg";
  }

  wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
  wrapper.querySelector(".weather").innerText = description;
  wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
  wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
  wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
  wrapper.classList.add("active");
}

arrowBack.addEventListener("click", function(){
  wrapper.classList.remove("active");
})
