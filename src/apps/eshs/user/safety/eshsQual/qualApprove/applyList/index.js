import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomList from 'apps/eshs/user/safety/eshsQual/qualApprove/applyList/pages/CustomList';

import ConfirmRequest from 'apps/eshs/user/safety/eshsQual/qualApply/confirmRequest'; // 신청
import ConfirmReusltView from 'apps/eshs/user/safety/eshsQual/qualApply/improveConfirmView'; // 개선결과조회
import InterLockRequest from 'apps/eshs/user/safety/eshsQual/qualApply/interLockRequest'; // InterLock 해제신청
import InterLockResult from 'apps/eshs/user/safety/eshsQual/qualApprove/interLockResult'; // InterLock 해제결과
class ApplyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  componentDidMount() {}

  render() {
    const { sagaKey } = this.props;
    return (
      <>
        <BizBuilderBase
          sagaKey={sagaKey}
          workSeq={6821}
          CustomListPage={CustomList}
          listMetaSeq={8041}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
          InputCustomButtons={() => null}
          ModifyCustomButtons={() => null}
          ConfirmRequest={(taskSeq, viewType) => <ConfirmRequest taskSeq={taskSeq} viewType={viewType} />}
          ConfirmResult={taskSeq => <ConfirmReusltView taskSeq={taskSeq} />}
          InterLockRequest={(taskSeq, viewType) => <InterLockRequest taskSeq={taskSeq} viewType={viewType} />}
          InterLockResult={taskSeq => <InterLockResult taskSeq={taskSeq} />}
        />
      </>
    );
  }
}

ApplyList.defaultProps = {
  sagaKey: 'ApplyList',
};

export default ApplyList;
