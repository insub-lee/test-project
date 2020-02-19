import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Table, Select, Input, message, Modal } from 'antd';

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
      medicine_name: '',
      medicine_cd: '',
      density: '',
      onMedicineCodeModal: false,
    };
  }

  componentDidUpdate() {}

  changeSelectValue = value => {
    this.setState({ changeSelectValue: value });
  };

  changeInputValue = value => {
    this.setState({ inputValue: value });
  };

  callBackApi = () => {};

  selectCodeApi() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'eshsBasicCode',
        url: '/api/eshs/v1/common/eshsbasiccode/?GUBUN=MEDICINE',
        type: 'GET',
        params: {},
      },
    ];
    getCallDataHandler(id, apiAry);
    this.onModalList();
  }

  warning = value => {
    message.warning(value);
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
      if (value === 'U' && this.state.code) {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/', submitData, this.callBackApi);
      } else {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/', submitData, this.callBackApi);
      }
    } else if (this.state.changeSelectValue) {
      this.warning('코드명을 올바르게 입력하시오.');
    } else {
      this.warning('코드 구분을 선택해주세요.');
    }

    this.onReset();
  };

  onRemoveDo = isDel => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const submitData = { PARAM: { GUBUN: this.state.changeSelectValue, CODE: this.state.code, IS_DEL: isDel } };
    submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/', submitData, this.callBackApi);
  };

  onReset() {
    this.setState({
      inputValue: '',
      code: '',
    });
  }

  onCancel = () => {
    this.setState({
      onMedicineCodeModal: false,
    });
  };

  selectedRecord = record => {
    if (record.COMPANY_CD) {
      this.setState({
        changeSelectValue: record.GUBUN,
        inputValue: record.NAME,
        code: record.CODE,
      });
    }
  };

  onModalOpen() {
    this.setState({ onMedicineCodeModal: true });
    this.selectCodeApi();
  }

  onModalList() {
    const { result } = this.props;
    const codeColumns = [
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
    ];
    const codeList = result && result.eshsBasicCode && result.eshsBasicCode.list ? result.eshsBasicCode.list : [];

    return (
      <AntdTable
        rowKey={`${codeList.GUBUN}_${codeList.CODE}`}
        columns={codeColumns}
        dataSource={codeList}
        bordered
        onRow={record => ({
          onClick: () => {
            this.selectedCodeRecord(record);
          },
        })}
      />
    );
  }

  selectedCodeRecord = record => {
    this.setState({ onMedicineCodeModal: false, medicine_name: record.NAME, medicine_cd: record.CODE });
  };

  renderTable() {
    const { result, columns } = this.props;
    let renderList = [
      {
        MEDICINE_CD: <Input style={{ width: '200px' }} value={this.state.medicine_cd} readOnly onClick={() => this.onModalOpen()} />,
        MEDICINE_NAME: this.state.medicine_name,
        DENSITY: this.state.density,
        STANDARD_PRICE_UNIT: (
          <div style={{ align: 'left' }}>
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
            <StyledButton className="btn-primary btn-first" onClick={() => this.onReset()}>
              Reset
            </StyledButton>
          </div>
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

  render() {
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <Row>
                <Col span={4}>
                  <Select style={{ width: '200px' }} onChange={value => this.changeSelectValue(value)} defaultValue="0">
                    <Option value="0" disabled>
                      선택
                    </Option>
                    <Option value="청주">청주</Option>
                    <Option value="청주">구미</Option>
                    <Option value="청주">서울</Option>
                  </Select>
                </Col>
                <Col span={4}>
                  <StyledButton className="btn-primary btn-first">검색</StyledButton>
                </Col>
              </Row>
              {this.renderTable()}
              <Modal visible={this.state.onMedicineCodeModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
                {this.state.onMedicineCodeModal ? this.onModalList() : ''}
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
      title: '약품코드',
      dataIndex: 'MEDICINE_CD',
      align: 'center',
    },
    {
      title: '약품명',
      dataIndex: 'MEDICINE_NAME',
      align: 'left',
    },
    {
      title: '농도(%)',
      dataIndex: 'DENSITY',
      align: 'center',
    },
    {
      title: '단가(원/Kg)',
      dataIndex: 'STANDARD_PRICE_UNIT',
      align: 'center',
    },
  ],
};

export default List;
