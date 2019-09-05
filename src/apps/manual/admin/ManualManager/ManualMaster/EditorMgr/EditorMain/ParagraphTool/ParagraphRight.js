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
  callbackStr += '<table style="width: 100%;"><tbody><tr><td style="width: 100.0000%; border: none;">';
  callbackStr += '<p>';
  callbackStr += `<p style="float:right; padding-right: 20px;"><img style="width: 186px;" src="${payload.image.replace('200x200', '0x0')}" /></p>`;
  if (payload.title !== '') {
    callbackStr += `<h2 style="padding-bottom: 20px;">${payload.title}</h2>`;
  }
  callbackStr += contentMake(payload.content);
  callbackStr += '</p>';
  callbackStr += '</td></tr></tbody></table>';
  addEditorComponent('editor', callbackStr);
};

const contentMake = text => {
  let returnStr = '';
  const tmpStr = text.split('\n');
  for (let i = 0; i < tmpStr.length; i += 1) {
    returnStr += `<p>${tmpStr[i]}</p>`;
  }

  return returnStr;
};

const ParagraphRight = ({ addEditorComponent }) => (
  <Styled>
    <form onSubmit={e => handleSubmit(e, addEditorComponent)} autoComplete="off">
      <Row type="flex">
        <Col span={17}>
          <Row>
            <Col span={24} className="manualPaddingCol">
              <Input name="title" placeholder="title plz" />
            </Col>
            <Col span={24} className="manualPaddingCol">
              <TextArea name="content" rows={4} placeholder="contents plz" />
            </Col>
          </Row>
        </Col>
        <Col span={7} className="manualPaddingCol">
          <ImageUpload name="image" />
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

ParagraphRight.propTypes = {
  addEditorComponent: PropTypes.func.isRequired,
};

export default ParagraphRight;
