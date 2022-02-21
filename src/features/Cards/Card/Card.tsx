import React from 'react';
import {useAppSelector} from '../../../bll/store';
import {DeleteCardModal} from '../../CustomModals/DeleteCardModal/DeleteCardModal';
import {EditCardModal} from '../../CustomModals/EditCardModal/EditCardModal';

type CardPropsType = {
    deleteCard: (_id: string) => void,
    updateCard: (cardId: string, question: string, answer: string) => void,
    question: string,
    answer: string,
    updated: string,
    grade: number,
    _id: string,
    packUserId: string,
    userId: string,
}

export const Card = ({grade, updated, answer, question, _id, deleteCard, updateCard, packUserId, userId}: CardPropsType) => {

    // const {status} = useAppSelector(state => state.app)
    const deleteCardHandler = () => deleteCard(_id)

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <div style={{width: '200px', marginRight: '10px'}}>{question}</div>
            <div style={{width: '200px', marginRight: '10px'}}>{answer}</div>
            <div style={{width: '150px', marginRight: '10px'}}>{updated}</div>
            <div style={{width: '50px', marginRight: '10px',}}>{grade}</div>
            <div>
                <DeleteCardModal cardName={question} isDeletable={packUserId === userId} onRemoveCardHandler={deleteCardHandler}/>
                <EditCardModal q={question} a={answer} _id={_id} isEditable={packUserId === userId} updateCard={updateCard}/>
                {/*<button className={c.button} disabled={status === 'loading'}>Learn</button>*/}
            </div>
        </div>
    )
}