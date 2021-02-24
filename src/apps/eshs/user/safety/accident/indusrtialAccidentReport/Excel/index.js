import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

import Moment from 'moment';

Moment.locale('ko');

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataList, excelNm } = this.props;

    const columns = [
      { title: '업체명', width: { wpx: 200 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      {
        title: '사업자등록번호',
        width: { wpx: 200 },
        style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } },
      },
      {
        title: '사업장관리번호',
        width: { wpx: 200 },
        style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } },
      },
      { title: '사업개시번호', width: { wpx: 200 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '근무지역', width: { wpx: 200 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '근로자수', width: { wpx: 200 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      {
        title: '사고재해자 수 (사망포함)',
        width: { wpx: 200 },
        style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } },
      },
      {
        title: '질병재해자 수 (사망포함)',
        width: { wpx: 200 },
        style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } },
      },
      {
        title: '사고사망자 수',
        width: { wpx: 200 },
        style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } },
      },
      {
        title: '질병사망자 수',
        width: { wpx: 200 },
        style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } },
      },
    ];

    const fields = [
      { field: 'WRK_CMPNY_NM', style: { font: { sz: '12' } } },
      { field: 'BIZ_REG_NO', style: { font: { sz: '12' } } },
      { field: 'BIZ_POB_NO', style: { font: { sz: '12' } } },
      { field: 'BIZ_COM_NO', style: { font: { sz: '12' } } },
      { field: 'WORK_AREA_CD', style: { font: { sz: '12' } } },
      { field: 'WORK_PEOPLE', style: { font: { sz: '12' } } },
      { field: 'CAL_ACCIDENT', style: { font: { sz: '12' } } },
      { field: 'DIS_ACCIDENT', style: { font: { sz: '12' } } },
      { field: 'CAL_DEATH', style: { font: { sz: '12' } } },
      { field: 'DIS_DEATH', style: { font: { sz: '12' } } },
    ];

    const decodeListData = dataList.map(item => ({
      ...item,
      WORK_AREA_CD: item.WORK_AREA_CD === 'CJ' ? '청주' : '구미',
    }));

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName={`${excelNm}_${Moment().format('YYYY_MM_DD')}`}
        className="testClassName"
        btnText="엑셀받기"
        sheetName={excelNm}
        columns={columns}
        fields={fields}
        listData={decodeListData}
      />
    );
  }
}

Excel.propTypes = {
  excelNm: PropTypes.string,
  dataList: PropTypes.array,
};

export default Excel;
