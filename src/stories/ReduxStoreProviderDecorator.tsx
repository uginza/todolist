import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from '../App/store'
import {tasksReducer} from '../features/TodolistsList/Todolist/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/Todolist/todolists-reducer'
import {TaskPriority, TaskStatus} from "../api/tasks-api";
import {appReducer} from "../App/app-reducer";
import thunkMiddleWare from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatus.Complited,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                todoListId: 'todolistId1',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatus.Complited,
                order: 0,
                completed: true,
                deadline: '',
                todoListId: 'todolistId1',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: "ReactJS",
                status: TaskStatus.InProgress,
                order: 0,
                completed: false,
                deadline: '',
                todoListId: 'todolistId1',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: "rest API",
                status: TaskStatus.InProgress,
                order: 0,
                completed: false,
                deadline: '',
                todoListId: 'todolistId1',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: "GraphQL",
                status: TaskStatus.InProgress,
                order: 0,
                completed: false,
                deadline: '',
                todoListId: 'todolistId1',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: '',
                entityStatus: 'idle'
            }
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatus.Complited,
                order: 0,
                completed: true,
                deadline: '',
                todoListId: 'todolistId2',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: "Bread",
                status: TaskStatus.Complited,
                order: 0,
                completed: true,
                deadline: '',
                todoListId: 'todolistId2',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: "Pen",
                status: TaskStatus.InProgress,
                order: 0,
                completed: true,
                deadline: '',
                todoListId: 'todolistId2',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: '',
                entityStatus: 'idle'
            }
        ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized:false
    },
    login: {
        isLoggedIn: false
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType,
    applyMiddleware(thunkMiddleWare))

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
