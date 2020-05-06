import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomList from './List';

class stackStatus extends Component {
  componentDidMount() {}

  render() {
    return (
      <BizBuilderBase
        sagaKey="stackLookUp"
        workSeq={4401}
        taskSeq={-1}
        viewType="LIST"
        listMetaSeq={4461}
        CustomListPage={CustomList} // 버튼 및 리스트 크기 이슈로  custom Page 사용
        loadingComplete={this.loadingComplete}
      />
    );
  }
}

stackStatus.propTypes = {};

stackStatus.defaultProps = {};

export default stackStatus;
