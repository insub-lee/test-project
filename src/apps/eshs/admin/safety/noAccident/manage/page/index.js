import React, { Component } from 'react';
import PropTypes from 'prop-types';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import Styled from './Styled';
import AccidentMgt from '../infoTable/AccidentMgt';

class NoaccidentManagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: [],
    };
  }

  // 페이지 로딩 시점 :: 기본 전체리스트 조회하여 그려줌
  componentDidMount() {
    this.init();
  }

  init = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getNoAccidentMgtInfo',
      type: 'POST',
      url: `/api/eshs/v1/common/noAccident`,
      params: { PARAM: { type: 'GET_MANAGE' } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { result } = response;
    this.setState({
      formData: result || [],
    });
  };

  onChangeFormData = (index, target, value) => {
    const { formData } = this.state;
    this.setState({
      formData: formData.map((item, idx) =>
        index === idx
          ? {
              ...item,
              [target]: value,
            }
          : item,
      ),
    });
  };

  // 저장(update)
  submitFormData = type => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { formData } = this.state;
    const submitData = {
      PARAM: {
        type,
        formData,
      },
    };
    switch (type) {
      case 'UPD_MANAGE':
        return submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/noAccident', submitData, this.submitFormDataCallback);
      default:
        return null;
    }
  };

  submitFormDataCallback = (id, response) => {
    const { type, result } = response;
    switch (type) {
      case 'UPD_MANAGE':
        if (result > 0) {
          this.init();
          return message.success(<MessageContent>무재해시간 설정을 업데이트했습니다.</MessageContent>);
        }
        return message.error(<MessageContent>무재해시간 설정을 업데이트에 실패했습니다.</MessageContent>);
      default:
        return null;
    }
  };

  render() {
    const { formData } = this.state;
    return (
      <Styled>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <div style={{ display: 'inline-block', height: '100%', verticalAlign: 'middle', fontWeight: 600 }}>
            {formData && formData.length > 0 && `최근수정일 : ${formData[0].UPDATE_DT}`}
          </div>
          <StyledButton className="btn-gray btn-sm ml5" onClick={() => this.submitFormData('UPD_MANAGE')}>
            저장
          </StyledButton>
        </StyledButtonWrapper>
        <div>
          <AccidentMgt formData={formData} onChangeFormData={this.onChangeFormData} />
        </div>
      </Styled>
    );
  }
}

NoaccidentManagePage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

NoaccidentManagePage.defaultProps = {};

export default NoaccidentManagePage;
