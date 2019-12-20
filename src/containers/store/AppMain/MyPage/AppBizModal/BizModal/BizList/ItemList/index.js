import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
// import _ from 'lodash';
import { intlObj, lang } from 'utils/commonUtils';
import Button from 'components/Button';
import Box from 'containers/store/components/utility/box';
import LayoutWrapper from 'containers/store/components/utility/layoutWrapper';
import ContentHolder from 'containers/store/components/utility/contentHolder';
import messages from '../messages';
import Item from '../Item';
import basicStyle from './basicStyle';
import NoSearchResult from '../NoSearchResult';
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
            {child.title}
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
  renderMap(map) {
    // map - 한 카테고리에 대한 정보가 담김.
    const {
      key, // 카테고리 키정보
      title, // 카테고리 명
      bizList, // 카테고리에 등록된 앱 리스트
      showReadMoreBtn, // 앱 리스트 더보기버튼 유무
      childList, // 하위 카테고리 리스트
      searchword, // 검색어
    } = map;

    const {
      type, // 화면에 보여질 유형. ALL / ONE / SEARCH
      getMapListOne, // 다른 카테고리 선택 시 새로운 앱리스트 랜더 요청
      getMapListMore, // 앱리스트 더보기 요청

      registerBiz,

      goBack,
      // history,
    } = this.props;

    const handleGetMapListOne = () => getMapListOne(key);
    const handleReadMore = () => getMapListMore(key);

    const childListN = childList ? childList.filter(child => child.children !== undefined) : [];
    const childBlocks = makeBlockList(childListN, 2);

    const renderTitle = () => {
      let jsx = '';
      if (type === 'SEARCH') {
        jsx = (
          <div className="storeListTitle" style={{ textAlign: 'center' }}>
            <Button type="button" className="arrowGoBack" onClick={goBack} />
            <h3>{searchword !== undefined && bizList.length > 0 ? `'${searchword}' ${intlObj.get(messages.searchResult)}` : ''}</h3>
          </div>
        );
      } else if (bizList.length > 0) {
        jsx = (
          <div className="storeListTitle">
            <h3>{title}</h3>
            {type === 'ALL' && map.children ? <Button type="button" className="arrowGoToPage" onClick={handleGetMapListOne} /> : ''}
          </div>
        );
      }
      // else if (bizList.length === 0 && type === 'ONE') {
      //   // 빈화면
      //   jsx = (
      //     <div className="storeListTitle">
      //       <h3>
      //         { title }
      //       </h3>
      //       <ul>
      //         <li>
      //           <img src={noResultImageSm} alt="알림" />
      //         </li>
      //         <li>
      //           <h4>
      //           (상세 화면은 개발중입니다.)
      //           </h4>
      //         </li>
      //       </ul>
      //     </div>
      //   );
      // }
      return jsx;
    };

    const renderBizList = () => {
      let result = '';

      if (bizList.length > 0) {
        result = bizList.map(app => {
          const handleRegistApp = () => registerBiz(app.BIZGRP_ID, app.CATG_ID);
          // const itemOnclick = () => history.push(
          // `/store/appMain/myPage/modal/biz/detail/info/${app.BIZGRP_ID}`);
          const registed = app.EXISTYN === 'Y' ? 'true' : 'false';
          const appColkey = `appCol${app.BIZGRP_ID}`;
          return (
            <Col key={appColkey} xl={6} md={8} sm={24} style={{ width: 290, height: 110, margin: '10px 5px 0 5px' }}>
              <Item
                selectedBizgrpId={Number(key)}
                BIZGRP_ID={app.BIZGRP_ID}
                title={lang.get('NAME', app)}
                subTitle={lang.get('DSCR', app)}
                registed={registed}
                registApp={handleRegistApp}
                // onClick={itemOnclick}
                MCNT={app.MCNT}
              />
            </Col>
          );
        });
      } else if (type === 'SEARCH') {
        result = (
          <Col xl={24} md={24} sm={24} style={{ width: '100%', marginTop: '6px' }}>
            <NoSearchResult searchword={searchword} />
          </Col>
        );
      }
      return result;
    };

    const boxkey = `box${key}`;

    return (
      <Box key={boxkey}>
        {renderTitle()}

        <Row>{renderBizList()}</Row>

        {type !== 'ALL' && bizList.length > 0 && (
          <div className="showReadMore">{showReadMoreBtn ? <Button type="button" className="showMoreBtn" onClick={handleReadMore} /> : ''}</div>
        )}

        {childBlocks.map((childBlock, i) => {
          const ckey = `childrow${i}`;
          return renderChildCategoryList(ckey, childBlock, getMapListOne);
        })}
      </Box>
    );
  }

  render() {
    const { mapList } = this.props;

    const { rowStyle, colStyle, gutter } = basicStyle;

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col span={24} style={colStyle}>
            {mapList.length > 0 && mapList.map(map => (map.bizList ? this.renderMap(map) : ''))}
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

ItemList.propTypes = {
  mapList: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  getMapListOne: PropTypes.func.isRequired,
  getMapListMore: PropTypes.func.isRequired,
  registerBiz: PropTypes.func.isRequired,

  goBack: PropTypes.func.isRequired,
};

export default ItemList;
