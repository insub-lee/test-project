import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import customList from 'apps/eshs/admin/environment/air/stack/List';

import { Select, Input, message, Modal } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled//Modal/StyledAntdModal';

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdTextarea = StyledTextarea(Input.TextArea);
const AntdModal = StyledAntdModal(Modal);
const AntdSelect = StyledSelect(Select);

const { Option } = Select;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: '',
        url: ``,
        type: '',
      },
    ];
    // getCallDataHandler(id, apiAry, this.initData);
  }

  search = () => {
    message.warning('개발중입니다.');
  };

  hazardModal = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  };

  selectedModal = record => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'REG_NO', record.REG_NO);
    this.hazardModal();
    console.debug('record : ', record);
  };

  render() {
    const { isModal } = this.state;
    const { formData } = this.props;
    return (
      <>
        <ContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area">
              <span className="text-label">등록번호</span>
              <AntdSearchInput
                style={{ width: '150px' }}
                className="input-search-inline input-search-sm input-pointer mr5"
                value={formData.REG_NO}
                readOnly
                onClick={this.hazardModal}
                onChange={this.hazardModal}
              />
            </div>
            <StyledButtonWrapper className="btn-area">
              <StyledButton className="btn-gray btn-first btn-sm" onClick={this.search}>
                검색
              </StyledButton>
            </StyledButtonWrapper>
          </StyledCustomSearchWrapper>
        </ContentsWrapper>
        <AntdModal width={1000} visible={isModal} title="위험성 평가 검색" onCancel={this.hazardModal} destroyOnClose footer={null}>
          {isModal && (
            <BizBuilderBase sagaKey="hazardModal" workSeq={12061} CustomListPage={customList} viewType="LIST" customOnRowClick={this.selectedModal} />
          )}
        </AntdModal>
      </>
    );
  }
}

List.propTypes = {
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
