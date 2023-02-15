import Button from "@mui/material/Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemPropsType = {
    addItem: (newTitle: string) => void;
}

export function AddItem(props: AddItemPropsType) {

    const [title, setTitle] = useState('')

    let [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError("")
        if (event.key === 'Enter') {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle('');
        } else {
            setError("Title is required")
        }

    }

    const buttonSettings={
    maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
        }


    return (<div>
        <input value={title}
               className={error ? "error" : ""}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}/>
        {/*<button onClick={addTask}>+</button>*/}
        <Button style={buttonSettings}  variant="contained" onClick={addTask}>+</Button>
        {error && <div className="error-message">{error}</div>}
    </div>)
}