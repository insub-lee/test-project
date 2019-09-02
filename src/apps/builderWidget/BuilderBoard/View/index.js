import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Descriptions, Form } from 'antd';

import Container from 'components/FormLayer/Container';
import Content from 'components/FormLayer/Content';
import StyledFormLayer from 'components/FormLayer/Styled';
import { allFormStuffs } from 'components/WorkBuilder/config';

import StyledFormStuff from './StyledFormStuff';
import Styled from './Styled';

const View = ({ boxes, formStuffs, submitData, saveTempContents, workSeq, taskSeq, viewType, deleteTask }) => (
  <Styled className="canvas" onSubmit={submitData}>
    <Form layout="vertical">
      <div className="canvas__frame" id="canvas">
        <div>
          {boxes.map(box => (
            <StyledFormLayer key={box.id} classname="form-layer">
              <Card size="small" title={box.property.useLabel ? box.property.label : null} bordered={false}>
                <Container>
                  <Content>
                    {box.property.type === 'normal' &&
                      formStuffs
                        .filter(formStuff => formStuff.parentId === box.id)
                        .map(formStuff => (
                          <StyledFormStuff key={formStuff.id} className="form-group">
                            <Form.Item label={formStuff.property.label}>
                              {allFormStuffs[formStuff.type] &&
                                allFormStuffs[formStuff.type].renderer({
                                  formStuff,
                                  saveTempContents,
                                  workSeq,
                                  taskSeq,
                                })}
                            </Form.Item>
                          </StyledFormStuff>
                        ))}
                    {box.property.type === 'table' && (
                      <Descriptions bordered border size="small" column={box.property.column}>
                        {formStuffs
                          .filter(formStuff => formStuff.parentId === box.id)
                          .map(formStuff => (
                            <Descriptions.Item key={formStuff.id} label={formStuff.property.label} span={formStuff.property.span || 1}>
                              <Styled classNam="form-group">
                                {allFormStuffs[formStuff.type] &&
                                  allFormStuffs[formStuff.type].renderer({
                                    formStuff,
                                    saveTempContents,
                                    workSeq,
                                    taskSeq,
                                  })}
                              </Styled>
                            </Descriptions.Item>
                          ))}
                      </Descriptions>
                    )}
                  </Content>
                </Container>
              </Card>
            </StyledFormLayer>
          ))}
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            {viewType !== 'regist' && (
              <Button type="default" htmlType="button" onClick={() => deleteTask(workSeq, taskSeq)} style={{ marginRight: '8px' }}>
                삭제
              </Button>
            )}
            <Button type="primary" htmlType="submit">
              {viewType === 'regist' ? '등록' : '수정'}
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  </Styled>
);

View.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.object),
  formStuffs: PropTypes.arrayOf(PropTypes.object),
  submitData: PropTypes.func,
  saveTempContents: PropTypes.func,
  viewType: PropTypes.string,
  workSeq: PropTypes.number,
  taskSeq: PropTypes.number,
  deleteTask: PropTypes.func,
};

View.defaultProps = {
  boxes: [],
  formStuffs: [],
  submitData: () => console.debug('no bind events'),
  saveTempContents: () => console.debug('no bind events'),
  viewType: '',
};

export default View;
