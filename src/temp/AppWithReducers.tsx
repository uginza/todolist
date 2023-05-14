import React, {useReducer} from 'react';
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
import {
    addTaskAC,
    MainUpdateTaskModelType,
    removeTaskAC,
    tasksReducer,
    updateTaskAC
} from "../features/TodolistsList/Todolist/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFiltertAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "../features/TodolistsList/Todolist/todolists-reducer";
import {TaskPriority, TaskStatus, TaskType} from "../api/tasks-api";
import {useAppWithReducers} from "./hooks/useAppWithReducers";

export type ChangeFilterType = 'all' | 'active' | 'complited'
export type TodolistType = {
    id: string;
    title: string;
    filter: ChangeFilterType;
}

export type TasksStateType={
    [key:string]:Array<TaskType>
}

function AppWithReducers() {
const {tasks,
    todolists,
    addTask,
    removeTask,
    changeStatus,
    changeTaskTitle,
    changeFilter,
    removeTodolist,
    changeTodolistTitle,
    addTodolist}=useAppWithReducers()

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
                                    tasksForTodolist = tasksForTodolist.filter(task =>task.status===TaskStatus.New)
                                } else if (tl.filter === 'complited') {
                                    tasksForTodolist = tasksForTodolist.filter(task =>task.status===TaskStatus.Complited)
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


export default AppWithReducers;
