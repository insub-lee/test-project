import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { site, dataList, getListFunc } = this.props;
    const columns = [
      { title: 'Cabinet 번호', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Gas Name', width: { wpx: 250 }, style: { font: { sz: '' } } },
      { title: '위치', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '감지기', width: { wpx: 300 }, style: { font: { sz: '' } } },
      { title: 'Vent Line', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '기타 정보', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '품명', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '단위', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day1_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day1 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day2_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day2 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day3_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day3 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day4_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day4 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day5_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day5 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day6_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day6 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day7_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day7 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day8_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day8 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day9_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day9 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day10_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day10 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day11_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day11 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day12_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day12 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day13_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day13 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day14_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day14 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day15_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day15 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day16_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day16 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day17_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day17 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day18_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day18 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day19_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day19 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day20_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day20 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day21_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day21 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day22_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day22 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day23_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day23 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day24_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day24 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day25_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day25 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day26_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day26 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day27_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day27 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day28_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day28 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day29_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day29 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day30_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day30 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day31_사용수량', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Day31 사용량', width: { wpx: 120 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'CABINO', style: { font: { sz: '12' } } },
      { field: 'PRODNM', style: { font: { sz: '12' } } },
      { field: 'CABIAREA', style: { font: { sz: '12' } } },
      { field: 'CABISENSOR', style: { font: { sz: '12' } } },
      { field: 'CABIVENTLINE', style: { font: { sz: '12' } } },
      { field: 'GASNM', style: { font: { sz: '12' } } },
      { field: 'GASUNIT', style: { font: { sz: '12' } } },
      { field: 'GASSIZE', style: { font: { sz: '12' } } },
      { field: 'DAY1', style: { font: { sz: '12' } } },
      { field: 'DAY1_USE', style: { font: { sz: '12' } } },
      { field: 'DAY2', style: { font: { sz: '12' } } },
      { field: 'DAY2_USE', style: { font: { sz: '12' } } },
      { field: 'DAY3', style: { font: { sz: '12' } } },
      { field: 'DAY3_USE', style: { font: { sz: '12' } } },
      { field: 'DAY4', style: { font: { sz: '12' } } },
      { field: 'DAY4_USE', style: { font: { sz: '12' } } },
      { field: 'DAY5', style: { font: { sz: '12' } } },
      { field: 'DAY5_USE', style: { font: { sz: '12' } } },
      { field: 'DAY6', style: { font: { sz: '12' } } },
      { field: 'DAY6_USE', style: { font: { sz: '12' } } },
      { field: 'DAY7', style: { font: { sz: '12' } } },
      { field: 'DAY7_USE', style: { font: { sz: '12' } } },
      { field: 'DAY8', style: { font: { sz: '12' } } },
      { field: 'DAY8_USE', style: { font: { sz: '12' } } },
      { field: 'DAY9', style: { font: { sz: '12' } } },
      { field: 'DAY9_USE', style: { font: { sz: '12' } } },
      { field: 'DAY10', style: { font: { sz: '12' } } },
      { field: 'DAY10_USE', style: { font: { sz: '12' } } },
      { field: 'DAY11', style: { font: { sz: '12' } } },
      { field: 'DAY11_USE', style: { font: { sz: '12' } } },
      { field: 'DAY12', style: { font: { sz: '12' } } },
      { field: 'DAY12_USE', style: { font: { sz: '12' } } },
      { field: 'DAY13', style: { font: { sz: '12' } } },
      { field: 'DAY13_USE', style: { font: { sz: '12' } } },
      { field: 'DAY14', style: { font: { sz: '12' } } },
      { field: 'DAY14_USE', style: { font: { sz: '12' } } },
      { field: 'DAY15', style: { font: { sz: '12' } } },
      { field: 'DAY15_USE', style: { font: { sz: '12' } } },
      { field: 'DAY16', style: { font: { sz: '12' } } },
      { field: 'DAY16_USE', style: { font: { sz: '12' } } },
      { field: 'DAY17', style: { font: { sz: '12' } } },
      { field: 'DAY17_USE', style: { font: { sz: '12' } } },
      { field: 'DAY18', style: { font: { sz: '12' } } },
      { field: 'DAY18_USE', style: { font: { sz: '12' } } },
      { field: 'DAY19', style: { font: { sz: '12' } } },
      { field: 'DAY19_USE', style: { font: { sz: '12' } } },
      { field: 'DAY20', style: { font: { sz: '12' } } },
      { field: 'DAY20_USE', style: { font: { sz: '12' } } },
      { field: 'DAY21', style: { font: { sz: '12' } } },
      { field: 'DAY21_USE', style: { font: { sz: '12' } } },
      { field: 'DAY22', style: { font: { sz: '12' } } },
      { field: 'DAY22_USE', style: { font: { sz: '12' } } },
      { field: 'DAY23', style: { font: { sz: '12' } } },
      { field: 'DAY23_USE', style: { font: { sz: '12' } } },
      { field: 'DAY24', style: { font: { sz: '12' } } },
      { field: 'DAY24_USE', style: { font: { sz: '12' } } },
      { field: 'DAY25', style: { font: { sz: '12' } } },
      { field: 'DAY25_USE', style: { font: { sz: '12' } } },
      { field: 'DAY26', style: { font: { sz: '12' } } },
      { field: 'DAY26_USE', style: { font: { sz: '12' } } },
      { field: 'DAY27', style: { font: { sz: '12' } } },
      { field: 'DAY27_USE', style: { font: { sz: '12' } } },
      { field: 'DAY28', style: { font: { sz: '12' } } },
      { field: 'DAY28_USE', style: { font: { sz: '12' } } },
      { field: 'DAY29', style: { font: { sz: '12' } } },
      { field: 'DAY29_USE', style: { font: { sz: '12' } } },
      { field: 'DAY30', style: { font: { sz: '12' } } },
      { field: 'DAY30_USE', style: { font: { sz: '12' } } },
      { field: 'DAY31', style: { font: { sz: '12' } } },
      { field: 'DAY31_USE', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName={`${site}_Gas_Dayily_Info`}
        btnText="Excel"
        btnSize="btn-sm"
        columns={columns}
        getListFunc={getListFunc}
        fields={fields}
        listData={dataList}
      />
    );
  }
}

Excel.propTypes = {
  site: PropTypes.string,
  dataList: PropTypes.array,
};

export default Excel;
