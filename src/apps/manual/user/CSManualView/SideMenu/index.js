import React from 'react';
import { fromJS } from 'immutable';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import selectors from '../selectors';
import * as actions from '../actions';

import TopTitle from './TopTitle';
import MenuList from './MenuList';
import Styled from './Styled';

const SideMenu = ({ maulCompList, setSelectedCompIdx, selectedCompIdx, scrollComp, widgetId, bookmarkWidgetData }) => (
  <Styled>
    <TopTitle />
    <Scrollbars style={{ height: 'calc(100% - 50px)' }}>
      <MenuList
        componentList={maulCompList}
        setSelectedCompIdx={setSelectedCompIdx}
        selectedCompIdx={selectedCompIdx}
        scrollComp={scrollComp}
        widgetId={widgetId}
        bookmarkWidgetData={bookmarkWidgetData}
      />
    </Scrollbars>
  </Styled>
);

SideMenu.propTypes = {
  maulCompList: PropTypes.object,
  setSelectedCompIdx: PropTypes.func,
  selectedCompIdx: PropTypes.number,
  scrollComp: PropTypes.object,
  bookmarkWidgetData: PropTypes.object,
};

SideMenu.defaultProps = {
  maulCompList: fromJS([]),
  setSelectedCompIdx: () => false,
  selectedCompIdx: fromJS([]),
  scrollComp: {},
  bookmarkWidgetData: { widgetYn: false, appCount: 0 },
};

const mapStateToProps = createStructuredSelector({
  maulCompList: selectors.makeSelectMaulCompList(),
  selectedCompIdx: selectors.makeSelectedCompIdx(),
  scrollComp: selectors.makeSelectScrollComp(),
});

const mapDispatchToProps = dispatch => ({
  setSelectedCompIdx: (idx, widgetId) => dispatch(actions.setSelectedCompIdxByReducr(idx, widgetId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu);
