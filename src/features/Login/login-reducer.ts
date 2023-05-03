import {setAppStatusAC} from "../../App/app-reducer";
import {authAPI, LoginParamsType} from "../../api/login-api";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";



//types

export type ThunkDispatchType = Dispatch<LoginReducerActionType>
 /*   | SetAppErrorActionType | SetAppStatusActionType*/
type InitialStateType={}

type LoginReducerActionType=any


//reducer

const initialState:InitialStateType={}

export const loginReducer = (state: any=initialState, action: LoginReducerActionType): InitialStateType => {
    switch (action.type) {

        default:
            return state;
    }
}
//action list


/*export const setTasksAC = (tasks: Array<TaskType>, id: string) => ({
    type: 'SET-TASKS', id, tasks
} as const)*/

// thunk list

export const loginTC: any = (data: LoginParamsType) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                alert('Good job super bro')
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
}

