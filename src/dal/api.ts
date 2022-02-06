import axios from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    headers: {
        withCredentials: true
    }
})

export const api = {
    recover(email: string) {
        return instance.post('auth/forgot', {email})
    }
}

