import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import { Button, message } from 'antd';

import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';

const StyledButton = StyledAntdButton(Button);

const modifyCusomButtons = ({ ...props }) => (
  <div className="alignRight">
    <StyledButton className="btn-primary btn-first" onClick={() => saveChecked(props)}>
      저장
    </StyledButton>
  </div>
);

const saveChecked = props => {
  const { sagaKey, submitExtraHandler, formData } = props;
  const submitData = { ...formData };
  const validation = (submitData && submitData.condList && submitData.condList.filter(c => c.RESULT_QUAL_EMPID)) || [];
  if (!(0 in validation)) return null;
  if (typeof submitExtraHandler === 'function')
    return submitExtraHandler(sagaKey, 'POST', '/api/eshs/v1/common/eshsSqQualCondRegister', submitData, (id, response) =>
      saveCheckedAfter(id, response, props),
    );
  return null;
};

const saveCheckedAfter = (id, response, { formData, changeFormData }) => {
  const condTableReload = (formData && formData.condTableReload) || '';
  const result = (response && response.code) || 0;
  if (result === 200) {
    message.success('저장되었습니다.');
    if (typeof condTableReload === 'function') return condTableReload();
    return changeFormData(id, 'condList', formData && formData.condList && formData.condList.filter(c => !c.RESULT_QUAL_EMPID));
  }
  return message.warning('저장에 실패했습니다.');
};

class CondResultMgt extends Component {
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
          modifyMetaSeq={7221}
          viewType="MODIFY"
          loadingComplete={this.loadingComplete}
          ModifyCustomButtons={modifyCusomButtons}
        />
      </>
    );
  }
}

CondResultMgt.defaultProps = {
  sagaKey: 'CondResultMgt',
};

export default CondResultMgt;
