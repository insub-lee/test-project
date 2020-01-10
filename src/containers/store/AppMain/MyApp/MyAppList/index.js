import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { Input } from 'antd';
import ReactDataGrid from 'react-data-grid';
import { Link } from 'react-router-dom';

import { intlObj, lang } from 'utils/commonUtils';
import messages from '../messages';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import Select, { SelectOption } from '../../../../../components/Select';
import { LinkBtnDkGray } from '../../../components/uielements/buttons.style';
import StyleMyAppList from './StyleMyAppList';
import StyleDataGrid from '../../../components/uielements/dataGrid.style';
import Footer from '../../../App/Footer';

const Option = SelectOption;
// let pageNum = 20;
// const pageIndex = 20;

// 페이징에 필요한 변수
const pageIndex = 20; // 페이징 단위
let pageSnum = 1; // 페이징 시작 변수
let pageEnum = 20; // 페이징 종료 변수

class MyAppList extends React.Component {
  constructor(prop) {
    super(prop);
    pageSnum = 1; // 페이징 시작 변수
    pageEnum = 20; // 페이징 종료 변수
    this.columns = [
      {
        key: 'APV_STATUS_ENG',
        name: `${intlObj.get(messages.apv_status)}`,
        width: 110,
        sortable: true,
        formatter: this.apvStatusFomatter,
        getRowMetaData: data => data,
      },
      {
        key: `${intlObj.get(messages.cateGlobal)}`,
        name: `${intlObj.get(messages.cateKor)}`,
        width: 110,
        sortable: true,
      },
      {
        key: 'NAME_CHN',
        name: `${intlObj.get(messages.appName)}`,
        sortable: true,
        formatter: this.HyperlinkFomatter,
        getRowMetaData: data => data,
      },
      {
        key: 'VER',
        name: `${intlObj.get(messages.appVer)}`,
        width: 80,
        sortable: true,
      },
      {
        key: 'UPD_DTTM',
        name: `${intlObj.get(messages.updDttm)}`,
        width: 140,
        sortable: true,
      },
    ];
    this.state = {
      sortColumnParam: '',
      sortDirectionParam: '',
      searchText: '',
      searchType: '',
      myAppList: [],
    };

    // 최초 페이징 함수 실행
    this.props.getMyAppList(
      pageSnum,
      pageEnum,
      this.state.myAppList,
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.searchText,
      this.state.searchType,
    );
  }

  componentWillReceiveProps(nextProps) {
    // if (this.state.myAppList.length > 0) {
    //   this.setState({
    //     myAppList: nextProps.setMyAppList,
    //   });
    // }
    if (this.props.setMyAppList !== nextProps.setMyAppList) {
      this.setState({
        myAppList: nextProps.setMyAppList,
      });
    }
  }

  HyperlinkFomatter = val => {
    const hyperlinkName = lang.get('NAME', val.dependentValues);
    const myAppKey = `/store/appMain/MyApp/MyAppDetail/${val.dependentValues.APP_ID}/${val.dependentValues.VER}`;

    return <Link to={myAppKey}>{hyperlinkName}</Link>;
  };

