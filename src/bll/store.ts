import {applyMiddleware, combineReducers, createStore} from 'redux';
import {LoginActionsType, loginReducer} from './login-reducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {ProfileActionsType, profileReducer} from './profile-reducer';
import {RegisterActionsType, registerReducer} from './register-reducer';
import {RecoverActionsType, passRecoverReducer} from './pass-recover-reducer';
import {CreatePassActionsType, createPassReducer} from './create-pass-reducer';

const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    passRecover: passRecoverReducer,
    createPass: createPassReducer,
    profile: profileReducer,
})

export const store = createStore(reducers, applyMiddleware(thunk))

type AppActionsType = ProfileActionsType
    | RegisterActionsType
    | RecoverActionsType
    | CreatePassActionsType
    | LoginActionsType

export type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsType>

export type AppStateType = ReturnType<typeof reducers>

//@ts-ignore
window.store = store