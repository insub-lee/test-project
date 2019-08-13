import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Organization from 'containers/portal/components/Organization';
import { intlObj } from 'utils/commonUtils';
import messages from '../messages';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import StyleOrgAdmin from './StyleOrgAdmin';

class OrgAdmin extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      title: `${intlObj.get(messages.titleMain)}`,
    };
    // this.props.handleGetFullPath(this.props.profile.USER_ID);
    this.props.handleGetFullPath(this.props.fullPath.USER_ID);
  }

  componentDidMount() {
    // this.classChange(this.state.strUrl);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.props.handleGetFullPath(this.props.fullPath.USER_ID);
    }
  }

  render() {
    return (
      <div>
        <StyleOrgAdmin>
          <h3 className="pageTitle list">{this.state.title}</h3>
          <Organization
            isDeptSelectbox={true}
            isModal={false}
            show={true}
            // closeModal={this.allOrgClose}
            isProfile={true}
            userTab={true}
            pstnTab={true}
            dutyTab={true}
            grpTab={true}
            userSetting={true}
            userProfile={this.props.fullPath}
          />
        </StyleOrgAdmin>
      </div>
    );
  }
}
OrgAdmin.propTypes = {
  // profile: PropTypes.object.isRequired,
  fullPath: PropTypes.array.isRequired,
  handleGetFullPath: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profile: selectors.makeSelectProfile(),
  fullPath: selectors.makeSelectFullPath(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleGetFullPath: id => dispatch(actions.getFullPath(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'OrgAdmin', reducer });

const withSaga = injectSaga({ key: 'OrgAdmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrgAdmin);
