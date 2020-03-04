import React from 'react';
import UserNode from '../../../components/Node/UserNode';
import DeptNode from '../../../components/Node/DeptNode';
import UserNodeDraft from '../../../components/Node/UserNode/draft';

export const NodeInfo = {
  UserNode: { renderer: property => (property.viewTyep === 'approval' ? <UserNode {...property} /> : <UserNodeDraft {...property} />) },
  DeptNode: { renderer: property => (property.viewTyep === 'approval' ? <DeptNode {...property} /> : <DeptNode {...property} />) },
};
