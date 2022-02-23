import React from 'react';
import {CardType} from "../../bll/cards-reducer";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from "@mui/material/IconButton";

import {ItemCard} from "./ItemCard";
import {sortValues} from "../../dal/packs-api";


type PropsType = {
    items: CardType[]
    onSetGradeHandler: (grade: number, card_id: string) => void
    deleteCard: (_id: string) => void
    updateCard: (cardId: string, question: string, answer: string) => void
    packUserId: string
    userId: string
    onChangeFilterCards: (sortCards: string) => void
}

export const TableCards = (props: PropsType) => {

    return (
        <table>
            <thead>
            <tr>
                <th>Question
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterCards(sortValues.questionFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterCards(sortValues.questionTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Answer
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterCards(sortValues.answerFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterCards(sortValues.answerTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>

                <th>Last Updated
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterCards(sortValues.updatedFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterCards(sortValues.updatedTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Grade
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterCards(sortValues.gradeFalse)}>
                        <ArrowDropUpIcon/>
                    </IconButton>
                    <IconButton size={'small'} onClick={()=>props.onChangeFilterCards(sortValues.gradeTrue)}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {props.items.map(el => {

                return <ItemCard el={el}
                                 deleteCard={props.deleteCard}
                                 userId={props.userId}
                                 packUserId={props.packUserId}
                                 onSetGradeHandler={props.onSetGradeHandler}
                                 updateCard={props.updateCard}/>
            })}
            </tbody>
        </table>
    )
}