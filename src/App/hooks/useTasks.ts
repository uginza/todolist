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

    const addTask = (newTitle: string, todolistId: string) => {
        let newTask = {
            id: v1(),
            title: newTitle,
            status: TaskStatus.New,
            order: 0,
            completed: true,
            deadline: '',
            todoListId: todolistId,
            startDate: '',
            description: '',
            priority: TaskPriority.Low,
            addedDate: '',
            entityStatus: 'idle'
        }
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let filteredTasks = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks, [todolistId]: filteredTasks})
    }

    function changeStatus(id: string, status: TaskStatus, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.status = status;
        }
        setTasks({...tasks});
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle;
        }
        setTasks({...tasks});
    }

    function removeAllTasks(todolistId:string){
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function newTodolistTasks(id:string){
        setTasks({...tasks, [id]: []})
    }

    return {tasks, setTasks, addTask,removeTask,changeStatus,changeTaskTitle,removeAllTasks,newTodolistTasks} as const
}