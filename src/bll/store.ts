import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tempOneReducer} from './tempOneReducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    temp: tempOneReducer,
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof reducers>

//@ts-ignore
window.store = store