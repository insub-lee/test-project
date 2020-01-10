import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Button from 'components/Button';
import { intlObj } from 'utils/commonUtils';
import { Input } from 'antd';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import * as actionsApp from 'containers/store/App/actions';
// import * as selectorsApp from 'containers/store/App/selectors';
// import LoadingSpin from 'containers/common/LoadingSpin';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import BizCategory from 'containers/store/components/BizCategory';
import * as commonjs from 'containers/common/functions/common';
import messages from './messages';
import BizList from './BizList';
import StyleAppBizModal from '../StyleAppBizModal';

class BizModal extends PureComponent {
  search = () => {
    const preUrl = commonjs.getPreUrl(this.props.match.path, '/modal');
    const searchword = this.searchInput.input.value;

    if (searchword === '') {
      this.props.history.push(`${preUrl}/biz/list`);
    } else if (this.searchword !== searchword) {
      this.props.history.push(`${preUrl}/biz/search/${searchword}`);
    }
    this.searchword = searchword;
  };

  searchEnter = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  render() {
    const {
      history,
      // isLoading,
    } = this.props;

    const preUrl = commonjs.getPreUrl(this.props.match.path, '/modal');

    const handleTreeOnClick = node => {
      this.searchword = '';
      this.searchInput.input.value = '';
      history.push(`${preUrl}/biz/list/${node.key}`);
      window.scrollTo(0, 0);
    };

    return (
      <StyleAppBizModal>
        <ErrorBoundary>
          <BizCategory handleOnClick={handleTreeOnClick} preUrl={preUrl} />
        </ErrorBoundary>

        <div className="topPart">
          <div className="searchInput">
            <Input
              placeholder=""
              title={intlObj.get(messages.searchBizStore)}
              onKeyPress={this.searchEnter}
              ref={ref => {
                this.searchInput = ref;
              }}
            />
            <Button type="button" onClick={this.search} title={intlObj.get(messages.search)} />

            {/* <LoadingSpin isLoading={isLoading && history.location.pathname.indexOf('modal') > -1} /> */}
          </div>
        </div>

        <ErrorBoundary>
          <Route path={`${preUrl}/biz/list`} component={BizList} exact />
          <Route path={`${preUrl}/biz/list/:BIZGRP_ID`} component={BizList} exact />
          <Route path={`${preUrl}/biz/search/:searchword`} component={BizList} exact />
        </ErrorBoundary>
      </StyleAppBizModal>
    );
  }
}

BizModal.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
export default BizModal;
