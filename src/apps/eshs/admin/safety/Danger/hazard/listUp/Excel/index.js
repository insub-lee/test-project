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
      { title: '부서', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '공정(장소)', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '세부공정', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '장비(설비)', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '위험요인', width: { wpx: 250 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '사고의 발생원인', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '사고의 발생유형', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: 'R/A 실시여부', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
    ];

    const fields = [
      { field: 'SDIV_ID', style: { font: { sz: '12' } } },
      { field: 'PLACE_ID', style: { font: { sz: '12' } } },
      { field: 'PROCESS_ID', style: { font: { sz: '12' } } },
      { field: 'EQUIP_ID', style: { font: { sz: '12' } } },
      { field: 'WORK_NM', style: { font: { sz: '12' } } },
      { field: 'AOC_ID', style: { font: { sz: '12' } } },
      { field: 'AOT_ID', style: { font: { sz: '12' } } },
      { field: 'RA_YN', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName={`${excelNm}_${Moment().format('YYYY_MM_DD')}`}
        className="testClassName"
        btnText="엑셀받기"
        sheetName={excelNm}
        columns={columns}
        fields={fields}
        listData={dataList}
        btnSize="btn-sm"
      />
    );
  }
}

Excel.propTypes = {
  excelNm: PropTypes.string,
  dataList: PropTypes.array,
};

export default Excel;
