import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import Styled from './Styled';
import WaterRateTable from '../infoTable';

class QualityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: true,
      listData: [],
      formData: {
        WATER_WORKS: 0,
        INDUSTRIAL_WATER: 0,
        COOLING_WATER: 0,
      },
    };
  }

  componentDidMount() {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const submitData = {
      PARAM: {
        type: 'SEARCH',
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwRate', submitData, this.searchCallback);
  }

  // 검색버튼
  onSearch = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    this.setState({ isSearching: true });
    const submitData = {
      PARAM: {
        type: 'SEARCH',
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwRate', submitData, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { list } = response;
    this.setState({
      isSearching: false,
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

  onSaveRate = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { formData } = this.state;
    const submitData = {
      PARAM: {
        type: 'INSERT',
        ...formData,
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwRate', submitData, this.onSaveCallback);
  };

  onSaveCallback = (id, response) => {
    const { result } = response;
    if (result === 1) {
      message.success(<MessageContent>Rate가 등록되었습니다.</MessageContent>);
      return this.onSearch();
    }
    return message.error(<MessageContent>Rate 등록에 실패하였습니다.</MessageContent>);
  };

  render() {
    const { listData, isSearching, formData } = this.state;
    return (
      <Styled>
        <Spin tip="Rate 정보 불러오는 중..." spinning={isSearching}>
          <WaterRateTable formData={formData} listData={listData || []} onChangeFormData={this.onChangeFormData} onSaveRate={this.onSaveRate} />
        </Spin>
      </Styled>
    );
  }
}

QualityPage.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
};

export default QualityPage;
