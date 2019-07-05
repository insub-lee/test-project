import { formStuffRenderer } from 'components/WorkBuilder/config';
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Descriptions, Form } from 'antd';

import Container from 'components/FormLayer/Container';
import Content from 'components/FormLayer/Content';
import Styled from 'components/FormLayer/Styled';

import FormStuffTableType from './FormStuffTableType';
import StyledFormStuff from './StyledFormStuff';

const Boxes = ({ boxes, formStuffs, getFieldDecorator }) => (
  <div>
    {boxes.map(box => (
      <Styled key={box.id} classname="form-layer">
        <Card size="small" title={box.property.useLabel ? box.property.label : null} bordered={false}>
          <Container>
            <Content>
              {box.property.type === 'normal' &&
                formStuffs
                  .filter(formStuff => formStuff.parentId === box.id)
                  .map(formStuff => (
                    <StyledFormStuff key={formStuff.id} className="form-group">
                      <Form.Item label={formStuff.property.label}>
                        {getFieldDecorator('HELLO', { rules: [{ required: true, message: 'Please input your username!' }] })(
                          formStuffRenderer[formStuff.type](formStuff),
                        )}
                      </Form.Item>
                    </StyledFormStuff>
                  ))}
              {box.property.type === 'table' && (
                <FormStuffTableType formStuffs={formStuffs.filter(formStuff => formStuff.parentId === box.id)} column={box.property.column} />
              )}
            </Content>
          </Container>
        </Card>
      </Styled>
    ))}
  </div>
);

Boxes.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.object),
  formStuffs: PropTypes.arrayOf(PropTypes.object),
};

Boxes.defaultProps = {
  boxes: [],
  formStuffs: [],
};

export default Boxes;
