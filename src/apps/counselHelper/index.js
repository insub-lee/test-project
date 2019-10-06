import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as routeSelectors from 'containers/common/Routes/selectors';

import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import HelperWidget from './helperWidget';
import StyleWidget from './StyleWidget';

// local 3193 실서버 2874..
const categorieID = 2874;
class Widget extends Component {
  componentDidMount() {
    const initData = this.props.item.data;
    const initId = this.props.item.WIDGET_ID;
    if (Object.keys(initData).length !== 0) {
      this.props.getList(initData.categorie, initId, this.props.keyword);
    }
  }

  handlerSearch = KEYWORD => {
    const { getList, item } = this.props;
    const { categorie: BIZGRP_ID } = item.data;
    getList(BIZGRP_ID, item.WIDGET_ID, KEYWORD);
  };

  render() {
    const { cardList, keyword, chageKeyword, myAppTreeData, item } = this.props;
    const findedData = myAppTreeData.filter(x => x.BIZGRP_ID === categorieID);
    const linkData = findedData.length > 0 ? findedData[0] : {};
    return (
      <StyleWidget>
        <HelperWidget
          WIDGET_ID={item.WIDGET_ID}
          cardList={cardList}
          linkData={linkData}
          getList={this.handlerSearch}
          keyword={keyword}
          chageKeyword={chageKeyword}
        />
      </StyleWidget>
    );
  }
}
Widget.propTypes = {
  cardList: PropTypes.array,
  item: PropTypes.object,
  keyword: PropTypes.string,
  getList: PropTypes.func,
  WIDGET_ID: PropTypes.string,
  chageKeyword: PropTypes.func,
  myAppTreeData: PropTypes.array,
};

Widget.defaultProps = {
  keyword: '',
  myAppTreeData: [],
  findedData: [],
};

const mapStateToProps = createStructuredSelector({
  cardList: selectors.makeSelectCardList(),
  keyword: selectors.makeSelectKeyword(),
  myAppTreeData: routeSelectors.makeMyAppTree(),
});

const mapDispatchToProps = dispatch => ({
  getList: (BIZGRP_ID, WIDGET_ID, KEYWORD) => dispatch(actions.getCardList(BIZGRP_ID, WIDGET_ID, KEYWORD)),
  chageKeyword: (WIDGET_ID, KEYWORD) => dispatch(actions.chageKeyword(WIDGET_ID, KEYWORD)),
});

const withReducer = injectReducer({ key: 'apps-counselHelper', reducer });
const withSaga = injectSaga({ key: 'apps-counselHelper', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Widget);
