import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    name: '',
    lastName: '',
    username: '',
    token: '',
    roleName: '',
    insurancePlan: 0,
    authenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate : (state, action) => {
            state._id = action.payload._id
            state.name = action.payload.name
            state.lastName = action.payload.lastName
            state.username = action.payload.username
            state.token = action.payload.token
            state.insurancePlan = action.payload.insurancePlan
            state.roleName = action.payload.roleName
            state.authenticated = action.payload.authState
        },
        logout: (state) => {
            state._id = '';
            state.name = '';
            state.lastName = '';
            state.username = '';
            state.token = '';
            state.roleName = '';
            state.insurancePlan = 0;
            state.authenticated = false;
        },
        edit: (state, action) => {
            state.name = action.payload.name
            state.lastName = action.payload.lastName
            state.insurancePlan = action.payload.insurancePlan
        }
    }

})

export const authActions = authSlice.actions;

export default authSlice.reducer;