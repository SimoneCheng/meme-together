import { createStore, combineReducers } from "redux";
import {
    canvas,
    textStyleInCanvas,
    shapeStyleInCanvas,
    drawingStyleInCanvas
} from "./reducers";

const reducers = combineReducers({
    canvas,
    textStyleInCanvas,
    shapeStyleInCanvas,
    drawingStyleInCanvas
})

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;