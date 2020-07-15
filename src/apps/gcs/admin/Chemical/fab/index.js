import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ChemicalFabListPage from './page';
import Styled from './Styled';

/*
    GCS - Chemical 관리 - Fab 리스트    
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
        <BizMicroDevBase initData={initData} component={ChemicalFabListPage} sagaKey="chemicalManage_fab_list" />
      </Styled>
    );
  }
}

chemFabList.propTypes = {
  initData: PropTypes.object,
};

export default chemFabList;
