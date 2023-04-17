import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '5890f4e2-76b4-4563-9720-2fca900697a1',
    },
})


type TodolistType={
    id:string,
    title:string,
    addedDate:string,
    order:number
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TodolistType
    }
}

type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}

type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<UpdateTodolistResponseType>(
            `todo-lists/${todolistId}`,
            { title: title }
        )
        return promise
    },
    DeleteTodolist(todolistId: string) {
        const promise = instance.delete<DeleteTodolistResponseType>(
            `todo-lists/${todolistId}`
        )
        return promise
    },
    CreateTodolist(title: string) {
        const promise = instance.post<CreateTodolistResponseType>(
            `todo-lists`,
            { title: title }
        )
        return promise
    },
    GetTodolists() {
        const promise = instance.get<TodolistType[]>(
            `todo-lists`)
        return promise
    },
}
