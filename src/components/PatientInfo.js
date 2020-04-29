import React, {useEffect, useState} from 'react';

const PatientInfo = ({name, address, note, verifyDate}) => {
    return <ul style={{paddingRight:'20px'}}>
        <li ><b>Name: </b> {name}</li>
        <li><b>Address: </b> {address}</li>
        <li><b>Note: </b> {note}</li>
        <li><b>Verify Date:  </b> {verifyDate}</li>
    </ul>
};

export default PatientInfo;