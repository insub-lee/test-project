import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { debounce } from 'lodash';

import * as selectors from 'components/BizBuilderBase/selectors';

import PropTypes from 'prop-types';
import ReactExport from 'react-data-export';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import { FileExcelOutlined } from '@ant-design/icons';

import BizMicroDevBase from 'components/BizMicroDevBase';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const StyledButton = StyledAntdButton(Button);

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

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      dataSet: [],
      startDown: false,
    };

    this.getExcelList = debounce(() => this.getExcelList, 300);
  }

  componentDidMount() {
    const { listData } = this.props;
    this.setState({ listData });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const prevList = prevState.listData || [];
    const nextList = nextProps.listData || [];

    const { isPagingData } = nextProps;
    const columns = nextProps.columns || [];
    const fields = nextProps.fields || [];
    if (JSON.stringify(nextList) !== JSON.stringify(prevList) && !isPagingData) {
      const data = nextList.map(item => {
        const result = [];
        fields.forEach(fieldInfo => {
          const cell = {};
          cell.value = item[fieldInfo.field] !== undefined && item[fieldInfo.field] !== null ? item[fieldInfo.field] : '';
          cell.style = fieldInfo.style;
          result.push(cell);
        });
        return result;
      });

      return { listData: nextList, dataSet: [{ columns, data }] };
    }

    return { listData: nextList };
  }

  getExcelList = () => {
    const { sagaKey: id, searchData, listOrderByField, getCallDataHandler, viewPageData, conditional, spinningOn } = this.props;
    spinningOn();
    const workSeq = (viewPageData && viewPageData.workSeq) || 0;

    const whereString = [];

    const keySet = Object.keys(searchData);
    keySet.forEach(key => {
      whereString.push(searchData[key]);
    });

    if (conditional && conditional.length > 0) whereString.push(conditional);

    const apiAry = [
      {
        key: 'excelList',
        url: `/api/builder/v1/work/taskList/${workSeq}`,
        type: 'POST',
        params: {
          PARAM: {
            whereString,
            listOrderByField,
            listOrderByRowNum: listOrderByField
              .replaceAll(' ASC', ' ||CSA||')
              .replaceAll(' DESC', ' ASC')
              .replaceAll(' ||CSA||', ' DESC'),
          },
        },
      },
    ];

    getCallDataHandler(id, apiAry, this.getExcelListAfter);
  };

  getExcelListAfter = () => {
    const { result, columns, fields, spinningOff } = this.props;
    spinningOff();

    const excelList = (result && result.excelList && result.excelList.list) || [];

    const data = excelList.map(item => {
      const res = [];
      fields.forEach(fieldInfo => {
        const cell = {};
        cell.value = item[fieldInfo.field] !== undefined && item[fieldInfo.field] !== null ? item[fieldInfo.field] : '';
        cell.style = fieldInfo.style;
        res.push(cell);
      });
      return res;
    });

    return this.setState({ dataSet: [{ columns, data }] }, this.bulderExcelExport);
  };

  bulderExcelExport = () => this.setState(prevState => ({ startDown: prevState.startDown + 1 }));

  render() {
    const { isBuilder, btnText, fileName, className, sheetName, isPagingData, fields, columns } = this.props;
    const { dataSet, startDown } = this.state;
    // BuilderBase 에서 사용시
    if (isBuilder) {
      return fields.length > 0 && columns.length > 0 ? (
        <>
          <StyledButton className="btn-img btn-gray btn-sm" onClick={() => (isPagingData ? this.getExcelList() : this.bulderExcelExport())}>
            <FileExcelOutlined />
            &nbsp;{btnText}
          </StyledButton>

          {startDown && (
            <ExcelFile key={startDown} filename={fileName} hideElement>
              <ExcelSheet dataSet={dataSet} name={sheetName} />
            </ExcelFile>
          )}
        </>
      ) : (
        ''
      );
    }

    // SI 개발에서 사용시
    return fields.length > 0 && columns.length > 0 ? (
      <ExcelFile
        filename={fileName}
        element={
          <span className={className}>
            <StyledButton className="btn-img btn-gray btn-sm">
              <FileExcelOutlined />
              &nbsp;{btnText}
            </StyledButton>
          </span>
        }
      >
        <ExcelSheet dataSet={dataSet} name={sheetName} />
      </ExcelFile>
    ) : (
      ''
    );
  }
}

Comp.propTypes = {
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
  btnSize: PropTypes.string, // 엑셀버튼 크기조정

  // 빌더 리스트 프롭스 추가
  conditional: PropTypes.string,
  isPagingData: PropTypes.bool,
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  searchData: PropTypes.any,
  listOrderByField: PropTypes.any,
  spinningOff: PropTypes.func,
  spinningOn: PropTypes.func,
};

Comp.defaultProps = {
  // SI 개발 대응 default Props
  isBuilder: true,
  fileName: 'DownloadExcel',
  className: '',
  btnText: '엑셀 다운로드',
  sheetName: 'Sheet1',
  columns: [],
  fields: [],
  listData: [],
  conditional: '',
  isPagingData: false,
};

const ExcelDownloadComp = props => {
  if (props.isBuilder)
    return (
      <div style={{ display: 'inline-block', position: 'absolute' }}>
        <BizMicroDevBase {...props} component={Comp} sagaKey={`${props.sagaKey}_dev`}></BizMicroDevBase>
      </div>
    );
  return <Comp {...props} />;
};

ExcelDownloadComp.propTypes = {
  sagaKey: PropTypes.string,
  isBuilder: PropTypes.bool,
};

// 빌더베이스 페이징옵션 선택했을경우
const mapStateToProps = (state, props) => {
  if (props.isBuilder && props.isPagingData)
    return createStructuredSelector({
      searchData: selectors.makeSelectSearchDataById(props.sagaKey),
      listOrderByField: selectors.makeSelectListOrderByField(props.sagaKey),
    });

  return null;
};

export default connect(mapStateToProps)(ExcelDownloadComp);
