import {ChangeFilterType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId:string

}
type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistTitle: string
    todolistId:string
}

type ActionType = RemoveTaskActionType
    | AddTaskActionType



export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            const stateCopy={...state}
            const tasks=stateCopy[action.todolistId]
            const filteredTasks=tasks.filter(t=>t.id!==action.taskId)
            stateCopy[action.todolistId]=filteredTasks
            return stateCopy
        }
        case 'ADD-TASK':{
            const stateCopy={...state}
            const tasks=stateCopy[action.todolistId]
            const newTask={id: v1(), title: action.todolistTitle, isDone: false}
            const newTasks=[newTask,...tasks]
            stateCopy[action.todolistId]=newTasks
            return stateCopy
            /*return{...state,[action.todolistId]:[{id: v1(),
                    title: action.todolistTitle, isDone: false},
                    ...state[action.todolistId]]}*/
        }

        default:
            return state;
    }
}

export const removeTaskAC=(taskId:string,todolistId:string):RemoveTaskActionType=>{
    return {type:'REMOVE-TASK',taskId,todolistId}
}
export const addTaskAC=(todolistTitle: string,todolistId:string):AddTaskActionType=>{
    return {type:'ADD-TASK',todolistTitle,todolistId}
}
