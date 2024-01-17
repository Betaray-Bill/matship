import React, {useEffect, useState} from 'react'
import { testStandardInfo } from '../../../../features/uploadSlice';
import { useDispatch, useSelector } from 'react-redux';

function Table({ sendToParent ,sno, x_axis, y_axis,  index, plotClicked }) {
    const [data, setData] = useState([{
        dataset:0,
        specimens:0,
        x_axis:{
            name:"",
            units:"",
            value:[]
        },
        y_axis:{
            name:"",
            units:"",
            value:[]
        }
    }])

    const [x_axisValue, setX_axisValue] = useState([])
    const [y_axisValue, setY_axisValue] = useState([])

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
        console.log("Rowssssss", rows)
        let x=[], y=[]
        for(let i=0; i<rows.length; i++)  {
          console.log(rows[i][0])
          x.push(rows[i][0])
          y.push(rows[i][1])
        }
        setX_axisValue([...x_axisValue, x])
        setY_axisValue([...y_axisValue, y])
        console.log(x_axisValue)
        setData([
          {
            dataset:index,
            specimens:sno,
            x_axis:{
                name:x_axis,
                units:"",
                value:x
            },
            y_axis:{
                name:y_axis,
                units:"",
                value:y
            }
          } 
        ]);
      // Update table data, correctly placing values in target column
      setTableData((prevData) => prevData.concat(rows));


    };
    console.log("engs", plotClicked)

    if(plotClicked){
      console.log("yteasssssssssss")
    }
    useEffect(() => {
      if(plotClicked === true){
        // if(x_axisValue.length >1){
          sendToParent(data, index, sno)
        }
      // }
    }, [plotClicked])

  return (
    <>
    {/* {
      NumberOf_Specimens
    } */}
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
            <td><input type="number" name='X Axis' value={row[0]} id="" placeholder='Paste your data' /></td>
            <td><input type="number" name='Y Axis' value={row[1]} id="" placeholder='Paste your data'/></td>
            {/* <td>{row[1]}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
    {
      plotClicked ? "Hiii" : "Noo"
    }
    </>
  )
}

export default Table


