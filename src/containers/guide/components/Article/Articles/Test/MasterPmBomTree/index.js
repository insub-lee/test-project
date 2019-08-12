import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Modal, Button } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import _ from 'lodash';

import Tree from './Tree';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

class MasterPmBomTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      tempList: [],
    };
    const param = { // 임의 파라미터
      equnr: 'IM0000198567',
      swerk: '1010',
    };
    this.props.handleGetMasterPmBom(param);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOnCancel = () => {
    this.setState({
      visible: false,
    });
  }
  handleOnClick = (node) => {
    if (node.MTART === 'ERSA') { // IBAU-폴더, ERSA-품목
      this.setState({
        tempList: _.unionBy(this.state.tempList, [{ ...node }], 'key'),
      });
    }
  }

  render() {
    const {
      pmBomTreeList,
    } = this.props;

    const {
      tempList,
    } = this.state;

    return (
      <div>
        <Button
          title="Bom트리팝업"
          onClick={this.showModal}
        >
          Bom트리팝업
        </Button>

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onCancel={this.handleOnCancel}
          okButtonProps={{
            style: { display: 'none' },
          }}
        >
          <Tree
            treeData={pmBomTreeList}
            handleOnClick={this.handleOnClick}
          />
        </Modal>

        <div>
          {tempList.map(m => (
            <p>
              {m.key} / {m.OJTXP} / {m.MTART_T}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

MasterPmBomTree.propTypes = {
  handleGetMasterPmBom: PropTypes.func.isRequired,
  pmBomTreeList: PropTypes.array,
};

MasterPmBomTree.defaultProps = {
  pmBomTreeList: [],
};

const mapStateToProps = createStructuredSelector({
  pmBomTreeList: selectors.makePmBomTreeList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleGetMasterPmBom: param => dispatch(actions.getMasterPmBom(param)),
  };
}

const withReducer = injectReducer({ key: 'masterBom', reducer });
const withSaga = injectSaga({ key: 'masterBom', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MasterPmBomTree);
