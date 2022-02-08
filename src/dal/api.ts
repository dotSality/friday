import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
})

// https://neko-back.herokuapp.com/2.0
// http://localhost:7542/2.0/

// api
export const cardsAPI = {
    registration(email: string, password: string) {
        return instance.post<AxiosResponse<RegisterResponseType, {email: string, password: string}>>('auth/register', {email, password});
    },
    recover(data: RecoverRequestType) {
        return instance.post<RecoverRequestType, AxiosResponse<RecoverResponseType>>('auth/forgot', data)
    },
    setNewPass(data: NewPassRequestType) {
        return instance.post<NewPassRequestType, AxiosResponse<any>>('auth/set-new-password', data)
    },
    login(email: string, password: string, rememberMe:boolean) {
        return instance.post<{email: string, password: string, rememberMe:boolean}, AxiosResponse<LoginResponseType>>(`auth/login`, {email, password,rememberMe})
    },
    logout() {
        return instance.delete<{info: string, error: string}>(`/auth/me`)
    },
    authMe () {
        return instance.post<LoginResponseType, {}>(`/auth/me`)
    },
    changeUserData (userData: UserDataType) {
        return instance.put(`auth/me`, userData)
    }

}

// types

type UserDataType = {
    name?:string
    avatar?:string
}

type NewPassRequestType = {
    pass: string,
    token: string,
}

type NewPassResponseType = {
    info: string
}

type RecoverRequestType = {
    email: string,
    from: string,
    message: string,
}

type RecoverResponseType = {
    answer: boolean,
    html: boolean,
    info: string,
    success: boolean,
}

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
        _id: string,
        email: string,
        rememberMe: boolean,
        isAdmin: boolean,
        name: string,
        verified: boolean,
        publicCardPacksCount: number,
        created: string,
        updated: string,
        __v: number
    }
    error?: string
}


