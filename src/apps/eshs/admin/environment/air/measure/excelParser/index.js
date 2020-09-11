import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { Upload, Icon } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import sampleExcelFile from './sampleExcel/대기측정결과(양식).xlsx';
import Styled from './Styled';

const { Dragger } = Upload;

class ExcelParser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 계통별 분류체계
      stacks: {
        ACID: ['FR01-1', 'FR01-2', 'FR01-3', 'FR01-4', 'FR01-5', 'FR01-6', 'FR01-7', 'FR01-8', 'FR01-9', 'FR01-10', 'FR01-11', 'FR01-12', 'FR01-13'],
        TOXIC: ['FR02-1', 'FR02-2', 'FR02-3', 'FR02-4', 'FR02-5', 'FR02-5', 'FR02-6', 'FR02-7', 'FR02-8', 'FR02-9', 'FR02-10', 'FR02-11'],
        VOCs: ['FR04-1A', 'FR04-1B', 'FR04-2A', 'FR04-2B', 'FR04-3A', 'FR04-3B', 'FR04-4A', 'FR04-4B', 'FR04-5A', 'FR04-5B', 'FR04-6A', 'FR04-6B'],
      },
      // 계통별 측정항목 (1차)
      firstPoint: {
        ACID: ['HCl', 'HF', 'HCHO', 'Cr', 'Pb', 'Ni', 'NH3', 'Sox', 'Nox', '먼지', 'THC', '악취'],
        TOXIC: ['HCl', 'HF', 'HCHO', 'Cr', 'Pb', 'Ni', 'As', 'NH3', 'Sox', 'Nox', '먼지', 'THC', '악취'],
        VOCs: ['HCHO', 'Cr', 'Pb', 'Ni', '벤젠', '페놀', 'NH3', 'Sox', 'Nox', '먼지', 'THC', '악취'],
      },
      // 계통별 측정항목 (2차)
      secondPoint: {
        ACID: ['HCl', 'HF', 'HCHO', 'Cr', 'Pb', 'Ni'],
        TOXIC: ['HCl', 'HF', 'HCHO', 'Cr', 'Pb', 'Ni', 'As'],
        VOCs: ['HCHO', 'Cr', 'Pb', 'Ni', '벤젠', '페놀'],
      },
    };
  }

  handleChange(file) {
    if (file) {
      this.handleFile(file);
    }
    return false;
  }

  // excleData를 가공하여 리턴
  excelDataSet = data => {
    const { stacks, firstPoint, secondPoint } = this.state;
    let WORK_DAY = 0;
    data.forEach((row, index) => {
      console.debug(`row-${index}`, row);
      if (index === 1) {
        const { workDay } = row[21];
        WORK_DAY = workDay;
      }
    });
    console.debug('workDay', WORK_DAY);
    return [];
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
      let waterFlowData = {};
      try {
        // 유효데이터 추출
        // convertData : 유량테이블 / 일지공급원별사용량 테이블 전용 데이터
        // waterFlowData : 일지 폐수배출량 전용 데이터
        convertedData = this.excelDataSet(data);
      } catch (err) {
        convertedData = [];
        message.error(<MessageContent>표준양식을 사용해 주십시오.</MessageContent>);
      }
      if (getUploadList && typeof getUploadList === 'function') {
        // getUploadList(convertedData, waterFlowData);
      }
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  render() {
    return (
      <Styled onDragEnter={e => e.stopPropagation()} onDragOver={e => e.stopPropagation()}>
        <div className="excelDown">
          <StyledButton className="btn-gray btn-xs">
            <a href={sampleExcelFile} download>
              대기측정결과(양식) 다운로드
            </a>
          </StyledButton>
        </div>
        <Dragger beforeUpload={file => this.handleChange(file)} fileList={[]}>
          <p>
            <Icon type="inbox" />
          </p>
          <p>Excel Drag and Drop 혹은 선택</p>
        </Dragger>
      </Styled>
    );
  }
}

ExcelParser.propTypes = {
  getUploadList: PropTypes.func,
};

export default ExcelParser;
