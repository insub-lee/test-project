import React, { Component } from 'react';

import Modal from 'rc-dialog';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ModalContent from './modalContent';
import MainBanner from './mainBanner';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import Styled from './Styled';
class docArchitect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isOpen: false,
    };
  }

  componentDidMount() {
    const NODE_ID = this.props.item.data;
    const { WIDGET_ID } = this.props.item;
    this.props.getDocList(NODE_ID, WIDGET_ID);
    this.setState({ list: this.generateData() });
  }

  modalOpenHandler = e => {
    e.preventDefault();
    this.setState({ isOpen: true });
  };

  // GenerateData 나중에 DB에서 가져와야댐 최신 글 6개
  generateData = () => {
    const generatedList = [];

    return generatedList;
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  getType = path => {
    const type = path.substring(2, 4);
    switch (type) {
      case '11':
        return 2;
      case '12':
        return 3;
      case '15':
        return 5;
      default:
        return 1;
    }
  };

  render() {
    const { isOpen } = this.state;
    const { item, docList, num } = this.props;
    const settingOk = Object.keys(item.data).length !== 0;
    return (
      <Styled style={{ backgroundColor: '#798ea4' }} className="main_banner">
        {settingOk ? (
          <React.Fragment>
            <MainBanner num={num} list={docList} modalOpenHandler={this.modalOpenHandler} data={item.data} />
            <Modal
              maskClosable={false}
              visible={isOpen}
              animation="zoom"
              maskAnimation="fade"
              onClose={this.handleClose}
              style={{
                minWidth: 700,
              }}
              bodyStyle={{
                padding: 0,
              }}
              closable={false}
              destroyOnClose
            >
              <ModalContent handleClose={this.handleClose} data={item.data} />
            </Modal>
          </React.Fragment>
        ) : (
          <div className="big">
            {' '}
            분류체계를<br></br>선택해 주세요
          </div>
        )}
      </Styled>
    );
  }
}
docArchitect.propTypes = {
  item: PropTypes.object,
};

docArchitect.defaultProps = {
  item: {
    WIDGET_ID: 11052,
    data: {
      CHILDREN_CNT: 14,
      CODE: 'B',
      DESCIPTION: '기술표준',
      FULLPATH: '9|12',
      LVL: 1,
      MAP_ID: 3,
      NAME_CHN: '기술표준',
      NAME_ENG: 'technical Standard',
      NAME_ETC: '기술표준',
      NAME_JPN: '기술표준',
      NAME_KOR: '기술표준',
      NODE_ID: 12,
      NODE_ORDINAL: '000003000002',
      PARENT_NODE_ID: 9,
      USE_YN: 'Y',
    },
  },
  docList: [],
  num: 0,
};

const mapStateToProps = createStructuredSelector({
  docList: selectors.makeSelectDocList(),
  num: selectors.makeSelectDocNum(),
});

const mapDispatchToProps = dispatch => ({
  getDocList: (NODE_ID, WIDGET_ID) => dispatch(actions.getDocListBySaga(NODE_ID, WIDGET_ID)),
});

const withReducer = injectReducer({ key: 'apps-mdcs-user-docArchitect-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-mdcs-user-docArchitect-reducer', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(docArchitect);
