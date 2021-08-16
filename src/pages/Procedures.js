import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TablesContext from "../contexts/tableContext/tablesContext";
import AlertContext from "../contexts/alertContext/alertContext";
//SweetAlert2
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';



const Procedures = () => {
    const { procedures, getProceduresDetails } = useContext(TablesContext);
    const { error, success, setSuccess, setError } = useContext(AlertContext);
    
    const [checkedState, setCheckedState] = useState([]);
    const [arrayState, setArrayState] = useState([]);

    const history = useHistory();

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

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.2},
		{ field: 'owner', headerName: 'Owner', flex: 0.4 },
		{ field: 'name', headerName: 'Procedure Name', flex: 1 },
	];
      
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

    const handleOnChange = (position) => {
        var updatedCheckedState = (new Array(procedures.length).fill(false))
        for(let i=0;i<position.length;i++){
            updatedCheckedState[position[i]]=true
        }
        setCheckedState(updatedCheckedState)
    }

	useEffect(() => {
        console.log(procedures)
        setCheckedState((new Array(procedures.length).fill(false)))
        if(success !== ""){
            loadingAlert(1000)
            setTimeout(() => {
                history.push("/proceduresdetails");
            }, 1000);
            setSuccess("")
        }
        else if(error !== ""){
            Toast.fire({
                icon: 'error',
                title: error
            })
            setError("")
        }
        // eslint-disable-next-line
	}, [procedures, error, success])

    const handleCheckboxButtonOnClick = () => {
        console.log(arrayState)
        checkedState.map((item, index) => (
            item ? arrayState.push(procedures[index].name) : {}
        ))
        getProceduresDetails(arrayState)
        console.log(arrayState)
        if(arrayState.length !== 0){
            console.log("dolu")
            setSuccess("Done.")
            setArrayState([]);
        }
        else if (arrayState.length === 0){
            console.log("boş")
            setError("Nothing Selected.")
        }
        console.log(arrayState)
    
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <h1 className="text-start p-2">List of Procedures</h1>
                </div>
                <div className="col-4">
                    <button 
                        type="button"
                        className="btn btn-primary float-end p-2"
                        onClick={() => {
                            setError("")
                            setSuccess("")
                            history.push("/")}}
                        style={{marginTop: '10px'}}
                    >
                        Go Home
                    </button>
                </div>
            </div>
            <div className="container" style={{ height: '700px', width: '100%' }}>
                <DataGrid
                    rows={procedures}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    filterModel={{
                        items: [{ columnField: 'name', operatorValue: 'contains', value: '' }],
                    }}
                    onSelectionModelChange={(newSelection) => {
                        handleOnChange(newSelection)
                    }}
                />
            </div>
            <div>
                <button 
                    type="button"
                    className="btn btn-primary float-end p-2"
                    onClick={() => {handleCheckboxButtonOnClick()}}
                    style={{marginTop: '10px'}}
                >
                    Get Text
                </button>
            </div>          
        </div>
    )
}

export default Procedures;
