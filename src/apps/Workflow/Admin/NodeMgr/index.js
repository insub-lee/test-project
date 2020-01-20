import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BizMicroDevBase from 'components/BizMicroDevBase/index';
import NodeList from './NodeList';

const NodeBase = () => <BizMicroDevBase id="nodeMgr" component={NodeList} />;
export default NodeBase;