  apvStatusFomatter = val => {
    const columnName = lang.get('APV_STATUS', val.dependentValues);
    return <div>{columnName}</div>;
  };

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({
      sortColumnParam: sortColumn,
      sortDirectionParam: sortDirection,
      myAppList: [],
    });
    pageSnum = 1;
    pageEnum = pageIndex;
    this.props.getMyAppList(pageSnum, pageEnum, [], sortColumn, sortDirection, this.state.searchText, this.state.searchType);
  };

  rowGetter = i => {
    if (i === pageEnum - 1) {
      pageSnum += pageIndex;
      pageEnum += pageIndex;
      this.props.getMyAppList(
        pageSnum,
        pageEnum,
        this.state.myAppList,
        this.state.sortColumnParam,
        this.state.sortDirectionParam,
        this.state.searchText,
        this.state.searchType,
      );
    }
    return this.state.myAppList[i];
  };

  render() {
    const onChangeSearch = val => {
      this.setState({ searchText: val.target.value });
    };
    const handleKeyPress = val => {
      if (val.key === 'Enter') {
        this.setState({
          myAppList: [],
        });
        pageSnum = 1;
        pageEnum = pageIndex;
        this.props.getMyAppList(
          pageSnum,
          pageEnum,
          [],
          this.state.sortColumnParam,
          this.state.sortDirectionParam,
          this.state.searchText,
          this.state.searchType,
        );
      }
    };
    const searchGo = () => {
      this.setState({
        myAppList: [],
      });
      pageSnum = 1;
      pageEnum = pageIndex;
      this.props.getMyAppList(pageSnum, pageEnum, [], this.state.sortColumnParam, this.state.sortDirectionParam, this.state.searchText, this.state.searchType);
    };
    const onChangeSearchType = val => {
      this.setState({ searchType: val, myAppList: [] });
      pageSnum = 1;
      pageEnum = pageIndex;
      this.props.getMyAppList(pageSnum, pageEnum, [], this.state.sortColumnParam, this.state.sortDirectionParam, this.state.searchText, val);
    };
    const EmptyData = () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 306px)',
          color: '#404040',
        }}
      >
        <p>{intlObj.get(messages.searchResult)}</p>
      </div>
    );
    const loopSearchList = data =>
      data.map(item => (
        <Option value={item.CODE_CD} key={item.CODE_CD}>
          {lang.get('NAME', item)}
        </Option>
      ));
    return (
      <div>
        <StyleMyAppList>
          <div className="searchBox">
            <Select defaultValue="" style={{ width: 120 }} onChange={onChangeSearchType}>
              <Option value="">{intlObj.get(messages.searchTypeA)}</Option>
              {loopSearchList(this.props.searchTypeList)}
            </Select>
            {/* 오른쪽 */}
            <div className="searchWrapper">
              <Input
                placeholder={intlObj.get(messages.searchTextInput)}
                title={intlObj.get(messages.search)}
                maxLength="100"
                onChange={onChangeSearch}
                defaultValue={this.state.searchText}
                onKeyPress={handleKeyPress}
              />
              <button title={intlObj.get(messages.search)} className="searchBtn" onClick={searchGo} />
            </div>
          </div>
          <StyleDataGrid>
            {' '}
            {/* ReactDataGrid 커스텀 스타일 */}
            <ReactDataGrid
              columns={this.columns}
              rowGetter={this.rowGetter}
              rowsCount={this.state.myAppList.length}
              // onRowClick={this.onRowClick}
              onGridSort={this.handleGridSort}
              emptyRowsView={EmptyData}
            />
          </StyleDataGrid>
          <div className="buttonWrapper">
            <Link to="/store/appMain/MyApp/MyAppRegis">
              <LinkBtnDkGray>{intlObj.get(messages.appRegis)}</LinkBtnDkGray>
            </Link>
          </div>
        </StyleMyAppList>
        <Footer />
      </div>
    );
  }
}

MyAppList.propTypes = {
  getMyAppList: PropTypes.func, //eslint-disable-line
  setMyAppList: PropTypes.array, //eslint-disable-line
  history: PropTypes.object,//eslint-disable-line
  searchTypeList: PropTypes.array, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  getMyAppList: (Snum, Enum, myappList, sortColumn, sortDirection, searchText, searchType) => {
    dispatch(actions.getMyAppList(Snum, Enum, myappList, sortColumn, sortDirection, searchText, searchType));
  },
});

const mapStateToProps = createStructuredSelector({
  setMyAppList: selectors.makeSelectMyAppList(),
  searchTypeList: selectors.makeSelectSearchTypeList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'MyAppList', saga });
const withReducer = injectReducer({ key: 'MyAppList', reducer });

export default compose(withReducer, withSaga, withConnect)(MyAppList);
