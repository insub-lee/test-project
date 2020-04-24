import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import List from 'apps/eshs/user/pages/ListPage';

class EshSystemLaw extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {}

  // isOpenModalChange = taskSeq => {
  //   this.setState({
  //     isOpenModal: true,
  //   });
  // };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return (
      <BizBuilderBase
        sagaKey="EshSystemLaw"
        workSeq={1853}
        viewType="LIST"
        loadingComplete={this.loadingComplete}
        // isOpenModalChange={this.isOpenModalChange}
        CustomListPage={List}
      />
    );
  }
}

EshSystemLaw.propTypes = {};

EshSystemLaw.defaultProps = {};

export default EshSystemLaw;
