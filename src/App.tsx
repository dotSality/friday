import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

import {CircularProgress} from "@mui/material";
import {initializeApp} from "./bll/app-reducer";
import {useAppSelector} from "./bll/store";

import s from './App.module.scss'
import {Route, Routes} from 'react-router-dom';
import {PATH} from './utils/paths';
import {LoginPage} from './features/Pages/LoginPage/FormikLoginPage';
import {RegisterPage} from './features/Pages/RegisterPage/RegisterPage';
import {NewPassCreate} from './features/Pages/NewPassCreate/NewPassCreate';
import {ForgotPage} from './features/Pages/ForgotPage/ForgotPage';
import {CheckSuccess} from './features/Pages/ForgotPage/CheckSuccess/CheckSuccess';
import {ProfilePage} from './features/Pages/ProfilePage/ProfilePage';
import {ErrorPage} from './features/Pages/ErrorPage/ErrorPage';
import {ErrorSnackbar} from './features/Pages/ErrorSnackBar';



function App() {

    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress color={'secondary'}/>
        </div>
    }

    return (
        <div className={s.app}>
            <Routes>
                <Route path={PATH.LOGIN} element={<LoginPage/>}/>
                <Route path={PATH.REGISTER} element={<RegisterPage/>}/>
                <Route path={PATH.CREATE_PASS + '/:token'} element={<NewPassCreate/>}/>
                <Route path={PATH.FORGOT} element={<ForgotPage/>}/>
                <Route path={PATH.CHECK_SUCCESS} element={<CheckSuccess/>}/>
                <Route path={PATH.MAIN} element={<ProfilePage/>}/>
                <Route path={PATH.ERROR} element={<ErrorPage/>}/>
            </Routes>
            <ErrorSnackbar/>
        </div>
    )
}

export default App;
