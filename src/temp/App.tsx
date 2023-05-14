import React from 'react';
import '../App/App.css';
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {AddItem} from "../components/AddItemForm/AddItem";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TaskStatus} from "../api/tasks-api";
import {useTodolists} from "../App/hooks/useTodolists";
import {useTasks} from "../App/hooks/useTasks";


function App() {
    let {tasks, setTasks,addTask,removeTask,changeStatus,changeTaskTitle,removeAllTasks,newTodolistTasks}= useTasks()
    let [todolists,changeFilter,removeTodolist,changeTodolistTitle,addTodolist] = useTodolists(removeAllTasks,newTodolistTasks)


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
