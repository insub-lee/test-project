import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import GasSensorListPage from './page';

/*
    GCS - gas 관리 - sensor 리스트    
*/

class gasSensorList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listData, onSearch, site } = this.props;
    return <BizMicroDevBase site={site} listData={listData} onSearch={onSearch} component={GasSensorListPage} sagaKey="gasManage_sensor_input" />;
  }
}

gasSensorList.propTypes = {
  listData: PropTypes.array,
  onSearch: PropTypes.func,
  site: PropTypes.string,
};

export default gasSensorList;
