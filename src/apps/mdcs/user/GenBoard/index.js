import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';
import List from './List';
import Edit from './Edit';
import View from './View';

import BizBuilderBase from '../../components/BizBuilderBase';

class GenBoard extends Component {
  state = {
    movePageType: 'LIST',
    isEditModal: false,
    isViewModal: false,
    workSeq: -1,
    taskSeq: -1,
  };

  constructor(props) {
    super(props);

    this.onChangeMovePage = this.onChangeMovePage.bind(this);
  }

  onChangeMovePage = (movePageType, workSeq, taskSeq) => {
    this.setState({
      movePageType,
      isEditModal: movePageType === 'EDIT',
      isViewModal: movePageType === 'VIEW',
      workSeq,
      taskSeq,
    });
  };

  onSaveComplete = id => {
    this.setState({ isEditModal: false });
  };

  onDeleteComplete = id => {
    this.setState({ isViewModal: false });
  };

  onCancel = viewType => {
    if (viewType === 'EDIT') {
      this.setState({ isEditModal: false });
    } else {
      this.setState({ isViewModal: false });
    }
  };

  render() {
    const { widgetId } = this.props;

    return (
      <div style={{ padding: '48px' }}>
        <BizBuilderBase id={`list${widgetId}`} component={List} onChangeMovePageHandler={this.onChangeMovePage} viewType="LIST" {...this.props} />
        <Modal
          visible={this.state.isEditModal}
          width={800}
          height={450}
          bodyStyle={{ padding: '49px 8px 10px 8px' }}
          footer={[]}
          onCancel={() => this.onCancel('EDIT')}
          destroyOnClose
        >
          {this.state.isEditModal && (
            <BizBuilderBase
              movePageType={this.state.movePageType}
              id={`edit${widgetId}`}
              workSeq={this.state.workSeq}
              taskSeq={this.state.taskSeq}
              reloadId={`list${widgetId}`}
              onSaveComplete={this.onSaveComplete}
              component={Edit}
              onChangeMovePageHandler={this.onChangeMovePage}
              viewType="EDIT"
              {...this.props}
            />
          )}
        </Modal>
        <Modal
          visible={this.state.isViewModal}
          width={800}
          height={450}
          bodyStyle={{ padding: '49px 8px 10px 8px' }}
          footer={[]}
          onCancel={() => this.onCancel('VIEW')}
          destroyOnClose
        >
          <BizBuilderBase
            id={`view${widgetId}`}
            workSeq={this.state.workSeq}
            taskSeq={this.state.taskSeq}
            component={View}
            onChangeMovePageHandler={this.onChangeMovePage}
            onDeleteComplete={this.onDeleteComplete}
            viewType="VIEW"
            {...this.props}
            key={this.state.taskSeq}
          />
        </Modal>
      </div>
    );
  }
}

GenBoard.propTypes = {
  widgetId: PropTypes.number,
  movePageType: PropTypes.string,
  workSeq: PropTypes.number,
  apiInfo: PropTypes.object,
  isEditModal: PropTypes.bool,
  onChangeMovePage: PropTypes.func,
  onMovePageComponent: PropTypes.func,
};

GenBoard.defaultProps = {
  widgetId: 1000,
  movePageType: 'LIST',
  workSeq: 1206,
  isEditModal: false,
  apiInfo: {
    url: '',
    type: 'GET',
    params: {},
  },
  onChangeMovePage: () => false,
  onMovePageComponent: () => false,
};

export default GenBoard;
