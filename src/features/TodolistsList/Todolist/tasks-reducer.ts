import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriority, tasksAPI, TaskStatus, TaskType, UpdateTaskModelType} from "../../../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../App/store";
import {setAppStatusAC} from "../../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type ThunkDispatchType = Dispatch

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


const initialState: TasksStateType = {}

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        removeTaskAC(state: TasksStateType, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state: TasksStateType, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state: TasksStateType, action: PayloadAction<{
            taskId: string, model: MainUpdateTaskModelType,
            todolistId: string
        }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state: TasksStateType, action: PayloadAction<{ tasks: Array<TaskType>, id: string }>) {
            state[action.payload.id] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
    }
})

export const tasksReducer=slice.reducer


export const {removeTaskAC,addTaskAC,setTasksAC,updateTaskAC}=slice.actions

// thunk list

export const fetchTasksTC: any = (todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC({status: "loading"}))
    tasksAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC({tasks, id:todolistId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}

export const removeTasksTC: any = (taskId: string, todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC({status: "loading"}))
    tasksAPI.deleteTasks(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC({taskId, todolistId})
            dispatch(action)
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}
export const addTaskTC: any = (title: string, todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC({status: "loading"}))
    tasksAPI.createTasks(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = addTaskAC({task})
                dispatch(action)
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })

}
export const updateTaskTC: any = (taskId: string, model: MainUpdateTaskModelType, todolistId: string) =>
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
                ...model
            }
            tasksAPI.updateTasks(taskId, apiModel, todolistId)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        const action = updateTaskAC({taskId, model, todolistId})
                        dispatch(action)
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                })
        }
    }


