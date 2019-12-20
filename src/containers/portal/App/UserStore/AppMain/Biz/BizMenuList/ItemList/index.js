import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { lang } from 'utils/commonUtils';
import ErrorBoundary from 'containers/common/ErrorBoundary';
// import _ from 'lodash';
import Box from 'containers/store/components/utility/box';
import LayoutWrapper from 'containers/store/components/utility/layoutWrapper';
import Item from '../Item';
import ItemPage from '../ItemPage';
import basicStyle from './basicStyle';

class ItemList extends Component {
  renderMap(map) {
    // map - 한 카테고리에 대한 정보가 담김.
    const {
      key, // 카테고리 키정보
      appList, // 카테고리에 등록된 앱 리스트
    } = map;

    const { match, registApp, registCategory } = this.props;
    // const childBlocks = makeBlockList(childList, 2);

    const renderAppList = () => {
      let result = '';

      if (appList.length > 0) {
        result = appList.map(app => {
          const registed = app.WG_COUNT > 0 ? 'true' : 'false';
          // const appColkey = `appCol${app.APP_ID}`;
          const handleRegistApp = () => registApp(app.APP_ID);
          const handleRegistCategory = () => registCategory(app.APP_ID);
          return (
            <Col key={app.MENU_ID} xl={6} md={8} sm={24} className="appBox gridMode">
              <ErrorBoundary>
                {app.APP_ID > -1 ? (
                  <Item
                    match={match}
                    appId={app.APP_ID}
                    bizgrpId={app.BIZGRP_ID}
                    appIcon={app.ICON}
                    title={lang.get('NAME', app)}
                    subTitle={lang.get('DSCR', app)}
                    starPoint={app.STARPOINT}
                    starTotal={app.TOTCNT}
                    registed={registed}
                    registApp={handleRegistApp}
                    registCategory={handleRegistCategory}
                  />
                ) : (
                  <ItemPage match={match} bizgrpId={app.BIZGRP_ID} pageId={app.PAGE_ID} title={lang.get('NAME', app)} subTitle={lang.get('DSCR', app)} />
                )}
              </ErrorBoundary>
            </Col>
          );
        });
      }
      return result;
    };

    const boxkey = `box${key}`;

    return (
      <Box key={boxkey}>
        <Row>{renderAppList()}</Row>
      </Box>
    );
  }

  render() {
    const { mapList } = this.props;

    const { rowStyle, colStyle, gutter, gridModeStyle } = basicStyle;

    return (
      <LayoutWrapper style={gridModeStyle}>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col span={24} style={colStyle} className="gridMode">
            {mapList.length > 0 && mapList.map(map => (map.appList ? this.renderMap(map) : ''))}
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

ItemList.propTypes = {
  match: PropTypes.object.isRequired,
  mapList: PropTypes.array.isRequired,
  registApp: PropTypes.func.isRequired,
  registCategory: PropTypes.func.isRequired,
};

export default ItemList;
