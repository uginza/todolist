import {AddItem} from "./AddItem";
import React from "react";
import {action} from "@storybook/addon-actions"
import {Task} from "./Task";

const removeTaskcallback = action('Button "add" was pressed')
const changeTaskStatuscallback = action('Button "add" was pressed')
const changeTaskTitlecallback = action('Button "add" was pressed')

export default {
    title: "Add Item Form Component",
    component: AddItem
}

export const TaskExample = (props: any) => {
    return <>
        <Task removeTask={props.removeTask}
              task={{id: '1', isDone: true, title: 'CSS'}}
              changeTaskStatus={props.changeTaskStatus}
              changeTaskTitle={props.changeTaskTitle}
              todolistId={'todolistId1'}/>

        <Task removeTask={props.removeTask}
              task={{id: '2', isDone: false, title: 'React'}}
              changeTaskStatus={props.changeTaskStatus}
              changeTaskTitle={props.changeTaskTitle}
              todolistId={'todolistId2'}/>
    </>
}