import React from 'react';
import NewRegBtn from './NewRegBtn';
import ModifyBtn from './ModifyBtn';

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
