import React, {ChangeEvent, memo, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {Pack} from './Pack/Pack';
import {TextField} from '@mui/material';
import s from '../Pages/LoginPage/LoginPage.module.scss';
import {useDebounce} from '../../utils/debounce';
import loader from '../../common/img/loader.gif';
import {CustomMuiPagination} from '../Pagination/CustomMuiPagination';
import {CustomMuiSelect} from '../Select/CustomMuiSelect';
import {clearPacksData, createPack, fetchPacks} from '../../bll/packs-reducer';
import {NotAuthRedirect} from '../../hoc/NotAuthRedirect';

const Component = memo(() => {

    const {status} = useAppSelector(state => state.app)
    const {_id} = useAppSelector(state => state.profile)
    const {
        cardPacks,
        isLoaded,
        cardPacksTotalCount,
        pageCount,
        page: currentPage
    } = useAppSelector(state => state.packs)
    const dispatch = useAppDispatch()

    const [value, setValue] = useDebounce<string>(() => {
        dispatch(fetchPacks({
            packName: value,
            pageCount: 10
        }))
    }, '')

    useEffect(() => {
        return () => {
            dispatch(clearPacksData())
        }
    }, [])

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onPageChange = (page: number) => dispatch(fetchPacks({packName: value, page, pageCount}))
    const onChangePageCount = (pageCount: number) => dispatch(fetchPacks({packName: value, pageCount}))

    const [checked, setChecked] = useState<boolean>(false)
    const onLoggedUserPacksHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        await dispatch(fetchPacks({
            packName: value,
            page: currentPage,
            pageCount,
            user_id: !checked ? _id : undefined
        }));
        setChecked(!checked)
    }

    const mappedPacks = cardPacks.map(el => (<Pack key={el._id} cardPack={el}/>))

    const addPackHandler = () => {
        dispatch(createPack('Sality'))
    }

    if (!isLoaded) return <img src={loader} alt="aaaa"/>

    return (
        <div style={{alignItems: 'center', color: 'white'}}>
            <div style={{display: "flex", flexDirection: "column", width: '100px', height: "50px", justifyContent: "space-between"}}>
                <label htmlFor="checkbox">
                    My packs<input
                    disabled={status === 'loading'}
                    id={'checkbox'}
                    checked={checked}
                    onChange={onLoggedUserPacksHandler}
                    type='checkbox'
                />
                </label>
                <button onClick={addPackHandler}>ADDDD</button>
            </div>
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
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <CustomMuiPagination
                        totalItemsCount={cardPacksTotalCount}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        onSetNewPage={onPageChange}
                        disabled={status === 'loading'}
                    />
                    <CustomMuiSelect value={pageCount} onChangeOptions={onChangePageCount}/>

                </div>
            </div>
        </div>
    )
})

export const Packs = NotAuthRedirect(Component)