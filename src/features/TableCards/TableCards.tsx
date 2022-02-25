import React from 'react';
import {CardType} from "../../bll/cards-reducer";

import {ItemCard} from "./ItemCard";
import {ButtonSort} from "../ButtonSort/ButtonSort";

type PropsType = {
    items: CardType[]
    onSetGradeHandler: (grade: number, card_id: string) => void
    deleteCard: (_id: string) => void
    updateCard: (cardId: string, question: string, answer: string) => void
    packUserId: string
    userId: string
    onChangeFilterCards: (sortCards: string) => void
}

const sortCardsNames = [
    {name:'name', columnsName:'Question'},
    {name:'cardsCount', columnsName:'Answer'},
    {name:'updated', columnsName:'Last Updated'},
    {name:'created', columnsName:'Grade'},
    {name:'actions', columnsName:'Actions'},
]

export const TableCards = React.memo(({
                                          items,
                                          onSetGradeHandler,
                                          deleteCard,
                                          updateCard,
                                          packUserId,
                                          userId,
                                          onChangeFilterCards
                                      }: PropsType) => {

    return (
        <table>
            <thead>
            <tr>

                {sortCardsNames.map(el => {
                    return <th key={el.name}>{el.columnsName}
                        <ButtonSort onChangeFilterValue={onChangeFilterCards}  sortTableColumn={el.name}/>
                    </th>
                })}
                {/*<th>Question*/}
                {/*    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.questionFalse)}>*/}
                {/*        <ArrowDropUpIcon/>*/}
                {/*    </IconButton>*/}
                {/*    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.questionTrue)}>*/}
                {/*        <ArrowDropDownIcon/>*/}
                {/*    </IconButton>*/}
                {/*</th>*/}
                {/*<th>Answer*/}
                {/*    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.answerFalse)}>*/}
                {/*        <ArrowDropUpIcon/>*/}
                {/*    </IconButton>*/}
                {/*    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.answerTrue)}>*/}
                {/*        <ArrowDropDownIcon/>*/}
                {/*    </IconButton>*/}
                {/*</th>*/}
                {/*<th>Last Updated*/}
                {/*    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.updatedFalse)}>*/}
                {/*        <ArrowDropUpIcon/>*/}
                {/*    </IconButton>*/}
                {/*    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.updatedTrue)}>*/}
                {/*        <ArrowDropDownIcon/>*/}
                {/*    </IconButton>*/}
                {/*</th>*/}
                {/*<th>Grade*/}
                {/*    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.gradeFalse)}>*/}
                {/*        <ArrowDropUpIcon/>*/}
                {/*    </IconButton>*/}
                {/*    <IconButton size={'small'} onClick={() => onChangeFilterCards(sortValues.gradeTrue)}>*/}
                {/*        <ArrowDropDownIcon/>*/}
                {/*    </IconButton>*/}
                {/*</th>*/}
                {/*<th>Action</th>*/}
            </tr>
            </thead>
            <tbody>
            {items.map(el => {
                return <ItemCard key={el._id}
                                 pack={el}
                                 deleteCard={deleteCard}
                                 userId={userId}
                                 packUserId={packUserId}
                                 onSetGradeHandler={onSetGradeHandler}
                                 updateCard={updateCard}/>
            })}
            </tbody>
        </table>
    )
})