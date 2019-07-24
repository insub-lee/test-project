import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
// import _ from 'lodash';
import { intlObj, lang } from 'utils/commonUtils';
import Box from 'containers/store/components/utility/box';
import LayoutWrapper from 'containers/store/components/utility/layoutWrapper';
import ContentHolder from 'containers/store/components/utility/contentHolder';
import Button from 'components/Button';

import messages from '../messages';
import BizItem from '../BizItem';
import basicStyle from './basicStyle';
import NoResult from '../NoResult';
// import noResultImageSm from '../../../../../images/bizstore/no-result_sm.png';

/* list를 blockSize 단위로 slice하여 새로운 배열에 담아 리턴. */
const makeBlockList = (list, blockSize) => {
  const blockList = [];
  const listSize = list ? list.length : 0;

  for (let i = 0; i < listSize; i += blockSize) {
    if (listSize - i < blockSize) {
      blockList.push(list.slice(i));
    } else {
      blockList.push(list.slice(i, i + blockSize));
    }
  }
  return blockList;
};

/* render child category list */
const renderChildCategoryList = (key, childBlock, getMapListOne) => (
  <Row key={key}>
    <ContentHolder style={{ overflow: 'hidden' }}>
      {childBlock.map(child => (
        <Col key={child.key} xl={6} md={8} sm={24} className="storeRenderChildBlock">
          <Button type="button" className="goSubmenuBtn" onClick={() => getMapListOne(child.key)}>
            {lang.get('NAME', child)}
          </Button>
        </Col>
      ))}
    </ContentHolder>
  </Row>
);

class ItemList extends Component {
  /*
  type - ALL : 8개의 앱리스트 + 상세리스트 버튼 (첫 메인 진입 시)
  type - ONE : 8개의 앱리스트 + 더보기버튼 + 하위 카테고리 (카테고리 선택 시)
  */
  renderMap = (mapzList, parentInfo) => {
    const renderTitle = () => {
      const jsx = (
        <div className="storeListTitle">
          <h3>{parentInfo.NAME_KOR}</h3>
        </div>
      );

      return jsx;
    };

    const renderBizList = () => {
      let result = '';

      if (mapzList.length > 0) {
        result = mapzList.map(app => {
          const registed = 'true';
          const appColkey = `appCol${app.RNUM}`;
          const nodeType = app.NODE_TYPE;
          return (
            <Col key={appColkey} xl={6} md={8} sm={24} className="appBox">
              <BizItem
                selectedBizgrpId={Number(parentInfo)}
                BIZGRP_ID={app.BIZGRP_ID}
                title={lang.get('NAME', app)}
                subTitle={lang.get('DSCR', app)}
                registed={registed}
                registApp={() => {}}
                MCNT={0}
              />
            </Col>
          );
        });
      } else {
        result = (
          <Col xl={24} md={24} sm={24} style={{ width: '100%', marginTop: '6px' }}>
            <NoResult />
          </Col>
        );
      }
      return result;
    };

    const boxkey = `box${parentInfo.BIZGRP_ID}`;

    return (
      <Box key={boxkey}>
        {renderTitle()}

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
  // type: PropTypes.string.isRequired,
  // getMapListOne: PropTypes.func.isRequired,
  // getMapListMore: PropTypes.func.isRequired,
  // registerBiz: PropTypes.func.isRequired,

  // goBack: PropTypes.func.isRequired,
};

export default ItemList;
