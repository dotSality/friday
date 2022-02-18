import React, {ChangeEvent, KeyboardEvent, memo, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {Pack} from './Pack/Pack';
import loader from '../../common/img/loader.gif';
import {CustomMuiPagination} from '../Pagination/CustomMuiPagination';
import {CustomMuiSelect} from '../Select/CustomMuiSelect';
import {clearPacksData, createPack, fetchPacks, removePack, setOwn, updatePack} from '../../bll/packs-reducer';
import {NotAuthRedirect} from '../../hoc/NotAuthRedirect';
import {Input} from './Input/Input';
import {GetPacksPayloadType} from '../../dal/packs-api';

const Component = memo(() => {

    const {status} = useAppSelector(state => state.app)
    const {_id} = useAppSelector(state => state.profile)
    const {
        packs: {cardPacks, cardPacksTotalCount, pageCount, page},
        isLoaded,
        own,
        value,
    } = useAppSelector(state => state.packs)
    const dispatch = useAppDispatch()

    const fetchData: GetPacksPayloadType = {
        packName: value || '',
        page,
        pageCount,
        user_id: own ? _id : undefined,
    }

    useEffect(() => {
        dispatch(fetchPacks(fetchData))
        return () => {
            dispatch(clearPacksData())
        }
    }, [value])

    const [title, setTitle] = useState<string>('')
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onPageChange = (page: number) => dispatch(fetchPacks({...fetchData, page}))
    const onChangePageCount = (pageCount: number) => dispatch(fetchPacks({...fetchData, pageCount}))

    const onLoggedUserPacksHandler = async () => {
        await dispatch(fetchPacks({...fetchData, user_id: !own ? _id : undefined}));
        dispatch(setOwn(!own))
    }

    const addPackHandler = () => {
        dispatch(createPack({
            fetchData, data:
                {name: title}
        }))
        setTitle('')
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addPackHandler()
    }

    const onRemovePackHandler = (packId: string) => dispatch(removePack({packId, fetchData}))

    const onUpdatePackHandler = (packId: string) => dispatch(updatePack({
        fetchData,
        data: {
            name: 'Misha Krug',
            _id: packId
        },
    }))

    const mappedPacks = cardPacks.map(el =>
        (<Pack
            updatePack={onUpdatePackHandler}
            removePack={onRemovePackHandler}
            key={el._id}
            cardPack={el}/>))

    if (!isLoaded) return <img src={loader} alt="aaaa"/>

    return (
        <div style={{alignItems: 'center', color: 'white'}}>
            <div style={{display: "flex", flexDirection: "column", width: '100px', height: "50px", justifyContent: "space-between"}}>
                <button disabled={status === 'loading'} onClick={onLoggedUserPacksHandler}>
                    {own ? 'Show all packs' : 'Show my packs'}
                </button>
                <div style={{display: "flex", flexDirection: "row", width: '300px', height: "50px", justifyContent: "space-between"}}>
                    <input
                        onKeyPress={onEnterPressHandler}
                        style={{height: '30px'}}
                        placeholder={'Enter pack title'}
                        onChange={onTitleChangeHandler}
                        value={title}
                    />
                    <button disabled={status === 'loading'} onClick={addPackHandler}>ADDDD</button>
                </div>
            </div>
            <div>
                <Input placeholder={'Search by title'}/>
                {status === 'loading' ? <img src={loader} alt="aaaa"/> : mappedPacks}
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <CustomMuiPagination
                        totalItemsCount={cardPacksTotalCount}
                        pageCount={pageCount}
                        currentPage={page}
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