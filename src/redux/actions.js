const setUserData = (userData) => {
    return {
        type: "setUserData", 
        payload: userData
    }
}

const setUserInfo = (userInfo) => {
    return {
        type: "setUserInfo",
        payload: userInfo
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

export { 
    setUserData,
    setUserInfo,
    setIsLoginDisplayed,
    setIsSignupDisplayed,
};