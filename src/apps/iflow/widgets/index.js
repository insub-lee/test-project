import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ReactDataGrid from 'containers/portal/components/ReactDataGrid';
import { WIDGET } from 'utils/constants';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import IflowStyle from './iflowStyle';
// import TestModal from '../../../components/Rodal';

const curDate = new Date();
const pageIndex = 10;
let pageSnum = 1;
let pageEnum = 10;

const EmptyData = () => (
  <div className="noWidgetContent">
    <p className="noWCIcon">게시된 글이 없습니다.</p>
  </div>
);

class Iflow extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: 'arTitle',
        name: 'TITLE',
        formatter: this.hyperlinkFormatter,
        getRowMetaData: data => data,
      },
    ];
  }

  componentDidMount() {
    const { getIflowDataList, dataList } = this.props;
    getIflowDataList(pageSnum, pageIndex, dataList);
  }

  rowGetter = i => {
    const { dataList } = this.props;
    return dataList[i];
  };

  readMore = () => {
    const { dataList, getIflowDataList } = this.props;
    if (pageEnum - dataList.length < pageIndex) {
      pageSnum += 1;
      pageEnum += pageIndex;
      getIflowDataList(pageSnum, pageIndex, dataList);
    }
  };

  onClickOpen = url => {
    window.open(url);
  };

  hyperlinkFormatter = val => {
    const dtArr = val.dependentValues.modDt.split(' ')[0].split('-');
    const dtObj = new Date(dtArr[0], Number(dtArr[1]) - 1, dtArr[2]);
    const diff = (curDate.getTime() - dtObj.getTime()) / 1000 / 60 / 60 / 24;
    let diffRes = '';
    if (diff >= 1) {
      diffRes = `${parseInt(diff)} 일전`;
    } else {
      const hour = val.dependentValues.modDt.split(' ')[1].split(':');
      diffRes = `${curDate.getHours() - hour[0]} 시간전`;
    }

    const url = `${this.props.iflowUrl}/article/${val.dependentValues.arSeq}`;
    return (
      <div className="contentWrapper">
        <small>{val.dependentValues.arCtname}</small>
        <a href={url} className="titleText ellipsis" target="_blank" title={val.dependentValues.arTitle}>
          {val.dependentValues.arTitle}
        </a>
        <div className="empInfo">
          <div className="empPicWrapper">
            <img
              src={`/portalWeb/uploadfile/pictures/${val.dependentValues.empNo}.jpg`}
              alt={val.dependentValues.empNo}
              onError={e => {
                e.target.src = '/no_img_pro.jpg';
              }}
              // style={{ height: 20, width: 15 }}
            />
          </div>
          <p className="subInfo ellipsis">
            {val.dependentValues.empName}({val.dependentValues.empNo})/{val.dependentValues.deptName} {val.dependentValues.positionName}
            <span className="br">
              {val.dependentValues.modDt} {diffRes}
            </span>
            {/* <span style={{ display: 'inline-block', padding: '0 5px 0 10px' }}>{val.dependentValues.modDt} {diffRes}</span> */}
          </p>
        </div>
      </div>
    );
  };

  render() {
    const { dataList } = this.props;

    const wgHeight = Number(this.props.item.size.split('X')[1]);
    const wgTitleHeight = this.props.item.user.isTitle ? 35 : 0;
    const rowHeight = 90;

    return (
      <IflowStyle className="iflow">
        <ReactDataGrid
          columns={this.columns}
          rowGetter={this.rowGetter}
          rowsCount={dataList.length}
          rowHeight={rowHeight}
          scrollHeight={wgHeight * 270 - wgTitleHeight} // 슬림스크롤 높이
          minHeight={rowHeight * dataList.length} // 위젯 row 전체 높이
          emptyRowsView={EmptyData}
          readMore={this.readMore}
        />
      </IflowStyle>
    );
  }
}

Iflow.propTypes = {
  getIflowDataList: PropTypes.func,
  dataList: PropTypes.arrayOf(PropTypes.object),
  iflowUrl: PropTypes.string,
};

Iflow.defaultProps = {
  getIflowDataList: () => {},
  dataList: [],
  iflowUrl: '',
};

const mapDispatchToProps = dispatch => ({
  getIflowDataList: (pageSnum, pageEnum, dataList) => dispatch(actions.getIflowDataList(pageSnum, pageEnum, dataList)),
});

const mapStateToProps = createStructuredSelector({
  dataList: selectors.makeIflowDataList(),
  iflowUrl: selectors.makeSelectIflowUrl(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'Iflow', saga });
const withReducer = injectReducer({ key: 'Iflow', reducer, mode: WIDGET });

export default compose(withReducer, withSaga, withConnect)(Iflow);
