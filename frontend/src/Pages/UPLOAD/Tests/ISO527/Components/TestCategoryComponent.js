import React, { Fragment, useEffect, useRef } from 'react'
import { useState } from 'react';

function TestCategoryComponent({numberOfDataSets,type, component}) {
    // Create Temperature Input Fields
    const InputRef = useRef()
    const [temperature, setTemperature] = useState(Array(numberOfDataSets).fill(null));
    
    const createTemperatureTags = () => {
        const inputTags = [];
        for (let i = 0; i < numberOfDataSets; i++) {
        inputTags.push(
            <div key={i} className='test_data_box'>
                <input className='temp_input'
                    ref={InputRef}
                    key={i} type="number" onChange={(event) => {
                        setTemperature((prevInputValues) => {
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
        for(let i=0; i<numberOfDataSets; i++){
            setTemperature((prevInputValues) => {
                const newInputValues = [...prevInputValues];
                newInputValues[i] = temperature[0]
                return newInputValues;
            });
        }
    }

    useEffect(() => {
        const getInputTags = document.getElementsByClassName("temp_input")
        console.log(getInputTags.length)
        // updates the Temperature Input tag
        for(let i=0; i<temperature.length; i++){
            getInputTags[i].value = temperature[0]
        }
        console.log(temperature)
    }, [temperature])

  return (
    <Fragment>

        <div className="comp_header">
            <p>
                <ion-icon name="add-outline"></ion-icon> {component} ''
            </p>
            
        </div>

        <div className="test_container_inputs">
            {
                type === "Number" ? createTemperatureTags() : ""
            }
        </div>



    </Fragment>
  )
}

export default TestCategoryComponent