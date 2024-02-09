import React from 'react'
import Sidebar from './Sidebar'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)


function Dashboard() {
    const state = {
        labels: [
          'Sept',
          'Oct',
          'Nov',
          'Dec',
          'Jan',
        ],
        datasets: [
          {
            label: 'New Users (last 5 months)',
            backgroundColor: '#3B3486',
            data: [12, 15, 4, 30, 10, 20, 20],
          },
        ],
      }

      const piestate = {
        labels: [
          'August',
          'September',
          'October',
          'November',
          'December',
          'January',
        ],
        datasets: [
          {
            label: 'New Employees (last 6 months)',
            backgroundColor: [
              'Indigo',
              'Purple',
              'Yellow',
              'Red',
              'Navy',
              'Brown',
            ],
            data: [10, 14, 17, 16, 19, 16, 17],
          },
        ],
      }

      const linestate = {
        labels: [
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
          'January',
        ],
        datasets: [
          {
             label: 'Number of people viewed RECIPEZ in last 8 months',
            backgroundColor: [
              'Indigo',
              'Purple',
              'Yellow',
              'Teal',
              'Red',
              'Navy',
              'Brown',
              'Green',
            ],
            fill: false,
            lineTension: 0.5,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [10, 14, 17, 16, 19, 16, 17,20],
          },
        ],
      }
      
      const chartWidth = 400;
      const chartHeight = 300;

      const linewidth = 150;
      const lineheight = 50;
      
  return (
    <div className='d-flex'>
      <div><Sidebar/></div>
      <div className='container mt-2'>
          <div className='row d-flex justify-content-center align-items-center ms-2'>
              <div style={{ background: '#FDF0D1',height:'350px',width:'600px'}} className='p-4 rounded col-md-6 '>
                <Bar
                  data={state}
                  options={{
                    title: {
                      display: true,
                      fontSize: 30,
                    },
                    legend: {
                      display: true,
                      position: 'right',
                    },
                    
                  }}
                  width={chartWidth}
                  height={chartHeight}
                />
              </div>
              <div className='p-4 rounded col-md-6 ms-4' style={{backgroundColor:'#BFD8AF',height:'350px',width:'360px'}}>
              <Pie
                    data={piestate}
                    options={{
                      title: {
                        display: true,
                        text: 'Employees',
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: 'right',
                      },
                    }}
                  />
              </div>
          </div>
          <div className='row d-flex flex-column'>
          <Line
                data={linestate}
                options={{
                  title: {
                    display: true,
                    text: 'Recipez Views',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
                width={linewidth}
                 height={lineheight}
              />
          </div>
      </div>
    </div>
  )
}

export default Dashboard


  