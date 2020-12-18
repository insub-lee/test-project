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
      let sttlmntStatus = '결재정보없음';
      switch (item.STTLMNT_STATUS) {
        case '0':
          sttlmntStatus = '신청저장';
          break;
        case '1':
          sttlmntStatus = '신청상신';
          break;
        case '2A':
          sttlmntStatus = '신청승인';
          break;
        case '2F':
          sttlmntStatus = '신청부결';
          break;
        case '3':
          sttlmntStatus = '허가상신';
          break;
        case '4A':
          sttlmntStatus = '허가승인';
          break;
        case '4F':
          sttlmntStatus = '허가부결';
          break;
        default:
          break;
      }
      return {
        ...item,
        STTLMNT_STATUS: sttlmntStatus,
      };
    });

    return setList;
  };

  render() {
    const { dataList } = this.props;

    const columns = [
      { title: '작업번호', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '신청상태', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업상태', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '주작업', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '보충작업', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '주관팀', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '담당자', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '업체', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '감독자', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업일', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '시작시간', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '종료시간', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업명', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업동', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업장소', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업인원', width: { wpx: 100 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'WORK_NO', style: { font: { sz: '12' } } },
      { field: 'STTLMNT_STATUS', style: { font: { sz: '12' } } },
      { field: 'WORK_STATUS', style: { font: { sz: '12' } } },
      { field: 'WCATEGORY', style: { font: { sz: '12' } } },
      { field: 'SUB_WCATEGORY', style: { font: { sz: '12' } } },
      { field: 'REQ_DEPT_NM', style: { font: { sz: '12' } } },
      { field: 'REQ_EMP_NM', style: { font: { sz: '12' } } },
      { field: 'WRK_CMPNY_NM', style: { font: { sz: '12' } } },
      { field: 'CHARGE_WORKER_NM', style: { font: { sz: '12' } } },
      { field: 'FROM_DT', style: { font: { sz: '12' } } },
      { field: 'FROM_TIME', style: { font: { sz: '12' } } },
      { field: 'TO_TIME', style: { font: { sz: '12' } } },
      { field: 'TITLE', style: { font: { sz: '12' } } },
      { field: 'DGUBUN', style: { font: { sz: '12' } } },
      { field: 'WLOC', style: { font: { sz: '12' } } },
      { field: 'WORKERS', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName="안전작업 리스트"
        className="workerExcelBtn"
        btnText="엑셀받기"
        btnSize="btn-sm"
        sheetName="안전작업"
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
