import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: { 
        value: {username: "", email: "", password: "", token: -1, currQuiz: -1, currQ: 0, ans: [], results: {}} 
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