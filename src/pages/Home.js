import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DBContext from "../contexts/dbContext/dbContext";
import TablesContext from "../contexts/tableContext/tablesContext";
import AlertContext from "../contexts/alertContext/alertContext";
//SweetAlert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const Home = () => {
    const { getProcedures } = useContext(TablesContext);
    const { success, error, setSuccess, setError } = useContext(AlertContext)
    const { setExportDB } = useContext(DBContext)

    const [exportDBState, setExportDBState] = useState({
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
        setExportDB(exportDBState)
        if (error === "" && success !== ""){
            Toast.fire({
                icon: 'success',
                title: success
            })
            setSuccess("")
            history.push("/procedures")                
        }
        setTimeout(() => {
            if(error !== "" && success === ""){
                Toast.fire({
                    icon: 'error',
                    title: error
                })   
                setError("")
            }
        }, 2500);
        // eslint-disable-next-line
    }, [exportDBState, success, error])

    function handleSubmit(event){
        event.preventDefault()
        setExportDB(exportDBState)
        getProcedures(exportDBState)
        loadingAlert(2500)
    }

    function loadingAlert(param){
        let timerInterval;
        Swal.fire({
            title: 'Loading...',
            html: 'I will close in <b></b> milliseconds.',
            timer: param,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
        })
    }
    
    const handleOnChange = (event) => (
        (event.target.name === "user" ? setExportDBState((prevState) => {return{...prevState, user: event.target.value}}) : 
            (event.target.name === "password" ? setExportDBState((prevState) => {return{...prevState, password: event.target.value}}) :
                (event.target.name === "dsn" ? setExportDBState((prevState) => {return{...prevState, dsn: event.target.value}}) : {} 
                )
            )
        )
    )

    return(
        <div className="container">
            <h1 className="text-start p-2">Enter DB Infos</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>User</label>
                        <input type="text" className="form-control" name="user" value={exportDBState.user} onChange={handleOnChange} placeholder="Enter User"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" name="password" value={exportDBState.password} onChange={handleOnChange} id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label>DSN</label>
                        <input type="text" className="form-control" name="dsn" value={exportDBState.dsn} onChange={handleOnChange} placeholder="1.1.1.1:1521"/>
                    </div>
                    <div className="container">
                        <button type="submit" className="btn btn-primary" style={{marginTop: '10px'}}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home;
