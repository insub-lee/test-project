import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Select } from 'antd';

import * as feed from 'components/Feedback/functions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as commonjs from 'containers/common/functions/common';

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
  return v1 && v2 && v2 !== '' && v1 !== v2;
}

class AppList extends Component {
  componentDidMount() {
    const { match: { params: { CATG_ID, searchword } } } = this.props;
    if (CATG_ID) {
      this.CATG_ID = CATG_ID;
      this.props.handleInitPage('ONE', CATG_ID);
    } else if (searchword) {
      this.CATG_ID = '';
      this.props.handleInitPage('SEARCH', searchword);
    } else {
      this.CATG_ID = '';
      this.props.handleInitPage('ALL');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;
    const { CATG_ID, searchword } = params;
    
    if (checkValue(searchword, nextProps.searchword)) {
      this.props.handleGetMapAppListSearch(searchword);
    } else if (checkValue(CATG_ID, this.CATG_ID)) {
      this.CATG_ID = CATG_ID;
      this.props.handleGetMapListOne(CATG_ID);
    }
  }

  render() {
    const {
      history,
      initType,
      mapList,
      handleGetMapAppListMore,
      handleRegistApp,
      handleRegistCategory,
      handleRegistBiz,
      handleGetMapListOne,

      searchword,
    } = this.props;

    const handleGoBack = () => {
      history.goBack();
    };

    const registApp = (APP_ID, CATG_ID) => {
      feed.showConfirm('등록 하시겠습니까?', '', () => handleRegistApp(APP_ID, CATG_ID, history));
    };

    const registCategory = (APP_ID, CATG_ID) => {
      handleRegistCategory(APP_ID, CATG_ID, history);
    };

    const preUrl = commonjs.getPreUrl(this.props.match.path, '/modal');

    const handleOnChange = (key) => {
      // this.searchword = '';
      // this.searchInput.input.value = '';
      if (key === 0) {
        history.push(`${preUrl}/app/list`);
      } else {
        history.push(`${preUrl}/app/list/${key}`);
      }
      window.scrollTo(0, 0);
    };

    let selectedCategoryId = 0;
    const pn = history.location.pathname;
    const str = 'list/';
    if (pn.indexOf(str) > -1) {
      selectedCategoryId = Number(pn.substring(pn.indexOf(str) + str.length, pn.length));
    }

    return (
      <div>
        <div className="topPart">
          <Select
            value={ selectedCategoryId }
            style={{ width: 200, float: 'right' }}
            onChange={handleOnChange}>
            <Option value={0}>전체</Option>
            <Option value={101}>공통</Option>
            <Option value={102}>업무빌더</Option>
            <Option value={103}>상담지원및메뉴얼</Option>
            <Option value={104}>기타</Option>
          </Select>
        </div>
        <ItemList
          type={initType}
          mapList={mapList}
          getMapListOne={handleGetMapListOne}
          getMapListMore={handleGetMapAppListMore}
          registApp={registApp}
          registCategory={registCategory}
          registBiz={handleRegistBiz}
          goBack={handleGoBack}
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

    handleRegistApp: (APP_ID, CATG_ID, history) => {
      dispatch(actions.registAppModal(APP_ID, CATG_ID, history));
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
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'storeAppList', reducer });
const withSaga = injectSaga({ key: 'storeAppList', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(AppList);
