import React, { Component } from 'react';
import { TreeSelect, Row, Col, Button, message } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getTreeFromFlatData } from 'react-sortable-tree';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';

const getCategoryMapListAsTree = flatData =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      NAME_ENG: item.NAME_ENG,
      NODE_ORDINAL: item.NODE_ORDINAL,
    })),

    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: 0,
  });
class docSetting extends Component {
  constructor(props) {
    super(props);
    const { item } = props;
    const defaultValue = Object.keys(item.data).length !== 0 ? item.data.NODE_ID : null;
    this.state = {
      data: defaultValue,
    };
  }

  componentDidMount() {
    const { categoryMapId, getCategoryMapListBySaga } = this.props;
    getCategoryMapListBySaga('categoryMapInfo', categoryMapId);
  }

  handlerSubmit = () => {
    const { data } = this.state;
    if (data !== null) {
      const { item, type, updateBizGroupChgYn, deleteDocList } = this.props;
      const payload = { size: item.size, user: item.user, data, widget_id: item.WIDGET_ID, type };
      this.success();
      deleteDocList(payload);
      if (type && type === 'bizgroup') {
        updateBizGroupChgYn();
      }
    } else {
      this.error();
    }
  };

  success = () => {
    message.success('적용되었습니다.');
  };

  error = () => {
    message.error('카테고리를 설정해주세요');
  };

  render() {
    const { categoryMapInfo, item } = this.props;
    const { data } = this.state;
    const categoryData = [];
    if (categoryMapInfo && categoryMapInfo.categoryMapList) {
      const source = getCategoryMapListAsTree(categoryMapInfo.categoryMapList.filter(x => x.USE_YN === 'Y'));
      source[0].children.map(x => categoryData.push(x));
    }
    return (
      <>
        <Row>
          <Col span={5}>
            <TreeSelect
              name="code1"
              style={{ width: 300, marginRight: 10 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              defaultValue={data}
              placeholder="분류체계를 선택해주세요"
              treeData={categoryData}
              onChange={value => {
                const filteredData = categoryMapInfo.categoryMapList.filter(x => x.USE_YN === 'Y' && x.NODE_ID === value);
                this.setState({ data: filteredData[0] });
              }}
            />
            <StyledButton className="btn-primary btn-sm" onClick={this.handlerSubmit}>
              적용하기
            </StyledButton>
          </Col>
        </Row>
      </>
    );
  }
}

docSetting.defaultProps = {
  categoryMapId: 3,
  categoryMapInfo: {},
  getCategoryMapListBySaga: () => false,
  item: { WIDGET_ID: '12345', data: {}, size: {}, user: {} },
  updateBizGroupChgYn: () => false,
  type: 'widget',
};
docSetting.propTypes = {
  categoryMapId: PropTypes.number,
  categoryMapInfo: PropTypes.object,
  getCategoryMapListBySaga: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  categoryMapInfo: selectors.makeSelectCategoryMapList('categoryMapInfo'),
});

const mapDispatchToProps = dispatch => ({
  getCategoryMapListBySaga: (key, mapId) => dispatch(actions.getCategoryMapListBySaga(key, mapId)),
  deleteDocList: payload => dispatch(actions.getDeleteDocListBySaga(payload)),
});

const withReducer = injectReducer({ key: 'apps-mdcs-user-docArchitect-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-mdcs-user-docArchitect-reducer', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(docSetting);
