import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, message, Select, Modal, Radio } from 'antd';

import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import CompanyModal from '../CompanyModal';

const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdModal = StyledAntdModal(Modal);

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
    const { modalProps, sagaKey: id, getCallDataHandler, result } = this.props;
    return (
      <div>
        <StyledContentsWrapper>
          <StyledHtmlTable>
            <div>
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="80%" />
                </colgroup>
                <tbody>
                  {modalProps ? (
                    <tr>
                      <th>관리단위코드</th>
                      <td>{this.state.groupUnitCd}</td>
                    </tr>
                  ) : (
                    ''
                  )}
                  <tr>
                    <th>관리단위명</th>
                    <td>
                      <AntdInput
                        className="ant-input-inline"
                        style={{ width: '100%' }}
                        value={this.state.groupUnitNm}
                        onChange={e => this.changeInputValue(e)}
                        name="groupUnitNm"
                      />
                    </td>
                  </tr>

                  <tr>
                    <th>지역</th>
                    <td>
                      <AntdSelect
                        className="select-mid"
                        style={{ width: '100%' }}
                        onChange={(value, option) => this.changeSelectValue(value, option)}
                        value={this.state.siteSB}
                      >
                        {this.selectOptionRender('siteSB')}
                      </AntdSelect>
                    </td>
                  </tr>
                  <tr>
                    <th>회사</th>
                    <td>
                      <AntdInput
                        style={{ width: '100%' }}
                        className="ant-input-inline input-pointer"
                        value={this.state.companyName}
                        onClick={() => this.setState({ modalCompany: true })}
                        placeholder="여기를 클릭해주세요."
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>정수장</th>
                    <td>
                      <AntdSelect
                        className="select-mid"
                        style={{ width: '100%' }}
                        onChange={(value, option) => this.changeSelectValue(value, option)}
                        value={this.state.filterPlantSB}
                        disabled={this.state.gubun && this.state.gubun !== 'FILTER_PLANT'}
                      >
                        <Option value="0" disabled>
                          선택
                        </Option>
                        {this.selectOptionRender('filterPlantSB')}
                      </AntdSelect>
                    </td>
                  </tr>
                  <tr>
                    <th>건물/FAB</th>
                    <td>
                      <AntdSelect
                        className="select-mid"
                        style={{ width: '100%' }}
                        onChange={(value, option) => this.changeSelectValue(value, option)}
                        value={this.state.fabSB}
                        disabled={this.state.gubun && this.state.gubun !== 'FAB'}
                      >
                        <Option value="0" disabled>
                          선택
                        </Option>
                        {this.selectOptionRender('fabSB')}
                      </AntdSelect>
                    </td>
                  </tr>
                  <tr>
                    <th>처리장</th>
                    <td>
                      <AntdSelect
                        className="select-mid"
                        style={{ width: '100%' }}
                        onChange={(value, option) => this.changeSelectValue(value, option)}
                        value={this.state.treatmentPlantSB}
                        disabled={this.state.gubun && this.state.gubun !== 'TREATMENT_PLANT'}
                      >
                        <Option value="0" disabled>
                          선택
                        </Option>
                        {this.selectOptionRender('treatmentPlantSB')}
                      </AntdSelect>
                    </td>
                  </tr>
                  <tr>
                    <th>DI시설</th>
                    <td>
                      <Radio.Group onChange={e => this.onChangeRadioDI(e.target.value)} value={this.state.di}>
                        <Radio value="1">O</Radio>
                        <Radio value="0">X</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>사용여부</th>
                    <td>
                      <Radio.Group onChange={e => this.onChangeRadioDEL(e.target.value)} value={this.state.del}>
                        <Radio value="0">O</Radio>
                        <Radio value="1">X</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </StyledHtmlTable>
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
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
            <StyledButton className="btn-primary" onClick={() => this.onReset()}>
              Reset
            </StyledButton>
          </StyledButtonWrapper>
        </StyledContentsWrapper>
        <AntdModal
          className="modal-table-pad"
          visible={this.state.modalCompany}
          width="600px"
          onCancel={this.onCancel}
          destroyOnClose
          footer={null}
          title="회사 선택"
        >
          <div>
            {this.state.modalCompany && (
              <CompanyModal sagaKey={id} getCallDataHandler={getCallDataHandler} result={result} selectedModalRecord={this.selectedModalRecord} />
            )}
          </div>
        </AntdModal>
      </div>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  onEditCancel: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  modalProps: PropTypes.any,
  result: PropTypes.any,
};

List.defaultProps = {};

export default List;
