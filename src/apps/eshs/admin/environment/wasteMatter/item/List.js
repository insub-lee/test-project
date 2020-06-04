import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Select, Input, message } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledLineTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdLineTable = StyledLineTable(Table);
const { Option } = Select;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCd: '',
      itemNm: '',
      shape: 0,
      unit: 0,
      isTransForm: 0,
      itemList: [],
      shapeList: [],
      unitList: [],
      transFormList: [],
      orderbySelect: '1',
      searchNm: '',
    };
  }

  componentDidMount() {
    this.initDataApi();
  }

  initDataApi() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'environment',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=47',
        type: 'GET',
      },
      {
        key: 'wasteItem',
        url: `/api/eshs/v1/common/eshsWMItem?ORDER_BY=${this.state.orderbySelect}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const { result } = this.props;
    this.setState({
      itemList: result && result.wasteItem && result.wasteItem.list,
      shapeList: result && result.environment && result.environment.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 958 && f.USE_YN === 'Y'),
      unitList: result && result.environment && result.environment.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 959 && f.USE_YN === 'Y'),
      transFormList:
        result && result.environment && result.environment.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 960 && f.USE_YN === 'Y'),
    });
  };

  searchDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { searchNm, orderbySelect } = this.state;
    const apiAry = [
      {
        key: 'wasteItem',
        url: `/api/eshs/v1/common/eshsWMItem?ORDER_BY=${orderbySelect}&ITEM_NM=${searchNm}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.searchData);
  };

  searchData = () => {
    const { result } = this.props;
    this.setState({ itemList: result && result.wasteItem && result.wasteItem.list });
  };

  insertOverlab = () => {
    const { itemList, itemNm } = this.state;
    const overlab = itemList.find(item => item.ITEM_NM === itemNm);
    if (overlab) {
      message.warning('중복된 값이 존재합니다.');
    } else {
      this.onChangeData('I');
    }
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;

    const submitData = {
      ITEM_CD: value === 'I' ? '' : this.state.itemCd,
      ITEM_NM: this.state.itemNm,
      SHAPE: this.state.shape,
      UNIT: this.state.unit,
      IS_TRANS_FORM: this.state.isTransForm,
    };
    if (this.state.itemNm) {
      if (value === 'U' && this.state.itemCd) {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsWMItem', submitData, this.searchDataApi);
      } else if (value === 'D' && this.state.itemCd) {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsWMItem', submitData, this.searchDataApi);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsWMItem', submitData, this.searchDataApi);
      } else if (!this.state.itemCd) {
        message.warning('품목코드가 올바르지 않습니다.');
      }
    } else {
      message.warning('품목명을 올바르게 입력하시오.');
    }
    this.onReset();
  };

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
  };

  onReset() {
    this.setState({
      itemCd: '',
      itemNm: '',
      shape: '',
      unit: '',
      isTransForm: '',
    });
  }

  selectedRecord = record => {
    this.setState({
      itemCd: record.ITEM_CD,
      itemNm: record.ITEM_NM,
      shape: record.SHAPE,
      unit: record.UNIT,
      isTransForm: record.IS_TRANS_FORM,
    });
  };

  render() {
    const { itemList, unitList, shapeList, transFormList, itemCd, unit, shape, isTransForm, itemNm } = this.state;
    const columns = [
      {
        title: '품목코드',
        align: 'center',
        width: 100,
        children: [
          {
            title: <span className="span-item">{itemCd}</span>,
            dataIndex: 'ITEM_CD',
            align: 'center',
          },
        ],
      },
      {
        title: '품목명',
        align: 'left',
        width: 250,
        children: [
          {
            title: <AntdInput className="ant-input-sm" value={itemNm} onChange={e => this.onChangeValue('itemNm', e.target.value)} />,
            dataIndex: 'ITEM_NM',
            align: 'left',
          },
        ],
      },
      {
        title: '성상',
        align: 'center',
        width: 150,
        children: [
          {
            title: (
              <AntdSelect
                className="select-sm"
                style={{ width: '150px' }}
                onChange={value => this.onChangeValue('shape', value)}
                value={Number(shape) || (shapeList && shapeList[0] && shapeList[0].NODE_ID)}
              >
                {shapeList &&
                  shapeList.map(itme => (
                    <Option value={itme.NODE_ID} key="shape">
                      {itme.NAME_KOR}
                    </Option>
                  ))}
              </AntdSelect>
            ),
            dataIndex: 'SHAPE_NM',
            align: 'center',
          },
        ],
      },
      {
        title: '단위',
        align: 'center',
        width: 150,
        children: [
          {
            title: (
              <AntdSelect
                className="select-sm"
                style={{ width: '150px' }}
                onChange={value => this.onChangeValue('unit', value)}
                value={Number(unit) || (unitList && unitList[0] && unitList[0].NODE_ID)}
              >
                {unitList &&
                  unitList.map(itme => (
                    <Option value={itme.NODE_ID} key="unit">
                      {itme.NAME_KOR}
                    </Option>
                  ))}
              </AntdSelect>
            ),
            dataIndex: 'UNIT_NM',
            align: 'center',
          },
        ],
      },
      {
        title: '인계서발행',
        align: 'left',
        children: [
          {
            title: (
              <>
                <AntdSelect
                  className="select-sm mr5"
                  style={{ width: '150px' }}
                  onChange={value => this.onChangeValue('isTransForm', value)}
                  value={Number(isTransForm) || (transFormList && transFormList[0] && transFormList[0].NODE_ID)}
                >
                  {transFormList &&
                    transFormList.map(itme => (
                      <Option value={itme.NODE_ID} key="isTransForm">
                        {itme.NAME_KOR}
                      </Option>
                    ))}
                </AntdSelect>
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
                  <StyledButton className="btn-primary btn-sm" onClick={this.onReset}>
                    Reset
                  </StyledButton>
                </StyledButtonWrapper>
              </>
            ),
            dataIndex: 'IS_TRANS_FORM_NM',
            align: 'left',
          },
        ],
      },
    ];
    return (
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">품목명</span>
          <AntdInput
            className="ant-input-inline ant-input-mid"
            style={{ width: '200px' }}
            value={this.state.searchNm}
            onChange={e => this.onChangeValue('searchNm', e.target.value)}
          />
          <span className="textLabel">조회순서</span>
          <AntdSelect className="select-mid mr5" onChange={value => this.onChangeValue('orderbySelect', value)} value={this.state.orderbySelect}>
            <Option value="1">품목명</Option>
            <Option value="2">코드</Option>
          </AntdSelect>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={this.searchDataApi}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <AntdLineTable
          className="tableWrapper"
          rowKey={itemList && itemList.ITEM_CD}
          columns={columns}
          dataSource={itemList || []}
          bordered
          onRow={record => ({
            onClick: () => {
              this.selectedRecord(record);
            },
          })}
          footer={() => <span>{`${itemList && itemList.length} 건`}</span>}
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
