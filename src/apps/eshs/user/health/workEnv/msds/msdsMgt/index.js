import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

class MsdsMgt extends Component {
  state = {
    isLoading: true,
    saveTask: undefined,
    modifyTask: undefined,
  };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };
  // message.info(<MessageContent>검진기관을 선택해주세요.</MessageContent>);

  render() {
    return (
      <>
        <BizBuilderBase
          sagaKey="MsdsMgt"
          workSeq={3161}
          viewType="INPUT"
          loadingComplete={this.loadingComplete}
          InputCustomButtons={({ saveBeforeProcess }) => {
            const { saveTask } = this.state;
            if (typeof saveTask === 'undefined') this.setState({ saveTask: saveBeforeProcess });
            return null;
          }}
          ModifyCustomButtons={({ saveBeforeProcess }) => {
            const { modifyTask } = this.state;
            if (typeof modifyTask === 'undefined') this.setState({ modifyTask: saveBeforeProcess });

            return null;
          }}
          ViewCustomButtons={() => null}
          ListCustomButtons={() => null}
          customSaveTask={this.state.saveTask}
          customModifyTask={this.state.modifyTask}
          callbackFuncExtra={({ viewPageData }) => {
            const viewType = (viewPageData && viewPageData.viewType) || '';
            if (viewType === 'INPUT') return message.info(<MessageContent>저장되었습니다.</MessageContent>);
            if (viewType === 'MODIFY') return message.info(<MessageContent>수정되었습니다.</MessageContent>);
            return undefined;
          }}
        />
      </>
    );
  }
}

MsdsMgt.propTypes = {};

MsdsMgt.defaultProps = {};

export default MsdsMgt;
