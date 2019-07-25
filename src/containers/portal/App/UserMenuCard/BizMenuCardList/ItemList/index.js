import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { lang } from 'utils/commonUtils';
import Box from 'containers/store/components/utility/box';
import LayoutWrapper from 'containers/store/components/utility/layoutWrapper';
import BizItem from '../BizItem';
import AppItem from '../AppItem';
import basicStyle from './basicStyle';
import NoResult from '../NoResult';

class ItemList extends Component {
  /* eslint-disable */
  renderMap = (mapList, parentInfo) => {
    const renderBizList = () => {
      if (mapList.length > 0) {
        return mapList.map(app => {
          const appColkey = `appCol${app.RNUM}`;
          const nodeType = app.NODE_TYPE;
          const appYn = app.APP_YN;

          let item;

          if (appYn === 'Y') {
            // 앱일경우
            item = <AppItem selectedBizgrpId={Number(parentInfo)} BIZGRP_ID={app.BIZGRP_ID} title={lang.get('NAME', app)} subTitle={lang.get('DSCR', app)} />;
          } else if (nodeType === 'E' && appYn === 'N') {
            // 페이지일 경우
            item = <BizItem selectedBizgrpId={Number(parentInfo)} BIZGRP_ID={app.BIZGRP_ID} title={lang.get('NAME', app)} subTitle={lang.get('DSCR', app)} />;
          } else if (nodeType === 'F' && app.MENU_EXIST_YN === 'Y') {
            // 업무폴더일 경우
            item = <BizItem selectedBizgrpId={Number(parentInfo)} BIZGRP_ID={app.BIZGRP_ID} title={lang.get('NAME', app)} subTitle={lang.get('DSCR', app)} />;
          } else if (nodeType === 'F' && app.MENU_EXIST_YN === 'N') {
            // 폴더일 경우
            item = <BizItem selectedBizgrpId={Number(parentInfo)} BIZGRP_ID={app.BIZGRP_ID} title={lang.get('NAME', app)} subTitle={lang.get('DSCR', app)} />;
          }

          return (
            <Col key={appColkey} xl={6} md={8} sm={24} className="appBox">
              item
            </Col>
          );
        });
      } else {
        return (
          <Col xl={24} md={24} sm={24} style={{ width: '100%', marginTop: '6px' }}>
            <NoResult />
          </Col>
        );
      }
    };

    const boxkey = `box${parentInfo.BIZGRP_ID}`;

    return (
      <Box key={boxkey}>
        <div className="storeListTitle">
          <h3>{parentInfo.NAME_KOR}</h3>
        </div>

        <Row>{renderBizList()}</Row>
      </Box>
    );
  };

  render() {
    const { mapList, parentInfo } = this.props;

    console.debug('>>>>>>mapList: ', mapList);

    const { rowStyle, colStyle, gutter } = basicStyle;

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col span={24} style={colStyle}>
            {this.renderMap(mapList, parentInfo)}
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
