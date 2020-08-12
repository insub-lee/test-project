import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { Upload, Icon, DatePicker } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import SampleExcel from './sampleExcel/수질,방류수양식.xls';
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
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[`${wsname}`];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      data.shift();
      let convertedData = [];
      try {
        // 유효데이터 추출
        convertedData = data
          .filter(row => row[0] >= 1 && row[0] <= moment(month, 'YYYYMM').endOf('month'))
          .map((row, index) => ({
            WQ_DT: `${month}${this.numberPad(index + 1, 2)}`,
            WQ_TYPE: '방류수',
            WQ_DIVISIONS: [
              {
                WQ_DIVISION: '',
                COD: row[8],
                BOD: row[11],
                SS: row[14],
                F: row[17],
                TN: row[20],
                TP: row[23],
                FLOW: row[24],
              },
            ],
          }));
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
      <Styled className="mealRegModalCotents">
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
              수질(방류수) 양식 다운로드
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
