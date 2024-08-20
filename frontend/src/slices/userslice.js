import { createSlice } from '@reduxjs/toolkit';

const storedUserInfo = localStorage.getItem('userInfo');
const initialState = {
    userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
    login: !!storedUserInfo, 
};


const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            state.login = true;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            state.login=false;
            localStorage.removeItem('userInfo');
        }
    }
});


export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
