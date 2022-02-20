import React, {FC} from 'react';
import {CardPackType} from '../../../dal/packs-api';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {setPackId} from '../../../bll/cards-reducer';
import {PATH} from '../../../utils/paths';
import {NavLink, useNavigate} from 'react-router-dom';
import s from './Pack.module.scss';
import Button from '@mui/material/Button/Button';
import {EditModal} from './Modals/EditModal/EditModal';
import {DeleteModal} from './Modals/DeleteModal/DeleteModal';

type PropsType = {
    cardPack: CardPackType
    removePack: (_id: string) => void,
    updatePack: (name: string, _id: string) => void,
}

export const Pack: FC<PropsType> = ({cardPack, removePack, updatePack}) => {
    const {name, cardsCount, updated, user_name, _id, user_id} = cardPack
    const {status} = useAppSelector(state => state.app)
    const profileId = useAppSelector(state => state.profile._id)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const navigateToCardPage = () => {
        dispatch(setPackId(_id))
        navigate(PATH.CARDS + `/${_id}`)
    }

    const onRemovePackHandler = () => removePack(_id)

    return (
        <div className={s.packContainer}>
            <NavLink to={PATH.CARDS + `/${_id}`}>
                <div style={{width: '140px', marginRight: '10px'}}>{name}</div>
            </NavLink>
            <div className={s.packContent}>
                <span>{cardsCount}</span>
                <span>{updated.split('').slice(0, 10).join('')}</span>
                <span>{user_name}</span>
            </div>
            <div>
                <DeleteModal packName={name} onRemovePackHandler={onRemovePackHandler}/>
                <EditModal _id={_id} isEditable={profileId === user_id} updatePack={updatePack}/>
                <Button size={'small'} variant={'text'} color={'primary'} disabled={status === 'loading'} onClick={navigateToCardPage}>Learn</Button>
            </div>
        </div>
    )
}