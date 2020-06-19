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
      { title: 'Sub 코드', width: { wpx: 80 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '코드명', width: { wpx: 150 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '상태', width: { wpx: 50 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '지역', width: { wpx: 50 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '물질구분', width: { wpx: 50 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '등급', width: { wpx: 50 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '비고', width: { wpx: 600 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
    ];

    const fields = [
      { field: 'MINOR_CD', style: { font: { sz: '12' } } },
      { field: 'CD_NM', style: { font: { sz: '12' } } },
      { field: 'USE_YN', style: { font: { sz: '12' } } },
      { field: 'REF1', style: { font: { sz: '12' } } },
      { field: 'REF2', style: { font: { sz: '12' } } },
      { field: 'REF3', style: { font: { sz: '12' } } },
      { field: 'REMARK', style: { font: { sz: '12' } } },
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
