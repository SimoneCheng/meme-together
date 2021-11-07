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

export { 
    setUserData,
    setIsLoginDisplayed,
    setIsSignupDisplayed,
    setIsUploadTemplateDisplayed
};