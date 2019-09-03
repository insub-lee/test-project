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
    let widget_category = this.props.item.data.selectedCategory;

    if(widget_category === undefined){
      widget_category = [];
    }

    this.state = {
      selectedItem: widget_category,
    };
  }

  onChangeCategory = e => {
    this.setState({
      selectedItem: e,
    });
  };

  applyWidgetConfig = () => {
    const { selectCategoryList, item, updateBizGroupChgYn } = this.props;
    const { selectedItem } = this.state;

    selectCategoryList(selectedItem, item);
    updateBizGroupChgYn();
  };

  componentDidMount(){
    const { getInitCategoryList } = this.props;
    getInitCategoryList();
  }

  render() {
    const { totalCategory } = this.props;
    const { selectedItem } = this.state;

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

    const treeSelectConfig = {
      treeData,
      value: selectedItem,
      onChange: this.onChangeCategory,
      placeholder: '카테고리를 선택하세요',
      treeNodeFilterProp: 'title',
      allowClear: true,
      multiple: true,
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      style: { width: 500 },
    }

    return (
      <div className="commonPage">
        <div className="basicSettingTable">
          <table>
            <tr>
              <th>신규지식 카테고리 설정</th>
              <td>
                <TreeSelect  {...treeSelectConfig} />
              </td>
              <td>
                <Button type="primary" onClick={this.applyWidgetConfig}>
                  선택완료
                </Button>
              </td>
            </tr>
          </table>
        </div>
      </div>
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
});

const mapDispatchToProps = dispatch => ({
  getInitCategoryList: () => dispatch(actions.getInitCategoryList()),
  selectCategoryList: (selectedCategoryList, item) => dispatch(actions.selectCategoryList(selectedCategoryList, item)),
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
