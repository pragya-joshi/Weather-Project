let weather={
    apikey:"2e25a3796b13015e49c116e60b3a2b33",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+this.apikey
        )
        .then((response)=>response.json())
        .then((data)=> this.displayWeather(data));
            
    },

    displayWeather: function(data){
        const{name}=data;
        const{icon,description,id,main}=data.weather[0];
        const{temp,humidity}=data.main;
        const{speed}=data.wind;
        
        console.log(name,icon,description,temp,humidity,speed,id,main);
        document.querySelector(".location").innerHTML=name;
        document.querySelector(".temp").innerHTML=temp+"°C";
        document.querySelector(".humidity").innerHTML="Humidity: "+humidity+"%";
        document.querySelector(".windspeed").innerHTML="Wind Speed: "+speed+" km/hr";
        const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
        document.querySelector(".weather-icon").src=imageURL;
        document.querySelector(".desc").innerHTML="<h2>"+description+"</h2";
        document.querySelector(".weather").classList.remove("loading");
        if(id===800){
            document.body.style.backgroundImage="url('Images/"+icon+".jpg')";
        }
        else if (id >= 200 && id <= 232){
            document.body.style.backgroundImage="url('Images/"+main+".jpg')";
        }else if(id >= 300 && id <= 321 || id >= 500 && id <= 531){
            document.body.style.backgroundImage="url('Images/rainy.jpg')";
        }
        else if (id >= 600 && id <= 622){
            document.body.style.backgroundImage="url('Images/"+main+".jpg')";
        
        }else if (id >= 701 && id <= 781 ){
            document.body.style.backgroundImage="url('Images/Haze.jpg')";
        }else if (id >= 801 && id <= 804){
            if(icon.charAt(icon.length-1)==='d')
                document.body.style.backgroundImage="url('Images/02d.jpg')";
            else
                document.body.style.backgroundImage="url('Images/02n.jpg')";

        }
        else{
            document.body.style.backgroundImage="url('Images/default.jpg')";
        }
    },

    search:function(){
        this.fetchWeather(document.querySelector(".cityInput").value);
    }
};


document.querySelector("#top button").addEventListener("click",function(){
    weather.search();
});

document.querySelector(".cityInput").addEventListener("keydown",function(event){
    if(event.key=="Enter"){
        weather.search();
    }
});


weather.fetchWeather("Kolkata");