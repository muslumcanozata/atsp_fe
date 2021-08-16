const TablesReducer = (state, action) => {
    switch(action.type) {
        case "GET_PROCEDURES":
            return {
                ...state,
                procedures: action.payload
            }
        case "GET_PROCEDURESDETAILS":
            return {
                ...state,
                proceduresDetails: action.payload
            }
        case "SET_PROCEDURESNAMES":
            return {
                ...state,
                proceduresNames: action.payload
            }
        default:
            return state
    }
}

export default TablesReducer;