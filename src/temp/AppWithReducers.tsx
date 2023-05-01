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
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "../features/TodolistsList/Todolist/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFiltertAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "../features/TodolistsList/Todolist/todolists-reducer";
import {TaskPriority, TaskStatus, TaskType} from "../api/tasks-api";

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
                {id: v1(), title: "HTML&CSS",status:TaskStatus.Complited,addedDate:'',order:0,completed:true,deadline:'',todoListId:todolistID1,startDate:'',description:'',priority:TaskPriority.Low,
                    entityStatus: 'idle'},
                {id: v1(), title: "JS", status:TaskStatus.Complited,order:0,completed:true,deadline:'',todoListId:todolistID1,startDate:'',description:'',priority:TaskPriority.Low,addedDate:'',
                    entityStatus: 'idle'},
                {id: v1(), title: "ReactJS", status:TaskStatus.InProgress,order:0,completed:false,deadline:'',todoListId:todolistID1,startDate:'',description:'',priority:TaskPriority.Low,addedDate:'',
                    entityStatus: 'idle'},
                {id: v1(), title: "rest API", status:TaskStatus.InProgress,order:0,completed:false,deadline:'',todoListId:todolistID1,startDate:'',description:'',priority:TaskPriority.Low,addedDate:'',
                    entityStatus: 'idle'},
                {id: v1(), title: "GraphQL", status:TaskStatus.InProgress,order:0,completed:false,deadline:'',todoListId:todolistID1,startDate:'',description:'',priority:TaskPriority.Low,addedDate:'',
                    entityStatus: 'idle'}
            ],
            [todolistID2]: [
                {id: v1(), title: "Milk", status:TaskStatus.Complited,order:0,completed:true,deadline:'',todoListId:todolistID2,startDate:'',description:'',priority:TaskPriority.Low,addedDate:'',
                entityStatus: 'idle'},
                {id: v1(), title: "Bread", status:TaskStatus.Complited,order:0,completed:true,deadline:'',todoListId:todolistID2,startDate:'',description:'',priority:TaskPriority.Low,addedDate:'',
                entityStatus: 'idle'},
                {id: v1(), title: "Pen", status:TaskStatus.InProgress,order:0,completed:true,deadline:'',todoListId:todolistID2,startDate:'',description:'',priority:TaskPriority.Low,addedDate:'',
                entityStatus: 'idle'}
            ]
        }
    )
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all',addedDate:'',entityStatus: 'idle',order:0},
        {id: todolistID2, title: 'What to buy', filter: 'all',addedDate:'',entityStatus: 'idle',order:0}
    ])

    const addTask = (newTitle: string, todolistId: string) => {
        const action = addTaskAC({
            id: '3',
            title: newTitle,
            status: TaskStatus.New,
            order: 0,
            completed: false,
            deadline: '',
            todoListId: todolistId,
            startDate: '',
            description: '',
            priority: TaskPriority.Low,
            addedDate: '',
            entityStatus: 'idle'
        })
        dispatchToTasksReducer(action)
    }

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(id: string, status:TaskStatus, todolistId: string) {
        const action = updateTaskAC(id, {status}, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {
        const action = updateTaskAC(id, {title}, todolistId)
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
            const action = addTodolistAC( {id: todolistID1, title:title,addedDate:'',entityStatus: 'idle',order:0})
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
