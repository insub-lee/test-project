import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, message, Select, Input, Modal } from 'antd';

import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';

import Moment from 'moment';

const AntdLineTable = StyledLineTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdModal = StyledContentsModal(Modal);

const { Option } = Select;
Moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthArray: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      yearArray: [],
      siteList: [],
      semesterMeasureList: [],
      gasTypeList: [],
      site: '',
      year: Moment().format('YYYY'),
      mm: Moment().format('MM'),
      gasType: '',
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'introCode',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=65',
        type: 'GET',
      },
      {
        key: 'gasTypeList',
        url: '/api/eshs/v1/common/eshsgastype',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const { result } = this.props;
    const startYear = 2005;
    const endYear = Number(Moment().format('YYYY')) + 1;
    const yearArray = [];
    for (let i = startYear; i <= endYear; i += 1) {
      yearArray.push(i);
    }
    this.setState({
      siteList: result && result.introCode && result.introCode.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 635 && f.USE_YN === 'Y'),
      gasTypeList: result && result.gasTypeList && result.gasTypeList.list,
      yearArray,
    });
  };

  isSearch = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { site, year, mm, gasType } = this.state;
    const params = `SITE=${site}&YEAR=${year}&MM=${mm}&&GAS_TYPE=${gasType}`;
    if (gasType) {
      const apiAry = [
        {
          key: 'semesterMmeasure',
          url: `/api/eshs/v1/common/semestermeasure?${params}`,
          type: 'GET',
        },
      ];
      getCallDataHandler(id, apiAry, this.listData);
    } else {
      message.warning('가스 종류를 선택해주세요.');
    }
  };

  listData = () => {
    const { result } = this.props;
    this.setState({ semesterMeasureList: result && result.semesterMmeasure && result.semesterMmeasure.list });
  };

  chagneSelect = (value, option) => {
    this.setState({
      [option.key]: value,
    });
  };

  handleModalVisible = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  };

  selectedModalRecord = record => {
    this.setState({
      gasType: record.GAS_CD,
    });
    this.handleModalVisible();
  };

  isExcelUpload = () => {
    message.info('개발 중 입니다.');
  };

  render() {
    const { columns, modalColumns } = this.props;
    const { siteList, monthArray, yearArray, semesterMeasureList, gasTypeList } = this.state;
    return (
      <>
        <ContentsWrapper>
          <div className="selSaveWrapper alignLeft">
            <AntdSelect className="select-mid mr5" onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.site}>
              <Option value="" key="site">
                지역전체
              </Option>
              {siteList.map(item => (
                <Option value={item.NODE_ID} key="site">
                  {item.NAME_KOR}
                </Option>
              ))}
            </AntdSelect>
            <AntdSelect className="select-mid mr5" onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.year}>
              {yearArray.map(item => (
                <Option value={`${item}`} key="year">
                  {item}
                </Option>
              ))}
            </AntdSelect>
            <AntdSelect className="select-mid" onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.mm}>
              {monthArray.map(i => (
                <Option value={i} key="mm">
                  {`${i}월`}
                </Option>
              ))}
            </AntdSelect>
            <span className="textLabel">오염물질 종류</span>
            <AntdInput style={{ width: '250px' }} className="ant-input-inline inputMid" readOnly onClick={this.handleModalVisible} value={this.state.gasType} />
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-primary btn-first" onClick={this.isSearch}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary btn-first" onClick={this.isExcelUpload}>
                저장
              </StyledButton>
              <StyledButton className="btn-primary btn-first" onClick={this.isExcelUpload}>
                엑셀받기(전체)
              </StyledButton>
              <StyledButton className="btn-primary" onClick={this.isExcelUpload}>
                엑셀받기(평균)
              </StyledButton>
            </StyledButtonWrapper>
          </div>
          <AntdLineTable
            className="tableWrapper"
            rowKey={semesterMeasureList && `${(semesterMeasureList.STACK_CD, semesterMeasureList.STACK_CD1)}`}
            columns={columns}
            dataSource={semesterMeasureList || []}
            footer={() => <div style={{ textAlign: 'center' }}>{`${semesterMeasureList && semesterMeasureList[0] ? semesterMeasureList.length : 0} 건`}</div>}
          />
        </ContentsWrapper>
        <AntdModal
          className="modal-table-pad"
          title="오염물질 종류 선택"
          visible={this.state.modal}
          width={800}
          height={600}
          onCancel={this.handleModalVisible}
          footer={null}
        >
          {this.state.modal && (
            <AntdLineTable
              className="tableWrapper"
              rowKey={gasTypeList && gasTypeList.GAS_CD}
              columns={modalColumns}
              dataSource={gasTypeList || []}
              onRow={record => ({
                onClick: () => {
                  this.selectedModalRecord(record);
                },
              })}
              footer={() => <div style={{ textAlign: 'center' }}>{`${gasTypeList.length - 1 || 0} 건`}</div>}
            />
          )}
        </AntdModal>
      </>
    );
  }
}

List.propTypes = {
  columns: PropTypes.array,
  modalColumns: PropTypes.array,
  result: PropTypes.any,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
};

List.defaultProps = {
  columns: [
    {
      title: 'Stack#(관리)',
      dataIndex: 'STACK_CD',
      align: 'center',
    },
    {
      title: '측정일',
      dataIndex: 'STACK_CD1',
      align: 'center',
    },
    {
      title: '농도',
      dataIndex: 'STACK_CD2',
      align: 'center',
    },
    {
      title: '시간당유량 SM3/H',
      dataIndex: 'CMM_CAPA3',
      align: 'center',
    },
    {
      title: '일평균 조업시간',
      dataIndex: 'CMM_CAPA4',
      align: 'center',
    },
    {
      title: '일일유량 SM3/H',
      dataIndex: 'CMM_CAPA5',
      align: 'center',
    },
    {
      title: '일일배출량',
      dataIndex: 'CMM_CAPA6',
      align: 'center',
    },
    {
      title: '조정된 일일배출량',
      dataIndex: 'CMM_CAPA7',
      align: 'center',
    },
    {
      title: '반기조업일 수',
      dataIndex: 'CMM_CAPA8',
      align: 'center',
    },
    {
      title: '반기 확정 배출량',
      dataIndex: 'CMM_CAPA9',
      align: 'center',
    },
  ],
  modalColumns: [
    {
      title: '가스종류명',
      dataIndex: 'GAS_NM',
      align: 'center',
    },
    {
      title: '가스분자량',
      dataIndex: 'PERMISSION_DENSITY',
      align: 'right',
    },
    {
      title: '법적허용 농도(PPM)',
      dataIndex: 'GAS_WEIGHT',
      align: 'center',
    },
    {
      title: '단위',
      dataIndex: 'UNIT',
      align: 'left',
    },
  ],
};

export default List;
