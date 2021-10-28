const setAllTemplates = (templates) => {
    return {
        type: "setAllTemplates",
        payload: templates
    }
}

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

const setAllEditingMeme = (allEditingMeme) => {
    return {
        type: "setAllEditingMeme",
        payload: allEditingMeme
    }
}

export { 
    setAllTemplates, 
    setUserData,
    setIsLoginDisplayed,
    setIsSignupDisplayed,
    setAllEditingMeme 
};