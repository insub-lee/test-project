import React from 'react';
import { Row, Col, Button, Input } from 'antd';
import PropTypes from 'prop-types';

import ImageUpload from '../../../../../../components/Upload';

import Styled from './Styled';

const { TextArea } = Input;

const handleSubmit = (e, addEditorComponent) => {
  e.preventDefault();
  const payload = {};
  const formData = new FormData(e.target);
  formData.forEach((value, key) => {
    payload[key] = value;
  });
  let callbackStr = '';
  callbackStr += '<div>';
  callbackStr += `<span style="font-size: 40px; float: left; display: inline-block; line-height: 1.1; padding-right: 5px;">${payload.content.charAt(0)}</span>`;
  callbackStr += `<div style="padding-top: 7px;">${contentMake(payload.content)}</div>`;
  callbackStr += '</div>';
  addEditorComponent('editor', callbackStr);
};

const contentMake = text => {
  let returnStr = '';
  let tmpStr = text.substring(1, text.length);
  tmpStr = tmpStr.split('\n');
  for (let i = 0; i < tmpStr.length; i += 1) {
    returnStr += `<p>${tmpStr[i]}</p>`;
  }

  return returnStr;
};

const ParagraphLeft = ({ addEditorComponent }) => (
  <Styled>
    <form onSubmit={e => handleSubmit(e, addEditorComponent)} autoComplete="off">
      <Row type="flex">
        <Col span={24} className="manualPaddingCol">
          <TextArea name="content" rows={4} placeholder="contents plz" />
        </Col>
      </Row>
      <Row>
        <Col span={24} className="alignRight">
          <Button htmlType="submit">적용</Button>
        </Col>
      </Row>
    </form>
  </Styled>
);

ParagraphLeft.propTypes = {
  addEditorComponent: PropTypes.func.isRequired,
};

export default ParagraphLeft;
