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
    this.selectCodeApi = debounce(this.selectCodeApi, 300);
  }

  componentDidUpdate() {}

  changeSelectValue = value => {
    this.setState({ changeSelectValue: value });
    this.selectCodeApi();
  };

  changeInputValue = value => {
    this.setState({ inputValue: value });
  };

  callBackApi = () => {
    this.selectCodeApi();
  };

  selectDataApi() {
    const { sagaKey: id, getCallDataHandler, tableName } = this.props;
    const apiAry = [
      {
        key: 'selectData',
        url: `/api/eshs/v1/common/EshsCodeGubun/${tableName}`,
        type: 'GET',
        params: {},
      },
    ];
    getCallDataHandler(id, apiAry);
    this.renderSelect();
  }

  selectCodeApi() {
    const { sagaKey: id, getCallDataHandler, tableName } = this.props;
    const apiAry = [
      {
        key: 'eshsBasicCode',
        url: `/api/eshs/v1/common/eshsbasiccode/${tableName}?GUBUN=${this.state.changeSelectValue}`,
        type: 'GET',
        params: {},
      },
    ];
    if (this.state.changeSelectValue) {
      getCallDataHandler(id, apiAry);
      this.renderTable();
    } else {
      this.warning('코드 구분을 선택해주세요.');
    }
  }

  warning = value => {
    message.warning(value);
  };

  onSave = value => {
    const { sagaKey: id, submitHandlerBySaga, tableName } = this.props;

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
      if (value === 'U' && this.state.code) {
        submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshsbasiccode/${tableName}`, submitData, this.callBackApi);
      } else {
        submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshsbasiccode/${tableName}`, submitData, this.callBackApi);
      }
    } else if (this.state.changeSelectValue) {
      this.warning('코드명을 올바르게 입력하시오.');
    } else {
      this.warning('코드 구분을 선택해주세요.');
    }

    this.onCancel();
  };

  onRemoveDo = isDel => {
    const { sagaKey: id, submitHandlerBySaga, tableName } = this.props;
    const submitData = { PARAM: { GUBUN: this.state.changeSelectValue, CODE: this.state.code, IS_DEL: isDel } };
    submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshsbasiccode/${tableName}`, submitData, this.callBackApi);
  };

  onCancel() {
    this.setState({
      inputValue: '',
      code: '',
    });
  }

  selectedRecord = record => {
    if (record.COMPANY_CD) {
      this.setState({
        changeSelectValue: record.GUBUN,
        inputValue: record.NAME,
        code: record.CODE,
      });
    }
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
    );
  }

  renderSelect() {
    const { tableName, result } = this.props;

    console.log(result, '&&&&&&&&');
    return (
      <Col span={4}>
        <Select style={{ width: '200px' }} onChange={value => this.changeSelectValue(value)} defaultValue="0">
          <Option value="0" disabled>
            선택
          </Option>
          <Option value="DISCHARGE">방구류</Option>
          {result && result.selectData && result.selectData.codeList.map(itme => <Option value={itme.gubun}>{itme.gubun_nm}</Option>)}
        </Select>
      </Col>
    );
  }

  render() {
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <Row>
                {this.renderSelect()}
                <Col span={4}>
                  <StyledButton className="btn-primary btn-first" onClick={() => this.selectCodeApi()}>
                    검색
                  </StyledButton>
                  <StyledButton className="btn-primary btn-first">엑셀받기</StyledButton>
                </Col>
              </Row>
              {this.renderTable()}
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
