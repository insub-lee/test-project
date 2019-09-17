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
  const callbackStr = `<table class="toolview-paragraph" style="width: 100%;"><tbody><tr><td style="border: none;">
    <div>
      <div style="float:left; padding-right: 20px;"><img style="width: 186px;" src="${payload.image.replace('200x200', '0x0')}" /></div>
      ${payload.title !== '' ? `<h2 style="padding-bottom: 20px;">${payload.title}</h2>` : ''}
      ${contentMake(payload.content)}
    </div>
  </td></tr></tbody></table>`;
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

const ParagraphLeft = ({ addEditorComponent }) => (
  <Styled>
    <form onSubmit={e => handleSubmit(e, addEditorComponent)} autoComplete="off">
      <Row type="flex">
        <Col span={7} className="manualPaddingCol">
          <ImageUpload name="image" />
        </Col>
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
