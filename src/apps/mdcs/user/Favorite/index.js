import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import List from './List';
// import View from './List/View';
import View from './List/View';

class Favorite extends Component {
  state = {
    movePageType: 'LIST',
    isViewModal: false,
    workSeq: -1,
    taskSeq: -1,
    favSeq: -1,
  };

  constructor(props) {
    super(props);

    this.onChangeMovePage = this.onChangeMovePage.bind(this);
  }

  onChangeMovePage = (movePageType, workSeq, taskSeq, favSeq) => {
    this.setState({
      movePageType,
      isViewModal: true,
      workSeq,
      taskSeq,
      favSeq,
    });
  };

  onCancel = viewType => {
    switch (viewType) {
      case 'LIST':
        this.setState({ isViewModal: false });
        // console.log('this.favoriteListComp : ', this.favoriteListComp);
        this.favoriteListComp.callListApi();
        break;
      default:
        this.setState({ isViewModal: false });
        break;
    }
  };

  render() {
    const { widgetId } = this.props;
    return (
      <div>
        <BizBuilderBase
          id="Favorite"
          favoriteListComp={ref => (this.favoriteListComp = ref)}
          // ref={(favoriteListComp) => { console.log('ref favoriteListComp : ', favoriteListComp); this.favoriteListComp = favoriteListComp; }}
          component={List}
          onChangeMovePageHandler={this.onChangeMovePage}
          {...this.props}
          viewType="LIST"
          workSeq={this.state.workSeq}
          isCustom
        />
        <Modal
          visible={this.state.isViewModal}
          width={800}
          height={450}
          bodyStyle={{ padding: '49px 8px 10px 8px' }}
          footer={[]}
          onCancel={() => {
            this.onCancel('VIEW');
          }}
          destroyOnClose
        >
          <BizBuilderBase
            {...this.props}
            id={`view${widgetId}`}
            workSeq={this.state.workSeq}
            taskSeq={this.state.taskSeq}
            favSeq={this.state.favSeq}
            component={View}
            onChangeMovePageHandler={() => {
              this.onCancel('LIST');
            }}
            viewType="VIEW"
            key={this.state.taskSeq}
            isCustom
          />
        </Modal>
      </div>
    );
  }
}

Favorite.propTypes = {
  widgetId: PropTypes.number,
  movePageType: PropTypes.string,
  workSeq: PropTypes.number,
  favSeq: PropTypes.number,
  apiInfo: PropTypes.object,
};

Favorite.defaultProps = {
  widgetId: 1000,
  movePageType: 'LIST',
  workSeq: 953,
  favSeq: -1,
  isEditModal: false,
  apiInfo: {
    url: '',
    type: 'GET',
    params: {},
  },
  onChangeMovePage: () => false,
};

export default Favorite;
