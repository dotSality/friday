import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cardsAPI} from "../dal/api";
import {setUserProfile} from './profile-reducer';


export const loginTC = createAsyncThunk(
    'login/loginTC',
    async (params: { email: string, password: string, rememberMe: boolean }, {dispatch}) => {
        try {
            let {data} = await cardsAPI.login(params.email, params.password, params.rememberMe)
            dispatch(isLoggedIn(true))
            dispatch(setUserProfile(data))
        } catch (e: any) {
            const error = e.response
            console.log(error.data.error)
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


type InitStateType = {
    isLoggedIn: boolean
    error: string | null
}

const {isLoggedIn} = loginSlice.actions

export const loginReducer = loginSlice.reducer