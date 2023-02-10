import React, {ChangeEvent, useState} from "react";
import {ChangeFilterType} from "./App";
import {KeyboardEvent} from "react";

type TodolistPropsType = {
    id:string;
    title: string;
    //tasks:Array<TaskType>;
    tasks: TaskType[];
    removeTask: (task:string,todolistId: string) => void;
    addTask:(newTitle:string,todolistId: string)=> void;
    changeFilter:(value:ChangeFilterType,todolistId:string)=>void;
    changeStatus:(id:string,isDone:boolean,todolistId: string)=>void;
    filter:ChangeFilterType;
    removeTodolist:(todolistId:string)=>void;
}
type TaskType = {
    id:string;
    title: string;
    isDone: boolean;
}
export const Todolist = (props: TodolistPropsType) => {
    let[error,setError]=useState('')

    const addTask=()=>{
        if(title.trim()!==""){
            props.addTask(title.trim(),props.id)
            setTitle('');
        } else{
            setError("Title is required")
        }

    }
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
        setError("")
        if(event.key==='Enter'){
            addTask();
        }
    }
    const onAllClick=()=>{
        props.changeFilter('all',props.id)
    }
    const onActiveClick=()=>{
        props.changeFilter('active',props.id)
    }
    const onComplitedClick=()=>{
        props.changeFilter('complited',props.id)
    }

    const [title,setTitle]=useState('')
    const removeTodolistHandler=()=>{
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolistHandler}>X</button></h3>

            <div>
                <input value={title}
                       className={error ? "error":""}
                       onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                {error &&  <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map((el) => {
                    const onClickHandler=()=>{
                        props.removeTask(el.id,props.id)
                    }
                    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
                        let newIsDoneValue=e.currentTarget.checked
                        props.changeStatus(el.id,newIsDoneValue,props.id)
                    }
                    return (
                        <li key={el.id} className={el.isDone?"is-done":""}>
                            <input onChange={onChangeHandler} type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter==="all"? "active-filter":''} onClick={onAllClick}>All</button>
                <button className={props.filter==="active" ? "active-filter":""} onClick={onActiveClick}>Active</button>
                <button className={props.filter==="complited" ? "active-filter":""} onClick={onComplitedClick}>Completed</button>
            </div>
        </div>
    )
}