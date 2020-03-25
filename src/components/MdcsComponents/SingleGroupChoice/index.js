import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, Icon, Radio } from 'antd';

import StyledSelectTable from 'commonStyled/MdcsStyled/Table/StyledSelectTable';
import ScrollBar from 'react-custom-scrollbars';
import { ValueService } from '../../../../node_modules/ag-grid-community/main';

class SingleGroupChoice extends Component {
  state = {
    checkDataList: [],
    wid: 100,
    selectedGroupKey: undefined,
  };

  componentDidMount() {
    const { dataSource, selectedGroupKey } = this.props;
    const total = dataSource && dataSource.length > 0 ? dataSource.length : 1;
    const wid = 100 / total;
    this.setState({ checkDataList: dataSource, wid, selectedGroupKey });
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
    this.setState({ checkDataList: tmpCheckDataList }, () => onChange(this.state.checkDataList, checkedValue, groupKey));
  };

  onChangeRadio = e => {
    const { onChange } = this.props;
    const { checkDataList } = this.state;
    const tmpCheckDataList = checkDataList.map(grp => ({
      ...grp,
      selectedValue: [],
      selectedItem: [],
    }));
    this.setState({ checkDataList: tmpCheckDataList, selectedGroupKey: e.target.value }, () => onChange(this.state.checkDataList, [], e.target.value));
  };

  render() {
    return (
      <StyledSelectTable>
        <Radio.Group value={this.state.selectedGroupKey} style={{ width: '100%' }} onChange={this.onChangeRadio}>
          <table>
            <tbody>
              <tr>
                {this.state.checkDataList &&
                  this.state.checkDataList.map(grp => (
                    <td style={{ width: `${this.state.wid}%`, padding: '0px', verticalAlign: 'top' }}>
                      <table className="subTable">
                        <tr>
                          <th>
                            <Radio value={grp.groupKey}>{grp.groupName}</Radio>
                          </th>
                        </tr>
                        <tr>
                          <td>
                            <Checkbox.Group
                              disabled={this.state.selectedGroupKey !== grp.groupKey}
                              value={grp.selectedValue}
                              onChange={selectedValue => this.onChangeGroup(grp.groupKey, selectedValue)}
                            >
                              <ScrollBar style={{ width: 105, height: 300 }}>
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
        </Radio.Group>
      </StyledSelectTable>
    );
  }
}

SingleGroupChoice.propTypes = {
  checkDataList: PropTypes.array,
};

SingleGroupChoice.defaultProps = {
  checkDataList: [],
};

export default SingleGroupChoice;
