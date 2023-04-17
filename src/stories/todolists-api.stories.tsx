import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {todolistAPI} from "../api/ todolist-api";

export default {
    title: 'API',
    headers: {
        'API-KEY': '5890f4e2-76b4-4563-9720-2fca900697a1'
    }
}

const settings = {
    withCredentials: true
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title: 'second list'},
            settings)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID='b17aeafe-335f-4d64-9873-02e029ba04e9'
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`,
            settings)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID='5d1212f5-813b-42b8-8ed4-5b2010d82605'
        todolistAPI.updateTodolist(todolistID, 'SOME NEW TITLE')
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

