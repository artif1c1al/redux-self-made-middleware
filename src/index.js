import './styles.css'
import thunk from "redux-thunk";
import logger from 'redux-logger';
import {applyMiddleware, createStore, compose} from "redux";
import {rootReducer} from "./Redux/rootReducer";
import {asyncIncrement, changeTheme, decrement, increment} from "./Redux/actions";
import {RUNNING, STOPPED} from "./Redux/types";

const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')
const counter = document.getElementById('counter')

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

window.store = store

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
