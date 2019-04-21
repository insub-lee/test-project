import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NoteTechSafeWrapper from '../repair/style';

class techSafeForm extends PureComponent {

  techSafePop = (e) => {
    const data = e.target.textContent;
    window.open(`/sm/informNote/pop/InformNoteTechSafeDetail/${data}`, 'utilityInformNoteDetailForm', 'width=1200,height=800');
  }
  render() {
    const { Item } = this.props;

    let techSafeDataList = [];
    if (Item.listTechSize > 0) {
      techSafeDataList = Item.ITEM_TECH_LIST.map(techSafeItem => (
        <tr>
          <td>{techSafeItem.REQ_ITEM_NM}</td>
          <td>{techSafeItem.REQ_TIME}</td>
          <td>{techSafeItem.REQ_STATUS_NM}</td>
          <td>{techSafeItem.REQ_ENDTIME}</td>
          <td>{techSafeItem.WORK_TIME}</td>
          <td><span onClick={this.techSafePop} style={{color: 'blue', cursor: 'pointer'}}>{techSafeItem.IN_U_ID}</span></td>
        </tr>
      ));
    }
    return (
      <div className="ant-table">
        <NoteTechSafeWrapper>
          <colgroup>
            <col width="28%" />
            <col width="12%" />
            <col width="13%" />
            <col width="12%" />
            <col width="13%" />
            <col width="22%" />
          </colgroup>
          <tbody>
            <tr>
              <th>요청항목</th>
              <th>Request Time</th>
              <th>Status</th>
              <th>Complete Time</th>
              <th>Work Time</th>
              <th>기술안전 인폼노트</th>
            </tr>
            { techSafeDataList }
          </tbody>
        </NoteTechSafeWrapper>
      </div>
    );
  }
}

techSafeForm.propTypes = {
  Item: PropTypes.object,
};

techSafeForm.defaultProps = {
  Item: {},
};

export default techSafeForm;
