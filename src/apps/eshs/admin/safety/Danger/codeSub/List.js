import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Select, Input, message } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledLineTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import ExcelDownloader from './Excel';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdLineTable = StyledLineTable(Table);

const { Option } = Select;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minorCd: '',
      cdNm: '',
      useYN: '',
      ref01: '',
      ref02: '',
      ref03: '',
      readType: false,
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'selectData',
        url: `/api/admin/v1/common/categoryMapList?MAP_ID=45`,
        type: 'GET',
      },
      {
        key: 'dangerList',
        url: `/api/eshs/v1/common/eshsDanger`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const {
      result: { dangerList, selectData },
    } = this.props;
    this.setState({
      dangerList: dangerList && dangerList.list,
      selectData: selectData && selectData.categoryMapList && selectData.categoryMapList.filter(f => f.LVL !== 0),
    });
  };

  changeValue = (name, value) => {
    this.setState({ [name]: value });
  };

  insertOverlab = () => {
    const { dangerList, minorCd } = this.state;
    const overlab = dangerList.find(item => item.MINOR_CD === minorCd);

    if (overlab) {
      message.warning('중복된 값이 존재합니다.');
    } else {
      this.onChangeData('I');
    }
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { minorCd, cdNm, ref01, ref02, ref03 } = this.state;

    const submitData = {
      PARAM: {
        MINOR_CD: minorCd,
        CD_NM: cdNm,
        USE_YN: value === 'D' ? 'N' : 'Y',
        REF01: ref01,
        REF02: ref02,
        REF03: ref03,
      },
    };
    if (cdNm && minorCd) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshsDanger`, submitData, this.searchData);
      } else if (value === 'D' || value === 'R') {
        submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshsDanger`, submitData, this.searchData);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshsDanger`, submitData, this.searchData);
      }
    } else if (cdNm) {
      message.warning('코드를 올바르게 입력하시오.');
    } else {
      message.warning('코드명을 올바르게 입력하시오.');
    }
    this.onReset();
  };

  onReset = () => {
    this.setState({
      minorCd: '',
      cdNm: '',
      useYN: '',
      ref01: '',
      ref02: '',
      ref03: '',
      readType: false,
    });
  };

  selectedRecord = record => {
    this.setState({
      minorCd: record.MINOR_CD,
      cdNm: record.CD_NM,
      useYN: record.USE_YN,
      ref01: Number(record.REF01),
      ref02: record.REF02,
      ref03: record.REF03,
      readType: true,
    });
  };

  render() {
    const { dangerList, minorCd, cdNm, useYN, ref01, ref02, ref03, readType, selectData } = this.state;
    const columns = [
      {
        title: '상태',
        align: 'center',
        children: [
          {
            title:
              useYN === 'Y' ? (
                '사용'
              ) : (
                <StyledButton className="btn-gray btn-xs" onClick={() => this.onChangeData('R')}>
                  삭제 취소
                </StyledButton>
              ),
            dataIndex: 'USE_YN',
            className: 'th-form',
            align: 'center',
            width: 150,
            render: item => <span>{item === 'Y' ? '사용' : '삭제'}</span>,
          },
        ],
      },
      {
        title: '코드',
        align: 'center',
        children: [
          {
            title: <AntdInput className="ant-input-xs" value={minorCd} onChange={e => this.changeValue('minorCd', e.target.value)} readOnly={readType} />,
            align: 'center',
            className: 'th-form',
            dataIndex: 'MINOR_CD',
            width: 100,
          },
        ],
      },
      {
        title: '코드명',
        align: 'left',
        children: [
          {
            title: <AntdInput className="ant-input-xs" value={cdNm} onChange={e => this.changeValue('cdNm', e.target.value)} />,
            className: 'th-form',
            align: 'left',
            dataIndex: 'CD_NM',
          },
        ],
      },
      {
        title: '지역',
        align: 'center',
        children: [
          {
            title: (
              <AntdSelect className="select-xs" style={{ width: 80 }} onChange={value => this.changeValue('ref01', value)} value={ref01}>
                {selectData && selectData.map(item => <Option value={item.NODE_ID}>{item.NAME_KOR}</Option>)}
              </AntdSelect>
            ),
            className: 'th-form',
            align: 'center',
            dataIndex: 'REF01_NAME',
          },
        ],
      },
      {
        title: '물질구분',
        align: 'center',
        children: [
          {
            title: (
              <AntdSelect className="select-xs" style={{ width: 150 }} onChange={value => this.changeValue('ref02', value)} value={ref02}>
                <Option value="GAS">GAS</Option>
                <Option value="CHEMICAL">CHEMICAL</Option>
              </AntdSelect>
            ),
            className: 'th-form',
            align: 'center',
            dataIndex: 'REF02',
          },
        ],
      },
      {
        title: '등급',
        align: 'left',
        children: [
          {
            title: (
              <>
                <AntdInput
                  className="ant-input-inline ant-input-xs input-left mr5"
                  value={ref03}
                  style={{ width: 80 }}
                  onChange={e => this.changeValue('ref03', e.target.value)}
                />
                <StyledButtonWrapper className="btn-wrap-inline">
                  <StyledButton className="btn-gray btn-xs btn-first" onClick={this.insertOverlab}>
                    추가
                  </StyledButton>
                  <StyledButton className="btn-gray btn-xs btn-first" onClick={() => this.onChangeData('U')}>
                    수정
                  </StyledButton>
                  <StyledButton className="btn-gray btn-xs btn-first" onClick={() => this.onChangeData('D')}>
                    삭제
                  </StyledButton>
                  <StyledButton className="btn-gray btn-xs" onClick={this.onReset}>
                    Reset
                  </StyledButton>
                </StyledButtonWrapper>
              </>
            ),
            className: 'th-form',
            dataIndex: 'REF03',
            align: 'left',
          },
        ],
      },
    ];
    return (
      <ContentsWrapper>
        <StyledCustomSearch className="search-wrapper-inline">
          <div className="btn-area">
            <ExcelDownloader dataList={dangerList} excelNm="MSDS 물질 코드" />
          </div>
        </StyledCustomSearch>
        <AntdLineTable
          rowKey={`${dangerList && dangerList.MAJOR_CD}_${dangerList && dangerList.MINOR_CD}`}
          columns={columns}
          dataSource={dangerList || []}
          bordered
          onRow={record => ({
            onClick: () => {
              this.selectedRecord(record);
            },
          })}
          footer={() => <span>{`${(dangerList && dangerList.length) || 0} 건`}</span>}
        />
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
