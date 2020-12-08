import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from 'antd';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import GasSensorListTable from '../infoTable/gasSensorListTable';
import FormDataTable from '../infoTable/formDataTable';
import ExcelDown from '../excelDown';

const AntdModal = StyledContentsModal(Modal);

class GasSensorListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      formData: {},
      listData: [], // Chemical-Fab-List
    };
  }

  // 모달 핸들러 (입력수정에 맞춰 formData 수정도 함께)
  handleModal = (type, visible, etc) => {
    let title = '';
    let etcData = {};
    switch (type) {
      case 'INPUT':
        title = '사용정보 등록 (Sensor)';
        break;
      case 'MODIFY':
        title = '사용정보 수정 (Sensor)';
        etcData = etc;
        break;
      default:
        break;
    }
    this.setState({
      modalType: type,
      modalTitle: title,
      modalVisible: visible,
      formData: etcData,
    });
  };

  // 폼데이터 수정
  onChangeFormData = (field, val) => {
    const { formData } = this.state;
    let scheDt = formData.SENSOR_SCHEDT || '';
    switch (field) {
      case 'SENSOR_CHECKDT':
        scheDt = val;
        if (val !== '' && formData.SENSOR_CYCLE >= 0) {
          scheDt = moment(val, 'YYYYMMDD')
            .add(formData.SENSOR_CYCLE, 'year')
            .format('YYYYMMDD');
        } else {
          scheDt = '';
        }
        this.setState({
          formData: {
            ...formData,
            [field]: val,
            SENSOR_SCHEDT: scheDt,
          },
        });
        break;
      case 'SENSOR_CYCLE':
        if (formData.SENSOR_CHECKDT && formData.SENSOR_CHECKDT !== '' && formData.SENSOR_CHECKDT !== null) {
          scheDt = moment(formData.SENSOR_CHECKDT, 'YYYYMMDD')
            .add(val, 'year')
            .format('YYYYMMDD');
        }
        this.setState({
          formData: {
            ...formData,
            [field]: val,
            SENSOR_SCHEDT: scheDt,
          },
        });
        break;
      default:
        this.setState({
          formData: {
            ...formData,
            [field]: val,
          },
        });
        break;
    }
  };

  // 저장 수정 삭제
  submitFormData = apiType => {
    const { sagaKey: id, submitHandlerBySaga, site } = this.props;
    const { formData } = this.state;
    const submitData = {
      PARAM: {
        ...formData,
        TYPE: 'sensor',
        SITE: site,
      },
    };

    let isValid = false;
    switch (apiType) {
      case 'NEW':
        isValid = this.validChecker(formData);
        if (isValid) submitHandlerBySaga(id, 'POST', '/api/gcs/v1/common/gas/manage', submitData, this.addCollback);
        break;
      case 'MODIFY':
        isValid = this.validChecker(formData);
        if (isValid) submitHandlerBySaga(id, 'PUT', '/api/gcs/v1/common/gas/manage', submitData, this.updateCollback);
        break;
      case 'DELETE':
        submitHandlerBySaga(id, 'DELETE', '/api/gcs/v1/common/gas/manage', submitData, this.deleteCollback);
        break;
      default:
        break;
    }
  };

  validChecker = formData => {
    if (!formData.SENSORNO || formData.SENSORNO === '') {
      message.error(<MessageContent>감지기 번호는 필수값 입니다.</MessageContent>);
      return false;
    }
    if (!formData.SENSORSEL || formData.SENSORNO === '') {
      message.error(<MessageContent>감지대상은 필수값 입니다.</MessageContent>);
      return false;
    }
    if (!formData.SENSOR_CHECKDT || formData.SENSORNO === '') {
      message.error(<MessageContent>교체/점검일은 필수값 입니다.</MessageContent>);
      return false;
    }
    return true;
  };

  // 저장 콜백
  addCollback = (id, response) => {
    const { onSearch } = this.props;
    const { listData } = this.state;
    const { result, param } = response;
    const nextListData = listData.concat(param);
    if (result === 'fail') return message.error(<MessageContent>Sensor 정보 저장에 실패하였습니다.</MessageContent>);
    return this.setState(
      {
        listData: nextListData,
        modalType: '',
        modalTitle: '',
        modalVisible: false,
        formData: {},
      },
      () => message.success(<MessageContent>Sensor 정보를 추가하였습니다.</MessageContent>),
      onSearch(),
    );
  };

  // 수정콜백
  updateCollback = (id, response) => {
    const { listData } = this.state;
    const { result, param } = response;
    const nextListData = listData.map(data => {
      if (Number(data.NO) === Number(param.NO)) {
        return {
          ...param,
        };
      }
      return data;
    });
    if (result === 'fail') return message.error(<MessageContent>Sensor 정보 수정에 실패하였습니다.</MessageContent>);
    return this.setState(
      {
        listData: nextListData,
        modalType: '',
        modalTitle: '',
        modalVisible: false,
        formData: {},
      },
      () => message.success(<MessageContent>Sensor 정보를 수정하였습니다.</MessageContent>),
    );
  };

  // 삭제 콜백
  deleteCollback = (id, response) => {
    const { listData } = this.state;
    const { result, param } = response;
    const nextListData = listData.filter(data => Number(data.NO) !== Number(param.NO));
    if (result === 'fail') return message.error(<MessageContent>Sensor 정보 삭제에 실패하였습니다.</MessageContent>);
    return this.setState(
      {
        listData: nextListData,
        modalType: '',
        modalTitle: '',
        modalVisible: false,
        formData: {},
      },
      () => message.success(<MessageContent>Sensor 정보를 삭제하였습니다.</MessageContent>),
    );
  };

  render() {
    const { listData } = this.props;
    const { modalType, modalTitle, modalVisible, formData } = this.state;
    return (
      <>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <ExcelDown dataList={listData} />
          <StyledButton className="btn-primary btn-sm btn-first ml5" onClick={() => this.handleModal('INPUT', true)}>
            새등록
          </StyledButton>
        </StyledButtonWrapper>
        <ContentsWrapper>
          <GasSensorListTable listData={listData} handleModal={this.handleModal} />
        </ContentsWrapper>
        <AntdModal
          className="modal-table-pad"
          title={modalTitle}
          width="80%"
          visible={modalVisible}
          destroyOnClose
          maskClosable={false} // 마스크가 씌워진 부분 클릭시 모달이 닫히는가
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          <FormDataTable formData={formData} type={modalType} onChangeFormData={this.onChangeFormData} submitFormData={this.submitFormData} />
        </AntdModal>
      </>
    );
  }
}

GasSensorListPage.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  listData: PropTypes.array,
  onSearch: PropTypes.func,
  site: PropTypes.string,
};

export default GasSensorListPage;
