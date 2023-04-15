import React from "react";
import {action} from "@storybook/addon-actions"
import {Task} from "./Task";

const removeTaskCallback = action('Task was removed')
const changeTaskStatusCallback = action('TaskStatus was changed')
const changeTaskTitleCallback = action('Task Title was changed')

export default {
    title: "Task Component",
    component: Task
}

export const TaskExample = (props: any) => {
    return <>
        <Task removeTask={removeTaskCallback}
              task={{id: '1', isDone: true, title: 'CSS'}}
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}
              todolistId={'todolistId1'}/>

        <Task removeTask={removeTaskCallback}
              task={{id: '2', isDone: false, title: 'React'}}
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}
              todolistId={'todolistId2'}/>
    </>
}