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
      { title: '코드', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '코드명', width: { wpx: 250 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '비고', width: { wpx: 120 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '상태', width: { wpx: 50 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: 'Level', width: { wpx: 50 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '경로', width: { wpx: 300 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
    ];

    const fields = [
      { field: 'CODE', style: { font: { sz: '12' } } },
      { field: 'NAME_KOR', style: { font: { sz: '12' } } },
      { field: 'DESCIPTION', style: { font: { sz: '12' } } },
      { field: 'USE_YN', style: { font: { sz: '12' } } },
      { field: 'LVL', style: { font: { sz: '12' } } },
      { field: 'FULLPATH', style: { font: { sz: '12' } } },
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
      />
    );
  }
}

Excel.propTypes = {
  excelNm: PropTypes.string,
  dataList: PropTypes.array,
};

export default Excel;
