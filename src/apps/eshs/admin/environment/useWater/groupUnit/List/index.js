import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, message, Select, Modal } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';

import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';
import Edit from './Edit';
import CompanyModal from '../CompanyModal';

const AntdTable = StyledAntdTable(Table);
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
    // this.listDataApi();
  }

  initData = () => {
    const { result } = this.props;
    const treatmentPlantSB = result && result.UW && result.UW.categoryMapList.filter(x => x.PARENT_NODE_ID === 363 && x.LVL === 3 && x.USE_YN === 'Y');
    const filterPlantSB = result && result.UW && result.UW.categoryMapList.filter(x => x.PARENT_NODE_ID === 359 && x.LVL === 3 && x.USE_YN === 'Y');
    const fabSB = result && result.CM && result.CM.categoryMapList.filter(x => x.PARENT_NODE_ID === 638 && x.LVL === 3 && x.USE_YN === 'Y');
    const siteSB = result && result.CM && result.CM.categoryMapList.filter(x => x.PARENT_NODE_ID === 635 && x.LVL === 3 && x.USE_YN === 'Y');
    this.setState({ treatmentPlantSB, filterPlantSB, fabSB, siteSB }, this.searchList);
  };

  searchList = () => {
    const { result } = this.props;
    const initList =
      result &&
      result.eshsGroupUnit &&
      result.eshsGroupUnit.list.map(item => ({
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
    this.setState({ listData }, () => this.renderTable());
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

  renderSelect() {
    return (
      <StyledSearchWrap>
        <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.siteSBV} style={{ width: '130px', margin: '5px' }}>
          <Option value="0" key="siteSBV">
            지역전체
          </Option>
          {this.selectOptionRender('siteSB')}
        </Select>
        <span>회사</span>
        <Input
          style={{ width: '250px', margin: '5px', cursor: 'pointer' }}
          value={this.state.companyName}
          onClick={() => this.setState({ modalCompany: true })}
          placeholder="여기를 클릭해주세요."
        />
        <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.filterPlantSBV} style={{ width: '130px', margin: '5px' }}>
          <Option value="0" key="filterPlantSBV">
            정수장전체
          </Option>
          {this.selectOptionRender('filterPlantSB')}
        </Select>
        <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.fabSBV} style={{ width: '130px', margin: '5px' }}>
          <Option value="0" key="fabSBV">
            FAB전체
          </Option>
          {this.selectOptionRender('fabSB')}
        </Select>
        <Select
          onChange={(value, option) => this.changeSelectValue(value, option)}
          value={this.state.treatmentPlantSBV}
          style={{ width: '130px', margin: '5px' }}
        >
          <Option value="0" key="treatmentPlantSBV">
            처리장전체
          </Option>
          {this.selectOptionRender('treatmentPlantSB')}
        </Select>
        <span>DI 시설</span>
        <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.di} style={{ margin: '5px' }}>
          <Option value="total" key="di">
            전체
          </Option>
          <Option value="1" key="di">
            O
          </Option>
          <Option value="0" key="di">
            X
          </Option>
        </Select>
        <span>구분</span>
        <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.gubun} style={{ margin: '5px' }}>
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
        </Select>
        <StyledButton className="btn-primary btn-first" onClick={() => this.listDataApi()} style={{ margin: '5px' }}>
          검색
        </StyledButton>
      </StyledSearchWrap>
    );
  }

  renderTable() {
    const { columns } = this.props;
    const { listData } = this.state;
    return (
      <AntdTable
        style={{ cursor: 'pointer' }}
        rowKey={listData && listData.GROUP_UNIT_CD}
        columns={columns}
        dataSource={listData}
        bordered
        onRow={record => ({
          onClick: () => {
            this.selectedRecord(record);
          },
        })}
        pagination={{ pageSize: 100 }}
        scroll={{ y: 500 }}
        footer={() => <div style={{ textAlign: 'center' }}>{`${listData && listData.length - 1} 건`}</div>}
      />
    );
  }

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

  editModalTemplate = record => (
    <Edit
      {...this.props}
      treatmentPlantSB={this.state.treatmentPlantSB}
      filterPlantSB={this.state.filterPlantSB}
      fabSB={this.state.fabSB}
      siteSB={this.state.siteSB}
      modalProps={this.state.modalProps}
      onEditCancel={this.onEditCancel}
    />
  );

  render() {
    const { result } = this.props;
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              {this.renderSelect()}
              <div className="alignRight" style={{ marginBottom: '10px' }}>
                <StyledButton className="btn-primary btn-first" onClick={() => this.isOpenEdit()}>
                  추가
                </StyledButton>
              </div>
              {this.renderTable()}
              <Modal visible={this.state.modalEdit} width="800px" onCancel={this.onCancel} destroyOnClose footer={[]}>
                <div>{this.state.modalEdit && this.editModalTemplate()}</div>
              </Modal>
              <Modal visible={this.state.modalCompany} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
                <div>{this.state.modalCompany && <CompanyModal {...this.props} selectedModalRecord={this.selectedModalRecord} />}</div>
              </Modal>
            </Group>
          </Sketch>
        </StyledViewDesigner>
      </div>
    );
  }
}

List.propTypes = {};

List.defaultProps = {
  getCallDataHandler: () => {},
  formData: {},
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
