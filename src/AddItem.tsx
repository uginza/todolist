import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemPropsType = {
    addTask: (newTitle: string, todolistId: string) => void;
    id: string;
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
            props.addTask(title.trim(), props.id)
            setTitle('');
        } else {
            setError("Title is required")
        }

    }

    return (<div>
        <input value={title}
               className={error ? "error" : ""}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}/>
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>)
}