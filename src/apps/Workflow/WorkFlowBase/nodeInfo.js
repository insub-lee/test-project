import React from 'react';
import UserNode from './Nodes/UserNode';
import DeptNode from './Nodes/DeptNode';
import UserNodeDraft from './Nodes/UserNode/draft';
import DccNodeDraft from './Nodes/DccNode/draft';
import DccNode from './Nodes/DccNode';

import ReviewerNodeDraft from './Nodes/ReviewerNode/draft';
import ReviewerNode from './Nodes/ReviewerNode';

import ApproveNodeDraft from './Nodes/ApproveNode/draft';
import ApproveNodeNode from './Nodes/ApproveNode';

export const NodeInfo = {
  UserNode: { renderer: property => (property.viewType === 'approval' ? <UserNode {...property} /> : <UserNodeDraft {...property} />) },
  DeptNode: { renderer: property => (property.viewType === 'approval' ? <DeptNode {...property} /> : <DeptNode {...property} />) },
  dcc: { renderer: property => (property.viewType === 'approval' ? <DccNode {...property} /> : <DccNodeDraft {...property} />) },
  reviewer: { renderer: property => (property.viewType === 'approval' ? <ReviewerNode {...property} /> : <ReviewerNodeDraft {...property} />) },
  approve: { renderer: property => (property.viewType === 'approval' ? <ApproveNodeNode {...property} /> : <ApproveNodeDraft {...property} />) },
};
