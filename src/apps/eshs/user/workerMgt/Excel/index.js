import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactExport from 'react-data-export';
import StyledButton from 'commonStyled/Buttons/StyledButton';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '이정현',
    };
  }

  render() {
    const { dataList, wrkCmpnyNm } = this.props;
    return (
      <ExcelFile
        filename={wrkCmpnyNm === '' ? 'N/A_작업자' : `${wrkCmpnyNm}_작업자`}
        element={<StyledButton className="btn-primary btn-sm">엑셀받기</StyledButton>}
      >
        <ExcelSheet data={dataList} name={wrkCmpnyNm === '' ? 'N/A' : wrkCmpnyNm}>
          <ExcelColumn label="성명" value="workerNm" />
          <ExcelColumn label="생년월일" value={col => col.workerSsn.substr(0, 6)} />
          <ExcelColumn label="핸드폰(연락처)" value="mTel" />
          <ExcelColumn label="긴급연락처" value="tel" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

Excel.propTypes = {
  fileName: PropTypes.string,
  wrkCmpnyNm: PropTypes.string,
  dataList: PropTypes.array,
};

Excel.defaultProps = {
  fileName: 'downloadFile',
};

export default Excel;
