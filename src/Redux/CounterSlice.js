import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
    count : 0,
};

const CounterSlice = createSlice({
    name: 'counter',
    initialState,

    reducers:{
        increment: (state) => {
            state.count += 1; 
        },
        decrement: (state) => {
            state.count -= 1; 
        },
        by: (state,actions) => {
            state.count += actions.payload; 
        }
    }
})

export const {increment,decrement,by} = CounterSlice.actions;

export default CounterSlice.reducer