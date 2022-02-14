import {instance} from './instance';


export type PayloadType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number,
    user_id?: string
};
export const cardsAPI = {
    getPack(data: PayloadType) {
        return instance.get<ResponseType>(`/cards/pack`, {params: data})
    }
}

export type CardPackType = {
    _id: string,
    user_id: string,
    user_name: string,
    private: boolean,
    name: string,
    path: string,
    grade: number,
    shots: number,
    deckCover: string,
    cardsCount: number,
    type: string,
    rating: number,
    created: string,
    updated: string,
    more_id: string,
    __v: number
}

export type CardPacksType = CardPackType[]

type ResponseType = {
    cardPacks: CardPacksType
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}