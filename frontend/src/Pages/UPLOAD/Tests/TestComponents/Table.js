import React, {useState} from 'react'

function Table({ sno, x_axis, y_axis, index, excelData }) {


    // const handlePaste = async(e, rowIndex, axis , i, index) => {
    //     // const n = dynamicArray;
    //     // console.log(dynamicArray)
    //     // const clipboardData = e.clipboardData || window.clipboardData;
    //     // const pastedData = clipboardData.getData('text').split('\n');
    //     // const rows = pastedData.length
    //     // console.log("Pasted")
    //     // await handleUserInput(rows)
    //     // pastedData.forEach((ind, inde) => {
    //     //   console.table(index+1, i+1, axis, rowIndex+1, Number(ind))
    //     //   if(axis === 'x_axis'){
    //     //     console.log(ind)
    //     //     insertOrUpdateAtIndexForPasting(n[index][i][i][0], inde, Number(ind))
    //     //   }else{
    //     //     insertOrUpdateAtIndexForPasting(n[index][i][i][1], inde, Number(ind))
    //     //     console.log(ind)
    //     //   }
    //     //   console.log(n[index][i][i])
    //     // })
    //     // console.log(n)
    //     // await setDynamicArray(n)
    // };


    const [tableData, setTableData] = useState([
      ['Column 1', 'Column 2'], // Initial row
    ]);

    const handlePaste = (event) => {
      const pastedText = event.clipboardData.getData('text/plain');

      if (!pastedText) return;

      // Determine target column based on click position
      const targetColumn = event.target.cellIndex; // Get index of clicked cell
        console.log(targetColumn, pastedText)
      // Split data into rows and columns, preserving empty columns
      const rows = pastedText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line)
        .map((line) => line.split('\t'));
        console.log(rows)
      // Update table data, correctly placing values in target column
      setTableData((prevData) => prevData.concat(rows));
    };

  return (
    <>
    {/* Tabel {sno} */}
    <table onPaste={handlePaste}>
      <thead>
        <tr>
          <th>{x_axis}</th>
          <th>{y_axis}</th>
        </tr>
      </thead>
      <tbody className='table_body'>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default Table






        {/* <table border="1">
                  <thead>
                    <tr>
                      <th>{x_axis[index]}</th>
                      <th>{y_axis[index]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {excelData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td>
                          <input
                            type="number"
                            onChange={(e) => {
                              console.log("sno", sno ,":", e.target.value)
                            }}
                            // value={dynamicArray[index][i][i][0][rowIndex]}
                            // onPaste={(e) => handlePaste(e,rowIndex, 'x_axis', i, index)}
                            // onChange={(e) => handleInputChange(e, rowIndex, 'x_axis', i, index)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            // value={dynamicArray[index][i][i][1][rowIndex]}
                            // onPaste={(e) => handlePaste(e,rowIndex, 'y_axis', i, index)}
                            // onChange={(e) => handleInputChange(e, rowIndex, 'y_axis', i, index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}