import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setAppStatus} from './app-reducer';
import {cardsAPI} from '../dal/cards-api';

const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        cards: null as CardsType[] | null,
        packId: null as string | null,
    },
    reducers: {
        setPackId(state, action: PayloadAction<string>) {
            state.packId = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            if (action.payload) state.cards = action.payload.cards
        })
    }
})

export const fetchCards = createAsyncThunk('fetchCard', async (packId: string, {dispatch}) => {
    try {
        dispatch(setAppStatus('loading'))
        let res = await cardsAPI.getCards(packId, {pageCount: 10})
        console.log(res)
        return res.data
    } catch (e) {

    }
})

export const cardsReducer = cardsSlice.reducer
export const {setPackId} = cardsSlice.actions

export type CardsType = {
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number,
    rating: number,
    shots: number,
    type: string,
    user_id: string,
    created: string,
    updated: string,
    __v: number;
    _id: string,
}