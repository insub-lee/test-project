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
      {
        title: '종류',
        width: { wpx: 200 },
        style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } },
        children: {
          title: '(분류번호)',
          width: { wpx: 200 },
          style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } },
          children: { title: '(회사명)', width: { wpx: 200 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
        },
      },
      { title: '배출량(톤)', width: { wpx: 200 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '성상', width: { wpx: 200 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '처리방법', width: { wpx: 200 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '처리방법 코드', width: { wpx: 200 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '처리자 구분', width: { wpx: 200 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '처리자 구분 코드', width: { wpx: 200 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
      { title: '처리업체', width: { wpx: 200 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '' } } },
    ];

    const fields = [
      { field: 'WASTE_KIND_NM', style: { font: { sz: '12' } } },
      { field: 'WEIGH', style: { font: { sz: '12' } } },
      { field: 'SHAPE_NM', style: { font: { sz: '12' } } },
      { field: 'CONSIGN_METHOD_NM', style: { font: { sz: '12' } } },
      { field: 'CONSIGN_METHOD_CD', style: { font: { sz: '12' } } },
      { field: 'DISP_VENDOR_GUBUN_NM', style: { font: { sz: '12' } } },
      { field: 'DISP_VENDOR_GUBUN_CD', style: { font: { sz: '12' } } },
      { field: 'DISP_VENDOR_NM', style: { font: { sz: '12' } } },
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
