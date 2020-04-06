import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactExport from 'react-data-export';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import { FileExcelOutlined } from '@ant-design/icons';

import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';
// src\components\BizBuilder\Field\ExcelDownloadComp.js

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
// const { ExcelColumn } = ReactExport.ExcelFile;

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataList, wrkCmpnyNm } = this.props;

    const columns = [
      { title: '성명', width: { wpx: 100 }, style: { font: { sz: '12' } } },
      { title: '생년월일', width: { wpx: 100 }, style: { font: { sz: '12' } } },
      { title: '핸드폰', width: { wpx: 120 }, style: { font: { sz: '12' } } },
      { title: '긴급연락처', width: { wpx: 120 }, style: { font: { sz: '12' } } },
    ];

    // const celldatas = ['workerSsn', 'workerNm', 'mTel', 'tel'];
    // const cellStyles = [{ font: { sz: '12' } }, { font: { sz: '12' } }, { font: { sz: '12' } }, { font: { sz: '12' } }];

    const fields = [
      { field: 'workerNm', style: { font: { sz: '12' } } },
      { field: 'workerSsn', style: { font: { sz: '12' } } },
      { field: 'mTel', style: { font: { sz: '12' } } },
      { field: 'tel', style: { font: { sz: '12' } } },
    ];

    const data = dataList.map(item => {
      const result = [];
      fields.forEach(item2 => {
        const cell = {};
        cell.value = item[item2.field];
        cell.style = item2.style;
        result.push(cell);
      });
      return result;
    });

    const dataSet = [{ columns, data }];
    // return (
    //   <ExcelFile
    //     filename={wrkCmpnyNm === '' ? 'N/A_작업자' : `${wrkCmpnyNm}_작업자`}
    //     element={
    //       <StyledButton className="btn-primary btn-sm" style={{ marginBottom: '5px' }}>
    //         <FileExcelOutlined />
    //         &nbsp;엑셀받기
    //       </StyledButton>
    //     }
    //   >
    //     <ExcelSheet dataSet={dataSet} name={wrkCmpnyNm === '' ? 'N/A' : wrkCmpnyNm} />
    //   </ExcelFile>
    // );

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName={wrkCmpnyNm === '' ? 'N/A_작업자' : `${wrkCmpnyNm}_작업자`}
        className="testClassName"
        btnText="테스트버튼"
        sheetName="테스트시트"
        columns={columns}
        fields={fields}
        listData={dataList}
      />
    );

    // 간단사용법
    // return (
    //   <ExcelFile
    //     filename={wrkCmpnyNm === '' ? 'N/A_작업자' : `${wrkCmpnyNm}_작업자`}
    //     element={
    //       <StyledButton className="btn-primary btn-sm" style={{ marginBottom: '5px' }}>
    //         <FileExcelOutlined />
    //         &nbsp;엑셀받기
    //       </StyledButton>
    //     }
    //   >
    //     <ExcelSheet data={dataList} name={wrkCmpnyNm === '' ? 'N/A' : wrkCmpnyNm}>
    //       <ExcelColumn label="성명" value="workerNm" />
    //       <ExcelColumn label="생년월일" value={col => col.workerSsn.substr(0, 6)} />
    //       <ExcelColumn label="핸드폰(연락처)" value="mTel" />
    //       <ExcelColumn label="긴급연락처" value="tel" />
    //     </ExcelSheet>
    //   </ExcelFile>
    // );
  }
}

Excel.propTypes = {
  wrkCmpnyNm: PropTypes.string,
  dataList: PropTypes.array,
};

export default Excel;
