import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import Container from 'components/FormLayer/Container';
import Content from 'components/FormLayer/Content';
import Styled from 'components/FormLayer/Styled';

import ClickAbleFormGroup from '../ClickAbleFormGroup';
import ClickAbleDescriptions from '../ClickAbleDescriptions';

const CanvasFormLayer = ({ property: { formStuffs, box }, viewTargetId, action: { activeLayer, removePanel } }) => (
  <Styled className="form-layer">
    <Card size="small" title={box.property.useLabel ? box.property.label : null} bordered={false}>
      <Container>
        <Content>
          {box.property.type === 'normal' && formStuffs.length === 0 && <div>등록된 Component가 없습니다.</div>}
          {box.property.type === 'normal' &&
            formStuffs.map(formStuff => (
              <ClickAbleFormGroup
                key={formStuff.id}
                id={formStuff.id}
                viewTargetId={viewTargetId}
                formStuff={formStuff}
                action={{ activeLayer, removePanel }}
              />
            ))}
          {box.property.type === 'table' && (
            <ClickAbleDescriptions box={box} viewTargetId={viewTargetId} formStuffs={formStuffs} action={{ activeLayer, removePanel }} />
          )}
        </Content>
      </Container>
    </Card>
  </Styled>
);

CanvasFormLayer.propTypes = {
  property: PropTypes.shape({
    formStuffs: PropTypes.arrayOf(PropTypes.object),
    box: PropTypes.object.isRequired,
  }),
  action: PropTypes.object,
  viewTargetId: PropTypes.string,
};

CanvasFormLayer.defaultProps = {
  action: {
    activeLayer: () => false,
    removePanel: () => false,
  },
  viewTargetId: '',
  property: {
    formStuffs: [],
  },
};

export default CanvasFormLayer;
