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
    const shapka = "What to learn"
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'complited'}
    ])

    const addTask = (newTitle: string) => {
        let newTasks = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTasks, ...tasks])
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id != id)
        setTasks(filteredTasks)
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }

    function changeFilter(value: ChangeFilterType, todolistId: string) {
let todolist=todolists.find(t=>t.id===todolistId)
        if (todolist){
            todolist.filter=value;
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                let tasksForTodolist = tasks
                if (tl.filter === 'active') {
                    tasksForTodolist = tasks.filter(task => !task.isDone)
                } else if (tl.filter === 'complited') {
                    tasksForTodolist = tasks.filter(task => task.isDone)
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
                />
            })}

        </div>
    );
}

export default App;
