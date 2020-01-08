import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Descriptions } from 'antd';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import SingleImageUploader from './singleImageUploader';
import * as selectors from '../widget/selectors';
import * as actions from '../widget/actions';
import saga from '../widget/saga';
import reducer from '../widget/reducer';
import StyledSetting from './StyledSetting';

class MyInfoWidgetSetting extends PureComponent {
  state = {
    onEdit: false,
  };

  componentDidMount() {}

  render() {
    const { profile, settingData, changeUserInfo, updateUserInfo } = this.props;
    const { onEdit } = this.state;

    return (
      <div className="commonPage">
        <div className="basicSettingTable">
          <StyledSetting>
            <table className="myInfoSettingTable" style={{ borderSpacing: '10px', borderCollapse: 'collapse' }}>
              <tr>
                <td className="settingTd">
                  <SingleImageUploader defaultUserPhoto={profile.PHOTO} changeUserInfo={changeUserInfo} />
                </td>
                <td className="settingTd">
                  <Descriptions size="small" bordered column={3}>
                    <Descriptions.Item label="이름" span={3}>
                      <span>{profile.NAME_KOR}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="부서" span={1}>
                      <span>{profile.DEPT_NAME_KOR}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="직위" span={1}>
                      <span>{profile.PSTN_NAME_KOR}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="사번" span={1}>
                      <span>{profile.EMP_NO}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="사무실 연락처" span={3}>
                      <span>{profile.OFFICE_TEL_NO}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="개인 연락처" span={3}>
                      {!onEdit ? (
                        <span className="editable" onClick={() => this.setState({ onEdit: true })}>
                          {settingData.has('MOBILE_TEL_NO') ? settingData.get('MOBILE_TEL_NO') : profile.MOBILE_TEL_NO}
                        </span>
                      ) : (
                        <input
                          type="text"
                          maxLength={13}
                          onChange={e => changeUserInfo('MOBILE_TEL_NO', e.target.value)}
                          defaultValue={settingData.has('MOBILE_TEL_NO') ? settingData.get('MOBILE_TEL_NO') : profile.MOBILE_TEL_NO}
                        />
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="이메일" span={3}>
                      {!onEdit ? (
                        <span className="editable" onClick={() => this.setState({ onEdit: true })}>
                          {settingData.has('EMAIL') ? settingData.get('EMAIL') : profile.EMAIL}
                        </span>
                      ) : (
                        <input
                          type="text"
                          onChange={e => changeUserInfo('EMAIL', e.target.value)}
                          defaultValue={settingData.has('EMAIL') ? settingData.get('EMAIL') : profile.EMAIL}
                        />
                      )}
                    </Descriptions.Item>
                  </Descriptions>
                </td>
              </tr>
              <tr>
                <td className="btnRow settingTd" colSpan={2}>
                  <span className="editBtn">
                    <StyledButton className="btn-primary" onClick={() => updateUserInfo(profile.USER_ID, settingData)}>
                      적용
                    </StyledButton>
                  </span>
                </td>
              </tr>
            </table>
          </StyledSetting>
        </div>
      </div>
    );
  }
}

MyInfoWidgetSetting.propTypes = {
  profile: PropTypes.object,
  settingData: PropTypes.object,
  changeUserInfo: PropTypes.func,
  updateUserInfo: PropTypes.func,
};

MyInfoWidgetSetting.defaultProps = {
  changeUserInfo: () => false,
  updateUserInfo: () => false,
};

const mapStateToProps = createStructuredSelector({
  settingData: selectors.settingData(),
  profile: selectors.userProfile(),
});

const mapDispatchToProps = dispatch => ({
  changeUserInfo: (target, value) => dispatch(actions.changeUserInfo(target, value)),
  updateUserInfo: (userId, settingData) => dispatch(actions.updateUserInfo(userId, settingData)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'MyInfoWidget', saga });
const withReducer = injectReducer({ key: 'MyInfoWidget', reducer });

export default compose(withReducer, withSaga, withConnect)(MyInfoWidgetSetting);
