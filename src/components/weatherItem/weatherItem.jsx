import React from "react";
import './weatherItem.scss';

export default function WeatherItem({ weather_data }) {

    function upFirst(str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    let img = "https://openweathermap.org/img/wn/" + weather_data.weather[0]['icon'] + "@2x.png";

    var now = new Date();
    var time = new Date().toLocaleTimeString().slice(0, -3); //время (час, минута)
    var days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    var month = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

    return (
        <div className="weather-item">
            <div className="weather-item__city">{weather_data.name}</div>
            <div className="weather-item__date-time">{days[now.getDay()] + ", " + now.getDate() + " " + month[now.getMonth()] + ", " + time}</div>
            <div className="weather-item__main-info">
                <div className="weather-item__temp">+{Math.round(weather_data.main.temp - 273)}°</div>
                <img className="weather-item__image" src={img} alt="чтото пошло не так" />
                <div className="weather-item__description">{upFirst(weather_data.weather[0]['description'])}</div>
            </div>
                
            <div className="weather-item__detail-info">
                <div className="weather-item__title">Ветер</div>
                <div className="weather-item__dimension">{weather_data.wind.speed} м/c</div>
            </div>

            <div className="weather-item__detail-info">
                <div className="weather-item__title">Давление</div>
                <div className="weather-item__dimension">{weather_data.main.pressure} мм рт. ст.</div>
            </div>

            <div className="weather-item__detail-info">
                <div className="weather-item__title">Влажность</div>
                <div className="weather-item__dimension">{weather_data.main.humidity} %</div>
            </div>

            <div className="weather-item__detail-info">
                <div className="weather-item__title">min t°</div>
                <div className="weather-item__dimension">{Math.round(weather_data.main.temp_min - 273)}°</div>
            </div>

            <div className="weather-item__detail-info">
                <div className="weather-item__title">max t°</div>
                <div className="weather-item__dimension">{Math.round(weather_data.main.temp_max - 273)}°</div>
            </div>
        </div>
    )
}