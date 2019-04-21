import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NoteSafetyWrapper from '../repair/style';

class safetyForm extends PureComponent {
  /* constructor(props) {
    super();

    console.log(props);
  } */

  render() {
    const { Item } = this.props;

    let safeWorkDataList = [];
    if (Item.safetyWorkListSize > 0) {
      safeWorkDataList = Item.SAFETYWORK_LIST.map(safeWorkItem => (
        <tr>
          <td>{safeWorkItem.WORK_NO}</td>
          <td>{safeWorkItem.PRMS_PROGRESS_STATUS_NAME}</td>
          <td>{safeWorkItem.WORK_NAME}</td>
          <td>{safeWorkItem.WORK_DD}</td>
          <td>{safeWorkItem.WORK_START_TIME}</td>
          <td>{safeWorkItem.RESP}</td>
          <td>{safeWorkItem.MANGR_NAME}</td>
        </tr>
      ));
    }

    return (
      <div className="ant-table">
        <NoteSafetyWrapper>
          <colgroup>
            <col width="20%" />
            <col width="15%" />
            <col width="20%" />
            <col width="11%" />
            <col width="11%" />
            <col width="12%" />
            <col width="11%" />
          </colgroup>
          <tbody>
            <tr>
              <th>허가서번호</th>
              <th>STATUS</th>
              <th>작업명</th>
              <th>작업일</th>
              <th>작업시간</th>
              <th>담당자</th>
              <th>감독자</th>
            </tr>
            { safeWorkDataList }
          </tbody>
        </NoteSafetyWrapper>
      </div>
    );
  }
}

safetyForm.propTypes = {
  Item: PropTypes.object,
};

safetyForm.defaultProps = {
  Item: {},
};

export default safetyForm;
