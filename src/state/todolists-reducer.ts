import {todolistAPI, TodolistType} from "../api/ todolist-api";
import { Dispatch} from "redux";



export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
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
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistType[]
}

export type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const initialState: Array<TodolistDomainType> = []

export type ChangeFilterType = 'all' | 'active' | 'complited'

export type TodolistDomainType = TodolistType & { filter: ChangeFilterType }

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist:TodolistDomainType={...action.todolist,filter:'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const stateCopy = [...state]
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
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
                return {...tl, filter: 'all'}
            })
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist:TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (todolistId: string, todolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: todolistTitle}
}
export const changeTodolistFiltertAC = (todolistId: string, filter: ChangeFilterType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}
export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists: todolists}
}

export const fetchTodolistTC:any=() => {
   return (dispatch: Dispatch)=>{todolistAPI.GetTodolists()
       .then((res) => {
           dispatch(setTodolistsAC(res.data))
       })}
}
export const removeTodolistTC:any=(todolistId:string) => {
   return (dispatch: Dispatch)=>{todolistAPI.DeleteTodolist(todolistId)
       .then((res) => {
           dispatch(removeTodolistAC(todolistId))
       })}
}
export const addTodolistTC:any=(title:string) => {
   return (dispatch: Dispatch)=>{todolistAPI.CreateTodolist(title)
       .then((res) => {
           const todolist=res.data.data.item
           const action = addTodolistAC(todolist)
           dispatch(action)
       })}
}
export const changeTodolistTitleTC:any=(todolistId: string, todolistTitle: string) => {
   return (dispatch: Dispatch)=>{todolistAPI.updateTodolist(todolistId,todolistTitle)
       .then((res) => {
           const action = changeTodolistTitleAC(todolistId,todolistTitle)
           dispatch(action)
       })}
}


