import {instance} from './instance';


export type PayloadType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number,
    user_id?: string,
    "0updated"?: string,
    "1updated"?: string,
};
export const packsApi = {
    getPack(data: PayloadType) {
        return instance.get<ResponseType>(`/cards/pack`, {params: data})
    },
    addPack(name: string) {
        return instance.post<AddPackResponseType>(`/cards/pack`, {cardsPack: {name}})
    },
    deletePack(id: string) {
        return instance.delete<ResponseType>(`/cards/pack?id=${id}`, {})
    },
    updatePack(name: string, _id: string) {
        return instance.put<ResponseType>(`/cards/pack`, {cardsPack: {name, _id}})
    },
}

//shop?min=100&max=50000&page=1&pageCount=10&sortProducts=0price&

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

export type AddPackResponseType = {
    newCardsPack: CardPackType;
};

