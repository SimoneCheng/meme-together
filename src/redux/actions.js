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

export { 
    setUserData,
    setIsLoginDisplayed,
    setIsSignupDisplayed,
    setCanvas
};