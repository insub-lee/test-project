import React from 'react';
import ExcelDown from './ExcelDown';
import Search from './Search';
import NewReg from './NewReg';
import UnusedReg from './UnusedReg';
import Status from './Status';
import Save from './Save';
import Leave from './Leave';
import ResultInput from './ResultInput';
import Add from './Add';
import History from './History';
import InfoModify from './InfoModify';

export function ViewButtons(props) {
  return (
    <div className="alignRight">
      <Status {...props} />
      <NewReg {...props} />
      <ExcelDown {...props} />
      <UnusedReg {...props} />
    </div>
  );
}

export function InputButtons(props) {
  return (
    <div className="alignRight">
      <Save {...props} />
      <Leave {...props} />
    </div>
  );
}
export function DetailButtons(props) {
  return (
    <div className="alignRight">
      <History {...props} detail="관리" />
      <History {...props} detail="Chip" />
      <Add {...props} title="ISSUE 추가" />
      <InfoModify {...props} />
    </div>
  );
}

export function ViewHistory(props) {
  return (
    <div className="alignRight">
      <Leave {...props} />
    </div>
  );
}

export function IssueAdd(props) {
  return (
    <div className="alignRight">
      <Add {...props} title="저장" />
    </div>
  );
}

export default 'specify what you want';
