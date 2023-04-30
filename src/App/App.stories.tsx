import React from "react";
import {action} from "@storybook/addon-actions"
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

const onChangeCallback = action('Value was removed')

export default {
    title: "App Component",
    component: App,
    decorators:[ReduxStoreProviderDecorator]
}

export const AppExample = () => {
    return <App demo={true}/>
}