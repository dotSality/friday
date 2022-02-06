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
}

// types
export type ResponseType = {
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