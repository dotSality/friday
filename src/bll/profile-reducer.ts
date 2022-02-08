import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cardsAPI, LoginResponseType, UserDataType} from '../dal/api';



const profileSlice = createSlice({
    name: 'profile',
    initialState: {} as InitStateType,
    reducers: {
        setUserProfile:(state,action:PayloadAction<LoginResponseType>)=> {
            return action.payload
        }
    }
})


export const changeUserDataTC = createAsyncThunk(
    'profile/changeUserData',
    async (userData:UserDataType, {dispatch}) => {
        await cardsAPI.changeUserData(userData)
    }
)

type InitStateType = ProfileType

export type ProfileType = Pick<LoginResponseType,'name' | 'avatar' | 'publicCardPacksCount' | 'email' >

export const {setUserProfile} = profileSlice.actions

export const profileReducer = profileSlice.reducer