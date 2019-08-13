import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-animated-modal';
import { compose } from 'redux';
import { Table } from 'semantic-ui-react';
import { Button, Popover, Icon } from 'antd';
import { createStructuredSelector } from 'reselect';
import { intlObj, imgUrl, lang } from 'utils/commonUtils';

import Drilldown from 'react-router-drilldown'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import CarouselWrapper from './carousel.style';
import messages from '../../../components/Page/messages';
import Carousels from './carousel';
import { QuickMenuStyle } from './quickmenuStyle.js';
import ModalStyle from '../../../components/appSetting/StyleWidgetSetting';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import { makeAppList, currentView } from './selectors';
import { onLoadAppList, execApps } from './actions';
import reducer from './reducer';
import saga from './saga';
import Apply from './onApply';
import DatailPage from '../../../components/detailPage';

const Carousel = props => (
  <CarouselWrapper>
    <Carousels {...props} />
  </CarouselWrapper>
);

const style = {
  // textAlign: 'center',
  fontSize: 13,
  // marginTop: 10,
  // paddingBottom: 5,
};

const style2 = {
  // textAlign: 'center',
  fontSize: 12,
  width: 'auto',
  color: '#404040',
  // background: '#CFE7F1',
  // maxHeight: '200px',
};

const style3 = {
  // textAlign: 'center',
  fontSize: 12,
  width: '100%',
  color: '#404040',
  // background: '#CFE7F1',
  // maxHeight: '200px',
};

const style4 = {
  width: 500,
  height: 500,
  backgroundColor: 'white',
  textAlign: 'center'
};

class QuickMenu extends Component {
  constructor(props) {
    super(props);

    // const widgetID = Number(this.props.item.WIDGET_ID);
    
    // this.props.onLoadAppList(widgetID);

    this.state = {
      appList: this.props.item.data,
      apply: false,
      visible: false,
      item: this.props.item,
    };

    this.onApply = this.onApply.bind(this);
    this.onNoneApply = this.onNoneApply.bind(this);
    this.visible = this.visible.bind(this);
    this.unvisible = this.unvisible.bind(this);
    this.onClickMenu = this.onClickMenu.bind(this);
  }

