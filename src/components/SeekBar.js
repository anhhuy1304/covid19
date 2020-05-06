import React from 'react';
import Slider from '@material-ui/core/Slider';
import moment from 'moment'
import Tooltip from '@material-ui/core/Tooltip';

const SeekBar = ({timeFrom, timeTo,valueSeekBar, handleChange}) => {
  const min = moment(timeFrom,moment.ISO_8601).valueOf();
  const max =  moment(timeTo,moment.ISO_8601).valueOf();
  const marks = [
    {
      value:min
    },
    {
      value: max
    },
  ];

  const valueLabelComponent = (props)=>{
    const { children, open, value } = props;
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  const valueLabelFormat= (value)=> {
    return moment(value).format('DD/MM/YYYY')
  }
    return <div style={{display:'flex', justifyContent:'center'}}>
      <Slider        style={{width:'70%'}}
                     value={ moment(valueSeekBar,moment.ISO_8601).valueOf()}
                     valueLabelFormat={valueLabelFormat}
                     ValueLabelComponent={valueLabelComponent}
                     aria-labelledby="discrete-slider-restrict"
                     step={86400000}
                     valueLabelDisplay="on"
                     max={max}
                     min={min}
                     onChange={handleChange}
                     marks={marks}/>
      </div>
};

export default SeekBar;