import {combineReducers} from "redux";
import {CHANGE_THEME} from "./types";

const counterReducer = (state = 0, action) => {
  if(action.type === "INCREMENT") {
    state++
  } else if(action.type === "DECREMENT") {
    state--
  } else if(action.type === "INIT") {
  }
  return state
}

const initialThemeState = {
  value: 'light'
}
const themeReducer = (state = initialThemeState, action) => {
  switch(action.type) {
    case CHANGE_THEME:
      return {...state, value: action.payload}
    default: return state
  }
}

export const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer
})