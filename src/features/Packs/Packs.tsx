import React, {memo, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {Pack} from './Pack/Pack';
import loader from '../../common/img/loader.gif';
import {CustomMuiPagination} from '../Pagination/CustomMuiPagination';
import {CustomMuiSelect} from '../Select/CustomMuiSelect';
import {clearPacksData, createPack, fetchPacks, removePack, setOwn, updatePack} from '../../bll/packs-reducer';
import {NotAuthRedirect} from '../../hoc/NotAuthRedirect';
import {Input} from './Input/Input';
import {CardPackType, GetPacksPayloadType} from '../../dal/packs-api';
import {List} from "../List/List";
import c from '../../common/styles/Common.module.scss';
import {AddNewPackModal} from './Pack/Modals/AddNewPackModal/AddNewPackModal';
import {DoubleRangeInput} from "../DoubleRangeInput/DoubleRangeInput";

const Component = memo(() => {

    const {status} = useAppSelector(state => state.app)
    const {_id} = useAppSelector(state => state.profile)
    const {
        packs: {cardPacks, cardPacksTotalCount, pageCount, page, maxCardsCount, minCardsCount},
        isLoaded,
        own,
        value,
    } = useAppSelector(state => state.packs)

    const dispatch = useAppDispatch()


    const [min, setMin] = useState<number>(minCardsCount) // slider's state
    const [max, setMax] = useState<number>(maxCardsCount) // slider's state
    const [value3, setValue3] = useState<number[]>([min, max]) // slider's state
    console.log(value3)
    const fetchData: GetPacksPayloadType = {
        packName: value || '',
        page,
        pageCount,
        user_id: own ? _id : undefined,
        min,
        max
    }

    useEffect(() => {
        dispatch(fetchPacks(fetchData))
        return () => {
            dispatch(clearPacksData())
        }
    }, [value])

    const addPackHandler = (title: string) => {
        dispatch(createPack({
            fetchData, data:
                {name: title}
        }))
    }

    const onPageChange = (page: number) => dispatch(fetchPacks({...fetchData, page}))
    const onChangePageCount = (pageCount: number) => dispatch(fetchPacks({...fetchData, pageCount}))

    const onLoggedUserPacksHandler = async () => {
        setValue3([min, max])
        await dispatch(fetchPacks({...fetchData, user_id: !own ? _id : undefined}));
        dispatch(setOwn(!own))
    }

    const onchangeSliderValue = (value1: number, value2: number) => {
        dispatch(fetchPacks({...fetchData, min:value1, max:value2}))
    }


    const onRemovePackHandler = (packId: string) => dispatch(removePack({packId, fetchData}))

    const onUpdatePackHandler = (name: string, packId: string) => dispatch(updatePack({
        fetchData,
        data: {
            name,
            _id: packId
        },
    }))

    if (!isLoaded) return <img src={loader} alt="loader"/>

    return (

        <div style={{alignItems: 'center', color: 'white'}}>
            <div>
                <span>{max}</span>
                <DoubleRangeInput value1={min}
                                  value2={max}
                                  value3={value3}
                                  setValue1={setMin}
                                  setValue2={setMax}
                                  setValue3={setValue3}
                                  onchangeSliderValue={onchangeSliderValue}/>
                <span>{min < max ? min : max - 1}</span>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>

                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start"
                }}>
                    <AddNewPackModal addPackHandler={addPackHandler}/>
                    <div>
                        <button className={c.applyWideButton} disabled={status === 'loading'}
                                onClick={onLoggedUserPacksHandler}>
                            {own ? 'Show all packs' : 'Show my packs'}
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <Input placeholder={'Search by title'}/>
                {status === 'loading'
                    ? <img src={loader} alt="loader"/>
                    : <List items={cardPacks} renderItem={(cardPack: CardPackType) =>
                        <Pack updatePack={onUpdatePackHandler}
                              removePack={onRemovePackHandler}
                              key={cardPack._id}
                              cardPack={cardPack}/>}
                    />}
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