const AlertReducer = (state, action) => {
    switch(action.type) {
        case "SET_SUCCESS":
            return{
                ...state,
                success: action.payload
            }
        case "SET_ERROR":
            return{
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default AlertReducer;