import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {fetchCards} from '../../bll/cards-reducer';
import loader from '../../common/img/loader.gif';

export const Cards = () => {

    const {cards, packId} = useAppSelector(state => state.cards)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (packId) dispatch(fetchCards(packId))
    },[])

    if (!cards) return <img src={loader} alt="aaaa"/>

    return (
        <div style={{marginTop: '70px', alignItems: 'center', color: 'white'}}>
            {!cards ? <img src={loader} alt="aaaa"/>
            : cards.map(el => {
                    return <div style={{minHeight: '100%', border: '1px solid black'}}>
                        <div style={{width: '140px', marginRight: '10px'}}>{el.question}</div>
                        <div style={{width: '40px', marginRight: '10px'}}>{el.answer}</div>
                        <div style={{width: '100px', marginRight: '10px'}}>{el.created}</div>
                        <div style={{width: '100px', marginRight: '10px', overflow: 'hidden'}}>{el.updated}</div>
                    </div>
                })}
        </div>
    )
}