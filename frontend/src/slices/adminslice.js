import { createSlice } from "@reduxjs/toolkit";

const storedInfo = localStorage.getItem('adminInfo');
const initialState = {
    adminInfo: storedInfo ? JSON.parse(storedInfo) : null,
    login: !!storedInfo
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload;
            state.login = true;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload));
        },
        adminlogout: (state) => {
            state.adminInfo = null;
            state.login = false;
            localStorage.removeItem('adminInfo');
        }
    }
});
console.log("initialstate",initialState)

export default adminSlice.reducer;
export const { setAdminCredentials, adminlogout } = adminSlice.actions;
