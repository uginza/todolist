import React from 'react';
import '../App/App.css';
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {v1} from "uuid";
import {AddItem} from "../components/AddItemForm/AddItem";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TaskPriority, TaskStatus} from "../api/tasks-api";
import {ChangeFilterType, TodolistDomainType} from "../features/TodolistsList/Todolist/todolists-reducer";
import {useTodolists} from "../App/hooks/useTodolists";
import {useTasks} from "../App/hooks/useTasks";


function App() {
    let [todolists, setTodolists] = useTodolists()
    let [tasks, setTasks]= useTasks()

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

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const todoList = todolists.find(tl => tl.id === todolistId)
        if (todoList) {
            todoList.title = newTitle;
        }
        setTodolists([...todolists])
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
        setTasks({...tasks, [todolist.id]: []})
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
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
                                tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatus.New)
                            } else if (tl.filter === 'complited') {
                                tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatus.Complited)
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todolist={tl}
                                        key={tl.id}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
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
