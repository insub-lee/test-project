import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';

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
        />
      </>
    );
  }
}

MsdsMgt.propTypes = {};

MsdsMgt.defaultProps = {};

export default MsdsMgt;
