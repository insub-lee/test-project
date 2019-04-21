import React from 'react';
import { Select, Button, Menu, Dropdown } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import '../assets/styles/pmTablet.css';
import StylePmTablet from '../assets/styles/stylePmTablet.js';
import Grid from '../PmSheetList/grid.js';

const Options = Select.Option;
const menuAside = (
  <Menu>
    <Menu.Item key="0">
      <Button className="change" disabled>작업자 변경</Button>
    </Menu.Item>
    <Menu.Item key="1">
      <Button className="logout">로그아웃</Button>
    </Menu.Item>
  </Menu>
);

class pmSheetTablet extends React.PureComponent {
	constructor(props) {
    super(props);
  }
  render() {
	const { teamList, sdptList, dataList } = this.props;

    return (
      <StylePmTablet>
        <section className="hypmTablet contractor">
          <header>
            <h1 className="title">HyPM</h1>
            <aside>
              <Dropdown overlayClassName="hypmTablet" overlay={menuAside} trigger={['click']}>
                <Button className="drop-more">
                  도급사명
                </Button>
              </Dropdown>
            </aside>
          </header>

          <main className="contents">
            {/* 검색영역 시작 */}
            <section className="search-area">
              {/* 검색 옵션 search-item */}
              <div className="search-item">
                <span className="search-label">FAB</span>
                <span className="search-select">
                  {/* antd select */}
                  <Select dropdownClassName="hypmTablet" defaultValue="M10/14" disabled>
                  </Select>
                </span>
              </div>
              <div className="search-item">
                <span className="search-label required">Team</span>
                <span className="search-select">
                  {/* antd select */}
                  <Select dropdown ClassName="hypmTablet" defaultValue="선택하세요." onChange={this.props.handleTeamChange}>
                    { teamList.map(teamName => <Options value={teamName.CODE}>{teamName.NAME}</Options>) }
                  </Select>
                </span>
              </div>
              <div className="search-item">
                <span className="search-label required">SDPT</span>
                <span className="search-select">
                  {/* antd select */}
                  <Select dropdownClassName="hypmTablet" defaultValue="선택하세요." onChange={this.props.handleSdptChange}>
                    { sdptList.map(sdptName => <Options value={sdptName.CODE}>{sdptName.NAME}</Options>) }
                  </Select>
                </span>
              </div>
              <div className="btn-area">
                <Button className="btn-search" onClick={this.props.onClick}>Search</Button>
              </div>
            </section>
            {/* 검색 전 코멘트 */}
            {/*  */}
            {/* content */}
            {dataList.length > 0 ?
              <section className="content">
                <h2>검색 결과({dataList.length}건)</h2>
                  <div className="grid-area">
                    <Grid dataList={dataList} selectedSheet={this.props.selectedSheet} />
                  </div>
              </section>
              :
              <aside className="firstComment">
                <p>TEAM, SDPT를 선택 후<br /> 검색해주세요</p>
              </aside>
            }
          </main>
        </section>
      </StylePmTablet>
    );
  }
}

export default pmSheetTablet;
