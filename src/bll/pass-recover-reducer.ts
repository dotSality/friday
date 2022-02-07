import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { cardsAPI } from '../dal/api';

export const sendInstructions = createAsyncThunk('passRecover', async (email: string, {dispatch,rejectWithValue}) => {
    try {
        let res = await cardsAPI.recover(email)
        return {success: res.data.success, email}
    } catch (e: any) {
        rejectWithValue(e.response.data)
    }
})

const passRecoverSlice = createSlice({
    name: 'passRecover',
    initialState: {
        success: false,
        email: null as string | null,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(sendInstructions.fulfilled, (state, action) => {
            if(action.payload) {
                state.success = action.payload.success
                state.email = action.payload.email
            }
        })
    }
})

export const passRecoverReducer = passRecoverSlice.reducer