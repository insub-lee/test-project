import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { intlObj, lang } from 'utils/commonUtils';
// import _ from 'lodash';
import Button from 'components/Button';
import noResultImageSm from 'images/bizstore/no-result_sm.png';
import Box from 'containers/store/components/utility/box';
import LayoutWrapper from 'containers/store/components/utility/layoutWrapper';
import ContentHolder from 'containers/store/components/utility/contentHolder';
import * as commonjs from 'containers/common/functions/common';
import messages from './messages';
import Item from '../Item';
import basicStyle from './basicStyle';
import NoSearchResult from '../NoSearchResult';

class ItemList extends Component {
  /*
  type - ALL : 8개의 앱리스트 + 상세리스트 버튼 (첫 메인 진입 시)
  type - ONE : 8개의 앱리스트 + 더보기버튼 + 하위 카테고리 (카테고리 선택 시)
  */
  renderMap(map) {
    // map - 한 카테고리에 대한 정보가 담김.
    const {
      key, // 카테고리 키정보
      appList, // 카테고리에 등록된 앱 리스트
      showReadMoreBtn, // 앱 리스트 더보기버튼 유무
      childList, // 하위 카테고리 리스트
      // searchword, // 검색어
    } = map;

    const {
      history,
      match,
      type, // 화면에 보여질 유형. ALL / ONE / SEARCH
      getMapListOne, // 다른 카테고리 선택 시 새로운 앱리스트 랜더 요청
      getMapListMore, // 앱리스트 더보기 요청

      registApp,
      registCategory,

      // goBack,
      // history,
    } = this.props;

    // const handleGetMapListOne = () => getMapListOne(key);
    const preUrl = commonjs.getPreUrl(match.path, '/modal');
    const handleGetMapListOne = () => history.push(`${preUrl}/app/list/${key}`);
    const handleGetMapListChildOne = childKey => history.push(`${preUrl}/app/list/${childKey}`);    
    const handleReadMore = () => getMapListMore(key);

    const renderTitle = () => {
      let jsx = '';
      // if (type === 'SEARCH') {
      //   jsx = (
      //     <div className="storeListTitle" style={{ textAlign: 'center' }}>
      //       <Button type="button" className="arrowGoBack" onClick={goBack} />
      //       <h3>
      //         {searchword !== undefined && appList.length > 0 ?
      //           `'${searchword}' ${intlObj.get(messages.searchResult)}`
      //           : ''
      //         }
      //       </h3>
      //     </div>
      //   );
      // } else
      if (appList.length > 0) {
        jsx = (
          <div className="storeListTitle">
            <h3>
              {lang.get('NAME', map)}
            </h3>
            {type !== 'ONE' ?
              <Button type="button" className="arrowGoToPage" onClick={handleGetMapListOne} />
              : ''
            }
          </div>
        );
      } else if (appList.length === 0 && type === 'ONE') {
        // 빈화면
        jsx = (
          <div className="storeListTitle" style={{ height: 'auto', borderBottom: 'none' }}>
            <h3>
              {lang.get('NAME', map)}
            </h3>
            <div className="noAppNotification">
              <ul>
                <li>
                  <img src={noResultImageSm} alt={intlObj.get(messages.alarm)} />
                  <h4>
                    {intlObj.get(messages.noRegistApp)}
                  </h4>
                </li>
              </ul>
            </div>
          </div>
        );
      }
      return jsx;
    };

    const renderAppList = () => {
      let result = '';

      if (appList.length > 0) {
        result = appList.map((app) => {
          const handleRegistApp = () => registApp(app.APP_ID, app.CATG_ID, history);
          const handleRegistCategory = () => registCategory(app.APP_ID, app.CATG_ID, history);
          // const itemOnclick = () =>
          // history.push(`/store/appMain/myPage/modal/app/detail/${app.APP_ID}`);
          const registed = app.WG_COUNT > 0 ? 'true' : 'false';
          const appColkey = `appCol${app.APP_ID}`;
          return (
            <Col key={appColkey} xl={6} md={8} sm={24} className="appBoxBiz">
              <Item
                appId={app.APP_ID}
                categoryId={app.CATG_ID}
                title={lang.get('NAME', app)}
                subTitle={lang.get('DSCR', app)}
                starPoint={app.STARPOINT}
                starTotal={app.TOTCNT}
                registed={registed}
                registApp={handleRegistApp}
                registCategory={handleRegistCategory}
                // onClick={itemOnclick}
                appIcon={app.ICON}
              />
            </Col>
          );
        });
      }
      // else if (type === 'SEARCH') {
      //   result = (
      //     <Col xl={24} md={24} sm={24} style={{ width: '100%', marginTop: '6px' }}>
      //       <NoSearchResult searchword={searchword} />
      //     </Col>
      //   );
      // }
      return result;
    };

    const boxkey = `box${key}`;

    return (
      <Box key={boxkey}>
        {renderTitle()}

        <Row>
          {renderAppList()}
        </Row>

        {
          /* appList more */
          type === 'ONE' && appList.length > 0 ? (
            <div className="showReadMore">
              {showReadMoreBtn ?
                <Button type="button" className="showMoreBtn" onClick={handleReadMore} />
                : ''}
            </div>
          ) : ''
        }

        <Row key={key}>
          <ContentHolder style={{ overflow: 'hidden' }}>
            {
              /* child category list */
              childList ? childList.map(child => (
                <Col key={child.key} xl={6} md={8} sm={24} className="storeRenderChildBlock">
                  <Button type="button" className="goSubmenuBtn" onClick={() => handleGetMapListChildOne(child.key)}>
                    {lang.get('NAME', child)}
                  </Button>
                </Col>
              )) : ''
            }
          </ContentHolder>
        </Row>
      </Box>
    );
  }

  render() {
    const {
      mapList,
      type,
      searchword,
      goBack,
    } = this.props;

    const { rowStyle, colStyle, gutter } = basicStyle;

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col span={24} style={colStyle}>
            {mapList.length > 0 ? (
              mapList.map((map) => {
                if (map.appList) {
                  return this.renderMap(map);
                }
                return '';
              })
            ) : (
                ''
              )}
            {mapList.length === 0 && type === 'SEARCH' ? (
              <Box key="searchBox">
                <div className="storeListTitle" style={{ textAlign: 'center' }}>
                  <Button type="button" className="arrowGoBack" onClick={goBack} />
                </div>
                <Row>
                  <Col xl={24} md={24} sm={24} style={{ width: '100%', marginTop: '6px' }}>
                    <NoSearchResult searchword={searchword} />
                  </Col>
                </Row>
              </Box>
            ) : ''}
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

ItemList.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  mapList: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  getMapListOne: PropTypes.func.isRequired,
  getMapListMore: PropTypes.func.isRequired,
  registApp: PropTypes.func.isRequired,
  registCategory: PropTypes.func.isRequired,
  searchword: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default ItemList;
