import {TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

    export const todolistsReducer = (state: Array<TodolistType>, action: ActionType):Array<TodolistType> => {
        switch (action.type) {
            case 'REMOVE-TODOLIST':
                return[...state.filter(tl=>tl.id!==action.id)]
            case 'ADD-TODOLIST':
                return[...state, {id:v1(),title:action.title,filter: 'all'}]
            case 'CHANGE-TODOLIST-TITLE':
                const todoList=state.find(tl=>tl.id===action.id)
                if (todoList){
                    todoList.title=action.title;
                }
                return [...state]
            case 'CHANGE-TODOLIST-FILTER':
                let todolist2 = state.find(t => t.id === action.id)
                if (todolist2) {
                    todolist2.filter = action.filter;
                }
                return [...state]
            default:
                throw new Error('I don\'t understand this type')
        }
    }