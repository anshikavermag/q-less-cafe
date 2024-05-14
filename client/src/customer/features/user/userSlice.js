import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.info = action.payload;
        },
        deleteUser: (state) => {
            state.info = {};
        },
    },
});

export const { updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
