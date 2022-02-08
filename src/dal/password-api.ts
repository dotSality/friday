import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
})

export const passwordAPI = {
    recover(data: RecoverRequestType) {
        return instance.post<RecoverRequestType, AxiosResponse<RecoverResponseType>>('auth/forgot', data)
    },
    setNewPass(data: NewPassRequestType) {
        return instance.post<NewPassRequestType, AxiosResponse<NewPassResponseType>>('auth/set-new-password', data)
    },
}

export type NewPassRequestType = {
    password: string,
    resetPasswordToken: string,
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