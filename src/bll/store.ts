import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {registerReducer} from './register-reducer';
import {loginReducer} from './login-reducer';
import {createPassReducer} from './create-pass-reducer';
import {passRecoverReducer} from './pass-recover-reducer';
import {profileReducer} from './profile-reducer';

const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    passRecover: passRecoverReducer,
    createPass: createPassReducer,
    profile: profileReducer,
})

export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type RootStateType = ReturnType<typeof reducers>
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

//@ts-ignore
window.store = store