import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: {email: null, displayName: null, photoUrl: null},
        error: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
          },
    },
});

export const { setUser } = userSlice.actions;

export const selectCurrentUser= (state) => state.user.currentUser;
export default userSlice.reducer;