import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskStatus, TaskType, tasksAPI, UpdateTaskModelType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string

}
type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatus
    todolistId: string
}

type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistTitle: string
    todolistId: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            const newTask = action.task
            const newTasks = [newTask, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
            /*return{...state,[action.todolistId]:[{id: v1(),
                    title: action.todolistTitle, isDone: false},
                    ...state[action.todolistId]]}*/
        }
        case 'CHANGE-TASK-STATUS': {

            /*let task = state[action.todolistId].find(t => t.id === action.taskId)
            if (task) {
                return {...state,[action.todolistId]:[...state[action.todolistId].map(t=>t.id===action.taskId?{...t,isDone:action.isDone}:t)]}
            }
            return state*/
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {
                ...t,
                status: action.status
            } : t)
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            /*const stateCopy = {...state,[action.todolistId]:[...state[action.todolistId]]}
            let task = stateCopy[action.todolistId].find(t => t.id === action.taskId)
            if (task) {
                task.title = action.todolistTitle
            }
            return stateCopy*/
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {
                ...t,
                title: action.todolistTitle
            } : t)
            return ({...state})

        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolist.id] = []
            return stateCopy
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
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string)
    : RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (task: TaskType)
    : AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatus, todolistId: string)
    : ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
}
export const changeTaskTitleAC = (taskId: string, todolistTitle: string, todolistId: string)
    : changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, todolistTitle, todolistId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string)
    : SetTasksActionType => {
    return {type: 'SET-TASKS', todolistId, tasks}
}

export const fetchTasksTC: any = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
            })
    }

}
export const removeTasksTC: any = (tasksId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTasks(todolistId, tasksId)
            .then(res => {
                const action = removeTaskAC(tasksId, todolistId)
                dispatch(action)
            })
    }
}
export const addTaskTC: any = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTasks(todolistId, title)
            .then(res => {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            })
    }
}
export const updateTaskStatusTC: any = (taskId: string, status: TaskStatus, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            const model:UpdateTaskModelType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }
            tasksAPI.updateTasks(taskId, model, todolistId)
                .then(() => {
                    const action = changeTaskStatusAC(taskId, status, todolistId)
                    dispatch(action)
                })
        }
    }
}


