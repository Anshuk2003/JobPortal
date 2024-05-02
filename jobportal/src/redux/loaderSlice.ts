import { createSlice } from "@reduxjs/toolkit";

// A slice for managing loader state
const loadersSlice = createSlice({
    name: "loaders",
    initialState: {
        loading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});
// Export the loader actions
export const { setLoading } = loadersSlice.actions;
// Export the loadder slice
export default loadersSlice.reducer;