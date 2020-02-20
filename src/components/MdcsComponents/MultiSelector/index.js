import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, Icon } from 'antd';

import StyledSelectTable from 'commonStyled/Table/StyledSelectTable';
import ScrollBar from 'react-custom-scrollbars';

class MultiSelector extends Component {
  state = {
    checkDataList: [],
  };

  componentDidMount() {
    const { dataSource } = this.props;
    this.setState({ checkDataList: dataSource });
  }

  onChangeGroup = (groupKey, checkedValue) => {
    const { onChange } = this.props;
    const { checkDataList } = this.state;
    const tmpCheckDataList = checkDataList.map(grp =>
      grp.groupKey === groupKey
        ? {
            ...grp,
            selectedValue: checkedValue,
            selectedItem: checkedValue.map(val => {
              const item = grp.dataSet.filter(i => i.NODE_ID === val);
              return item.length > 0 && { title: item[0].NAME_KOR, value: item[0].NODE_ID };
            }),
          }
        : grp,
    );
    this.setState({ checkDataList: tmpCheckDataList }, () => onChange(this.state.checkDataList, checkedValue));
  };

  render() {
    console.debug('render!!!!');
    return (
      <StyledSelectTable>
        <table>
          <tbody>
            <tr>
              {this.state.checkDataList.map(grp => (
                <td style={{ padding: '0px', verticalAlign: 'top' }}>
                  <table className="subTable">
                    <tr>
                      <th>
                        {grp.groupName} <Icon type="close-circle" />
                      </th>
                    </tr>
                    <tr>
                      <td>
                        <Checkbox.Group value={grp.selectedValue} onChange={selectedValue => this.onChangeGroup(grp.groupKey, selectedValue)}>
                          <ScrollBar style={{ width: 100, height: 300 }}>
                            {grp.dataSet.map(item => (
                              <Checkbox value={item.NODE_ID}>{item.NAME_KOR}</Checkbox>
                            ))}
                          </ScrollBar>
                        </Checkbox.Group>
                      </td>
                    </tr>
                  </table>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </StyledSelectTable>
    );
  }
}

MultiSelector.propTypes = {
  checkDataList: PropTypes.array,
};

MultiSelector.defaultProps = {
  checkDataList: [],
};

export default MultiSelector;
