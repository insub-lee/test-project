/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent, Fragment } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import saga from './saga';
import reducer from './reducer';
import * as actions from './actions';
import * as selectors from './selectors';
import informNote from './informNote';
import informnoteGridColumSetPopup from './CommonInformnoteGridColumSetPopup';
import informNoteHotPopup from './HotPopup';
import informNoteListAlarmListPopup from './InformNoteListAlarmListPopup';
import informNoteListAlarmPopup from './InformNoteListAlarmPopup';
import informNoteListCBMSelectListPopup from './InformNoteListCBMSelectListPopup';
import informNoteListCreatePopup from './InformNoteListCreatePopup';
import informNotice from './InformNotice';
import InformNoticeDetailPopup from './InformNoticeDetail';
import plan from './Plan';
import informNoteEqid from './EqIdSearch'
import InformNoteSafetyWorkConnect from './InformNoteSafetyWorkConnect';
import InformNoteTechSafeDetail from './InformNoteTechSafeDetail';
import InformNoteDetailAttachFile from './InformNoteDetailAttachFile';
import Loading from 'containers/common/Loading';
import DatabaseSession from './databaseSession';

const renderPageProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  console.log('renderPageProps', finalProps);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRouter = ({component, ...rest}) => {
  return (
    <Route {...rest} render={routeProps =>{
      return renderPageProps(component, routeProps, rest);
    }}/>
  );
}

class InformNote extends PureComponent {
  constructor(props) {
    super(props);
    props.handleLoadingUserCompanyDefine();

  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    //this.setState({userCompanyDefine: nextProps.userCompanyDefine});
  }

  render() {
    console.log('render', this.props);
    return (       
      <div>
        {/* 기입바람 */}
        <PropsRouter path="/apps/informNote" component={informNote} userCompanyDefine={this.props.userCompanyDefine} exact/>
        <PropsRouter path="/sm/informNote" component={informNote} userCompanyDefine={this.props.userCompanyDefine} exact/>
        {/* 기입바람 */}
        <Route path="/apps/informNote/pop/CommonInformnoteGridColumSetPopup/:PARAM" component={informnoteGridColumSetPopup} exact />
        <Route path="/sm/informNote/pop/CommonInformnoteGridColumSetPopup/:PARAM" component={informnoteGridColumSetPopup} exact />
        {/* 기입바람 */}
        <Route path="/apps/informNote/pop/HotPopup/:PARAM" component={informNoteHotPopup} exact />
        <Route path="/sm/informNote/pop/HotPopup/:PARAM" component={informNoteHotPopup} exact />
        {/* 기입바람 */}
        <Route path="/apps/informNote/pop/InformNoteListAlarmListPopup/:PARAM" component={informNoteListAlarmListPopup} exact />
        <Route path="/sm/informNote/pop/InformNoteListAlarmListPopup/:PARAM" component={informNoteListAlarmListPopup} exact />
        {/* 기입바람 */}
        <Route path="/apps/informNote/pop/InformNoteListAlarmPopup/:PARAM" component={informNoteListAlarmPopup} exact />
        <Route path="/sm/informNote/pop/InformNoteListAlarmPopup/:PARAM" component={informNoteListAlarmPopup} exact />
        {/* 기입바람 */}
        <Route path="/apps/informNote/pop/InformNoteListCBMSelectListPopup/:PARAM" component={informNoteListCBMSelectListPopup} exact />
        <Route path="/sm/informNote/pop/InformNoteListCBMSelectListPopup/:PARAM" component={informNoteListCBMSelectListPopup} exact />
        {/* 기입바람 */}
        <Route path="/apps/informNote/pop/InformNoteListCreatePopup/:PARAM" component={informNoteListCreatePopup} exact />
        <Route path="/sm/informNote/pop/InformNoteListCreatePopup/:PARAM" component={informNoteListCreatePopup} exact />
        {/* 기입바람 */}
        <Route path="/apps/informNote/pop/InformNotice" component={informNotice} exact />
        <Route path="/sm/informNote/pop/InformNotice" component={informNotice} exact />
        {/* 기입바람 */}
        <Route path="/apps/informNote/pop/InformNoticeDetailPopup/:uid" component={InformNoticeDetailPopup} exact />
        <Route path="/sm/informNote/pop/InformNoticeDetailPopup/:uid" component={InformNoticeDetailPopup} exact />
        {/* 기입바람 */}
        <Route path="/apps/informNote/Plan/:PARAM" component={plan} exact />
        <Route path="/sm/informNote/Plan/:PARAM" component={plan} exact />
        {/* 기입바람 */}
        <Route path="/apps/informNote/EqIdSearch" component={informNoteEqid} exact />
        <Route path="/sm/informNote/EqIdSearch" component={informNoteEqid} exact />
        
        <Route path="/sm/informNote/pop/InformNoteSafetyWorkConnect" component={InformNoteSafetyWorkConnect} exact />
		    <Route path="/sm/informNote/pop/InformNoteTechSafeDetail/:PARAM" component={InformNoteTechSafeDetail} exact />
        <Route path="/sm/informNote/pop/InformNoteDetailAttachFile/:PARAM" component={InformNoteDetailAttachFile} exact />

        <Route path="/sm/informNote/DatabaseSession" component={DatabaseSession} exact />
      </div>
    );
  }
}

InformNote.defaultProps = {
  userCompanyDefine: [],
};

InformNote.propTypes = {
  userCompanyDefine: PropTypes.array,
  handleLoadingUserCompanyDefine: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userCompanyDefine: selectors.makeUserCompanyDefine(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingUserCompanyDefine: () => dispatch(actions.loadingUserCompanyDefine()),
  };
}

const withReducer = injectReducer({ key: 'hypm_common', reducer });
const withSaga = injectSaga({ key: 'hypm_common', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(InformNote);