import React, { useState } from 'react'
import Table from '../../TestComponents/Table';
import Chart from '../../TestComponents/Chart';
import { useEffect } from 'react';

function ManualDatasetUpload({DataSet, noOfSpecimens, x_axis, y_axis}) {
    const [x_axisValue, setX_axisValue] = useState([])
    const [y_axisValue, setY_axisValue] = useState([])
    const [isPlot, setIsplot] = useState(false)
    
    const [dataSetValue, setDatasetValue] = useState([])

    const handleSpecimenData = (data, datasetNo, specimenNo) => {
        console.log(data, datasetNo, specimenNo, data.dataset, data.specimens);
        const existingIndex = dataSetValue.findIndex(
            (item) =>
              item.dataset === data.dataset &&
              item.specimens === data.specimens
        );

        console.log(existingIndex)
        if (existingIndex !== -1) {
            console.log("Exist")
            // If exists, update the existing object
            setDatasetValue((prevData) => {
              const newData = [...prevData];
              newData[existingIndex] = data;
              return newData;
            });
        }else {
            // If not exists, add the new object
            setDatasetValue((prevData) => [...prevData, ...data]);
        }
        // setDatasetValue((p) => [...p, data])
    }

    const specimensInput = (index) => {
        const InputTags = []
        console.log("isPLot",isPlot)
        var j=1;
        for(let i=0; i<noOfSpecimens; i++){
          InputTags.push(
            <div className="upload_data_section">
                {
                  <div className="upload_data_table">
                    <h3>
                      Specimen {j} {index}
                    </h3>
                    <Table
                        sno={j} index={index} 
                        y_axis={y_axis} 
                        x_axis={x_axis}
                        sendToParent={handleSpecimenData}
                        plotClicked={isPlot}
                    />
                  </div>
                }
            </div>
          )
          j=j+1;
        }
        return InputTags
    }
    console.log(dataSetValue)
    useEffect(() => {
        console.log("NEww", dataSetValue)
    }, [dataSetValue])

  return (
    <div className="upload_data_wrapper">
        <div className="upload_data_container">
            <div className="upload_container_header">
                  <h4><p>ManualDatasetUpload {DataSet+1} : {noOfSpecimens}</p></h4>
            </div>
            <div className="upload_data_wrapper">
            {
                specimensInput(DataSet+1)
            }
            </div>
            <div className="plot">
                <p className='btn' onClick={() => {setIsplot(!isPlot)}}>Plot</p>
            </div>
           {
            isPlot &&  <Chart data={dataSetValue} dataset={DataSet+1} />
           }
        </div>
    </div>
  )
}

export default ManualDatasetUpload