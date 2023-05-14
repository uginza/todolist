import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm=(onAddItem: (newTitle: string) => void)=>{
    const [title, setTitle] = useState('')

    let [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError("")
        }
        if (event.key === 'Enter') {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
            onAddItem(title.trim())
            setTitle('');
        } else {
            setError("Title is required")
        }

    }

    const buttonSettings = {
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px'
    }
    return {
        title,error,onChangeHandler,onKeyPressHandler,buttonSettings,addTask
    }
}