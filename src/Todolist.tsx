import React, {ChangeEvent, useState} from "react";
import {ChangeFilterType} from "./App";
import {KeyboardEvent} from "react";

type TodolistPropsType = {
    shapka: string;
    //tasks:Array<TaskType>;
    tasks: TaskType[];
    removeTask: (task:string) => void;
    addTask:(newTitle:string)=> void;
    changeFilter:(value:ChangeFilterType)=>void;
    changeStatus:(id:string,isDone:boolean)=>void;
    filter:ChangeFilterType;
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
            props.addTask(title.trim())
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
        props.changeFilter('all')
    }
    const onActiveClick=()=>{
        props.changeFilter('active')
    }
    const onComplitedClick=()=>{
        props.changeFilter('complited')
    }

    const [title,setTitle]=useState('')

    return (
        <div>
            <h3>{props.shapka}</h3>
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
                        props.removeTask(el.id)
                    }
                    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
                        let newIsDoneValue=e.currentTarget.checked
                        props.changeStatus(el.id,newIsDoneValue)
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