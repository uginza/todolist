import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type ChangeFilterType = 'all' | 'active' | 'complited'
type TodolistType = {
    id: string;
    title: string;
    filter: ChangeFilterType;
}


function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let [tasks, setTasks] = useState({
            [todolistID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false}
            ],
            [todolistID2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Bread", isDone: true},
                {id: v1(), title: "Pen", isDone: false}
            ]
        }
    )
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'complited'}
    ])

    const addTask = (newTitle: string, todolistId: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let filteredTasks = todolistTasks.filter(task => task.id != id)
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }

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
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id]
                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                } else if (tl.filter === 'complited') {
                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                }
                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                />
            })}

        </div>
    );
}

export default App;
