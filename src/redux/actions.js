const setUserData = (userData) => {
    return {
        type: "setUserData", 
        payload: userData
    }
}

const setIsLoginDisplayed = (isLoginDisplayed) => {
    return {
        type: "setIsLoginDisplayed",
        payload: isLoginDisplayed
    }
}

const setIsSignupDisplayed = (isSignupDisplayed) => {
    return {
        type: "setIsSignupDisplayed",
        payload: isSignupDisplayed
    }
}

const setCanvas = (canvas) => {
    return {
        type: "setCanvas",
        payload: canvas
    }
}

const setTextFillColor = (fillColor) => {
    return {
        type: "setTextFillColor",
        payload: fillColor
    }
}

const setTextStrokeColor = (strokeColor) => {
    return {
        type: "setTextStrokeColor",
        payload: strokeColor
    }

}

const setTextStrokeWidth = (strokeWidth) => {
    return {
        type: "setTextStrokeWidth",
        payload: strokeWidth
    }
}

const setShapeFillColor = (fillColor) => {
    return {
        type: "setShapeFillColor",
        payload: fillColor
    }
}

const setShapeStrokeColor = (strokeColor) => {
    return {
        type: "setShapeStrokeColor",
        payload: strokeColor
    }

}

const setShapeStrokeWidth = (strokeWidth) => {
    return {
        type: "setShapeStrokeWidth",
        payload: strokeWidth
    }
}

const setDrawingColor = (color) => {
    return {
        type: "setDrawingColor",
        payload: color
    }
}

const setDrawingWidth = (width) => {
    return {
        type: "setDrawingWidth",
        payload: width
    }
}

export { 
    setUserData,
    setIsLoginDisplayed,
    setIsSignupDisplayed,
    setCanvas,
    setTextFillColor,
    setTextStrokeColor,
    setTextStrokeWidth,
    setShapeFillColor,
    setShapeStrokeColor,
    setShapeStrokeWidth,
    setDrawingColor,
    setDrawingWidth
};