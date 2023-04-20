import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import { AppRootState } from '../state/store'
import { tasksReducer } from '../state/tasks-reducer'
import { todolistsReducer } from '../state/todolists-reducer'
import {TaskPriority, TaskStatus} from "../api/tasks-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate:'',order:0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate:'',order:0}
    ],
    tasks:{ ['todolistId1']: [
    {id: v1(), title: "HTML&CSS",status:TaskStatus.Complited,addedDate:'',order:0,completed:true,deadline:'',todoListId:'todolistId1',startDate:'',description:'',priority:TaskPriority.Low},
    {id: v1(), title: "JS", status:TaskStatus.Complited,order:0,completed:true,deadline:'',todoListId:'todolistId1',startDate:'',description:'',priority:TaskPriority.Low,addedDate:''},
    {id: v1(), title: "ReactJS", status:TaskStatus.InProgress,order:0,completed:false,deadline:'',todoListId:'todolistId1',startDate:'',description:'',priority:TaskPriority.Low,addedDate:''},
    {id: v1(), title: "rest API", status:TaskStatus.InProgress,order:0,completed:false,deadline:'',todoListId:'todolistId1',startDate:'',description:'',priority:TaskPriority.Low,addedDate:''},
    {id: v1(), title: "GraphQL", status:TaskStatus.InProgress,order:0,completed:false,deadline:'',todoListId:'todolistId1',startDate:'',description:'',priority:TaskPriority.Low,addedDate:''}
],
    ['todolistId2']: [
    {id: v1(), title: "Milk", status:TaskStatus.Complited,order:0,completed:true,deadline:'',todoListId:'todolistId2',startDate:'',description:'',priority:TaskPriority.Low,addedDate:''},
    {id: v1(), title: "Bread", status:TaskStatus.Complited,order:0,completed:true,deadline:'',todoListId:'todolistId2',startDate:'',description:'',priority:TaskPriority.Low,addedDate:''},
    {id: v1(), title: "Pen", status:TaskStatus.InProgress,order:0,completed:true,deadline:'',todoListId:'todolistId2',startDate:'',description:'',priority:TaskPriority.Low,addedDate:''}
]
}
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
