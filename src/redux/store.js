import { createStore, combineReducers } from "redux";
import { 
    userData, 
    isLoginDisplayed, 
    isSignupDisplayed,
    canvas
 } from "./reducers";

 const reducers = combineReducers({ 
     userData,
     isLoginDisplayed,
     isSignupDisplayed,
     canvas
 })

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;