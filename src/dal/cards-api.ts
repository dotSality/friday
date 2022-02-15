import {instance} from './instance';
import {CardsType} from '../bll/cards-reducer';

export const cardsAPI = {
    getCards(cardsPack_id: string, data?: GetCardsPayloadType) {
        return instance.get<GetCardsResponseType>(`cards/card?cardsPack_id=${cardsPack_id}`, {params: data})
    }
}

export type GetCardsPayloadType = {
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

