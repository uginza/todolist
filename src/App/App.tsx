import React, {useCallback, useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {TaskType} from "../api/tasks-api";
import {TodolistList} from "../features/TodolistsList/TodolistList";
import {CircularProgress, LinearProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {RequestStatusType, setAppIsInitializedTC} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import Button from "@mui/material/Button/Button";
import {logOutTC} from "../features/Login/auth-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type TodolistListPropsType = {
    demo?: boolean
}

function App({demo = false}: TodolistListPropsType) {
    const dispatch = useAppDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(setAppIsInitializedTC())
    }, [])
const LogOutHandler=useCallback(()=>{
    dispatch(logOutTC())
},[])
    if (!isInitialized) {
        return <div style={{marginTop: '20%', marginLeft: '45%'}}><CircularProgress/></div>
    }
    return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            {isLoggedIn&&<Button color="inherit" onClick={LogOutHandler}>Log out</Button>}
                        </Typography>

                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistList demo={demo}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path='*' element={<h1>404: PAGE NOT FOUND</h1>} />
                    </Routes>
                </Container>
            </div>
    );
}

export default App;