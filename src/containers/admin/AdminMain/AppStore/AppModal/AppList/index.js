import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Select, Input } from 'antd';

import * as feed from 'components/Feedback/functions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as commonjs from 'containers/common/functions/common';
import { LinkBtnLgtGray } from 'containers/admin/components/uielements/buttons.style';
// import reducer from 'containers/store/AppMain/AppList/reducer';
// import saga from 'containers/store/AppMain/AppList/saga';
// import * as selectors from 'containers/store/AppMain/AppList/selectors';
// import * as actions from 'containers/store/AppMain/AppList/actions';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import ItemList from './ItemList';

const { Option } = Select;

function checkValue(v1, v2) {
  return v1 && v1 !== v2;
}

class AppList extends Component {
  componentDidMount() {
    const {
      match: {
        params: { CATG_ID, searchword },
      },
      handleInitPage,
    } = this.props;
    if (CATG_ID) {
      this.CATG_ID = CATG_ID;
      handleInitPage('ONE', CATG_ID);
    } else if (searchword) {
      this.CATG_ID = '';
      handleInitPage('SEARCH', searchword);
    } else {
      this.CATG_ID = '';
      handleInitPage('ALL');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match, initType } = nextProps;
    const { params } = match;
    const { CATG_ID, searchword } = params;
    const { handleInitPage, handleGetMapListOne, handleGetMapAppListSearch } = this.props;

    if (checkValue(searchword, nextProps.searchword)) {
      this.CATG_ID = '';
      handleGetMapAppListSearch(searchword);
    } else if (checkValue(CATG_ID, this.CATG_ID)) {
      this.CATG_ID = CATG_ID;
      handleGetMapListOne(CATG_ID);
    } else if (!CATG_ID && !searchword && initType !== 'ALL') {
      this.CATG_ID = '';
      handleInitPage('ALL');
    }
  }

  handleClick = () => {
    const { history } = this.props;
    const searchword = this.searchInput.input.value;
    const preUrl = commonjs.getPreUrl(this.props.match.path, '/modal');
    if (searchword) {
      history.push(`${preUrl}/app/list/search/${searchword}`);
    } else {
      history.push(`${preUrl}/app/list`);
    }
  };

  handleGoBack = () => {
    this.props.history.goBack();
  };

  registApp = (APP_ID, CATG_ID, SRC_PATH) => {
    const { history, handleRegistApp } = this.props;
    feed.showConfirm('등록 하시겠습니까?', '', () => handleRegistApp(APP_ID, CATG_ID, SRC_PATH, history));
  };

  registCategory = (APP_ID, CATG_ID) => {
    const { history, handleRegistCategory } = this.props;
    handleRegistCategory(APP_ID, CATG_ID, history);
  };

  handleOnChange = key => {
    this.searchInput.input.value = '';
    const {
      history,
      match: { path },
    } = this.props;
    const preUrl = commonjs.getPreUrl(path, '/modal');
    if (key === 0) {
      history.push(`${preUrl}/app/list`);
    } else {
      history.push(`${preUrl}/app/list/${key}`);
    }
    window.scrollTo(0, 0);
  };

  render() {
    const { history, initType, mapList, handleGetMapAppListMore, handleRegistBiz, handleGetMapListOne, categoryComboData, searchword } = this.props;

    let selectedCategoryId = 0;
    const pn = history.location.pathname;
    const str = 'list/';
    if (pn.indexOf('/search') < 0 && pn.indexOf(str) > -1) {
      selectedCategoryId = Number(pn.substring(pn.indexOf(str) + str.length, pn.length));
    }

    return (
      <div>
        <div className="topPart">
          <Select value={selectedCategoryId} style={{ width: 200, float: 'right' }} onChange={this.handleOnChange}>
            {categoryComboData.map(item => (
              <Option value={item.NODE_TYPE === 'R' ? 0 : item.CATG_ID}>{item.NAME_KOR}</Option>
            ))}
          </Select>
          <Input
            type="text"
            allowClear
            maxLength={200}
            onKeyPress={e => {
              if (e.key === 'Enter') this.handleClick();
            }}
            ref={ref => {
              this.searchInput = ref;
            }}
            style={{ width: 200, marginRight: 10 }}
            placeholder="앱 검색"
          />
          <LinkBtnLgtGray onClick={this.handleClick} style={{ width: '20px', marginRight: '10px' }}>
            검색
          </LinkBtnLgtGray>
        </div>
        <ItemList
          type={initType}
          mapList={mapList}
          getMapListOne={handleGetMapListOne}
          getMapListMore={handleGetMapAppListMore}
          registApp={this.registApp}
          registCategory={this.registCategory}
          registBiz={handleRegistBiz}
          goBack={this.handleGoBack}
          searchword={searchword}
          history={history}
        />
      </div>
    );
  }
}

AppList.propTypes = {
  initType: PropTypes.string.isRequired,
  mapList: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  searchword: PropTypes.string.isRequired,
  categoryComboData: PropTypes.array.isRequired,
  handleInitPage: PropTypes.func.isRequired,
  handleGetMapListOne: PropTypes.func.isRequired,
  handleGetMapAppListMore: PropTypes.func.isRequired,
  handleGetMapAppListSearch: PropTypes.func.isRequired,
  handleRegistApp: PropTypes.func.isRequired,
  handleRegistCategory: PropTypes.func.isRequired,
  handleRegistBiz: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleInitPage: (initType, param) => dispatch(actions.initPage(initType, param)),

    handleGetMapListOne: key => dispatch(actions.getMapListOne(key)),
    handleGetMapAppListMore: key => dispatch(actions.getMapListMore(key)),

    handleRegistApp: (APP_ID, CATG_ID, SRC_PATH, history) => {
      dispatch(actions.registAppModal(APP_ID, CATG_ID, SRC_PATH, history));
    },
    handleRegistCategory: (APP_ID, CATG_ID, type, history) => {
      dispatch(actions.registCategoryModal(APP_ID, CATG_ID, history));
    },
    handleRegistBiz: (app, catg) => dispatch(actions.registBizModal(app, catg)),
    handleGetMapAppListSearch: searchword => dispatch(actions.getMapListSearch(searchword)),
    changeSearchword: searchword => dispatch(actions.changeSearchword(searchword)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 앱리스트
  initType: selectors.makeInitType(),
  mapList: selectors.makeMapList(),
  searchword: selectors.makeSearchword(),
  categoryComboData: selectors.makeCategoryComboData(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'admin/AdminMain/AppStore/AppModal/AppList', reducer });
const withSaga = injectSaga({ key: 'admin/AdminMain/AppStore/AppModal/AppList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppList);
