import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Select, Input, message } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

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
      majorCd: '',
      minorCd: '',
      cdNm: '',
      useYN: '',
      sysYN: '',
      remark: '',
      ref01: '',
      ref02: '',
      selectedMajor: '',
      readType: false,
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, dangerMainYN } = this.props;
    const apiAry = [
      {
        key: dangerMainYN ? 'dangerList' : 'dangerSelect',
        url: `/api/eshs/v1/common/eshsDanger/${dangerMainYN}`,
        type: 'GET',
      },
      {
        key: 'selectData',
        url: `/api/admin/v1/common/categoryMapList?MAP_ID=45`,
        type: 'GET',
      },
      !dangerMainYN
        ? {
            key: 'subExcelList',
            url: `/api/eshs/v1/common/eshsDanger/${dangerMainYN}?EXCEL_LIST_YN=${true}`,
            type: 'GET',
          }
        : '',
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const { result } = this.props;
    this.setState({
      dangerList: result && result.dangerList && result.dangerList.list,
      dangerSelect: result && result.dangerSelect && result.dangerSelect.list,
      selectData: result && result.selectData && result.selectData.categoryMapList && result.selectData.categoryMapList.filter(f => f.LVL !== 0),
    });
  };

  searchData = () => {
    const { sagaKey: id, getCallDataHandler, dangerMainYN } = this.props;
    const { selectedMajor } = this.state;
    const apiAry = [
      {
        key: 'dangerList',
        url: dangerMainYN ? `/api/eshs/v1/common/eshsDanger/${dangerMainYN}` : `/api/eshs/v1/common/eshsDanger/${dangerMainYN}?SELECTED_CODE=${selectedMajor}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  };

  changeSelectedData = value => {
    const { sagaKey: id, getCallDataHandler, dangerMainYN } = this.props;
    const apiAry = [
      {
        key: 'dangerList',
        url: `/api/eshs/v1/common/eshsDanger/${dangerMainYN}?SELECTED_CODE=${value}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  };

  changeValue = (name, value) => {
    this.setState({ [name]: value });
    if (name === 'selectedMajor') {
      this.changeSelectedData(value);
    }
  };

  insertOverlab = () => {
    const { dangerMainYN } = this.props;
    const { dangerList, majorCd, minorCd, selectedMajor } = this.state;
    let overlab;
    if (dangerMainYN) {
      overlab = dangerList.find(item => item.MAJOR_CD === majorCd && item.MINOR_CD === '*');
    } else {
      overlab = dangerList.find(item => item.MAJOR_CD === selectedMajor && item.MINOR_CD === minorCd);
    }
    if (overlab) {
      message.warning('중복된 값이 존재합니다.');
    } else {
      this.onChangeData('I');
    }
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga, dangerMainYN } = this.props;
    const { majorCd, minorCd, cdNm, useYN, sysYN, remark, ref01, ref02, selectedMajor } = this.state;
    let nUseYn;
    switch (value) {
      case 'R':
        nUseYn = 'Y';
        break;
      case 'D':
        nUseYn = 'N';
        break;
      default:
        nUseYn = useYN;
        break;
    }

    const submitData = {
      PARAM: {
        MAJOR_CD: value === 'I' && !dangerMainYN ? selectedMajor : majorCd,
        MINOR_CD: value === 'I' && dangerMainYN ? '*' : minorCd,
        CD_NM: cdNm,
        USE_YN: nUseYn,
        SYS_YN: sysYN,
        REMARK: remark,
        REF01: ref01,
        REF02: ref02,
      },
    };
    if (cdNm && (dangerMainYN ? majorCd : minorCd)) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshsDanger/${dangerMainYN}`, submitData, this.searchData);
      } else if (value === 'D' || value === 'R') {
        submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshsDanger/${dangerMainYN}`, submitData, this.searchData);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshsDanger/${dangerMainYN}`, submitData, this.searchData);
      } else if (value === 'S') {
        submitHandlerBySaga(
          id,
          'PUT',
          `/api/eshs/v1/common/eshsSysChange`,
          {
            PARAM: {
              MAJOR_CD: majorCd,
              SYS_YN: sysYN === 'Y' ? 'N' : 'Y',
            },
          },
          this.searchData,
        );
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
      majorCd: '',
      minorCd: '',
      cdNm: '',
      useYN: '',
      sysYN: '',
      remark: '',
      ref01: '',
      ref02: '',
      readType: false,
    });
  };

  selectedRecord = record => {
    const { selectedMajor } = this.state;
    this.setState({
      majorCd: record.MAJOR_CD,
      minorCd: record.MINOR_CD,
      cdNm: record.CD_NM,
      useYN: record.USE_YN,
      sysYN: record.SYS_YN,
      remark: record.REMARK,
      ref01: selectedMajor === 'C003' ? Number(record.REF01) : record.REF01,
      ref02: record.REF02,
      readType: true,
    });
  };

  render() {
    const {
      dangerMainYN,
      result: { subExcelList },
    } = this.props;
    const { dangerSelect, selectedMajor, dangerList, majorCd, minorCd, cdNm, useYN, sysYN, remark, ref01, ref02, readType, selectData } = this.state;
    const excelList = subExcelList && subExcelList.list;
    const columns = [
      {
        title: 'SYS',
        align: 'center',
        children: [
          {
            title: <span>{sysYN}</span>,
            className: 'th-form',
            dataIndex: 'SYS_YN',
            align: 'center',
          },
        ],
      },
      {
        title: '상태',
        align: 'center',
        children: [
          {
            title: (
              <>
                {useYN ? (
                  <>
                    {useYN === 'Y' ? (
                      '사용'
                    ) : (
                      <StyledButton style={{ width: 80 }} className="btn-primary btn-first btn-sm" onClick={() => this.onChangeData('R')}>
                        삭제 취소
                      </StyledButton>
                    )}
                  </>
                ) : (
                  ''
                )}
              </>
            ),
            dataIndex: 'USE_YN',
            className: 'th-form',
            align: 'center',
            width: 50,
            render: item => <span>{item === 'Y' ? '사용' : '삭제'}</span>,
          },
        ],
      },
      {
        title: '코드',
        align: 'center',
        children: [
          {
            title: (
              <AntdInput
                className="ant-input-sm"
                value={dangerMainYN ? majorCd : minorCd}
                onChange={e => this.changeValue(dangerMainYN ? 'majorCd' : 'minorCd', e.target.value)}
                readOnly={readType}
              />
            ),
            align: 'center',
            className: 'th-form',
            dataIndex: dangerMainYN ? 'MAJOR_CD' : 'MINOR_CD',
          },
        ],
      },
      {
        title: '코드명',
        align: 'left',
        children: [
          {
            title: <AntdInput className="ant-input-sm" value={cdNm} onChange={e => this.changeValue('cdNm', e.target.value)} />,
            className: 'th-form',
            align: 'left',
            dataIndex: 'CD_NM',
          },
        ],
      },
      {
        title: '참고1',
        align: 'center',
        children: [
          {
            title:
              selectedMajor === 'C003' ? (
                <AntdSelect style={{ width: 80 }} onChange={value => this.changeValue('ref01', value)} value={ref01}>
                  {selectData && selectData.map(item => <Option value={item.NODE_ID}>{item.NAME_KOR}</Option>)}
                </AntdSelect>
              ) : (
                <AntdInput className="ant-input-sm" value={ref01} onChange={e => this.changeValue('ref01', e.target.value)} />
              ),
            className: 'th-form',
            align: 'center',
            dataIndex: selectedMajor === 'C003' ? 'REF01_NAME' : 'REF01',
          },
        ],
      },
      {
        title: '참고2',
        align: 'center',
        children: [
          {
            title: <AntdInput className="ant-input-sm" value={ref02} onChange={e => this.changeValue('ref02', e.target.value)} />,
            className: 'th-form',
            align: 'center',
            dataIndex: 'REF02',
          },
        ],
      },
      {
        title: '비고',
        align: 'left',
        children: [
          {
            title: (
              <>
                <AntdInput
                  className="ant-input-inline ant-input-sm mr5"
                  value={remark}
                  style={{ width: '150px' }}
                  onChange={e => this.changeValue('remark', e.target.value)}
                />
                <StyledButtonWrapper className="btn-wrap-inline">
                  <StyledButton className="btn-primary btn-first btn-sm" onClick={this.insertOverlab}>
                    추가
                  </StyledButton>
                  <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.onChangeData('U')}>
                    수정
                  </StyledButton>
                  <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.onChangeData('D')}>
                    삭제
                  </StyledButton>
                  <StyledButton className="btn-primary btn-first btn-sm" onClick={this.onReset}>
                    Reset
                  </StyledButton>
                  {dangerMainYN ? (
                    <StyledButton className="btn-primary btn-sm" onClick={() => this.onChangeData('S')}>
                      SYS
                    </StyledButton>
                  ) : (
                    ''
                  )}
                </StyledButtonWrapper>
              </>
            ),
            className: 'th-form',
            dataIndex: 'REMARK',
            align: 'left',
          },
        ],
      },
    ];
    return (
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          {dangerMainYN ? (
            ''
          ) : (
            <AntdSelect
              style={{ width: '200px' }}
              className="select-mid mr5"
              onChange={value => this.changeValue('selectedMajor', value)}
              value={selectedMajor}
            >
              {dangerSelect && dangerSelect.map(itme => <Option value={itme.MAJOR_CD}>{itme.CD_NM}</Option>)}
            </AntdSelect>
          )}
          <StyledButton className="btn-primary btn-first btn-sm" onClick={this.searchData}>
            검색
          </StyledButton>
          <ExcelDownloader dataList={dangerMainYN ? dangerList : excelList} excelNm={`위험성 코드(${dangerMainYN ? 'Main' : 'Sub'})관리`} />
        </div>
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
  dangerMainYN: PropTypes.bool,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
