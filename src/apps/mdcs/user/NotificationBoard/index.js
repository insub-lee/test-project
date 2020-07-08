import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import List from './List';
import Edit from './Edit';
import View from './View';

class NotificationBoard extends Component {
  state = {
    movePageType: 'LIST',
    isEditModal: false,
    isViewModal: false,
    workSeq: -1,
    taskSeq: -1,
    // editMode: 'INSERT',
  };

  constructor(props) {
    super(props);

    this.onChangeMovePage = this.onChangeMovePage.bind(this);
    this.onSaveComplete = this.onSaveComplete.bind(this);
  }

  onChangeMovePage = (movePageType, workSeq, taskSeq) => {
    this.setState({
      movePageType,
      isEditModal: movePageType === 'EDIT' || movePageType === 'MODIFY',
      isViewModal: movePageType === 'VIEW',
      workSeq,
      taskSeq,
    });
  };

  onSaveComplete = () => {
    this.setState({
      isEditModal: false,
    });
  };

  onDeleteComplete = () => {
    this.setState({
      isViewModal: false,
    });
  };

  onCancel = viewType => {
    if (viewType === 'EDIT') {
      this.setState({ isEditModal: false });
    } else {
      this.setState({ isViewModal: false });
    }
  };

  render() {
    // const { item } = this.props;
    // const widgetId = item && item.WIDGET_ID ? item.WIDGET_ID : 2723;
    // const workSeq = item && item.data && item.data.WORK_SEQ ? item.data.WORK_SEQ : 1064; // 779
    const { widgetId } = this.props;
    return (
      <div>
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
              component={Edit}
              onChangeMovePageHandler={this.onChangeMovePage}
              onSaveComplete={this.onSaveComplete}
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
          onChangeMovePageHandler={this.onChangeMovePage}
          deleteTask={this.deleteTask}
        >
          <BizBuilderBase
            id={`view${widgetId}`}
            workSeq={this.state.workSeq}
            taskSeq={this.state.taskSeq}
            reloadId={`list${widgetId}`}
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

NotificationBoard.propTypes = {
  widgetId: PropTypes.number,
  movePageType: PropTypes.string,
  workSeq: PropTypes.number,
  apiInfo: PropTypes.object,
  isEditModal: PropTypes.bool,
  onChangeMovePage: PropTypes.func,
  onMovePageComponent: PropTypes.func,
};

NotificationBoard.defaultProps = {
  widgetId: 1000,
  movePageType: 'LIST',
  workSeq: 1064,
  isEditModal: false,
  apiInfo: {
    url: '',
    type: 'GET',
    params: {},
  },
  onChangeMovePage: () => false,
  onMovePageComponent: () => false,
};

export default NotificationBoard;
