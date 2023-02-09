import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type ChangeFilterType= 'all' |'active' | 'complited'


function App() {
    const shapka = "What to learn"
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])

    const addTask = (newTitle:string) => {
        let newTasks= {id: v1(), title:newTitle, isDone: false}
        setTasks([newTasks,...tasks])
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id != id)
        setTasks(filteredTasks)
    }
    function changeStatus (id:string,isDone:boolean){
        let task=tasks.find(t=>t.id===id)
        if (task){
            task.isDone=isDone;
        }
        setTasks([...tasks]);
    }

 let [filter, setFilter]=useState <ChangeFilterType> ('all')
    let tasksForTodolist=tasks
    if (filter==='active'){
        tasksForTodolist=tasks.filter(task=>task.isDone===false)
    }else if (filter==='complited'){
        tasksForTodolist=tasks.filter(task=>task.isDone===true)
    }
    function changeFilter(value:ChangeFilterType){
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist shapka={shapka}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
