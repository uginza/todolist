
import {appReducer, InitialStateType, setErrorAC, setErrorStatusAC} from "./app-reducer";


let startState:InitialStateType
beforeEach(()=>{

    startState = {
        status: 'idle',
        error:null
}
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setErrorAC('some error'))

    expect(endState.error).toBe('some error')
})
test('correct status of error message should be set', () => {

    const endState = appReducer(startState, setErrorStatusAC('idle'))

    expect(endState.status).toBe('idle')
})