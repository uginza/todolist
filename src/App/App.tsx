import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {TaskType} from "../api/tasks-api";
import {TodolistList} from "../features/TodolistsList/TodolistList";
import {LinearProgress} from "@mui/material";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {


    return (
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
                <LinearProgress />
            </AppBar>
            <Container fixed>
               <TodolistList/>
            </Container>
        </div>
    );
}

export default App;