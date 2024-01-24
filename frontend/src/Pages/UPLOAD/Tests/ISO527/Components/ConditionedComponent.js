import React, { Fragment, useEffect, useRef } from 'react'
import { useState } from 'react';

function ConditionedComponent({numberOfDataSets, formData, type, component}) {

    // Create conditioned Input Fields
    const [conditioned, setConditioned] = useState(Array(numberOfDataSets).fill(null));
    
    const createConditionedTags = () => {
        const inputTags = [];
        for (let i = 0; i < numberOfDataSets; i++) {
            inputTags.push(
                <div key={i} className='test_data_box '>
                    {/* <p>D{i+1}</p> */}
                    <select 
                        className='conditionedInput'
                        key={i} type="number" 
                        onChange={(event) => {
                            setConditioned((prevInputValues) => {
                                const newInputValues = [...prevInputValues];
                                newInputValues[i] = event.target.value
                            return newInputValues;
                        });
                    }} 
                    >
                    <option value=""></option>
                    <option value="DAM">DAM</option>
                    <option value="RH50">RH50</option>
                    </select>
                    {
                            i == 0 ? 
                            <div className="setAll" onClick={() => setAll("Conditioned")}>
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
        const filled = conditioned.filter((t) => t!==null)
        console.log(conditioned[filled.length-1])
        for(let i=filled.length; i<numberOfDataSets; i++){
            setConditioned((prevInputValues) => {
                const newInputValues = [...prevInputValues];
                newInputValues[i] = conditioned[filled.length-1]
                return newInputValues;
            });
        }

        const getInputTags = document.getElementsByClassName("conditionedInput")
        console.log(getInputTags.length, conditioned[0])
        // updates the conditioned Input tag
        for(let i=0; i<getInputTags.length; i++){
            console.log(i, conditioned[i])
            
            getInputTags[i].value = conditioned[0]
        }
        console.log(conditioned)
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
                createConditionedTags()
            }
        </div>
    </Fragment>
  )
}

export default ConditionedComponent