import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import GasFabListPage from './page';
import Styled from './Styled';

/*
    GCS - Gas 관리 - Fab 리스트    
*/

class chemFabList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { initData } = this.props;
    return (
      <Styled>
        <BizMicroDevBase initData={initData} component={GasFabListPage} sagaKey="gasManage_fab_list" />
      </Styled>
    );
  }
}

chemFabList.propTypes = {
  initData: PropTypes.object,
};

export default chemFabList;
