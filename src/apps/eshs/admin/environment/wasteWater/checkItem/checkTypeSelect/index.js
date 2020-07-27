import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transfer } from 'antd';
import styled from 'styled-components';

const Styled = styled.div``;

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
    const { checkTypes } = this.state;
    const mockData = checkTypes.map(value => ({
      key: value,
      title: value,
    }));

    this.setState({
      mockData,
    });
  }

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  render() {
    const { mockData, targetKeys } = this.state;
    return (
      <styled>
        <Transfer oneWay dataSource={mockData} targetKeys={targetKeys} onChange={this.handleChange} render={item => item.title} showSelectAll={false} />
      </styled>
    );
  }
}

checkTypeSelect.propTypes = {};

checkTypeSelect.defaultProps = {};

export default checkTypeSelect;
