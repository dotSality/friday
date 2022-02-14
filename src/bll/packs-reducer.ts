import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardPackType, packsApi, PayloadType} from '../dal/packs-api';
import {setAppStatus} from './app-reducer';

const cardsSlice = createSlice({
        name: 'packs',
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
            clearPacksData(state) {
                state.cardPacks = []
                state.isLoaded = false
            }
        },
        extraReducers: builder => {
            builder.addCase(fetchPacks.fulfilled, (state, action) => {
                if (action.payload) {
                    return {...action.payload, isLoaded: true}
                }
            })
        }
    },
)

export const fetchPacks = createAsyncThunk(
    'cards/fetchCards',
    async (data: PayloadType, {dispatch,rejectWithValue}) => {
        dispatch(setAppStatus('loading'))
        try {
            const res = await packsApi.getPack(data)
            return res.data
        } catch (e: any) {
            dispatch(setAppStatus('failed'))
            return rejectWithValue({})
        }
    }
)

export const {clearPacksData} = cardsSlice.actions

export const packsReducer = cardsSlice.reducer