import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'containers/portal/components/ReactDataGrid';

export default class News extends PureComponent {
  constructor(props){
    super(props);
    this.columns = [
      {
        key: 'MUAL_NAME',
        name: 'MUAL_NAME',
        formatter: this.Formatter,
      }
    ]
  }

  Formatter = (val) => {
    return (
      <div>
      <a
        onClick={() => this.props.handleClick(val.row.MUAL_IDX)}
        title={val.row.MUAL_NAME}
        target="_blank"
        className="titleText ellipsis"
      >
        [{val.row.REGDATE}]&nbsp;{val.row.MUAL_NAME}
      </a>
      <div className="empInfo">
        <span className="subInfo"></span>
        <button className="more" onClick={() => false} id={val.row.MUAL_IDX}>
        <span>더보기</span>
        </button>
      </div>
      </div>
    );
  }


  render() {
    const { dataList } = this.props;

    const EmptyData = () => (
      <div className="noWidgetContent">
        <p className="noWCIcon">등록된 글이 없습니다.</p>
      </div>
    );

    const wgHeight = Number(this.props.widgetSize.split('X')[1]);
    const wgTitleHeight = 35;
    const rowHeight = 44;
    const item = dataList;

    return(
      <ReactDataGrid
      columns={this.columns}
      rowGetter={(i) => item[i]}
      rowsCount={item.length}
      rowHeight={rowHeight}
      scrollHeight={wgHeight * 270 - wgTitleHeight} // 슬림스크롤 높이
      minHeight={rowHeight * item.length} // 위젯 row 전체 높이
      headerRowHeight={-1}
      emptyRowsView={EmptyData}
    />
    );
  }
}

News.propTypes = {
  widgetSize: PropTypes.string,
  dataList: PropTypes.array,
  handleClick: PropTypes.func,
};

News.defaultProps = {
  widgetSize: '1X1',
  dataList: [],
  handleClick: () => false,
};
