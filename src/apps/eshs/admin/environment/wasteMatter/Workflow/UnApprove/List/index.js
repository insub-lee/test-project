import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'antd';

import moment from 'moment';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';

import DraggableModal from 'components/DraggableModal';
import MdcsAppvView from 'apps/Workflow/components/ApproveBase/viewComponent/MdcsAppvView';

const AntdLineTable = StyledAntdTable(Table);

class UnApproveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationIdx: 1,
      pageSize: 10,
    };
  }

  componentDidMount() {
    const { getUnApproveList, relTypes, setRelTypes } = this.props;
    const { paginationIdx, pageSize } = this.state;
    const prefixUrl = undefined;
    setRelTypes(relTypes);
    getUnApproveList(prefixUrl, paginationIdx, pageSize, relTypes);
  }

  getTableColumns = () => [
    // {
    //   title: 'No',
    //   dataIndex: 'RNUM',
    //   key: 'rnum',
    //   width: '5%',
    //   align: 'center',
    // },
    {
      title: '종류',
      dataIndex: 'APPVGUBUN',
      key: 'APPVGUBUN',
      width: '15%',
      align: 'center',
      render: (text, record) => (record.REL_TYPE === 99 ? '폐기' : record.REL_TYPE === 999 ? '일괄폐기' : text),
    },
    {
      title: '유형',
      dataIndex: 'NODETYPE',
      key: 'NODETYPE',
      width: '10%',
      align: 'center',
      render: (text, record) => (record.APPV_USER_ID === record.ORG_APPV_USER_ID ? text : `${text}(위임결재)`),
    },
    {
      title: '제목',
      dataIndex: 'DRAFT_TITLE',
      key: 'title',
      ellipsis: true,
    },

    {
      title: '기안자',
      dataIndex: 'NAME_KOR',
      key: 'nameKor',
      width: '10%',
      align: 'center',
    },
    {
      title: '기안일',
      dataIndex: 'REG_DTTM',
      key: 'regDttm',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  onRowClick = (record, rowIndex, e) => {
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  onModalClose = () => {
    this.props.setViewVisible(false);
  };

  setPaginationIdx = paginationIdx =>
    this.setState({ paginationIdx }, () => {
      const { pageSize } = this.state;
      const { getUnApproveList, relTypes } = this.props;
      const prefixUrl = undefined;
      getUnApproveList(prefixUrl, paginationIdx, pageSize, relTypes);
    });

  render() {
    const { unApproveList, unApproveListCnt, viewVisible } = this.props;
    const { paginationIdx } = this.state;

    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 미결함
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <AntdLineTable
            key="apps-workflow-user-unapprove-list"
            columns={this.getTableColumns()}
            dataSource={unApproveList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            pagination={{ current: paginationIdx, total: unApproveListCnt }}
            onChange={pagination => this.setPaginationIdx(pagination.current)}
          />
        </StyledContentsWrapper>

        {viewVisible && (
          <DraggableModal key="upApproveListKeys" title="표준문서 결재" visible={viewVisible}>
            <MdcsAppvView {...this.props} />
          </DraggableModal>
        )}
      </>
    );
  }
}

UnApproveList.propTypes = {
  unApproveList: PropTypes.array,
  getUnApproveList: PropTypes.func,

  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

UnApproveList.defaultProps = {
  unApproveList: [],
  getUnApproveList: () => {},

  selectedRow: {},
};

export default UnApproveList;
