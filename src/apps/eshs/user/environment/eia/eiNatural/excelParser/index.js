import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { Upload, Icon, Spin } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import sampleExcelFile from './sampleExcel/천연자원(양식).xlsx';

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
          FIRST_DEPTH: row[0], // 대분류
          SECOND_DEPTH: row[1], // 소분류
          USE_LOCATION: row[2], // 사용처
          LOAD_FACTOR: `${row[3]}`, // 부하율
          USE_PERCENT: `${row[4]}`, // 사용량
          UNIT: row[5], // 단위
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
              천연자원(양식) 다운로드
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
