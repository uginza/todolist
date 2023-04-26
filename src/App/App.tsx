import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "../Todolist";
import {AddItem} from "../components/AddItemForm/AddItem";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTaskTC, removeTasksTC, updateTaskTC} from "../state/tasks-reducer";
import {
    addTodolistTC,
    ChangeFilterType,
    changeTodolistFiltertAC,
    changeTodolistTitleTC,
    fetchTodolistTC,
    removeTodolistTC,
    TodolistDomainType,
} from "../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {TaskStatus, TaskType} from "../api/tasks-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {


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
               <TodolistList/>
            </Container>
        </div>
    );
}




export type TodolistListPropsType = {}

const TodolistList: React.FC<TodolistListPropsType> = (props) => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])
    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])

    const addTask = useCallback((newTitle: string, todolistId: string) => {
        const thunk = addTaskTC(newTitle, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const removeTask = useCallback((id: string, todolistId: string) => {

        const thunk = removeTasksTC(id, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeStatus = useCallback((id: string, status: TaskStatus, todolistId: string) => {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
        const thunk = updateTaskTC(id, {title}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeFilter = useCallback((value: ChangeFilterType, todolistId: string) => {
        const action = changeTodolistFiltertAC(todolistId, value)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const thunk = removeTodolistTC(todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        const thunk = changeTodolistTitleTC(todolistId, newTitle)
        dispatch(thunk)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])
    return (<>
        <Grid container>
            <AddItem addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id]

                return (<Grid item key={tl.id}>
                    <Paper style={{padding: '10px'}}>
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
                </Grid>)
            })}
        </Grid>
    </>)

}

export default App;