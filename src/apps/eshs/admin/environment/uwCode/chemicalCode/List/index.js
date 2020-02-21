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
      medicineValue: '',
      medicineName: '',
      medicineCd: '',
      density: '',
      onMedicineCodeModal: false,
      densityReadOnly: false,
    };
  }

  componentDidMount() {
    this.selectCodeApi();
  }

  changeSelectValue = value => {
    this.setState({ changeSelectValue: value, densityReadOnly: false, medicineValue: '', medicineName: '', medicineCd: '', density: '' });
    this.seletList(value);
  };

  changeInputValue = e => {
    if (e.target.name === 'medicineValue') {
      this.setState({ [e.target.name]: e.target.value.replace(/[^0-9]/g, '') });
    } else {
      this.setState({ [e.target.name]: e.target.value.replace(/[^0-9.]/g, '') });
    }
  };

  selectCodeApi() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'selectData',
        url: '/api/eshs/v1/common/eshsbasiccode/CM?GUBUN=SITE',
        type: 'GET',
      },
      {
        key: 'modalData',
        url: '/api/eshs/v1/common/eshsbasiccode/UW?GUBUN=MEDICINE',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry);
  }

  callBack = () => {
    this.seletList(this.state.changeSelectValue);
  };

  seletList = value => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'listData',
        url: `/api/eshs/v1/common/eshschemicalcode?SITE=${value}`,
        type: 'GET',
      },
    ];
    if (value) {
      getCallDataHandler(id, apiAry);
      this.renderTable();
    } else {
      this.warning('코드 구분을 선택해주세요.');
    }
  };

  warning = value => {
    message.warning(value);
  };

  onChagneData = value => {
    const { sagaKey: id, submitHandlerBySaga, result } = this.props;
    if (value === 'I') {
      const overlap =
        result && result.listData && result.listData.list.find(item => item.MEDICINE_CD === this.state.medicineCd && item.DENSITY === this.state.density);
      if (overlap) {
        return this.warning('이미 입력된 값입니다.');
      }
    }

    const submitData = {
      PARAM: {
        MEDICINE_CD: this.state.medicineCd,
        DENSITY: this.state.density,
        SITE: this.state.changeSelectValue,
        STANDARD_PRICE_UNIT: this.state.medicineValue.replace(/[^\d]+/g, ''),
      },
    };
    if (this.state.medicineValue && this.state.changeSelectValue) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshschemicalcode', submitData, this.callBack);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshschemicalcode', submitData, this.callBack);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshschemicalcode', submitData, this.callBack);
      }
    } else if (this.state.changeInputValue) {
      this.warning('지역 구분을 선택해주세요.');
    } else {
      this.warning('단가를 입력해주세요.');
    }

    this.onReset();
  };

  onReset() {
    this.setState({
      medicineValue: '',
      medicineName: '',
      medicineCd: '',
      density: '',
      densityReadOnly: false,
    });
  }

  onModalList() {
    const { result } = this.props;
    const modalColumns = [
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
    const codeList = result && result.modalData && result.modalData.list ? result.modalData.list : [];

    return (
      <AntdTable
        rowKey={`${codeList.GUBUN}_${codeList.CODE}`}
        columns={modalColumns}
        dataSource={codeList}
        bordered
        onRow={record => ({
          onClick: () => {
            this.setState({
              onMedicineCodeModal: false,
              medicineName: record.NAME,
              medicineCd: record.CODE,
              density: '',
              medicineValue: '',
              densityReadOnly: false,
            });
          },
        })}
      />
    );
  }

  renderTable() {
    const { result, columns } = this.props;
    let renderList = [
      {
        MEDICINE_CD: <Input value={this.state.medicineCd} readOnly onClick={() => this.setState({ onMedicineCodeModal: true })} />,
        MEDICINE_CD_NAME: this.state.medicineName,
        DENSITY: <Input value={this.state.density} onChange={e => this.changeInputValue(e)} readOnly={this.state.densityReadOnly} name="density" />,
        STANDARD_PRICE_UNIT: (
          <div style={{ align: 'left' }}>
            <Input
              style={{ width: '300px' }}
              value={this.state.medicineValue.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')}
              onChange={e => this.changeInputValue(e)}
              name="medicineValue"
            />
            <StyledButton className="btn-primary btn-first" onClick={() => this.onChagneData('I')}>
              추가
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onChagneData('U')}>
              수정
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onChagneData('D')}>
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
    if (result && result.listData && result.listData.list) {
      listData = result.listData.list.map(item => ({
        ...item,
        STANDARD_PRICE_UNIT: item.STANDARD_PRICE_UNIT.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'),
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
            if (typeof record.DENSITY === 'number') {
              this.setState({
                medicineCd: record.MEDICINE_CD,
                medicineName: record.MEDICINE_CD_NAME,
                changeSelectValue: record.SITE,
                density: record.DENSITY,
                medicineValue: record.STANDARD_PRICE_UNIT,
                densityReadOnly: true,
              });
            }
          },
        })}
      />
    );
  }

  renderSelect = () => {
    const { result } = this.props;
    return (
      <Row>
        <Col span={4}>
          <Select style={{ width: '200px' }} onChange={value => this.changeSelectValue(value)} defaultValue="0">
            <Option value="0" disabled>
              선택
            </Option>
            {result && result.selectData && result.selectData.list.map(itme => <Option value={itme.CODE}>{itme.NAME}</Option>)}
          </Select>
        </Col>
        <Col span={4}>
          <StyledButton className="btn-primary btn-first" onClick={() => this.changeSelectValue(this.state.changeSelectValue)}>
            검색
          </StyledButton>
        </Col>
      </Row>
    );
  };

  render() {
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              {this.renderSelect()}
              {this.renderTable()}
              <Modal
                visible={this.state.onMedicineCodeModal}
                width="400px"
                onCancel={() => this.setState({ onMedicineCodeModal: false })}
                destroyOnClose
                footer={[]}
              >
                {this.state.onMedicineCodeModal ? this.onModalList() : ''}
              </Modal>
            </Group>
          </Sketch>
        </StyledViewDesigner>
      </div>
    );
  }
}

List.propTypes = {
  result: PropTypes.array,
  columns: PropTypes.array,
  getCallDataHandler: PropTypes.func,
};

List.defaultProps = {
  getCallDataHandler: () => {},
  columns: [
    {
      title: '약품코드',
      dataIndex: 'MEDICINE_CD',
      align: 'center',
      width: 150,
    },
    {
      title: '약품명',
      dataIndex: 'MEDICINE_CD_NAME',
      align: 'center',
      width: 300,
    },
    {
      title: '농도(%)',
      dataIndex: 'DENSITY',
      align: 'center',
      width: 150,
    },
    {
      title: '단가(원/Kg)',
      dataIndex: 'STANDARD_PRICE_UNIT',
      align: 'center',
    },
  ],
};

export default List;
