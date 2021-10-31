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

export { 
    userData,
    isLoginDisplayed,
    isSignupDisplayed
};