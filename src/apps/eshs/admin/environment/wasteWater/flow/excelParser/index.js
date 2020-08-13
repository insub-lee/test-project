import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { fromJS } from 'immutable';
import { Upload, Icon } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import sampleExcelFile from './sampleExcel/용폐수일지_유량업로드양식.xlsx';
import Styled from './Styled';

const { Dragger } = Upload;

class ExcelParser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitCode: [
        { unitCd: '001', name: 'UPW(DI동)', points: ['fab-1', 'fab-2', 'fab-4', 'fab-5', 'm-8', 'm-9', 'fab-1.2s', 'fab-1.2w', 'm-8.9s', 'm-8.9w'] },
        { unitCd: '002', name: '공수동', points: ['폐수공수', 'main공수'] },
        { unitCd: '003', name: '시수동', points: ['main시수'] },
        { unitCd: '004', name: '오수동', points: ['C-1/3', 'C-2', '남자기숙사', '여자기숙사', 'R동', '교육동'] },
        { unitCd: '005', name: 'C-1WWT동', points: ['HF pond', 'HM pond', 'H2O2 pond'] },
        { unitCd: '006', name: 'C-2WWT동', points: ['ORG pond', 'HF pond', 'AA pond', 'C-2방류구'] },
        { unitCd: '007', name: 'C-3WWT동', points: ['HF pond', 'AA pond', 'AA pond(R)', 'ORG pond', 'CMP pond', 'C-3방류구'] },
      ],
    };
  }

  handleChange(file) {
    if (file) {
      this.handleFile(file);
    }
    return false;
  }

  // Row를 unitCode 와 대조하여 유효한 데이터일 시, true 리턴
  checkingUnitCOd = row => {
    const { unitCode } = this.state;
    const index = unitCode.findIndex(unit => {
      const { unitCd, name, points } = unit;
      return unitCd === row[3] && name === row[4] && points.includes(row[5]);
    });
    if (index !== -1) return true;
    return false;
  };

  handleFile(file) {
    const { unitCode } = this.state;
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
        convertedData = data
          .filter(row => this.checkingUnitCOd(row))
          .map(item => ({
            GROUP_UNIT_CD: item[3],
            GROUP_UNIT_NM: item[4],
            MEASUREMENT_POINT: item[5],
            THE_DAY_INDEX: item[6],
            THE_DAY_BEFORE_INDEX: item[7],
            FLOW_AMOUNT: item[8],
            INSPECTION_TIME: '',
          }));
        const waterFlowDataRow = data.find(row => row[1] === 'Magnachip 폐수 총 발생량');
        waterFlowData = {
          GUBUN: '폐수발생량(C-2)',
          USED_AMOUNT: waterFlowDataRow[8],
        };
      } catch (err) {
        convertedData = [];
        message.error(<MessageContent>표준양식을 사용해 주십시오.</MessageContent>);
      }
      if (getUploadList && typeof getUploadList === 'function') {
        getUploadList(convertedData, waterFlowData);
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
      <Styled className="mealRegModalCotents">
        <div className="excelDown">
          <StyledButton className="btn-gray btn-xs">
            <a href={sampleExcelFile} download>
              용폐수일지 양식 다운로드
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
  children: PropTypes.object,
  getUploadList: PropTypes.func,
  onSave: PropTypes.func,
};

export default ExcelParser;
