import React, {useEffect, useState,useRef} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ListPatient = ({patients, reft,choosePatient,currentPatient }) => {
  return (
    <div  style={{ overflowY: 'scroll', height: '75%', margin:'0', padding:'0 10px'}}>
      {
      patients && 
      patients.map((patient, index) => {
         return  <Row key={"patient"+index} ref={(ref)=>{reft[index] = ref}} style={(currentPatient && currentPatient.name == patient.name)?{'backgroundColor':'#e0e0e0'}:{}} onClick={()=>{choosePatient(patient)}}> 
         <Col key={"patient"+index+patient.name} xs={6} style={{textAlign:'center'}}>{patient.name}</Col>
         <Col key={"patient"+index+patient.verifyDate} xs={6} style={{textAlign:'center'}} >{patient.verifyDate}</Col>
     </Row>
      })}
    </div>
)
};

export default ListPatient;