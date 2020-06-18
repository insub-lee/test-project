import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ListPage from './pages/ListPage';

/*
    안전지킴이 - 소방점검 - 이슈노트
*/

const FireIssueNote = props => (
  <BizMicroDevBase fireCode={props.fireCode} positionNo={props.positionNo} component={ListPage} sagaKey={`${props.fireCode}_issueNote`} />
);

export default FireIssueNote;
