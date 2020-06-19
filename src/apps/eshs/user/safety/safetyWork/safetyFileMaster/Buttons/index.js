import React from 'react';
import NewRegBtn from './NewRegBtn';
import ModifyBtn from './ModifyBtn';
import { VIEW_TYPE, META_SEQ } from 'apps/eshs/user/safety/safetyWork/safetyFileMaster/internal_constants';

export function ViewPageButtons(props) {
  return (
    <div className="alignRight">
      <ModifyBtn {...props} />
    </div>
  );
}

export function ListPageButtons(props) {
  return (
    <>
      <NewRegBtn {...props} />
    </>
  );
}

export default 'custom_buttons';
