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

export function Button1(props) {
  return (
    <div className="alignRight">
      <InfoModify {...props} />
    </div>
  );
}

export function Button2(props) {
  return (
    <div className="alignRight">
      <ResultInput {...props} />
      <History {...props} />
      <History {...props} />
    </div>
  );
}

export function Button3(props) {
  return (
    <div className="alignRight">
      <Save {...props} />
      <Add {...props} />
    </div>
  );
}

export default 'specify what you want';
