import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setAppStatus} from './app-reducer';
import {cardsAPI, GetCardsRequestType} from '../dal/cards-api';

const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        cardsData: {
            cards: [] as CardsType[],
            cardsTotalCount: 0,
            maxGrade: 0,
            minGrade: 0,
            packUserId: null as string | null,
            page: 0,
            pageCount: 10,
        },
        packId: null as string | null,
        isLoaded: false
    },
    reducers: {
        setPackId(state, action: PayloadAction<string>) {
            state.packId = action.payload
        },
        clearCardsData(state) {
            state.cardsData = {pageCount: 10} as typeof state.cardsData;
            state.packId = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            if (action.payload) {
                state.cardsData = action.payload
                state.isLoaded = true
                state.packId = action.payload.cards[0].cardsPack_id
            }
        });
        builder.addCase(deleteCard.fulfilled, (state, action) => {
            if (action.payload) {
                let filteredCards = state.cardsData.cards.filter(c => c._id !== action.payload)
                state.cardsData.cards = filteredCards
            }
        })
    }
})

export const fetchCards = createAsyncThunk('fetchCards',
    async ({packId, data}: { packId: string, data?: GetCardsRequestType }, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            let res = await cardsAPI.getCards(packId, data)
            dispatch(setAppStatus('succeeded'))
            return res.data
        } catch (e) {

        }
    })

export const deleteCard = createAsyncThunk('deleteCard',
    async (cardId: string, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            let res = await cardsAPI.deleteCard(cardId)
            console.log(res)
            dispatch(setAppStatus('succeeded'))
            return cardId
        } catch (e: any) {
            dispatch(setAppStatus('failed'))
        }
    })

export const cardsReducer = cardsSlice.reducer
export const {setPackId, clearCardsData} = cardsSlice.actions

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