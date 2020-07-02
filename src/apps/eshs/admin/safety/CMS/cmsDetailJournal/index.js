import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

const StyledButton = StyledAntdButton(Button);

class CMSDetailJournal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  formDataByState = (saveBeforeProcess, id, formData, reloadId) => {
    this.setState({
      formData: {
        CLASSIFICATION: formData.CLASSIFICATION,
        TIME_TEAM: formData.TIME_TEAM,
        FIXED_TEAM: formData.FIXED_TEAM,
        FAB: formData.FAB,
        RAYER: formData.RAYER,
      },
    });
    saveBeforeProcess(id, reloadId);
  };

  formDataByDefault = (saveBeforeProcess, id, reloadId) => {
    this.setState({ formData: {} });
    saveBeforeProcess(id, reloadId);
  };

  InputButtons = props => {
    const { sagaKey: id, reloadId, saveBeforeProcess, formData } = props;
    return (
      <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
        <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.formDataByState(saveBeforeProcess, id, formData, reloadId || id)}>
          이어 저장
        </StyledButton>
        <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.formDataByDefault(saveBeforeProcess, id, reloadId || id)}>
          저장
        </StyledButton>
      </StyledButtonWrapper>
    );
  };

  render() {
    return (
      <BizBuilderBase sagaKey="cmsDetailJournal" workSeq={5781} viewType="LIST" InputCustomButtonsByModal={this.InputButtons} compProps={this.state.formData} />
    );
  }
}

CMSDetailJournal.propTypes = {};

CMSDetailJournal.defaultProps = {};

export default CMSDetailJournal;
