import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import { Row, Col } from 'antd';

import Whitespace from 'components/Panel';
import PanelContainer from 'components/Panel/PanelContainer';
import PanelContent from 'components/Panel/PanelContent';
import PanelHeader from 'components/Panel/PanelHeader';

import TableBody from './TableBody';
import HeaderAdder from './HeaderAdder';
import TableItems from './TableItems';

const TableBuilder = props => (
  <div>
    <DragDropContext onDragEnd={props.onDragEnd}>
      <Row className="" gutter={24}>
        <Col span={4} className="">
          <TableItems items={props.items} />
        </Col>
        <Col span={20} className="">
          <Whitespace>
            <PanelHeader title="Form" />
            <PanelContainer>
              <PanelContent>
                <HeaderAdder {...props} />
                <TableBody {...props} />
              </PanelContent>
            </PanelContainer>
          </Whitespace>
        </Col>
      </Row>
    </DragDropContext>
  </div>
);

TableBuilder.propTypes = {
  onDragEnd: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object),
};

TableBuilder.defaultProsp = {
  onDragEnd: () => false,
  items: [],
};

export default TableBuilder;
