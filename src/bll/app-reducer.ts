import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "./../dal/authApi";
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
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppStatus: (state, action: PayloadAction<{ status: StatusType }>) => {
            state.status = action.payload.status
        },
        setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            if (action.payload) {
                state._id = action.payload.id
            }
        })
    }

})


//Thunk
export const initializeApp = createAsyncThunk(
    'app/initializeApp',
    async (_, {dispatch}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            const {data} = await authAPI.authMe()
            dispatch(isLoggedIn({isLoggedIn: true}))
            dispatch(setUserProfile(data))
            return {id: data._id}
        } catch (e: any) {
            dispatch(isLoggedIn({isLoggedIn: false}))
        } finally {
            dispatch(setAppInitialized({isInitialized: true}))
            dispatch(setAppStatus({status: 'succeeded'}))
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
export const {setAppError, setAppStatus, setAppInitialized} = appSlice.actions

export const appReducer = appSlice.reducer