export type RequestStatusType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: RequestStatusType = {
    status: 'idle',
    error: 'some error'
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
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setErrorStatusAC = (status: 'idle' | 'loading' | 'succeeded' | 'failed') => (
    {type: 'APP/SET-STATUS', status} as const)

export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetStatusActionType = ReturnType<typeof setErrorStatusAC>

type ActionsType = SetStatusActionType |
    SetErrorActionType
