import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cardsAPI} from "../dal/api";
import {isLoggedIn} from "./login-reducer";
import {setUserProfile} from './profile-reducer';


const initialState: InitStateType = {
    error: null,
    status: 'idle',
    isInitialized: false,
    _id: '',
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
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state._id = action.payload
        }
    }
})


//Thunk
export const initializeApp = createAsyncThunk(
    'app/initializeApp',
    async (_, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            const {data} = await cardsAPI.authMe()
            dispatch(isLoggedIn(true))
            dispatch(setUserId(data._id))
            dispatch(setUserProfile(data))
        } catch (e: any) {
            dispatch(isLoggedIn(false))
        } finally {
            dispatch(setAppInitialized(true))
            dispatch(setAppStatus('succeeded'))
        }
    }
)

//types
type InitStateType = {
    error: string | null
    status: StatusType
    isInitialized: boolean
    _id: string
}

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//actions
export const {setAppError, setAppStatus, setAppInitialized, setUserId} = appSlice.actions

export const appReducer = appSlice.reducer