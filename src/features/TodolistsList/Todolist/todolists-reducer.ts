import {todolistAPI, TodolistType} from "../../../api/ todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC} from "../../../App/app-reducer";
import {ThunkDispatchType} from "./tasks-reducer";


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType):
    Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))

        case 'CHANGE-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)

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
export const changeEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-ENTITY-STATUS', id, status
} as const)

// thunk list

export const fetchTodolistTC: any = () =>
    (dispatch: ThunkDispatchType) => {
        dispatch(setStatusAC("loading"))
        todolistAPI.GetTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setStatusAC("succeeded"))
            })
    }

export const removeTodolistTC: any = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.DeleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const addTodolistTC: any = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.CreateTodolist(title)
        .then((res) => {
            const todolist = res.data.data.item
            const action = addTodolistAC(todolist)
            dispatch(action)
        })
}

export const changeTodolistTitleTC: any = (todolistId: string, todolistTitle: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.updateTodolist(todolistId, todolistTitle)
        .then((res) => {
            const action = changeTodolistTitleAC(todolistId, todolistTitle)
            dispatch(action)
        })
}


//types

export type ChangeFilterType = 'all' | 'active' | 'complited'
export type TodolistDomainType = TodolistType & { filter: ChangeFilterType, entityStatus: RequestStatusType }


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFiltertAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeEntityStatusAC>

