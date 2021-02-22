import './styles.css'
// import thunk from "redux-thunk";
import {createStore, compose, applyMiddleware} from "redux";
import {rootReducer} from "./Redux/rootReducer";
import {asyncIncrement, changeTheme, decrement, increment} from "./Redux/actions";

const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')
const counter = document.getElementById('counter')

// From: https://redux.js.org/understanding/history-and-design/middleware

const monkeypatchLogger = store => next => action => {
    console.log('Action', action)
    console.log('State before', store.getState())
    next(action)
    console.log('State after', store.getState())
}

const monkeypatchErrorHandler = store => next => action => {
    try {
        next(action)
    } catch (err) {
        alert('Errror')
        console.warn('ERRRRRRRRRRRRRRRRRRRRRRRRRRR')
    }
}

const delay = store => next => action => setTimeout(() => next(action), 1000)

const thunk = store => next => action => {
    if (typeof action === 'function'){
        console.log('function')
        action(store.dispatch, store.getState)
    } else {
        console.log('Not function')
        next(action)
    }
}

const store = createStore(
    rootReducer,
    compose(
    applyMiddleware(thunk, delay, monkeypatchErrorHandler, monkeypatchLogger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

window.store = store


// const applyMonkeypatchMiddleware = (store, middlewares) => {
//     middlewares = middlewares.slice()
//     middlewares.reverse()
//     let {dispatch} = store
//     middlewares.forEach(middleware => dispatch = middleware(store)(dispatch))
//     store.dispatch = dispatch
// }

// applyMonkeypatchMiddleware(store, [monkeypatchLogger, monkeypatchErrorHandler, delay])

addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark')
        ? 'light'
        : 'dark'
    store.dispatch(changeTheme(newTheme))
})

store.subscribe(() => {
    const state = store.getState()
    counter.textContent = state.counter
    document.body.className = state.theme.value;

    [addBtn, subBtn, asyncBtn, themeBtn].forEach(btn => {
        btn.disabled = state.theme.disabled
    })
})

store.dispatch({type: "INIT_APPLICATION"})
