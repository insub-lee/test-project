import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataList, wrkCmpnyNm } = this.props;

    const columns = [
      { title: '성명', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '생년월일', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '핸드폰', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '긴급연락처', width: { wpx: 120 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'workerNm', style: { font: { sz: '12' } } },
      { field: 'workerSsn', style: { font: { sz: '12' } } },
      { field: 'mTel', style: { font: { sz: '12' } } },
      { field: 'tel', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName={wrkCmpnyNm === '' ? 'N/A_작업자' : `${wrkCmpnyNm}_작업자`}
        className="workerExcelBtn"
        btnText="엑셀받기"
        btnSize="btn-sm"
        sheetName={wrkCmpnyNm === '' ? 'N/A' : wrkCmpnyNm}
        columns={columns}
        fields={fields}
        listData={dataList}
      />
    );
  }
}

Excel.propTypes = {
  wrkCmpnyNm: PropTypes.string,
  dataList: PropTypes.array,
};

export default Excel;
