import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import XLSX from 'xlsx';
import { fromJS } from 'immutable';
import { Table, Upload, Icon, Spin } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import sampleExcelFile from './sapleExcel/meal_plan_sample.xlsx';
import Styled from './Styled';

const { Dragger } = Upload;

const AntdTable = StyledAntdTable(Table);

class ExcelParser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: fromJS([]),
    };
  }

  orderSelector = (mealType, dayDiv) => {
    switch (mealType) {
      case '조식':
        if (dayDiv === 'A') {
          return 0;
        }
        if (dayDiv === 'B') {
          return 1;
        }
        return 2;
      case '중식':
        if (dayDiv === 'A') {
          return 3;
        }
        if (dayDiv === 'B') {
          return 4;
        }
        return 5;
      case '석식':
        if (dayDiv === 'A') {
          return 6;
        }
        if (dayDiv === 'B') {
          return 7;
        }
        return 8;
      case '야식':
        if (dayDiv === 'A') {
          return 9;
        }
        if (dayDiv === 'B') {
          return 10;
        }
        return 11;
      default:
        return 99;
    }
  };

  handleChange(file) {
    if (file) {
      this.handleFile(file);
    }
    return false;
  }

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
        convertedData = data.map(row => {
          let translatedDate = '';
          if (typeof row[0] === 'number') {
            translatedDate = moment(new Date((row[0] - (25567 + 2)) * 86400 * 1000)).format('YYYYMMDD');
          } else {
            translatedDate = moment(row[0], 'YYYY-MM-DD').format('YYYYMMDD');
          }
          return {
            day: translatedDate,
            mealtype: row[1],
            daydiv: row[2],
            menu: {
              list: row[3].split(',').map(word => word.trim()),
              cal: row[4].toString(),
            },
            order: this.orderSelector(row[1], row[2]),
          };
        });
      } catch (err) {
        convertedData = [];
        message.error(<MessageContent>식단양식을 사용해 주십시오.</MessageContent>);
      }
      this.setState({ list: fromJS(convertedData) });
      if (getUploadList && typeof getUploadList === 'function') {
        getUploadList(convertedData);
      }
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  render() {
    const { children, onSave } = this.props;
    const { list } = this.state;
    // 식단 테이블 컬럼
    const columns = [
      {
        title: 'NO',
        dataIndex: 'row',
        width: '5%',
        align: 'center',
        render: (data, record, index) => <span>{list.toJS().length - index}</span>,
      },
      {
        title: '날짜',
        dataIndex: 'day',
        width: '10%',
        align: 'center',
      },
      {
        title: '시간',
        dataIndex: 'mealtype',
        width: '5%',
        align: 'center',
      },
      {
        title: '종류',
        dataIndex: 'daydiv',
        width: '10%',
        align: 'center',
      },
      {
        title: '메뉴',
        dataIndex: 'menu',
        width: '55%',
        align: 'center',
        render: (data, record) => <span>{record.menu.list.join(', ')}</span>,
      },
      {
        title: '칼로리',
        dataIndex: 'menu',
        width: '10%',
        align: 'center',
        render: (data, record) => <span>{record.menu.cal}</span>,
      },
    ];
    return (
      <Styled className="mealRegModalCotents">
        <div className="mealExcelDown">
          <StyledButton className="btn-gray btn-xs">
            <a href={sampleExcelFile} download>
              식단양식 다운로드
            </a>
          </StyledButton>
        </div>
        <Dragger beforeUpload={e => this.handleChange(e)} fileList={[]}>
          <p>
            <Icon type="inbox" />
          </p>
          <p>Excel Drag and Drop 혹은 선택</p>
        </Dragger>
        {children && children}
        <AntdTable pagination={false} columns={columns} dataSource={list.toJS().reverse()} scroll={{ y: 270 }} />
        <div className="saveBtnWrap">
          <StyledButton className="btn-primary btn-sm" onClick={() => onSave('SAVE')}>
            저장
          </StyledButton>
        </div>
      </Styled>
    );
  }
}

ExcelParser.propTypes = {
  children: PropTypes.object,
  getUploadList: PropTypes.func,
  onSave: PropTypes.func,
};

export default ExcelParser;
