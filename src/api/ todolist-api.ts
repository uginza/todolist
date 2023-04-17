import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '5890f4e2-76b4-4563-9720-2fca900697a1',
    },
}

type TodolistType={
    id:string,
    title:string,
    addedDate:string,
    order:number
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put<Array<TodolistType>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            { title: title },
            settings
        )
        return promise
    },
    DeleteTodolist(todolistId: string) {
        const promise = axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            settings
        )
        return promise
    },
    CreateTodolist(title: string) {
        const promise = axios.post(
            `https://social-network.samuraijs.com/api/1.1/todo-lists`,
            { title: title },
            settings
        )
        return promise
    },
    GetTodolists() {
        const promise = axios.get<TodolistType[]>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists`,
            settings
        )
        return promise
    },
}
