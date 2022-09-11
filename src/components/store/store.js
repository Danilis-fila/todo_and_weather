import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../slices/todoSlice";
import  weatherSlice  from "../slices/weatherSlice";

export const store = configureStore({
    reducer: {
        todo: todoSlice,
        weather: weatherSlice,
    },
}) 