import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./Redux/CounterSlice";

export const store = configureStore({
    reducer:{
        counter :CounterReducer
    }
});