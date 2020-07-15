import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 연간 평균 사용량 계산
  calcYearUseAvg = record => {
    const {
      MONTH1_AVG,
      MONTH2_AVG,
      MONTH3_AVG,
      MONTH4_AVG,
      MONTH5_AVG,
      MONTH6_AVG,
      MONTH7_AVG,
      MONTH8_AVG,
      MONTH9_AVG,
      MONTH10_AVG,
      MONTH11_AVG,
      MONTH12_AVG,
    } = record;
    const totalAvg =
      (MONTH1_AVG +
        MONTH2_AVG +
        MONTH3_AVG +
        MONTH4_AVG +
        MONTH5_AVG +
        MONTH6_AVG +
        MONTH7_AVG +
        MONTH8_AVG +
        MONTH9_AVG +
        MONTH10_AVG +
        MONTH11_AVG +
        MONTH12_AVG) /
      12;
    return totalAvg.toFixed(2) || 0;
  };

  createExcelListData = dataList => {
    if (dataList.length === 0) return [];
    const result = dataList.map(item => ({
      ...item,
      MONTH1_AVG: item.MONTH1_AVG.toFixed(2),
      MONTH2_AVG: item.MONTH2_AVG.toFixed(2),
      MONTH3_AVG: item.MONTH3_AVG.toFixed(2),
      MONTH4_AVG: item.MONTH4_AVG.toFixed(2),
      MONTH5_AVG: item.MONTH5_AVG.toFixed(2),
      MONTH6_AVG: item.MONTH6_AVG.toFixed(2),
      MONTH7_AVG: item.MONTH7_AVG.toFixed(2),
      MONTH8_AVG: item.MONTH8_AVG.toFixed(2),
      MONTH9_AVG: item.MONTH9_AVG.toFixed(2),
      MONTH10_AVG: item.MONTH10_AVG.toFixed(2),
      MONTH11_AVG: item.MONTH11_AVG.toFixed(2),
      MONTH12_AVG: item.MONTH12_AVG.toFixed(2),
      YEAR_AVG: this.calcYearUseAvg(item),
    }));
    return result || [];
  };

  render() {
    const { dataList } = this.props;
    const excelDataSet = this.createExcelListData(dataList);
    const columns = [
      { title: '공급장치번호', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Chemical Name', width: { wpx: 250 }, style: { font: { sz: '' } } },
      { title: '위치', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Chemical 품명', width: { wpx: 300 }, style: { font: { sz: '' } } },
      { title: 'Chemical 단위', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Chemical 용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '1월 사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '1월 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '1월 평균사용량', width: { wpx: 140 }, style: { font: { sz: '' } } },
      { title: '2월 사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '2월 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '2월 평균사용량', width: { wpx: 140 }, style: { font: { sz: '' } } },
      { title: '3월 사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '3월 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '3월 평균사용량', width: { wpx: 140 }, style: { font: { sz: '' } } },
      { title: '4월 사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '4월 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '4월 평균사용량', width: { wpx: 140 }, style: { font: { sz: '' } } },
      { title: '5월 사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '5월 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '5월 평균사용량', width: { wpx: 140 }, style: { font: { sz: '' } } },
      { title: '6월 사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '6월 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '6월 평균사용량', width: { wpx: 140 }, style: { font: { sz: '' } } },
      { title: '7월 사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '7월 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '7월 평균사용량', width: { wpx: 140 }, style: { font: { sz: '' } } },
      { title: '8월 사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '8월 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '8월 평균사용량', width: { wpx: 140 }, style: { font: { sz: '' } } },
      { title: '9월 사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '9월 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '9월 평균사용량', width: { wpx: 140 }, style: { font: { sz: '' } } },
      { title: '10월 사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '10월 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '10월 평균사용량', width: { wpx: 140 }, style: { font: { sz: '' } } },
      { title: '11월 사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '11월 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '11월 평균사용량', width: { wpx: 140 }, style: { font: { sz: '' } } },
      { title: '12월 사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '12월 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '12월 평균사용량', width: { wpx: 140 }, style: { font: { sz: '' } } },
      { title: '연간 사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '연간 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '연간 평균사용량', width: { wpx: 130 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'GONGNO', style: { font: { sz: '12' } } },
      { field: 'PRODNM', style: { font: { sz: '12' } } },
      { field: 'GONGAREA', style: { font: { sz: '12' } } },
      { field: 'CHEMNM', style: { font: { sz: '12' } } },
      { field: 'CHEMUNIT', style: { font: { sz: '12' } } },
      { field: 'CHEMSIZE', style: { font: { sz: '12' } } },
      { field: 'MONTH1', style: { font: { sz: '12' } } },
      { field: 'MONTH1_USE', style: { font: { sz: '12' } } },
      { field: 'MONTH1_AVG', style: { font: { sz: '12' } } },
      { field: 'MONTH2', style: { font: { sz: '12' } } },
      { field: 'MONTH2_USE', style: { font: { sz: '12' } } },
      { field: 'MONTH2_AVG', style: { font: { sz: '12' } } },
      { field: 'MONTH3', style: { font: { sz: '12' } } },
      { field: 'MONTH3_USE', style: { font: { sz: '12' } } },
      { field: 'MONTH3_AVG', style: { font: { sz: '12' } } },
      { field: 'MONTH4', style: { font: { sz: '12' } } },
      { field: 'MONTH4_USE', style: { font: { sz: '12' } } },
      { field: 'MONTH4_AVG', style: { font: { sz: '12' } } },
      { field: 'MONTH5', style: { font: { sz: '12' } } },
      { field: 'MONTH5_USE', style: { font: { sz: '12' } } },
      { field: 'MONTH5_AVG', style: { font: { sz: '12' } } },
      { field: 'MONTH6', style: { font: { sz: '12' } } },
      { field: 'MONTH6_USE', style: { font: { sz: '12' } } },
      { field: 'MONTH6_AVG', style: { font: { sz: '12' } } },
      { field: 'MONTH7', style: { font: { sz: '12' } } },
      { field: 'MONTH7_USE', style: { font: { sz: '12' } } },
      { field: 'MONTH7_AVG', style: { font: { sz: '12' } } },
      { field: 'MONTH8', style: { font: { sz: '12' } } },
      { field: 'MONTH8_USE', style: { font: { sz: '12' } } },
      { field: 'MONTH8_AVG', style: { font: { sz: '12' } } },
      { field: 'MONTH9', style: { font: { sz: '12' } } },
      { field: 'MONTH9_USE', style: { font: { sz: '12' } } },
      { field: 'MONTH9_AVG', style: { font: { sz: '12' } } },
      { field: 'MONTH10', style: { font: { sz: '12' } } },
      { field: 'MONTH10_USE', style: { font: { sz: '12' } } },
      { field: 'MONTH10_AVG', style: { font: { sz: '12' } } },
      { field: 'MONTH11', style: { font: { sz: '12' } } },
      { field: 'MONTH11_USE', style: { font: { sz: '12' } } },
      { field: 'MONTH11_AVG', style: { font: { sz: '12' } } },
      { field: 'MONTH12', style: { font: { sz: '12' } } },
      { field: 'MONTH12_USE', style: { font: { sz: '12' } } },
      { field: 'MONTH12_AVG', style: { font: { sz: '12' } } },
      { field: 'CHEMDISCHARGEY', style: { font: { sz: '12' } } },
      { field: 'CHEMUSAGEY', style: { font: { sz: '12' } } },
      { field: 'YEAR_AVG', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName="Chemical_사용정보"
        btnText="Excel"
        btnSize="btn-sm"
        columns={columns}
        fields={fields}
        listData={excelDataSet}
      />
    );
  }
}

Excel.propTypes = {
  dataList: PropTypes.array,
};

export default Excel;
