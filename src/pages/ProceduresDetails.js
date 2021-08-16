import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TablesContext from "../contexts/tableContext/tablesContext";
import DBContext from "../contexts/dbContext/dbContext"
import Accordion from "../components/Accordion";
import AlertContext from "../contexts/alertContext/alertContext";
//SweetAlert2
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const ProceduresDetails = () => {
    const { proceduresDetails, proceduresNames, postProceduresTexts, setProceduresDetails } = useContext(TablesContext);
    const { error, success, setSuccess, setError } = useContext(AlertContext)

    const { setImportDB } = useContext(DBContext)

    const [importDBState, setImportDBState] = useState({
        user: "",
        password: "",
        dsn: "",
    })

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })      

    const history = useHistory();

    useEffect(() => {
        setImportDB(importDBState)
        if (error === "" && success !== ""){
            Toast.fire({
                icon: 'success',
                title: success
            })
            setSuccess("")
        }
        if(error !== "" && success === ""){
            Toast.fire({
                icon: 'error',
                title: error
            })   
            setError("")
        }
        // eslint-disable-next-line
    }, [importDBState, error, success])

    const handleSubmit = (event) => {
        event.preventDefault()
        setImportDB(importDBState)
        let arr = [];
        proceduresDetails.map((item)=>(
            arr.push(item.toString())
        ))
        postProceduresTexts(arr)
    }
    
    const handleOnChange = (event) => (
        (event.target.name === "user" ? setImportDBState((prevState) => {return{...prevState, user: event.target.value}}) : 
            (event.target.name === "password" ? setImportDBState((prevState) => {return{...prevState, password: event.target.value}}) :
                (event.target.name === "dsn" ? setImportDBState((prevState) => {return{...prevState, dsn: event.target.value}}) : {} 
                )
            )
        )   
    )

    return(
        <div className="container">
            <div class="row">
                <div class="col-8">
                    <h1 className="text-start p-2">Procedure Text</h1>
                </div>
                <div class="col-4 text-center">
                    <button 
                        type="button"
                        className="btn btn-primary float-end p-2"
                        onClick={() => {
                            setSuccess("")
                            setError("")
                            history.push("/")}
                        }
                        style={{marginTop: '10px'}}

                    >
                        Go Home
                    </button>
                </div>
            </div>
                {(proceduresDetails.map((row, index) => (
                    <Accordion proceduresDetails={row} index={index} proceduresNames={proceduresNames[index]}/>)))}
            <div className="p-2">
                <button 
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        setProceduresDetails([])
                        history.push("/procedures")}}
                >
                    Go Back
                </button>
            </div>
            <h1 className="text-start p-2">Enter DB Infos to Import</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>User</label>
                        <input type="text" className="form-control" name="user" value={importDBState.user} onChange={handleOnChange} placeholder="Enter User"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" name="password" value={importDBState.password} onChange={handleOnChange} id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label>DSN</label>
                        <input type="text" className="form-control" name="dsn" value={importDBState.dsn} onChange={handleOnChange} placeholder="1.1.1.1:1521"/>
                    </div>
                    <div className="container">
                        <button type="submit" className="btn btn-primary float-end p-2" style={{marginTop: '10px'}}>{proceduresDetails.length === 1 ? "Post Procedures Text" : "Post Procedures' Text"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProceduresDetails;
