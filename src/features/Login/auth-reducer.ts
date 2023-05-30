import {setAppStatusAC} from "../../App/app-reducer";
import {authAPI, LoginParamsType} from "../../api/login-api";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


//reducer

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
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

export const {setIsLoggedInAC} = slice.actions

// thunk list

export const loginTC: any = (data: LoginParamsType) =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        authAPI.login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({isLoggedIn: true}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
export const logOutTC: any = () =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        authAPI.logout()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({isLoggedIn: false}))
                    dispatch(setAppStatusAC({status: "idle"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

