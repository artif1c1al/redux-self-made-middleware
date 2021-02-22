import {CHANGE_THEME, DECREMENT, DISABLE_BUTTONS, ENABLE_BUTTONS, INCREMENT} from "./types";

export const enableButtons = () => {
  return {
    type: ENABLE_BUTTONS,
  }
}

export const disableButtons = () => {
  return {
    type: DISABLE_BUTTONS,
  }
}

export const increment = () => {
  return ({type: INCREMENT})
}

export const decrement = () => {
  return ({type: DECREMENT})
}

export const asyncIncrement = () => {
  return function(dispatch){
    dispatch(disableButtons())
    setTimeout(() => {
      dispatch({type: INCREMENT})
      dispatch(enableButtons())
    }, 5500)
  }
}

export const changeTheme = (newTheme) => {
  return {
    type: CHANGE_THEME,
    payload: newTheme
  }
}


// export const isAsyncRunning = (isRunning) => {
//   return {
//     type: IS_ASYNC_RUNNING,
//     payload: isRunning
//   }
// }
