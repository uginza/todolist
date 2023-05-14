import {v1} from "uuid";
import {useReducer} from "react";
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "../../features/TodolistsList/Todolist/tasks-reducer";
import {TaskPriority, TaskStatus} from "../../api/tasks-api";
import {
    addTodolistAC,
    changeTodolistFiltertAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "../../features/TodolistsList/Todolist/todolists-reducer";
import {ChangeFilterType} from "../AppWithReducers";
import {todolistID1, todolistID2} from "../../App/id-utils";


export function useAppWithReducers() {

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', entityStatus: 'idle', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', entityStatus: 'idle', order: 0}
    ])

    const addTask = (newTitle: string, todolistId: string) => {
        const action = addTaskAC({
            task: {
                id: '3',
                title: newTitle,
                status: TaskStatus.New,
                order: 0,
                completed: false,
                deadline: '',
                todoListId: todolistId,
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: '',
                entityStatus: 'idle'
            }
        })
        dispatchToTasksReducer(action)
    }

    function removeTask(taskId: string, todolistId: string) {
        const action = removeTaskAC({taskId, todolistId})
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskId: string, status: TaskStatus, todolistId: string) {
        const action = updateTaskAC({taskId, model: {status: status}, todolistId})
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(taskId: string, title: string, todolistId: string) {
        const action = updateTaskAC({taskId, model: {title: title}, todolistId})
        dispatchToTasksReducer(action)
    }

    function changeFilter(value: ChangeFilterType, todolistId: string) {
        const action = changeTodolistFiltertAC({id: todolistId, filter: value})
        dispatchToTodolistsReducer(action)
    }

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC({id: todolistId})
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const action = changeTodolistTitleAC({id: todolistId, title: newTitle})
        dispatchToTodolistsReducer(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC({
            todolist: {
                id: todolistID1,
                title: title,
                addedDate: '',
                entityStatus: 'idle',
                order: 0
            }
        })
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    return {
        tasks,
        todolists,
        addTask,
        removeTask,
        changeStatus,
        changeTaskTitle,
        changeFilter,
        removeTodolist,
        changeTodolistTitle,
        addTodolist
    }
}