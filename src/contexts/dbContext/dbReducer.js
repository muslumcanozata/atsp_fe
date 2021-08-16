const DBReducer = (state, action) => {
    switch(action.type) {
        case "SET_EXPORTDB":
            return {
                ...state,
                exportDB: action.payload
            }
        case "SET_IMPORTDB":
            return {
                ...state,
                importDB: action.payload
            }
        default:
            return state
    }
}

export default DBReducer;