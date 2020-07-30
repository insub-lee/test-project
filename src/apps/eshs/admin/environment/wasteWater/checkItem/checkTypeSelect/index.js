import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transfer } from 'antd';
import styled from 'styled-components';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const Styled = styled.div`
  .ant-transfer-list {
    width: 45%;
  }
`;

class checkTypeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkTypes: ['Avg', 'Max', 'Min', 'Reject'],
      mockData: [],
      targetKeys: [],
    };
  }

  componentDidMount() {
    const { formData } = this.props;
    const { checkTypes } = this.state;
    const { CHECK_VALUE_LIST } = formData;
    const mockData = checkTypes.map(value => ({
      key: value,
      title: value,
    }));

    let initTargetKeys = [];
    if (CHECK_VALUE_LIST && CHECK_VALUE_LIST.length > 0) {
      initTargetKeys = CHECK_VALUE_LIST;
    }
    this.setState({
      mockData,
      targetKeys: initTargetKeys,
    });
  }

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  render() {
    const { onSaveCheckType } = this.props;
    const { mockData, targetKeys } = this.state;
    return (
      <Styled>
        <Transfer dataSource={mockData} targetKeys={targetKeys} onChange={this.handleChange} showSelectAll={false} render={item => <span>{item.title}</span>} />
        <div style={{ textAlign: 'center' }}>
          <StyledButton className="btn-primary btn-sm btn-first" style={{ marginTop: '20px' }} onClick={() => onSaveCheckType(targetKeys)}>
            저장
          </StyledButton>
        </div>
      </Styled>
    );
  }
}

checkTypeSelect.propTypes = {
  onSaveCheckType: PropTypes.func,
  formData: PropTypes.object,
};

checkTypeSelect.defaultProps = {
  onSaveCheckType: () => false,
};

export default checkTypeSelect;
