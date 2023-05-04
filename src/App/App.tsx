import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {TaskType} from "../api/tasks-api";
import {TodolistList} from "../features/TodolistsList/TodolistList";
import {CircularProgress, LinearProgress} from "@mui/material";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType, setAppIsInitializedTC} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {fetchTasksTC} from "../features/TodolistsList/Todolist/tasks-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type TodolistListPropsType = {
    demo?: boolean
}

function App({demo = false}: TodolistListPropsType) {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)

    useEffect(() => {
        dispatch(setAppIsInitializedTC())
    }, [])

    if (!isInitialized) {
        return <div style={{marginTop: '20%', marginLeft: '45%'}}><CircularProgress/></div>
    }
    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackBar/>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            Photos
                        </Typography>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistList demo={demo}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;