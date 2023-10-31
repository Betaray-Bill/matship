import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import '../Styles/Pages/Upload.css'
import Dropdown from '../Components/Dropdown';
import {Family, masterClass, subClass} from "../TypesOfMaterials.js"
import { useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import axios from 'axios';


function Upload() {
  const arr = [];
  
  const [showElements, setShowElements] = useState(false)
  const [isLegacyYes, setIsLegacyYes] = useState(false);
  const [isLegacyNo, setIsLegacyNo] = useState(false);

  const {currentUser} = useSelector(state => state.user)

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
    setShowElements((p) => !p)
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
  }, 800);


  const onSearch = async(e) => {
    const {data} = await axios.get(`api/materials/getuploadsearch/${value}`);
    console.log(data.ans)
    setCompanyMat([])
    data.ans.forEach((i) => {
      setCompanyMat([...companyMat, i.productName])
    })
  }

  const handleChange = (e) => {
    debouncedSearch(e.target.value);
    // onSearch(e.target.value);
  }

  const handleKeyPress = (event) => {

    if (event.key === 'Enter') {
      event.preventDefault()
      if(event.target.value){
        debouncedSearch(value)
      }
    }
  };

  // Search Onclick
  const [clicked, setClicked] = useState(false)
  // console.log(companyMat)
  return (
    <>
        <Nav />
        <div className="upload_wrapper">
          <div className="upload_container">
              <div className="upload_header">
                <h2>Base Material Info</h2>
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
                        value={value}
                    />
                    <ion-icon name="search-outline"></ion-icon>
                  </div>

                  {
                    clicked ?  
                    <div className="search_suggestion">
                      <div className='suggested'>
                        {
                          companyMat && companyMat.map((e) => (
                            <p key={e} onClick={() => setValue(e)}>{e}</p>
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
                        <div className="close_btn" onClick={(e) => { setShowElements(false)}}>
                          <ion-icon name="close-outline"></ion-icon> Close
                        </div>
                      </div>
                      <div className="add_element_container">
                        <div className="ade_content">
                              <Dropdown header={"Class"} data={masterClass} sendToParent={handleDataReceived}/>
                        </div>
                        <div className="ade_content">
                              <Dropdown header={"Sub Class"} data={receivedData && subClass[receivedData].subClass }  sendToParent={handleDataSubClass}/>
                        </div>
                        <div className="ade_content">
                              <Dropdown header={"Family"} data={receivedSubClass && Family[receivedSubClass].subClass} sendToParent={handleDataFamily}/>
                        </div>
                        {
                          isLegacyYes ? 
                          <div className="ade_content_input">
                            <label htmlFor="">Company Name</label>
                            <input type="text" readOnly placeholder={currentUser.company} style={{"color":"black"}}/>
                          </div> :
                          <div className="ade_content_input">
                            <label htmlFor="">Company Name</label>
                            <input type="text" onChange={(e) => setAddData({...addData, DeliveryForm:e.target.value})} name="Delivery form" placeholder=''/>
                          </div>
                        }
                        <div className="ade_content_input">
                          <label htmlFor="">Product Name</label>
                          <input type="text" onChange={(e) => setAddData({...addData, productName:e.target.value})} name="productName" placeholder=''/>
                        </div>
                        <div className="ade_content_input">
                          <label htmlFor="">Sustainability</label>
                          <input type="text" onChange={(e) => setAddData({...addData, Sustainability:e.target.value})} name="Sustainability" placeholder=''/>
                        </div>
                        <div className="ade_content_input">
                          <label htmlFor="">Filler</label>
                          <input type="text" onChange={(e) => setAddData({...addData, Filler:e.target.value})} name="Filler" placeholder=''/>
                        </div>
                        <div className="ade_content_input">
                          <label htmlFor="">Delivery form</label>
                          <input type="text" onChange={(e) => setAddData({...addData, DeliveryForm:e.target.value})} name="Delivery form" placeholder=''/>
                        </div>
                        {
                          isLegacyNo ? 
                          <div className="ade_content_input">
                            <label htmlFor="">Material WebSite</label>
                            <input type="text" onChange={(e) => setAddData({...addData, DeliveryForm:e.target.value})} name="Material WebSite" placeholder=''/>
                          </div> : null
                        }
                      </div>
                      <div className="btn" onClick={submitData}>Submit</div>
                    </>
                  )
                }

              </form>
          </div>
        </div>
    </>
  )
}

export default Upload
