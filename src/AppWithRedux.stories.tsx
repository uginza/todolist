import React from "react";
import {action} from "@storybook/addon-actions"
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";

const onChangeCallback = action('Value was removed')

export default {
    title: "AppWithRedux Component",
    component: AppWithRedux
}

export const AppWithReduxExample = () => {
    return<Provider store={store}> <AppWithRedux/></Provider>
}