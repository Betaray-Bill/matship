import React, { Fragment, useEffect, useRef } from 'react'
import { useState } from 'react';

function Crosshead({numberOfDataSets, formData, type, component}) {
    const [crosshead, setcrosshead] = useState(Array(numberOfDataSets).fill(null));
    
    const createCrossheadTags = () => {
        const inputTags = [];
        for (let i = 0; i < numberOfDataSets; i++) {
        inputTags.push(
            <div key={i} className='test_data_box'>
                <input className='crosshead_input'
                    key={i} type="number" onChange={(event) => {
                        setcrosshead((prevInputValues) => {
                        const newInputValues = [...prevInputValues];
                        newInputValues[i] = Number(event.target.value)
                        return newInputValues;
                        });
                    }} 
                />
                {
                    i == 0 ? 
                    <div className="setAll" onClick={setAll}>
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div> : ""
                }
            </div>
        );
        }
        return inputTags;
    };

   

    // Set All
    const setAll = () => {  
        const filled = crosshead.filter((t) => t!==null)
        console.log(crosshead[filled.length-1])
        for(let i=filled.length; i<numberOfDataSets; i++){
            setcrosshead((prevInputValues) => {
                const newInputValues = [...prevInputValues];
                newInputValues[i] = crosshead[filled.length-1]
                return newInputValues;
            });
        }
        const getInputTags = document.getElementsByClassName("crosshead_input")
        console.log(getInputTags)
        // updates the crosshead Input tag
        for(let i=0; i<getInputTags.length; i++){
            getInputTags[i].value = crosshead[0]
        }
        console.log(crosshead)
    }

  return (
    <Fragment>
        <div className="comp_header">
            <p>
                <ion-icon name="add-outline"></ion-icon> {component}
            </p>
        </div>
        <div className="test_container_inputs">
            {
                createCrossheadTags()
            }
        </div>
    </Fragment>
  )
}


export default Crosshead