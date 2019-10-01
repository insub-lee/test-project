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
      isEditModal: true,
      workSeq,
      taskSeq,
    });
  };

  onSaveComplete = id => {
    console.debug('onSaveComplete');
    this.setState({
      isEditModal: false,
    });
  };

  onCancel = () => {
    this.setState({
      isEditModal: false,
    });
  };

  render() {
    const { widgetId } = this.props;
    return (
      <div>
        <BizBuilderBase id={`list${widgetId}`} component={List} onChangeMovePageHandler={this.onChangeMovePage} viewType="LIST" {...this.props} />
        <Modal
          visible={this.state.isEditModal}
          width={800}
          height={350}
          bodyStyle={{ padding: '49px 8px 10px 8px' }}
          footer={[]}
          onCancel={this.onCancel}
          destroyOnClose
        >
          <React.Fragment>
            <BizBuilderBase
              visible={this.state.movePageType === 'EDIT'}
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
            <BizBuilderBase
              visible={this.state.movePageType === 'VIEW'}
              id={`view${widgetId}`}
              workSeq={this.state.workSeq}
              taskSeq={this.state.taskSeq}
              component={View}
              onChangeMovePageHandler={this.onChangeMovePage}
              viewType="VIEW"
              {...this.props}
              key={this.state.taskSeq}
            />
          </React.Fragment>
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
  workSeq: 668,
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
