import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import { Data } from 'react-data-grid-addons';
import { Modal } from 'antd';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import ListPage from './ListPage';

const AntdModal = StyledContentsModal(Modal);

class MsdsMgt extends Component {
  state = {
    isLoading: true,
    customModal: {},
  };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { sagaKey } = this.props;
    return (
      <>
        <BizBuilderBase sagaKey={sagaKey} workSeq={3161} viewType="LIST" loadingComplete={this.loadingComplete} CustomListPage={ListPage} />
      </>
    );
  }
}

MsdsMgt.propTypes = {
  searchListSagaKey: PropTypes.string,
  sagaKey: PropTypes.string,
};

MsdsMgt.defaultProps = {
  sagaKey: 'MsdsListMgt',
};

export default MsdsMgt;
