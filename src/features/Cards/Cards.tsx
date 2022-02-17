import React, {memo, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {clearCardsData, createCard, deleteCard, fetchCards} from '../../bll/cards-reducer';
import loader from '../../common/img/loader.gif';
import {Card} from './Card/Card';
import s from './Cards.module.scss'
import {CustomMuiPagination} from '../Pagination/CustomMuiPagination';
import {CustomMuiSelect} from '../Select/CustomMuiSelect';
import {useParams} from 'react-router-dom';
import {NotAuthRedirect} from '../../hoc/NotAuthRedirect';

const Component = memo(() => {

    const {cardsPack_id} = useParams()
    const {cardsData, packId, isLoaded} = useAppSelector(state => state.cards)
    const {status} = useAppSelector(state => state.app)

    const {cards, cardsTotalCount, pageCount, page, minGrade, maxGrade, packUserId} = cardsData

    const dispatch = useAppDispatch()

    const onCreateCardHandler = () => dispatch(createCard({
        fetchData: {
            cardsPack_id: packId!,
            page,
            pageCount
        },
        data: {
            cardsPack_id: cardsPack_id || packId!, question: 'Max'
        }
    }))

    const onSetNewPageHandler = (value: number) => packId && dispatch(fetchCards({cardsPack_id: packId, page: value, pageCount}))

    const onChangeOptionsHandler = (value: number) => packId && dispatch(fetchCards({cardsPack_id: packId, pageCount: value}))

    const onDeleteCardHandler = (cardId: string) => dispatch(deleteCard({
        fetchData: {
            cardsPack_id: packId!,
            page,
            pageCount
        },
        cardId
    }))

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

    if (!isLoaded) return <img src={loader} alt="aaaa"/>

    return (
        <div className={s.cardsContainer}>
            <button disabled={status === 'loading'} onClick={onCreateCardHandler}>Add card</button>
            {
                cards.length > 0
                    ? (<>
                        {cards.map(({answer, question, updated, grade, _id}) =>
                            <Card key={updated}
                                deleteCard={onDeleteCardHandler}
                                _id={_id}
                                answer={answer}
                                grade={grade}
                                question={question}
                                updated={updated}/>)}
                        <div style={{display: 'flex', alignSelf: 'flex-start'}}>
                            <CustomMuiPagination
                                onSetNewPage={onSetNewPageHandler}
                                totalItemsCount={cardsTotalCount}
                                pageCount={pageCount}
                                currentPage={page}
                                disabled={status === 'loading'}
                            />
                            <CustomMuiSelect value={pageCount} onChangeOptions={onChangeOptionsHandler}/>
                        </div>
                    </>)
                    : (
                        <span style={{fontSize: '70px'}}>no packs</span>
                    )
            }
        </div>
    )
});

export const Cards = NotAuthRedirect(Component)