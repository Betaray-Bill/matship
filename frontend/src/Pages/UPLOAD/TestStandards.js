import React, { useEffect, useState } from 'react'
import ISO527 from './Tests/ISO527';

function TestStandards() {
  const [testStandard, setTestStandard] = useState("");


  return (
    <>
      <div className="upload_wrapper">
        <div className="upload_container">
          <div className="upload_header">
            <p>2. Select Test Standard</p>
          </div>
          <form action="">
          <div className="testStandard_dropdown">
            <select onChange={(e) => setTestStandard(e.target.value)}>
              <option value="Select Test Standard">Select Test Standard</option>
              <option value="ISO527">ISO527</option>
              <option value="ISO527-1">ISO527-1</option>
              <option value="ISO527-2">ISO527-2</option>
            </select>
          </div>

          {
            testStandard === "ISO527" && (
              <ISO527 />
            )
          }
          </form>

        </div>
      </div>
    </>
  )
}

export default TestStandards