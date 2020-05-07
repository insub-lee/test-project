import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Select, Input, message } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

import TableTypeSelector from 'components/TableTypeSelector';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdLineTable = StyledAntdTable(Table);

const { Option } = Select;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warehouseCd: '',
      warehouseNm: '',
      site: 716,
      itemList: [],
      siteList: [],
      wareHouseList: [],
      applyList: [],
      leftTableColumns: [
        { dataIndex: 'ITEM_CD', title: '품목코드', search: true, width: 150 },
        { dataIndex: 'GAS_WEIGHT', title: '지역', search: true, width: 90 },
        { dataIndex: 'ITEM_NM', title: '품목명', search: true, width: 200 },
        { dataIndex: 'UNIT', title: '구분', search: true, width: 150 },
      ],
      rightTableColumns: [
        { dataIndex: 'ITEM_CD', title: '품목코드', search: true, width: 150 },
        { dataIndex: 'ITEM_NM', title: '품목명', search: true, width: 200 },
      ],
    };
  }

  componentDidMount() {
    this.initDataApi();
  }

  initDataApi() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'site',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=65',
        type: 'GET',
      },
      {
        key: 'wasteItem',
        url: '/api/eshs/v1/common/eshsWMItem',
        type: 'GET',
      },
      {
        key: 'warehouse',
        url: `/api/eshs/v1/common/eshsWMWareHouse?SITE=${this.state.site}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const { result } = this.props;
    this.setState({
      itemList: result && result.wasteItem && result.wasteItem.list,
      siteList: result && result.site && result.site.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 635 && f.USE_YN === 'Y'),
    });
  };

  searchData = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'warehouse',
        url: `/api/eshs/v1/common/eshsWMWareHouse?SITE=${this.state.site}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry);
  };

  handleApply = applyList => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { warehouseCd } = this.state;
    const newAry = applyList.map(a => ({ ...a, WAREHOUSE_CD: warehouseCd }));
    const submitData = {
      WAREHOUSE_CD: this.state.warehouseCd,
      applyList: newAry,
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsWareHouseItem', submitData, this.searchData);

    this.onReset();
  };

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
  };

  insertOverlab = () => {
    const { wareHouseList, warehouseNm } = this.state;
    const overlab = wareHouseList.find(item => item.WAREHOUSE_NM === warehouseNm);
    if (overlab) {
      message.warning('중복된 코드명이 존재합니다.');
    } else {
      this.onChangeData('I');
    }
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;

    const submitData = {
      WAREHOUSE_CD: value === 'I' ? '' : this.state.warehouseCd,
      WAREHOUSE_NM: this.state.warehouseNm,
      SITE: this.state.site,
    };
    if (this.state.warehouseNm) {
      if (value === 'U' && this.state.warehouseCd) {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsWMWareHouse', submitData, this.searchData);
      } else if (value === 'D' && this.state.warehouseCd) {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsWMWareHouse', submitData, this.searchData);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsWMWareHouse', submitData, this.searchData);
      } else if (!this.state.warehouseCd) {
        message.warning('품목코드가 올바르지 않습니다.');
      }
    } else {
      message.warning('품목명을 올바르게 입력하시오.');
    }
    this.onReset();
  };

  onReset() {
    this.setState({ warehouseCd: '', warehouseNm: '' });
  }

  selectedRecord = record => {
    this.setState({ warehouseCd: record.WAREHOUSE_CD, warehouseNm: record.WAREHOUSE_NM }, this.selectedRecordCallbackApi);
  };

  selectedRecordCallbackApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'wareHouseItem',
        url: `/api/eshs/v1/common/eshsWareHouseItem?WAREHOUSE_CD=${this.state.warehouseCd}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.callbackItem);
  };

  callbackItem = () => {
    const { result } = this.props;
    this.setState({ applyList: result && result.wareHouseItem && result.wareHouseItem.list });
  };

  render() {
    const {
      result: { warehouse },
    } = this.props;
    const dataSource = warehouse && warehouse.list;
    const { siteList, itemList, leftTableColumns, rightTableColumns, applyList, warehouseCd, warehouseNm } = this.state;
    const columns = [
      {
        title: '코드',
        align: 'center',
        width: 100,
        children: [
          {
            title: <span>{warehouseCd}</span>,
            dataIndex: 'WAREHOUSE_CD',
            className: 'hr-form',
            align: 'center',
          },
        ],
      },
      {
        title: '코드명',
        align: 'left',
        children: [
          {
            title: (
              <>
                <AntdInput
                  className="ant-input-inline ant-input-sm mr5"
                  style={{ width: '200px' }}
                  value={warehouseNm}
                  onChange={e => this.onChangeValue('warehouseNm', e.target.value)}
                  name="warehouseNm"
                />
                <StyledButtonWrapper className="btn-wrap-inline">
                  <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.insertOverlab()}>
                    추가
                  </StyledButton>
                  <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.onChangeData('U')}>
                    수정
                  </StyledButton>
                  <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.onChangeData('D')}>
                    삭제
                  </StyledButton>
                  <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.onReset()}>
                    Reset
                  </StyledButton>
                  <TableTypeSelector
                    leftTableColumns={leftTableColumns}
                    rightTableColumns={rightTableColumns}
                    apiList={itemList || []}
                    applyList={applyList || []}
                    handleApply={this.handleApply}
                    btnText="처리품목 등록"
                    modalTitle="처리품목 검색"
                    rowKey="ITEM_CD"
                    customVisible={warehouseCd}
                    customWarning="코드를 선택해주세요"
                  />
                </StyledButtonWrapper>
              </>
            ),
            align: 'left',
            className: 'hr-form',
            dataIndex: 'WAREHOUSE_NM',
          },
        ],
      },
    ];
    return (
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">지역</span>
          <AntdSelect className="select-mid mr5" onChange={value => this.onChangeValue('site', value)} value={this.state.site}>
            {siteList.map(item => (
              <Option value={item.NODE_ID} key="site">
                {item.NAME_KOR}
              </Option>
            ))}
          </AntdSelect>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary" onClick={() => this.searchData()}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <AntdLineTable
          className="tableWrapper"
          rowKey={dataSource && dataSource.WAREHOUSE_CD}
          selectedRowKeys={[]}
          columns={columns}
          dataSource={dataSource || []}
          onRow={record => ({
            onClick: () => {
              this.selectedRecord(record);
            },
          })}
          footer={() => <span>{`${dataSource && dataSource.length} 건`}</span>}
        />
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
