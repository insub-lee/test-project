import React from 'react';
import { Input, Radio, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';

import AntRadiobox from 'containers/portal/components/uielements/radiobox.style';

import Styled from './Styled';
import CompareItem from './CompareItem';

const RadioGroup = AntRadiobox(Radio.Group);

const TypeContents = ({ setCompareTempletChangeValue, compareTemplet, saveCompareTemplet, action }) => (
  <Styled>
    <Row>
      <Col>제목</Col>
      <Col>
        <Input id="MUAL_NAME" onChange={e => setCompareTempletChangeValue('TEMPLET_NAME', e.target.value)} value={compareTemplet.TEMPLET_NAME || ''} />
      </Col>
    </Row>
    <Row>
      <Col>유형</Col>
      <Col>
        <RadioGroup onChange={e => setCompareTempletChangeValue('IS_FOLDER', e.target.value)} value={compareTemplet.IS_FOLDER || 'Y'}>
          <Radio value="Y">폴더</Radio>
          <Radio value="N">템플릿</Radio>
        </RadioGroup>
      </Col>
    </Row>
    {compareTemplet.IS_FOLDER === 'N' && (
      <Row>
        <Col>
          <CompareItem compareItems={compareTemplet.TEMPLET_CONTENT} action={action} />
        </Col>
      </Row>
    )}
    <Row>
      <Col>
        {compareTemplet.TEMPLET_IDX === 0 ? (
          <Button type="primary" onClick={saveCompareTemplet}>
            저장
          </Button>
        ) : (
          <Button type="primary" onClick={saveCompareTemplet}>
            수정
          </Button>
        )}
      </Col>
    </Row>
  </Styled>
);

TypeContents.propTypes = {
  setCompareTempletChangeValue: PropTypes.func.isRequired,
  compareTemplet: PropTypes.object.isRequired,
  saveCompareTemplet: PropTypes.func.isRequired,
  action: PropTypes.object.isRequired,
};

export default TypeContents;
