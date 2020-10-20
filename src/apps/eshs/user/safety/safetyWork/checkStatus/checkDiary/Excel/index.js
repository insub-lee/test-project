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
        "DGUBUN" : "F1동",
        "WLOC" : "F1 기계실",
        "CHECK_TIME" : "",
        "CHECK_EMP_NM" : "점검자명",
        "TIME" : "09시 ~ 17시",
        "WORK_NO" : "WN20190530008",
        "WORK_DESC" : "F1 냉동기 7호기 모터 조립",
        "WRK_CMPNY_NM" : "하이엠솔루텍(주)(구미,2019년)",
        "WORKER_CNT" : 8,
        "CHECK_CONTENT" : "",
        "REQ_EMP_NM" : "담당ENG명",
        "WCATEGORY" : "화기작업"
      }
  */

  render() {
    const { listData } = this.props;

    const columns = [
      { title: '작업번호', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '업체명', width: { wpx: 300 }, style: { font: { sz: '' } } },
      { title: '담당ENG', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업동', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '장소', width: { wpx: 200 }, style: { font: { sz: '' } } },
      { title: '주작업', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업시간', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: '작업내용', width: { wpx: 300 }, style: { font: { sz: '' } } },
      { title: '작업인원', width: { wpx: 80 }, style: { font: { sz: '' } } },
      { title: '점검자', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '점검결과', width: { wpx: 500 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'WORK_NO', style: { font: { sz: '12' } } },
      { field: 'WRK_CMPNY_NM', style: { font: { sz: '12' } } },
      { field: 'REQ_EMP_NM', style: { font: { sz: '12' } } },
      { field: 'DGUBUN', style: { font: { sz: '12' } } },
      { field: 'WLOC', style: { font: { sz: '12' } } },
      { field: 'WCATEGORY', style: { font: { sz: '12' } } },
      { field: 'TIME', style: { font: { sz: '12' } } },
      { field: 'WORK_DESC', style: { font: { sz: '12' } } },
      { field: 'WORKER_CNT', style: { font: { sz: '12' } } },
      { field: 'CHECK_EMP_NM', style: { font: { sz: '12' } } },
      { field: 'CHECK_CONTENT', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName="안전작업 점검일지"
        btnText="엑셀받기"
        btnSize="btn-sm"
        sheetName="점검일지"
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
