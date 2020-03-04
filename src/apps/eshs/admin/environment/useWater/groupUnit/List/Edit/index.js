import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, message, Select, Modal, Row, Col, Radio } from 'antd';
import StyledButton from 'apps/mdcs/styled/StyledButton';

import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import CompanyModal from '../../CompanyModal';

const { Option } = Select;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupUnitCd: '', // 관리단위코드:주로 FAB기준이며,회사단위일 경우도 있슴.정수장
      groupUnitNm: '', // 관리단위명
      siteSB: '청주', // 지역
      companyCd: '', // 회사코드:하이닉스,하이디스,LCD,
      companyName: '',
      gubun: '', // 관리단위구분:정수장,건물FAB,처리장,기타의 구분자 (코드테이블 gubun값, ETC)
      filterPlantSB: '0', // 정수장 코드(관리단위가 정수장일 경우만 관리)
      fabSB: '0', // 건물FAB(관리단위가 건물FAB일 경우만 관리)
      treatmentPlantSB: '0', // 처리장코드(관리단위가 처리장일 경우만 관리)
      di: '1', // DI생산시설여부
      del: '0', // 삭제여부
      modalCompany: false,
    };
  }

  componentDidMount() {
    const { modalProps } = this.props;
    if (modalProps) {
      this.setState({
        groupUnitCd: modalProps.groupUnitCd,
        groupUnitNm: modalProps.groupUnitNm,
        siteSB: modalProps.siteSBV,
        companyName: modalProps.companyName,
        companyCd: modalProps.companyCd,
        gubun: modalProps.gubun,
        filterPlantSB: modalProps.filterPlantSBV,
        fabSB: modalProps.fabSBV,
        treatmentPlantSB: modalProps.treatmentPlantSBV,
        di: modalProps.di,
        del: modalProps.del,
      });
    }
  }

  changeInputValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeRadioDEL = value => {
    console.log(value, 'radio');
    this.setState({ del: value });
  };

  onChangeRadioDI = value => {
    this.setState({ di: value });
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga, onEditCancel } = this.props;

    const submitData = {
      PARAM: {
        GROUP_UNIT_CD: this.state.groupUnitCd, // 관리단위코드
        GROUP_UNIT_NM: this.state.groupUnitNm, // 관리단위명
        SITE: this.state.siteSB, // 지역
        COMPANY_CD: this.state.companyCd, // 회사코드:하이닉스,하이디스,LCD,
        GUBUN: this.state.gubun, // 관리단위구분
        FILTER_PLANT_CD: this.state.filterPlantSB === '0' ? '' : this.state.filterPlantSB, // 정수장 코드(관리단위구분이 정수장일 경우만 관리)
        FAB: this.state.fabSB === '0' ? '' : this.state.fabSB, // 건물FAB(관리단위구분이 건물FAB일 경우만 관리)
        TREATMENT_PLANT_CD: this.state.treatmentPlantSB === '0' ? '' : this.state.treatmentPlantSB, // 처리장코드(관리단위구분이 처리장일 경우만 관리)
        IS_DI: this.state.di, // DI생산시설여부
        IS_DEL: this.state.del, // 삭제여부
      },
    };
    if (this.state.groupUnitNm) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsgroupunit', submitData, onEditCancel);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsgroupunit', submitData, onEditCancel);
      } else {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsgroupunit', submitData, onEditCancel);
      }
    } else {
      message.warning('관리단위명을 올바르게 입력하시오.');
    }

    this.onReset();
  };

  onReset() {
    this.setState({
      groupUnitNm: '',
      siteSB: '청주',
      companyCd: '',
      companyName: '',
      gubun: '',
      filterPlantSB: '0',
      fabSB: '0',
      treatmentPlantSB: '0',
      di: '0',
      del: '0',
    });
  }

  onCancel = () => {
    this.setState({ modalCompany: false });
  };

  changeSelectValue = (value, option) => {
    if (option.key === 'filterPlantSB') {
      this.setState({
        gubun: 'FILTER_PLANT',
      });
    }
    if (option.key === 'fabSB') {
      this.setState({
        gubun: 'FAB',
      });
    }
    if (option.key === 'treatmentPlantSB') {
      this.setState({
        gubun: 'TREATMENT_PLANT',
      });
    }
    this.setState({
      [option.key]: value,
    });
  };

  selectOptionRender = codegubun => {
    const selectData =
      this.props[`${codegubun}`] &&
      this.props[`${codegubun}`].map(item => (
        <Option value={item.CODE} key={codegubun}>
          {item.NAME_KOR}
        </Option>
      ));
    return selectData;
  };

  selectedModalRecord = record => {
    this.setState({
      companyName: record.HST_CMPNY_NM,
      companyCd: record.HST_CMPNY_CD,
      modalCompany: false,
    });
  };

  render() {
    const { modalProps } = this.props;
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <div>
                {modalProps ? (
                  <Row type="flex" justify="center" style={{ margin: '10px' }}>
                    <Col span={4}>관리단위코드</Col>
                    <Col span={16}>{this.state.groupUnitCd}</Col>
                  </Row>
                ) : (
                  ''
                )}
                <Row type="flex" justify="center" style={{ margin: '10px' }}>
                  <Col span={4}>관리단위명</Col>
                  <Col span={16}>
                    <Input style={{ width: '250px' }} value={this.state.groupUnitNm} onChange={e => this.changeInputValue(e)} name="groupUnitNm" />
                  </Col>
                </Row>

                <Row type="flex" justify="center" style={{ margin: '10px' }}>
                  <Col span={4}>지역</Col>
                  <Col span={16}>
                    <Select onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.siteSB}>
                      {this.selectOptionRender('siteSB')}
                    </Select>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '10px' }}>
                  <Col span={4}>회사</Col>
                  <Col span={16}>
                    <Input
                      style={{ width: '250px', cursor: 'pointer' }}
                      value={this.state.companyName}
                      onClick={() => this.setState({ modalCompany: true })}
                      placeholder="여기를 클릭해주세요."
                    />
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '10px' }}>
                  <Col span={4}>정수장</Col>
                  <Col span={16}>
                    <Select
                      onChange={(value, option) => this.changeSelectValue(value, option)}
                      value={this.state.filterPlantSB}
                      style={{ width: '130px' }}
                      disabled={this.state.gubun && this.state.gubun !== 'FILTER_PLANT'}
                    >
                      <Option value="0" disabled>
                        선택
                      </Option>
                      {this.selectOptionRender('filterPlantSB')}
                    </Select>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '10px' }}>
                  <Col span={4}>건물/FAB</Col>
                  <Col span={16}>
                    <Select
                      onChange={(value, option) => this.changeSelectValue(value, option)}
                      value={this.state.fabSB}
                      style={{ width: '130px' }}
                      disabled={this.state.gubun && this.state.gubun !== 'FAB'}
                    >
                      <Option value="0" disabled>
                        선택
                      </Option>
                      {this.selectOptionRender('fabSB')}
                    </Select>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '10px' }}>
                  <Col span={4}>처리장</Col>
                  <Col span={16}>
                    <Select
                      onChange={(value, option) => this.changeSelectValue(value, option)}
                      value={this.state.treatmentPlantSB}
                      style={{ width: '130px' }}
                      disabled={this.state.gubun && this.state.gubun !== 'TREATMENT_PLANT'}
                    >
                      <Option value="0" disabled>
                        선택
                      </Option>
                      {this.selectOptionRender('treatmentPlantSB')}
                    </Select>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '10px' }}>
                  <Col span={4}>DI시설</Col>
                  <Col span={16}>
                    <Radio.Group onChange={e => this.onChangeRadioDI(e.target.value)} value={this.state.di}>
                      <Radio value="1">O</Radio>
                      <Radio value="0">X</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '10px' }}>
                  <Col span={4}>사용여부</Col>
                  <Col span={16}>
                    <Radio.Group onChange={e => this.onChangeRadioDEL(e.target.value)} value={this.state.del}>
                      <Radio value="0">O</Radio>
                      <Radio value="1">X</Radio>
                    </Radio.Group>
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
                <StyledButton className="btn-primary btn-first" onClick={() => this.onReset()}>
                  Reset
                </StyledButton>
              </div>
              <Modal visible={this.state.modalCompany} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
                <div>{this.state.modalCompany && <CompanyModal {...this.props} selectedModalRecord={this.selectedModalRecord} />}</div>
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
};

export default List;
