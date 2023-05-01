import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
    TodolistActionType
} from "./todolists-reducer";
import {TaskStatus, TaskType, tasksAPI, UpdateTaskModelType, TaskPriority} from "../../../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../App/store";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../../App/app-reducer";


export type ThunkDispatchType = Dispatch<TasksReducerActionType
    | SetAppErrorActionType | SetAppStatusActionType | TodolistActionType>

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type MainUpdateTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatus
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}


type TasksReducerActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}

        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        case 'UPDATE-TASK': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, ...action.model} : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy

        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state, [action.id]: action.tasks}
        default:
            return state;
    }
}

//action list

export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK', taskId, todolistId
} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: MainUpdateTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK', taskId, model, todolistId
} as const)
export const setTasksAC = (tasks: Array<TaskType>, id: string) => ({
    type: 'SET-TASKS', id, tasks
} as const)

// thunk list

export const fetchTasksTC: any = (todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    tasksAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const removeTasksTC: any = (tasksId: string, todolistId: string) => (dispatch: Dispatch<TasksReducerActionType>) => {
    tasksAPI.deleteTasks(todolistId, tasksId)
        .then(res => {
            const action = removeTaskAC(tasksId, todolistId)
            dispatch(action)
        })
}
export const addTaskTC: any = (title: string, todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    tasksAPI.createTasks(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
                dispatch(setAppStatusAC("succeeded"))
            } else if (res.data.messages.length) {
                dispatch(setAppErrorAC(res.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('some error occurred'))
                dispatch(setAppErrorAC('failed'))
            }
        })
        .catch((error) => {
            dispatch(setAppErrorAC('some error occurred'))
            dispatch(setAppErrorAC('failed'))
        })

}
export const updateTaskTC: any = (taskId: string, domainModel: MainUpdateTaskModelType, todolistId: string) =>
    (dispatch: ThunkDispatchType, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком
// чтобы у неё отобрать остальные св-ва

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            }
            tasksAPI.updateTasks(taskId, apiModel, todolistId)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        const action = updateTaskAC(taskId, domainModel, todolistId)
                        dispatch(action)
                    } else if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('some error occurred'))
                        dispatch(setAppErrorAC('failed'))
                    }
                })
                .catch((error) => {
                    dispatch(setAppErrorAC('some error occurred'))
                    dispatch(setAppErrorAC('failed'))
                })
        }
    }


