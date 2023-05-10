import {setAppErrorAC, setAppStatusAC} from "../App/app-reducer";
import {ResponseType} from "../api/tasks-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error:'some error occurred'}))
    }
    dispatch(setAppStatusAC({status:'failed'}))
}

export const handleServerNetworkError =(error:any,dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.message?error.message:'some error occured'))
    dispatch(setAppStatusAC({status:'failed'}))
}