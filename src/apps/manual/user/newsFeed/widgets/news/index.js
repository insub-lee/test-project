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
        formatter: this.formatter,
      },
    ];
  }

  formatter = ({ row }) => (
    <div>
      <a onClick={() => this.props.handleClick(row.MUAL_IDX)} title={row.MUAL_NAME} target="_blank" className="titleText ellipsis">
        [{row.REGDATE}]&nbsp;{row.MUAL_NAME}
      </a>
      <div className="empInfo">
        <span className="subInfo" />
      </div>
    </div>
  );

  render() {
    const { dataList } = this.props;
    const wgHeight = Number(this.props.widgetSize.split('X')[1]);
    const wgTitleHeight = 35;
    const rowHeight = 35;

    return (
      <>
        {dataList.length > 0 ? (
          <ReactDataGrid
            columns={this.columns}
            rowGetter={i => dataList[i]}
            rowsCount={dataList.length}
            rowHeight={rowHeight}
            scrollHeight={wgHeight * 220 - wgTitleHeight} // 슬림스크롤 높이
            minHeight={rowHeight * dataList.length} // 위젯 row 전체 높이
            headerRowHeight={-1}
          />
        ) : (
          <div className="emptyDataView">
            <p>
              <img src={noDataImg} alt="no data image" />
              <br />
              등록된 게시물이 없습니다.
            </p>
          </div>
        )}
      </>
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
