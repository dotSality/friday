import {Navigate, Routes, useNavigate} from 'react-router-dom';
import {PATH} from '../../utils/paths';
import React, {ChangeEvent, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {clearPacksData, fetchPacks} from '../../bll/packs-reducer';
import {Pack} from './Pack/Pack';
import {TextField} from '@mui/material';
import s from '../Pages/LoginPage/LoginPage.module.scss';
import {useDebounce} from '../../utils/debounce';
import loader from '../../common/img/loader.gif';
import {Pagination} from "../Pagination/Pagination";
import EnhancedTable from "./TableSort";

export const Packs = () => {

    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const {cardPacks, isLoaded} = useAppSelector(state => state.packs)
    const dispatch = useAppDispatch()
    const packsOnPage = 10

    let [value, setValue] = useDebounce<string>(() => {
        dispatch(fetchPacks({
            packName: value,
            pageCount: packsOnPage,
        }))
    }, '')
    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

    useEffect(() => {
        return () => {
            dispatch(clearPacksData())
        }
    }, [])


    const onPageChange = (page:number) => dispatch(fetchPacks({page, pageCount: packsOnPage}))


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
                <Pagination portionSize={packsOnPage} onSetNewPage={onPageChange}/>
            </div>
        </div>
    )
}