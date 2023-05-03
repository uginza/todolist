import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../App/app-reducer";
import {authAPI, LoginParamsType} from "../../api/login-api";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";


//types

export type LoginThunkDispatchType = Dispatch<LoginReducerActionType
   | SetAppErrorActionType | SetAppStatusActionType>

export type LoginInitialStateType = {
    isLoggedIn: boolean
}

type LoginReducerActionType = ReturnType<typeof setIsLoggedInAC>


//reducer

const initialState: LoginInitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: any = initialState, action: LoginReducerActionType): LoginInitialStateType => {
    switch (action.type) {
        case 'login/SET-LOGGED-IN':{
            return {...state,isLoggedIn : action.isLoggedIn}
        }
        default:
            return state;
    }
}


//action list

export const setIsLoggedInAC = (isLoggedIn:boolean) => ({
    type: 'login/SET-LOGGED-IN',isLoggedIn
} as const)

// thunk list

export const loginTC: any = (data: LoginParamsType) =>
    (dispatch:LoginThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

