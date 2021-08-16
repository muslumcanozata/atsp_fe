import { useReducer } from "react";
import AlertReducer from "./alertReducer";
import AlertContext from "./alertContext";

const AlertState = (props) => {
    const initialState = {
        success: "",
        error: "",
    }

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    const setSuccess = (param) => {
        dispatch({
            type: "SET_SUCCESS",
            payload: param
        })
    }

    const setError = (param) => {
        dispatch({
            type: "SET_ERROR",
            payload: param
        })
    }

    return (
        <AlertContext.Provider
            value={{
                success: state.success,
                error: state.error,
                setSuccess,
                setError
        }}>
            {props.children}
        </AlertContext.Provider>
    );
}

export default AlertState;
