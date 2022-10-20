const key="3177acf66abc1883209083954930c73c"


const cityLink="https://countryflagsapi.com/png/"
const btn=document.querySelector("#search button")
const inputCamp=document.querySelector("#search input")
const city=document.querySelector(".title #city")
const temperature=document.querySelector("#temperature span")
const humidity =document.querySelector("#humidity span")
const wind= document.querySelector("#wind span")
const day = document.querySelector("#day span")
const dayNigth=document.querySelector("#dayNigth")
const country=document.querySelector("#country")
const informations=document.querySelector(".informations")
const body=document.querySelector("body")
const erroor=document.querySelector("#error")

const fetchWeather= async (city)=>{                                                                                     
    const ApiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}&lang=pt_br`
    const res= await fetch(ApiUrl)
    const data= await res.json()
    return data
}


const displayWeather=async(e)=>{
    let data = await fetchWeather(e)
    if(data.cod==="404"){
        erroor.classList.remove("hide")
        informations.classList.add("hide")
    }
    else{
        erroor.classList.add("hide")
        city.innerText="Tempo em: "+data.name;
        temperature.innerText=data.main.temp
        humidity.innerText="Umidade: "+data.main.humidity+"%"
        wind.innerText="Vento:"+data.wind.speed+"km/h"
        day.innerText=data.weather[0].description
        dayNigth.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        country.setAttribute("src",cityLink+data.sys.country)
        informations.classList.remove("hide")
        body.style.backgroundImage=`url(https://source.unsplash.com/1600x900/?${data.name})`
    }
    
}

btn.addEventListener("click",()=>{
    displayWeather(inputCamp.value)

})

inputCamp.addEventListener("keyup",(event)=>{
    if(event.code === "Enter"){
        let city= inputCamp.value
        displayWeather(city)

    }

})

