import { applyMiddleware, createStore } from "redux";
import * as ActionTypes from "./ActionTypes"
import thunk from "redux-thunk";
import logger from "redux-logger";

const reducer = (
  state = {    
    staffList: [],
    userStatus: {isLoggedIn: false, active: false, role: null, errorMess: null, infoMess: null },
    users: [],
    veDoList: [],
    isLoading: false,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_EMPLOYEE:
        return {...state, staffList: action.payload}
    case ActionTypes.LOAD_STAFFS:
        return {...state, staffList: action.payload, isLoading: false, errMess: null}
    case ActionTypes.LOAD_USERS:
        return {...state, users: action.payload, isLoading: false, errMess: null}
    case ActionTypes.LOAD_USER_STATUS:
        return {...state, userStatus: action.payload, isLoading: false, errMess: null}
    case ActionTypes.LOAD_VEDO:
        return {...state, veDoList: action.payload, isLoading: false, errMess: null}
    case ActionTypes.STAFFS_LOADING:
          return {...state, staffList: [], isLoading: true, errMess: null}
    case ActionTypes.STAFFS_LOADING_FAILED:
        return {...state, staffList: [], isLoading: false, errMess: action.payload}    
    default:
      return state;
  }
};
export const store = createStore(reducer, applyMiddleware(thunk, logger));
