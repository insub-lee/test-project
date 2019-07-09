import React, { PureComponent } from 'react';
// import GridLayout from 'react-grid-layout';
import RGL, { WidthProvider } from 'react-grid-layout';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import _ from 'lodash';
import WidgetsWrapper from './WidgetsWrapper';
import WidgetGridWrapper from './StyleWidgetGrid';
import Loading from './Loading';
import * as selectors from './selectors';

const ReactGridLayout = WidthProvider(RGL);

function createComponents(item) {
  const param = {
    loader: () => import(`containers/admin/${item.basic.path}`),
    loading: Loading,
  };
  const COMP = Loadable(param);
  return (
    <div key={`${item.id}`} className={item.id === '0' ? 'addNew' : ''}>
      <WidgetsWrapper item={item}>
        <COMP
          item={item}
        />
      </WidgetsWrapper>
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

  items.sort((a, b) => (a.ord - b.ord));

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
    const h = item.position[3];

    const ow = w;
    const oh = h;

    if (w > layoutConfig.col) {
      w = layoutConfig.col;
    }

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
      ow,
      oh,
      static: item.fixed,
    });

    const pos = findStartPosition(cHH, layoutConfig.col, arrH);
    cW = pos[1] * 1;
    cH = pos[0] * 1;
    cHH = cH;
  });
  return layout;
}

function changeLayoutConfig(layoutConfig, view, items) {
  const layout = [];
  const arrH = [];

  items.sort((a, b) => {
    if (a.y === b.y) return a.x - b.x;
    return a.y - b.y || a.x - b.x;
  });

  for (let i = 0; i < Math.ceil(items.length / layoutConfig.col) + 10; i += 1) {
    arrH.push([]);
  }
  let cW = 0;
  let cW2 = 0;
  let cH = 0;
  let cHH = 0;
  let cH2 = 0;

  let count = 1;
  items.forEach((item) => {
    let { w } = item;

    if (item.ow > layoutConfig.col) {
      w = layoutConfig.col;
    } else {
      w = item.ow;
    }
    const { h } = item;
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
        arrH[cH2 + j][cW2 + k] = item.i;
      }
    }

    let ord = 0;
    if (item.i === '0') {
      ord = 999;
      w = layoutConfig.col;
    } else {
      // eslint-disable-next-line no-plusplus
      ord = count++;
    }

    layout.push({
      i: item.i,
      x: cW2,
      y: cH2,
      w,
      h,
      ow: item.ow,
      oh: item.oh,
      static: item.static,
      ord,
    });

    const pos = findStartPosition(cHH, layoutConfig.col, arrH);
    cW = pos[1] * 1;
    cH = pos[0] * 1;
    cHH = cH;
  });
  return layout;
}

function getLayoutConfig(currentView) {
  const layoutConfig = {
    col: 5,
    width: window.innerWidth,
  };
  switch (currentView) {
    case 'DesktopWide':
      layoutConfig.col = 5;
      layoutConfig.width = 1260;
      break;
    case 'Desktop':
      layoutConfig.col = 4;
      layoutConfig.width = 1010;
      break;
    case 'DesktopNarrow':
      layoutConfig.col = 3;
      layoutConfig.width = 760;
      break;
    case 'Tablet':
      // 태블릿 디자인 적용하면서 값 조정
      layoutConfig.col = 2;
      // layoutConfig.width = window.innerWidth;
      layoutConfig.width = 510;
      break;
    default:
      // 모바일 디자인 적용하면서 값 조정
      layoutConfig.col = 1;
      layoutConfig.width = window.innerWidth;
  }

  return layoutConfig;
}

class Page extends PureComponent {
  constructor(props) {
    super(props);

    const { currentView, columns } = props;
    const layoutConfig = getLayoutConfig(currentView);
    const layout = createLayoutConfig(layoutConfig, currentView, columns);

    this.state = {
      layout,
      layoutConfig,
      columns,
      currentView,
      changedLayout: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentView, columns } = nextProps;

    if (columns.length > 0 && JSON.stringify(this.state.columns) !== JSON.stringify(columns)) {
      const layoutConfig = getLayoutConfig(currentView);
      const layout = createLayoutConfig(layoutConfig, currentView, columns);
      this.setState({
        layout,
        layoutConfig,
        columns,
        changedLayout: false,
      });
    } else if (currentView !== '' && currentView !== this.state.currentView) {
      const layoutConfig = getLayoutConfig(currentView);
      const layout = changeLayoutConfig(layoutConfig, currentView, this.state.layout);
      this.setState({
        layout,
        layoutConfig,
        currentView,
      });
    }
  }

  render() {
    const {
      layout,
      layoutConfig,
      columns,
      currentView,
      changeLayoutMap,
      changedLayout,
    } = this.state;

    const {
      // eslint-disable-next-line react/prop-types
      moveMyWidget,
    } = this.props;

    return (
      <WidgetGridWrapper>
        <div className="stickyTop">
          <button
            disabled={changedLayout ? '' : 'disabled'}
            className={changedLayout ? 'btnLocationOk on' : 'btnLocationOk'}
            title="이동시킨 위젯의 위치를 저장합니다."
            onClick={() => {
              moveMyWidget(changeLayoutMap);
          }}
          >위젯위치확정
          </button>
          {/* 위젯위치확정 버튼:
            1. 비활성화 상태 "disabled" & className="btnLocationOk"
            2. 활성화 상태 "disabled" 삭제 & className="btnLocationOk on"
          */}
        </div>
        <ReactGridLayout
          className="layouts"
          layout={layout}
          cols={layoutConfig.col}
          rowHeight={195}
          width={layoutConfig.width}
          compactType="vertical"
          draggableCancel=".draggableCancel"
          onDragStop={(currentLayout, item) => {
            const currentLayoutMap = _.keyBy(currentLayout, 'i');
            const oldItem = currentLayoutMap[item.i];

            if (oldItem.x !== item.x || oldItem.y !== item.y) {
              const changeLayout = changeLayoutConfig(layoutConfig, currentView, currentLayout);
              // eslint-disable-next-line no-shadow
              const changeLayoutMap = _.keyBy(changeLayout, 'i');
              this.setState({
                changeLayoutMap,
                changedLayout: true,
              });
            }
          }}
        >
          {columns.map(createComponents)}
        </ReactGridLayout>
      </WidgetGridWrapper>
    );
  }
}

Page.propTypes = {
  columns: PropTypes.array.isRequired,
  currentView: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentView: selectors.currentView(),
});

export default connect(mapStateToProps)(Page);
