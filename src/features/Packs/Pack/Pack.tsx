import React, {FC} from 'react';
import {CardPackType} from '../../../dal/packs-api';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {setPackId} from '../../../bll/cards-reducer';
import {PATH} from '../../../utils/paths';
import {NavLink, useNavigate} from 'react-router-dom';

type PropsType = {
    cardPack: CardPackType
    removePack: (_id: string) => void,
    updatePack: (_id: string) => void,
}

export const Pack: FC<PropsType> = ({cardPack, removePack, updatePack}) => {
    const {name, cardsCount, updated, user_name, _id,} = cardPack
    const {status} = useAppSelector(state => state.app)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const navigateToCardPage = () => {
        dispatch(setPackId(_id))
        navigate(PATH.CARDS + `/${_id}`)
    }

    const onUpdatePackHandler = () => updatePack(_id)
    const onRemovePackHandler = () => removePack(_id)

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', maxWidth: '670px', width: '100%'}}>
            <NavLink to={PATH.CARDS + `/${_id}`}>
                <div style={{width: '140px', marginRight: '10px'}}>{name}</div>
            </NavLink>
            <div style={{width: '40px', marginRight: '10px'}}>{cardsCount}</div>
            <div style={{width: '100px', marginRight: '10px'}}>{updated.split('').slice(0, 10).join('')}</div>
            <div style={{width: '100px', marginRight: '10px', overflow: 'hidden'}}>{user_name}</div>
            <div>
                <button disabled={status === 'loading'} onClick={onRemovePackHandler}>Delete</button>
                <button disabled={status === 'loading'} onClick={onUpdatePackHandler}>Edit</button>
                <button disabled={status === 'loading'} onClick={navigateToCardPage}>Learn</button>
            </div>
        </div>
    )
}