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
        WORKER_NM: "홍길동"
        WORKER_SSN: "202001"
        WORKER_SEQ: 17916
        TEL: "2222"
        M_TEL: "11111111"
        EDU_NO: "ED20201007002"
        EDU_DT: "2020-10-07"
        EDU_LOC: "1111"
        LECT_CMPNY_CD: "M000"
        LECT_CMPNY_NM: "MAGNACHIP반도체"
        LECT_EMP_NM: "박태우"
        LECT_EMP_NO: "112007"
        OUT_LECT_NM: ""
        OUT_LECT_SSN: ""
        EDU_YEAR: "2020"
        WORK_NO: ""
        WRK_CMPNY_CD: "H01678"
        WRK_CMPNY_NM: "참소리미디어(2020년)"
      }
  */

  render() {
    const { listData } = this.props;

    const columns = [
      { title: '성명', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '생년월일', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '연락처', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '휴대폰', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '교육번호', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '교육일자', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '교육장소', width: { wpx: 140 }, style: { font: { sz: '' } } },
      { title: '내부강사 회사명', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: '내부강사 성명', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: '외부강사 생년월일', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: '외부강사 성명', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: '연도', width: { wpx: 80 }, style: { font: { sz: '' } } },
      { title: '작업번호', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '업체명', width: { wpx: 150 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'WORKER_NM', style: { font: { sz: '12' } } },
      { field: 'WORKER_SSN', style: { font: { sz: '12' } } },
      { field: 'TEL', style: { font: { sz: '12' } } },
      { field: 'M_TEL', style: { font: { sz: '12' } } },
      { field: 'EDU_NO', style: { font: { sz: '12' } } },
      { field: 'EDU_DT', style: { font: { sz: '12' } } },
      { field: 'EDU_LOC', style: { font: { sz: '12' } } },
      { field: 'LECT_CMPNY_NM', style: { font: { sz: '12' } } },
      { field: 'LECT_EMP_NM', style: { font: { sz: '12' } } },
      { field: 'OUT_LECT_SSN', style: { font: { sz: '12' } } },
      { field: 'OUT_LECT_NM', style: { font: { sz: '12' } } },
      { field: 'EDU_YEAR', style: { font: { sz: '12' } } },
      { field: 'WORK_NO', style: { font: { sz: '12' } } },
      { field: 'WRK_CMPNY_NM', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName="안전교육 이수현황"
        btnText="엑셀받기"
        btnSize="btn-sm"
        sheetName="이수현황"
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
