import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataList, workerNm } = this.props;

    const dataToString = dataList.map(data => ({ ...data, FROM_DT: moment(data.FROM_DT).format('YYYY-MM-DD') }));

    const columns = [
      { title: '지역', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업번호', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업명', width: { wpx: 200 }, style: { font: { sz: '' } } },
      { title: '직책', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '투입일', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '발주사', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '발주팀', width: { wpx: 120 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'SITE', style: { font: { sz: '12' } } },
      { field: 'WORK_NO', style: { font: { sz: '12' } } },
      { field: 'TITLE', style: { font: { sz: '12' } } },
      { field: 'POSITION', style: { font: { sz: '12' } } },
      { field: 'FROM_DT', style: { font: { sz: '12' } } },
      { field: 'REQ_CMPNY_NM', style: { font: { sz: '12' } } },
      { field: 'REQ_DEPT_NM', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName={`${workerNm}_투입현황`}
        className="workerExcelBtn"
        btnText="엑셀받기"
        btnSize="btn-xs"
        sheetName="작업자별작업투입현황"
        columns={columns}
        fields={fields}
        listData={dataToString}
      />
    );
  }
}

Excel.propTypes = {
  workerNm: PropTypes.string,
  dataList: PropTypes.array,
};

export default Excel;
