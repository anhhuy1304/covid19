import React, { useEffect } from 'react';
import Container from "react-bootstrap/Container";
import ChartVN from "./ChartVN"
import ChartWorld from "./ChartWorld"


const ChartDashboard = (props) => {
  useEffect(() => {
    fetch("https://cors-anywhere.herokuapp.com/https://td.fpt.ai/corona/corona-total.json")
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result)
        },
        (error) => {
        }
      )
  }, [])

  return <Container fluid style={{ padding: 0 }}>

    <div className="chart-monitor row" style={{margin:'0 20px'}} >
      <div className="col-12 col-lg-6 col-xl-6" style={{ display: 'flex' }}>
        <div className="panel" style={{ width: '100%' }}>
          <div className="panel-body" style={{ width: '100%', minHeight: '400px' }}>
            <ChartVN />
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6 col-xl-6" style={{ display: 'flex' }}>
        <div className="panel" style={{ width: '100%' }}>
          <div className="panel-body" style={{ width: '100%', minHeight: '400px' }}>
            <ChartWorld />

          </div>
        </div>
      </div>
    </div>

  </Container>
};

export default ChartDashboard;