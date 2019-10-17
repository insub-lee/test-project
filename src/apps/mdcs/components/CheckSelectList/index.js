/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tooltip, Icon, Radio, Input } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import Styled from './Styled';

class CheckSelectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: {},
      selectedText: '',
    };
  };

  componentWillMount() {
    const { selectedItems } = this.props;
    this.setState({
      selectedItems,
    });
  }

  _onChange = (groupName, groupKey, e) => {
    console.log('_onChange e : ', e);
    const { onChange } = this.props;
    const { value: selectedValue } = e.target;
    const idx = e.nativeEvent.target.selectedIndex;
    const { text: selectedText } = e.target[idx];

    if (selectedValue !== '') {
      this.setState(
        {
          selectedItems: { groupName, groupKey, selectedValue, selectedText },
          selectedText: `[${groupName}] ${selectedText}`,
        },
        () => {
          console.log('this.state : ', this.state);
          onChange(this.state.selectedItems);
        },
      );
    }
  };

  _onRemove = () => {
    const { onRemove } = this.props;

    this.setState(
      {
        selectedItems: [],
        selectedText: '',
      },
      () => onRemove(this.state),
    );
  };

  render() {
    const { sourceData } = this.props;
    const { selectedItem } = this.state;
    console.debug(this.state);
    return (
      <Styled>
        <div style={{ width: '100%' }}>
          <Row type="flex">
            {sourceData &&
              sourceData.map(ListItems => (
                <Col>
                  <Row>
                    <Col>
                      <Input placeHolder={ListItems.groupName} disabled style={{ width: '200px' }} value={ListItems.groupName} />
                    </Col>
                    <Col>
                      <select
                        onChange={e => this._onChange(ListItems.groupName, ListItems.groupKey, e)}
                        id={ListItems.groupKey}
                        style={{ width: '200px' }}
                        size="10"
                        value=""
                      >
                        <option disabled hidden value=""></option>
                        {ListItems.dataSet.map(opt => (
                          <option value={opt.NODE_ID} selected={false}>
                            {opt.NAME_KOR}
                          </option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                </Col>
              ))}
          </Row>

          <Row>
            <Col style={{ padding: '10px' }}>
              <Input
                style={{ width: '100%' }}
                placeHolder="선택주세요"
                addonAfter={
                  <a onClick={() => this._onRemove()}>
                    <Icon type="close-circle" />
                  </a>
                }
                value={this.state.selectedText}
              ></Input>
            </Col>
          </Row>
        </div>
      </Styled>
    );
  }
}

CheckSelectList.propTypes = {
  sourceData: PropTypes.array,
  selectedItems: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
};

CheckSelectList.defaultProps = {
  selectedItem: {},
  sourceData: [
    {
      groupName: 'ball',
      groupKey: 'ball',
      dataSet: [],
    },
    {
      groupName: 'lead',
      groupKey: 'lead',
      dataSet: [],
    },
  ],
  onChange: () => false,
  onRemove: () => false,
};

export default CheckSelectList;
