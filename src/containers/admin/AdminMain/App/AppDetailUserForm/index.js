import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
// import { Button, Row, Col } from 'antd';
import { injectIntl } from 'react-intl';
// import WidgetSkin from 'components/uielements/styles/widgetSkin';
import OrgReturnView from 'components/OrgReturnView';
// import basicStyle from 'config/basicStyle';
import { intlObj, lang } from 'utils/commonUtils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import StyleAppDetailUserForm from './StyleAppDetailUserForm';
import messages from '../messages';

// const { rowStyle, colStyle, gutter } = basicStyle;

class AppDetailUserForm extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      isOpen: false,
      images: [],
      photoIndex: 0,
    };
    this.props.getMyAppDetail(prop.APP_ID, prop.VER, lang.getLocale(), prop.history, prop.mod);
  }

  managerPop = () => {
    feed.success('개발 예정인 기능 입니다.');
  };

  render() {
    const { isOpen, images, photoIndex } = this.state;

    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
        {/* App 정보 */}
        <StyleAppDetailUserForm>
          {/* <h2 className="appInfo">{intlObj.get(messages.appInfo)}</h2>
          <h2 className="appInfo">{intlObj.get(messages.verInfo)}</h2> */}

          <h4>
            {intlObj.get(messages.manager)} ({intlObj.get(messages.groupCharge)})
          </h4>
          {this.props.appManagerList.length > 0 ? (
            <OrgReturnView
              managerList={this.props.appManagerList}
              delFlag={false}
              scroll={0}
              // returnManagerList={returnManagerList}
            />
          ) : (
            ''
          )}
          {/* <h2 className="appInfo">{intlObj.get(messages.permissions)}</h2> */}
          <h4>{intlObj.get(messages.target)}</h4>
          <div className="appManagerListBoxNoScroll">
            <OrgReturnView
              userList={this.props.userList}
              dutyList={this.props.dutyList}
              pstnList={this.props.pstnList}
              grpList={this.props.grpList}
              deptList={this.props.deptList}
              delFlag={false}
              scroll={0}
            />
          </div>
        </StyleAppDetailUserForm>
      </div>
    );
  }
}

AppDetailUserForm.propTypes = {
  getMyAppDetail: PropTypes.func, //eslint-disable-line
  setMyAppDetail: PropTypes.object, //eslint-disable-line
  appManagerList: PropTypes.array, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  userList: PropTypes.array, //eslint-disable-line
  dutyList: PropTypes.array, //eslint-disable-line
  pstnList: PropTypes.array, //eslint-disable-line
  grpList: PropTypes.array, //eslint-disable-line
  deptList: PropTypes.array, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  getMyAppDetail: (APP_ID, VER, LANG, history, mod) => {
    dispatch(actions.getMyAppDetail(APP_ID, VER, LANG, history, mod));
  },
});

const mapStateToProps = createStructuredSelector({
  appManagerList: selectors.makeSelectAppManagerList(),
  userList: selectors.makeSelectUserList(),
  dutyList: selectors.makeSelectDutyList(),
  pstnList: selectors.makeSelectPstnList(),
  grpList: selectors.makeSelectGrpList(),
  deptList: selectors.makeSelectDeptList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'admin/AdminMain/App/AppDetailUserForm', saga });
const withReducer = injectReducer({ key: 'admin/AdminMain/App/AppDetailUserForm', reducer });

export default injectIntl(compose(withReducer, withSaga, withConnect)(AppDetailUserForm));
