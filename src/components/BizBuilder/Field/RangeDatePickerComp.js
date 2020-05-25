import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
class RangeDatePickerComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnChange = dateStrings => {
    const { sagaKey: id, COL_DATA, COMP_FIELD, changeFormData } = this.props;
    const dateStr = '';
    dateStrings.map(item => dateStr.concat(item));
    console.debug(dateStr);
  };

  render() {
    const { handleOnChange } = this;
    const { visible } = this.props;

    if (!visible) {
      return null;
    }
    return (
      <>
        <div>
          <RangePicker onChange={(dates, dateStrings) => handleOnChange(dateStrings)} />
        </div>
      </>
    );
  }
}

RangeDatePickerComp.propTypes = {
  sagaKey: PropTypes.string,
  COL_DATA: PropTypes.string,
  COMP_FIELD: PropTypes.string,
  changeFormData: PropTypes.func,
  visible: PropTypes.bool,
};

export default RangeDatePickerComp;
