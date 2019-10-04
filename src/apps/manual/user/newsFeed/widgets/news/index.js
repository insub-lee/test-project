import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'containers/portal/components/ReactDataGrid';
import noDataImg from 'images/bizstore/no-result.png';

export default class News extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: 'MUAL_NAME',
        name: 'MUAL_NAME',
        formatter: this.Formatter,
      },
    ];
  }

  Formatter = val => (
    <div>
      <a onClick={() => this.props.handleClick(val.row.MUAL_IDX)} title={val.row.MUAL_NAME} target="_blank" className="titleText ellipsis">
        [{val.row.REGDATE}]&nbsp;{val.row.MUAL_NAME}
      </a>
      <div className="empInfo">
        <span className="subInfo"></span>
      </div>
    </div>
  );

  render() {
    const { dataList } = this.props;
    const wgHeight = Number(this.props.widgetSize.split('X')[1]);
    const wgTitleHeight = 35;
    const rowHeight = 35;
    const item = dataList;

    if (item.length === 0) {
      return (
        <div className="emptyDataView">
          <p>
            <img src={noDataImg}></img>
            <br />
            등록된 게시물이 없습니다.
          </p>
        </div>
      );
    }
    return (
      <ReactDataGrid
        columns={this.columns}
        rowGetter={i => item[i]}
        rowsCount={item.length}
        rowHeight={rowHeight}
        scrollHeight={wgHeight * 220 - wgTitleHeight} // 슬림스크롤 높이
        minHeight={rowHeight * item.length} // 위젯 row 전체 높이
        headerRowHeight={-1}
      />
    );
  }
}

News.propTypes = {
  dataList: PropTypes.array,
  handleClick: PropTypes.func,
};

News.defaultProps = {
  dataList: [],
  handleClick: () => false,
};
