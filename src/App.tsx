import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItem} from "./AddItem";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export type ChangeFilterType = 'all' | 'active' | 'complited'
export type TodolistType = {
    id: string;
    title: string;
    filter: ChangeFilterType;
}

export type TasksStateType={
    [key:string]:Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let [tasks, setTasks] = useState<TasksStateType>({
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
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    const addTask = (newTitle: string, todolistId: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let filteredTasks = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks,[todolistId]:filteredTasks})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }

    function changeTaskTitle(id: string, newTitle:string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle;
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

    function changeTodolistTitle(todolistId: string,newTitle:string){
        const todoList=todolists.find(tl=>tl.id===todolistId)
        if (todoList){
            todoList.title=newTitle;
        }
        setTodolists([...todolists])
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Photos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
            <AddItem addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                    } else if (tl.filter === 'complited') {
                        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                    }
                    return <Grid item>
                        <Paper style={{padding:'10px'}}>
                        <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                        </Paper>
                    </Grid>
                })}
                </Grid>
            </Container>
        </div>
    );
}
export default App;
