import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NoteRepairWrapper from './style';

class repairForm extends PureComponent {
  /* constructor(props) {
    super();

    console.log(props);
  } */

  render() {
    const { Item } = this.props;

    let repairDataList = [];
    if (Item.listSize > 0) {
      repairDataList = Item.ITEM_LIST.map(repairItem => (
        <tr>
          <td>{repairItem.OTEIL_NM}</td>
          <td>{repairItem.FECOD_NM}</td>
          <td>{repairItem.URCOD_NM}</td>
          <td>{repairItem.MNCOD_NM }</td>
          <td>{repairItem.RESULT}</td>
          <td>{repairItem.ACTION_BY}</td>
        </tr>
      ));
    }

    return (
      <div className="ant-table">
        <NoteRepairWrapper>
          <colgroup>
            <col width="15%" />
            <col width="15%" />
            <col width="15%" />
            <col width="15%" />
            <col width="25%" />
            <col width="15%" />
          </colgroup>
          <tbody>
            <tr>
              <th>Unit</th>
              <th>유형/현상</th>
              <th>원인</th>
              <th>원인부품(군)</th>
              <th>조치 및 결과</th>
              <th>조치자</th>
            </tr>
            { repairDataList }
          </tbody>
        </NoteRepairWrapper>
      </div>
    );
  }
}

repairForm.propTypes = {
  Item: PropTypes.array,
};

repairForm.defaultProps = {
  Item: {},
};

export default repairForm;
