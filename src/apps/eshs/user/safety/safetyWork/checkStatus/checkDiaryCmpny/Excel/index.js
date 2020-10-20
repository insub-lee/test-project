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
        "WLOC" : "H2 Trailer 저장소",
        "CHECK_STATUS" : "양호",
        "TIME" : "08시 ~ 18시",
        "WORK_DESC" : "H2 Trailer 입출고",
        "WRK_CMPNY_NM" : "(주)덕양(2018년)",
        "DGUBUN" : "구미기타",
        "FROM_DT" : "2018-10-01",
        "WORK_NO" : "WN20180928014",
        "wrk_cmpny_cd" : "H01227",
        "WORKER_CNT" : 1,
        "CHECK_CONTENT" : "",
        "REQ_EMP_NM" : "유저명"",
        "WCATEGORY" : "일반위험작업"
      }
  */

  render() {
    const { listData } = this.props;

    const columns = [
      { title: '작업번호', width: { wpx: 200 }, style: { font: { sz: '' } } },
      { title: '업체명', width: { wpx: 300 }, style: { font: { sz: '' } } },
      { title: '담당ENG', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업동', width: { wpx: 300 }, style: { font: { sz: '' } } },
      { title: '장소', width: { wpx: 200 }, style: { font: { sz: '' } } },
      { title: '주작업', width: { wpx: 80 }, style: { font: { sz: '' } } },
      { title: '작업일', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업시간', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: '작업내용', width: { wpx: 300 }, style: { font: { sz: '' } } },
      { title: '작업인원', width: { wpx: 80 }, style: { font: { sz: '' } } },
      { title: '지적내용/조치사항', width: { wpx: 500 }, style: { font: { sz: '' } } },
      { title: '상태', width: { wpx: 500 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'WORK_NO', style: { font: { sz: '12' } } },
      { field: 'WRK_CMPNY_NM', style: { font: { sz: '12' } } },
      { field: 'REQ_EMP_NM', style: { font: { sz: '12' } } },
      { field: 'DGUBUN', style: { font: { sz: '12' } } },
      { field: 'WLOC', style: { font: { sz: '12' } } },
      { field: 'WCATEGORY', style: { font: { sz: '12' } } },
      { field: 'FROM_DT', style: { font: { sz: '12' } } },
      { field: 'TIME', style: { font: { sz: '12' } } },
      { field: 'WORK_DESC', style: { font: { sz: '12' } } },
      { field: 'WORKER_CNT', style: { font: { sz: '12' } } },
      { field: 'CHECK_CONTENT', style: { font: { sz: '12' } } },
      { field: 'CHECK_STATUS', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName="업체별 지적현황"
        btnText="엑셀받기"
        btnSize="btn-sm"
        sheetName="지적현황"
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
