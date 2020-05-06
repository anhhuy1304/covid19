import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

const regexDay = /\d*\/\d*/;
const ChartVN = ({refChart, field}) => {
  const [dataInfection, setDataInfection] = useState([]);
  const [dataMaybeInfection, setDataMaybeInfection] = useState([]);
  const [dataCured, setDataCured] = useState([]);
  // const chartHeight = (window.innerHeight) / 3;
  // const chartWidth = (window.innerWidth/12*8.5);
  
  useEffect(() => {
    fetch("https://cors-anywhere.herokuapp.com/https://td.fpt.ai/corona/corona-chart-vn.json")
        .then(res => res.json())
        .then(
            (result) => {
              if(result){
                let dataInfection = [];
                let dataMaybeInfection = [];
                let dataCured = [];
                Object.keys(result).map(day=>{
                  const date = (regexDay.exec(day))[0];
                  const ts = moment(date,'D/M').valueOf()+24*60*60*1000; //plus 1 day 
                  dataInfection.push({x:ts, y: result[day][0]});
                  dataMaybeInfection.push({x:ts, y: result[day][1]});
                  dataCured.push({x:ts, y: result[day][2]});
                });
                console.log(result);
                dataInfection.sort((a,b)=>a.x> b.x? 1:-1)
                dataMaybeInfection.sort((a,b)=>a.x> b.x? 1:-1)
                dataCured.sort((a,b)=>a.x> b.x? 1:-1)
                setDataInfection(dataInfection);
                setDataMaybeInfection(dataMaybeInfection);
                setDataCured(dataCured);
              }
            },
            (error) => {
            }
        )
}, [])


  return <div className="chart">
    <HighchartsReact highcharts={Highcharts}
      options={{
        chart: {
          animation: false,
          type: 'spline',
          // height: chartHeight + "px"
        },
        title: {
          text: 'Covid tại Việt Nam'
        },
        xAxis: {
          gridLineWidth: 1,
          dateTimeLabelFormats: {
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%e. %b',
              week: '%e. %b',
              month: "%b '%y",
              year: '%Y'
          },
          type: 'datetime',
          crosshair: true,
        },
        yAxis: {
          title: {
            text: 'Số Người'
          },
          min: 0
        },
        legend: {
          layout: 'horizontal',
          align: 'center',
          enabled: true,
          // itemDistance:  (chartWidth * 0.9 - 80 * 7) / 7,
        },
        plotOptions: {
          series: {
            marker: {
              enabled: false,
              radius: 3,
            },
            events: {
            },
            lineWidth: 1
          }
        },
        turboThreshold: 0,
        tooltip: {
          positioner: function () {
            return {
              x: this.chart.plotLeft,
              y: this.chart.plotTop - 30
            };
          },
          shadow: false,
          borderWidth: 0,
          backgroundColor: 'rgba(0,0,0,0.1)',
          shared: true,
        },
        series: [
          { name: 'Lây nhiễm', id: '0', "turboThreshold": 0, data:dataInfection, visible: true},
          { name: 'Nghi nhiễm', id: '1', "turboThreshold": 0, data:dataMaybeInfection,visible: true},
          { name: 'Khỏi', id: '2', "turboThreshold": 0, data:dataCured,visible: true}
        ]
      }}
    />
  </div>
}

export default ChartVN;