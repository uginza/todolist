import React, {ChangeEvent, useCallback, useEffect} from "react";
import {AddItem} from "../../../components/AddItemForm/AddItem";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button/Button";
import {Task} from "./Task/Task";
import {TaskStatus, TaskType} from "../../../api/tasks-api";
import {ChangeFilterType, TodolistDomainType} from "./todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./tasks-reducer";

type TodolistPropsType = {
    todolist:TodolistDomainType
    tasks: TaskType[];
    addTask: (newTitle: string, todolistId: string) => void;
    changeFilter: (value: ChangeFilterType, todolistId: string) => void;
    removeTask: (task: string, todolistId: string) => void;
    changeTaskStatus: (id: string, status: TaskStatus, todolistId: string) => void;
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    demo?:boolean
}
export const Todolist = React.memo(({demo=false,...props}: TodolistPropsType) => {

    const dispatch = useDispatch();
    useEffect(() => {
        if(demo){
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])
    const onAllClick = useCallback(() => {
        props.changeFilter('all', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const onActiveClick = useCallback(() => {
        props.changeFilter('active', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const onCompletedClick = useCallback(() => {
        props.changeFilter('complited', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolist.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props.changeTodolistTitle, props.todolist.id])

    let tasksForTodolist = props.tasks
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(task => task.status === TaskStatus.InProgress)
    } else if (props.todolist.filter === 'complited') {
        tasksForTodolist = props.tasks.filter(task => task.status === TaskStatus.Complited)
    }

    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={changeTodolistTitle} disabled={props.todolist.entityStatus==='loading'}/>
                <IconButton disabled={props.todolist.entityStatus==='loading'} onClick={removeTodolistHandler} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
                {/* <button onClick={removeTodolistHandler}>X</button>*/}
            </h3>
            <AddItem addItem={addTask} disabled={props.todolist.entityStatus==='loading'}/>

            <div>
                {tasksForTodolist.map((el) =>
                    <Task key={el.id}
                          removeTask={props.removeTask}
                          task={el}
                          changeTaskStatus={props.changeTaskStatus}
                          changeTaskTitle={props.changeTaskTitle}
                          todolistId={props.todolist.id}
                          disabled={props.todolist.entityStatus==='loading'}
                    />)}
            </div>
            <div>
                <Button variant={props.todolist.filter === "all" ? "contained" : "text"} onClick={onAllClick}>All</Button>
                <Button variant={props.todolist.filter === "active" ? "contained" : "text"} color={"primary"}
                        onClick={onActiveClick}>Active
                </Button>
                <Button variant={props.todolist.filter === "complited" ? "contained" : "text"} color={"secondary"}
                        onClick={onCompletedClick}>Completed
                </Button>
            </div>
        </div>
    )
})


