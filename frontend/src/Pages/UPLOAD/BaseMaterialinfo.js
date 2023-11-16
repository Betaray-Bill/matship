import React, { useEffect, useRef, useState } from 'react'
import Nav from './../../Components/Nav.js'
import '../../Styles/Pages/Upload.css'
import Dropdown from './../../Components/Dropdown';
import {Family, masterClass, subClass} from "../../TypesOfMaterials.js"
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { uploadbaseInfo } from '../../features/uploadSlice.js';
import { isFormFilledFalse, isFormFilledTrue } from '../../features/isFormFilled.js';

function BaseMaterialinfo({isClickedNext}) {
  console.log(isClickedNext)
  const dispatch = useDispatch()
  const {isFormFilledState} = useSelector(state => state.formFilled)
  const scrollToResult = useRef();
  const arr = [];
  console.log(isFormFilledState)
  const [showElements, setShowElements] = useState(false)
  const [isLegacyYes, setIsLegacyYes] = useState(false);
  const [isLegacyNo, setIsLegacyNo] = useState(false);

  const {currentUser} = useSelector(state => state.user)
  const {basematerialInfo} = useSelector(state => state.uploadData)
  console.log(basematerialInfo)

  const [addData, setAddData] = useState({
    MasterClass:"",
    subClass:"",
    Family:"",
    productName:"",
    Sustainability:"",
    Filler:"",
    DeliveryForm:"",
    company:currentUser ? currentUser.company : "",
    companyEntity:currentUser ? currentUser.companyEntity : "",
    isLegacy:false
  })

  const submitData = async() => {
    console.log(addData)
    // const addDataIsempty = Object.values(addData).some(value => !value)  
    setAddData(
      {...addData, isLegacy: isLegacyYes ? isLegacyYes : isLegacyNo}
    )
    console.log(addData)
    if(!addData.isLegacy){
      alert("This is an unapproved material. This will be sent to Matship experts for approval. It may take 1 week");
    }

    try{
      const res = await fetch("/api/materials/addMaterial", {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify(addData)
      })

      const data = await res.json();
      console.log(data)

    }catch(err){
      console.log(err)
    }
  }

  const toggleShowContent = () => {
    setShowElements(true)
    dispatch(isFormFilledFalse())
    setClicked(!clicked)
    setAddData({
      MasterClass:"",
      subClass:"",
      Family:"",
      productName:"",
      Sustainability:"",
      Filler:"",
      DeliveryForm:"",
      company:currentUser ? currentUser.company : "",
      companyEntity:currentUser ? currentUser.companyEntity : "",
      isLegacy:isLegacyYes ? isLegacyYes : isLegacyNo
    })
    console.log(addData)
  }

  const [companyMat, setCompanyMat] = useState([])
  const handleCheckboxChange = async(a) => {
    console.log(a)
    if(a==="yes"){
      setIsLegacyYes((p) => !p)
      setIsLegacyNo(false)
      console.log("object", currentUser.company)
      try{
        const res = await fetch(`/api/materials/${currentUser.companyEntity}/getAllProducts`)
        const data = await res.json();
        console.log(data)
        setCompanyMat(data)
        return data
      }catch(err){
        console.log("Cannot get the materials of this company")
      }
    }else{
      setIsLegacyNo((p) => !p)
      setIsLegacyYes(false)
      try{
        const res = await fetch('/api/materials/getall')
        const data = await res.json();
        console.log(data)
        data.forEach(async(e) => {
          await arr.push(e.productName)
        })
        console.log("ASDasda", arr)
        await setCompanyMat(arr)
        return data
      }catch(err){
        console.log("Cannot get the materials of this company")
      }
    }
  };


  const [receivedData, setReceivedData] = useState('');

  const handleDataReceived = async(data) => {
    await setReceivedData(data);
    await setAddData({...addData, MasterClass:data})
  };
  const [receivedSubClass, setReceivedSubClass] = useState('');

  const handleDataSubClass =async(data) => {
    setReceivedSubClass(data)
    await setAddData({...addData, subClass:data})

  }
  const [receivedFamily, setReceivedFamily] = useState('');

  const handleDataFamily = async(data) => {
    setReceivedFamily(data)
    await setAddData({...addData, Family:data})
  }

  // Search Database
  const [value, setValue] = useState('')

  // Search Material
  const debouncedSearch = debounce(async (e) => {
    console.log("Send", e)
    onSearch(value)
  }, 100);


  const onSearch = async(e) => {
    const {data} = await axios.get(`api/materials/getuploadsearch/${value}`);
    console.log(data.ans)
    setCompanyMat([])
    data.ans.forEach((i) => {
      setCompanyMat((p) => [...p, i.productName])
    })
  }

  const handleChange = (e) => {
    debouncedSearch(e.target.value);
    // onSearch(e.target.value);
  }

  const handleKeyPress = (event) => {

    if (event.key === 'Enter') {
      event.preventDefault()
      setShowElements(true)
      if(event.target.value){
        debouncedSearch(value)
      }
    }
  };

  // Search Onclick
  const [clicked, setClicked] = useState(false)

  //get Single Product
  const getSingleProduct = async(e) => {
    setValue(e)
    const {data} = await axios.get(`api/materials/getsinglematerial/${e}`);
    console.log(data)
    // setClicked(!clicked)
    setShowElements(true)
    setAddData(data.getMaterial)
    console.log(addData)
  }

  // Next to Test Standards
  const [isNextTestStandard, setIsNextTestStandard] = useState(false);

  const nextTestStandard = () => {
    setIsNextTestStandard(true);
    scrollToResult.current.scrollIntoView({ behavior: 'smooth' });
  }
  // Save to Redux
  const saveData = async(e) => {
    e.preventDefault()
    setShowElements(true)
    await dispatch(uploadbaseInfo(addData))
    await dispatch(isFormFilledTrue())
  }

  const clearData = () => {
    setShowElements(false)
    setAddData({})
  }

  return (
    <>
        {/* <Nav /> */}
        <div className="upload_wrapper">
          <div className="upload_container">
              <div className="upload_header">
                <p>1. Base Material Info</p>
                <div className="hr"></div>
              </div>
              <form action="">
                {/* Legacy Data */}
                <div className="form_content">
                  <p>Legacy data</p>
                  <label htmlFor="">
                      <div className="islegacy_btn" onClick={() => handleCheckboxChange("yes")}>
                      {
                        isLegacyYes ? <ion-icon name="radio-button-on-outline"></ion-icon>:  <ion-icon name="radio-button-off-outline"></ion-icon>
                      }
                        Yes
                      </div>
                  </label>
                  <label htmlFor="">
                      <div className="islegacy_btn" onClick={() => handleCheckboxChange("no")}>
                      {
                        isLegacyNo ? <ion-icon name="radio-button-on-outline"></ion-icon>:  <ion-icon name="radio-button-off-outline"></ion-icon>
                      }
                        No
                      </div>
                  </label>
                </div>

                <div className="search_section">
                  <div className="form_content legacy_search">
                  {/* search DB */}
                    <input type="text" 
                      placeholder={(isLegacyNo && isLegacyYes) ? 'Search Materials' 
                          :  
                        ( isLegacyYes ? `Search ${currentUser.company}` : `Search All Materials` )} 
                        onChange={(e) => {setValue(e.target.value) }}
                        onKeyPress={handleKeyPress}
                        onClick={(e) => setClicked(!clicked)}
                        value={ value}
                    />
                    <ion-icon name="search-outline"></ion-icon>
                  </div>

                  {
                    clicked ?  
                    <div className="search_suggestion">
                      <div className='suggested'>
                        {
                          companyMat && companyMat.map((e) => (
                            <p key={e} onClick={()=>getSingleProduct(e)}>{e}</p>
                          ))
                        }
                      </div>
                      <div className="form_content">
                        <div className="btn" onClick={toggleShowContent}>
                          <ion-icon name="add-outline"></ion-icon> Add New
                        </div>
                      </div>
                    </div>
                    :
                    ""
                  }

                </div>

                {
                  showElements && (
                    <>
                      <div className="close">
                        <div className="close_btn" onClick={clearData}>
                          <ion-icon name="close-outline"></ion-icon> Clear
                        </div>
                      </div>
                      <div className="add_element_container">
                        <div className="ade_content">
                              <Dropdown header={isFormFilledState ? basematerialInfo.MasterClass : "Class"} data={masterClass} sendToParent={handleDataReceived}/>
                        </div>
                        <div className="ade_content">
                              <Dropdown header={isFormFilledState ? basematerialInfo.subClass : "Sub Class"} data={receivedData && subClass[receivedData].subClass }  sendToParent={handleDataSubClass}/>
                        </div>
                        <div className="ade_content">
                              <Dropdown header={isFormFilledState ? basematerialInfo.Family : "Family"} data={receivedSubClass && Family[receivedSubClass].subClass} sendToParent={handleDataFamily}/>
                        </div>
                        {
                          isLegacyYes ? 
                          <div className="ade_content_input">
                            <label htmlFor="">Company Name</label>
                            <input type="text" readOnly placeholder={currentUser.company} style={{"color":"black"}}/>
                          </div> :
                          <div className="ade_content_input">
                            <label htmlFor="">Company Name</label>
                            <input type="text" 
                              value={isFormFilledState ? basematerialInfo.company : addData.company}
                              onChange={(e) => setAddData({...addData, DeliveryForm:e.target.value})} name="Delivery form" placeholder=''/>
                          </div>
                        }
                        <div className="ade_content_input">
                          <label htmlFor="">Product Name</label>
                          <input type="text" 
                            value={isFormFilledState ? basematerialInfo.productName : addData.productName} 
                            onChange={(e) => setAddData({...addData, productName:e.target.value})}  name="productName" placeholder=''/>
                        </div>
                        <div className="ade_content_input">
                          <label htmlFor="">Sustainability</label>
                          <input type="text" 
                            value={isFormFilledState ? basematerialInfo.Sustainability : addData.Sustainability} 
                            onChange={(e) => setAddData({...addData, Sustainability:e.target.value})} name="Sustainability" placeholder=''/>
                        </div>
                        <div className="ade_content_input">
                          <label htmlFor="">Filler</label>
                          <input type="text" 
                            value={isFormFilledState ? basematerialInfo.Filler : addData.Filler} 
                            onChange={(e) => setAddData({...addData, Filler:e.target.value})} name="Filler" placeholder=''/>
                        </div>
                        <div className="ade_content_input">
                          <label htmlFor="">Delivery form</label>
                          <input type="text" 
                            value={isFormFilledState ? basematerialInfo.DeliveryForm : addData.DeliveryForm} 
                            onChange={(e) => setAddData({...addData, DeliveryForm:e.target.value})} name="Delivery form" placeholder=''/>
                        </div>
                        {
                          isLegacyNo ? 
                          <div className="ade_content_input">
                            <label htmlFor="">Material WebSite</label>
                            <input type="text" onChange={(e) => setAddData({...addData, DeliveryForm:e.target.value})} name="Material WebSite" placeholder=''/>
                          </div> : null
                        }
                      </div>
                      {/* onClick={submitData} */}
                    </>
                  )
                }

              </form>                      

              <div className="next">
                <div className="btn" onClick={saveData}>
                  Save
                </div>
                {/* <div className="btn" onClick={nextTestStandard} ref={scrollToResult}>Next</div> */}
              </div>
          </div>

          {/* <div onClick={()=>{isClickedNext(2)}}>
            next
          </div> */}
        </div>
    </>
  )
}

export default BaseMaterialinfo