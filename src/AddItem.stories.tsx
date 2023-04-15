import {AddItem} from "./AddItem";
import React from "react";

export default{
    title:"Add Item Form Component",
    component:AddItem
}

export const AddItemEx=()=>{
    return <AddItem addItem={(newTitle)=>{alert(newTitle)}}/>
}