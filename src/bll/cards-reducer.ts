import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardPackType, cardsAPI, PayloadType} from '../dal/cards-api';
import {setAppStatus} from './app-reducer';

const cardsSlice = createSlice({
        name: 'cards',
        initialState: {
            cardPacks: [] as CardPackType[],
            isLoaded: false,
            cardPacksTotalCount: 0 as number,
            maxCardsCount: 0 as number,
            minCardsCount: 0 as number,
            page: 0 as number,
            pageCount: 10 as number
        },
        reducers: {
            clearPacksData(state, action: PayloadAction<{}>) {
                state.cardPacks = []
                state.isLoaded = false
            }
        },
        extraReducers: builder => {
            builder.addCase(fetchCards.fulfilled, (state, action) => {
                if (action.payload) {
                    return {...action.payload, isLoaded: true}
                    // state.packs = action.payload.cardPacks
                    // state.cardPacksTotalCount = action.payload.cardPacksTotalCount
                    // state.isLoaded = true
                    // state.page = action.payload.page
                }
            })
        }
    },
)

export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async (data: PayloadType, {dispatch,rejectWithValue}) => {
        dispatch(setAppStatus('loading'))
        try {
            const res = await cardsAPI.getPack(data)
            console.log(res.data)
            return res.data
        } catch (e: any) {
            dispatch(setAppStatus('failed'))
            return rejectWithValue({})
        }
    }
)

export const clearPacksData = cardsSlice.actions

export const cardsReducer = cardsSlice.reducer