const canvas = (state = '', action) => {
    switch (action.type) {
        case "setCanvas":
            return action.payload;
        default:
            return state;
    }
}

const textStyleInCanvas = (state = { fillColor: '#ffffff', strokeColor: '#000000', strokeWidth: '2' }, action) => {
    switch (action.type) {
        case "setTextFillColor":
            return { ...state, fillColor: action.payload };
        case "setTextStrokeColor":
            return { ...state, strokeColor: action.payload };
        case "setTextStrokeWidth":
            return { ...state, strokeWidth: action.payload };
        default:
            return state;
    }
}

const shapeStyleInCanvas = (state = { fillColor: '#000000', strokeColor: '#ffffff', strokeWidth: '2' }, action) => {
    switch (action.type) {
        case "setShapeFillColor":
            return { ...state, fillColor: action.payload };
        case "setShapeStrokeColor":
            return { ...state, strokeColor: action.payload };
        case "setShapeStrokeWidth":
            return { ...state, strokeWidth: action.payload };
        default:
            return state;
    }
}

const drawingStyleInCanvas = (state = { color: '#000000', width: '2' }, action) => {
    switch (action.type) {
        case "setDrawingColor":
            return { ...state, color: action.payload };
        case "setDrawingWidth":
            return { ...state, width: action.payload };
        default:
            return state;
    }
}

export {
    canvas,
    textStyleInCanvas,
    shapeStyleInCanvas,
    drawingStyleInCanvas
};