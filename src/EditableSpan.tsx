import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string;
    onChange: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

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

        ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewEditMode} autoFocus/>

        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}