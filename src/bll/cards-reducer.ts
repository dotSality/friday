import {createAsyncThunk, createSlice, PayloadAction, ThunkDispatch} from '@reduxjs/toolkit';
import {CardPackType, cardsAPI, PayloadType} from '../dal/cards-api';
import {setAppStatus} from './app-reducer';
import {RootStateType} from './store';

const cardsSlice = createSlice({
        name: 'cards',
        initialState: {
            packs: [] as CardPackType[],
            isLoaded: false,
        },
        reducers: {
            clearPacksData(state, action: PayloadAction<{}>) {
                state.packs = []
                state.isLoaded = false
            }
        },
        extraReducers: builder => {
            builder.addCase(fetchCards.fulfilled, (state, action) => {
                if (action.payload) {
                    state.packs = action.payload
                    state.isLoaded = true
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
            return res.data.cardPacks
        } catch (e: any) {
            dispatch(setAppStatus('failed'))
            return rejectWithValue({})
        }
    }
)

export const clearPacksData = cardsSlice.actions

export const cardsReducer = cardsSlice.reducer