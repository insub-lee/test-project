import React from 'react';
import { VIEW_TYPE, META_SEQ } from 'apps/eshs/admin/safety/InspectionTarget/FireExtinguisher/internal_constants';
import ExcelDown from './ExcelDown';
import NewReg from './NewReg';
import UsageReg from './UsageReg';
import Status from './Status';
import Save from './Save';
import Leave from './Leave';
import Add from './Add';
import History from './History';
import InfoModify from './InfoModify';
import RegisterInspection from './RegisterInspection';

export function ViewButtons(props) {
  return (
    <>
      <Status {...props} />
      <NewReg {...props} />
      <UsageReg {...props} />
    </>
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

export function ModifyButtons(props) {
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
      <History {...props} detail="History(관리)" viewType="VIEW" moveTo={META_SEQ.VIEW_INSPECTION_BY_POSITON_NO} />
      <History {...props} detail="History(Chip)" viewType="VIEW" moveTo={META_SEQ.VIEW_INSPECTION_BY_CHIP} />
      <History {...props} detail="점검결과 등록" viewType={VIEW_TYPE.INPUT} moveTo={META_SEQ.INPUT_INSPECTION} />
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

export function RegInspection(props) {
  return (
    <div className="alignRight">
      <RegisterInspection {...props} shouldFire title="저장" /> <Leave {...props} />
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
