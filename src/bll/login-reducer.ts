import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {authAPI} from "./../dal/authApi";
import {setUserProfile} from './profile-reducer';
import {setAppError, setAppStatus} from "./app-reducer";


const initialState: InitStateType = {
    isLoggedIn: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        isLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
    },
})


//Thunk
export const loginTC = createAsyncThunk(
    'login/loginTC',
    async (params: { email: string, password: string, rememberMe: boolean }, {dispatch}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            let {data} = await authAPI.login(params.email, params.password, params.rememberMe)
            dispatch(isLoggedIn({isLoggedIn: true}))
            dispatch(setUserProfile(data))
            dispatch(setAppStatus({status: 'succeeded'}))
        } catch (e: any) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', Try later')
            dispatch(setAppError(error))
            dispatch(setAppStatus({status: 'failed'}))
        }
    }
)

export const logoutTC = createAsyncThunk(
    'login/loginTC',
    async (_, {dispatch}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            await authAPI.logout()
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(isLoggedIn({isLoggedIn: false}))
        } catch (e: any) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', Try later')
            dispatch(setAppError(error))
            dispatch(setAppStatus({status: 'failed'}))
        }
    }
)


//types
type InitStateType = {
    isLoggedIn: boolean
}

//actions
export const {isLoggedIn} = loginSlice.actions

export const loginReducer = loginSlice.reducer