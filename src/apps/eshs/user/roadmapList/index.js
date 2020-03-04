import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

import List from './List';

const roadmapList = () => <BizBuilderBase sagaKey="roadmapList" viewType="LIST" workSeq={2401} CustomListPage={List} />;

roadmapList.propTypes = {};

export default roadmapList;
