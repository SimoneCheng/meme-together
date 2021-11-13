const userData = (state = {}, action) => {
    switch (action.type) {
        case "setUserData":
            return action.payload;
        default:
            return state;
    }
}

const isLoginDisplayed = (state = false, action) => {
    switch (action.type) {
        case "setIsLoginDisplayed":
            return action.payload;
        default:
            return state;
    }
}

const isSignupDisplayed = (state = false, action) => {
    switch (action.type) {
        case "setIsSignupDisplayed":
            return action.payload;
        default:
            return state;
    }
}

const isUploadTemplateDisplayed = (state = false, action) => {
    switch (action.type) {
        case "setIsUploadTemplateDisplayed":
            return action.payload;
        default:
            return state;
    }
}

const canvas = (state = '', action) => {
    switch (action.type) {
        case "setCanvas":
            return action.payload;
        default:
            return state;
    }
}

export { 
    userData,
    isLoginDisplayed,
    isSignupDisplayed,
    isUploadTemplateDisplayed,
    canvas
};