import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import FabListTable from '../fabListTable';
import FabInputPage from '../modalContent';

const AntdModal = StyledContentsModal(Modal);

class ChemicalManagePage extends Component {
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

  // 공급장치 정보를 가지고 들어올 수 있는 페이지 임으로 렌더후 Fab-List 정보 조회
  componentDidMount() {
    const { sagaKey: id, getCallDataHandlerReturnRes, initData } = this.props;
    const { SITE: site, CABINO: cabino } = initData;
    const apiInfo = {
      key: 'getGasFabList',
      type: 'GET',
      url: `/api/gcs/v1/common/gas/manage?type=fabList&site=${site}&cabino=${cabino}`,
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.initCallback);
  }

  initCallback = (id, response) => {
    const { list } = response;
    this.setState({
      listData: list || [],
    });
  };

  // 모달 핸들러 (입력수정에 맞춰 formData 수정도 함께)
  handleModal = (type, visible, etc) => {
    let title = '';
    let etcData = {};
    switch (type) {
      case 'INPUT':
        title = 'FAB 정보 등록';
        break;
      case 'MODIFY':
        title = 'FAB 정보 수정';
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
    this.setState({
      formData: {
        ...formData,
        [field]: val,
      },
    });
  };

  // 저장 수정 삭제
  submitFormData = apiType => {
    const { sagaKey: id, submitHandlerBySaga, initData } = this.props;
    const { formData } = this.state;
    const submitData = {
      PARAM: {
        ...formData,
        TYPE: 'fabList',
        SITE: initData.SITE,
        CABINO: initData.CABINO,
        PRODNM: initData.PRODNM,
      },
    };
    switch (apiType) {
      case 'ADD':
        submitHandlerBySaga(id, 'POST', '/api/gcs/v1/common/gas/manage', submitData, this.addCollback);
        break;
      case 'MODIFY':
        submitHandlerBySaga(id, 'PUT', '/api/gcs/v1/common/gas/manage', submitData, this.updateCollback);
        break;
      case 'DELETE':
        submitHandlerBySaga(id, 'DELETE', '/api/gcs/v1/common/gas/manage', submitData, this.deleteCollback);
        break;
      default:
        break;
    }
  };

  // 저장 콜백
  addCollback = (id, response) => {
    const { listData } = this.state;
    const { result, param } = response;
    const nextListData = listData.concat(param);
    if (result === 'fail') return message.error(<MessageContent>Fab 정보 저장에 실패하였습니다.</MessageContent>);
    return this.setState(
      {
        listData: nextListData,
        modalType: '',
        modalTitle: '',
        modalVisible: false,
        formData: {},
      },
      () => message.success(<MessageContent>Fab 정보를 추가하였습니다.</MessageContent>),
    );
  };

  // 수정콜백
  updateCollback = (id, response) => {
    const { listData } = this.state;
    const { result, param } = response;
    const nextListData = listData.map(data => {
      if (data.FAB_KEYNO === param.FAB_KEYNO) {
        return {
          ...param,
        };
      }
      return data;
    });
    if (result === 'fail') return message.error(<MessageContent>Fab 정보 수정에 실패하였습니다.</MessageContent>);
    return this.setState(
      {
        listData: nextListData,
        modalType: '',
        modalTitle: '',
        modalVisible: false,
        formData: {},
      },
      () => message.success(<MessageContent>Fab 정보를 수정하였습니다.</MessageContent>),
    );
  };

  // 삭제 콜백
  deleteCollback = (id, response) => {
    const { listData } = this.state;
    const { result, param } = response;
    const nextListData = listData.filter(data => data.FAB_KEYNO !== param.FAB_KEYNO);
    if (result === 'fail') return message.error(<MessageContent>Fab 정보 삭제에 실패하였습니다.</MessageContent>);
    return this.setState(
      {
        listData: nextListData,
        modalType: '',
        modalTitle: '',
        modalVisible: false,
        formData: {},
      },
      () => message.success(<MessageContent>Fab 정보를 삭제하였습니다.</MessageContent>),
    );
  };

  render() {
    const { initData } = this.props;
    const { modalType, modalTitle, modalVisible, listData, formData } = this.state;
    return (
      <>
        <StyledCustomSearchWrapper>
          <span className="text-label" style={{ fontWeight: '600' }}>
            Cabinet 번호 :
          </span>
          <span className="text-label" style={{ fontWeight: '600', margin: '0px 30px 0px 5px', color: 'black' }}>
            {initData.CABINO || ''}
          </span>
          <span className="text-label" style={{ fontWeight: '600' }}>
            GAS NAME :
          </span>
          <span className="text-label" style={{ fontWeight: '600', margin: '0px 10px 0px 5px', color: 'black' }}>
            {initData.PRODNM || ''}
          </span>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleModal('INPUT', true)}>
            신규등록
          </StyledButton>
        </StyledButtonWrapper>
        <ContentsWrapper>
          <FabListTable listData={listData || []} handleModal={this.handleModal} />
        </ContentsWrapper>
        <AntdModal
          className="modal-table-pad"
          title={modalTitle}
          width="30%"
          visible={modalVisible}
          destroyOnClose
          maskClosable={false} // 마스크가 씌워진 부분 클릭시 모달이 닫히는가
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {(modalType === 'INPUT' || modalType === 'MODIFY') && (
            <FabInputPage
              viewType={modalType}
              formData={formData}
              onChangeFormData={this.onChangeFormData}
              submitFormData={this.submitFormData}
              handleModal={this.handleModal}
            />
          )}
        </AntdModal>
      </>
    );
  }
}

ChemicalManagePage.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  profile: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
  initData: PropTypes.object,
};

export default ChemicalManagePage;
