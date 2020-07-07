import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /*
      리스트 row 
          {
            "WRK_CMPNY_PT" : 0,
            "REQ_DEPT_NM" : null,
            "REQ_DEPT_CD" : "D712",
            "REQ_CMPNY_CD" : "M000",
            "CHECK_STATUS" : "불합리",
            "CHECK_DT" : 1591023600000,
            "REQ_CMPNY_PT" : 37,
            "REQ_CMPNY_NM" : "MAGNACHIP반도체",
            "WORK_NO" : "WN20030707007",
            "WRK_CMPNY_NM" : "삼흥기업주식회사",
            "WRK_CMPNY_CD" : "111300",
            "WCATEGORY" : "일반위험작업"
          }
  */

  render() {
    const { dataList } = this.props;

    const columns = [
      { title: '작업번호', width: { wpx: 200 }, style: { font: { sz: '' } } },
      { title: '업체명', width: { wpx: 300 }, style: { font: { sz: '' } } },
      { title: '벌점', width: { wpx: 50 }, style: { font: { sz: '' } } },
      { title: '발주사', width: { wpx: 300 }, style: { font: { sz: '' } } },
      { title: '팀명', width: { wpx: 200 }, style: { font: { sz: '' } } },
      { title: '벌점', width: { wpx: 50 }, style: { font: { sz: '' } } },
      { title: '주작업', width: { wpx: 110 }, style: { font: { sz: '' } } },
      { title: '점검일', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '점검결과', width: { wpx: 80 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'WORK_NO', style: { font: { sz: '12' } } },
      { field: 'WRK_CMPNY_NM', style: { font: { sz: '12' } } },
      { field: 'WRK_CMPNY_PT', style: { font: { sz: '12' } } },
      { field: 'REQ_CMPNY_NM', style: { font: { sz: '12' } } },
      { field: 'REQ_DEPT_NM', style: { font: { sz: '12' } } },
      { field: 'REQ_CMPNY_PT', style: { font: { sz: '12' } } },
      { field: 'WCATEGORY', style: { font: { sz: '12' } } },
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
        listData={dataList}
      />
    );
  }
}

Excel.propTypes = {
  dataList: PropTypes.array,
};

export default Excel;
