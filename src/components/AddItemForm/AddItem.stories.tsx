import {AddItem} from "./AddItem";
import React from "react";
import {action} from"@storybook/addon-actions"

const callback=action('Button "add" was pressed')

export default{
    title:"Add Item Form Component",
    component:AddItem
}

export const AddItemEx=()=>{
    return <AddItem addItem={callback}/>
}