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
    updatePrescriptionToPacient: (state, action) => {
      const newPacients = state.pacients.map((pacient, index) => {
        if (pacient._id == action.payload.id) {
          let p = pacient;
          p.prescribed_ingredients = action.payload.prescribed_ingredients;
          return p;
        }
        return pacient;
      });
      state.pacients = newPacients;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPacients, removeFromPacients, setPacients, updatePrescriptionToPacient } =
  pacientsSlice.actions;

export const selectPacients = (state) => state.pacients.pacients;

export const selectOnePacientWithId = (state, id) =>
  state.pacients.pacients.find((item) => item._id === id);

export default pacientsSlice.reducer;
