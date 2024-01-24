import React, { Fragment, useEffect, useRef } from 'react'
import { useState } from 'react';

function NumberOfDataset({numberOfDataSets, formData, type, component}) {
    const [noOfSpecimens, setnoOfSpecimens] = useState(Array(numberOfDataSets).fill(null));
    
    const createNoOfSpecimensTags = () => {
        const inputTags = [];
        for (let i = 0; i < numberOfDataSets; i++) {
        inputTags.push(
            <div key={i} className='test_data_box'>
                <input className='numberOfSpecimens_input'
                    key={i} type="number" onChange={(event) => {
                        setnoOfSpecimens((prevInputValues) => {
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
        const filled = noOfSpecimens.filter((t) => t!==null)
        console.log(noOfSpecimens[filled.length-1])
        for(let i=filled.length; i<numberOfDataSets; i++){
            setnoOfSpecimens((prevInputValues) => {
                const newInputValues = [...prevInputValues];
                newInputValues[i] = noOfSpecimens[filled.length-1]
                return newInputValues;
            });
        }
        const getInputTags = document.getElementsByClassName("numberOfSpecimens_input")
        console.log(getInputTags)
        // updates the noOfSpecimens Input tag
        for(let i=0; i<getInputTags.length; i++){
            getInputTags[i].value = noOfSpecimens[0]
        }
        console.log(noOfSpecimens)
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
                createNoOfSpecimensTags()
            }
        </div>
    </Fragment>
  )
}


export default NumberOfDataset