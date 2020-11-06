import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

class HelpBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: 'LIST',
      taskSeq: -1,
    };
  }

  componentDidMount() {}

  onRowClick = record => {
    this.setState({
      viewType: 'VIEW',
      taskSeq: record.TASK_SEQ,
    });
  };

  onClickListButton = () => {
    this.setState({
      viewType: 'LIST',
      taskSeq: -1,
    });
  };

  render() {
    const { authority } = this.props;

    const emptyButtons = () => [];
    const viewCustom = () => (
      <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
        <StyledButton className="btn-light btn-sm" onClick={this.onClickListButton}>
          목록
        </StyledButton>
      </StyledButtonWrapper>
    );

    if (!authority.includes('I')) {
      return (
        <BizBuilderBase
          sagaKey="HelpBoard"
          workSeq={5521}
          taskSeq={this.state.taskSeq}
          viewType={this.state.viewType}
          ListCustomButtons={emptyButtons}
          ViewCustomButtons={viewCustom}
          customOnRowClick={this.onRowClick}
        />
      );
    }
    return <BizBuilderBase sagaKey="HelpBoard" workSeq={5521} viewType="LIST" />;
  }
}

HelpBoard.propTypes = {
  authority: PropTypes.array,
};

export default HelpBoard;
