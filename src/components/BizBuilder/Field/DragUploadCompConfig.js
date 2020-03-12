import React, { useState, useEffect } from 'react';
import { Select, Radio, Row, Col, Input } from 'antd';
// const { Option } = Select;
import _, { debounce } from 'lodash';
import BizMicroDevBase from 'components/BizMicroDevBase';

const cont = {
  MULTIPLE_UPLOAD: 'MULTIPLE_UPLOAD',
  MULTIPLE_SELECT: 'MULTIPLE_SELECT',
  FILTER_EXTENSION: 'FILTER_EXTENSION',
  EXTENSION_LIST: 'EXTENSION_LIST',
};

function DragUploadCompConfig(props) {
  const [multipleUpload, setMultipleUpload] = useState();
  const [multipleSelect, setMultipleSelect] = useState();
  const [filterExtension, setFilterExtension] = useState();
  const [extensionList, setExtensionList] = useState();

  useEffect(() => {
    const { MULTIPLE_UPLOAD, MULTIPLE_SELECT, FILTER_EXTENSION, EXTENSION_LIST } = props.configInfo.property;
    setMultipleUpload(MULTIPLE_UPLOAD || 'N');
    setMultipleSelect(MULTIPLE_SELECT || 'N');
    setFilterExtension(FILTER_EXTENSION || 'N');
    setExtensionList(EXTENSION_LIST || undefined);
  }, []);

  const handleDragUploadCompConfig = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };
  const debouncedHandleDragUploadCompConfig = debounce(handleDragUploadCompConfig, 250);

  function radioHandler(event, type) {
    let { value } = event.target;
    let key = '';

    switch (type) {
      case cont.MULTIPLE_UPLOAD: {
        key = cont.MULTIPLE_UPLOAD;
        setMultipleUpload(value);
        break;
      }
      case cont.MULTIPLE_SELECT: {
        key = cont.MULTIPLE_SELECT;
        setMultipleSelect(value);
        break;
      }
      case cont.FILTER_EXTENSION: {
        key = cont.FILTER_EXTENSION;
        setFilterExtension(value);
        break;
      }
      case cont.EXTENSION_LIST: {
        key = cont.EXTENSION_LIST;
        // ENGLISH INPUT ONLY

        const letters = /^[A-Za-z,\s]+$/;
        if (value.match(letters) || value === '') {
          value = value.toUpperCase();
          setExtensionList(value);
        } else {
          return;
        }
        break;
      }
      default:
        return;
    }

    debouncedHandleDragUploadCompConfig(key, value);
  }

  return (
    <div>
      <Row>
        <Col span={6}>
          <p>복수 업로드</p>
        </Col>
        <Col span={16} push={2}>
          <Radio.Group value={multipleUpload} onChange={e => radioHandler(e, cont.MULTIPLE_UPLOAD)}>
            <Radio value="Y">Y</Radio>
            <Radio value="N">N</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <p>파일 복수 선택</p>
        </Col>
        <Col span={16} push={2}>
          <Radio.Group value={multipleSelect} onChange={e => radioHandler(e, cont.MULTIPLE_SELECT)}>
            <Radio value="Y">Y</Radio>
            <Radio value="N">N</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <p>확장자 검사</p>
        </Col>
        <Col span={16} push={2}>
          <Radio.Group value={filterExtension} onChange={e => radioHandler(e, cont.FILTER_EXTENSION)}>
            <Radio value="Y">Y</Radio>
            <Radio value="N">N</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <p>확장자 목록</p>
        </Col>
        <Col span={16} push={2}>
          <Input style={{ width: '100%' }} value={extensionList} onChange={e => radioHandler(e, cont.EXTENSION_LIST)} placeholder=",로 구분합니다." />
        </Col>
      </Row>
    </div>
  );
}

const configer = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    sagaKey="DragUploadCompConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={DragUploadCompConfig}
  ></BizMicroDevBase>
);
DragUploadCompConfig.propTypes = {};
DragUploadCompConfig.defaultProps = {};

export default configer;
