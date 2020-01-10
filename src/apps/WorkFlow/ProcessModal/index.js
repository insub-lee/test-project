import React, { Component } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';

import TableItems from './TableBuilder/TableItems';

import Whitespace from '../components/Panel';
import PanelContainer from '../components/Panel/PanelContainer';
import PanelContent from '../components/Panel/PanelContent';
import PanelHeader from '../components/Panel/PanelHeader';

import { defaultItems } from './mockupData';
import NodeInfo from './NodeInfo';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

class ProcessModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      usableItems: [...defaultItems],
      selectedItems: [],
    };
  }

  handleOpenModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleOk = () => {
    this.handleCancel();
  };

  onDragEnd = dropResult => {
    if (!dropResult.destination) {
      return;
    }

    const { source, destination } = dropResult;
    const { usableItems } = this.state;
    if (source.droppableId === 'node' && destination.droppableId === 'process') {
      const dragItem = usableItems.find((item, index) => index === source.index);
      const selItem = {
        ...dragItem,
      };
      this.setState(prevState => {
        const { selectedItems } = prevState;
        selectedItems.splice(destination.index, 0, selItem);
        return {
          selectedItems: selectedItems.map((item, index) => ({ ...item, step: index + 1 })),
        };
      });
    } else {
      this.setState(prevState => {
        const { selectedItems } = prevState;
        return {
          selectedItems: reorder(selectedItems, source.index, destination.index).map((item, index) => ({ ...item, step: index + 1 })),
        };
      });
    }
  };

  removeItem = itemIdx => {
    this.setState(prevState => {
      const { selectedItems } = prevState;
      selectedItems.splice(itemIdx, 1);
      return {
        selectedItems: selectedItems.map((item, index) => ({ ...item, step: index + 1 })),
      };
    });
  };

  render() {
    const { visible, usableItems, selectedItems } = this.state;

    return (
      <Modal
        title="Workflow 설정"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width="50%"
        style={{ top: 20 }}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            닫기
          </Button>,
          <Button key="ok" type="primary" onClick={this.handleOk}>
            확인
          </Button>,
        ]}
      >
        <div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Row>
              <Col span={14}>
                <Whitespace>
                  <PanelHeader title="설정" />
                  <PanelContainer>
                    <PanelContent>
                      <NodeInfo />
                    </PanelContent>
                  </PanelContainer>
                </Whitespace>
              </Col>
              {/* <Col span={6}>
                <TableItems title="Node" items={usableItems} dropId="node" />
              </Col> */}
              <Col span={10}>
                <TableItems title="Process" items={selectedItems} dropId="process" action={{ removeItem: this.removeItem }} />
              </Col>
            </Row>
          </DragDropContext>
        </div>
      </Modal>
    );
  }
}

export default ProcessModal;
