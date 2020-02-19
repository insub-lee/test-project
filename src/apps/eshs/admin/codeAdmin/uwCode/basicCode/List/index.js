import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Table, Select, Input, message } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import Moment from 'moment';

import { debounce } from 'lodash';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

const { Option } = Select;

Moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeSelectValue: '',
      inputValue: '',
      code: '',
    };
    this.changeInputValue = debounce(this.changeInputValue, 300);
    this.selectCodeApi = debounce(this.selectCodeApi, 300);
  }

  componentDidMount() {
    const { result, formData } = this.props;
    console.log(result, formData, '%%%%%%%%');
  }

  getTableColumns = () => [
    {
      title: '상태',
      dataIndex: 'IS_DEL',
      align: 'center',
      render: dataIndex => <span>{dataIndex === 0 ? '사용' : '삭제'}</span>,
    },
    {
      title: '코드',
      dataIndex: 'CODE',
      align: 'center',
    },
    {
      title: '코드명',
      dataIndex: 'NAME',
      align: 'center',
    },
  ];

  changeSelectValue = value => {
    this.setState({ changeSelectValue: value });
    this.selectCodeApi();
  };

  changeInputValue = value => {
    this.setState({ inputValue: value });
  };

  selectCodeApi() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'eshsBasicCode',
        url: `/api/eshs/v1/common/eshsbasiccode?GUBUN=${this.state.changeSelectValue}`,
        type: 'GET',
        params: {},
      },
    ];
    getCallDataHandler(id, apiAry);
    this.renderTable();
  }

  warning = value => {
    message.warning(value);
  };

  onComplete = id => {
    const { getCallDataHandler, apiAry } = this.props;
    getCallDataHandler(id, apiAry);
  };

  onSaveComplete = id => {
    const { getCallDataHandler, apiAry, removeStorageReduxState, changeFormData, sagaKey } = this.props;
    removeStorageReduxState(id, 'result');
    getCallDataHandler(id, apiAry);
    removeStorageReduxState(id, 'formData');
    changeFormData(sagaKey, 'actionType', 'I');
  };

  onSave = value => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;

    const submitData = {
      PARAM: {
        GUBUN: this.state.changeSelectValue,
        CODE: this.state.code,
        NAME: this.state.inputValue,
        IS_DEL: '0',
        CREATE_DT: Moment().format('YYYY-MM-DD hh:mm:ss'),
      },
    };
    if (this.state.inputValue && this.state.changeSelectValue) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsbasiccode', submitData, this.onSaveComplete);
      } else {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsbasiccode', submitData, this.onSaveComplete);
      }
    } else if (this.state.changeSelectValue) {
      this.warning('코드명을 올바르게 입력하시오.');
    } else {
      this.warning('코드 구분을 선택해주세요.');
    }

    this.onCancel();
  };

  onRemoveDo = isDel => {
    const { id, submitHandlerBySaga } = this.props;
    console.log('deleteCode');
    const submitData = { PARAM: { GUBUN: this.state.changeSelectValue, CODE: this.state.code, IS_DEL: isDel } };
    submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsbasiccode', submitData, this.onComplete);
    console.log('deleteCode222222');
    this.onCancel();
  };

  onCancel() {
    console.log('deleteCode3333333333');
    this.setState({
      changeSelectValue: '',
      inputValue: '',
      code: '',
    });
    console.log('deleteCode44444444');
  }

  selectedRecord = record => {
    this.setState({
      changeSelectValue: record.GUBUN,
      inputValue: record.NAME,
      code: record.CODE,
    });
  };

  renderTable() {
    const { result, columns } = this.props;
    let renderList = [
      {
        IS_DEL: (
          <StyledButton className="btn-primary btn-first" onClick={() => this.onRemoveDo('0')}>
            삭제 취소
          </StyledButton>
        ),
        CODE: this.state.code,
        NAME: (
          <>
            <Input style={{ width: '300px' }} value={this.state.inputValue} onChange={e => this.changeInputValue(e.target.value)}></Input>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onSave('I')}>
              추가
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onSave('U')}>
              수정
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onRemoveDo('1')}>
              삭제
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onCancel()}>
              Reset
            </StyledButton>
          </>
        ),
      },
    ];
    let listData;
    if (result && result.eshsBasicCode && result.eshsBasicCode.list) {
      listData = result.eshsBasicCode.list.map(item => ({
        ...item,
        IS_DEL: item.IS_DEL === '0' ? '사용중' : '삭제',
      }));
    }
    renderList = [...renderList, ...(listData || [])];

    return (
      <StyledViewDesigner>
        <Sketch>
          <Group>
            <AntdTable
              rowKey={`${renderList.GUBUN}_${renderList.CODE}`}
              columns={columns}
              dataSource={renderList}
              bordered
              onRow={record => ({
                onClick: () => {
                  this.selectedRecord(record);
                },
              })}
            />
          </Group>
        </Sketch>
      </StyledViewDesigner>
    );
  }

  render() {
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <>
          <Row>
            <Col span={4}>
              <Select style={{ width: '200px' }} onChange={value => this.changeSelectValue(value)} defaultValue="DISCHARGE">
                <Option value="DISCHARGE">방구류</Option>
                <Option value="MEDICINE">약품</Option>
                <Option value="FILTER_PLANT">정수장</Option>
                <Option value="TREATMENT_PLANT">처리장</Option>
                <Option value="CHK_VALUE_TYPE">측정값 종류</Option>
              </Select>
            </Col>
            <Col span={4}></Col>
            <Col span={8}></Col>
          </Row>
          {this.renderTable()}
        </>
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
      title: '상태',
      dataIndex: 'IS_DEL',
      align: 'center',
    },
    {
      title: '코드',
      dataIndex: 'CODE',
      align: 'center',
    },
    {
      title: '코드명',
      dataIndex: 'NAME',
      align: 'left',
    },
  ],
};

export default List;
