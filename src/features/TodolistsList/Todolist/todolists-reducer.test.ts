import {
    addTodolistAC, ChangeFilterType,
    changeTodolistFiltertAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'


const todolistId1 = v1()
const todolistId2 = v1()
let startState: Array<TodolistDomainType>
beforeEach(()=>{

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all',addedDate:'',order:0},
        {id: todolistId2, title: 'What to buy', filter: 'all',addedDate:'',order:0}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    let newTodolist = {id:'3', title: 'Pay a visit to granny',addedDate:'',order:0}

    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe( 'Pay a visit to granny')
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState,changeTodolistTitleAC(todolistId2,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: ChangeFilterType = 'complited'

    const endState = todolistsReducer(startState, changeTodolistFiltertAC(todolistId2,newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('Array of todolists should be set', () => {
   const action= setTodolistsAC(startState)
    const endState = todolistsReducer([],action)

    expect(endState.length).toBe(2)
})





