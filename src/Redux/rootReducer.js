import {combineReducers} from "redux";
import {CHANGE_THEME, DISABLE_BUTTONS, ENABLE_BUTTONS} from "./types";

const counterReducer = (state = 0, action) => {
    if(action.type === "INCREMENT") {
        state++
    } else if(action.type === "DECREMENT") {
        state--
    } else if(action.type === "INIT_APPLICATION") {
    }
    return state
}

const initialThemeState = {
    value: 'light',
    disabled: false
}

const themeReducer = (state = initialThemeState, action) => {
    switch(action.type) {
        case CHANGE_THEME:
            return {...state, value: action.payload}
        case ENABLE_BUTTONS:
            return {...state, disabled: false}
        case DISABLE_BUTTONS:
            return {...state, disabled: true}
        default: return state
    }
}

export const rootReducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer,
})
