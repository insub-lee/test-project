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

  const firstThumb = payload.image1 ? `<img src="${payload.image1.replace('200x200', '0x0')}" alt="firstImg" name="two" style="width:100%;" />` : '';
  const firstTitle = payload.title1 !== '' ? `<h2>${payload.title1}</h2>` : '';
  const firstContents = payload.contents1 !== '' ? `<div style="padding-top: 20px; text-align: left;">${contentMake(payload.contents1)}</div>` : '';

  const secondThumb = payload.image2 ? `<img src="${payload.image2.replace('200x200', '0x0')}" alt="secondImg" name="two" style="width:100%;" />` : '';
  const secondTitle = payload.title2 !== '' ? `<h2>${payload.title2}</h2>` : '';
  const secondContents = payload.contents2 !== '' ? `<div style="padding-top: 20px; text-align: left;">${contentMake(payload.contents2)}</div>` : '';

  const callbackStr = `<table class="" style="width: 100%;">
        <tbody>
          <tr>
            <td style="width: 50%; text-align: center; vertical-align: top; border: none; padding: 8px;">
              ${firstThumb}
              ${firstTitle}
              ${firstContents}
            </td>
            <td style="width: 50%; text-align: center; vertical-align: top; border: none; padding: 8px;">
              ${secondThumb}
              ${secondTitle}
              ${secondContents}
            </td>
          </tr>
        </tbody>
      </table>`;
  addEditorComponent('editor', callbackStr);
};

const contentMake = text => {
  let returnStr = '';
  const tmpStr = text.split('\n');
  for (let i = 0; i < tmpStr.length; i += 1) {
    returnStr += `<p style="text-align: left;">${tmpStr[i]}</p>`;
  }

  return returnStr;
};

const ParagraphTwo = ({ addEditorComponent }) => (
  <Styled>
    <form onSubmit={e => handleSubmit(e, addEditorComponent)} autoComplete="off">
      <Row type="flex">
        <Col span={12} className="manualPaddingCol">
          <ImageUpload name="image1" />
        </Col>
        <Col span={12} className="manualPaddingCol">
          <ImageUpload name="image2" />
        </Col>
      </Row>
      <Row type="flex">
        <Col span={12} className="manualPaddingCol">
          <Input name="title1" placeholder="title plz" />
        </Col>
        <Col span={12} className="manualPaddingCol">
          <Input name="title2" placeholder="title plz" />
        </Col>
      </Row>
      <Row type="flex">
        <Col span={12} className="manualPaddingCol">
          <TextArea name="contents1" rows={4} placeholder="contents plz" />
        </Col>
        <Col span={12} className="manualPaddingCol">
          <TextArea name="contents2" rows={4} placeholder="contents plz" />
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

ParagraphTwo.propTypes = {
  addEditorComponent: PropTypes.func.isRequired,
};

export default ParagraphTwo;
