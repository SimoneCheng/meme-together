import { createStore, combineReducers } from "redux";
import { 
    allTemplates, 
    userData, 
    isLoginDisplayed, 
    isSignupDisplayed,
    allEditingMeme
 } from "./reducers";

 const reducers = combineReducers({
     allTemplates, 
     userData,
     isLoginDisplayed,
     isSignupDisplayed,
     allEditingMeme 
 })

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;