import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, Icon } from 'antd';

import StyledSelectTable from 'commonStyled/MdcsStyled/Table/StyledSelectTable';
import ScrollBar from 'react-custom-scrollbars';

class MultiSelector extends Component {
  state = {
    checkDataList: [],
    wid: 100,
  };

  componentDidMount() {
    const { dataSource } = this.props;
    const total = dataSource && dataSource.length > 0 ? dataSource.length : 1;
    const wid = 100 / total;
    console.debug(dataSource);
    this.setState({ checkDataList: dataSource, wid });
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

  groupClear = groupKey => {
    const { onChange } = this.props;
    const { checkDataList } = this.state;
    const tmpCheckDataList = checkDataList.map(grp =>
      grp.groupKey === groupKey
        ? {
            ...grp,
            selectedValue: [],
            selectedItem: [],
          }
        : grp,
    );
    this.setState({ checkDataList: tmpCheckDataList }, () => onChange(this.state.checkDataList));
  };

  render() {
    return (
      <StyledSelectTable>
        <table>
          <tbody>
            <tr>
              {this.state.checkDataList &&
                this.state.checkDataList.map(grp => (
                  <td style={{ width: `${this.state.wid}%`, padding: '0px', verticalAlign: 'top' }}>
                    <table className="subTable">
                      <tr>
                        <th>
                          {grp.groupName} <Icon type="close-circle" style={{ cursor: 'pointer' }} onClick={() => this.groupClear(grp.groupKey)} />
                        </th>
                      </tr>
                      <tr>
                        <td>
                          <Checkbox.Group value={grp.selectedValue} onChange={selectedValue => this.onChangeGroup(grp.groupKey, selectedValue)}>
                            <ScrollBar style={{ height: 300 }} id="MDCS-scrollbar-wrapper" className="scrollbar-wrapper">
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
