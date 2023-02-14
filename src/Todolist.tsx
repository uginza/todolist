import React, {ChangeEvent} from "react";
import {ChangeFilterType} from "./App";
import {AddItem} from "./AddItem";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
    id: string;
    title: string;
    //tasks:Array<TaskType>;
    tasks: TaskType[];
    removeTask: (task: string, todolistId: string) => void;
    addTask: (newTitle: string, todolistId: string) => void;
    changeFilter: (value: ChangeFilterType, todolistId: string) => void;
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void;
    filter: ChangeFilterType;
    removeTodolist: (todolistId: string) => void;
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

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItem addItem={addTask}/>

            <ul>
                {props.tasks.map((el) => {
                    const onClickHandler = () => {
                        props.removeTask(el.id, props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(el.id, newIsDoneValue, props.id)
                    }
                    return (
                        <li key={el.id} className={el.isDone ? "is-done" : ""}>
                            <input onChange={onChangeHandler} type="checkbox" checked={el.isDone}/>
                            <EditableSpan title={el.title}
                            onChange={(value)=>{}}/>
                            <button onClick={onClickHandler}>X</button>
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

