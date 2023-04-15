import React from "react";
import {action} from "@storybook/addon-actions"
import AppWithRedux from "./AppWithRedux";

const onChangeCallback = action('Value was removed')

export default {
    title: "AppWithRedux Component",
    component: AppWithRedux
}

export const AppWithReduxExample = (props: any) => {
    return <AppWithRedux/>
}