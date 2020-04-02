import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Select, Input, message } from 'antd';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';

import TableTypeSelector from 'components/TableTypeSelector';

import Moment from 'moment';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdLineTable = StyledLineTable(Table);

const { Option } = Select;

Moment.locale('ko');

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
      wareHouseList: result && result.warehouse && result.warehouse.list,
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
    getCallDataHandler(id, apiAry, this.searchDataSet);
  };

  searchDataSet = () => {
    const { result } = this.props;
    this.setState({ wareHouseList: result && result.warehouse && result.warehouse.list });
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

  changeSelectValue = (value, option) => {
    this.setState({
      [option.key]: value,
    });
  };

  changeInputValue = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  warning = value => {
    message.warning(value);
  };

  insertOverlab = () => {
    const { wareHouseList, warehouseNm } = this.state;
    const overlab = wareHouseList.find(item => item.WAREHOUSE_NM === warehouseNm);
    if (overlab) {
      this.warning('중복된 코드명이 존재합니다.');
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
        this.warning('품목코드가 올바르지 않습니다.');
      }
    } else {
      this.warning('품목명을 올바르게 입력하시오.');
    }
    this.onReset();
  };

  onReset() {
    this.setState({
      warehouseCd: '',
      warehouseNm: '',
    });
  }

  renderSelect = key => {
    const { shapeList, unitList, transFormList } = this.state;
    let selectData;
    switch (key) {
      case 'shape':
        selectData = shapeList;
        break;
      case 'unit':
        selectData = unitList;
        break;
      case 'isTransForm':
        selectData = transFormList;
        break;
      default:
        selectData = '';
        break;
    }
    return (
      <Select
        style={{ width: '100px' }}
        onChange={(value, option) => this.changeSelectValue(value, option)}
        value={Number(this.state[key]) || (selectData && selectData[0] && selectData[0].NODE_ID)}
      >
        {selectData &&
          selectData.map(itme => (
            <Option value={itme.NODE_ID} key={key}>
              {itme.NAME_KOR}
            </Option>
          ))}
      </Select>
    );
  };

  renderTable() {
    const { itemList, leftTableColumns, rightTableColumns, applyList, wareHouseList } = this.state;
    const columns = [
      {
        title: (
          <>
            <span>코드</span>
            <br />
            {this.state.warehouseCd}
          </>
        ),
        dataIndex: 'WAREHOUSE_CD',
        align: 'center',
        width: 100,
      },
      {
        title: (
          <>
            <span>코드명</span>
            <br />
            <div style={{ float: 'left' }}>
              <AntdInput style={{ width: '200px' }} value={this.state.warehouseNm} onChange={e => this.changeInputValue(e)} name="warehouseNm" />
              <StyledButton className="btn-primary btn-first" onClick={() => this.insertOverlab()}>
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
            <div style={{ float: 'left' }}>
              <TableTypeSelector
                style={{ float: 'left' }}
                leftTableColumns={leftTableColumns}
                rightTableColumns={rightTableColumns}
                apiList={itemList}
                applyList={applyList}
                handleApply={this.handleApply}
                btnText="처리품목 등록"
                modalTitle="처리품목 검색"
                rowKey="ITEM_CD"
                customVisible={this.state.warehouseCd}
                customWarning="코드를 선택해주세요"
              />
            </div>
          </>
        ),
        dataIndex: 'WAREHOUSE_NM',
        align: 'left',
        // width: 600,
      },
    ];

    return (
      <AntdLineTable
        style={{ cursor: 'pointer' }}
        rowKey={wareHouseList && wareHouseList.WAREHOUSE_CD}
        columns={columns}
        dataSource={wareHouseList || []}
        bordered
        onRow={record => ({
          onClick: () => {
            this.selectedRecord(record);
          },
        })}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 600 }}
        footer={() => <div style={{ textAlign: 'center' }}>{`${wareHouseList && wareHouseList.length} 건`}</div>}
      />
    );
  }

  selectedRecord = record => {
    this.setState(
      {
        warehouseCd: record.WAREHOUSE_CD,
        warehouseNm: record.WAREHOUSE_NM,
      },
      () => this.selectedRecordCallbackApi(),
    );
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
    const { siteList } = this.state;
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <ContentsWrapper>
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="20%" />
                <col width="40%" />
                <col width="40%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>지역</th>
                  <td>
                    <AntdSelect
                      style={{ width: '100px', margin: '10px' }}
                      onChange={(value, option) => this.changeSelectValue(value, option)}
                      value={this.state.site}
                    >
                      {siteList.map(item => (
                        <Option value={item.NODE_ID} key="site">
                          {item.NAME_KOR}
                        </Option>
                      ))}
                    </AntdSelect>
                  </td>
                  <td>
                    <StyledButtonWrapper>
                      <StyledButton className="btn-primary btn-first" onClick={() => this.searchData()}>
                        검색
                      </StyledButton>
                    </StyledButtonWrapper>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          {this.renderTable()}
        </ContentsWrapper>
      </div>
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
