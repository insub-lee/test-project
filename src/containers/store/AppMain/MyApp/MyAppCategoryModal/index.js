import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import ModalDrag from 'components/ModalDrag';

import * as feed from 'components/Feedback/functions';

import { intlObj, lang } from 'utils/commonUtils';
import messages from '../messages';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

import Modals from '../../../../../components/Modal/index';
import ModalStyle from '../../../components/Modal/StyleModal';
import WithDirection from '../../../../../config/withDirection';

import { BtnDkGray, BtnLgtGray } from '../../../components/uielements/buttons.style';
import MyAppTree from '../../../components/MyAppTree';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

class MyAppCategoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CATG_ID: 0,
      APP_NAME: '',
      selectedIndex: 1,
      PRNT_ID: 0,
    };
    this.props.initCategoryData();
  }
  // componentWillMount() {
  //   this.props.initCategoryData();
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedIndex: nextProps.selectedIndex });
  }

  render() {
    const {
      type,
    } = this.props;

    const handleTreeOnClick = (node) => {
      this.setState({
        CATG_ID: node.CATG_ID,
        APP_NAME: lang.get('NAME', node),
        selectedIndex: node.CATG_ID,
        PRNT_ID: node.PRNT_ID,
      });
    };
    const onOk = () => {
      if (this.state.PRNT_ID === -1) {
        feed.error(`${intlObj.get(messages.topcateno)}`);
      } else {
        this.props.returnGateId(this.state.CATG_ID, this.state.APP_NAME);
        this.props.closeModal();
        // this.setState({ show: false });
      }
    };
    const returnGateInfo = (resultObj1, resultObj2, resultObj3, resultObj4) => {
      this.setState({ selectedIndex: resultObj1 });
      this.props.cateinsert(resultObj1, resultObj2, resultObj3, resultObj4);
    };
    const returnGateUpdate = (resultObj1, resultObj2, resultObj3, resultObj4) => {
      this.props.cateUpdate(resultObj1, resultObj2, resultObj3, resultObj4);
    };
    const returnGateDelete = (resultObj1, resultObj2) => {
      // alert(resultObj1 + resultObj2);
      this.props.cateDelete(resultObj1, resultObj2);
    };

    return (
      <div>
        <Modal
          visible={this.props.show}
          onCancel={this.props.closeModal}
          onOk={onOk}
          maskClosable={false}
          width={350}
          wrapClassName="vertical-center-modal"
          bodyStyle={{ maxHeight: 500 }}
          // title="카테고리 선택"
          title={
            <ModalDrag
              title="카테고리 선택"
              num={0}
            />
          }
          footer={[
            <BtnLgtGray
              key="back"
              onClick={this.props.closeModal}
            >
              {intlObj.get(messages.cancel)}
            </BtnLgtGray>,
            <BtnDkGray
              key="submit"
              loading={this.state.loading}
              onClick={onOk}
            // className={this.state.qnaOn ? '' : 'disabled'}
            >
              {intlObj.get(messages.confirm)}
            </BtnDkGray>,
          ]}
          className="storeModal"
        >
          <div className="ant-modal-body-content">
            <MyAppTree
              type={type}
              treeData={this.props.categoryData}
              onClick={handleTreeOnClick}
              returnGateInfo={returnGateInfo}
              returnGateUpdate={returnGateUpdate}
              returnGateDelete={returnGateDelete}
              history={this.props.history}
              selectedIndex={this.state.selectedIndex}
              canDrag={true}
              canDrop={true}
              moveMymenu={this.props.moveMymenu}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
MyAppCategoryModal.propTypes = {
  type: PropTypes.string.isRequired,
  show: PropTypes.bool,  //eslint-disable-line
  onCancel: PropTypes.func,  //eslint-disable-line
  initCategoryData: PropTypes.func, //eslint-disable-line
  categoryData: PropTypes.array, //eslint-disable-line
  selectedIndex: PropTypes.number, //eslint-disable-line
  titleModalVisible: PropTypes.bool, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  returnGateId: PropTypes.func.isRequired, //eslint-disable-line
  cateinsert: PropTypes.func, //eslint-disable-line
  // returnGateUpdate: PropTypes.func.isRequired, //eslint-disable-line
  cateUpdate: PropTypes.func, //eslint-disable-line
  cateDelete: PropTypes.func, //eslint-disable-line
  moveMymenu: PropTypes.func, //eslint-disable-line
  closeModal: PropTypes.func, //eslint-disable-line
};
export function mapDispatchToProps(dispatch) {
  return {
    // 카테고리
    initCategoryData: () => dispatch(actions.initCategoryData()),
    cateinsert: (PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN) => {
      dispatch(actions.cateinsert(PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN));
    },
    cateUpdate: (PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN) => {
      dispatch(actions.cateUpdate(PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN));
    },
    cateDelete: (PRNT_ID, SORT_SQ) => {
      dispatch(actions.cateDelete(PRNT_ID, SORT_SQ));
    },
    moveMymenu: treeData => dispatch(actions.moveMymenu(treeData)),
  };
}
const mapStateToProps = createStructuredSelector({
  // 카테고리
  categoryData: selectors.makeCategoryData(),
  selectedIndex: selectors.makeSelectedIndex(),
  titleModalVisible: selectors.makeModalVisible(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'myapp', reducer });
const withSaga = injectSaga({ key: 'myapp', saga });

export default injectIntl(compose(
  withReducer,
  withSaga,
  withConnect,
)(MyAppCategoryModal));
