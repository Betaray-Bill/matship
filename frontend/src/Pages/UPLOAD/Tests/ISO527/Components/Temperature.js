import React, { Fragment, useEffect, useRef } from 'react'
import { useState } from 'react';

function Temperature({numberOfDataSets}) {
    // Create Temperature Input Fields
    const [temperature, setTemperature] = useState(Array(numberOfDataSets).fill(null));
    
    const createTemperatureTags = () => {
        const inputTags = [];
        for (let i = 0; i < numberOfDataSets; i++) {
        inputTags.push(
            <div key={i} className='test_data_box'>
                {/* <p>D{i+1}</p> */}
                <input className='temp_input'
                key={i} type="number" onChange={(event) => {
                    setTemperature((prevInputValues) => {
                    const newInputValues = [...prevInputValues];
                    newInputValues[i] = Number(event.target.value)
                    return newInputValues;
                    });
                }} 
                />
            </div>
        );
        }
        return inputTags;
    };

    // Set All
    const setAll = () => {  
        const filled = temperature.filter((t) => t!==null)
        console.log(temperature[filled.length-1])
        for(let i=filled.length; i<numberOfDataSets; i++){
            setTemperature((prevInputValues) => {
                const newInputValues = [...prevInputValues];
                newInputValues[i] = temperature[filled.length-1]
                return newInputValues;
            });
        }
    }

    useEffect(() => {
        const get = document.getElementsByClassName("temp_input")
        console.log(get.length)
        // updates the Temperature Input tag
        for(let i=0; i<temperature.length; i++){
            get[i].value = temperature[i]
        }
    }, [temperature])

  return (
    <Fragment>

        <div className="comp_header">
            <p>
                <ion-icon name="add-outline"></ion-icon> Temperature(c)
            </p>
            <div className="setAll" onClick={setAll}>
                <span>set All</span>
                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
        </div>

        <div className="test_container_inputs">
            {
                createTemperatureTags()
            }
        </div>

    </Fragment>
  )
}

export default Temperature