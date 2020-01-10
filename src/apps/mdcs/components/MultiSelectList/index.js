import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Input, Row, Col, Tooltip, Icon } from 'antd';
import ScrollBar from 'react-custom-scrollbars';
import Styled from './Styled';

// eslint-disable-next-line react/prefer-stateless-function
class MultiSelectList extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  state = {
    selectedItems: [],
  };

  componentWillMount() {
    const { selectedItems } = this.props;
    this.setState({
      selectedItems,
    });
  }

  onChange = (key, e) => {
    const { onChange } = this.props;
    const { selectedItems } = this.state;
    const { value } = e.target;
    const idx = e.nativeEvent.target.selectedIndex;
    const { text } = e.target[idx];
    const selectedItem = selectedItems.findIndex(item => item.key === key);
    if (selectedItem >= 0) {
      selectedItems.splice(selectedItem, 1, { key, value, text });
    } else {
      selectedItems.push({ key, value, text });
    }
    this.setState(
      {
        selectedItems,
      },
      () => onChange(this.state),
    );
  };

  onRemove = key => {
    const { onRemove } = this.props;
    const { selectedItems } = this.state;
    const idx = selectedItems.findIndex(item => item.key === key);
    const rmItem = selectedItems.filter(item => item.key === key);
    selectedItems.splice(idx, 1);
    this.setState(
      {
        selectedItems,
      },
      () => onRemove(rmItem && rmItem[0], this.state),
    );
  };

  componentWillReceiveProps(nextProps) {
    const { allClear } = nextProps;
    if (allClear) {
      this.setState({
        selectedItems: [],
      });
      this.itemList = [];
    }
  }

  render() {
    const { sourceData } = this.props;
    const { selectedItems } = this.state;
    return (
      <Styled>
        <div style={{ width: '100%' }}>
          <Row type="flex">
            {sourceData &&
              sourceData.map(ListItems => (
                <Col>
                  <Row>
                    <Col>
                      <Input
                        placeHolder={ListItems.title}
                        disabled
                        style={{ width: '200px' }}
                        value={selectedItems && selectedItems.filter(item => item.key === ListItems.key).map(obj => obj.text)}
                        suffix={
                          <Tooltip title="Remove Item">
                            <Icon type="close-circle" style={{ color: '#fafafa' }} onClick={() => this.onRemove(ListItems.key)} />
                          </Tooltip>
                        }
                      />
                    </Col>
                    <Col>
                      <select onChange={e => this.onChange(ListItems.key, e)} id={ListItems.key} style={{ width: '200px' }} size="20" value="">
                        <option disabled hidden value=""></option>
                        {ListItems.dataSet.map(opt => (
                          <option value={opt.key} selected={false}>
                            {opt.value}
                          </option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                </Col>
              ))}
          </Row>
        </div>
      </Styled>
    );
  }
}

MultiSelectList.propTypes = {
  gutter: PropTypes.number,
  allClear: PropTypes.bool,
  sourceData: PropTypes.array,
  onChange: PropTypes.func,
  selectedItems: PropTypes.array,
};

MultiSelectList.defaultProps = {
  gutter: 8,
  allClear: false,
  sourceData: [
    {
      title: 'Site',
      key: 'Site',
      dataSet: [
        { key: '1', value: 'Cheongju.' },
        { key: '2', value: 'Gumi.' },
        { key: '3', value: 'Seoul' },
        { key: '4', value: 'General/etc' },
      ],
    },
    {
      title: 'Line/Site',
      key: 'key2',
      dataSet: [
        { key: 'F1', value: 'F1' },
        { key: 'F2', value: 'F2' },
        { key: 'F3', value: 'F3' },
        { key: 'G-PKG-TEST', value: 'G-PKG-TEST' },
      ],
    },
    {
      title: 'Product',
      key: 'key3',
      dataSet: [
        { key: '1', value: '1' },
        { key: '2', value: '2' },
        { key: '3', value: '3' },
        { key: '4', value: '4' },
      ],
    },
  ],
  onChange: () => false,
};

export default MultiSelectList;
