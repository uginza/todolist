import {ChangeFilterType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId:string

}
type Action2Type = {
    type: '2'
    title: string
}

type ActionType = RemoveTaskActionType
    | Action2Type



export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            const stateCopy={...state}
            const tasks=stateCopy[action.todolistId]
            const filteredTasks=tasks.filter(t=>t.id!==action.taskId)
            stateCopy[action.todolistId]=filteredTasks
            return stateCopy
        case '2':
            return {...state}
        default:
            return state;
    }
}

export const removeTaskAC=(taskId:string,todolistId:string):RemoveTaskActionType=>{
    return {type:'REMOVE-TASK',taskId,todolistId}
}
export const Action2Type=(todolistTitle: string):Action2Type=>{
    return {type:'2',title:todolistTitle}
}
