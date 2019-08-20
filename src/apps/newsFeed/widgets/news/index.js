import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'containers/portal/components/ReactDataGrid';

export default class News extends PureComponent {

  render() {
    const { dataList, handleClick } = this.props;

    const Low = ({ data, onClick }) => (
      <li>
        <p onClick={() => onClick(data)}>
          [{data.REGDATE}]&nbsp;{data.MUAL_NAME}
        </p>
      </li>
    );

    const LowList = dataList.map(data => <Low data={data} onClick={handleClick} key={data.NUM} />);

    if (dataList === undefined || dataList == null || dataList.length === 0) {
      return (
        <div className="emptyBox">
          <p>등록된 글이 없습니다.</p>
        </div>
      );
    }

    return (
      <div>
        <ol>{LowList}</ol>
      </div>
    );
  }
}

News.propTypes = {
  widgetSize: PropTypes.string,
  dataList: PropTypes.array,
  handleClick: PropTypes.func,
};

News.defaultProps = {
  dataList: [],
  handleClick: () => false,
};
