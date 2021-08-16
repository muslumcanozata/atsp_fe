import React, { useState } from "react";

const Accordion = (props) => {
    // eslint-disable-next-line
    const [ids, setIDs] = useState({       
        heading: 'heading' + toWords(props.index+1),
        collapse: 'collapse' + toWords(props.index+1),
        collapseTarget: '#collapse' + toWords(props.index+1),
    })

    // useEffect(()=>{
    // }, [props.proceduresDetails])

    function toWords(num){
        var ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        var tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        var teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

        //One, Two... generator for accordion ids
        function convert_millions(num) {
            if (num >= 1000000) {
                return convert_millions(Math.floor(num / 1000000)) + "Million" + convert_thousands(num % 1000000);
            } else {
                return convert_thousands(num);
            }
        }

        function convert_thousands(num) {
            if (num >= 1000) {
                return convert_hundreds(Math.floor(num / 1000)) + "Thousand" + convert_hundreds(num % 1000);
            } else {
                return convert_hundreds(num);
            }
        }

        function convert_hundreds(num) {
            if (num > 99) {
                return ones[Math.floor(num / 100)] + "Hundred" + convert_tens(num % 100);
            } else {
                return convert_tens(num);
            }
        }

        function convert_tens(num) {
            if (num < 10) return ones[num];
            else if (num >= 10 && num < 20) return teens[num - 10];
            else {
                return tens[Math.floor(num / 10)] + " " + ones[num % 10];
            }
        }

        if (num === 0) return "zero";
        else return convert_millions(num);
    }

    return(
        <div className="accordion" id="accordionExample" style={{marginBottom: '10px'}}>
            <div className="accordion-item">
                <h2 className="accordion-header" id={ids.heading}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={ids.collapseTarget} aria-expanded="true" aria-controls={ids.collapse}>
                    {props.proceduresNames}
                </button>
                </h2>
                <div id={ids.collapse} className="accordion-collapse collapse" aria-labelledby={ids.heading} data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <code>{props.proceduresDetails}</code>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Accordion;