import React, {useState} from 'react';
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
import {TaskPriority, TaskStatus, TaskType} from "../api/tasks-api";
import {ChangeFilterType, TodolistDomainType} from "../features/TodolistsList/Todolist/todolists-reducer";
import {TasksStateType} from "../features/TodolistsList/Todolist/tasks-reducer";

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let [tasks, setTasks] = useState<TasksStateType>({
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
    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate:'',order:0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate:'',order:0}
    ])

    const addTask = (newTitle: string, todolistId: string) => {
        let newTask = {id: v1(), title: newTitle,status:TaskStatus.New,order:0,completed:true,deadline:'',todoListId:todolistId,startDate:'',description:'',priority:TaskPriority.Low,addedDate:''}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let filteredTasks = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks,[todolistId]:filteredTasks})
    }

    function changeStatus(id: string, status:TaskStatus, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.status = status;
        }
        setTasks({...tasks});
    }

    function changeTaskTitle(id: string, newTitle:string, todolistId: string) {
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

    function changeTodolistTitle(todolistId: string,newTitle:string){
        const todoList=todolists.find(tl=>tl.id===todolistId)
        if (todoList){
            todoList.title=newTitle;
        }
        setTodolists([...todolists])
    }

    function addTodolist(title: string) {
        let todolist: TodolistDomainType = {
            id: v1(),
            title: title,
            filter: 'all',
            addedDate:'',
            order:0
        }
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
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
                        tasksForTodolist = tasksForTodolist.filter(task => task.status===TaskStatus.New)
                    } else if (tl.filter === 'complited') {
                        tasksForTodolist = tasksForTodolist.filter(task => task.status===TaskStatus.Complited)
                    }
                    return <Grid item>
                        <Paper style={{padding:'10px'}}>
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
export default App;
