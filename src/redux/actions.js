import { isUploadTemplateDisplayed } from "./reducers"

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

const setIsUploadTemplateDisplayed = (isUploadTemplateDisplayed) => {
    return {
        type: "setIsUploadTemplateDisplayed",
        payload: isUploadTemplateDisplayed
    }
}

const setCanvas = (canvas) => {
    return {
        type: "setCanvas",
        payload: canvas
    }
}

export { 
    setUserData,
    setIsLoginDisplayed,
    setIsSignupDisplayed,
    setIsUploadTemplateDisplayed,
    setCanvas
};