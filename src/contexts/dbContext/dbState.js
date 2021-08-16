import { useReducer } from "react";
import DBReducer from "./dbReducer";
import DBContext from "./dbContext";

const DBState = (props) => {
    const initialState = {
        exportDB: {},
        importDB: {},
    }

    const [state, dispatch] = useReducer(DBReducer, initialState);

    const setExportDB = (obj) => {
        dispatch({
            type: "SET_EXPORTDB",
            payload: obj
        })
    }

    const setImportDB = (obj) => {
        dispatch({
            type: "SET_IMPORTDB",
            payload: obj
        })
    }

    return (
        <DBContext.Provider
            value={{
                exportDB: state.exportDB,
                importDB: state.importDB,
                setExportDB,
                setImportDB
        }}>
            {props.children}
        </DBContext.Provider>
    );
}

export default DBState;
