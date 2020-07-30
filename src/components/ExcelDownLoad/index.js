import React, { Component } from 'react';

import BizMicroDevBase from 'components/BizMicroDevBase';
import ExcelDowLoadComp from './ExcelDownLoadComp';

const ExcelDownLoad = props => {
  return <BizMicroDevBase sagaKey="excelDownLoad" {...props} component={ExcelDowLoadComp}></BizMicroDevBase>;
};

export default ExcelDownLoad;
