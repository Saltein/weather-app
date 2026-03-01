import { createSlice } from "@reduxjs/toolkit";
import { City } from "../../../shared/consts/russianCities";
import { RootState } from "../../../app/store";

const initialState = {
    city: null as City | null,
};

export const citySlice = createSlice({
    name: "city",
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload;
        },
    },
});

export const { setCity } = citySlice.actions;
export const cityReducer = citySlice.reducer;

export const selectSelectedCity = (state: RootState) => state.city.city;
