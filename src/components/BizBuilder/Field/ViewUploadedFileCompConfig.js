import React, { useEffect, useState } from 'react';
import { Select, Radio, Row, Col, Input } from 'antd';
import _, { debounce } from 'lodash';

import BizMicroDevBase from 'components/BizMicroDevBase';

function ViewUploadedFileCompConfig(props) {
  const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = props;

  const handleChangeViewCompData = (key, value) => {
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };
  const debouncedHandleChangeViewCompData = debounce(handleChangeViewCompData, 250);

  return (
    <div className="popoverItem popoverItemInput">
      <span className="spanLabel">컬럼명</span>
      <Input
        defaultValue={(configInfo && configInfo.property && configInfo.property.file_col_name) || ''}
        onChange={e => debouncedHandleChangeViewCompData('file_col_name', e.target.value)}
      ></Input>
      {/* <Row>
        <div>
          <Col span={6}>
            <p>테스트지롱</p>
          </Col>
          <Col span={16} push={2}>
            <Radio.Group className="alignCenter">
              <Radio value="Y">Y</Radio>
              <Radio value="N">N</Radio>
            </Radio.Group>
          </Col>
        </div>
      </Row> */}
    </div>
  );
}

const configer = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    sagaKey="ViewUploadedFileCompConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={ViewUploadedFileCompConfig}
  ></BizMicroDevBase>
);
ViewUploadedFileCompConfig.propTypes = {};
ViewUploadedFileCompConfig.defaultProps = {};

export default configer;
