import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
// import _ from 'lodash';
import ApplyWidget from 'components/ApplyWidget';
import ServiceStop from 'components/ServiceStatus';

import WidgetsWrapper from './WidgetsWrapper';
import SingleWidgetsWrapper from './SingleWidgetsWrapper';
import Loading from './Loading';
import * as selectors from './selectors';

function createComponents(item) {
  console.log(item, 'createComponents');

  const param = {
    loader: () => import(`apps/${item.basic.path}`),
    loading: Loading,
  };
  const type = 'widget';

  // url이 변경되면 Routes의 getLoaddata가 실행되는데,
  // setMyMenuData, selectedApp을 가져오는 과정이 비동기로 실행되어
  // setMyMenuData는 가져왔는데 selectedApp은 가져오기 전에 이 함수가 실행될 수 있음
  // 만약 setMyMenuData는 페이지 앱인데 selectedApp은 페이지 앱이 아니라면,
  // selectedApp에 위젯 설정값들이 없기때문에 렌더링 하지 말아야 한다.
  if (item.user) {
    const RenderAppView = (app) => {
      if (app.SVC_YN === 'C') {
        return (
          <WidgetsWrapper item={item}>
            <ServiceStop item={item} type={type} />
          </WidgetsWrapper>
        );
      } else if (app.SVC_YN !== 'C' && app.SEC_YN === 'Y') {
        return (
          <WidgetsWrapper item={item}>
            <COMP item={item} />
          </WidgetsWrapper>
        );
      }
      return (
        <WidgetsWrapper item={item}>
          <ApplyWidget item={item} type={type} />
        </WidgetsWrapper>
      );
    };

    const COMP = Loadable(param);

    return <div key={`${item.id}`}>{RenderAppView(item)}</div>;
  }
  return <div />;
}

function createSingleComponents(item, isFullSize) {
  console.log('@@@@@@@@@@@items: ', item);
  console.log(item, 'createSingleComponents');
  // Object.assign(item.basic, { path: item.legacyPath }); //eslint-disable-line

  const param = {
    loader: () => import(`apps/${isFullSize ? item.basic.path : item.legacyPath}`),
    // loader: () => import('apps/legacySVC/index'),
    loading: Loading,
  };
  const type = 'swidget';
  const COMP = Loadable(param);
  return (
    <div key={`${item.id}`}>
      {item.SVC_YN === 'C' ? (
        <SingleWidgetsWrapper item={item}>
          <ServiceStop item={item} type={type} />
        </SingleWidgetsWrapper>
      ) : (
        <div>
          {item.SEC_YN === 'Y' ? (
            <SingleWidgetsWrapper item={item}>
              <COMP item={item} />
            </SingleWidgetsWrapper>
          ) : (
            <SingleWidgetsWrapper item={item}>
              <ApplyWidget item={item} type={type} />
            </SingleWidgetsWrapper>
          )}
        </div>
      )}
    </div>
  );
}

function findPosition(y, x, h, w, arrH) {
  let r = false;
  for (let i = 0; i < h; i += 1) {
    for (let j = 0; j < w; j += 1) {
      if (arrH[y + i][x + j] !== undefined) {
        r = true;
        break;
      }
    }
    if (r) break;
  }
  return r;
}

function findStartPosition(h, col, arrH) {
  const pos = [h, 0];
  let y = h;
  let x = 0;
  while (arrH[y][x] !== undefined) {
    for (let i = 0; i < col; i += 1) {
      x = i;
      if (arrH[y][x] === undefined) {
        break;
      }
    }
    if (arrH[y][x] !== undefined) {
      y += 1;
      x = 0;
    }
  }
  pos[0] = y;
  pos[1] = x;
  return pos;
}

function createLayoutConfig(layoutConfig, view, items) {

  const layout = [];
  const arrH = [];

  items.sort((a, b) => a.ord - b.ord);

  for (let i = 0; i < Math.ceil(items.length / layoutConfig.col) + 10; i += 1) {
    arrH.push([]);
  }
  let cW = 0;
  let cW2 = 0;
  let cH = 0;
  let cHH = 0;
  let cH2 = 0;
  items.forEach((item) => {
    let w = item.position[2];
    if (w > layoutConfig.col) {
      w = layoutConfig.col;
    }
    const h = item.position[3];
    cW2 = cW;
    cH2 = cH;
    while (cW2 + (w - 1) >= layoutConfig.col) {
      cH2 += 1;
      cW2 = 0;
    }
    while (findPosition(cH2, cW2, h, w, arrH)) {
      cW2 += 1;
      if (cW2 + (w - 1) >= layoutConfig.col) {
        cH2 += 1;
        cW2 = 0;
      }
    }
    for (let j = 0; j < h; j += 1) {
      for (let k = 0; k < w; k += 1) {
        arrH[cH2 + j][cW2 + k] = item.id;
      }
    }

    layout.push({
      i: item.id,
      x: cW2,
      y: cH2,
      w,
      h,
      static: item.fixed,
    });

    const pos = findStartPosition(cHH, layoutConfig.col, arrH);
    cW = pos[1] * 1;
    cH = pos[0] * 1;
    cHH = cH;
  });
  return layout;
}

