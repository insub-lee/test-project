import React, { Component } from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import Styled from './Styled';

class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      fileSeq: '',
      fileUrl: '',
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getOrganizationChart',
      type: 'GET',
      url: `/api/eshs/v1/common/organizationChart`,
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.initCallback);
  }

  initCallback = (id, response) => {
    const { detail } = response;
    let fileSeq = '';
    if (detail !== '') {
      const detailJson = JSON.parse(detail);
      const { IMAGE } = detailJson;
      if (IMAGE && IMAGE.DETAIL && IMAGE.DETAIL.length > 0) {
        const file = IMAGE.DETAIL[0];
        fileSeq = file.seq;
      }
    }
    this.setState({
      isLoaded: true,
      fileSeq,
      fileUrl: `/down/file/${fileSeq}`,
    });
  };

  render() {
    const { isLoaded, fileSeq, fileUrl } = this.state;
    return (
      <Styled>
        <Spin spinning={!isLoaded}>
          {fileSeq !== '' ? (
            <div className="contentWrap">
              <img alt="organizationChart" style={{ width: '100%' }} src={fileUrl} />
            </div>
          ) : (
            <div className="contentWrap">
              <span className="empty-contents">등록된 조직도 정보가 없습니다.</span>
            </div>
          )}
        </Spin>
      </Styled>
    );
  }
}
ViewPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
};

ViewPage.defaultProps = {};

export default ViewPage;
