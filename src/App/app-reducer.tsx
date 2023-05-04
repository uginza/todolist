import {Dispatch} from "redux";
import {authAPI} from "../api/login-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";


export type initialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: initialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: 'idle' | 'loading' | 'succeeded' | 'failed') => (
    {type: 'APP/SET-STATUS', status} as const)
export const setAppIsInitializedAC = (isInitialized: boolean) => (
    {type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)


export const setAppIsInitializedTC:any =()=> (dispatch: Dispatch) => {

    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        }
        dispatch(setAppIsInitializedAC(true))
    })

}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedActionType = ReturnType<typeof setAppIsInitializedAC>

type ActionsType = SetAppStatusActionType |
    SetAppErrorActionType | setAppInitializedActionType
