import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {cardsAPI} from '../dal/api';
import {PATH} from '../utils/paths';

export const sendInstructions = createAsyncThunk('forgot/sendInstructions', async (email: string, {dispatch, rejectWithValue}) => {
    try {
        let res = await cardsAPI.recover({
            email, from: 'Best INCUBATOR IT-team',
            message: `<div style="background-color: lime; padding: 15px">
                        password recovery link: 
                        <a href='http://localhost:3000/friday#${PATH.CREATE_PASS}/$token$'>link</a>
                      </div>\``
        })
        return {success: res.data.success, email}
    } catch (e: any) {
        rejectWithValue(e.response.data)
    }
})

export const sendNewPassword = createAsyncThunk('forgot/sendNewPassword',
    async (data: { pass: string, token: string }, {dispatch, rejectWithValue}) => {
        try {
            let res = await cardsAPI.setNewPass(data)
        } catch (e: any) {
            return rejectWithValue({})
        }
    })

const passRecoverSlice = createSlice({
    name: 'forgot',
    initialState: {
        success: false,
        email: null as string | null,
        token: null as string | null,
        passChanged: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(sendInstructions.fulfilled, (state, action) => {
            if (action.payload) {
                state.success = action.payload.success
                state.email = action.payload.email
            }
        })
        builder.addCase(sendNewPassword.fulfilled, state => {
            state.token = null
            state.email = null
            state.passChanged = true
        })
    }
})

export const passRecoverReducer = passRecoverSlice.reducer