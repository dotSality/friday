import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CardPackType, cardsAPI} from '../dal/cards-api';


const initialState: InitialStateType = []


const cardsSlice = createSlice({
        name: 'cards',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(fetchCards.fulfilled, (state, action) => {

                if (action.payload) {
                    return  action.payload
                }
            })
        }
    },
)


type InitialStateType = CardPackType[]


export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async () => {

        try {
            const {data} = await cardsAPI.getPack()
            return data.cardPacks
        } catch (e: any) {

        }
    }
)

export const cardsReducer = cardsSlice.reducer