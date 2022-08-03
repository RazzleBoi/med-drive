import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drugstore:{
    id: null, 
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    meds: null,
    long:null,
    lat: null,
  },
};

export const drugstoreSlice = createSlice({
  name: "drugstore",
  initialState,
  reducers: {
    setDrugstore: (state, action) => {
      state.drugstore = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDrugstore } = drugstoreSlice.actions;

export const selectDrugstore = (state) => state.drugstore.drugstore;

export default drugstoreSlice.reducer;
