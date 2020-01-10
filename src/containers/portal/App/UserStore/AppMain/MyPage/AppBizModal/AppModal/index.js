import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
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
import * as commonjs from 'containers/common/functions/common';
import AppCategory from '../../../../components/AppCategory';

import messages from './messages';
import AppList from './AppList';
import StyleAppBizModal from '../StyleAppBizModal';

class AppModal extends PureComponent {
  searchEnter = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  search = () => {
    const searchword = this.searchInput.input.value;

    const preUrl = commonjs.getPreUrl(this.props.match.path, '/modal');
    if (searchword === '') {
      this.props.history.push(`${preUrl}/app/list`);
    } else if (this.searchword !== searchword) {
      this.props.history.push(`${preUrl}/app/search/${searchword}`);
    }

    this.searchword = searchword;
  };

  render() {
    const {
      history,
      // isLoading,
    } = this.props;

    const preUrl = commonjs.getPreUrl(this.props.match.path, '/modal');

    const handleOnClick = node => {
      this.searchword = '';
      this.searchInput.input.value = '';
      history.push(`${preUrl}/app/list/${node.key}`);
      window.scrollTo(0, 0);
    };

    let selectedCategoryId = -1;
    const pn = history.location.pathname;
    const str = 'list/';
    if (pn.indexOf(str) > -1) {
      selectedCategoryId = Number(pn.substring(pn.indexOf(str) + str.length, pn.length));
    }

    return (
      <StyleAppBizModal>
        <ErrorBoundary>
          <AppCategory handleOnClick={handleOnClick} selectedIndex={selectedCategoryId} preUrl={preUrl} />
        </ErrorBoundary>
        <div className="topPart">
          <div className="searchInput">
            <Input
              placeholder=""
              title={intlObj.get(messages.searchBizStore)}
              // onChange={this.onChange}
              onKeyPress={this.searchEnter}
              ref={ref => {
                this.searchInput = ref;
              }}
            />
            <Button type="button" onClick={() => this.search()} title={intlObj.get(messages.search)} />

            {/* <LoadingSpin isLoading={isLoading && history.location.pathname.indexOf('modal') > -1} /> */}
          </div>
        </div>

        <ErrorBoundary>
          <Switch>
            <Route path={`${preUrl}/app/list`} component={AppList} exact />
            <Route path={`${preUrl}/app/list/:CATG_ID`} component={AppList} exact />
            <Route path={`${preUrl}/app/search/:searchword`} component={AppList} exact />
          </Switch>
        </ErrorBoundary>
      </StyleAppBizModal>
    );
  }
}

AppModal.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
export default AppModal;
