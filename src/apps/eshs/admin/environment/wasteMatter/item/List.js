import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Select, Input, message } from 'antd';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';

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
      shape: '961',
      unit: '965',
      isTransForm: '970',
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

  searchData = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { searchNm, orderbySelect } = this.state;
    const apiAry = [
      {
        key: 'wasteItem',
        url: `/api/eshs/v1/common/eshsWMItem?ORDER_BY=${orderbySelect}&ITEM_NM=${searchNm}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
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
    const { itemList, itemNm } = this.state;
    const overlab = itemList.find(item => item.ITEM_NM === itemNm);
    if (overlab) {
      this.warning('중복된 값이 존재합니다.');
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
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsWMItem', submitData, this.searchData);
      } else if (value === 'D' && this.state.itemCd) {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsWMItem', submitData, this.searchData);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsWMItem', submitData, this.searchData);
      } else if (!this.state.itemCd) {
        this.warning('품목코드가 올바르지 않습니다.');
      }
    } else {
      this.warning('품목명을 올바르게 입력하시오.');
    }
    this.onReset();
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
      <AntdSelect
        onChange={(value, option) => this.changeSelectValue(value, option)}
        value={Number(this.state[key]) || (selectData && selectData[0] && selectData[0].NODE_ID)}
      >
        {selectData &&
          selectData.map(itme => (
            <Option value={itme.NODE_ID} key={key}>
              {itme.NAME_KOR}
            </Option>
          ))}
      </AntdSelect>
    );
  };

  renderTable() {
    const { itemList } = this.state;
    const columns = [
      {
        title: '품목코드',
        align: 'center',
        width: 100,
        children: [
          {
            title: <>{this.state.itemCd}</>,
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
            title: <Input value={this.state.itemNm} onChange={e => this.changeInputValue(e)} name="itemNm" />,
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
            title: <>{this.renderSelect('shape')}</>,
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
            title: <>{this.renderSelect('unit')}</>,
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
                {this.renderSelect('isTransForm')}
                <StyledButtonWrapper className="btn-wrap-inline">
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
    );
  }

  selectedRecord = record => {
    if (typeof record.ITEM_NM === 'string') {
      this.setState({
        itemCd: record.ITEM_CD,
        itemNm: record.ITEM_NM,
        shape: record.SHAPE,
        unit: record.UNIT,
        isTransForm: record.IS_TRANS_FORM,
      });
    }
  };

  render() {
    return (
      <ContentsWrapper>
        <div>
          <span>품목명</span>
          <AntdInput style={{ width: '200px', margin: '10px' }} value={this.state.searchNm} onChange={e => this.changeInputValue(e)} name="searchNm" />
          <span>조회순서</span>
          <AntdSelect
            style={{ width: '100px', margin: '10px' }}
            onChange={(value, option) => this.changeSelectValue(value, option)}
            value={this.state.orderbySelect}
          >
            <Option value="1" key="orderbySelect">
              품목명
            </Option>
            <Option value="2" key="orderbySelect">
              코드
            </Option>
          </AntdSelect>
          <StyledButton className="btn-primary btn-first" onClick={() => this.searchData()}>
            검색
          </StyledButton>
        </div>
        {this.renderTable()}
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
