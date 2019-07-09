import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Descriptions, Form } from 'antd';

import Container from 'components/FormLayer/Container';
import Content from 'components/FormLayer/Content';
import StyledFormLayer from 'components/FormLayer/Styled';
import { formStuffRenderer } from 'components/WorkBuilder/config';
import StyledFormStuff from 'components/WorkBuilder/View/StyledFormStuff';

import Styled from './Styled';

const View = ({
  boxes, formStuffs, submitData, preview,
}) => (
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
                            <Form.Item label={formStuff.property.label}>{formStuffRenderer[formStuff.type](formStuff)}</Form.Item>
                          </StyledFormStuff>
                        ))}
                    {box.property.type === 'table' && (
                      <Descriptions bordered border size="small" column={box.property.column}>
                        {formStuffs
                          .filter(formStuff => formStuff.parentId === box.id)
                          .map(formStuff => (
                            <Descriptions.Item key={formStuff.id} label={formStuff.property.label} span={formStuff.property.span || 1}>
                              <Styled classNam="form-group">{formStuffRenderer[formStuff.type](formStuff)}</Styled>
                            </Descriptions.Item>
                          ))}
                      </Descriptions>
                    )}
                  </Content>
                </Container>
              </Card>
            </StyledFormLayer>
          ))}
          {!preview && (
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                등록
              </Button>
            </Form.Item>
          )}
        </div>
      </div>
    </Form>
  </Styled>
);

View.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.object),
  formStuffs: PropTypes.arrayOf(PropTypes.object),
  submitData: PropTypes.func,
  preview: PropTypes.bool,
};

View.defaultProps = {
  boxes: [],
  formStuffs: [],
  submitData: () => console.debug('no bind events'),
  preview: false,
};

export default View;
