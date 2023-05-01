import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../App/app-reducer";
import {ResponseType} from "../api/tasks-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError =(error:any,dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC(error.message?error.message:'some error occured'))
    dispatch(setAppStatusAC('failed'))
}