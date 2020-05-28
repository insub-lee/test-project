import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

const UserListPage = ({ authority, workSeq }) => <BizMicroDevBase sagaKey="UserListPage" component={List} authority={authority} workSeq={workSeq} />;

UserListPage.propTypes = {
  authority: PropTypes.arrayOf('string'),
  workSeq: PropTypes.number,
};

export default UserListPage;
