import axios from 'axios'

// api

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '5890f4e2-76b4-4563-9720-2fca900697a1',
    },
})

export const tasksAPI = {
    updateTasks(taskId: string,model: UpdateTaskModelType,todolistId: string) {
        return instance.put<ResponseType<TaskType >>(`todo-lists/${todolistId}/tasks/${taskId}`,model)

    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`
        )
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item:TaskType }>>(
            `todo-lists/${todolistId}/tasks`,
            {title: title}
        )
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskType>(
            `todo-lists/${todolistId}/tasks`)
    },
}

// types

export type UpdateTaskModelType={
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskType = {
    totalCount: number | null
    items: TaskType[]
    error: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatus {
    New,
    InProgress,
    Complited,
    Draft
}

export enum TaskPriority {
    Low,
    Middle,
    Hi,
    Urgent,
    Later
}