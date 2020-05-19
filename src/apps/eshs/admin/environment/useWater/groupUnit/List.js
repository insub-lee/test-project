import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Select, Input, Modal } from 'antd';

import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledAntdModalPad from 'components/BizBuilder/styled/Modal/StyledAntdModalPad';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';

import Edit from './Edit';
import CompanyModal from './CompanyModal';

const AntdLineTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdModalPad = StyledAntdModalPad(Modal);

const { Option } = Select;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalEdit: false,
      treatmentPlantSBV: '0', // 처리장코드(관리단위가 처리장일 경우만 관리)
      filterPlantSBV: '0', // 정수장 코드(관리단위가 정수장일 경우만 관리)
      fabSBV: '0', // 건물FAB(관리단위가 건물FAB일 경우만 관리)
      siteSBV: '0', // 지역
      companyCd: '0', // 회사코드:하이닉스,하이디스,LCD,
      companyName: '',
      gubun: '0', // 관리단위구분:정수장,건물FAB,처리장,기타의 구분자 (코드테이블 gubun값, ETC)
      di: 'total', // DI생산시설여부
      del: '0', // 삭제여부
      modalCompany: false,
      treatmentPlantSB: [],
      filterPlantSB: [],
      fabSB: [],
      siteSB: [],
      listData: [],
    };
  }

  componentDidMount() {
    this.selectCodeApi();
  }

  initData = () => {
    const {
      result: { UW, CM },
    } = this.props;
    const treatmentPlantSB = UW && UW.categoryMapList && UW.categoryMapList.filter(x => x.PARENT_NODE_ID === 363 && x.LVL === 3 && x.USE_YN === 'Y');
    const filterPlantSB = UW && UW.categoryMapList && UW.categoryMapList.filter(x => x.PARENT_NODE_ID === 359 && x.LVL === 3 && x.USE_YN === 'Y');
    const fabSB = CM && CM.categoryMapList && CM.categoryMapList.filter(x => x.PARENT_NODE_ID === 638 && x.LVL === 3 && x.USE_YN === 'Y');
    const siteSB = CM && CM.categoryMapList && CM.categoryMapList.filter(x => x.PARENT_NODE_ID === 635 && x.LVL === 3 && x.USE_YN === 'Y');
    this.setState({ treatmentPlantSB, filterPlantSB, fabSB, siteSB }, this.searchList);
  };

  searchList = () => {
    const {
      result: { eshsGroupUnit },
    } = this.props;
    const initList =
      eshsGroupUnit &&
      eshsGroupUnit.list &&
      eshsGroupUnit.list.map(item => ({
        ...item,
        FILTER_PLANT_NM: item.GUBUN === 'FILTER_PLANT' ? this.state.filterPlantSB.find(f => f.CODE === item.FILTER_PLANT_CD) : '',
        FAB_NM: item.GUBUN === 'FAB' ? this.state.fabSB.find(f => f.CODE === item.FAB) : '',
        TREATMENT_PLANT_NM: item.GUBUN === 'TREATMENT_PLANT' ? this.state.treatmentPlantSB.find(f => f.CODE === item.TREATMENT_PLANT_CD) : '',
      }));
    const listData =
      initList &&
      initList.map(item => ({
        ...item,
        FILTER_PLANT_NM: item.FILTER_PLANT_NM ? item.FILTER_PLANT_NM.NAME_KOR : '',
        FAB_NM: item.FAB_NM ? item.FAB_NM.NAME_KOR : '',
        TREATMENT_PLANT_NM: item.TREATMENT_PLANT_NM ? item.TREATMENT_PLANT_NM.NAME_KOR : '',
        IS_DI: item.IS_DI === '1' ? 'O' : 'X',
        IS_DEL: item.IS_DEL === '0' ? 'O' : 'X',
      }));
    this.setState({ listData });
  };

  selectCodeApi() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'CM',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=65',
        type: 'GET',
      },
      {
        key: 'UW',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=47',
        type: 'GET',
      },
      {
        key: 'modalData',
        url: '/api/eshs/v1/common/eshsHstCompanyList',
        type: 'GET',
      },
      {
        key: 'eshsGroupUnit',
        url: '/api/eshs/v1/common/eshsgroupunit',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  listDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { siteSBV, companyCd, filterPlantSBV, fabSBV, treatmentPlantSBV, di, gubun } = this.state;
    let getParam = `SITE=${siteSBV === '0' ? '' : siteSBV}&COMPANY_CD=${companyCd === '0' ? '' : companyCd}`;
    getParam += `&FILTER_PLANT_CD=${filterPlantSBV === '0' ? '' : filterPlantSBV}&FAB=${fabSBV === '0' ? '' : fabSBV}&IS_DI=${di === 'total' ? '' : di}`;
    getParam += `&TREATMENT_PLANT_CD=${treatmentPlantSBV === '0' ? '' : treatmentPlantSBV}&GUBUN=${gubun === '0' ? '' : gubun}`;
    const apiAry = [
      {
        key: 'eshsGroupUnit',
        url: `/api/eshs/v1/common/eshsgroupunit?${getParam}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.searchList);
  };

  changeInputValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCancel = () => {
    this.setState({
      modalEdit: false,
      modalCompany: false,
      modalProps: '',
    });
  };

  changeSelectValue = (value, option) => {
    this.setState({
      [option.key]: value,
    });
  };

  selectOptionRender = codegubun => {
    const selectData =
      this.state[`${codegubun}`] &&
      this.state[`${codegubun}`].map(item => (
        <Option value={item.CODE} key={`${codegubun}V`}>
          {item.NAME_KOR}
        </Option>
      ));
    return selectData;
  };

  selectedRecord = record => {
    this.setState({
      modalEdit: true,
      modalProps: {
        groupUnitCd: record.GROUP_UNIT_CD,
        groupUnitNm: record.GROUP_UNIT_NM,
        siteSBV: record.SITE,
        companyName: record.COMPANY_NM,
        companyCd: record.COMPANY_CD,
        gubun: record.GUBUN,
        filterPlantSBV: record.FILTER_PLANT_CD || '0',
        fabSBV: record.FAB || '0',
        treatmentPlantSBV: record.TREATMENT_PLANT_CD || '0',
        di: record.IS_DI === 'O' ? '1' : '0',
        del: record.IS_DEL === 'O' ? '0' : '1',
      },
    });
  };

  selectedModalRecord = record => {
    this.setState({
      companyName: record.HST_CMPNY_NM,
      companyCd: record.HST_CMPNY_CD,
      modalCompany: false,
    });
  };

  isOpenEdit = () => {
    this.setState({ modalEdit: true });
  };

  onEditCancel = () => {
    this.setState({
      modalEdit: false,
      modalProps: '',
    });
    this.listDataApi();
  };

  render() {
    const { columns, sagaKey: id, getCallDataHandler, result, submitHandlerBySaga } = this.props;
    const { listData } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearch>
            <div className="search-input-area">
              <AntdSelect className="select-sm mr5" onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.siteSBV}>
                <Option value="0" key="siteSBV">
                  지역전체
                </Option>
                {this.selectOptionRender('siteSB')}
              </AntdSelect>
              <span className="text-label">회사</span>
              <AntdInput
                style={{ width: '200px' }}
                className="ant-input-inline ant-input-sm input-pointer mr5"
                value={this.state.companyName}
                onClick={() => this.setState({ modalCompany: true })}
                placeholder="여기를 클릭해주세요."
              />
              <AntdSelect className="select-sm mr5" onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.filterPlantSBV}>
                <Option value="0" key="filterPlantSBV">
                  정수장전체
                </Option>
                {this.selectOptionRender('filterPlantSB')}
              </AntdSelect>
              <AntdSelect className="select-sm mr5" onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.fabSBV}>
                <Option value="0" key="fabSBV">
                  FAB전체
                </Option>
                {this.selectOptionRender('fabSB')}
              </AntdSelect>
              <AntdSelect className="select-sm mr5" onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.treatmentPlantSBV}>
                <Option value="0" key="treatmentPlantSBV">
                  처리장전체
                </Option>
                {this.selectOptionRender('treatmentPlantSB')}
              </AntdSelect>
              <span className="text-label">DI 시설</span>
              <AntdSelect className="select-sm mr5" onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.di}>
                <Option value="total" key="di">
                  전체
                </Option>
                <Option value="1" key="di">
                  O
                </Option>
                <Option value="0" key="di">
                  X
                </Option>
              </AntdSelect>
              <span className="text-label">구분</span>
              <AntdSelect className="select-sm mr5" onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.gubun}>
                <Option value="0" key="gubun">
                  전체
                </Option>
                <Option value="COMPANY" key="gubun">
                  회사
                </Option>
                <Option value="FILTER_PLANT" key="gubun">
                  정수장
                </Option>
                <Option value="FAB" key="gubun">
                  FAB
                </Option>
                <Option value="TREATMENT_PLANT" key="gubun">
                  처리장
                </Option>
              </AntdSelect>
            </div>
            <StyledButtonWrapper className="btn-area">
              <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.listDataApi()}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary btn-sm" onClick={() => this.isOpenEdit()}>
                추가
              </StyledButton>
            </StyledButtonWrapper>
          </StyledCustomSearch>
          <AntdLineTable
            className="tableWrapper"
            rowKey={listData && listData.GROUP_UNIT_CD}
            columns={columns}
            dataSource={listData}
            onRow={record => ({
              onClick: () => {
                this.selectedRecord(record);
              },
            })}
            footer={() => <div style={{ textAlign: 'center' }}>{`${listData && listData.length} 건`}</div>}
          />
        </StyledContentsWrapper>
        <AntdModalPad visible={this.state.modalEdit} width="600px" onCancel={this.onCancel} destroyOnClose footer={null} title="관리 단위 등록/수정">
          <div>
            {this.state.modalEdit && (
              <Edit
                submitHandlerBySaga={submitHandlerBySaga}
                getCallDataHandler={getCallDataHandler}
                result={result}
                treatmentPlantSB={this.state.treatmentPlantSB}
                filterPlantSB={this.state.filterPlantSB}
                fabSB={this.state.fabSB}
                siteSB={this.state.siteSB}
                sagaKey={id}
                modalProps={this.state.modalProps}
                onEditCancel={this.onEditCancel}
              />
            )}
          </div>
        </AntdModalPad>
        <AntdModalPad visible={this.state.modalCompany} width="600px" onCancel={this.onCancel} destroyOnClose footer={null} title="회사 선택">
          <div>
            {this.state.modalCompany && (
              <CompanyModal sagaKey={id} getCallDataHandler={getCallDataHandler} result={result} selectedModalRecord={this.selectedModalRecord} />
            )}
          </div>
        </AntdModalPad>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  columns: PropTypes.array,
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
  columns: [
    {
      title: '코드',
      dataIndex: 'GROUP_UNIT_CD',
      align: 'center',
      width: 150,
    },
    {
      title: '관리단위명',
      dataIndex: 'GROUP_UNIT_NM',
      align: 'left',
    },
    {
      title: '지역',
      dataIndex: 'SITE',
      align: 'center',
    },
    {
      title: '회사',
      dataIndex: 'COMPANY_NM',
      align: 'center',
      width: '250px',
    },
    {
      title: '정수장',
      dataIndex: 'FILTER_PLANT_NM',
      align: 'center',
    },
    {
      title: '건물/FAB',
      dataIndex: 'FAB_NM',
      align: 'center',
    },
    {
      title: '처리장',
      dataIndex: 'TREATMENT_PLANT_NM',
      align: 'center',
    },
    {
      title: 'DI시설',
      dataIndex: 'IS_DI',
      align: 'center',
    },
    {
      title: '사용',
      dataIndex: 'IS_DEL',
      align: 'center',
    },
  ],
};

export default List;
