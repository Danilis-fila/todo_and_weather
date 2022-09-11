feimport React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfoWeather, setCity } from "../slices/weatherSlice";
import WeatherItem from "../weatherItem/weatherItem";
import "./weatherForm.scss";

export default function WeatherForm() {
    const dispatch = useDispatch();
    const weatherData = useSelector(state => state.weather.weatherData)
    const weatherStatus = useSelector(state => state.weather.status)
    const myCity = useSelector(state => state.weather.myCity)
    const [searchValue, setSearchValue] = useState('')
    const [isOpen, setIsOpen] = useState(true)
    const dataCity = require('../../city_list.json')


    useEffect(() => {
        async function dataLoading() {
            await dispatch(getInfoWeather(myCity));
        }
        dataLoading();
    }, [myCity]);

    const weatherComponents = useMemo(() => <WeatherItem weather_data={weatherData} />, [weatherData])



    const filteredCity = dataCity.filter(city => city.name.toLowerCase().includes(searchValue.toLowerCase()))

    const settingCityValue = e => {
        setSearchValue(e.target.textContent)
        setIsOpen(!isOpen)
        dispatch(setCity(e.target.textContent))
    }

    return (
        <div className="weather-form">
            <div className="search">
                <input className="search__input" type='search' placeholder="Введите название города..." value={searchValue}
                    onClick={() => setIsOpen(true)}
                    onChange={(e) => setSearchValue(e.target.value)}
                ></input>

                <image className="search__image" ></image>
                <ul className="search-autocomplete">
                    {
                        searchValue && isOpen
                            ?
                            filteredCity.map((city, index) => <li className="search-autocomplete__item" key={index} onClick={settingCityValue}>{city.name}</li>)
                            :
                            null
                    }
                </ul>
            </div>

            <div className="weather-form__item">
                {weatherStatus === 'pending' && <div className='weather-form--loading'></div>}
                {weatherStatus === 'fulfilled' && weatherComponents}
                {weatherStatus === 'rejected' && <h2 style={{ fontSize: "24px" }}>Сервер пропал ‿︵‿ヽ(°□° )ノ︵‿︵</h2>}
            </div>
        </div>
    );
}
