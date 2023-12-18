import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: { 
        value: {email: "", password: ""} 
    },
    reducers: {
        login: (state, action) =>
        {
            state.value = action.payload;
        }, // function that logs you in
    },
});

// for login component
export const {login} = userSlice.actions;

export default userSlice.reducer;