import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { Upload, Icon, DatePicker } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import SampleExcel from './sampleExcel/수질,원수양식.xls';
import Styled from './Styled';

const { MonthPicker } = DatePicker;
const AntdMonthPicker = StyledDatePicker(MonthPicker);
const { Dragger } = Upload;

class ExcelParser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment().format('YYYYMM'),
    };
  }

  numberPad = (n, width) => {
    const num = `${n}`;
    return num.length >= width ? num : new Array(width - num.length + 1).join('0') + num;
  };

  handleChange(file) {
    if (file) {
      this.handleFile(file);
    }
    return false;
  }

  handleFile(file) {
    const { month } = this.state;
    const { getUploadList } = this.props;
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = '원수';
      const ws = wb.Sheets[`${wsname}`];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      data.shift();
      let convertedData = [];
      try {
        // 유효데이터 추출
        const sMonth = moment(month, 'YYYYMM').format('M');
        const eMonth = Number(sMonth) + 1;
        let sIndex = 0;
        let eIndex = 0;
        switch (sMonth) {
          case '12':
            sIndex = data.findIndex(row => row[0] === `${sMonth}월`);
            eIndex = data.findIndex(row => row[1] === 'MAX');
            break;
          default:
            sIndex = data.findIndex(row => row[0] === `${sMonth}월`);
            eIndex = data.findIndex(row => row[0] === `${eMonth}월`);
            break;
        }
        if (sIndex > 0 && eIndex > 0) {
          convertedData = data
            .filter((row, index) => index >= sIndex && index < eIndex)
            .map((row, index) => ({
              WQ_DT: `${month}${this.numberPad(index + 1, 2)}`,
              WQ_TYPE: '원수',
              WQ_DIVISIONS: [
                {
                  WQ_DIVISION: 'HF계',
                  F: `${row[2]}`.trim() === '' ? 0 : row[2],
                  BOD: `${row[3]}`.trim() === '' ? 0 : row[3],
                  COD_MN: `${row[4]}`.trim() === '' ? 0 : row[4],
                  SS: `${row[5]}`.trim() === '' ? 0 : row[5],
                  TN: `${row[6]}`.trim() === '' ? 0 : row[6],
                  TP: `${row[7]}`.trim() === '' ? 0 : row[7],
                },
                {
                  WQ_DIVISION: 'A/A계',
                  F: `${row[8]}`.trim() === '' ? 0 : row[8],
                  BOD: `${row[9]}`.trim() === '' ? 0 : row[9],
                  COD_MN: `${row[10]}`.trim() === '' ? 0 : row[10],
                  SS: `${row[11]}`.trim() === '' ? 0 : row[11],
                  TN: `${row[12]}`.trim() === '' ? 0 : row[12],
                  TP: `${row[13]}`.trim() === '' ? 0 : row[13],
                },
                {
                  WQ_DIVISION: '유기계',
                  F: `${row[14]}`.trim() === '' ? 0 : row[14],
                  BOD: `${row[15]}`.trim() === '' ? 0 : row[15],
                  COD_MN: `${row[16]}`.trim() === '' ? 0 : row[16],
                  COD_CR: `${row[17]}`.trim() === '' ? 0 : row[17],
                  SS: `${row[18]}`.trim() === '' ? 0 : row[18],
                  TN: `${row[19]}`.trim() === '' ? 0 : row[19],
                  TP: `${row[20]}`.trim() === '' ? 0 : row[20],
                },
              ],
            }));
        }
      } catch (err) {
        convertedData = [];
        message.error(<MessageContent>표준양식을 사용해 주십시오.</MessageContent>);
      }
      if (getUploadList && typeof getUploadList === 'function') {
        if (convertedData && convertedData.length === 0) {
          message.error(<MessageContent>표준양식을 사용해 주십시오.</MessageContent>);
        } else {
          getUploadList(convertedData);
        }
      }
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  render() {
    const { month } = this.state;
    return (
      <Styled className="mealRegModalCotents" onDragEnter={e => e.stopPropagation()} onDragOver={e => e.stopPropagation()}>
        <div style={{ width: '50%', display: 'inline-block' }}>
          <AntdMonthPicker
            className="ant-picker-sm"
            defaultValue={moment(month, 'YYYYMM')}
            format="YYYY.MM"
            onChange={date => this.setState({ month: moment(date).format('YYYYMM') })}
          />
          <span style={{ color: '#ff4d4d', marginLeft: '5px', verticalAlign: 'middle' }}>※ 업로드할 년/월을 선택해 주십시오.</span>
        </div>
        <div className="excelDown" style={{ width: '50%', display: 'inline-block' }}>
          <StyledButton className="btn-gray btn-xs">
            <a href={SampleExcel} download>
              수질(원수) 양식 다운로드
            </a>
          </StyledButton>
        </div>
        <Dragger beforeUpload={e => this.handleChange(e)} fileList={[]}>
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
