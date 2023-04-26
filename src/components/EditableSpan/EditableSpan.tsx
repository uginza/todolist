import TextField from "@mui/material/TextField/TextField";
import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string;
    onChange: (newTitle: string) => void
}

export const EditableSpan=React.memo((props: EditableSpanPropsType)=> {
    console.log('Editable Span is called')
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    return editMode

        ? <TextField variant="standard" id="standard-basic" value={title} onChange={onChangeTitleHandler} onBlur={activateViewEditMode} autoFocus/>

        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})