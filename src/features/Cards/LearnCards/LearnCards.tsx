import s from './LearnCards.module.scss';
import {memo, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
// import {fetchCards, removeCard, setSum} from '../../../bll/cards-reducer';
import {useParams} from 'react-router-dom';
import {NotAuthRedirect} from '../../../hoc/NotAuthRedirect';

const Component = memo(() => {

    const currentCards = useAppSelector(state => state.cards.cardsData.cards)
    // const sum = useAppSelector(state => state.cards.sum)
    const dispatch = useAppDispatch()
    const {cardsPack_id} = useParams()
    console.log(cardsPack_id)
    // useEffect(() => {
    //     if (currentCards.length === 0 && cardsPack_id) {
    //         dispatch(fetchCards({
    //             cardsPack_id,
    //             page: 1,
    //             pageCount: 10,
    //         }))
    //     }
    // }, [currentCards])

    const randomIndex = Math.floor(Math.random() * currentCards.length)
    // const card = currentCards.filter(c => c.grade < 7 - sum)[randomIndex]
    // console.log(sum)
    // const nextCard = () => {
    //     if (sum < 7) {
    //         dispatch(setSum(sum + card.grade))
    //     } else {
    //         dispatch(setSum(0))
    //     }
    //     dispatch(removeCard(card._id))
    // }

    return (
        <div className={s.mainContainer}>
            <div className={s.container}>
                {/*{sum && sum}*/}
                {/*<button onClick={nextCard}>Next</button>*/}
                NOTHING
            </div>
        </div>
    )
})

export const LearnCards = NotAuthRedirect(Component)