import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todolistId ='900a8c4f-d01c-43d0-ac52-c082cf97900f'
            tasksAPI.GetTasks(todolistId)
                .then((res) => {
                    setState(res.data)
                })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId ='900a8c4f-d01c-43d0-ac52-c082cf97900f'
        tasksAPI.CreateTasks(todolistId,"buy milk")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = '900a8c4f-d01c-43d0-ac52-c082cf97900f'
        const taskId='fc10a4c7-bc81-4d85-b786-9afb828771d9'
        tasksAPI.DeleteTasks(todolistID,taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = '900a8c4f-d01c-43d0-ac52-c082cf97900f'
        const taskId='fc10a4c7-bc81-4d85-b786-9afb828771d9'
        tasksAPI.updateTasks(todolistID,taskId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

