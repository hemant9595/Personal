const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector(".weather-container");
const grantAccessContainer=document.querySelector(".grant-loation-container");

const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const errorPage = document.querySelector(".error-container");



const API_key= "d1845658f92b31c64bd94f06f7188c9c";

let currentTab=userTab;
currentTab.classList.add('current-tab');
///kuch pending hai
getfromSessionsStorage();


function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");
       
        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
           
            searchForm.classList.add("active");
        }
        else{
            //phele search pe tha ab your weather ko visible karna

            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
          

            // ab your weather pe hu ab dispaly karo 

            getfromSessionsStorage();
        }
    }
}
userTab.addEventListener("click",()=>{
    switchTab(userTab);
})

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
})

function getfromSessionsStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);

    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} = coordinates;
    //make grant invisible
    grantAccessContainer.classList.remove("active");
    //make loading visible
    errorPage.classList.remove("active");
    loadingScreen.classList.add("active");

    //API CALL
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);

        const data= await response.json();

        loadingScreen.classList.remove("active");

        userInfoContainer.classList.add("active");

        renderWeatherInfo(data);
    }
    catch(e){
        loadingScreen.classList.remove("active");
        // userInfoContainer.classList.remove("active");
        error.classList.add(active);


    }

}

function renderWeatherInfo(weatherInfo){
    const cityName = document.querySelector("[data-cityName]");                                                 
    const countryIcon = document.querySelector('[data-countryIcon]');
    const desc = document.querySelector("[data-weatherDesc]") ;
    const weatherIcon = document.querySelector('[data-weatherIcon]');
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src =`http://openweathermap.org/img/w/${ weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;


    
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        // khud karo
        error.classList.add(active);
    }
}

function showPosition(pos){

    const userCoordinates = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
    }

        sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));

        fetchUserWeatherInfo(userCoordinates);
    
}

const grantAccessBtn = document.querySelector("[data-grantAccess]");
grantAccessBtn.addEventListener("click",getLocation);




const searchInput =document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === ""){
        return;
    }
    else{
        fetchSearchWeatherInfo(cityName);
    }
})

async function fetchSearchWeatherInfo(city){
    errorPage.classList.remove("active");
    loadingScreen.classList.add("active");

    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const  response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);

        const data = await response.json();
    
        if ( data.cod == '404' ) {
            console.log("a");
            loadingScreen.classList.remove("active");
            errorPage.classList.add("active");
            console.log("d");
        }else{
            errorPage.classList.remove("active");
            loadingScreen.classList.remove("active");
            userInfoContainer.classList.add("active");
            renderWeatherInfo(data);
        }
      
    }
    catch(e){
        console.log(e);
        loadingScreen.classList.remove("active");
        errorPage.classList.add("active");
    }

}



























































// console.log("hello jee kaise ho");

// const API_key= "a02133470c08e0ffbd988b31363e0282";

// function renderWeatherInfo(data){
//     let newPars =document.createElement('p');
//     newPars.textContent = `${data?.main?.temp.toFixed(2)}  °C`
//     document.body.appendChild(newPars);
// }



// async function showWeather(){
    
//     try{
//         let lat=15.3333;
//         let lon=76.280;
//         let city="goa";
    
//         const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
    
//         const data = await response.json();
//         console.log("weather data->", data);
    
        
//         renderWeatherInfo(data);
//     }
//     catch(e){
//         console.log("error",e);
//     }

   

// }


// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPos);
//     }
//     else{
//         console.log("no geo location")
//     }
// }

// function showPos(position){
//     let lat = position.coords.latitude;
//     let long = position.coords.longitude;

//     console.log(lat);
//     console.log(long);
// }