import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import BizList from './BizList';
import BizDetail from './BizDetail';
import BizMenuList from './BizMenuList';
import BizCategory from '../../components/BizCategory';

class Biz extends PureComponent {
  render() {
    const { history, match } = this.props;
    /* eslint-disable */
    const handleTreeOnClick = node => {
      if (node.children || node.MENU_EXIST_YN === 'N') {
        history.push(`/portal/store/appMain/bizStore/biz/list/${node.key}`);
      } else {
        history.push(`/portal/store/appMain/bizStore/biz/detail/info/${node.key}`);
      }
      window.scrollTo(0, 0);
    };

    return (
      <div className="appBizWrapper">
        <BizCategory handleOnClick={handleTreeOnClick} preUrl="/portal/store/appMain/bizStore" />
        <Switch>
          <Route path={`${match.path}/list/:BIZGRP_ID`} component={BizList} exact />
          <Route path={`${match.path}/list`} component={BizList} exact />
          <Route path={`${match.path}/search/:searchword`} component={BizList} exact />
          <Route path={`${match.path}/menulist/:BIZGRP_ID`} component={BizMenuList} />
          <Route path={`${match.path}/detail/:type/:BIZGRP_ID`} component={BizDetail} />
        </Switch>
      </div>
    );
  }
}

Biz.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Biz;
