import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setExcelData = listData => {
    const setList = listData.map(item => {
      if (item.CMPNY_TYPE === 'REQ') {
        return {
          ...item,
          REQ_DEPT_NM: item.CMPNY_NM,
        };
      }
      return {
        ...item,
        WRK_CMPNY_NM: item.CMPNY_NM,
      };
    });
    return setList;
  };

  render() {
    const { dataList } = this.props;

    const columns = [
      { title: '작업번호', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '업체명', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '부서(팀)', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '담당자', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업내용', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업내 벌점', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '기간내 벌점', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '연도', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '연누적벌점', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '점검일', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '점검결과', width: { wpx: 100 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'WORK_NO', style: { font: { sz: '12' } } },
      { field: 'WRK_CMPNY_NM', style: { font: { sz: '12' } } },
      { field: 'REQ_DEPT_NM', style: { font: { sz: '12' } } },
      { field: 'REQ_EMP_NM', style: { font: { sz: '12' } } },
      { field: 'WORK_DESC', style: { font: { sz: '12' } } },
      { field: 'PANALTY', style: { font: { sz: '12' } } },
      { field: 'SEARCH_PANALTY', style: { font: { sz: '12' } } },
      { field: 'YEAR_INFO', style: { font: { sz: '12' } } },
      { field: 'YEAR_PANALTY', style: { font: { sz: '12' } } },
      { field: 'CHECK_DT', style: { font: { sz: '12' } } },
      { field: 'CHECK_STATUS', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName="안전작업 점검 현황"
        btnText="엑셀받기"
        btnSize="btn-sm"
        sheetName="점검현황"
        columns={columns}
        fields={fields}
        listData={this.setExcelData(dataList)}
      />
    );
  }
}

Excel.propTypes = {
  dataList: PropTypes.array,
};

export default Excel;
