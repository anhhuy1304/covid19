import React, { useEffect, useState } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PatientInfo from "./PatientInfo";
import ListPatient from "./ListPatient";
import Container from "react-bootstrap/Container";
import CovidMap from "./CovidMap";
import SeekBar from "./SeekBar";
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const CovidDashboard = (props) => {
    const startDate = "2019-12-08T00:00:00"
    const [currentPatient, setCurrentPatient] = useState();
    const [currentListPatient, setcurrentListPatient] = useState();
    const [patients, setPatients] = useState([]);
    const [reft, setReft] = useState([]);
    const [valueSeekBar, setValueSeekBar] = useState(startDate)
    const [isPlay, setIsPlay] = useState(false)
    const patientMarkerClickedHandler = (patient) => {
        setCurrentPatient(patient);
        reft[patients.indexOf(patient)].scrollIntoView({ behavior: "smooth" })

    }
    const choosePatient = (patient) => {
        setCurrentPatient(patient);
    }
    const handleChangeDate = (event, newValue) => {
        const selectedDate = moment(newValue).format('YYYY-MM-DDTHH:mm:ss');
        if (patients) {
            setcurrentListPatient([...patients].filter(item => (item.verifyDate <= selectedDate && item.verifyDate >= startDate)))
            if (selectedDate !== valueSeekBar) {
                setValueSeekBar(selectedDate);
            }
        }
    }

    useEffect(() => {
        fetch("https://cors-anywhere.herokuapp.com/https://maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then(res => res.json())
            .then(
                (result) => {
                    setPatients(result.data.sort((a, b) => (a.verifyDate > b.verifyDate) ? -1 : ((a.verifyDate < b.verifyDate) ? 1 : 0)));
                    setReft(new Array(result.data.length).fill(React.createRef()));
                },
                (error) => {
                }
            )
    }, [])

    useEffect(() => {
        let timer = null;
        if (isPlay) {
            timer = setTimeout(() => {
                const epoch = moment(valueSeekBar, moment.ISO_8601).valueOf();
                setValueSeekBar(moment(epoch + 86400000).format('YYYY-MM-DDTHH:mm:ss'))
                setcurrentListPatient([...patients].filter(item => (item.verifyDate <= moment(epoch).format('YYYY-MM-DDTHH:mm:ss') && item.verifyDate >= startDate)))
            }, 200);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [valueSeekBar, isPlay]);
    return <Container fluid>

        <div className="chart-monitor row" style={{margin:'0 20px'}} >
            <div id="chart-line" style={{paddingLeft:0}} className="col-12 col-lg-8 col-xl-8">
                <div className="panel">
                    <div className="panel-body" style={{ minHeight: '400px' }}>
                        <CovidMap currentPatient={currentPatient} patients={currentListPatient} onPatientMarkerClicked={patientMarkerClickedHandler} />
                    </div>
                </div>
            </div>

            <div id="chart-pie" className="col-12 col-lg-4 col-xl-4" style={{paddingRight:0, height: '400px'}}>
                <div className="row quickInfo" style={{paddingBottom:'10px'}}>
                    <div className="panel" style={{height:'100%'}}>
                        <div className="panel-body">
                            <h3 style={{ textAlign: "center" }}>List patients</h3>
                            <Row style={{ margin: '0', backgroundColor: '#d0d0d0' }}>
                                <Col xs={6} style={{ textAlign: 'center' }}>Number patient</Col>
                                <Col xs={6} style={{ textAlign: 'center' }} >Date</Col>
                            </Row>
                            {(reft) && <ListPatient patients={currentListPatient} reft={reft} choosePatient={choosePatient} currentPatient={currentPatient} />}
                        </div>
                    </div>
                </div>
                <div className="row quickInfo" style={{paddingTop:'10px'}}>
                    <div className="panel" style={{ paddingLeft: '0', paddingRight: '0' }} >
                        <div className="panel-body " style={{ padding: '0' }}>
                            <h3 style={{ textAlign: "center" }}>Patient Infomation</h3>
                            {currentPatient &&
                                <PatientInfo name={currentPatient.name} style={{ borderBottom: '3px solid #333', height: '50%' }} address={currentPatient.address} note={currentPatient.note}
                                    verifyDate={currentPatient.verifyDate} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div className="chart-monitor" style={{margin:'15px 20px'}}>
            <div className="col-12 col-lg-12 col-xl-12" style={{paddingRight:0, paddingLeft:0}}>
                <div className="panel">
                    <div className="panel-body">
                        <div style={{minHeight: '30px'}}>
                            {
                                patients[0] && <SeekBar timeFrom={startDate} timeTo={patients[0].verifyDate} valueSeekBar={valueSeekBar} handleChange={handleChangeDate}></SeekBar>
                            }
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton style={{ margin: '10px', borderRadius: '25% 25%' }} variant="contained" color="primary" onClick={() => { setIsPlay(!isPlay); }}>
                                {isPlay ? <PlayArrowIcon></PlayArrowIcon> : <PauseIcon></PauseIcon>}
                            </IconButton>
                            <IconButton style={{ margin: '10px', borderRadius: '25% 25%' }} variant="contained" color="primary" onClick={() => {
                                setIsPlay(false);
                                setValueSeekBar(startDate)
                            }}>
                                <RotateLeftIcon></RotateLeftIcon>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Container>
};

export default CovidDashboard;