import React, { useEffect, useState } from 'react'


function Dropdown({data}) {

    const [value, setvalue] = useState([]);
    const [isDroped, setIsDroped] = useState(false);

    const handleChange = (e) => {
        const isChecked = e.target.checked;
        const val = e.target.value; 

        console.log(isChecked, val)
        if (isChecked) {
            setvalue((prevValue) => [...prevValue, val]);
        } else {
            setvalue(value.filter((checkedValue) => checkedValue !== val));
        }
    }

    const resetField = () => {
        setvalue([])
    }


  return (
    <div>
        <div className="dropdown_box">
                <div className="dropdown_header_section">
                   <div className="dropdown_header" onClick={() => setIsDroped(!isDroped)}>
                            {
                                value.length>0 ? value.join(",") : "Master Class"
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
                
                    <li><input type="checkbox" value="One" onChange={(e) => handleChange(e)} />One</li>
                    <li><input type="checkbox" value="Two" onChange={(e) => handleChange(e)} />Two</li>
                    <li><input type="checkbox" value="2" onChange={(e) => handleChange(e)} />2</li>
                    <li><input type="checkbox" value="Three" onChange={(e) => handleChange(e)} />Three</li>
                    <li><input type="checkbox" value="Four" onChange={(e) => handleChange(e)} />Four</li>
                    <li><input type="checkbox" value="Five" onChange={(e) => handleChange(e)} />Five</li>
                    <li><input type="checkbox" value="Six" onChange={(e) => handleChange(e)} />Six</li>

                </div>
            </div>
    </div>
  )
}

export default Dropdown