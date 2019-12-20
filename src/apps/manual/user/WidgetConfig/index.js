import React, { Component } from 'react';
import { TreeSelect, Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { getTreeFromFlatData } from 'react-sortable-tree';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import selectors from './selectors';
import * as actions from './actions';

class WidgetConfig extends Component {
  onChange = value => {
    const { setCategorySettingByReducr, item } = this.props;
    setCategorySettingByReducr(item.id, value);
  };

  btn_Apply = () => {
    const { setManualWidgetSettingBySaga, item, size, sizeArr, user, manualWidgetSettingInfo, type, updateBizGroupChgYn } = this.props;
    const result = {
      WIDGETID: item.id,
      ITEM_VALUE: JSON.stringify({
        size,
        sizeArr,
        user,
        data: {
          categoryIdx: manualWidgetSettingInfo.get('categoryIdx'),
        },
      }),
      type,
    };

    setManualWidgetSettingBySaga(result);

    if (type !== 'mypage') {
      // 업무 그룹 변화 감지 함수
      updateBizGroupChgYn();
    }
  };

  componentDidMount() {
    const { getCategoryList } = this.props;
    getCategoryList();
  }

  render() {
    const { categoryList } = this.props;
    let flatData = fromJS([]);
    if (categoryList.size > 0) {
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

    return (
      <table>
        <tr>
          <td>
            <TreeSelect
              style={{ width: 300 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeData={treeData}
              onChange={this.onChange}
            />
          </td>
          <td>
            <Button type="primary" onClick={this.btn_Apply}>
              적용
            </Button>
          </td>
        </tr>
      </table>
    );
  }
}

WidgetConfig.propTypes = {
  categoryList: PropTypes.object,
  getCategoryList: PropTypes.func,
  setCategorySettingByReducr: PropTypes.func,
  setManualWidgetSettingBySaga: PropTypes.func,
  manualWidgetSettingInfo: PropTypes.object,
  item: PropTypes.object,
  size: PropTypes.string,
  sizeArr: PropTypes.object,
  user: PropTypes.object,
  data: PropTypes.object,
};

WidgetConfig.defaultProps = {
  categoryList: [],
  getCategoryList: () => false,
  setCategorySettingByReducr: () => false,
  setManualWidgetSettingBySaga: () => false,
  manualWidgetSettingInfo: [],
  item: { id: '10575' },
  size: 'FullSize',
  sizeArr: ['FullSize'],
  user: {
    isTitle: true,
    skin: '1',
  },
  data: {},
};

const mapStateToProps = createStructuredSelector({
  categoryList: selectors.makeSelectCategoryList(),
  manualWidgetSettingInfo: selectors.makeSelectWidgetSettingInfo(),
});

const mapDispatchToProps = dispatch => ({
  getCategoryList: () => dispatch(actions.getCategoryList()),
  setCategorySettingByReducr: (widgetId, categoryIdx) => dispatch(actions.setCategorySettingByReducr(widgetId, categoryIdx)),
  setManualWidgetSettingBySaga: item => dispatch(actions.setManualWidgetSettingBySaga(item)),
});

const withReducer = injectReducer({ key: 'apps-manual-user-WigetConfig-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-manual-user-WigetConfig-saga', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(WidgetConfig);
