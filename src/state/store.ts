import {applyMiddleware, createStore} from 'redux'
import {combineReducers} from 'redux'
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunkMiddleWare from 'redux-thunk'

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootState=ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunkMiddleWare))

/*export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch*/

// @ts-ignore
window.store = store
