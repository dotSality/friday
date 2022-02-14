import {Navigate} from 'react-router-dom';
import {PATH} from '../../utils/paths';
import React, {useEffect} from 'react';
import {useAppSelector} from '../../bll/store';
import {fetchCards} from '../../bll/cards-reducer';
import {useDispatch} from 'react-redux';
import {CardPacksType} from '../../dal/cards-api';
import {Pack} from './Pack/Pack';
import {TablePacks} from './Pack/Table/Table';


export const Packs = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const cardPacks = useAppSelector<CardPacksType>(state => state.cards)
    const dispatch = useDispatch()

    console.log(cardPacks)
    useEffect(() => {
        dispatch(fetchCards())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div style={{alignItems: 'center', color: 'white'}}>
          <TablePacks/>
        </div>)
}