import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Input, Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import StyledButton from 'components/Button/StyledButton';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import RegModal from './RegModal';
import StyledRootMap from './StyledRootMap';

const AntdTable = StyledAntdTable(Table);

class RootMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { GUBUN } = this.props.match.params;
    const payload = {
      GUBUN,
    };
    this.props.getRootMapList(payload);
    this.props.setRootMapGubun(GUBUN);
  }

  onSelectChange = selectedRowKeys => {
    this.props.setSelectedRowKeys(selectedRowKeys);
  };

  const;

  handleDeleteRootMap = () => {
    const { rootMapList, selectedRowKeys } = this.props;
    if (selectedRowKeys.length === 0) {
      feed.warning('선택된 행이 없습니다.', '');
    } else {
      const copyRow = selectedRowKeys.slice();
      copyRow.forEach((row, idx) => {
        const filterRootMap = rootMapList.filter(item => row === item.MAP_ID);
        if (filterRootMap[0].CATEGORY_CNT > 0) {
          selectedRowKeys.splice(idx, 1);
        }
      });
      this.props.setSelectedRowKeys(selectedRowKeys);

      const payload = {
        mapIds: selectedRowKeys.join(),
      };

      feed.showConfirm('하위 카테고리가 없는 행만 삭제됩니다. 삭제하시겠습니까?', '', () => this.props.deleteRootMap(payload));
    }
  };

  onClickTitle = record => {
    this.props.setSelectedRootMap(record);
    this.props.setVisibleModal(true);
  };

  render() {
    const { rootMapList, visibleModal, setVisibleModal, selectedRowKeys, addRootMap, updateRootMap, selectedRootMap, setSelectedRootMap } = this.props;
    const { GUBUN } = this.props.match.params;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const columns = [
      {
        title: 'No',
        dataIndex: 'RNUM',
        key: 'RNUM',
        width: '5%',
        align: 'center',
      },
      {
        title: '분류명',
        dataIndex: 'NAME_KOR',
        key: 'NAME_KOR',
        render: (text, record) => (
          <Button type="link" onClick={() => this.onClickTitle(record)}>
            {text}
          </Button>
        ),
      },
      {
        title: '하위 카테고리 수',
        dataIndex: 'CATEGORY_CNT',
        key: 'CATEGORY_CNT',
        width: '10%',
        align: 'center',
        render: text => <span>{text}개</span>,
      },
      {
        title: '설정',
        dataIndex: 'MAP_ID',
        key: 'MAP_ID',
        width: '7%',
        align: 'center',
        render: text => (
          <span>
            <Link to={`/admin/adminmain/classify/${GUBUN}/${text}`}>
              <StyledButton className="btn-secondary btn-sm btn-pills">설정</StyledButton>
            </Link>
          </span>
        ),
      },
    ];

    return (
      <StyledRootMap>
        <h3 className="pageTitle">분류체계 관리</h3>
        <div className="searchBox">
          <div className="searchWrapper">
            <Input type="text" name="searchText" placeholder="분류명" />
            <button type="button" title="검색" className="searchBtn" />
          </div>
        </div>
        <div>
          <AntdTable rowSelection={rowSelection} columns={columns} dataSource={rootMapList.map(item => ({ ...item, key: item.MAP_ID }))} bordered />
        </div>
        <div className="buttonWrapper">
          <StyledButton className="btn-light" onClick={this.handleDeleteRootMap}>
            삭제
          </StyledButton>
          <StyledButton className="btn-primary" onClick={() => this.props.setVisibleModal(true)}>
            추가
          </StyledButton>
        </div>
        <RegModal
          rootMap={selectedRootMap}
          visible={visibleModal}
          setVisibleModal={setVisibleModal}
          addRootMap={addRootMap}
          updateRootMap={updateRootMap}
          setSelectedRootMap={setSelectedRootMap}
        />
      </StyledRootMap>
    );
  }
}

RootMap.propTypes = {
  GUBUN: PropTypes.number,
  match: PropTypes.object,
  rootMapList: PropTypes.array.isRequired,
  getRootMapList: PropTypes.func.isRequired,
  visibleModal: PropTypes.bool.isRequired,
  setVisibleModal: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.array.isRequired,
  addRootMap: PropTypes.func.isRequired,
  updateRootMap: PropTypes.func.isRequired,
  deleteRootMap: PropTypes.func.isRequired,
  setSelectedRowKeys: PropTypes.func.isRequired,
  selectedRootMap: PropTypes.object.isRequired,
  setSelectedRootMap: PropTypes.func.isRequired,
  setRootMapGubun: PropTypes.func,
};

RootMap.defaultProps = {
  GUBUN: 1,
};

const mapStateToProps = createStructuredSelector({
  rootMapList: selectors.makeRootMapList(),
  visibleModal: selectors.makeVisibleModal(),
  selectedRowKeys: selectors.makeSelectedRowKeys(),
  selectedRootMap: selectors.makeSelectedRootMap(),
});

const mapDispatchToProps = dispatch => ({
  getRootMapList: payload => dispatch(actions.getRootMapList(payload)),
  setVisibleModal: visibleModal => dispatch(actions.setVisibleModal(visibleModal)),
  addRootMap: rootMapInfo => dispatch(actions.addRootMap(rootMapInfo)),
  updateRootMap: rootMapInfo => dispatch(actions.updateRootMap(rootMapInfo)),
  deleteRootMap: payload => dispatch(actions.deleteRootMap(payload)),
  setSelectedRowKeys: selectedRowKeys => dispatch(actions.setSelectedRowKeys(selectedRowKeys)),
  setSelectedRootMap: rootMap => dispatch(actions.setSelectedRootMap(rootMap)),
  setRootMapGubun: gubun => dispatch(actions.setRootMapGubun(gubun)),
});

const withReducer = injectReducer({ key: 'containers.admin.AdminMain.Classify.RootMap', reducer });
const withSaga = injectSaga({ key: 'containers.admin.AdminMain.Classify.RootMap', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(RootMap);
