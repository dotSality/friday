import React, {useEffect, useState} from 'react';
import {CardPackType, sortValues} from "../../dal/packs-api";
import {useDispatch} from "react-redux";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from "@mui/material/IconButton";
//import {filterPackTC} from "../../bll/packs-reducer";

type PropsType = {
    cardPacks: CardPackType[]
    onChangeFilterPacks: (sortPacks: string) => void
}


export const Table = (props: PropsType) => {

    const dispatch = useDispatch()

    /*    const onClickHandlerDropUp = () => {
            return (
                /!*dispatch(filterPackTC({sortPacks: "0updated"}))*!/
            //dispatch(filterPack({cardPacks: res.data.cardPacks}))
            )
        }

        const onClickHandlerDown = () => {
            return (
                /!*dispatch(filterPackTC({sortPacks: "1updated"}))*!/
            )
        }*/

    return (
        <table>
            <thead>
            <tr>
                <th>Name
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterPacks(sortValues.nameFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterPacks(sortValues.nameTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Cards
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterPacks(sortValues.cardsCountFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterPacks(sortValues.cardsCountTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>

                <th>Last Updated
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterPacks(sortValues.updatedFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterPacks(sortValues.updatedTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Created by
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterPacks(sortValues.createdFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterPacks(sortValues.createdTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
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