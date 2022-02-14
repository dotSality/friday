import React, {FC, useEffect} from 'react';
import {CardPackType} from '../../../dal/packs-api';
import {useAppDispatch} from '../../../bll/store';
import {setPackId} from '../../../bll/cards-reducer';
import {PATH} from '../../../utils/paths';
import {useNavigate} from 'react-router-dom';

type PropsType = {
    cardPack: CardPackType
}

export const Pack: FC<PropsType> = ({cardPack}) => {
    const {name, cardsCount, updated, user_name, _id} = cardPack

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const navigateToCardPage = () => {
        dispatch(setPackId(_id))
        navigate(PATH.CARDS + `/${_id}`)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', maxWidth: '670px', width: '100%'}}>
            <div style={{width: '140px', marginRight: '10px'}}>{name}</div>
            <div style={{width: '40px', marginRight: '10px'}}>{cardsCount}</div>
            <div style={{width: '100px', marginRight: '10px'}}>{updated.split('').slice(0, 9).join('')}</div>
            <div style={{width: '100px', marginRight: '10px', overflow: 'hidden'}}>{user_name}</div>
            <div>
                <button>Delete</button>
                <button>Edit</button>
                <button onClick={navigateToCardPage}>Learn</button>
            </div>
        </div>
    )
}