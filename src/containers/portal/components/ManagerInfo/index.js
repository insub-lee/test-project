import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { Popover } from 'antd';
import Organization from 'containers/portal/components/Organization';
import IconManager from 'images/portal/icon-manager.png';
import Button from '../../../../components/Button';
import UserProfile from '../UserProfile';
import StyleManagerInfo from './StyleManagerInfo';
import StyleManagerModal from './StyleManagerModal';

class ManagerInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      userProfile: {},
    };
  }
  componentDidMount() {}

  onExecOrg = (profile) => {
    this.setState({
      userProfile: profile,
      show: true,
    });
  }

  closeModal = () => {
    this.setState({ show: false });
  }

  render() {
    const {
      managerInfo,
      trigger,
    } = this.props;

    const {
      show,
      userProfile,
    } = this.state;

    let managers = [];

    if (managerInfo) {
      managers = managerInfo.map(o => (
        <UserProfile
          userProfile={o}
          style={{
            marginBottom: '6px',
            width: '300px',
          }}
          isPopover={true}
          onExecOrg={this.onExecOrg}
          key={o.USER_ID}
        />
      ));

      if (managers.length === 0) {
        managers.push(<div>담당자가 선정되어 있지 않습니다.</div>);
      }
    } else {
      managers.push(<div>담당자가 선정되어 있지 않습니다.</div>);
    }

    const managerInfoContent = (
      <StyleManagerModal>
        <div className="popoverTitle">
          담당자 정보
        </div>
        <Scrollbars
          className="custom-scrollbar"
          style={{ width: 'auto' }}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMax={240}
        >
          <div className="popoverBody">
            {managers}
          </div>
        </Scrollbars>
      </StyleManagerModal>
    );
    return (
      <StyleManagerInfo>
        <Popover
          placement="bottomLeft"
          content={managerInfoContent}
          overlayClassName="managerPopover"
          trigger={trigger === 'click' || trigger === 'hover' ? trigger : 'hover'}
        >
          <Button style={{
            width: '24px',
            height: '24px',
            background: `url(${IconManager}) no-repeat 50% 2px`,
            verticalAlign: 'middle',
            // opacity: '0.8',
          }}
          />
        </Popover>

        <Organization
          isModal={true}
          show={show}
          closeModal={this.closeModal}
          userProfile={userProfile}
          isProfile={true}
        />
      </StyleManagerInfo>
    );
  }
}

ManagerInfo.propTypes = {
  managerInfo: PropTypes.array.isRequired,
  trigger: PropTypes.string,
};
ManagerInfo.defaultProps = {
  trigger: 'hover',
};
export default ManagerInfo;
