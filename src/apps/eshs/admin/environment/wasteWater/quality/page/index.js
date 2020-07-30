import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, Select, Spin, DatePicker } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);
const { Option } = Select;

class QualityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      type: '원수',
      division: 'HF계',
      modalTitle: '',
      modalVisible: false,
      etcData: {},
      listData: [],
    };
  }

  handleModal = (modalType, bool, etcData) => {
    const { type } = this.state;
    let title = '';
    let etc = {};
    switch (modalType) {
      case 'EXCEL':
        title = `${type} 정보 엑셀 업로드`;
        etc = etcData;
        this.setState({
          modalTitle: title,
          modalVisible: bool,
          etcData: etc,
        });
        break;
      default:
        this.setState({
          modalTitle: title,
          modalVisible: bool,
          etcData: etc,
        });
        break;
    }
  };

  render() {
    const { type, division, modalTitle, modalVisible, formData, listData, isSearching } = this.state;
    return (
      <>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">분류</span>
              <AntdSelect defaultValue={type} className="select-sm" style={{ width: '100px' }} onChange={val => this.setState({ type: val })} disabled>
                <Option value="원수">원수</Option>
                <Option value="방류수">방류수</Option>
              </AntdSelect>
              <span className="text-label">구분</span>
              <AntdSelect defaultValue={division} className="select-sm" style={{ width: '100px' }} onChange={val => this.setState({ division: val })} disabled>
                <Option value="HF계">HF계</Option>
                <Option value="A/A계">A/A계</Option>
                <Option value="유기계">유기계</Option>
              </AntdSelect>
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => console.debug('')}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-gray btn-sm ml5" onClick={() => this.handleModal('EXCEL', true)}>
            Excel 업로드
          </StyledButton>
        </StyledButtonWrapper>
        <div>컨텐츠 널어줄곳</div>
        <AntdModal
          className="modal-table-pad"
          title={modalTitle}
          width="80%"
          visible={modalVisible}
          footer={null}
          destroyOnClose
          maskClosable={false}
          onOk={() => console.debug('', false)}
          onCancel={() => console.debug('', false)}
        >
          <div>엑셀 파서 들어갈곳</div>
        </AntdModal>
      </>
    );
  }
}

QualityPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

QualityPage.defaultProps = {};

export default QualityPage;
