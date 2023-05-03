import {applyMiddleware, createStore} from 'redux'
import {combineReducers} from 'redux'
import {todolistsReducer} from "../features/TodolistsList/Todolist/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/Todolist/tasks-reducer";
import thunkMiddleWare from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app:appReducer,
    login:authReducer
})

export type AppRootStateType =ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunkMiddleWare))

/*export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch*/

// @ts-ignore
window.store = store
