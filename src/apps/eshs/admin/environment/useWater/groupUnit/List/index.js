import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, message, Select, Modal } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';

import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);
const { Option } = Select;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupUnitCd: '', // 관리단위코드:주로 FAB기준이며,회사단위일 경우도 있슴.정수장
      groupUnitNm: '', // 관리단위명
      site: '청주', // 지역
      companyCd: '', // 회사코드:하이닉스,하이디스,LCD,
      companyName: '',
      gubun: '', // 관리단위구분:정수장,건물FAB,처리장,기타의 구분자 (코드테이블 gubun값, ETC)
      filterPlant: '0', // 정수장 코드(관리단위가 정수장일 경우만 관리)
      fab: '0', // 건물FAB(관리단위가 건물FAB일 경우만 관리)
      treatmentPlant: '0', // 처리장코드(관리단위가 처리장일 경우만 관리)
      di: '0', // DI생산시설여부
      del: '0', // 삭제여부
      companyCdS: '0',
      gubunS: '0',
      companyNameS: '',
      diS: 'total',
      treatmentPlantS: '0',
      fabS: '0',
      filterPlantS: '0',
      siteS: '0',
      modalBool: false,
      modalBoolS: false,
      modalSearchtype: 'HST_CMPNY_NM',
      modalSearch: '',
      filterBool: false,
      fabBool: false,
      treatBool: false,
    };
  }

  componentDidMount() {
    this.selectCodeApi();
    this.listDataApi();
  }

  changeInputValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  callBackApi = () => {
    this.listDataApi();
  };

  selectCodeApi() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'site', // 지역
        url: '/api/eshs/v1/common/eshsbasiccode/CM?GUBUN=SITE&IS_DEL=0',
        type: 'GET',
      },
      {
        key: 'filterPlant', // 정수장
        url: '/api/eshs/v1/common/eshsbasiccode/UW?GUBUN=FILTER_PLANT&IS_DEL=0',
        type: 'GET',
      },
      {
        key: 'fab', // 건물  FAB
        url: '/api/eshs/v1/common/eshsbasiccode/CM?GUBUN=FAB&IS_DEL=0',
        type: 'GET',
      },
      {
        key: 'treatmentPlant', // 처리장
        url: '/api/eshs/v1/common/eshsbasiccode/UW?GUBUN=TREATMENT_PLANT&IS_DEL=0',
        type: 'GET',
      },
      {
        key: 'modalData',
        url: '/api/eshs/v1/common/eshsHstCompanyList',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry);
    this.renderSelect();
  }

  onModalSearch = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'modalData',
        url: `/api/eshs/v1/common/eshsHstCompanyList?SEARCH_TYPE=${this.state.modalSearchtype}&SEARCH=${this.state.modalSearch}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry);
    this.onShowModalTemplate();
  };

  listDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { siteS, companyCdS, filterPlantS, fabS, treatmentPlantS, diS, gubunS } = this.state;
    let getParam = `SITE=${siteS === '0' ? '' : siteS}&COMPANY_CD=${companyCdS === '0' ? '' : companyCdS}`;
    getParam += `&FILTER_PLANT_CD=${filterPlantS === '0' ? '' : filterPlantS}&FAB=${fabS === '0' ? '' : fabS}&IS_DI=${diS === 'total' ? '' : diS}`;
    getParam += `&TREATMENT_PLANT_CD=${treatmentPlantS === '0' ? '' : treatmentPlantS}&GUBUN=${gubunS === '0' ? '' : gubunS}`;
    const apiAry = [
      {
        key: 'eshsGroupUnit',
        url: `/api/eshs/v1/common/eshsgroupunit?${getParam}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry);
    this.renderTable();
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;

    const submitData = {
      PARAM: {
        GROUP_UNIT_CD: this.state.groupUnitCd, // 관리단위코드:주로 FAB기준이며,회사단위일 경우도 있슴.정수장
        GROUP_UNIT_NM: this.state.groupUnitNm, // 관리단위명
        SITE: this.state.site, // 지역
        COMPANY_CD: this.state.companyCd, // 회사코드:하이닉스,하이디스,LCD,
        GUBUN: this.state.gubun, // 관리단위구분:정수장,건물FAB,처리장,기타의 구분자 (코드테이블 gubun값, ETC)
        FILTER_PLANT_CD: this.state.filterPlant === '0' ? '' : this.state.filterPlant, // 정수장 코드(관리단위가 정수장일 경우만 관리)
        FAB: this.state.fab === '0' ? '' : this.state.fab, // 건물FAB(관리단위가 건물FAB일 경우만 관리)
        TREATMENT_PLANT_CD: this.state.treatmentPlant === '0' ? '' : this.state.treatmentPlant, // 처리장코드(관리단위가 처리장일 경우만 관리)
        IS_DI: this.state.di, // DI생산시설여부
        IS_DEL: this.state.del, // 삭제여부
      },
    };
    if (this.state.groupUnitNm) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsgroupunit', submitData, this.callBackApi);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsgroupunit', submitData, this.callBackApi);
      } else {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsgroupunit', submitData, this.callBackApi);
      }
    } else {
      message.warning('관리단위명을 올바르게 입력하시오.');
    }

    this.onReset();
  };

  onReset() {
    this.setState({
      groupUnitCd: '',
      groupUnitNm: '',
      site: '청주',
      companyCd: '',
      companyName: '',
      gubun: '',
      filterPlant: '0',
      fab: '0',
      treatmentPlant: '0',
      di: '0',
      del: '0',
      filterBool: false,
      fabBool: false,
      treatBool: false,
    });
  }

  onCancel = () => {
    this.setState({
      modalBool: false,
      modalBoolS: false,
    });
  };

  changeSelectValue = (value, option) => {
    if (option.key === 'filterPlant') {
      this.setState({
        filterBool: false,
        fabBool: true,
        treatBool: true,
        gubun: 'FILTER_PLANT_CD',
      });
    }
    if (option.key === 'fab') {
      this.setState({
        filterBool: true,
        fabBool: false,
        treatBool: true,
        gubun: 'FAB',
      });
    }
    if (option.key === 'treatmentPlant') {
      this.setState({
        filterBool: true,
        fabBool: true,
        treatBool: false,
        gubun: 'TREATMENT_PLANT_CD',
      });
    }
    this.setState({
      [option.key]: value,
    });
  };

  selectOptionRender = selectName => {
    const { result } = this.props;
    let selectData;
    if (result && result.site && result[`${selectName}`] && result[`${selectName}`].list) {
      selectData = result[`${selectName}`].list.map(item => (
        <Option value={item.CODE} key={selectName}>
          {item.NAME}
        </Option>
      ));
    }
    return selectData;
  };

  selectOptionSRender = selectName => {
    const { result } = this.props;
    let selectData;
    if (result && result.site && result[`${selectName}`] && result[`${selectName}`].list) {
      selectData = result[`${selectName}`].list.map(item => (
        <Option value={item.CODE} key={`${selectName}S`}>
          {item.NAME}
        </Option>
      ));
    }
    return selectData;
  };

  renderSelect() {
    return (
      <StyledSearchWrap>
        <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.siteS} style={{ width: '130px', margin: '5px' }}>
          <Option value="0" key="siteS">
            지역전체
          </Option>
          {this.selectOptionSRender('site')}
        </Select>
        <span>회사</span>
        <Input
          style={{ width: '250px', margin: '5px' }}
          value={this.state.companyNameS}
          onClick={() => this.setState({ modalBoolS: true })}
          name="companyNameS"
        />
        <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.filterPlantS} style={{ width: '130px', margin: '5px' }}>
          <Option value="0" key="filterPlantS">
            정수장전체
          </Option>
          {this.selectOptionSRender('filterPlant')}
        </Select>
        <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.fabS} style={{ width: '130px', margin: '5px' }}>
          <Option value="0" key="fabS">
            FAB전체
          </Option>
          {this.selectOptionSRender('fab')}
        </Select>
        <Select
          onChange={(value, option) => this.changeSelectValue(value, option)}
          value={this.state.treatmentPlantS}
          style={{ width: '130px', margin: '5px' }}
        >
          <Option value="0" key="treatmentPlantS">
            처리장전체
          </Option>
          {this.selectOptionSRender('treatmentPlant')}
        </Select>
        <span>DI 시설</span>
        <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.diS} style={{ margin: '5px' }}>
          <Option value="total" key="diS">
            전체
          </Option>
          <Option value="1" key="diS">
            O
          </Option>
          <Option value="0" key="diS">
            X
          </Option>
        </Select>
        <span>구분</span>
        <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.gubunS} style={{ margin: '5px' }}>
          <Option value="0" key="gubunS">
            전체
          </Option>
          <Option value="company" key="gubunS">
            회사
          </Option>
          <Option value="filterPlant" key="gubunS">
            정수장
          </Option>
          <Option value="fab" key="gubunS">
            FAB
          </Option>
          <Option value="treatmentPlant" key="gubunS">
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
    const { result, columns } = this.props;
    let renderList = [
      {
        GROUP_UNIT_CD: this.state.groupUnitCd,
        GROUP_UNIT_NM: <Input value={this.state.groupUnitNm} onChange={e => this.changeInputValue(e)} name="groupUnitNm" />,
        SITE: (
          <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.site}>
            {this.selectOptionRender('site')}
          </Select>
        ),
        COMPANY_NM: <Input value={this.state.companyName} onClick={() => this.setState({ modalBool: true })} />,
        FILTER_PLANT_CD: (
          <Select
            onChange={(value, option) => this.changeSelectValue(value, option)}
            value={this.state.filterPlant}
            style={{ width: '130px' }}
            disabled={this.state.filterBool}
          >
            <Option value="0">정수장전체</Option>
            {this.selectOptionRender('filterPlant')}
          </Select>
        ),
        FAB: (
          <Select
            onChange={(value, option) => this.changeSelectValue(value, option)}
            value={this.state.fab}
            style={{ width: '130px' }}
            disabled={this.state.fabBool}
          >
            <Option value="0">FAB전체</Option>
            {this.selectOptionRender('fab')}
          </Select>
        ),
        TREATMENT_PLANT_CD: (
          <Select
            onChange={(value, option) => this.changeSelectValue(value, option)}
            value={this.state.treatmentPlant}
            style={{ width: '130px' }}
            disabled={this.state.treatBool}
          >
            <Option value="0">처리장전체</Option>
            {this.selectOptionRender('treatmentPlant')}
          </Select>
        ),
        IS_DI: (
          <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.di}>
            <Option value="1" key="diS">
              O
            </Option>
            <Option value="0" key="diS">
              X
            </Option>
          </Select>
        ),
        IS_DEL: (
          <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.del}>
            <Option value="0" key="del">
              O
            </Option>
            <Option value="1" key="del">
              X
            </Option>
          </Select>
        ),
      },
    ];
    let listData = [];
    if (result && result.eshsGroupUnit && result.eshsGroupUnit.list) {
      listData = result.eshsGroupUnit.list.map(item => ({
        ...item,
        IS_DI: item.IS_DI === '1' ? 'O' : 'X',
        IS_DEL: item.IS_DEL === '0' ? 'O' : 'X',
      }));
    }
    renderList = [...renderList, ...listData];
    return (
      <AntdTable
        rowKey={renderList.CLEAN_CD}
        key={renderList.CLEAN_CD}
        columns={columns}
        dataSource={renderList}
        bordered
        onRow={record => ({
          onClick: () => {
            this.selectedRecord(record);
          },
        })}
        pagination={{ pageSize: 100 }}
        scroll={{ y: 500 }}
        footer={() => <div style={{ textAlign: 'center' }}>{`${renderList.length - 1} 건`}</div>}
      />
    );
  }

  selectedRecord = record => {
    if (typeof record.GROUP_UNIT_NM === 'string') {
      this.setState({
        groupUnitCd: record.GROUP_UNIT_CD,
        groupUnitNm: record.GROUP_UNIT_NM,
        site: record.SITE,
        companyName: record.COMPANY_NM,
        companyCd: record.COMPANY_CD,
        gubun: record.GUBUN,
        filterPlant: record.FILTER_PLANT_CD || '0',
        fab: record.FAB || '0',
        treatmentPlant: record.TREATMENT_PLANT_CD || '0',
        di: record.IS_DI === 'O' ? '1' : '0',
        del: record.IS_DEL === 'O' ? '0' : '1',
        filterBool: record.GUBUN !== 'FILTER_PLANT_CD',
        fabBool: record.GUBUN !== 'FAB',
        treatBool: record.GUBUN !== 'TREATMENT_PLANT',
      });
      if (!record.GUBUN) {
        this.setState({
          filterBool: false,
          fabBool: false,
          treatBool: false,
        });
      }
    }
  };

  onShowModalTemplate = type => {
    const { result } = this.props;
    let modal;
    const modalColumns = [
      {
        title: '코드',
        dataIndex: 'HST_CMPNY_CD',
        align: 'center',
        width: 100,
      },
      {
        title: '회사명',
        dataIndex: 'HST_CMPNY_NM',
        align: 'center',
        width: 200,
      },
    ];
    if (result && result.modalData && result.modalData.eshsHstCmpnyList) {
      const modalList = result.modalData.eshsHstCmpnyList;
      modal = (
        <>
          <StyledSearchWrap>
            <span>검색구분</span>
            <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.modalSearchtype} style={{ margin: '5px' }}>
              <Option value="HST_CMPNY_CD" key="modalSearchtype">
                코드
              </Option>
              <Option value="HST_CMPNY_NM" key="modalSearchtype">
                회사명
              </Option>
            </Select>
            <span>검색어</span>
            <Input style={{ width: '250px', margin: '5px' }} value={this.state.modalSearch} onChange={e => this.changeInputValue(e)} name="modalSearch" />
            <StyledButton className="btn-primary btn-first" onClick={() => this.onModalSearch()}>
              검색
            </StyledButton>
          </StyledSearchWrap>
          <AntdTable
            rowKey={modalList.HST_CMPNY_CD}
            key={modalList.HST_CMPNY_CD}
            columns={modalColumns}
            dataSource={modalList}
            bordered
            onRow={record => ({
              onClick: () => {
                this.selectedModalRecord(record, type);
              },
            })}
            pagination={{ pageSize: 100 }}
            scroll={{ y: 400 }}
            footer={() => <div style={{ textAlign: 'center' }}>{`${modalList.length} 건`}</div>}
          />
        </>
      );
    }
    return modal;
  };

  selectedModalRecord = (record, type) => {
    if (type === 'table') {
      this.setState({
        companyName: record.HST_CMPNY_NM,
        companyCd: record.HST_CMPNY_CD,
        modalBool: false,
      });
    } else {
      this.setState({
        companyNameS: record.HST_CMPNY_NM,
        companyCdS: record.HST_CMPNY_CD,
        modalBoolS: false,
      });
    }
  };

  render() {
    const { result } = this.props;
    console.log(result, '&&&&&&&&&&&&&&');
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              {this.renderSelect()}
              <div style={{ marginLeft: '10px', marginBottom: '10px' }}>
                <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('I')}>
                  추가
                </StyledButton>
                <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('U')}>
                  수정
                </StyledButton>
                <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('D')}>
                  삭제
                </StyledButton>
                <StyledButton className="btn-primary btn-first" onClick={() => this.onReset()}>
                  Reset
                </StyledButton>
              </div>
              {this.renderTable()}
              <Modal visible={this.state.modalBool || this.state.modalBoolS} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
                <div>{this.state.modalBool && this.onShowModalTemplate('table')}</div>
                <div>{this.state.modalBoolS && this.onShowModalTemplate('search')}</div>
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
      dataIndex: 'FILTER_PLANT_CD',
      align: 'center',
    },
    {
      title: '건물/FAB',
      dataIndex: 'FAB',
      align: 'center',
    },
    {
      title: '처리장',
      dataIndex: 'TREATMENT_PLANT_CD',
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
