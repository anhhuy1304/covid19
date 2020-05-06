import React from 'react';
import RoomIcon from '@material-ui/icons/Room';
import TimelineIcon from '@material-ui/icons/Timeline';
import IconButton from '@material-ui/core/IconButton';

import { Link } from 'react-router-dom';


const Header = () => {
  return (<div className="chart-monitor">
    <div className="col-12 col-lg-12 col-xl-12">
      <div className="panel">
        <div className="panel-body" style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', margin: '20px' }}>
          <IconButton style={{  borderRadius: '0', padding:'0 5px' }} variant="contained" color="primary" onClick={() => {
          }}>
            <Link to="/covid19/map" className="linktag"><RoomIcon></RoomIcon></Link>
          </IconButton>
          <IconButton style={{   borderRadius: '0', padding:'0 5px' }} variant="contained" color="primary" onClick={() => {
          }}>
            <Link to="/covid19/stats" className="linktag"><TimelineIcon></TimelineIcon></Link>
          </IconButton>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Header;