class Page extends Component {
  componentWillReceiveProps(nextProps) {
    const { setMyMenuData, setIsSpinnerShow } = this.props;
    if (JSON.stringify(setMyMenuData) === JSON.stringify(nextProps.setMyMenuData)) {
      setIsSpinnerShow();
    }
  }
  shouldComponentUpdate(nextProps) {
    /* eslint-disable */
    const { columns, setMyMenuData, isUnreadCnt, currentView } = this.props;
    /* eslint-disable */
    if (columns && JSON.stringify(columns) !== JSON.stringify(nextProps.columns)) {
      return true;
    }
    if (setMyMenuData && JSON.stringify(setMyMenuData) !== JSON.stringify(nextProps.setMyMenuData)) {
      return true;
    }
    if (JSON.stringify(isUnreadCnt) !== JSON.stringify(nextProps.isUnreadCnt)) {
      return true;
    }
    if (currentView !== nextProps.currentView) {
      return true;
    }
    return false;
  }
  componentDidUpdate() {
    this.props.setIsSpinnerShow();
  }
  render() {
    const { columns, setMyMenuData, currentView, execMenu, execPage, show, onReload, isPreviewPage } = this.props;

    for (let i = 0; i < columns.length; i += 1) {
      columns[i].onReload = onReload;
    }

    // 위젯의 더보기 기능을 위해 메뉴 실행 함수를 넣어줌
    for (let i = 0; i < columns.length; i += 1) {
      columns[i].execMenu = execMenu;
    }

    // 퀵메뉴 실행을 위해 execPage
    for (let i = 0; i < columns.length; i += 1) {
      columns[i].execPage = execPage;
    }

    // 게시판 위젯에서 쓰이는 show 함수
    for (let i = 0; i < columns.length; i += 1) {
      columns[i].show = show;
    }

    const layoutConfig = {
      col: 5,
      width: window.innerWidth,
    };
    switch (currentView) {
      case 'DesktopWide':
        layoutConfig.col = 5;
        layoutConfig.width = 1660;
        break;
      case 'Desktop':
        layoutConfig.col = 4;
        layoutConfig.width = 1330;
        break;
      case 'DesktopNarrow':
        layoutConfig.col = 3;
        layoutConfig.width = 1000;
        break;
      case 'Tablet':
        // 태블릿 디자인 적용하면서 값 조정
        layoutConfig.col = 2;
        // layoutConfig.width = window.innerWidth;
        layoutConfig.width = 670;
        break;
      default:
        // 모바일 디자인 적용하면서 값 조정
        layoutConfig.col = 1;
        layoutConfig.width = window.innerWidth;
    }
    console.log('VIEW_NAMER:', currentView);
    // const columns2 = Object.values(this.props.columns);
    console.log('VIEW_NAMER:', columns);
    const layout = createLayoutConfig(layoutConfig, currentView, columns);
    console.log('setMyMenuData:', setMyMenuData);
    console.log('isPreviewPage:', isPreviewPage);
    console.log('layout:', layout);
    const isFullSize = columns.length === 1 && columns[0].size === '5X4';
    return (
      <div>
        {!setMyMenuData ? (
          <GridLayout className="layout" layout={layout} cols={layoutConfig.col} rowHeight={270} width={layoutConfig.width} compactType="horizontal">
            {columns.map(createComponents)}
          </GridLayout>
        ) : (
          <div>
            {isPreviewPage === false ? (
              <div>
                {setMyMenuData && columns && columns.length > 0 && setMyMenuData.INTL_TYPE === 'N' 
                && ( setMyMenuData.SRC_PATH === 'PAGE' || setMyMenuData.PAGE_ID === columns[0].PAGE_ID ) ? (
                  <div>
                    { (setMyMenuData.APP_YN === 'N' || setMyMenuData.SRC_PATH === 'PAGE') && !isFullSize ? ( //TODO 임시 풀사이즈 위젯 처리
                      <GridLayout
                        className="layout"
                        layout={layout}
                        cols={layoutConfig.col}
                        rowHeight={270}
                        width={layoutConfig.width}
                        compactType="horizontal"
                      >
                        {columns.map(createComponents)}
                      </GridLayout>
                    ) : (
                      <div>{columns.map(item => createSingleComponents(item, isFullSize))}</div>
                    )}
                  </div>
                ) : (
                  <div />
                )}
              </div>
            ) : (
              <div>
                {setMyMenuData && columns && columns.length > 0 && setMyMenuData.INTL_TYPE === 'N' ? (
                  <div>
                    {setMyMenuData.APP_YN === 'N' || setMyMenuData.SRC_PATH === 'PAGE' ? (
                      <GridLayout
                        className="layout"
                        layout={layout}
                        cols={layoutConfig.col}
                        rowHeight={270}
                        width={layoutConfig.width}
                        compactType="horizontal"
                      >
                        {columns.map(createComponents)}
                      </GridLayout>
                    ) : (
                      <div>{columns.map(item => createSingleComponents(item, isFullSize))}</div>
                    )}
                  </div>
                ) : (
                  <div />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
Page.defaultProps = {
  setMyMenuData: undefined,
};
Page.propTypes = {
  columns: PropTypes.array.isRequired,
  currentView: PropTypes.string.isRequired,
  setMyMenuData: PropTypes.object,
  execMenu: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  isUnreadCnt: PropTypes.array.isRequired,
  setIsSpinnerShow: PropTypes.func.isRequired,
  isPreviewPage: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentView: selectors.currentView(),
});

export default connect(mapStateToProps)(Page);
