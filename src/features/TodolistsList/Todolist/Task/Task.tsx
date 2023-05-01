import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatus, TaskType} from "../../../../api/tasks-api";

type TaskPropsType = {
    removeTask: (task: string, todolistId: string) => void;
    changeTaskStatus: (id: string, status: TaskStatus, todolistId: string) => void;
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
    task: TaskType
    todolistId: string
    disabled?: boolean
}

export const Task = React.memo(({disabled = false, ...props}: TaskPropsType) => {
    const onClickHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.removeTask, props.task.id, props.todolistId])
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatus.Complited : TaskStatus.New, props.todolistId)
    }, [props.changeTaskStatus, props.task.id, props.todolistId])
    const onChangeTitleHandler = useCallback((newTitle: string) => {

        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])
    return (
        <div key={props.task.id} className={props.task.status === TaskStatus.Complited ? "is-done" : ""}>
            <Checkbox onChange={onChangeStatusHandler} checked={props.task.status === TaskStatus.Complited}
                      disabled={disabled}/>
            <EditableSpan title={props.task.title}
                          onChange={onChangeTitleHandler} disabled={disabled}/>
            <IconButton onClick={onClickHandler} aria-label="delete" disabled={disabled}>
                <DeleteIcon/>
            </IconButton>
            {/* <button onClick={onClickHandler}>X</button>*/}
        </div>
    )
})