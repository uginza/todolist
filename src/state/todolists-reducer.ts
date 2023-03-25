import {ChangeFilterType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: ChangeFilterType
}


type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id !== action.id)]
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            let todolist2 = state.find(t => t.id === action.id)
            if (todolist2) {
                todolist2.filter = action.filter;
            }
            return [...state]
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC=(todolistId:string):RemoveTodolistActionType=>{
    return {type:'REMOVE-TODOLIST',id:todolistId}
}
export const AddTodolistAC=(todolistTitle: string):AddTodolistActionType=>{
    return {type:'ADD-TODOLIST',title:todolistTitle}
}
export const ChangeTodolistAC=(todolistId:string,todolistTitle: string):ChangeTodolistTitleActionType=>{
    return {type:'CHANGE-TODOLIST-TITLE',id:todolistId,title:todolistTitle}
}
export const ChangeTodolistFiltertAC=(todolistId:string,filter:ChangeFilterType):ChangeTodolistFilterActionType=>{
    return {type:'CHANGE-TODOLIST-FILTER',id:todolistId,filter:filter}
}
