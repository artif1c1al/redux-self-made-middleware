import './styles.css'
import thunk from "redux-thunk";
import logger from 'redux-logger';
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./Redux/rootReducer";
import {changeTheme, decrement, increment} from "./Redux/actions";

const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')
const counter = document.getElementById('counter')

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    logger
  )
)

addBtn.addEventListener('click', () => {
  store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
  store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
  setTimeout(() => {
    store.dispatch(increment())
  }, 2000)
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
  document.body.className = state.theme.value
})
counter.textContent = store.getState().counter
