import {combineReducers} from 'redux'
import {todolistsReducer} from "../features/TodolistsList/Todolist/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/Todolist/tasks-reducer";
import thunkMiddleWare from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

/*export const store = createStore(rootReducer,applyMiddleware(thunkMiddleWare))*/
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleWare)
})

/*export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch*/

// @ts-ignore
window.store = store
