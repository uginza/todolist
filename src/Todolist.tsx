import React, {ChangeEvent} from "react";
import {ChangeFilterType} from "./App";
import {AddItem} from "./AddItem";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

type TodolistPropsType = {
    id: string;
    title: string;
    //tasks:Array<TaskType>;
    tasks: TaskType[];
    removeTask: (task: string, todolistId: string) => void;
    addTask: (newTitle: string, todolistId: string) => void;
    changeFilter: (value: ChangeFilterType, todolistId: string) => void;
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (id: string, newTitle:string, todolistId: string) => void;
    filter: ChangeFilterType;
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle:(newTitle:string,todolistId: string)=>void
}
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export const Todolist = (props: TodolistPropsType) => {

    const onAllClick = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClick = () => {
        props.changeFilter('active', props.id)
    }
    const onComplitedClick = () => {
        props.changeFilter('complited', props.id)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTask=(title:string)=>{
        props.addTask(title,props.id)
    }
    const changeTodolistTitle=(newTitle:string)=>{
        props.changeTodolistTitle(props.id,newTitle)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <IconButton onClick={removeTodolistHandler} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
               {/* <button onClick={removeTodolistHandler}>X</button>*/}
            </h3>
            <AddItem addItem={addTask}/>

            <ul>
                {props.tasks.map((el) => {
                    const onClickHandler = () => {
                        props.removeTask(el.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(el.id, newIsDoneValue, props.id)
                    }
                    const onChangeTitleHandler = (newTitle:string) => {

                        props.changeTaskTitle(el.id, newTitle, props.id)
                    }
                    return (
                        <li key={el.id} className={el.isDone ? "is-done" : ""}>
                            <input onChange={onChangeStatusHandler} type="checkbox" checked={el.isDone}/>
                            <EditableSpan title={el.title}
                            onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onClickHandler} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                           {/* <button onClick={onClickHandler}>X</button>*/}
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ''} onClick={onAllClick}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClick}>Active
                </button>
                <button className={props.filter === "complited" ? "active-filter" : ""}
                        onClick={onComplitedClick}>Completed
                </button>
            </div>
        </div>
    )
}

