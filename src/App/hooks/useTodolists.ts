import {useState} from "react";
import {ChangeFilterType, TodolistDomainType} from "../../features/TodolistsList/Todolist/todolists-reducer";
import {todolistID1, todolistID2} from "../id-utils";
import {v1} from "uuid";

export function useTodolists(onTodolistRemoved:(todolistId:string)=>void,onTodolistAdded:(id:string)=>void) {
    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: 'What to learn', entityStatus: "idle", filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', entityStatus: "idle", filter: 'all', addedDate: '', order: 0}
    ])

    function changeFilter(value: ChangeFilterType, todolistId: string) {
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(todolistId: string) {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolists);

    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const todoList = todolists.find(tl => tl.id === todolistId)
        if (todoList) {
            todoList.title = newTitle;
        }
        setTodolists([...todolists])
        onTodolistRemoved(todolistId)
    }

    function addTodolist(title: string) {
        let todolist: TodolistDomainType = {
            id: v1(),
            title: title,
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: "idle"
        }
        setTodolists([todolist, ...todolists])
        onTodolistAdded(todolist.id)
    }

    return [todolists,changeFilter,removeTodolist,changeTodolistTitle,addTodolist] as const
}