import React from "react";
import {action} from "@storybook/addon-actions"
import {EditableSpan} from "./EditableSpan";

const removeTaskCallback = action('Task was removed')
const changeTaskStatusCallback = action('TaskStatus was changed')
const changeTaskTitleCallback = action('Task Title was changed')

export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

export const EditableSpanExample = (props: any) => {
    return <>
    </>
}