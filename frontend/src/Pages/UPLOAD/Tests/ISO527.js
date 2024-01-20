import React, { Children, Fragment, useEffect, useMemo, useState } from 'react'
import "../../../Styles/Pages/Test.css"
import { useDispatch } from 'react-redux'
import { testStandardInfo } from '../../../features/uploadSlice'
import * as XLSX from "xlsx";
import Table from './TestComponents/Table';
import Chart from './TestComponents/Chart';
import TestCategoryComponent from './ISO527/Components/TestCategoryComponent';
import ManualDatasetUpload from './ISO527/Components/ManualDatasetUpload';
import { units } from '../../../Units';
import Reusable from './ISO527/Components/Reusable';

function ISO527({isClickedNext}) {
  const [isProcessedDataClicked, setIsProcessedDataClicked] = useState(false)
  const [dynamicArray, setDynamicArray] = useState([]);
  const [formData, setFormData] = useState({
    testStandard:"ISO527",
    SpecimenType:"",
    L0:0,
    h:0,
    temp:[],
    conditioned:[],
    NumberOf_Specimens:[],
    CrossHeadSpeed:[],
    x_axis:[],
    y_axis:[],
    dataSetValue:[],
    ManualDataSet:[]
  })
  const dispatch = useDispatch()
  const [numberOfDataSets, setNumberOfDataSets] = useState(0)
  const [specimenClicked, setSpecimenClicked] = useState(false)

  useEffect(() => {
    if(formData.SpecimenType === "1A"){
      setFormData({...formData, L0:75, h:4})
    }

    if(formData.SpecimenType === "1B"){
      setFormData({...formData, L0:50, h:4})
    }

  }, [formData.SpecimenType])


  // Add DataSheet
  const [isaddDataSheet, setIsAddDataSheet] = useState(false) 
  const addDataSheet = () => {
    if(formData.L0 ==0 || formData.h==0 ){
      alert("Enter L0 and h values")
    }else{
      setIsAddDataSheet(true)
    }
  }

  // Set ALL
  const setAll = (type) => {  
    if(type === "Number of Specimens" ){
      if(noOfSpecimens[0] === null){
        alert("Please Enter the first Value")
      }else{
        for(let i=0; i<numberOfDataSets; i++){
          setNumberOfDataSets((prevInputValues) => {
              const newInputValues = [...prevInputValues];
              newInputValues[i] = numberOfDataSets[0]
              return newInputValues;
          });
        }
      }
    }else if(type === "Conditioned"){
      if(conditioned[0] === null){
        alert("Please Enter the first Value")
      }else{
        for(let i=0; i<numberOfDataSets; i++){
          setConditioned((prevInputValues) => {
              const newInputValues = [...prevInputValues];
              newInputValues[i] = conditioned[0]
              return newInputValues;
          });
          console.log(conditioned)
        }
      }
    }
}


  const [isCreateClicked, setisCreateClicked] = useState(false);

  // Create Temperature Input Fields
  const [temperature, setTemperature] = useState([]);
 
  const createTemperatureTags = () => {
    const inputTags = [];
    for (let i = 0; i < numberOfDataSets; i++) {
      inputTags.push(
        <div key={i} className='test_data_box'>
            {/* <p>D{i+1}</p> */}
            <input 
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
  useEffect(() => {
    console.log("ama da")
  }, [temperature]  )


  // Create Conditioned Input Fields
  const [conditioned, setConditioned] = useState([]);
  const createConditionedTags = () => {
    const inputTags = [];
    for (let i = 0; i < numberOfDataSets; i++) {
      inputTags.push(
        <div key={i} className='test_data_box '>
            {/* <p>D{i+1}</p> */}
            <select 
              className='conditionedInput'
              key={i} type="number" onChange={(event) => {
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
  }

  // Create No of Specimens
  const [noOfSpecimens, setNoOfSpecimens] = useState([])
  const  createNoOfSpecimensTags = () => {
    const inputTags = [];
    for (let i = 0; i < numberOfDataSets; i++) {
      inputTags.push(
        <div key={i} className='test_data_box'>
            <input  className='noOfSpecimens_Input'
              key={i} type="number" onChange={(event) => {
                setNoOfSpecimens((prevInputValues) => {
                  const newInputValues = [...prevInputValues];
                  newInputValues[i] = Number(event.target.value);
                  return newInputValues;
                });
              }} 
            />
            {
                    i == 0 ? 
                    <div className="setAll" onClick={() => setAll("Number of Specimens")}>
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div> : ""
            }
        </div>
      );
    }
    return inputTags;
  }

  // Cross Head
  const [crossHeads, setCrossHeads] = useState([]);
  const createCrossheadTags = () => {
    const inputTags = [];
    for (let i = 0; i < numberOfDataSets; i++) {
      inputTags.push(
        <div key={i} className='test_data_box'>
            <input 
              key={i} type="number" onChange={(event) => {
                setCrossHeads((prevInputValues) => {
                  const newInputValues = [...prevInputValues];
                  newInputValues[i] =event.target.value
                  return newInputValues;
                });
              }} 
            />
        </div>
      );
    }
    return inputTags;
  }

  // Create X Axis Fields
  const [x_axis, setX_axis] = useState([]);
  const [x_axisUnits, setX_axisUnits] = useState([]);
  const [allXUnits, setAllXUnits] = useState(units);
  const getXUnits = (e) =>  {
    console.log(units[e])
    setX_axisUnits(units[e])
  }
  useEffect(() => {
    const unitValues = Object.values(units).flat();
    setAllXUnits(unitValues)
    console.log(unitValues)
  }, [x_axisUnits])
  const createX_axisTags = () => {
    const inputTags = [];
    for (let i = 0; i < numberOfDataSets; i++) {
      inputTags.push(
        <div key={i} className='test_data_box'>
            {/* <p>D{i+1}</p> */}
            <select 
                type="text" onChange={(event) => {
                setX_axis((prevInputValues) => {
                  const newInputValues = [...prevInputValues];
                  newInputValues[i] = event.target.value
                  return newInputValues;
                });

                getXUnits(event.target.value)
              }} 
            >
              <option value=""></option>
              <option value="Engineering Strain">Engineering Strain</option>
              <option value="Engineering Stress">Engineering Stress</option>
            </select>

            <select 
               type="text"
            >
              <option value=""></option>
              {
                x_axisUnits.length === 0 ? allXUnits.map((val) => (
                  <option value={val} key={val}>{val}</option>
                )) : 
                (
                  x_axisUnits.map((val) => (
                    <option value={val} key={val}>{val}</option>
                  ))
                )
              }
            </select>

            {
                    i == 0 ? 
                    <div className="setAll">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div> : ""
            }
            
        </div>
      );
    }
    return inputTags;
  }

  // Create X Axis Fields
  const [y_axis, setY_axis] = useState([]);
  const [y_axisUnits, setY_axisUnits] = useState([]);
  const [allYUnits, setAllYUnits] = useState(units);
  const getYUnits = (e) =>  {
    console.log(units[e])
    setX_axisUnits(units[e])
  }
  useEffect(() => {
    const unitValues = Object.values(units).flat();
    setAllYUnits(unitValues)
    console.log(unitValues)
  }, [y_axisUnits])
  const createY_axisTags = () => {
    const inputTags = [];
    for (let i = 0; i < numberOfDataSets; i++) {
      inputTags.push(
        <div key={i} className='test_data_box'>
            {/* <p>D{i+1}</p> */}
            <select 
              key={i} type="text" onChange={(event) => {
                setY_axis((prevInputValues) => {
                  const newInputValues = [...prevInputValues];
                  newInputValues[i] = event.target.value
                  return newInputValues;
                });
              }} 
            >
              <option value=""></option>
              <option value="Engineering Strain(%)">Engineering Strain(%)</option>
              <option value="Engineering Stress(MPa)">Engineering Stress(MPa)</option>
            </select>
            <select 
               type="text"
            >
              <option value=""></option>
              {
                y_axisUnits.length === 0 ? allYUnits.map((val) => (
                  <option value={val} key={val}>{val}</option>
                )) : 
                (
                  y_axisUnits.map((val) => (
                    <option value={val} key={val}>{val}</option>
                  ))
                )
              }
            </select>
            {
                    i == 0 ? 
                    <div className="setAll">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div> : ""
            }
        </div>
      );
    }
    return inputTags;
  }


  const createDataset = () => {
    if(numberOfDataSets > 0){
      setisCreateClicked((p)=>!p)
    }
  }

  const saveData = async() => {
    await setFormData({...formData, dataSetValue:dynamicArray})
    // console.log(formData)
    await dispatch(testStandardInfo(formData))
  }


  useEffect(() => {
    setFormData({...formData, temp:temperature})
  },[ temperature])

  useEffect(() => {
    // setFormData({...formData, NumberOf_Specimens:noOfSpecimens})
    const getInputTags = document.getElementsByClassName("noOfSpecimens_Input")
        console.log(getInputTags.length)
        for(let i=0; i<temperature.length; i++){
            getInputTags[i].value = noOfSpecimens[0]
        }
        console.log(noOfSpecimens)
  },[ noOfSpecimens])
  
  useEffect(() => {
    // setFormData({...formData, conditioned:conditioned})
    const getInputTags = document.getElementsByClassName("conditionedInput")
        console.log(getInputTags.length)
        // updates the Temperature Input tag
        for(let i=0; i<temperature.length; i++){
            getInputTags[i].value = conditioned[0]
        }
        console.log(conditioned)
  },[ conditioned])

  useEffect(() => {
    setFormData({...formData, CrossHeadSpeed:crossHeads})
  },[crossHeads])

  useEffect(() => {
    setFormData({...formData, x_axis:x_axis})
  },[ x_axis])

  useEffect(() => {
    setFormData({...formData, y_axis:y_axis})
  },[ y_axis])

  useEffect(() => {
    setFormData({...formData, dataSetValue:dynamicArray})
    console.log(setFormData)
  },[ dynamicArray])



// 
  const [userInput, setUserInput] = useState(1);
  const [nextClicked, setNextClicked] = useState(false)
  // CREATE FIELD FOR EACH SPECIMENS
  const createDynamicObject = (index) => ({
    [index-1]:[[], []]
  }); //Create Dynamic Array 
  // upload Dataset to Redux and create a 

  const uploadDataset = (NumberOf_Specimens , numberOf_Rows) => {

    setNextClicked(true);
    let mainArray = new Array()
    //Create a array of Matrix when the 
    for(let i=0; i<NumberOf_Specimens.length; i++){    
      let newMatrix = new Array()
      for(let j=0; j<NumberOf_Specimens[i]; j++){
        newMatrix.push([])
        newMatrix.push([]);
        mainArray.push(newMatrix)
        newMatrix = []
      }
    }
    setFormData({...formData, ManualDataSet:mainArray})
    console.log(formData)

  }
  
  // console.log(dynamicArray)
  const [excelData, setExcelData] = useState([]);
  const [xAxisData, setXAxisData] = useState([]);
  const [yAxisData, setYAxisData] = useState([]);
  const [tableData, setTableData] = useState({});

  // console.log("Talbe", tableData)
  const [arrayData, setArrayData] = useState([]);

  function insertOrUpdateAtIndex(myArray, indexToInsert, newValue) {
    if (indexToInsert >= 0 && indexToInsert < myArray.length) {
      myArray.splice(indexToInsert, 1, newValue);
      console.log(myArray)
    } else {
      myArray.splice(myArray.length, 0, newValue);
    }
  }

  const  handleInputChange = (e, rowIndex, axis, i, index) => {
    // console.log(index+1, i+1, axis, rowIndex+1, e)
      const n = dynamicArray;
      console.log(dynamicArray)
      if(axis === 'x_axis'){
        insertOrUpdateAtIndex(n[index][i][i][0], rowIndex,Number(e.target.value))
      }else{
        insertOrUpdateAtIndex(n[index][i][i][1], rowIndex,Number(e.target.value))
      }
    // console.log(n)
    setDynamicArray(n)
    console.log(n)
    console.log(arrayData)
  };

  const handleUserInput = (numRows) => {
    setUserInput(numRows);
    const newData = [];
    for (let i = 0; i < numRows; i++) {
      newData.push({ x_axis: '', y_axis: '' });
    }
    setExcelData(newData);
  };

  // paste
  function insertOrUpdateAtIndexForPasting(myArray, indexToInsert, newValue) {
    if (indexToInsert >= 0 && indexToInsert < myArray.length) {
      myArray.splice(indexToInsert, 1, newValue);
      console.log(myArray)
    } else {
      myArray.splice(myArray.length, 0, newValue);
    }
  }

  const handlePaste = async(e, rowIndex, axis , i, index) => {
    const n = dynamicArray;
    console.log(dynamicArray)
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('text').split('\n');
    const rows = pastedData.length
    console.log("Pasted")
    await handleUserInput(rows)
    pastedData.forEach((ind, inde) => {
      console.table(index+1, i+1, axis, rowIndex+1, Number(ind))
      if(axis === 'x_axis'){
        console.log(ind)
        insertOrUpdateAtIndexForPasting(n[index][i][i][0], inde, Number(ind))
      }else{
        insertOrUpdateAtIndexForPasting(n[index][i][i][1], inde, Number(ind))
        console.log(ind)
      }
      console.log(n[index][i][i])
    })
    console.log(n)
    await setDynamicArray(n)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const xValues = excelData.map((row) => row.x_axis);
    const yValues = excelData.map((row) => row.y_axis);

    setXAxisData(xValues);
    setYAxisData(yValues);
  };

  useEffect(() => {
    console.log("object")
    setDynamicArray(dynamicArray)
  }, [dynamicArray])

  // Create Upload Dataset Code;
  // const specimensInput = (index) => {
  //   const InputTags = []
  //   var j=1;
  //   for(let i=0; i<noOfSpecimens[index]; i++){
  //     InputTags.push(
  //       <div className="upload_data_section">
  //           {excelData.length > 0 && (
  //             <div className="upload_data_table">
  //               <h3>
  //                 Specimen {j}
  //               </h3>
  //               <Table 
  //                 sno={j} index={index} 
  //                 y_axis={formData.y_axis[index]} 
  //                 x_axis={formData.x_axis[index]}
  //                 ManualDataSet = {formData.ManualDataSet}
  //                 excelData={excelData}
  //                 NumberOf_Specimens={formData.NumberOf_Specimens}
  //               />
  //             </div>
  //           )}
  //       </div>
  //     )
  //     j=j+1;
  //   }
  //   return InputTags
  // }

  const createUploadDataset = () => {
    const InputTags = []
    for(let i=0; i<numberOfDataSets; i++){
      // console.log("Num",i);
      // console.log(noOfSpecimens[i])
      InputTags.push(
          <ManualDatasetUpload 
            DataSet={i} 
            noOfSpecimens={formData.NumberOf_Specimens[i]}
            y_axis={formData.y_axis[i]} 
            x_axis={formData.x_axis[i]}
          />
      )
    }

    return InputTags
  }

  createUploadDataset();

  // const [temperature, setTemperature] = useState(Array(numberOfDataSets).fill(null));
    

  
  return (
    <>

        <div className="test_container">
           <div className="test_header">
            <ion-icon name="add-outline"></ion-icon>
              <p>Test Standard : 
                <span>
                  ISO527 Test
                </span>
              </p>
           </div>
            <div className="test_wrapper">
              <div className="test_content_item">
                <select onChange={(e) =>{
                    setFormData({...formData, SpecimenType:e.target.value});
                    setSpecimenClicked(true)
                  } 
                }>
                  <option value="Select Test Standard">Specimen Type</option>
                  <option value="1A">1A</option>
                  <option value="1B">1B</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
                {
                  specimenClicked && (
                    formData.SpecimenType !== "Custom" ? 
                    (
                      formData.SpecimenType === "1A" ? (
                        <div className="test_content_item">
                          <div className="content_item">
                            <span>
                              L0 <sub>(mm)</sub>: <input type="number" onChange={(e) => setFormData({...formData, L0:e.target.value})} placeholder='75' />
                            </span>
                            <span>
                              h <sub>(mm)</sub>: <input type="number" onChange={(e) => setFormData({...formData, h:e.target.value})} placeholder='4' />
                            </span>
                          </div>
                        </div>
                      )
                      : 
                      (
                        <div className="test_content_item">
                          <div className="content_item">
                            <span>
                              L0 <sub>(mm)</sub>: <input type="number" onChange={(e) => setFormData({...formData, L0:e.target.value})} placeholder="50" />
                            </span>
                            <span>
                              h <sub>(mm)</sub>: <input type="number" onChange={(e) => setFormData({...formData, h:e.target.value})} placeholder='4' />
                            </span>
                          </div>
                        </div>
                      )
                    )
                    : 
                    (
                      <div className="test_content_item">
                        <div className="content_item">
                          <span>
                            L0 <sub>(mm)</sub>: <input type="number" onChange={(e) => setFormData({...formData, L0:e.target.value})} />
                          </span>
                          <span>
                            h <sub>(mm)</sub>: <input type="number" onChange={(e) => setFormData({...formData, h:e.target.value})} />
                          </span>
                        </div>
                      </div>
                    )
                  )
              }
              <div className="test_content_item">
                <div className="" onClick={addDataSheet}>
                 <div className="add">
                  Add Datasheets  <ion-icon name="caret-down-outline"></ion-icon> 
                 </div>
                </div>
              </div>  
              {
                isaddDataSheet && (
                  <div className="test_content_item">
                    <span>
                      <h4>Number of Datasets :</h4>
                      <input type="number" onChange={(e) =>setNumberOfDataSets(e.target.value)} id="" />
                    </span>
                    <div className="btn" onClick={createDataset}>
                      Create Datasets
                    </div>
                    <div className="skip" onClick={() => {
                      setIsProcessedDataClicked(!isProcessedDataClicked)
                    }}>
                      Skip To add Processed data <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                  </div>
                )
              }
            </div>
        </div>

        {
          isCreateClicked ? 
          (
            <div className="test_container">
              {/* TEMPERATURE */}
              <>
                <div className="test_container_box">
                  <TestCategoryComponent 
                    numberOfDataSets={numberOfDataSets} 
                    type={"Number"} component={"Temperature"} 
                    data={2}

                  />
                </div>
              </>
              <>
                <div className="test_container_box">
                  <p><ion-icon name="add-outline"></ion-icon> Conditioned</p>
                  <div className="test_container_inputs">
                    {isCreateClicked ? createConditionedTags() : ""}
                  </div>
                </div>
              </>

              <>
                <div className="test_container_box">
                  <p><ion-icon name="add-outline"></ion-icon>Number of Specimens / Dataset </p>
                  <div className="test_container_inputs">
                    {isCreateClicked ? createNoOfSpecimensTags() : ""}
                  </div>
                </div>
              </>

              <>
                <div className="test_container_box">
                  <p><ion-icon name="add-outline"></ion-icon>Crosshead Speed (mm/min)</p>
                  <div className="test_container_inputs">
                    {isCreateClicked ? createCrossheadTags() : ""}
                  </div>
                </div>
              </>

              <>
                <div className="test_container_box">
                  <p><ion-icon name="add-outline"></ion-icon>X-Axis</p>
                  <div className="test_container_inputs">
                    {isCreateClicked ?  createX_axisTags() : ""}
                  </div>
                </div>
              </>

              <>
                <div className="test_container_box">
                  <p><ion-icon name="add-outline"></ion-icon>Y-Axis</p>
                  <div className="test_container_inputs">
                    {isCreateClicked ? createY_axisTags() : ""}
                  </div>
                </div>
              </>
            </div>
          ):""
        }
        <form onSubmit={handleSubmit}>
          {/* <label>
            Number of Rows:
            <input type="number" value={excelData.length} onChange={(e) => handleUserInput(e.target.value)} />
          </label> */}
          <br />
          {/* <button type='submit'>submit</button> */}
        </form>

        <div className="next">
            <div className="btn" onClick={() => {uploadDataset(formData.NumberOf_Specimens, userInput); handleUserInput(1)}}>
             Next
            </div>
        </div>

      <div>

      {
         nextClicked && (
          <div style={{display:"grid", placeContent:"center"}}>
          {
            createUploadDataset()
          }
          <div onClick={() => {}}>
            submit DataSheet
          </div>
          </div>
        )
      }
    </div>
    <div className="next">
      <div className="btn" onClick={saveData}>
        Save
      </div>
    </div>


    </>
  )
}

export default ISO527