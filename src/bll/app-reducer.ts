import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cardsAPI} from "../dal/api";
import {isLoggedIn} from "./login-reducer";


const initialState: InitStateType = {
    error: null,
    status: 'idle',
    isInitialized: false
}


const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setAppStatus: (state, action: PayloadAction<StatusType>) => {
            state.status = action.payload
        },
        setAppInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload
        }
    }
})


//Thunk
export const initializeApp = createAsyncThunk(
    'app/initializeApp',
    async (_, {dispatch}) => {
        try {
            const response = await cardsAPI.me()
            console.log(response)
            dispatch(isLoggedIn(true))

        } catch (e: any) {

        }finally {
            dispatch(setAppInitialized(true))
        }
    }
)

//types
type InitStateType = {
    error: string | null
    status: StatusType
    isInitialized: boolean
}

type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const {setAppError, setAppStatus, setAppInitialized} = appSlice.actions

export const appReducer = appSlice.reducer