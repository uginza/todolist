import React from "react";
import {action} from "@storybook/addon-actions"
import {Task} from "./Task";
import {TaskPriority, TaskStatus} from "../../../../api/tasks-api";

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
              task={{id: '1', status:TaskStatus.Complited, title: 'CSS',addedDate:'',order:0,completed:true,deadline:'',todoListId:'todolistID1',startDate:'',description:'',priority:TaskPriority.Low}}
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}
              todolistId={'todolistId1'}/>

        <Task removeTask={removeTaskCallback}
              task={{id: '2', status:TaskStatus.Complited, title: 'React',addedDate:'',order:0,completed:true,deadline:'',todoListId:'todolistID1',startDate:'',description:'',priority:TaskPriority.Low}}
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}
              todolistId={'todolistId2'}/>
    </>
}