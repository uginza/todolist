import {ChangeFilterType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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

const initialState:Array<TodolistType>=[]

export const todolistsReducer = (state: Array<TodolistType>=initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return [...state.filter(tl => tl.id !== action.id)]
        }
        case 'ADD-TODOLIST': {
            return [{id: action.todolistId, title: action.title, filter: 'all'},...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const stateCopy=[...state]
            const todoList = stateCopy.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
            }
            return stateCopy
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist2 = state.find(t => t.id === action.id)
            if (todolist2) {
                todolist2.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolistTitle: string,): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: todolistTitle, todolistId: v1()}
}
export const changeTodolistTitleAC = (todolistId: string, todolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: todolistTitle}
}
export const changeTodolistFiltertAC = (todolistId: string, filter: ChangeFilterType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}
