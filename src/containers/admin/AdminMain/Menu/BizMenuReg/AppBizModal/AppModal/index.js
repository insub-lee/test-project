import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Button from 'components/Button';
import { intlObj } from 'utils/commonUtils';
import * as commonjs from 'containers/common/functions/common';
import { Input } from 'antd';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import AppCategory from 'containers/admin/components/AppCategory';
// import Loadable from 'components/Loadable';

import messages from './messages';
import AppList from './AppList';
import StyleAppBizModal from '../StyleAppBizModal';

// const AppList = Loadable({ loader: () => import('./AppList') });

class AppModal extends PureComponent {
  searchEnter = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  search = () => {
    const preUrl = commonjs.getPreUrl(this.props.match.path, '/modal');
    const searchword = this.searchInput.input.value;

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

    const handleTreeOnClick = node => history.push(`${preUrl}/app/list/${node.key}`);

    let selectedCategoryId = -1;
    const pn = history.location.pathname;
    const str = 'list/';
    if (pn.indexOf(str) > -1) {
      selectedCategoryId = Number(pn.substring(pn.indexOf(str) + str.length, pn.length));
    }

    return (
      <StyleAppBizModal>
        <ErrorBoundary>
          <AppCategory handleOnClick={handleTreeOnClick} selectedIndex={selectedCategoryId} preUrl={preUrl} />
        </ErrorBoundary>
        <div className="topPart">
          <div className="searchInput">
            <Input
              placeholder=""
              title={intlObj.get(messages.searchBizStore)}
              ref={ref => {
                this.searchInput = ref;
              }}
              onKeyPress={this.searchEnter}
            />
            <Button type="button" onClick={this.search} title={intlObj.get(messages.search)} />

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
