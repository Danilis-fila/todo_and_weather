import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    weatherData: null,
    status: null,
    myCity: JSON.parse(localStorage.getItem('my_city')) || "Moscow",
}

export const getInfoWeather = createAsyncThunk('weather/getInfoWeather', async (city, { rejectWithValue, dispatch }) => {
    const data = await fetch('https://api.openweathermap.org/data/2.5/weather?' + new URLSearchParams({
        q: city,
        lang: "ru",
        appid: "49a8da7c52ef72148e55cc4302fa2f17"
    }))
    .then( resp => resp.json())

    data.cod === 200 ? dispatch(setInfoWeather(data)) : rejectWithValue("error")
})

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
     //объект функций которые будут управлять нашим состоянием
    reducers: {
        setInfoWeather: (state, action) => {
            state.weatherData = action.payload
        },
        setCity: (state, action) => {
            state.myCity = action.payload
            localStorage.setItem('my_city', JSON.stringify(action.payload))
        },
    },
    extraReducers: {
        [getInfoWeather.pending]: (state, action) => { state.status = 'pending' },
        [getInfoWeather.fulfilled]: (state, action) => { state.status = 'fulfilled' },
        [getInfoWeather.rejected]: (state, action) => { state.status = 'rejected' },
    }
})

export const { setInfoWeather, setCity } = weatherSlice.actions
export default weatherSlice.reducer

//https://api.openweathermap.org/data/2.5/weather?id=703883&lang=ru&appid=49a8da7c52ef72148e55cc4302fa2f17 - api погоды в РК