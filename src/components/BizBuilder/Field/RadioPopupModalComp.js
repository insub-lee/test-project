import React from 'react';
import { Checkbox, Radio } from 'antd';

const RadioPopupModal = ({ onChange, onChecked, formData }) => {
  const options = [
    { label: 'CE', value: 'CE' },
    { label: 'DISPLAY', value: 'DISPLAY' },
    { label: 'POWER', value: 'POWER' },
    { label: 'FSG', value: 'FSG' },
  ];

  return (
    <div>
      <div style={{ float: 'left' }}>Application Division</div>
      <div>
        <Checkbox.Group options={options} onChange={onChange} value={formData.DIVISION.split(',')} />
      </div>
      <hr />
      <div style={{ float: 'left' }}>
        <p>Registration Place</p>
        (Select 1 item)
      </div>
      <div>
        <Radio.Group onChange={onChecked} value={formData.PLACE}>
          <Radio value="Full-Set">Full-Set</Radio>
          <Radio value="Updating">Updating</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export default RadioPopupModal;
