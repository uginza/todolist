import {todolistAPI, TodolistType} from "../api/ todolist-api";
import {Dispatch} from "redux";


const initialState: Array<TodolistDomainType> = []

export type ChangeFilterType = 'all' | 'active' | 'complited'

export type TodolistDomainType = TodolistType & { filter: ChangeFilterType }

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType):
    Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
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

//action list

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title
} as const)
export const changeTodolistFiltertAC = (id: string, filter: ChangeFilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER', id, filter
} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists: todolists} as const)

// thunk list

export const fetchTodolistTC: any = () =>
    (dispatch: Dispatch) => {
        todolistAPI.GetTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }

export const removeTodolistTC: any = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.DeleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const addTodolistTC: any = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.CreateTodolist(title)
        .then((res) => {
            const todolist = res.data.data.item
            const action = addTodolistAC(todolist)
            dispatch(action)
        })
}

export const changeTodolistTitleTC: any = (todolistId: string, todolistTitle: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistId, todolistTitle)
        .then((res) => {
            const action = changeTodolistTitleAC(todolistId, todolistTitle)
            dispatch(action)
        })
}


//types

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFiltertAC>
    | SetTodolistsActionType

