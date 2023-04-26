import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../App/store";
import {
    addTodolistTC,
    ChangeFilterType,
    changeTodolistFiltertAC,
    changeTodolistTitleTC,
    fetchTodolistTC,
    removeTodolistTC,
    TodolistDomainType
} from "../features/TodolistsList/Todolist/todolists-reducer";
import {addTaskTC, removeTasksTC, updateTaskTC} from "../features/TodolistsList/Todolist/tasks-reducer";
import {TaskStatus} from "../api/tasks-api";
import Grid from "@mui/material/Grid";
import {AddItem} from "../components/AddItemForm/AddItem";
import Paper from "@mui/material/Paper";
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {TasksStateType} from "../App/App";

export const TodolistList: React.FC = () => {
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