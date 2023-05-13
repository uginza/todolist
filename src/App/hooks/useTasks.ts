import {useState} from "react";
import {TasksStateType} from "../../features/TodolistsList/Todolist/tasks-reducer";
import {todolistID1, todolistID2} from "../id-utils";
import {v1} from "uuid";
import {TaskPriority, TaskStatus} from "../../api/tasks-api";

export function useTasks() {
    let [tasks, setTasks] = useState<TasksStateType>({
            [todolistID1]: [
                {
                    id: v1(),
                    title: "HTML&CSS",
                    status: TaskStatus.Complited,
                    addedDate: '',
                    order: 0,
                    completed: true,
                    deadline: '',
                    todoListId: todolistID1,
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
                    todoListId: todolistID1,
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
                    todoListId: todolistID1,
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
                    todoListId: todolistID1,
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
                    todoListId: todolistID1,
                    startDate: '',
                    description: '',
                    priority: TaskPriority.Low,
                    addedDate: '',
                    entityStatus: 'idle'
                }
            ],
            [todolistID2]: [
                {
                    id: v1(),
                    title: "Milk",
                    status: TaskStatus.Complited,
                    order: 0,
                    completed: true,
                    deadline: '',
                    todoListId: todolistID2,
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
                    todoListId: todolistID2,
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
                    todoListId: todolistID2,
                    startDate: '',
                    description: '',
                    priority: TaskPriority.Low,
                    addedDate: '',
                    entityStatus: 'idle'
                }
            ]
        }
    )
    return [tasks,setTasks] as const
}