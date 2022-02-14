import React, {FC} from 'react';
import {CardPackType} from '../../../dal/cards-api';
import s from 'Pack.module.scss'

type PropsType = {
    cardPack: CardPackType
}

export const Pack:FC<PropsType> = ({cardPack}) => {
const {name,cardsCount,updated,user_name} = cardPack

    return (
        <tr>
            <td>{name}</td>
            <td>{cardsCount}</td>
            <td>{updated.split('').slice(0,9).join('')}</td>
            <td>{user_name}</td>

            <td>
                <button>Delete</button>
            </td>
            <td>
                <button>Edit</button>
            </td>
            <td>
                <button>Learn</button>
            </td>
        </tr>
        // <div style={{display:'flex',justifyContent:'space-between',maxWidth:'670px',width:'100%'}}>
        //     <div style={{width:'140px',marginRight:'10px'}}>{name}</div>
        //     <div style={{width:'40px',marginRight:'10px'}}>{cardsCount}</div>
        //     <div style={{width:'100px',marginRight:'10px'}}>{updated.split('').slice(0,9).join('')}</div>
        //     <div style={{width:'100px',marginRight:'10px',overflow:'hidden'}}>{user_name}</div>
        //     <div>
        //        <button>Delete</button>
        //        <button>Edit</button>
        //        <button>Learn</button>
        //     </div>
        // </div>
    )
}