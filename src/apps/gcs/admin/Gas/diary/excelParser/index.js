import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { fromJS } from 'immutable';
import { Table, Upload, Icon } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import sampleExcelFile from './sampleExcel/통합일일업무.xlsx';
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
        convertedData = data.map(row => ({
          OCCURDT: row[0],
          FAB: row[1],
          GONGNO: row[2],
          PRODNM: row[3],
          UPTIME: row[4],
          DOWNTIME: row[5],
          PROBLEM: row[6],
          MEASURE: row[7],
          DAMAGE: row[8],
          OWNID: row[9],
          BIGO: row[10],
          EQUIPNOTI: row[11],
        }));
      } catch (err) {
        convertedData = [];
        message.error(<MessageContent>표준양식을 사용해 주십시오.</MessageContent>);
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
        title: '일자',
        dataIndex: 'OCCURDT',
        key: 'OCCURDT',
        width: 70,
        align: 'center',
        ellipsis: true,
      },
      {
        title: 'FAB',
        dataIndex: 'FAB',
        key: 'FAB',
        width: 100,
        align: 'center',
        ellipsis: true,
      },
      {
        title: 'No',
        dataIndex: 'GONGNO',
        key: 'GONGNO',
        width: 100,
        align: 'center',
        ellipsis: true,
      },
      {
        title: '장치명',
        dataIndex: 'PRODNM',
        key: 'PRODNM',
        width: 100,
        align: 'center',
        ellipsis: true,
      },
      {
        title: 'DOWN 시간',
        dataIndex: 'DOWNTIME',
        key: 'DOWNTIME',
        width: 100,
        align: 'center',
        ellipsis: true,
      },
      {
        title: 'UP 시간',
        dataIndex: 'UPTIME',
        key: 'UPTIME',
        width: 100,
        align: 'center',
        ellipsis: true,
      },
      {
        title: '문제점',
        dataIndex: 'PROBLEM',
        key: 'PROBLEM',
        width: 100,
        align: 'center',
        ellipsis: true,
      },
      {
        title: '조치사항',
        dataIndex: 'MEASURE',
        key: 'MEASURE',
        width: 100,
        align: 'center',
        ellipsis: true,
      },
      {
        title: '피해',
        dataIndex: 'DAMAGE',
        key: 'DAMAGE',
        width: 50,
        align: 'center',
        ellipsis: true,
      },
      {
        title: '작업자',
        dataIndex: 'OWNID',
        key: 'OWNID',
        width: 100,
        align: 'center',
        ellipsis: true,
      },
      {
        title: '비고',
        dataIndex: 'BIGO',
        key: 'BIGO',
        width: 100,
        align: 'center',
        ellipsis: true,
      },
      {
        title: '통보여부',
        dataIndex: 'EQUIPNOTI',
        key: 'EQUIPNOTI',
        width: 100,
        align: 'center',
        ellipsis: true,
      },
    ];

    return (
      <Styled className="mealRegModalCotents" onDragEnter={e => e.stopPropagation()} onDragOver={e => e.stopPropagation()}>
        <div className="excelDown">
          <StyledButton className="btn-gray btn-xs">
            <a href={sampleExcelFile} download>
              표준양식 다운로드
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
        <div className="table_wrap">
          <AntdTable pagination={false} columns={columns} dataSource={list.toJS().reverse()} scroll={{ x: 1600, y: 270 }} />
        </div>
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
