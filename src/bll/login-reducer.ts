import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {cardsAPI} from "../dal/api";
import {setUserProfile} from './profile-reducer';
import {setAppError, setAppStatus} from "./app-reducer";


export const loginTC = createAsyncThunk(
    'login/loginTC',
    async (params: { email: string, password: string, rememberMe: boolean }, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            let {data} = await cardsAPI.login(params.email, params.password, params.rememberMe)
            dispatch(isLoggedIn(true))
            dispatch(setUserProfile(data))
            dispatch(setAppStatus('succeeded'))
        } catch (e: any) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
                dispatch(setAppError(error))
        }
    }
)


export const logoutTC = createAsyncThunk(
    'login/loginTC',
    async (_, {dispatch}) => {
        try {
            await cardsAPI.logout()
            dispatch(isLoggedIn(false))
        } catch (e: any) {

        }
    }
)


const initialState: InitStateType = {
    isLoggedIn: false,
    error: null
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        isLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
    },
})


//types
type InitStateType = {
    isLoggedIn: boolean
    error: string | null
}

//actions
export const {isLoggedIn} = loginSlice.actions

export const loginReducer = loginSlice.reducer