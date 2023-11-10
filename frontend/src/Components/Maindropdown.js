import React, { useEffect, useState } from 'react'


function Maindropdown({data, name, sendToParent, removeFromParent}) {
 
    const [value, setvalue] = useState([]);
    const [isDroped, setIsDroped] = useState(false);

    const handleChange = (e) => {
        const isChecked = e.target.checked;
        const val = e.target.value; 

        console.log(isChecked, val)
        if (isChecked) {
            setvalue((prevValue) => [...prevValue, val]);
            sendToParent(val)
        } else {
            setvalue(value.filter((checkedValue) => checkedValue !== val));
            console.log("filter", value)
            // Send data to the Parent Component to remove that Unchecked Value
            removeFromParent(val)
        }
        // console.log("Value",value)
        // sendToParent(val)
    }

    const resetField = () => {
        setvalue([])
    }


  return (
    <div>
        {/*                 {
                                Array.from(data).map((key,value) => (
                                    <span>
                                        <h3>{key[0]} : {key[1]}</h3>
                                    </span>
                                ))
                            } 
        */}
        <div className="dropdown_box">
                <div className="dropdown_header_section">
                   <div className="dropdown_header" onClick={() => setIsDroped(!isDroped)}>
                            {
                                value.length>0 ? value.join(",") : name
                            }
                        <div className="dropdown_icon">
                            {
                                isDroped ? <ion-icon name="chevron-up-outline"></ion-icon> : <ion-icon name="chevron-down-outline"></ion-icon>
                            }
                        </div>
                   </div>    
                   {
                    isDroped ? <ion-icon name="close-outline" style={{color:"red"}} onClick={resetField}></ion-icon> : ''
                   }
                </div>

                <div className={isDroped ? `dropdown_list` : `dropdown_list_hidden`}>
                    {
                        data ? Array.from(data).map((key, _i) => (
                            <li key={_i}><input type="checkbox" value={key[0]} onChange={(i) => handleChange(i)} />{key[0]}-({key[1]})</li>
                        )) : "Loading.."
                    }

                </div>
            </div>
    </div>
  )
}
          {/* {
            isDroped ? <ion-icon name="close-outline" style={{color:"red"}} onClick={resetField}></ion-icon> : ''
          } */}
export default Maindropdown