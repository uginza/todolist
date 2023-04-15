import React from "react";
import {action} from "@storybook/addon-actions"
import {EditableSpan} from "./EditableSpan";

const onChangeCallback = action('Value was changed')

export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

export const EditableSpanExample = (props: any) => {
    return <EditableSpan title={"Start value"} onChange={onChangeCallback}/>
}