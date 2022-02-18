import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../bll/store';

type CardPropsType = {
    deleteCard: (_id: string) => void,
    updateCard: (_id: string) => void,
    question: string,
    answer: string,
    updated: string,
    grade: number,
    _id: string,
}

export const Card = ({grade, updated, answer, question, _id, deleteCard, updateCard}: CardPropsType) => {

    const {status} = useAppSelector(state => state.app)
    const deleteCardHandler = () => deleteCard(_id)
    const updateCardHandler = () => updateCard(_id)

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '670px', width: '100%'}}>
            <div style={{width: '200px', marginRight: '10px'}}>{question}</div>
            <div style={{width: '200px', marginRight: '10px'}}>{answer}</div>
            <div style={{width: '150px', marginRight: '10px'}}>{updated}</div>
            <div style={{width: '50px', marginRight: '10px',}}>{grade}</div>
            <div>
                <button onClick={deleteCardHandler} disabled={status === 'loading'}>Delete</button>
                <button onClick={updateCardHandler} disabled={status === 'loading'}>Edit</button>
                <button disabled={status === 'loading'}>Learn</button>
            </div>
        </div>
    )
}