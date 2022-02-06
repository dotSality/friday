import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoginResponseType} from '../dal/api';



const profileSlice = createSlice({
    name: 'profile',
    initialState: {} as InitStateType,
    reducers: {
        setUserProfile:(state,action:PayloadAction<LoginResponseType>)=> {
            return action.payload
        }
    }
})


type InitStateType = ProfileType

export type ProfileType = Pick<LoginResponseType,'name' | 'avatar' | 'publicCardPacksCount' | 'email' >

export const {setUserProfile} = profileSlice.actions

export const profileReducer = profileSlice.reducer