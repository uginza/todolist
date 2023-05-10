import {todolistAPI, TodolistType} from "../../../api/ todolist-api";
import {RequestStatusType, setAppStatusAC} from "../../../App/app-reducer";
import {handleServerNetworkError} from "../../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";


const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFiltertAC(state, action: PayloadAction<{ id: string, filter: ChangeFilterType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        }
    }
})

export const todolistsReducer = slice.reducer
export const {
    removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFiltertAC, setTodolistsAC,
    changeEntityStatusAC
} = slice.actions

// thunk list

export const fetchTodolistTC: any = () =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistAPI.GetTodolists()
            .then((res) => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

export const removeTodolistTC: any = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeEntityStatusAC({id: todolistId, status: 'loading'}))
    todolistAPI.DeleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC({id: todolistId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}

export const addTodolistTC: any = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistAPI.CreateTodolist(title)
        .then((res) => {
            const todolist = res.data.data.item
            const action = addTodolistAC({todolist: todolist})
            dispatch(action)
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}

export const changeTodolistTitleTC: any = (todolistId: string, todolistTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistAPI.updateTodolist(todolistId, todolistTitle)
        .then((res) => {
            const action = changeTodolistTitleAC({id: todolistId, title: todolistTitle})
            dispatch(action)
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}


//types

export type ChangeFilterType = 'all' | 'active' | 'complited'
export type TodolistDomainType = TodolistType & { filter: ChangeFilterType, entityStatus: RequestStatusType }
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