  // componentDidMount() {
    
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.appList !== nextProps.appList) {
      this.setState({ appList: nextProps.appList.data });
    }
  }

  onApply() {
    this.setState({ apply: true });
  }

  onNoneApply() {
    this.setState({ apply: false });
  }

  visible() {
    this.setState({ visible: true });
  }

  unvisible() {
    this.setState({ visible: false });
  }

  onChange = (index, ) => {
  };

  onClickMenu(node) {
    this.props.item.execPage(node, 'execMenu');
    // this.props.item.execMenu(node.PAGE_ID, node.TARGET);
  }

  getMenu = (quickMenu, widgetWidth, widgetHeight, widgetView) => {
    let tableCellArr = [];
    let noImagePath = '/app_icon/icon_no_image.png';
    {
      for (var i = 0; i < quickMenu.length; i++) {
        const appID = quickMenu[i];
        tableCellArr.push(
          <Table.Cell key={quickMenu[i].app_ID}>
            <div className='quickmenu' id={quickMenu[i].app_ID} onClick={() => this.onClickMenu(appID)}>
              {quickMenu[i].app_ID === "" ?
                <a href={quickMenu[i].url} target="_blank">
                  <span className="appWrapper">
                    <img
                      alt={quickMenu[i].title}
                      src={quickMenu[i].image !== undefined ? imgUrl.get('160x160', quickMenu[i].image) : noImagePath}
                      style={{ width: 50, height: 50 }}
                    />
                  </span>
                </a>
                :
                <a>
                  <span className="appWrapper">
                    <img
                      alt={quickMenu[i].title}
                      src={quickMenu[i].image !== undefined ? imgUrl.get('160x160', quickMenu[i].image) : noImagePath}
                      style={{ width: 50, height: 50 }}
                      id={quickMenu[i].app_ID}
                    />
                  </span>
                </a>
              }
              <p className="titleText">{quickMenu[i].title}</p>
            </div>
          </Table.Cell>
        );
      }
    }

    if (widgetView !== "Mobile") {
      // 위젯 넓이가 1인 경우
      if (widgetWidth === 1) {
        // 위젯 높이가 1인 경우
        if(widgetHeight === 1) {
          // tableRow에 들어갈 tableCell의 개수
          const num = 3;
          // tableRow의 총 개수
          const lineNum = Math.ceil(quickMenu.length / num);
          // table의 총 개수
          const pageNum = Math.ceil(quickMenu.length / 6);

          let tableRowArr = [];
          let tableArr = [];
          let index = 0;

          let tableRowArrBefore = [];
          for (var i = 0; i < lineNum; i++) {
            for (var j = 0; j < num; j++) {
              if (index < quickMenu.length) {
                tableRowArrBefore.push(tableCellArr[index++]);
                if (j === num - 1 || index === quickMenu.length) {
                  tableRowArr.push(
                    React.createElement(Table.Row, { key: i },
                      tableRowArrBefore
                    )
                  );
                  tableRowArrBefore = [];
                }
              }
            }
          }

          index = 0;
          let tableArrBefore = [];
          for (var i = 0; i < pageNum; i++) {
            for (var j = 0; j < 2; j++) {
              if (index < tableRowArr.length) {
                tableArrBefore.push(tableRowArr[index++]);
                if (j === 1 || index === tableRowArr.length) {
                  tableArr.push(
                    React.createElement('div', { className: 'tableDivOneByOne', key: i },
                      React.createElement(Table, { style: style2 },
                        React.createElement(Table.Body, { key: i },
                          tableArrBefore
                        )
                      )
                    )
                  );
                  tableArrBefore = [];
                }
              }
            }
          }
          return tableArr;
          // 위젯 높이가 2인 경우
        } else if (widgetHeight === 2) {
          // tableRow에 들어갈 tableCell의 개수
          const num2 = 15;
          // table의 총 개수
          const pageNum = Math.ceil(quickMenu.length / num2);

          let tableRowArr = [];
          let index = 0;

          let tableRowArrBefore = [];
          for (var i = 0; i < pageNum; i++) {
            for (var j = 0; j < num2; j++) {
              if (index < quickMenu.length) {
                tableRowArrBefore.push(tableCellArr[index++]);
                if (j === num2 - 1 || index === quickMenu.length) {
                  tableRowArr.push(
                    React.createElement('div', { className: 'tableDivOneByTwo', key: i },
                      React.createElement(Table, { style: style3 },
                        React.createElement(Table.Body, {},
                          React.createElement(Table.Row, { key: i },
                            tableRowArrBefore
                          )
                        )
                      )
                    )
                  );
                  tableRowArrBefore = [];
                }
              }
            }
          }
          return tableRowArr;
        }
      } else if (widgetWidth === 2) {
        // tableRow에 들어갈 tableCell의 개수
        const num = 12;
        // table의 총 개수
        const pageNum = Math.ceil(quickMenu.length / num);

        let tableRowArr = [];
        let index = 0;

        let tableRowArrBefore = [];
        for (var i = 0; i < pageNum; i++) {
          for (var j = 0; j < num; j++) {
            if (index < quickMenu.length) {
              tableRowArrBefore.push(tableCellArr[index++]);
              if (j === num - 1 || index === quickMenu.length) {
                tableRowArr.push(
                  React.createElement('div', { className: 'tableDivTwoByOne', key: i },
                    React.createElement(Table, { style: style3 },
                      React.createElement(Table.Body, {},
                        React.createElement(Table.Row, { key: i },
                          tableRowArrBefore
                        )
                      )
                    )
                  )
                );
                tableRowArrBefore = [];
              }
            }
          }
        }
        return tableRowArr;
      }
    } else {
      // 위젯 높이가 1인 경우
      if(widgetHeight === 1) {
        // tableRow에 들어갈 tableCell의 개수
        const num = 3;
        // tableRow의 총 개수
        const lineNum = Math.ceil(quickMenu.length / num);
        // table의 총 개수
        const pageNum = Math.ceil(quickMenu.length / 6);

        let tableRowArr = [];
        let tableArr = [];
        let index = 0;

        let tableRowArrBefore = [];
        for (var i = 0; i < lineNum; i++) {
          for (var j = 0; j < num; j++) {
            if (index < quickMenu.length) {
              tableRowArrBefore.push(tableCellArr[index++]);
              if (j === num - 1 || index === quickMenu.length) {
                tableRowArr.push(
                  React.createElement(Table.Row, { key: i },
                    tableRowArrBefore
                  )
                );
                tableRowArrBefore = [];
              }
            }
          }
        }

        index = 0;
        let tableArrBefore = [];
        for (var i = 0; i < pageNum; i++) {
          for (var j = 0; j < 2; j++) {
            if (index < tableRowArr.length) {
              tableArrBefore.push(tableRowArr[index++]);
              if (j === 1 || index === tableRowArr.length) {
                tableArr.push(
                  React.createElement('div', { className: 'tableDivOneByOne', key: i },
                    React.createElement(Table, { style: style2 },
                      React.createElement(Table.Body, { key: i },
                        tableArrBefore
                      )
                    )
                  )
                );
                tableArrBefore = [];
              }
            }
          }
        }
        return tableArr;
        // 위젯 높이가 2인 경우
      } else if (widgetHeight === 2) {
        // tableRow에 들어갈 tableCell의 개수
        const num2 = 15;
        // table의 총 개수
        const pageNum = Math.ceil(quickMenu.length / num2);

        let tableRowArr = [];
        let index = 0;

        let tableRowArrBefore = [];
        for (var i = 0; i < pageNum; i++) {
          for (var j = 0; j < num2; j++) {
            if (index < quickMenu.length) {
              tableRowArrBefore.push(tableCellArr[index++]);
              if (j === num2 - 1 || index === quickMenu.length) {
                tableRowArr.push(
                  React.createElement('div', { className: 'tableDivOneByTwo', key: i },
                    React.createElement(Table, { style: style3 },
                      React.createElement(Table.Body, {},
                        React.createElement(Table.Row, { key: i },
                          tableRowArrBefore
                        )
                      )
                    )
                  )
                );
                tableRowArrBefore = [];
              }
            }
          }
        }
        return tableRowArr;
      }
    }
  }

  render() {
    const { item } = this.props;
    const { apply } = this.state;
    const quickMenu = this.state.appList;
    const widgetWidth = item.position[2];
    const widgetHeight = item.position[3];
    const widgetView = this.props.view;
    const content = this.getMenu(quickMenu, widgetWidth, widgetHeight, widgetView);

    const customstyle = {
      content: {
        width: 800,
        height: 500,
        top: '32%',
        left: '28%',
        transform: 'translate(-50%, -50%)',
      },
    };

    //isAuth 는 앱에 이용권한 유무(true면 있고 false면 없음)
    //false의 경우 isTitle 또한 false 변경하여 환경설정 탭 삭제 필요
    // if (item.isAuth) {
      return (
        <QuickMenuStyle className="quickmenu">
          {quickMenu.length > 0 ?

            <div className="carouselWrapper quickmenu">
              <Carousel
                arrows
                slidesToShow={1}
                //slidesToScroll={3}
                adaptiveHeight
                afterChange={this.onChange}
                infinite={false}
                dots={true}
              >
                {content}
              </Carousel>
            </div>
            :
            <div className="noWidgetWrapper">
              <div className="noWidgetContent">
                <p className="noWCIcon">{intlObj.get(messages.addSer)}</p>
              </div>
            </div>
          }
        </QuickMenuStyle>
      );
  }
}

QuickMenu.propTypes = {
  item: PropTypes.object.isRequired,
  appList: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appList: makeAppList(),
  view: currentView(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadAppList: id => dispatch(onLoadAppList(id)),
  };
}

const withReducer = injectReducer({ key: 'quickmenu', reducer });
const withSaga = injectSaga({ key: 'quickmenu', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(QuickMenu);
