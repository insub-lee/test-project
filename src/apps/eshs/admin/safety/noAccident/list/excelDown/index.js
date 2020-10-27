import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listData } = this.props;
    const columns = [
      { title: '연도-월', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '구미', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '청주', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '서울', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '합계', width: { wpx: 100 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'WORK_MONTH', style: { font: { sz: '12' } } },
      { field: 'WORK_HOURS_1', style: { font: { sz: '12' } } },
      { field: 'WORK_HOURS_2', style: { font: { sz: '12' } } },
      { field: 'WORK_HOURS_3', style: { font: { sz: '12' } } },
      { field: 'TOTAL_HOURS', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName="무재해시간(월별)"
        btnText="엑셀받기"
        btnSize="btn-sm"
        columns={columns}
        fields={fields}
        listData={listData}
      />
    );
  }
}

Excel.propTypes = {
  listData: PropTypes.array,
};

export default Excel;
