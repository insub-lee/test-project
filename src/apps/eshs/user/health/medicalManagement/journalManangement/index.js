import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ViewPage from './viewPage';

const JournalManagement = ({ SITE_NODE_ID, JRNL_DT }) => (
  <BizMicroDevBase sagaKey="JournalManagement" component={ViewPage} SITE_NODE_ID={SITE_NODE_ID} JRNL_DT={JRNL_DT} />
);

JournalManagement.propTypes = {
  SITE_NODE_ID: PropTypes.number,
  JRNL_DT: PropTypes.string,
};

export default JournalManagement;
