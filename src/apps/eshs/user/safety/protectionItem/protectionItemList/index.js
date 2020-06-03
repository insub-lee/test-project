import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

const ProtectionItemList = ({ handleRowClick }) => <BizMicroDevBase sagaKey="protectionItemList" component={List} handleRowClick={handleRowClick} />;

ProtectionItemList.propTypes = {
  handleRowClick: PropTypes.func,
};

ProtectionItemList.defaultProps = {
  handleRowClick: null,
};

export default ProtectionItemList;
