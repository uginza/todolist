import {useState} from "react";
import {TodolistDomainType} from "../../features/TodolistsList/Todolist/todolists-reducer";
import {todolistID1, todolistID2} from "../id-utils";

export function useTodolists() {
    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: 'What to learn', entityStatus: "idle", filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', entityStatus: "idle", filter: 'all', addedDate: '', order: 0}
    ])
    return [todolists, setTodolists] as const
}