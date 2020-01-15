import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ErrorBoundary from 'containers/common/ErrorBoundary';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Footer from 'containers/store/App/Footer';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import ItemList from './ItemList';

import TopMenu from '../BizDetail/TopMenu';
import StyleBizDetail from '../BizDetail/StyleBizDetail';
import StyleBizDetailContent from '../BizDetail/StyleBizDetailContent';

class BizMenuList extends Component {
  constructor(props) {
    super(props);

    const { match } = props;
    const { params } = match;
    const { BIZGRP_ID } = params;

    this.state = {
      BIZGRP_ID: Number(BIZGRP_ID),
    };

    this.props.handleGetMapList(Number(BIZGRP_ID));
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;
    const { BIZGRP_ID } = params;

    if (BIZGRP_ID && this.state.BIZGRP_ID !== -1 && this.state.BIZGRP_ID !== Number(BIZGRP_ID)) {
      this.setState({
        BIZGRP_ID: Number(BIZGRP_ID),
      });
      this.props.handleGetMapList(Number(BIZGRP_ID));
    }
  }

  render() {
    const {
      mapList,
      handleRegistApp,
      handleRegistCategory,

      history,
      match,
    } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          // minHeight: 'calc(100vh - 42px)',
          backgroundColor: '#f7f8f9',
        }}
      >
        <StyleBizDetail>
          <TopMenu history={history} match={match} BIZGRP_ID={Number(this.state.BIZGRP_ID)} />
          <StyleBizDetailContent style={{ minHeight: 'calc(100vh - 240px)' }} className="gridMode">
            <ErrorBoundary>
              <ItemList mapList={mapList} registApp={handleRegistApp} registCategory={handleRegistCategory} match={match} />
            </ErrorBoundary>
          </StyleBizDetailContent>
        </StyleBizDetail>
        {/* <Footer /> */}
      </div>
    );
  }
}

BizMenuList.propTypes = {
  mapList: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  handleGetMapList: PropTypes.func.isRequired,
  handleRegistApp: PropTypes.func.isRequired,
  handleRegistCategory: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleGetMapList: key => dispatch(actions.getMapList(key)),
    handleRegistApp: APP_ID => dispatch(actions.registApp(APP_ID)),
    handleRegistCategory: APP_ID => dispatch(actions.registCategory(APP_ID)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 앱리스트
  mapList: selectors.makeMapList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'bizmenuList', reducer });
const withSaga = injectSaga({ key: 'bizmenuList', saga });

export default compose(withReducer, withSaga, withConnect)(BizMenuList);
