import React, {useReducer, useState} from 'react';
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
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFiltertAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type ChangeFilterType = 'all' | 'active' | 'complited'
export type TodolistType = {
    id: string;
    title: string;
    filter: ChangeFilterType;
}

export type TasksStateType={
    [key:string]:Array<TaskType>
}




function AppWithRedux() {
    const dispatch=useDispatch()
    const todolists=useSelector<AppRootState,Array<TodolistType>>(state=>state.todolists)
    const tasks=useSelector<AppRootState,TasksStateType>(state=>state.tasks)

    const addTask = (newTitle: string, todolistId: string) => {
        const action = addTaskAC(newTitle, todolistId)
        dispatch(action)
    }

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
    }

    function changeFilter(value: ChangeFilterType,todolistId: string) {
        const action = changeTodolistFiltertAC(todolistId, value)
        dispatch(action)
    }

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
}
        function addTodolist(title: string) {
            const action = addTodolistAC(title)
            dispatch(action)
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
                                    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                                } else if (tl.filter === 'complited') {
                                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                                }
                                return <Grid item>
                                    <Paper style={{padding: '10px'}}>
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


export default AppWithRedux;
