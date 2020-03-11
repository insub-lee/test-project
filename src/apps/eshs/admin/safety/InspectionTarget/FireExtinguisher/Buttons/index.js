import React from 'react';
import ExcelDown from './ExcelDown';
import Search from './Search';
import NewReg from './NewReg';
import UnusedReg from './UnusedReg';
import Status from './Status';
import Save from './Save';
import Leave from './Leave';

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

export default 'specify what you want';
