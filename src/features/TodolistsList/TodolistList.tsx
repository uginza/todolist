import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../App/store";
import {
    addTodolistTC,
    ChangeFilterType,
    changeTodolistFiltertAC,
    changeTodolistTitleTC,
    fetchTodolistTC,
    removeTodolistTC,
    TodolistDomainType
} from "./Todolist/todolists-reducer";
import {addTaskTC, removeTasksTC, updateTaskTC} from "./Todolist/tasks-reducer";
import {TaskStatus} from "../../api/tasks-api";
import Grid from "@mui/material/Grid";
import {AddItem} from "../../components/AddItemForm/AddItem";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../App/App";
import {Navigate} from "react-router-dom";

type TodolistListPropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<TodolistListPropsType> = ({demo = false}) => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
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
        const action = changeTodolistFiltertAC({id:todolistId, filter:value})
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
        dispatch(addTodolistTC(title))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

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
                            todolist={tl}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                            removeTodolist={removeTodolist}
                            demo={demo}
                        />
                    </Paper>
                </Grid>)
            })}
        </Grid>
    </>)

}