import React from 'react';
import { Button, Row, Col, Divider } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import ItemBody from './ItemBody';

const CompareItem = ({ compareItems, action }) => (
  <div>
    <Row gutter={10}>
      <Col span={24}>
        <Divider orientation="left">항목</Divider>
      </Col>
    </Row>
    <Row gutter={10}>
      <Col span={24}>
        <div style={{ height: '330px', overflowY: 'auto' }}>
          <DragDropContext onDragEnd={action.moveCtContentItem}>
            <ItemBody items={compareItems} dropId="process" action={action} />
          </DragDropContext>
        </div>
      </Col>
    </Row>
    <Row gutter={10} style={{ marginTop: '15px', marginBottom: '15px' }}>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Button type="primary" onClick={action.addCtContentItem}>
          추가
        </Button>
      </Col>
    </Row>
  </div>
);

CompareItem.propTypes = {
  compareItems: PropTypes.array.isRequired,
  action: PropTypes.object.isRequired,
};

export default CompareItem;
