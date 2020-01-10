import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { Table, TreeSelect, Button, Icon } from 'antd';
import { fromJS } from 'immutable';
import { getTreeFromFlatData } from 'react-sortable-tree';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import message from 'components/Feedback/message';
import selectors from '../../selectors';
import Styled from './Styled';
import * as actions from '../../actions';
import StyledButton from '../../../../../../../components/Button/StyledButton';

class RelationManual extends Component {
  leftTableColumns = [
    {
      dataIndex: 'MUAL_NAME',
      title: '매뉴얼명',
    },
  ];

  rightTableColumns = [
    {
      dataIndex: 'MUAL_NAME',
      title: '매뉴얼명',
    },
  ];

  state = {
    leftSelectedRows: [],
    rightSelectedRows: [],
  };

  componentDidMount() {
    const { getCategoryListBySaga } = this.props;
    getCategoryListBySaga();
  }

  onCategroyChange = categoryIdx => {
    const { getRelationManualList, chooseRelMual } = this.props;
    if (categoryIdx !== undefined) {
      getRelationManualList(categoryIdx, chooseRelMual);
    } else {
      getRelationManualList(0, chooseRelMual);
    }
  };

  onItemSelect = (key, selected, target) => {
    const { setRelationManualListByMualIdxByRecur } = this.props;
    setRelationManualListByMualIdxByRecur(key, selected, target);
  };

  leftRowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        leftSelectedRows: selectedRows,
      });
    },
    onSelect: (record, selected) => {
      this.onItemSelect(record.MUAL_IDX, selected, 'left');
    },
    getCheckboxProps: item => ({ disabled: item.disabled, checked: item.checked }),
  };

  rightRowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        rightSelectedRows: selectedRows,
      });
    },
    onSelect: (record, selected) => {
      this.onItemSelect(record.MUAL_IDX, selected, 'right');
    },
    getCheckboxProps: item => ({ disabled: item.disabled, checked: item.checked }),
  };

  // 추가 기능
  onRightClick = () => {
    const { setSelectedRelationManual, setRelationManualListByRecur, chooseRelMual, relationManualList } = this.props;
    const { leftSelectedRows } = this.state;
    const mergeData = [];

    chooseRelMual.map(item => {
      mergeData.push({ ...item, disabled: false, checked: false });
    });

    leftSelectedRows.map(item => {
      const fobj = mergeData.find(x => x.MUAL_IDX === item.MUAL_IDX);
      if (fobj === undefined) {
        mergeData.push({ ...item, disabled: false, checked: false });
      }
    });
    const count = 1;
    mergeData.map(item => {
      const fidx = relationManualList.findIndex(x => x.MUAL_IDX === item.MUAL_IDX);
      if (fidx >= 0) {
        console.debug(fidx);
        relationManualList[fidx].disabled = true;
        relationManualList[fidx].checked = false;
      }
    });

    this.setState({ leftSelectedRows: [], rightSelectedRows: [] });
    setSelectedRelationManual(mergeData);
    setRelationManualListByRecur(relationManualList);
  };

  // remove 기능
  onLeftClick = () => {
    const { chooseRelMual, setSelectedRelationManual, relationManualList, setRelationManualListByRecur } = this.props;
    const { rightSelectedRows } = this.state;
    const rData = [];
    const difRows = difference(chooseRelMual, rightSelectedRows);

    relationManualList.map(item => {
      const fidx = difRows.findIndex(x => x.MUAL_IDX === item.MUAL_IDX);

      if (fidx >= 0) {
        rData.push({ ...item, disabled: true });
      } else {
        rData.push({ ...item, disabled: false });
      }
    });
    this.setState({ rightSelectedRows: [] });
    setSelectedRelationManual(difRows);
    setRelationManualListByRecur(rData);
  };

  onApply = () => {
    const { setRelationManualListBySaga, chooseRelMual } = this.props;
    setRelationManualListBySaga(chooseRelMual);
    message.success('## Save Complete');
  };

  render() {
    const { categoryList, relationManualList, chooseRelMual } = this.props;
    let flatData = fromJS([]);
    if (fromJS(categoryList).size > 0) {
      flatData = categoryList
        .map(item => {
          const treeNode = fromJS({
            title: item.get('CATEGORY_NAME'),
            value: item.get('CATEGORY_IDX'),
            key: item.get('CATEGORY_IDX'),
            parentValue: item.get('CATEGORY_PARENT_IDX'),
          });
          return treeNode;
        })
        .toJS();
    }
    const treeData = getTreeFromFlatData({ flatData, getKey: node => node.value, getParentKey: node => node.parentValue, rootKey: 0 });

    const leftDataSource = [];
    relationManualList.map(item => {
      leftDataSource.push({
        key: item.MUAL_IDX,
        MUAL_NAME: item.MUAL_NAME,
        VERSION: item.VERSION,
        PUBDATE: item.PUBDATE,
        MANAGERNAME: item.MANAGERNAME,
        MUAL_ORG_IDX: item.MUAL_ORG_IDX,
        MUAL_IDX: item.MUAL_IDX,
        CATEGORY_IDX: item.CATEGORY_IDX,
        disabled: item.disabled,
        checked: item.checked,
      });
    });
    return (
      <Styled>
        <div style={{ marginTop: '15px' }}>
          <table>
            <tr>
              <td>
                <div style={{ marginBottom: '10px' }}>
                  <TreeSelect
                    style={{ width: 390 }}
                    dropdownStyle={{ maxHeight: 390, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeData={treeData}
                    onChange={this.onCategroyChange}
                  ></TreeSelect>
                </div>
                <Table rowSelection={this.leftRowSelection} columns={this.leftTableColumns} dataSource={leftDataSource}></Table>
              </td>
              <td style={{ padding: '0 10px' }}>
                <div style={{ marginBottom: '5px' }}>
                  <Button size="small" onClick={this.onRightClick}>
                    <span>
                      <Icon type="right" />
                    </span>
                  </Button>
                </div>
                <div>
                  <Button size="small" onClick={this.onLeftClick}>
                    <span>
                      <Icon type="left" />
                    </span>
                  </Button>
                </div>
                <div>&nbsp;</div>
              </td>
              <td style={{ verticalAlign: 'top' }}>
                <div style={{ marginBottom: '10px', textAlign: 'right' }}>
                  <StyledButton className="btn-secondary btn-sm btn-bs-none" onClick={this.onApply}>
                    <span>
                      <Icon type="import" />
                      적용하기
                    </span>
                  </StyledButton>
                </div>
                <Table rowSelection={this.rightRowSelection} columns={this.rightTableColumns} dataSource={chooseRelMual} style={{ width: 390 }}></Table>
              </td>
            </tr>
          </table>
        </div>
      </Styled>
    );
  }
}

RelationManual.propTypes = {
  getCategoryListBySaga: PropTypes.func,
  categoryList: PropTypes.array,
  getRelationManualList: PropTypes.func,
  relationManualList: PropTypes.array,
  setSelectedRelationManual: PropTypes.func,
  chooseRelMual: PropTypes.array,
  setRelationManualListByRecur: PropTypes.func,
  setRelationManualListByMualIdxByRecur: PropTypes.func,
  setRelationManualListBySaga: PropTypes.func,
};

RelationManual.defaultProps = {
  getCategoryListBySaga: () => false,
  categoryList: [],
  getRelationManualList: () => false,
  relationManualList: [],
  setSelectedRelationManual: () => false,
  chooseRelMual: [],
  setRelationManualListByRecur: () => false,
  setRelationManualListByMualIdxByRecur: () => false,
  setRelationManualListBySaga: () => false,
};
const mapStateToProps = createStructuredSelector({
  categoryList: selectors.makeSelectCategoryList(),
  relationManualList: selectors.makeSelectRelationManualList(),
  chooseRelMual: selectors.makeSelectChooseRelMual(),
});

const mapDispatchToProps = dispatch => ({
  getCategoryListBySaga: () => dispatch(actions.getCategoryListBySaga()),
  getRelationManualList: (categoryIdx, chooseRelMual) => dispatch(actions.getRelationManualListBySaga(categoryIdx, chooseRelMual)),
  setRelationCategoryIdx: categoryIdx => dispatch(actions.setRelationCategoryIdx(categoryIdx)),
  setSelectedRelationManual: items => dispatch(actions.setSelectedRelationManual(items)),
  setRelationManualListByRecur: manualList => dispatch(actions.setRelationManualListByRecur(manualList)),
  setRelationManualListByMualIdxByRecur: (mualIdx, selected, target) => dispatch(actions.setRelationManualListByMualIdxByRecur(mualIdx, selected, target)),
  setRelationManualListBySaga: manualList => dispatch(actions.setRelationManualListBySaga(manualList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RelationManual);
