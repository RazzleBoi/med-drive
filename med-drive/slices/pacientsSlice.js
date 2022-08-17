import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pacients: [],
};

export const pacientsSlice = createSlice({
  name: "pacients",
  initialState,
  reducers: {
    setPacients: (state, action) => {
      state.pacients = action.payload;
    },
    addToPacients: (state, action) => {
      state.pacients = [...state.pacients, action.payload];
    },
    removeFromPacients: (state, action) => {
      const index = state.pacients.findIndex(
        (item) => item._id === action.payload.id
      );
      let newPacients = [...state.pacients];
      if (index >= 0) {
        newPacients.splice(index, 1);
      } else {
        console.warn(
          `Can't remove non existent item! (id: ${action.payload.id} )`
        );
      }

      state.pacients = newPacients;
    },
    // addToIngredientToPacient: (state, action) => {
    //   let pacient = state.pacients.pacients.filter((item) => item.id === action.payload.id);

    // },
  },
});

// Action creators are generated for each case reducer function
export const { addToPacients, removeFromPacients, setPacients } = pacientsSlice.actions;

export const selectPacients= (state) => state.pacients.pacients;

export const selectPacientsWithId = (state, id) =>
  state.pacients.pacients.filter((item) => item._id === id);

export default pacientsSlice.reducer;
