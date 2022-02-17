import React from 'react';
import {CardPackType} from "../../dal/packs-api";
import {useDispatch} from "react-redux";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from "@mui/material/IconButton";
import {filterPackTC} from "../../bll/packs-reducer";

type PropsType = {
    cardPacks: CardPackType[]
}


export const Table = (props: PropsType) => {

    const dispatch = useDispatch()

    const onClickHandlerDropUp = () => {
        return (
            dispatch(filterPackTC({sortPacks: "0updated"}))
        )
    }

    const onClickHandlerDown = () => {
        return (
            dispatch(filterPackTC({sortPacks: "1updated"}))
        )
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Cards</th>
                <th>Last Updated
                    <IconButton size={'small'} onClick={onClickHandlerDropUp}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={onClickHandlerDown}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Created by</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {props.cardPacks.map(item => (
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.cardsCount}</td>
                    <td>{item.updated.split('').slice(0, 10).join('')}</td>
                    <td>{item.created.split('').slice(0, 10).join('')}</td>
                    <td>
                        <button>Delete</button>
                        <button>Edit</button>
                        <button>Learn</button>
                    </td>
                </tr>
            ))}
            </tbody>

        </table>
    )
}