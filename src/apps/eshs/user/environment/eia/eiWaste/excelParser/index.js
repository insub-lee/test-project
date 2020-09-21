import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { Upload, Icon, Spin } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import sampleExcelFile from './sampleExcel/폐기물(양식).xlsx';

import Styled from './Styled';

const { Dragger } = Upload;

class ExcelParser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(file) {
    if (file) {
      this.handleFile(file);
    }
    return false;
  }

  // excleData를 가공하여 리턴 param : 회차 (1 or 2) // data
  excelDataSet = data => {
    const result = []; // 결과값 array
    // 엑셀 row 추출
    data.forEach((row, index) => {
      if (index > 1 && row[0] !== '') {
        const rowData = {
          FIRST_DEPTH: `${row[0]}`, // 구분
          SECOND_DEPTH: `${row[1]}`, // 소분류
          PROCESS_METHOD: `${row[2]}`, // 처리방법
          OUTPUT_TYPE: `${row[3]}`, // 배출형태
          OUTPUT_AREA: `${row[4]}`, // 배출처
          LAST_YEAR: `${row[5]}`, // 전년 발생량
          THIS_YEAR: `${row[6]}`, // 금년 발생량
        };
        result.push(rowData);
      }
    });
    return result;
  };

  handleFile(file) {
    const { getUploadList } = this.props;
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      data.shift();
      let convertedData = [];
      try {
        // 유효데이터 추출
        convertedData = this.excelDataSet(data);
        if (getUploadList && typeof getUploadList === 'function') {
          getUploadList(convertedData);
        }
      } catch (err) {
        console.debug('err', err);
        message.error(<MessageContent>표준양식을 사용해 주십시오.</MessageContent>);
      }
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  render() {
    const { isUpload } = this.props;
    return (
      <Styled onDragEnter={e => e.stopPropagation()} onDragOver={e => e.stopPropagation()}>
        <div className="excelDown">
          <StyledButton className="btn-gray btn-xs">
            <a href={sampleExcelFile} download>
              폐기물(양식) 다운로드
            </a>
          </StyledButton>
        </div>
        <Spin tip="Upload 중.." spinning={isUpload}>
          <Dragger beforeUpload={file => this.handleChange(file)} fileList={[]}>
            <p>
              <Icon type="inbox" />
            </p>
            <p>Excel Drag and Drop 혹은 선택</p>
          </Dragger>
        </Spin>
      </Styled>
    );
  }
}

ExcelParser.propTypes = {
  getUploadList: PropTypes.func,
  isUpload: PropTypes.bool,
};

export default ExcelParser;
