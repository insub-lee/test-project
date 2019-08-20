import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TreeSelect, Button } from 'antd';
import { fromJS } from 'immutable';
import { getTreeFromFlatData } from 'react-sortable-tree';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as selectors from '../selector';
import * as actions from '../action';
import saga from '../saga';
import reducer from '../reducer';
import './index.css';

class NewsfeedSetting extends PureComponent {
  constructor(props) {
    super(props);
    this.props.getInitCategoryList();
    this.state = {
      items: [],
    };
  }

  onChangeCategory = e => {
    this.setState({
      items: e,
    });
  };

  applyWidgetConfig = () => {
    const { selectCategoryList } = this.props;
    const { items } = this.state;
    selectCategoryList(items);
  };

  render() {
    const { totalCategory, selectedCategoryList } = this.props;
    let flatData;
    if (totalCategory.size > 0) {
      flatData = totalCategory
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

    const treeData = getTreeFromFlatData({ flatData, getKey: node => node.key, getParentKey: node => node.parentValue, rootKey: 0 });
    console.log(treeData);
    return (
      <table>
        <tr>
          <td>
            <TreeSelect
              showSearch
              treeData={treeData}
              style={{ width: auto }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="카테고리 선택"
              autoClearSearchValue
              defaultValue={selectedCategoryList.size === 0 ? null : selectedCategoryList.toJS()}
              allowClear
              multiple
              onChange={this.onChangeCategory}
            />
          </td>
          <td>
            <Button type="primary" onClick={this.applyWidgetConfig}>
              적용
            </Button>
          </td>
        </tr>
      </table>
    );
  }
}

NewsfeedSetting.propTypes = {
  totalCategory: PropTypes.array,
  selectedCategoryList: PropTypes.array,
  getInitCategoryList: PropTypes.func,
  selectCategoryList: PropTypes.func,
};

NewsfeedSetting.defaultProps = {
  totalCategory: [],
  selectedCategoryList: [],
  getInitCategoryList: () => false,
  selectCategoryList: () => false,
};

const mapStateToProps = createStructuredSelector({
  selectedCategoryList: selectors.selectWidgetCategory(),
  totalCategory: selectors.selectWidgetTotalCategory(),
  widgetSize: selectors.selectWidgetSize(),
});

const mapDispatchToProps = dispatch => ({
  getInitCategoryList: () => dispatch(actions.getInitCategoryList()),
  selectCategoryList: selectedCategoryList => dispatch(actions.selectCategoryList(selectedCategoryList)),
  getNewsFeed: (widgetSize, selectedCategory) => dispatch(actions.getNewsfeedDataList(widgetSize, selectedCategory)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'NewsFeed', saga });
const withReducer = injectReducer({ key: 'NewsFeed', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewsfeedSetting);
