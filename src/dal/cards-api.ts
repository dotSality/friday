import {instance} from './instance';
import {CardsType} from '../bll/cards-reducer';

export const cardsAPI = {
    getCards(cardsPack_id: string, data?: GetCardsRequestType) {
        return instance.get<GetCardsResponseType>(`cards/card?cardsPack_id=${cardsPack_id}`, {params: data})
    },
    createCard(cardsPack_id: string, data?: CreateCardRequestType) {
        return instance.post(`cards/card?cardsPack_id=${cardsPack_id}`, data, {params: data})
    },
    deleteCard(cardsPack_id: string) {
        return instance.delete(`cards/card?id=${cardsPack_id}`)
    }
}

export type CreateCardRequestType = {
    question?: string,
    answer?: string,
    grade?: number,
    shots?: number,
    rating?: number,
    answerImg?: string,
    questionImg?: string,
    questionVideo?: string,
    answerVideo?: string,
    type?: string,
}

export type GetCardsRequestType = {
    cardQuestion?: string,
    cardAnswer?: string,
    min?: number,
    max?: number,
    sortCards?: number,
    page?: number,
    pageCount?: number,
}

export type GetCardsResponseType = {
    cards: CardsType[],
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    packUserId: string,
    page: number,
    pageCount: number,
    token: string,
    tokenDeathTime: number,
}