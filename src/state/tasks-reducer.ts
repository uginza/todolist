import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskPriority, TaskStatus} from "../api/tasks-api";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string

}
type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistTitle: string
    todolistId: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status:TaskStatus
    todolistId: string
}

type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistTitle: string
    todolistId: string
}

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

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
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.todolistTitle,
                status:TaskStatus.New,
                order:0,completed:false,
                deadline:'',
                todoListId:action.todolistId,
                startDate:'',description:'',
                priority:TaskPriority.Low
                ,addedDate:''}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
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
            let todolistTasks=state[action.todolistId]
            state[action.todolistId]=todolistTasks.map(t=>t.id===action.taskId?{...t,status:action.status}:t)
            return({...state})
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
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
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

export const addTaskAC = (todolistTitle: string, todolistId: string)
    : AddTaskActionType => {
    return {type: 'ADD-TASK', todolistTitle, todolistId}
}
export const changeTaskStatusAC = (taskId: string,  status:TaskStatus, todolistId: string)
    : ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
}
export const changeTaskTitleAC = (taskId: string, todolistTitle: string, todolistId: string)
    : changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, todolistTitle, todolistId}
}


