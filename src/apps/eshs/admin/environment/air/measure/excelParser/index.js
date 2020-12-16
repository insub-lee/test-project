import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import XLSX from 'xlsx';
import { Upload, Icon, Spin, DatePicker } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import sampleExcelFile from './sampleExcel/대기측정결과(양식).xlsx';
import Styled from './Styled';

const { MonthPicker } = DatePicker;
const { Dragger } = Upload;
const AntdMonthPicker = StyledDatePicker(MonthPicker);

class ExcelParser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 등록할 년월
      yyyymm: moment().format('YYYY-MM'),
      // 계통별 분류체계
      stacks: {
        ACID: ['FR01-1', 'FR01-2', 'FR01-3', 'FR01-4', 'FR01-5', 'FR01-6', 'FR01-7', 'FR01-8', 'FR01-9', 'FR01-10', 'FR01-11', 'FR01-12', 'FR01-13'],
        TOXIC: ['FR02-1', 'FR02-2', 'FR02-3', 'FR02-4', 'FR02-5', 'FR02-5', 'FR02-6', 'FR02-7', 'FR02-8', 'FR02-9', 'FR02-10', 'FR02-11'],
        VOCs: ['FR04-1A', 'FR04-1B', 'FR04-2A', 'FR04-2B', 'FR04-3A', 'FR04-3B', 'FR04-4A', 'FR04-4B', 'FR04-5A', 'FR04-5B', 'FR04-6A', 'FR04-6B'],
      },
      // 측정항목
      measurePoint: ['HCl', 'HF', 'HCHO', 'Cr', 'Pb', 'Ni', 'As', '벤젠', '페놀', 'NH3', 'Sox', 'Nox', '먼지', 'THC', '악취'],
    };
  }

  handleChange(file) {
    if (file) {
      this.handleFile(file);
    }
    return false;
  }

  // excel date format으로 들어올시 숫자로 들어옴, 해당 숫자를 JS date 형식으로 변경
  ExcelDateToJSDate(date) {
    const convertDt = new Date(Math.round((date - 25569) * 86400 * 1000));
    const result = moment(convertDt).format('YYYY-MM-DD');
    return result;
  }

  // excleData를 가공하여 리턴 param : 회차 (1 or 2) // data
  excelDataSet = (seq, data) => {
    const { stacks, measurePoint, yyyymm } = this.state;
    const { ACID, TOXIC, VOCs } = stacks;
    const result = []; // 결과값 array
    let WORK_DAY = 0; // 워킹데이
    // 엑셀 row 추출
    data.forEach((row, index) => {
      const stack = row[1]; // 스텍명
      if (index === 1) {
        const workDay = row[21];
        WORK_DAY = workDay;
      }
      // stack명이 아래 대분류 내에 해당할 경우
      if (ACID.includes(stack) || TOXIC.includes(stack) || VOCs.includes(stack)) {
        // row[6] ~ row[20] 추출해야할 index (측정항목 엑셀좌표)
        measurePoint.forEach((point, idx) => {
          // 측정여부가 Y 일때만 rowData 추출
          let dataRow = {};
          if (row[2] === 'Y') {
            const measureDt = this.ExcelDateToJSDate(row[3]);
            dataRow = {
              YYYY: measureDt.substring(0, 4),
              MM: measureDt.substring(5, 7),
              SEQ: seq,
              IS_MEASURE: row[2],
              MEASURE_DT: measureDt,
              STACK_CD: stack,
              GAS_CD: point,
              DENSITY: row[idx + 6] !== '' ? row[idx + 6] : null,
              HOUR_FLOW: row[5],
              WORK_DAY,
            };
          } else {
            dataRow = {
              YYYY: yyyymm.substring(0, 4),
              MM: yyyymm.substring(5, 7),
              SEQ: seq,
              IS_MEASURE: row[2],
              MEASURE_DT: '',
              STACK_CD: stack,
              GAS_CD: point,
              DENSITY: row[idx + 6] !== '' ? row[idx + 6] : null,
              HOUR_FLOW: row[5],
              WORK_DAY,
            };
          }
          result.push(dataRow);
        });
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
      const wsname1 = wb.SheetNames[0];
      const wsname2 = wb.SheetNames[1];
      const ws1 = wb.Sheets[wsname1];
      const ws2 = wb.Sheets[wsname2];
      /* Convert array of arrays */
      const data1 = XLSX.utils.sheet_to_json(ws1, { header: 1, defval: '' });
      const data2 = XLSX.utils.sheet_to_json(ws2, { header: 1, defval: '' });
      data1.shift();
      data2.shift();
      let convertedData1 = [];
      let convertedData2 = [];
      try {
        // 유효데이터 추출
        // convertData : 유량테이블 / 일지공급원별사용량 테이블 전용 데이터
        // waterFlowData : 일지 폐수배출량 전용 데이터
        convertedData1 = this.excelDataSet(1, data1);
        convertedData2 = this.excelDataSet(2, data2);
        if (getUploadList && typeof getUploadList === 'function') {
          getUploadList(convertedData1, convertedData2);
        }
      } catch (err) {
        message.error(<MessageContent>표준양식을 사용해 주십시오.</MessageContent>);
      }
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  dateChange = date => {
    this.setState({
      yyyymm: date.format('YYYY-MM'),
    });
  };

  render() {
    const { yyyymm } = this.state;
    const { isUpload } = this.props;
    return (
      <Styled onDragEnter={e => e.stopPropagation()} onDragOver={e => e.stopPropagation()}>
        <div className="top-btn-group">
          <div className="textInfo">측정 연/월을 선택해 주십시오.</div>
          <AntdMonthPicker className="ant-picker-xs mr5 ant-picker-inline" defaultValue={moment(yyyymm, 'YYYY-MM')} onChange={date => this.dateChange(date)} />
          <div className="excelDown">
            <StyledButton className="btn-gray btn-xs">
              <a href={sampleExcelFile} download>
                대기측정결과(양식) 다운로드
              </a>
            </StyledButton>
          </div>
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
