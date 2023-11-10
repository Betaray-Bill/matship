import React, { useEffect, useRef, useState } from 'react'
import Nav from '../Components/Nav'
import '../Styles/Pages/Home.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Maindropdown from '../Components/Maindropdown';

var classSet = new Set();
var subclassSet = new Set();
var familySet = new Set();
var m= []

var classMap = new Map();
var subclassMap = new Map();
var familyMap = new Map();

var Class = []
var SubClass = []
var FamilyClass = []



function Home() {
    const scrollToResult = useRef();

    const [isUsedFilter, setIsUsedFilter] = useState(false)
    const [value, setvalue] = useState("");
    const [datas, setDatas] = useState([])
    const [replicaData, setreplicaData] = useState([])
    const [result, setresult] = useState([]);
    const [resultStr, setresultStr] = useState("");
    const [isSearched, setIsSearched] = useState(false);

    const navigate = useNavigate()

    // Get All the Data and Filter
    const getAllData = async() => {
        try{
            const {data} = await axios.get('/api/materials/getall')
            await setDatas(data)
            console.log(data)
            classMap.clear();
            subclassMap.clear();
            familyMap.clear()
            for (const i of data) {

                if (classMap.has(i.MasterClass)) {
                    // Increment the count for the i.MasterClass.
                    classMap.set(i.MasterClass, classMap.get(i.MasterClass) + 1);
                } else {
                    // Add the i.MasterClass to the classMap with a count of 1.
                    classMap.set(i.MasterClass, 1);
                }
                if (subclassMap.has(i.subClass)) {
                    // Increment the count for the i.subClass.
                    subclassMap.set(i.subClass, subclassMap.get(i.subClass) + 1);
                } else {
                    // Add the i.subClass to the subclassMap with a count of 1.
                    subclassMap.set(i.subClass, 1);
                }
                if (familyMap.has(i.Family)) {
                    // Increment the count for the i.Family.
                    familyMap.set(i.Family, familyMap.get(i.Family) + 1);
                } else {
                    // Add the i.Family to the familyMap with a count of 1.
                    familyMap.set(i.Family, 1);
                }

                classSet.add(i.MasterClass);
                subclassSet.add(i.subClass)
                familySet.add(i.Family)

                if(!Class.includes(i.MasterClass)){
                    Class.push(i.MasterClass)
                }
                
                if(!SubClass.includes(i.subClass)){
                    SubClass.push(i.subClass)
                }
                
                if(!FamilyClass.includes(i.Family)){
                    FamilyClass.push(i.Family)
                }
            }

            console.log(Class, SubClass, FamilyClass)
            console.log("Map", classMap)
        }catch(err){
            console.log(err)
            navigate('/pagenotfound')
        }
    }

    useEffect(() => {
        getAllData()
    }, [classMap])


    // Global Search
    const fetchSearch = async(e) => {
        if(e === ''){
            alert("Enter data")
        }else{
            const {data} = await axios.get(`/api/materials/getglobalsearch/${e}`)
            await setresult(data)
            setIsSearched(true)
            scrollToResult.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const submit = async() => {
        await fetchSearch(value)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            fetchSearch(value);
        }
    }


    const resetSearch = async() =>{
        setvalue('')
        setresult('')
        setIsSearched(false)
        getAllData()
    }

    // Remove Unchecked Value
    const handleRemove = (e) => {
        handleFilter(e, "Remove")
    }
    
    // Filter Data
    const handleFilter = async(e, type) => {
        // getAllData()
        let str = resultStr !== null ? resultStr+' '+e : e
        setresultStr(str)
        console.log("Str", str)
        if(type === "Remove"){
            str = resultStr.replace(e, "").trim();
        }

        const { data } = await axios.get(`api/materials/getglobalsearch/${str}`);
        await setreplicaData(data);
        console.log(data)
        m = data
        Class.length = 0
        SubClass.length = 0
        FamilyClass.length = 0
        for (const i of data) {
            classSet.add(i.MasterClass);
            subclassSet.add(i.subClass)
            familySet.add(i.Family)

            if(!Class.includes(i.MasterClass)){
                Class.push(i.MasterClass)
            }
            
            if(!SubClass.includes(i.subClass)){
                SubClass.push(i.subClass)
            }
            
            if(!FamilyClass.includes(i.Family)){
                FamilyClass.push(i.Family)
            }
        }
        console.log(classSet, subclassSet, familySet)
        setIsUsedFilter(true);
        setresult(data)
    }

    // Reset Filter
    const resetFilter = async() => {
        const {data} = await axios.get('api/materials/getall')
        await setDatas(data)
        m = data;
        setresult([])
        setIsUsedFilter(false);
        setresultStr(null)
        getAllData()
    }
    
  return (
    <> 
        <Nav />
        <div className="home_wrapper">
            <div className="upload_btn">
                <Link to='/uploadData'>
                    <ion-icon name="add-outline"></ion-icon>
                </Link>
            </div>
            <div className="home_container">
                <div className="home_container_header">
                    <p>Unlocking the World of Materials: Your Search, Our Find!</p>
                </div>
                
                <div className="home_section">
                    <div className="globalSearch">
                        <h2>Global Search</h2>
                        <div className="globalSearch_container">
                            <ion-icon name="search-outline"></ion-icon>
                            <input type="text" value={value} 
                                onChange={(e) => setvalue(e.target.value)} 
                                onKeyPress={handleKeyPress}
                                name="" placeholder='Search the materials..' />
                            {
                                isSearched ? <ion-icon name="close-outline" onClick={resetSearch}></ion-icon> : ""
                            }
                        </div>
                        <div className="submit" style={{marginTop:"40px"}}>
                            <div className="btn" onClick={submit}>
                                Search
                            </div>
                        </div>
                    </div>
                    
                    <div className="advanced_filter_section">
                        <h2>Advanced Filter :</h2>

                        <div className="advanced_filter_wrapper">
                            {
                                Array.from(classMap).map((key,value) => (
                                    <span>
                                        <h3>{key[0]} : {key[1]}</h3>
                                    </span>
                                ))
                            }
                            <form>
                                <Maindropdown data={classMap} name={"Master Class"} sendToParent={handleFilter} removeFromParent={handleRemove}/>
                                <Maindropdown data={subclassMap} name={"Sub Class"} sendToParent={handleFilter} removeFromParent={handleRemove}/>
                                <Maindropdown data={familyMap} name={"Family"} sendToParent={handleFilter} removeFromParent={handleRemove}/>
                            </form>
                        </div>
                        
                    <div className="reset_btn" >
                        <div className="btn" onClick={resetFilter}>
                            Reset
                        </div>
                    </div>
                    </div>
                </div>
            </div>


            <div className="result">
                {result.length === 0 ? <h3></h3> : result.length > 1 ? <h3>{result.length} Results are found</h3>  : <h3>{result.length} Result is found</h3>}
                <div className="output" ref={scrollToResult}>
                {
                    result && result.map((e, _i) => (
                        <div key={_i}>
                            <h2>{e.MasterClass}</h2>
                            <p>{e.productName}</p>
                        </div>
                    ))
                }
                </div>
                
            </div>
        </div>
    </>
  )
}

export default Home


{/* <select name="Master Class" className="search-select" onChange={(e) => {handleFilter(e.target.value, e.target.name)}}>
    <option value="Master Class">Master Class</option>
    {
            classSet && Array.from(classSet).map((e, i) => (
                <option value={e} key={i}>{e}</option>
            ))
        
    }
</select> */}
{/* <select name="Sub Class" className="search-select"  onChange={(e) => {handleFilter(e.target.value, e.target.value)}}>
    <option value="Sub Class">Sub Class</option>
    {
            subclassSet && Array.from(subclassSet).map((e, i) => (
                <option value={e} key={i}>{e}</option>
            ))
    }
    {
        isUsedFilter ? m.map((e, i) => (
            <option value={e} key={i}>{e}</option>
        ))  :
        classSet.size > 0 ? Array.from(subclassSet).map((e, i) => (
            <option value={e} key={i}>{e}</option>
        )) : <option value="No Results..">No Results..</option> 
    }
</select> */}
{/* <select name="Supplier" className="search-select" >
    <option value="Supplier">Supplier</option>
    {
        
    }
</select> */}
            
{/* <div className="dropdown_container">
    <Dropdown data={isUsedFilter ? m : classSet }/>
</div>
<Dropdown data={isUsedFilter ? m : classSet }/>
<Dropdown data={isUsedFilter ? m : classSet }/> */}