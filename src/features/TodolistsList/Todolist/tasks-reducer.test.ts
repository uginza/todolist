import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksStateType, updateTaskAC} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriority, TaskStatus} from "../../../api/tasks-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: "HTML&CSS", status: TaskStatus.Complited,
                addedDate: '', order: 0, completed: true, deadline: '', todoListId: 'todolistId1',
                startDate: '', description: '', priority: TaskPriority.Low, entityStatus: 'idle'
            },
            {
                id: '2',
                title: "JS",
                status: TaskStatus.New,
                order: 0,
                completed: true,
                deadline: '',
                todoListId: 'todolistId1',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: ''
                , entityStatus: 'idle'
            },
            {
                id: '3',
                title: "ReactJS",
                status: TaskStatus.Complited,
                order: 0,
                completed: false,
                deadline: '',
                todoListId: 'todolistId1',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: ''
                , entityStatus: 'idle'
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: "HTML&CSS",
                status: TaskStatus.Complited,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                todoListId: 'todolistId2',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: "JS",
                status: TaskStatus.New,
                order: 0,
                completed: true,
                deadline: '',
                todoListId: 'todolistId2',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: ''
                , entityStatus: 'idle'
            },
            {
                id: '3',
                title: "ReactJS",
                status: TaskStatus.Complited,
                order: 0,
                completed: false,
                deadline: '',
                todoListId: 'todolistId2',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: '',
                entityStatus: 'idle'
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1', title: "HTML&CSS", status: TaskStatus.Complited,
                addedDate: '', order: 0, completed: true, deadline: '', todoListId: 'todolistId1',
                startDate: '', description: '', priority: TaskPriority.Low
            },
            {
                id: '2',
                title: "JS",
                status: TaskStatus.New,
                order: 0,
                completed: true,
                deadline: '',
                todoListId: 'todolistId1',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: ''
            },
            {
                id: '3',
                title: "ReactJS",
                status: TaskStatus.Complited,
                order: 0,
                completed: false,
                deadline: '',
                todoListId: 'todolistId1',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: ''
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: "HTML&CSS",
                status: TaskStatus.Complited,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                todoListId: 'todolistId2',
                startDate: '',
                description: '',
                priority: TaskPriority.Low
            },
            {
                id: '3',
                title: "ReactJS",
                status: TaskStatus.Complited,
                order: 0,
                completed: false,
                deadline: '',
                todoListId: 'todolistId2',
                startDate: '',
                description: '',
                priority: TaskPriority.Low,
                addedDate: ''
            }
        ]
    })
})

test('correct task should be added to correct array', () => {

    /* const action = addTaskAC('juce', 'todolistId2')*/
    const action = addTaskAC({
        id: '3',
        title: "juce",
        status: TaskStatus.New,
        order: 0,
        completed: false,
        deadline: '',
        todoListId: 'todolistId2',
        startDate: '',
        description: '',
        priority: TaskPriority.Low,
        addedDate: '',
        entityStatus: 'idle'
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatus.New)
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC('2', {status: TaskStatus.Complited}, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatus.Complited)
    expect(endState['todolistId1'][1].status).toBe(TaskStatus.New)
})

test('task title of specified task should be changed', () => {

    const action = updateTaskAC('2', {title: "Donny"}, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe("Donny")
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({todolist:{id: '2', title: 'What to learn', addedDate: '', entityStatus: 'idle', order: 0}})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC({id:'todolistId2'})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('Empty array should be set when we set todolists', () => {
    const action = setTodolistsAC({
        todolists: [
            {id: '1', title: 'What to learn', addedDate: '', entityStatus: 'idle', order: 0},
            {id: '2', title: 'What to buy', addedDate: '', entityStatus: 'idle', order: 0}
        ]
    })

    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('Task array should be set when we set todolists', () => {
    const action = setTasksAC(
        [{
            id: '1', title: "HTML&CSS", status: TaskStatus.Complited,
            addedDate: '', order: 0, completed: true, deadline: '', todoListId: 'todolistId1',
            startDate: '', description: '', priority: TaskPriority.Low,
            entityStatus: 'idle'
        }], 'todolistId1')


    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': []
    }, action)

    expect(endState['todolistId1'].length).toBe(1)
    expect(endState['todolistId2']).toStrictEqual([])
})