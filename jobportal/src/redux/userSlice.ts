import { createSlice } from "@reduxjs/toolkit";

// A slice for managing user state
const userSlice = createSlice
    ({
        name: "users",
        initialState: {
            currentUser:null,
        },
        reducers: {
            setCurrentUser: (state, action) => {
                state.currentUser = action.payload;
            },
        },
    });

// Export the user actions
export const { setCurrentUser } = userSlice.actions;
// Export the user slice
export default userSlice.reducer;