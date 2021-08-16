import { useContext, useReducer } from "react";
import TablesReducer from "./tablesReducer";
import TablesContext from "./tablesContext";
import axios from "axios";
import DBContext from "../dbContext/dbContext";
import AlertContext from "../alertContext/alertContext";

const TablesState = (props) => {
    const initialState = {
        procedures: [],
        proceduresDetails: [],
        proceduresNames: [],
    }

    const { exportDB, importDB } = useContext(DBContext)
    const { setSuccess, setError } = useContext(AlertContext)

    const [state, dispatch] = useReducer(TablesReducer, initialState);

    const setProceduresDetails = (param) => {
        dispatch({
            type: "GET_PROCEDURESDETAILS",
            payload: param
        })
    }
    
    const getProcedures = (param) => {
        setSuccess("");
        setError("");
        axios
            .post('http://localhost:8000/api/procedures/', param, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                dispatch({
                    type: "GET_PROCEDURES",
                    payload: res.data.data
                })
                setSuccess(res.data.message)
            })
            .catch((errors) => {
                setError(errors.response.data.error)
            })
    }

    const getProceduresDetails = (param) => {
        setSuccess("");
        setError("");
        axios
            .post('http://localhost:8000/api/proceduresdetails/', {
                    user: exportDB.user,
                    password: exportDB.password,
                    dsn: exportDB.dsn,
                    prods: param
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                }
            })
            .then(res => {
                dispatch({
                    type: "GET_PROCEDURESDETAILS",
                    payload: res.data.data.details
                })
                dispatch({
                    type: "SET_PROCEDURESNAMES",
                    payload: res.data.data.names
                })
            })
            .catch(errors => {
                setError(errors.response.data.error)
            })
    }

    const postProceduresTexts = (arr) => {
        axios
            .post('http://localhost:8000/api/postprocedurestext/',{
                user: importDB.user,
                password: importDB.password,
                dsn: importDB.dsn,
                texts: arr
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                setSuccess(res.data.message)
            })
            .catch(function (errors) {
                setError(errors.response.data.error)
            })
    }

    return (
        <TablesContext.Provider
            value={{
                procedures: state.procedures,
                proceduresDetails: state.proceduresDetails,
                proceduresNames: state.proceduresNames,
                getProcedures,
                getProceduresDetails,
                postProceduresTexts,
                setProceduresDetails,
        }}>
            {props.children}
        </TablesContext.Provider>
    );
}

export default TablesState;
