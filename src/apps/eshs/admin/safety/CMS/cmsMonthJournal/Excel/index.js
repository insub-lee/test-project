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
      { title: '분류2', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '분류3', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '총 대응건수', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '점검 수량', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: 'R', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: 'C-1', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: 'FAB', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '가스 창고', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '약품 공급실', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '가스 공급실', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '기타', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '날짜', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
    ];

    const fields = [
      { field: 'CLASSIFICATION_PATH', style: { font: { sz: '12' } } },
      { field: 'CLASSIFICATION_NM', style: { font: { sz: '12' } } },
      { field: 'TOTAL', style: { font: { sz: '12' } } },
      { field: 'WEIGHT', style: { font: { sz: '12' } } },
      { field: 'R', style: { font: { sz: '12' } } },
      { field: 'C_2', style: { font: { sz: '12' } } },
      { field: 'FAB', style: { font: { sz: '12' } } },
      { field: 'GAS_WARHOUSE', style: { font: { sz: '12' } } },
      { field: 'MEDICAL_SUPPLY', style: { font: { sz: '12' } } },
      { field: 'GAS_SUPPLY', style: { font: { sz: '12' } } },
      { field: 'OTHER', style: { font: { sz: '12' } } },
      { field: 'JOURNAL_DATE', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName={`${excelNm}_${Moment().format('YYYY_MM_DD')}`}
        btnSize="btn-sm"
        btnText="엑셀받기"
        sheetName={excelNm}
        columns={columns}
        fields={fields}
        listData={dataList}
      />
    );
  }
}

Excel.propTypes = {
  excelNm: PropTypes.string,
  dataList: PropTypes.array,
};

export default Excel;
