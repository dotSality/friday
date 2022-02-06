import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { cardsAPI } from '../dal/api';

export const sendInstructions = createAsyncThunk('passRecover', async (email: string, {dispatch,rejectWithValue}) => {
    try {
        let res = await cardsAPI.recover(email)
        return res.data
    } catch (e: any) {
        rejectWithValue(e.response.data)
    }
})

const passRecoverSlice = createSlice({
    name: 'passRecover',
    initialState: {
        success: false
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(sendInstructions.fulfilled, (state, action) => {
            if(action.payload) state.success = action.payload.success
        })
    }
})

export const passRecoverReducer = passRecoverSlice.reducer