import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactExport from 'react-data-export';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import { FileExcelOutlined } from '@ant-design/icons';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;

/*
    엑셀 다운로드 컴포넌트
    개발목적 : builderBase ListPage 내에서 사용되는 엑셀다운로드 버튼 컴포넌트 / DevBase(SI개발) 대응
    개발환경 : isBuilder (default: true) / SI 개발에서 따로 사용시 해당 Props를 false로 변경

    * 2020-04-08 현시점 : 추후 의존성 제거 및 추가 옵션등을 지원하는 신규 모듈로 개발중이라고 함
                           ** GitHub Issue 등을 살펴본 결과, 지원하지 않는 기능 내역
                           1. 최하단 결과 합계산 등  row 설정 불가 (컬럼에 맞춰 데이터 리스트만 그릴 수 있음)
                           2. ColSpan (셀병합) 설정 불가

    * Props  정보(타입) / 데이터 예시 (필수값은 *)
    1. isBuilder (bool) : true (DevBase 등, SI 개발에 사용시 false)
    2. btnText (String) : '엑셀 다운로드'
    3. fileName (String) : 'ExcelFile'
    4. sheetName (String) : '시트1'
    5. * columns (array(object)) : [{ title: '이름', width: { wpx: 100 }, style: {} }, { title: '나이', width: { wpx: 100 }, style: {} }]
    6. * fields (array(object)) : [{ field: 'NAME', style: {} }, { field: 'AGE', style: {} }]

    * Cell Style 관련사항 (참조) : https://www.npmjs.com/package/react-data-export
    * Cell Style 형식 : { fill: {}, font: {}, numFmt: '', alignment: {}, border: {} }
                          fill - 배경색 (object)
                          font - 폰트 (object)
                          numFmt - 넘버포맷 (String)
                          alignment - 정렬 (object)
                          border - 테두리  (object)
*/
class ExcelDownloadComp extends Component {
  componentDidMount() {}

  makeExcelDataSet = (columns, fields) => {
    const { listData } = this.props;
    const data = listData.map(item => {
      const result = [];
      fields.forEach(field => {
        const cell = {};
        cell.value = item[field.field] || '';
        cell.style = field.style;
        result.push(cell);
      });
      return result;
    });
    return [{ columns, data }];
  };

  render() {
    const { visible, CONFIG, workInfo, isBuilder, viewPageData } = this.props;

    
    let dataSet = [];
    if (isBuilder) {
      dataSet = this.makeExcelDataSet(CONFIG.property.columns, CONFIG.property.fields) || [];
    } else {
      dataSet = this.makeExcelDataSet(this.props.columns, this.props.fields) || [];
    }
    
    console.debug('데이터셋', dataSet);
    console.debug('리스트', this.props.listData);

    // BuilderBase 에서 사용시 (개발중)
    if (isBuilder) {
      return visible && viewPageData.viewType === 'LIST' && CONFIG.property.columns && CONFIG.property.columns.length > 0 ? (
        <ExcelFile
          filename={CONFIG.property.fileName || workInfo.NAME_KOR}
          element={
            <span className={CONFIG.property.className || ''}>
              <StyledButton className="btn-primary btn-sm" style={{ marginBottom: '5px' }}>
                <FileExcelOutlined />
                &nbsp;{CONFIG.property.btnText || '엑셀 다운로드'}
              </StyledButton>
            </span>
          }
        >
          <ExcelSheet dataSet={dataSet} name={(CONFIG.property.sheetName && CONFIG.property.sheetName) || 'Sheet1'} />
        </ExcelFile>
      ) : (
        ''
      );
    }

    // SI 개발에서 사용시
    return this.props.fields.length > 0 && this.props.columns.length > 0 ? (
      <ExcelFile
        filename={this.props.fileName}
        element={
          <span className={this.props.className}>
            <StyledButton className="btn-primary btn-sm" style={{ marginBottom: '5px' }}>
              <FileExcelOutlined />
              &nbsp;{this.props.btnText}
            </StyledButton>
          </span>
        }
      >
        <ExcelSheet dataSet={dataSet} name={this.props.sheetName} />
      </ExcelFile>
    ) : (
      ''
    );
  }
}

ExcelDownloadComp.propTypes = {
  CONFIG: PropTypes.any,
  workInfo: PropTypes.object,
  visible: PropTypes.bool,
  viewPageData: PropTypes.object,
  // SI 개발 대응 props
  isBuilder: PropTypes.bool,
  fileName: PropTypes.string,
  className: PropTypes.string,
  btnText: PropTypes.string,
  sheetName: PropTypes.string,
  columns: PropTypes.array,
  fields: PropTypes.array,
  listData: PropTypes.array, // builder 와 동일한 Props명 사용
};

ExcelDownloadComp.defaultProps = {
  // SI 개발 대응 default Props
  isBuilder: true,
  fileName: 'DownloadExcel',
  className: '',
  btnText: '엑셀 다운로드',
  sheetName: 'Sheet1',
  columns: [],
  fields: [],
  listData: [],
};

export default ExcelDownloadComp;
