import React, { Children, useEffect, useState } from 'react'
import "../../../Styles/Pages/Test.css"
import { useDispatch } from 'react-redux'
import { testStandardInfo } from '../../../features/uploadSlice'

function ISO527() {
  const dispatch = useDispatch()
  const [numberOfDataSets, setNumberOfDataSets] = useState(0)
  const [specimenClicked, setSpecimenClicked] = useState(false)
  const [testData, setTestData] = useState({
    testStandard:"ISO527",
    SpecimenType:"",
    L0:0,
    h:0,
    temp:[],
    conditioned:[],
    NumberOf_Specimens:[],
    CrossHeadSpeed:[],
    x_axis:[],
    y_axis:[]
  });

  useEffect(() => {
    if(testData.SpecimenType === "1A"){
      setTestData({...testData, L0:75, h:4})
    }

    if(testData.SpecimenType === "1B"){
      setTestData({...testData, L0:50, h:4})
    }

  }, [testData.SpecimenType])

  // Add DataSheet
  const [isaddDataSheet, setIsAddDataSheet] = useState(false) 
  const addDataSheet = () => {
    if(testData.L0 ==0 || testData.h==0 ){
      alert("Enter L0 and h values")
    }else{
      setIsAddDataSheet(true)
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
              key={i} type="Number" onChange={(event) => {
                setTemperature((prevInputValues) => {
                  const newInputValues = [...prevInputValues];
                  newInputValues[i] = event.target.value;
                  return newInputValues;
                });
              }} 
            />
        </div>
      );
    }
    return inputTags;
  };

  // Create Conditioned Input Fields
  const [conditioned, setConditioned] = useState([]);
  const createConditionedTags = () => {
    const inputTags = [];
    for (let i = 0; i < numberOfDataSets; i++) {
      inputTags.push(
        <div key={i} className='test_data_box'>
            {/* <p>D{i+1}</p> */}
            <select 
              key={i} type="Number" onChange={(event) => {
                setConditioned((prevInputValues) => {
                  const newInputValues = [...prevInputValues];
                  newInputValues[i] = event.target.value;
                  return newInputValues;
                });
              }} 
            >
              <option value=""></option>
              <option value="DAM">DAM</option>
              <option value="RH50">RH50</option>
            </select>
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
            <input 
              key={i} type="Number" onChange={(event) => {
                setNoOfSpecimens((prevInputValues) => {
                  const newInputValues = [...prevInputValues];
                  newInputValues[i] = event.target.value;
                  return newInputValues;
                });
              }} 
            />
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
              key={i} type="Number" onChange={(event) => {
                setCrossHeads((prevInputValues) => {
                  const newInputValues = [...prevInputValues];
                  newInputValues[i] = event.target.value;
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
  const createX_axisTags = () => {
    const inputTags = [];
    for (let i = 0; i < numberOfDataSets; i++) {
      inputTags.push(
        <div key={i} className='test_data_box'>
            {/* <p>D{i+1}</p> */}
            <select 
              key={i} type="text" onChange={(event) => {
                setX_axis((prevInputValues) => {
                  const newInputValues = [...prevInputValues];
                  newInputValues[i] = event.target.value;
                  return newInputValues;
                });
              }} 
            >
              <option value=""></option>
              <option value="Strain (%)">Strain (%)</option>
              <option value="Eng Stress (MPa)">Eng Stress (MPa)</option>
            </select>
        </div>
      );
    }
    return inputTags;
  }

  // Create X Axis Fields
  const [y_axis, setY_axis] = useState([]);
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
                  newInputValues[i] = event.target.value;
                  return newInputValues;
                });
              }} 
            >
              <option value=""></option>
              <option value="Strain (%)">Strain (%)</option>
              <option value="Eng Stress (MPa)">Eng Stress (MPa)</option>
            </select>
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
    await dispatch(testStandardInfo(testData))
  }


  useEffect(() => {
    setTestData({...testData, temp:temperature})
  },[ temperature])

  useEffect(() => {
    setTestData({...testData, NumberOf_Specimens:noOfSpecimens})
  },[ noOfSpecimens])

  useEffect(() => {
    setTestData({...testData, conditioned:conditioned})
  },[ conditioned])

  useEffect(() => {
    setTestData({...testData, CrossHeadSpeed:crossHeads})
  },[crossHeads])

  useEffect(() => {
    setTestData({...testData, x_axis:x_axis})
  },[ x_axis])

  useEffect(() => {
    setTestData({...testData, y_axis:y_axis})
  },[ y_axis])
  
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
                    setTestData({...testData, SpecimenType:e.target.value});
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
                    testData.SpecimenType !== "Custom" ? 
                    (
                      testData.SpecimenType === "1A" ? (
                        <div className="test_content_item">
                          <div className="content_item">
                            <span>
                              L0 <sub>(mm)</sub>: <input type="number" onChange={(e) => setTestData({...testData, L0:e.target.value})} placeholder='75' />
                            </span>
                            <span>
                              h <sub>(mm)</sub>: <input type="number" onChange={(e) => setTestData({...testData, h:e.target.value})} placeholder='4' />
                            </span>
                          </div>
                        </div>
                      )
                      : 
                      (
                        <div className="test_content_item">
                          <div className="content_item">
                            <span>
                              L0 <sub>(mm)</sub>: <input type="number" onChange={(e) => setTestData({...testData, L0:e.target.value})} placeholder="50" />
                            </span>
                            <span>
                              h <sub>(mm)</sub>: <input type="number" onChange={(e) => setTestData({...testData, h:e.target.value})} placeholder='4' />
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
                            L0 <sub>(mm)</sub>: <input type="number" onChange={(e) => setTestData({...testData, L0:e.target.value})} />
                          </span>
                          <span>
                            h <sub>(mm)</sub>: <input type="number" onChange={(e) => setTestData({...testData, h:e.target.value})} />
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
                    <div className="skip">
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
              <>
                <div className="test_container_box">
                  <p><ion-icon name="add-outline"></ion-icon> Temperature(c)</p>
                  <div className="test_container_inputs">
                    {isCreateClicked ? createTemperatureTags() : ""}
                  </div>
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


        <div className="next">
            <div className="btn" onClick={saveData}>
            Save
          </div>
        </div>
    </>
  )
}

export default ISO527