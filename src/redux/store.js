import { createStore, combineReducers } from "redux";
import { 
    userData, 
    isLoginDisplayed, 
    isSignupDisplayed,
    isUploadTemplateDisplayed
 } from "./reducers";

 const reducers = combineReducers({ 
     userData,
     isLoginDisplayed,
     isSignupDisplayed,
     isUploadTemplateDisplayed
 })

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;