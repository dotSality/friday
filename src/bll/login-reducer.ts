import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cardsAPI} from "../dal/api";


export const loginTC = createAsyncThunk(
    'login/loginTC',
    async (params: { email: string, password: string, rememberMe: boolean }, {dispatch}) => {
        try {
           let response =  await cardsAPI.login(params.email, params.password, params.rememberMe)
            console.log(response)
            dispatch(isLoggedIn(true))
        } catch (e) {

        }
    }
)


const initialState: InitStateType = {
    isLoggedIn: false
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        isLoggedIn: (state, action:PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        }
    },
})


type InitStateType = {
    isLoggedIn: boolean
}

const {isLoggedIn} = loginSlice.actions

export const loginReducer = loginSlice.reducer