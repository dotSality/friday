import {Navigate} from 'react-router-dom';
import {PATH} from '../../utils/paths';
import React, {ChangeEvent, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {clearPacksData, fetchCards} from '../../bll/cards-reducer';
import {Pack} from './Pack/Pack';
import {TextField} from '@mui/material';
import s from '../Pages/LoginPage/LoginPage.module.scss';
import {useDebounce} from '../../utils/debounce';
import loader from '../../common/img/loader.gif';
import {Pagination} from "../Pagination/Pagination";
import EnhancedTable from "./TableSort";

export const Packs = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const {cardPacks, isLoaded} = useAppSelector(state => state.cards)
    const dispatch = useAppDispatch()

    let [value, setValue] = useDebounce<string>(() => {
        dispatch(fetchCards({
            packName: value,
        }))
    }, '')
    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

    useEffect(() => {
        return () => {
            dispatch(clearPacksData())
        }
    }, [])


    const onPageChange = (page:number) => dispatch(fetchCards({page}))


    const mappedPacks = cardPacks.map(el => (<Pack key={el._id} cardPack={el}/>))


    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    if (!isLoaded) return <img src={loader} alt="aaaa"/>

    return (
        <div style={{alignItems: 'center', color: 'white'}}>
            <div>
                <EnhancedTable/>
                <TextField
                    className={s.textField}
                    value={value}
                    onChange={onInputChangeHandler}
                    sx={{width: '200px'}}
                    margin={'normal'}
                    id="outlined-basic"
                    variant="standard"
                /> {mappedPacks}
                <Pagination portionSize={10} onSetNewPage={onPageChange}/>
            </div>
        </div>
    )
}