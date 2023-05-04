import axios from 'axios'
import {ResponseType, TodolistType} from "./ todolist-api";

// api

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '5890f4e2-76b4-4563-9720-2fca900697a1',
    },
})


export const authAPI = {
    login(data:LoginParamsType){
        const promise = instance.post<ResponseType<{data: LoginParamsType}>>(
            `/auth/login`,data
        )
        return promise
    },
    me(){
        const promise = instance.get<ResponseType<{id:number,login:string,email:string}>>(
            `/auth/me`
        )
        return promise
    }
}


//types

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}