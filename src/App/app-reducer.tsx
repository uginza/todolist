

export type initialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

export type RequestStatusType='idle' | 'loading' | 'succeeded' | 'failed'

const initialState: initialStateType = {
    status: 'idle',
    error: null
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: 'idle' | 'loading' | 'succeeded' | 'failed') => (
    {type: 'APP/SET-STATUS', status} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType = SetAppStatusActionType |
    SetAppErrorActionType
