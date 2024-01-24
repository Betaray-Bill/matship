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
import ConditionedComponent from './ISO527/Components/ConditionedComponent';
import NumberOfDataset from './ISO527/Components/NumberOfDataset';
import Crosshead from './ISO527/Components/Crosshead';

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

  const [isCreateClicked, setisCreateClicked] = useState(false);

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


  const createUploadDataset = () => {
    const InputTags = []
    for(let i=0; i<numberOfDataSets; i++){
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
                    FormData={formData}
                  />
                </div>
              </>
              
              {/* CONDITIONED */}
              <>
                <div className="test_container_box">
                  <ConditionedComponent
                    numberOfDataSets={numberOfDataSets} 
                    type={"Number"} component={"Conditioned"} 
                    FormData={formData}
                  />
                </div>
              </>

              {/* Number of Specimens */}
              <>
                <div className="test_container_box">
                  <NumberOfDataset
                    numberOfDataSets={numberOfDataSets} 
                    type={"Number"} component={"Number of Specimens / Dataset "} 
                    FormData={formData}
                  />
                </div>
              </>

              {/* Crosshead Speed (mm/min) */}
              <>
                <div className="test_container_box">
                  <Crosshead
                    numberOfDataSets={numberOfDataSets} 
                    type={"Number"} component={"Crosshead Speed (mm/min)"} 
                    FormData={formData}
                  />
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
        {/* <form onSubmit={handleSubmit}>
        </form> */}

        <div className="next">
            <div className="btn" onClick={() => {uploadDataset(formData.NumberOf_Specimens, userInput)}}>
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