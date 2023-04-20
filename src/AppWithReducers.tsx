import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
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
import {TaskPriority, TaskStatus, TaskType} from "./api/tasks-api";

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
    let todolistID1 = v1();
    let todolistID2 = v1();
    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
            [todolistID1]: [
                {id: v1(), title: "HTML&CSS",status:TaskStatus.Complited,addedDate:'',order:0,completed:true,deadline:'',todoListId:todolistID1,startDate:'',description:'',priority:TaskPriority.Low},
                {id: v1(), title: "JS", status:TaskStatus.Complited,order:0,completed:true,deadline:'',todoListId:todolistID1,startDate:'',description:'',priority:TaskPriority.Low,addedDate:''},
                {id: v1(), title: "ReactJS", status:TaskStatus.InProgress,order:0,completed:false,deadline:'',todoListId:todolistID1,startDate:'',description:'',priority:TaskPriority.Low,addedDate:''},
                {id: v1(), title: "rest API", status:TaskStatus.InProgress,order:0,completed:false,deadline:'',todoListId:todolistID1,startDate:'',description:'',priority:TaskPriority.Low,addedDate:''},
                {id: v1(), title: "GraphQL", status:TaskStatus.InProgress,order:0,completed:false,deadline:'',todoListId:todolistID1,startDate:'',description:'',priority:TaskPriority.Low,addedDate:''}
            ],
            [todolistID2]: [
                {id: v1(), title: "Milk", status:TaskStatus.Complited,order:0,completed:true,deadline:'',todoListId:todolistID2,startDate:'',description:'',priority:TaskPriority.Low,addedDate:''},
                {id: v1(), title: "Bread", status:TaskStatus.Complited,order:0,completed:true,deadline:'',todoListId:todolistID2,startDate:'',description:'',priority:TaskPriority.Low,addedDate:''},
                {id: v1(), title: "Pen", status:TaskStatus.InProgress,order:0,completed:true,deadline:'',todoListId:todolistID2,startDate:'',description:'',priority:TaskPriority.Low,addedDate:''}
            ]
        }
    )
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all',addedDate:'',order:0},
        {id: todolistID2, title: 'What to buy', filter: 'all',addedDate:'',order:0}
    ])

    const addTask = (newTitle: string, todolistId: string) => {
        const action = addTaskAC(newTitle, todolistId)
        dispatchToTasksReducer(action)
    }

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(id: string, status:TaskStatus, todolistId: string) {
        const action = changeTaskStatusAC(id, status, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeFilter(value: ChangeFilterType,todolistId: string) {
        const action = changeTodolistFiltertAC(todolistId, value)
        dispatchToTodolistsReducer(action)
    }

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatchToTodolistsReducer(action)
}
        function addTodolist(title: string) {
            const action = addTodolistAC(title)
            dispatchToTodolistsReducer(action)
            dispatchToTasksReducer(action)
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
                                    tasksForTodolist = tasksForTodolist.filter(task =>task.status===TaskStatus.New)
                                } else if (tl.filter === 'complited') {
                                    tasksForTodolist = tasksForTodolist.filter(task =>task.status===TaskStatus.Complited)
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


export default AppWithReducers;
