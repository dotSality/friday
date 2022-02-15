import {Navigate} from 'react-router-dom';
import {PATH} from '../../utils/paths';
import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {fetchCards} from '../../bll/cards-reducer';
import {Pack} from './Pack/Pack';
import {TextField} from '@mui/material';
import s from '../Pages/LoginPage/LoginPage.module.scss';
import {useDebounce} from '../../utils/debounce';
import loader from '../../common/img/loader.gif';
import {CustomMuiPagination} from "../Pagination/CustomMuiPagination";
import {CustomMuiSelect} from "../Select/CustomMuiSelect";

export const Packs = () => {

    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const {cardPacks, isLoaded} = useAppSelector(state => state.cards)
    const pageCount = useAppSelector<number>(state => state.cards.pageCount)
    const dispatch = useAppDispatch()

    let [value, setValue] = useDebounce<string>(() => {
        dispatch(fetchCards({
            packName: value,
            pageCount: 10
        }))
    }, '')

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onPageChange = (page:number) => dispatch(fetchCards({page, pageCount}))
    const onChangePageCount = (pageCount:number) => dispatch(fetchCards({pageCount}))



    const mappedPacks = cardPacks.map(el => (<Pack key={el._id} cardPack={el}/>))


    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    if (!isLoaded) return <img src={loader} alt="aaaa"/>

    return (<>
        <div style={{alignItems: 'center', color: 'white'}}>
            <div>
                <TextField
                    className={s.textField}
                    value={value}
                    onChange={onInputChangeHandler}
                    sx={{width: '200px'}}
                    margin={'normal'}
                    id="outlined-basic"
                    variant="standard"
                /> {mappedPacks}
                <div style={{display: 'flex', justifyContent:'space-around'}}>
                    <CustomMuiPagination onSetNewPage={onPageChange}/>
                    <CustomMuiSelect value={pageCount} onChangeOptions={onChangePageCount}/>
                    {/*<Pagination portionSize={10} onSetNewPage={onPageChange}/>*/}
                </div>

            </div>
        </div>
        </>
    )
}