import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {cardsAPI} from "../dal/api";
import {setAppError, setAppStatus} from "./app-reducer";

const initialState = {
    isRegistrationSuccess: false,
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setRegistrationSuccess(state, action: PayloadAction<{ isRegistrationSuccess: boolean }>) {
            state.isRegistrationSuccess = action.payload.isRegistrationSuccess
        },
    }
})

export const registerReducer = registerSlice.reducer
export const {setRegistrationSuccess} = registerSlice.actions;

export const registrationTC = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        await cardsAPI.registration(email, password)
        dispatch(setAppStatus('succeeded'))
        dispatch(setRegistrationSuccess({isRegistrationSuccess: true}))
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', Try later')
        dispatch(setAppError(error))
    }
}