import React, { PureComponent } from 'react';
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
class Widget extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   const initData = this.props.item.data;
  //   const initId = this.props.item.WIDGET_ID;
  //   if (Object.keys(initData).length !== 0) {
  //     this.props.getList(initData.categorie, initId, props.keyword);
  //   }
  // }

  componentDidMount() {
    const initData = this.props.item.data;
    const initId = this.props.item.WIDGET_ID;
    if (Object.keys(initData).length !== 0) {
      this.props.getList(initData.categorie, initId, this.props.keyword);
    }
  }

  render() {
    const { cardList, getList, item, keyword } = this.props;
    const { WIDGET_ID, data } = item;
    console.log('인덱스 카드리스트', cardList);
    console.debug('keyword >>', keyword);
    console.debug('WIDGET_ID >>', WIDGET_ID);

    return (
      <StyleWidget>
        <HelperWidget cardList={cardList} getList={getList} keyword={keyword} WIDGET_ID={WIDGET_ID} BIZGRP_ID={data.categorie} />
      </StyleWidget>
    );
  }
}
Widget.propTypes = {
  cardList: PropTypes.array,
  item: PropTypes.object,
  keyword: PropTypes.string,
  getList: PropTypes.func,
};

Widget.defaultProps = {
  keyword: '',
};

const mapStateToProps = createStructuredSelector({
  cardList: selectors.makeSelectCardList(),
  keyword: selectors.makeSelectKeyword(),
});

const mapDispatchToProps = dispatch => ({
  getList: (BIZGRP_ID, WIDGET_ID, KEYWORD) => dispatch(actions.getCardList(BIZGRP_ID, WIDGET_ID, KEYWORD)),
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
