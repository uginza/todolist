import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
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
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {v1} from "uuid";

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
    console.log("App is called")
    const dispatch=useDispatch()
    const todolists=useSelector<AppRootState,Array<TodolistType>>(state=>state.todolists)
    const tasks=useSelector<AppRootState,TasksStateType>(state=>state.tasks)

    const addTask = useCallback((newTitle: string, todolistId: string) => {
        const action = addTaskAC(newTitle, todolistId)
        dispatch(action)
    },[])

    const removeTask=useCallback((id: string, todolistId: string)=> {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    },[])

    const changeStatus=useCallback((id: string, isDone: boolean, todolistId: string) =>{
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    },[])

    const changeTaskTitle=useCallback((id: string, newTitle: string, todolistId: string)=> {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
    },[])

    const changeFilter=useCallback((value: ChangeFilterType,todolistId: string)=> {
        const action = changeTodolistFiltertAC(todolistId, value)
        dispatch(action)
    },[])

    const removeTodolist=useCallback((todolistId: string)=> {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    },[])

    const changeTodolistTitle=useCallback((todolistId: string, newTitle: string)=> {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
},[])
        const addTodolist=useCallback((title: string)=> {
            const action = addTodolistAC(title)
            dispatch(action)
        },[])

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

                                return <Grid item key={tl.id}>
                                    <Paper  style={{padding: '10px'}}>
                                        <Todolist
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
