import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

import {CircularProgress} from "@mui/material";

import {Links} from './Links/Links';
import {AllRoutes} from './AllRoutes/AllRoutes';
import {initializeApp} from "./bll/app-reducer";
import {useAppSelector} from "./bll/store";

import s from './App.module.scss'
import {ErrorSnackbar} from "./AllRoutes/Pages/ErrorSnackBar";



function App() {

    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress color={'primary'}/>
        </div>
    }

    return (
        <div className={s.app}>
            <Links/>
            <AllRoutes/>
            <ErrorSnackbar/>
        </div>
    )
}

export default App;
