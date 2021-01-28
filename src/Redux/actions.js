import {CHANGE_THEME, DECREMENT, INCREMENT} from "./types";

export const increment = () => {
  return ({type: INCREMENT})
}

export const decrement = () => {
  return ({type: DECREMENT})
}

export const asyncIncrement = () => {
  return function(dispatch){
    setTimeout(() => {
      dispatch({type: INCREMENT})
    }, 1500)
  }
}

export const changeTheme = (newTheme) => {
  return {
    type: CHANGE_THEME,
    payload: newTheme
  }
}