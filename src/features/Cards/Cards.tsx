import React, {memo, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../bll/store';
import {clearCardsData, createCard, deleteCard, fetchCards, setGrade, updateCard} from '../../bll/cards-reducer';
import {NotAuthRedirect} from '../../hoc/NotAuthRedirect';
import {GetCardsRequestType} from '../../dal/cards-api';
import {CustomMuiPagination} from '../Pagination/CustomMuiPagination';
import {CustomMuiSelect} from '../Select/CustomMuiSelect';
import {AddNewCardModal} from '../CustomModals/AddNewCardModal/AddNewCardModal';
import {TableCards} from "../TableCards/TableCards";
import loader from '../../common/img/loader.gif';
import s from './Cards.module.scss'


const Component = memo(() => {

    const {cardsPack_id} = useParams()
    const dispatch = useAppDispatch()
    const {cardsData, packId, isLoaded} = useAppSelector(state => state.cards)
    const {status} = useAppSelector(state => state.app)
    const {_id} = useAppSelector(state => state.profile)

    const {cards, cardsTotalCount, pageCount, page, packUserId} = cardsData

    const fetchData: GetCardsRequestType = {
        cardsPack_id: packId!,
        page,
        pageCount,
        sortCards: "",
    }

    const onCreateCardHandler = (question: string, answer: string) => dispatch(createCard({
        fetchData,
        data: {
            cardsPack_id: cardsPack_id || packId!, question, answer,
        }
    }))
    const onSetNewPageHandler = (value: number) => dispatch(fetchCards({...fetchData, page: value}))
    const onChangeOptionsHandler = (value: number) => dispatch(fetchCards({...fetchData, pageCount: value}))
    const onDeleteCardHandler = (cardId: string) => dispatch(deleteCard({fetchData, cardId}))
    const onUpdateCardHandler = (cardId: string, question: string, answer: string) => dispatch(updateCard({
        fetchData: {
            ...fetchData,
            cardsPack_id: packId!,
        },
        data: {
            _id: cardId,
            question,
            answer,
        }
    }))
    const onSetGradeHandler = (grade: number, card_id: string) => dispatch(setGrade({
        fetchData,
        data: {
            grade, card_id
        }
    }))
    const onChangeFilterCards = (sortCards: string) => dispatch(fetchCards({...fetchData, sortCards}))


    useEffect(() => {
        if (packId) {
            dispatch(fetchCards({
                cardsPack_id: packId,
                pageCount,
                cardAnswer: '',
            }))
        } else {
            cardsPack_id && dispatch(fetchCards({
                cardsPack_id,
                pageCount,
                cardAnswer: '',
            }))
        }
        return () => {
            dispatch(clearCardsData())
        }
    }, [])

    if (!isLoaded) return <img src={loader} alt="loader"/>

    return (
        <div className={s.cardsContainer}>
            {_id === packUserId && <AddNewCardModal addCardHandler={onCreateCardHandler}/>}
            {
                cards.length > 0
                    ? (<>
                        <TableCards items={cards}
                                    onSetGradeHandler={onSetGradeHandler}
                                    updateCard={onUpdateCardHandler}
                                    deleteCard={onDeleteCardHandler}
                                    packUserId={packUserId!}
                                    userId={_id}
                                    onChangeFilterCards={onChangeFilterCards}
                        />
                        <div style={{display: 'flex', alignSelf: 'flex-start'}}>
                            <CustomMuiPagination
                                onSetNewPage={onSetNewPageHandler}
                                totalItemsCount={cardsTotalCount}
                                pageCount={pageCount}
                                currentPage={page}
                                disabled={status === 'loading'}
                            />
                            <CustomMuiSelect disabled={status === 'loading'}
                                             value={pageCount}
                                             onChangeOptions={onChangeOptionsHandler}/>
                        </div>
                    </>)
                    : <span style={{fontSize: '70px'}}>no packs</span>
            }
        </div>
    )
});

export const Cards = NotAuthRedirect(Component)