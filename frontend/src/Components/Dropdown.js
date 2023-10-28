import React, { useEffect, useState } from 'react'


function Dropdown({header, data, sendToParent}) {

    const [value, setvalue] = useState("");

    const [isDroped, setIsDroped] = useState(false);

    const handleChange = (e) => {
        setvalue(e)
        setIsDroped(!isDroped)
        sendToParent(e)
    }
  return (
    <div>
        <div className="dropdown_box">
            <div className="dropdown_header_section">
                <div className="dropdown_header" onClick={() => setIsDroped(!isDroped)}>
                    {
                        value !== "" ? value : header
                    }
                                    <div className="dropdown_icon">
                    {
                        isDroped ? <ion-icon name="chevron-up-outline"></ion-icon> : <ion-icon name="chevron-down-outline"></ion-icon>
                    }
                </div>
            </div>    
        </div>

        <div className={isDroped ? `dropdown_list` : `dropdown_list_hidden`}>
          {
            data && data.map((e) => (
                <p onClick={() => {handleChange(e)} } key={e}>{e}</p>  
            ))
          }     
        </div>
        </div>
    </div>
  )
}
          {/* {
            isDroped ? <ion-icon name="close-outline" style={{color:"red"}} onClick={resetField}></ion-icon> : ''
          } */}
export default Dropdown