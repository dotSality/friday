import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
})

// https://neko-back.herokuapp.com/2.0
// http://localhost:7542/2.0/

// api
export const cardsAPI = {
    registration(email: string, password: string) {
        return instance.post<AxiosResponse<ResponseType>>('auth/register', {email, password});
    },
    recover(email: string) {
        return instance.post('auth/forgot', {email})
    },
    login(email: string, password: string, rememberMe:boolean) {
        return instance.post(`auth/login`, {email, password,rememberMe})
    }
}

// types

export type LoginResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

export type RegisterResponseType = {
    addedUser: {
        "_id": string,
        "email": string,
        "rememberMe": boolean,
        "isAdmin": boolean,
        "name": string,
        "verified": boolean,
        "publicCardPacksCount": number,
        "created": string,
        "updated": string,
        "__v": number
    }
    error?: string
}