import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import Styled from './Styled';
import DraggableBody from './DraggableBody';
import ClickAbleSignLine from './ClickAbleSignLine';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const Canvas = ({ property: { boxes, groups, formStuffs, viewTargetId, useSignLine, signLine }, action }) => (
  <Styled
    className="canvas"
    onClick={e => {
      e.stopPropagation();
      action.disableLayers();
    }}
  >
    <Form layout="vertical">
      <div className="canvas__frame" id="canvas">
        {useSignLine && (
          <div>
            <ClickAbleSignLine action={action} signLine={signLine} viewTargetId={viewTargetId} />
          </div>
        )}
        <DraggableBody property={{ boxes, groups, formStuffs }} action={action} viewTargetId={viewTargetId} />
      </div>
    </Form>
  </Styled>
);

Canvas.propTypes = {
  property: PropTypes.object,
  action: PropTypes.object,
};

Canvas.defaultProps = {
  property: {
    canvas: [],
  },
  action: {
    selectLayerId: () => false,
    disableLayers: () => false,
  },
};

export default Canvas;
