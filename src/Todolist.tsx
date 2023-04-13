import React, {ChangeEvent, useCallback} from "react";
import {ChangeFilterType} from "./App";
import {AddItem} from "./AddItem";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";

type TodolistPropsType = {
    id: string;
    title: string;
    //tasks:Array<TaskType>;
    tasks: TaskType[];

    addTask: (newTitle: string, todolistId: string) => void;
    changeFilter: (value: ChangeFilterType, todolistId: string) => void;
    removeTask: (task: string, todolistId: string) => void;
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
    filter: ChangeFilterType;
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('Todolist is called')

    const onAllClick = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id])
    const onActiveClick = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id])
    const onComplitedClick = useCallback(() => {
        props.changeFilter('complited', props.id)
    }, [props.changeFilter, props.id])
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])

    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(task => !task.isDone)
    } else if (props.filter === 'complited') {
        tasksForTodolist = props.tasks.filter(task => task.isDone)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolistHandler} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
                {/* <button onClick={removeTodolistHandler}>X</button>*/}
            </h3>
            <AddItem addItem={addTask}/>

            <div>
                {tasksForTodolist.map((el) =>
                    <Task key={el.id}
                        removeTask={props.removeTask}
                        task={el}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        todolistId={props.id}/>)}
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClick}>All</Button>
                <Button variant={props.filter === "active" ? "contained" : "text"} color={"primary"}
                        onClick={onActiveClick}>Active
                </Button>
                <Button variant={props.filter === "complited" ? "contained" : "text"} color={"secondary"}
                        onClick={onComplitedClick}>Completed
                </Button>
            </div>
        </div>
    )
})

type TaskPropsType = {
    removeTask: (task: string, todolistId: string) => void;
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
    task: TaskType
    todolistId: string
}

const Task = (props: TaskPropsType) => {
    const onClickHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
    }
    const onChangeTitleHandler = (newTitle: string) => {

        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }
    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeStatusHandler} checked={props.task.isDone}/>
            <EditableSpan title={props.task.title}
                          onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
            {/* <button onClick={onClickHandler}>X</button>*/}
        </div>
    )
}
