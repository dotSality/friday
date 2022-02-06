import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {cardsAPI} from "../dal/api";

const initialState = {
    error: '',
    isRegistrationSuccess: false,
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setRegistrationError(state, action: PayloadAction<{ error: string }>) {
            state.error = action.payload.error
        },
        setRegistrationSuccess(state, action: PayloadAction<{ isRegistrationSuccess: boolean }>) {
            state.isRegistrationSuccess = action.payload.isRegistrationSuccess
        },
    }
})

export const registerReducer = registerSlice.reducer
export const {setRegistrationError, setRegistrationSuccess} = registerSlice.actions;

export const registrationTC = (email: string, password: string) => {
    return (dispatch: Dispatch) => {
        cardsAPI.registration(email, password)
            .then((res) => {
                dispatch(setRegistrationSuccess({isRegistrationSuccess: true}))
                res.data.data.error && dispatch(setRegistrationError({error: res.data.data.error}))
            })
            .catch((e: any) => {
                dispatch(setRegistrationError({error: e.response.data.error}))
            })
    }
}