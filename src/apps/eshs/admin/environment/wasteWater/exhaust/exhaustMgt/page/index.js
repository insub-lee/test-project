import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import ExhaustMgtTable from '../infoTable';
import FormDataTable from '../infoTable/formDataTable';

const AntdModal = StyledContentsModal(Modal);

class ExhaustMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalTitle: '',
      modalVisible: false,
      listData: [],
      formData: {
        EXHAUST_CD: '-1',
        EXHAUST_NM: '',
      },
    };
  }

  componentDidMount() {
    // 첫 진입시 리스트 호출
    this.getExhaustMgtList();
  }

  // 등록, 수정, 삭제시 리스트 재호출
  getExhaustMgtList = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const submitData = {
      PARAM: {
        type: 'SEARCH',
      },
    };
    submitHandlerBySaga(id, 'GET', '/api/eshs/v1/common/exhaustMgt', submitData, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { list } = response;
    this.setState({
      listData: list || [],
    });
  };

  onChangeFormData = (field, value) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [field]: value,
      },
    });
  };

  // 저장, 수정, 삭제
  submitFormData = type => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { formData } = this.state;
    const submitData = {
      PARAM: {
        ...formData,
        type,
      },
    };
    switch (type) {
      case 'ADD':
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/exhaustMgt', submitData, this.submitFormDataCallback);
        break;
      case 'MOD':
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/exhaustMgt', submitData, this.submitFormDataCallback);
        break;
      case 'DEL':
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/exhaustMgt', submitData, this.submitFormDataCallback);
        break;
      default:
        break;
    }
  };

  submitFormDataCallback = (id, response) => {
    const { type, result } = response;
    if (result === 1) {
      switch (type) {
        case 'ADD':
          message.success(<MessageContent>배출시설 정보가 등록되었습니다.</MessageContent>);
          break;
        case 'MOD':
          message.success(<MessageContent>배출시설 정보가 수정되었습니다.</MessageContent>);
          break;
        case 'DEL':
          message.success(<MessageContent>배출시설 정보를 삭제하였습니다.</MessageContent>);
          break;
        default:
          break;
      }
      this.setState({
        modalTitle: '',
        modalVisible: false,
      });
      return this.getExhaustMgtList();
    }
    switch (type) {
      case 'ADD':
        return message.error(<MessageContent>배출시설 정보 등록에 실패하였습니다.</MessageContent>);
      case 'MOD':
        return message.error(<MessageContent>배출시설 정보 수정에 실패하였습니다.</MessageContent>);
      case 'DEL':
        return message.error(<MessageContent>배출시설 정보 삭제에 실패하였습니다.</MessageContent>);
      default:
        return '';
    }
  };

  // 모달 핸들러
  handleModal = (modalType, bool, item) => {
    let title = '';
    switch (modalType) {
      case 'ADD':
        title = `배출시설 추가`;
        this.setState({
          modalTitle: title,
          modalVisible: bool,
          formData: {
            EXHAUST_CD: '-1',
            EXHAUST_NM: '',
          },
        });
        break;
      case 'MOD':
        title = `배출시설 정보`;
        this.setState({
          modalTitle: title,
          modalVisible: bool,
          formData: {
            ...item,
          },
        });
        break;
      default:
        this.setState({
          modalTitle: title,
          modalVisible: bool,
          formData: {
            EXHAUST_CD: '-1',
            EXHAUST_NM: '',
          },
        });
        break;
    }
  };

  render() {
    const { listData, formData, modalTitle, modalVisible } = this.state;
    console.debug('폼', formData);
    return (
      <>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm ml5" onClick={() => this.handleModal('ADD', true)}>
            추가
          </StyledButton>
        </StyledButtonWrapper>
        <ExhaustMgtTable listData={listData || []} handleModal={this.handleModal} />
        <AntdModal
          className="modal-table-pad"
          title={modalTitle}
          width="50%"
          visible={modalVisible}
          footer={null}
          destroyOnClose
          maskClosable={false}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalVisible && <FormDataTable formData={formData} onChangeFormData={this.onChangeFormData} submitFormData={this.submitFormData} />}
        </AntdModal>
      </>
    );
  }
}

ExhaustMgtPage.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
};

export default ExhaustMgtPage;
