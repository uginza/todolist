import {todolistAPI, TodolistType} from "../../../api/ todolist-api";
import {RequestStatusType, setAppStatusAC} from "../../../App/app-reducer";
import {ThunkDispatchType} from "./tasks-reducer";
import {handleServerNetworkError} from "../../../utils/errorUtils";


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionType):
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
        dispatch(setAppStatusAC("loading"))
        todolistAPI.GetTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

export const removeTodolistTC: any = (todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeEntityStatusAC(todolistId, 'loading'))
    todolistAPI.DeleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const addTodolistTC: any = (title: string) => (dispatch:ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.CreateTodolist(title)
        .then((res) => {
            const todolist = res.data.data.item
            const action = addTodolistAC(todolist)
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const changeTodolistTitleTC: any = (todolistId: string, todolistTitle: string) => (dispatch:ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.updateTodolist(todolistId, todolistTitle)
        .then((res) => {
            const action = changeTodolistTitleAC(todolistId, todolistTitle)
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
        })
}


//types

export type ChangeFilterType = 'all' | 'active' | 'complited'
export type TodolistDomainType = TodolistType & { filter: ChangeFilterType, entityStatus: RequestStatusType }


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type TodolistActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFiltertAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeEntityStatusAC>

