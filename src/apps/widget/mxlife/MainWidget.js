import React, { Component } from 'react';
import { Drawer } from 'antd';
import ScrollBar from 'react-custom-scrollbars';
import StyledMainWidget from './StyledMainWidget';
import StyledDrawer from './StyledDrawer';

const AntdDrawer = StyledDrawer(Drawer);

/*
      MXLIFE - MAIN WIDGET
      by. 정현
      샘플 디자인 적용 // - 추후 컴포넌트 들 따로 분리하여 작업예정
*/

class MainWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complainInfo: {
        isDetailView: false,
        selectedContents: -1,
        listData: [
          {
            title: '테스트 타이틀',
            dept: '총무',
            content: '테스트 글 내용',
          },
          {
            title: '테스트 타이틀',
            dept: '총무',
            content: '테스트 글 내용',
          },
          {
            title: '테스트 타이틀',
            dept: '총무',
            content: '테스트 글 내용',
          },
          {
            title: '테스트 타이틀',
            dept: '총무',
            content: '테스트 글 내용',
          },
          {
            title: '테스트 타이틀',
            dept: '총무',
            content: '테스트 글 내용',
          },
          {
            title: '테스트 타이틀',
            dept: '총무',
            content: '테스트 글 내용',
          },
          {
            title: '테스트 타이틀',
            dept: '총무',
            content: '테스트 글 내용',
          },
          {
            title: '테스트 타이틀',
            dept: '총무',
            content: '테스트 글 내용',
          },
        ],
      },
    };
  }

  // 콘텐츠 클릭
  onClickContents = (type, bool, content) => {
    const { complainInfo } = this.state;
    switch (type) {
      case 'complain':
        this.setState({
          complainInfo: {
            ...complainInfo,
            isDetailView: bool,
            selectedContents: content,
          },
        });
        break;
      default:
        break; // no event
    }
  };

  renderListContens = listData => {
    if (listData.length > 0) {
      return (
        <ul className="section-contents-board">
          {listData.map(content => (
            <li>
              <a href="#none" onClick={() => this.onClickContents('complain', true, content)}>
                <span className="board-txt">{content.title}</span>
                <span className="board-date">2020.06.25</span>
              </a>
            </li>
          ))}
        </ul>
      );
    }
    return '';
  };

  render() {
    const { complainInfo } = this.state;
    return (
      <StyledMainWidget>
        <div className="main-widget-section widget-left widget-left-top">
          <div className="section-header">
            <h2 className="section-title">MXLIFE - 민원 / 고충처리 관리</h2>
          </div>
          <div className="section-body">{this.renderListContens(complainInfo.listData || [])}</div>
          <AntdDrawer
            title={complainInfo.selectedContents.title || ''}
            placement="right"
            onClose={() => this.onClickContents('complain', false, {})}
            visible={complainInfo.isDetailView}
            getContainer={false}
            style={{ position: 'absolute' }}
          >
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
            <p>{complainInfo.selectedContents.content || ''}</p>
          </AntdDrawer>
        </div>
        <div className="main-widget-section widget-right widget-right-btm">
          <div className="section-header">
            <h2 className="section-title">MXLIFE - 여성 고충처리 관리</h2>
          </div>
          <div className="section-body">
            <ul className="section-contents-board">
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, MXLIFE RENEW</span>
                  <span className="board-date">2020.06.25</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-widget-section widget-left widget-left-top">
          <div className="section-header">
            <h2 className="section-title">MXLIFE - 콘도 관리</h2>
          </div>
          <div className="section-body">
            <ul className="section-contents-board">
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, MXLIFE RENEW</span>
                  <span className="board-date">2020.06.25</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-widget-section widget-right widget-right-btm">
          <div className="section-header">
            <h2 className="section-title">MXLIFE - 제휴업체 관리</h2>
          </div>
          <div className="section-body">
            <ul className="section-contents-board">
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, MXLIFE RENEW</span>
                  <span className="board-date">2020.06.25</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-widget-section widget-left widget-left-top">
          <div className="section-header">
            <h2 className="section-title">공지사항</h2>
          </div>
          <div className="section-body">
            <ul className="section-contents-board">
              <li>
                <a href="#none">
                  <span className="board-txt">매그나칩, MXLIFE RENEW</span>
                  <span className="board-date">2020.06.25</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </StyledMainWidget>
    );
  }
}

export default MainWidget;
