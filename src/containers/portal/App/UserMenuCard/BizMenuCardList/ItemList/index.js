import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { lang } from 'utils/commonUtils';
import Box from 'containers/store/components/utility/box';
import LayoutWrapper from '../../../UserStore/components/utility/layoutWrapper';

import BizItem from '../BizItem';
import PageItem from '../PageItem';
import AppItem from '../AppItem';
import FolderItem from '../FolderItem';
import basicStyle from './basicStyle';
import NoResult from '../NoResult';

class ItemList extends Component {
  /* eslint-disable */
  renderBizList = (mapList, paramType) => {
    if (mapList.length > 0) {
      return mapList.map(app => {
        console.debug('>>>>>>>>.app: ', app);
        const appColkey = `appCol${app.RNUM}`;
        const nodeType = app.NODE_TYPE;
        const appYn = app.APP_YN;

        let item = '';

        if (appYn === 'Y') {
          // 앱일경우
          item = (
            <AppItem
              paramType={paramType}
              appId={app.APP_ID}
              categoryId={app.CATG_ID}
              title={lang.get('NAME', app)}
              subTitle={lang.get('DSCR', app)}
              starPoint={app.STARPOINT}
              starTotal={app.TOTCNT}
              appIcon={''}
            />
          );
        } else if (nodeType === 'E' && appYn === 'N') {
          // 페이지일 경우
          item = (
            <PageItem paramType={paramType} PAGE_ID={app.PAGE_ID} BIZGRP_ID={app.BIZGRP_ID} title={lang.get('NAME', app)} subTitle={lang.get('DSCR', app)} />
          );
        } else if (nodeType === 'F' && app.MENU_EXIST_YN === 'Y') {
          // 업무폴더일 경우
          item = <BizItem paramType={paramType} BIZGRP_ID={app.BIZGRP_ID} title={lang.get('NAME', app)} subTitle={lang.get('DSCR', app)} />;
        } else if (nodeType === 'F' && app.MENU_EXIST_YN === 'N') {
          // 폴더일 경우
          item = <FolderItem paramType={paramType} BIZGRP_ID={app.BIZGRP_ID} title={lang.get('NAME', app)} subTitle={lang.get('DSCR', app)} />;
        }

        return (
          <Col key={appColkey} xl={6} md={8} sm={24} className="appBox">
            {item}
          </Col>
        );
      });
    } else {
      return (
        <Col key="noResult" xl={6} md={8} sm={24} className="appBox">
          <NoResult />
        </Col>
      );
    }
  };

  render() {
    const { mapList, parentInfo, paramType } = this.props;

    const { rowStyle, colStyle, gutter } = basicStyle;

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col span={24} style={colStyle}>
            <Box key={`box${parentInfo.BIZGRP_ID}`}>
              <div className="storeListTitle">
                <h3>{parentInfo.NAME_KOR}</h3>
              </div>

              <Row>{this.renderBizList(mapList, paramType)}</Row>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

ItemList.propTypes = {
  mapList: PropTypes.array.isRequired,
  parentInfo: PropTypes.object.isRequired,
};

export default ItemList;
