import React, {useEffect, useState} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const CovidMap = ({onPatientMarkerClicked, patients,currentPatient}) => {
    return <Map style={{height:window.innerHeight*0.8}} center={currentPatient ?[currentPatient.lat, currentPatient.lng]: [10.762887, 106.6800684]} zoom={13}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png   "
        />
        {patients && patients.map((patient,index) => <Marker key={'marker'+index} position={[patient.lat, patient.lng]} onClick={() => {onPatientMarkerClicked(patient)}}>
            <Popup>
                <ul key={'ul'+index}>
                    <li key={'li'+index+'name'}>Name: {patient.name}</li>
                    <li key={'li'+index+'address'}>Address: {patient.address}</li>
                    <li key={'li'+index+'note'}>Note: {patient.note}</li>
                    <li key={'li'+index+'verify'}>Verify date: {patient.verifyDate}</li>
                </ul>
            </Popup>
        </Marker>)}
    </Map>;
};

export default CovidMap;
