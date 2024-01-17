import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart({plotData, DataSet}) {

  const [plot, setPlot] = useState([])
  const dataForPlot = async() => {
      // const existingIndex = plotData.filter((item) => {
      //   return item.dataset === DataSet
      // })

      // console.log(existingIndex)
      // setPlot(existingIndex)
      console.log(plotData)

      // console.log(object)
  }

  useEffect(() => {
    dataForPlot()
  }, [plot])
  // const data = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //   datasets: [
  //     {
  //       label: "First dataset",
  //       data: [33, 53, 85, 41, 44, 65],
  //       fill: true,
  //       backgroundColor: "rgba(75,192,192,0.2)",
  //       borderColor: "rgba(75,192,192,1)"
  //     },
  //     {
  //       label: "Second dataset",
  //       data: [33, 25, 35, 51, 54, 76],
  //       fill: false,
  //       borderColor: "#742774"
  //     }
  //   ]
  // };
  // console.log("Dat for plot", data)

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       data: plot.map((e) => e.x_axis),
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //       yAxisID: 'y',
  //     },
  //     // {
  //     //   label: 'Dataset 2',
  //     //   // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
  //     //   borderColor: 'rgb(53, 162, 235)',
  //     //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     //   yAxisID: 'y1',
  //     // },
  //   ],
  // };
  return (
    <div>

        <h3>Plot</h3>
        {/* <Line options={options} data={data} />; */}
    </div>
  )
}

export default Chart