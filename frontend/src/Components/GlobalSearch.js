import React from 'react'

function GlobalSearch() {
  return (
    <div className="globalSearch">
        <div className="globalSearch_container">
            <ion-icon name="search-outline"></ion-icon>
            <input type="text" name="" placeholder='Search the materials..' />
        </div>
        <div className="submit" style={{marginTop:"40px"}}>
            <div className="btn">
                Search
            </div>
        </div>
    </div>
  )
}

export default GlobalSearch