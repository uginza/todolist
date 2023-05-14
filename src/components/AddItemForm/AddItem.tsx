import {AddCircle} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton/IconButton";
import TextField from "@mui/material/TextField/TextField";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {useAddItemForm} from "./hooks/useAddItem";


type AddItemPropsType = {
    addItem: (newTitle: string) => void;
    disabled?: boolean
}

export const AddItem = React.memo(({addItem, disabled = false}: AddItemPropsType) => {

    const {
        title,
        error,
        onChangeHandler,
        onKeyPressHandler,
        buttonSettings,
        addTask
    }=useAddItemForm(addItem)

    return (<div>
        {/* <input value={title}
               className={error ? "error" : ""}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}/>*/}
        <TextField
            size="small"
            disabled={disabled}
            id="standard-basic"
            label="Type title"
            variant="outlined"
            value={title}
            error={!!error}
            helperText={error}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}/>
        {/*<button onClick={addTask}>+</button>*/}
        <IconButton disabled={disabled} color="secondary" style={buttonSettings}
                    onClick={addTask}><AddCircle/></IconButton>
    </div>)
})