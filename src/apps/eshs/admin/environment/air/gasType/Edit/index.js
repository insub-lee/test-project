import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, message, Modal, Row, Col } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';

import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { debounce } from 'lodash';
import UnitType from '../../unitType';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gasCd: '',
      gasNm: '',
      permissionDensity: '',
      gasWeight: '',
      unit: '',
      modalUnit: false,
    };
  }

  componentDidMount() {
    const { modalProps } = this.props;
    if (modalProps) {
      this.setState({
        gasCd: modalProps.gasCd,
        gasNm: modalProps.gasNm,
        permissionDensity: modalProps.permissionDensity,
        gasWeight: modalProps.gasWeight,
        unit: modalProps.unit,
      });
    }
  }

  changeInputValue = e => {
    if (e.target.name === 'permissionDensity' || e.target.name === 'gasWeight') {
      this.setState({ [e.target.name]: e.target.value.replace(/[^0-9.]/g, '') });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga, onEditCancel, getCallDataHandler } = this.props;

    const submitData = {
      PARAM: {
        GAS_CD: this.state.gasCd, // 가스종류코드
        GAS_NM: this.state.gasNm, // 가스종류명
        PERMISSION_DENSITY: Number(this.state.permissionDensity), // 법적 배출 허용 농도
        GAS_WEIGHT: Number(this.state.gasWeight), // 분자량
        UNIT: this.state.unit, // 단위
      },
    };
    const apiAry = [
      {
        key: 'insertGasType',
        url: '/api/eshs/v1/common/eshsgastype',
        type: 'POST',
        params: submitData,
      },
    ];
    if (this.state.gasNm) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsgastype', submitData, onEditCancel);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsgastype', submitData, onEditCancel);
      } else {
        getCallDataHandler(id, apiAry, this.overlab);
      }
    } else {
      message.warning('가스종류명 올바르게 입력하시오.');
    }

    this.onReset();
  };

  overlab = () => {
    const { result, onEditCancel } = this.props;
    if (result.insertGasType.result === -1) {
      message.warning('중복된 가스종류가 있습니다.');
    } else {
      onEditCancel();
    }
  };

  onReset = () => {
    this.setState({ gasCd: '', gasNm: '', permissionDensity: '', gasWeight: '', unit: '', modalUnit: false });
  };

  onCancel = () => {
    this.setState({ modalUnit: false });
  };

  onUnitValueChange = unit => {
    this.setState({ unit, modalUnit: false });
  };

  isOpenEdit = () => {
    this.setState({ modalUnit: true });
  };

  onUnitTemplate = () => <UnitType onUnitValueChange={this.onUnitValueChange} />;

  render() {
    const { modalProps, onCancel } = this.props;
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <h3>가스종류 등록</h3>
            <Group>
              <div>
                {modalProps ? (
                  <Row type="flex" justify="center" style={{ margin: '10px' }}>
                    <Col span={5}>가스종류코드</Col>
                    <Col span={18}>{this.state.gasCd}</Col>
                  </Row>
                ) : (
                  ''
                )}
                <Row type="flex" justify="center" style={{ margin: '10px' }}>
                  <Col span={5}>가스종류명</Col>
                  <Col span={18}>
                    <Input style={{ width: '250px' }} value={this.state.gasNm} onChange={e => this.changeInputValue(e)} name="gasNm" />
                  </Col>
                </Row>

                <Row type="flex" justify="center" style={{ margin: '10px' }}>
                  <Col span={5}>가스분자량</Col>
                  <Col span={18}>
                    <Input
                      style={{ width: '250px' }}
                      value={this.state.gasWeight}
                      onChange={e => this.changeInputValue(e)}
                      name="gasWeight"
                      placeholder="숫자만 입력해주세요."
                    />
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '10px' }}>
                  <Col span={5}>법적허용농도</Col>
                  <Col span={18}>
                    <Input
                      style={{ width: '250px' }}
                      value={this.state.permissionDensity}
                      onChange={e => this.changeInputValue(e)}
                      name="permissionDensity"
                      placeholder="숫자만 입력해주세요."
                    />
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '10px' }}>
                  <Col span={5}>단위</Col>
                  <Col span={18}>
                    <Input
                      style={{ width: '250px', cursor: 'pointer' }}
                      value={this.state.unit}
                      onClick={() => this.setState({ modalUnit: true })}
                      placeholder="여기를 클릭해주세요."
                    />
                  </Col>
                </Row>
              </div>
              <div className="alignRight">
                {!modalProps ? (
                  <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('I')}>
                    저장
                  </StyledButton>
                ) : (
                  <>
                    <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('U')}>
                      수정
                    </StyledButton>
                    <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('D')}>
                      삭제
                    </StyledButton>
                  </>
                )}
                <StyledButton className="btn-primary btn-first" onClick={onCancel}>
                  취소
                </StyledButton>
              </div>
              <Modal visible={this.state.modalUnit} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
                <div>{this.state.modalUnit && this.onUnitTemplate()}</div>
              </Modal>
            </Group>
          </Sketch>
        </StyledViewDesigner>
      </div>
    );
  }
}

List.propTypes = {
  submitHandlerBySaga: PropTypes.func,
};

List.defaultProps = {
  submitHandlerBySaga: () => {},
  formData: {},
};

export default List;
