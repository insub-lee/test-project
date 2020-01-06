import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Icon } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as selectors from './selectors';
import * as actions from './actions';
import saga from './saga';
import reducer from './reducer';
import StyledProfile from './StyledProfile';

class MyInfoWidget extends Component {
  componentDidMount() {}

  emailClipboardCopyHandle = () => {
    message.success(<MessageContent>이메일이 클립보드에 복사되었습니다.</MessageContent>, 1);
  };

  render() {
    const { profile } = this.props;

    return (
      <div>
        <StyledProfile className="user">
          <div className="user-img">
            <img
              src={`/img/thumb/200x200/${profile.PHOTO}`}
              alt={`${profile.NAME_KOR || 'User'}님의 사진`}
              onError={e => {
                e.target.src = '/no_img_pro.jpg';
              }}
            />
          </div>
          <div className="user-info">
            <span className="user-info-name">{profile.NAME_KOR}</span>
            <span className="user-info-belong">{`${profile.DEPT_NAME_KOR} / ${profile.PSTN_NAME_KOR} / ${profile.EMP_NO} `}</span>
            <span className="user-info-belong">
              {`${profile.EMAIL}`}
              <CopyToClipboard text={profile.EMAIL} onCopy={() => this.emailClipboardCopyHandle()}>
                <button type="button" style={{ marginLeft: 10 }}>
                  <Icon type="copy" style={{ fontSize: '15px' }} />
                </button>
              </CopyToClipboard>
            </span>
          </div>
        </StyledProfile>
      </div>
    );
  }
}

MyInfoWidget.propTypes = {
  profile: PropTypes.object,
};

MyInfoWidget.defaultProps = {};

const mapStateToProps = createStructuredSelector({
  profile: selectors.userProfile(),
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'MyInfoWidget', saga });
const withReducer = injectReducer({ key: 'MyInfoWidget', reducer });

export default compose(withReducer, withSaga, withConnect)(MyInfoWidget);
