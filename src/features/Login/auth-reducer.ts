import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../App/app-reducer";
import {authAPI, LoginParamsType} from "../../api/login-api";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {createSlice} from "@reduxjs/toolkit";
import {action} from "@storybook/addon-actions";


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

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action:any) {
            state.isLoggedIn = action.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer /*(state: any = initialState, action: LoginReducerActionType): LoginInitialStateType => {
    switch (action.type) {
        case 'login/SET-LOGGED-IN': {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        default:
            return state;
    }
}*/


//action list

export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
    type: 'login/SET-LOGGED-IN', isLoggedIn
} as const)

// thunk list

export const loginTC: any = (data: LoginParamsType) =>
    (dispatch: LoginThunkDispatchType) => {
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
export const logOutTC: any = () =>
    (dispatch: LoginThunkDispatchType) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.logout()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(false))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

