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

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export const tasksAPI = {
    updateTasks(todolistId: string,taskId:string, title: string) {
        return instance.put(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            { title: title }
        )

    },
    DeleteTasks(todolistId: string,taskId:string) {
        return instance.delete(
            `todo-lists/${todolistId}/tasks/${taskId}`
        )
    },
    CreateTasks(todolistId: string,title: string) {
        return instance.post(
            `todo-lists/${todolistId}/tasks`,
            { title: title }
        )
            },
    GetTasks(todolistId:string) {
        return instance.get(
            `todo-lists/${todolistId}/tasks`)
            },
}