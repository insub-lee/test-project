import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button, message } from 'antd';
import moment from 'moment';

import BizBuilderBase from 'components/BizBuilderBase';
import DraggableModal from 'components/DraggableModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';

const AntdTable = StyledAntdTable(Table);
class DraftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workPrcProps: undefined,
      paginationIdx: 1,
      pageSize: 10,
    };
  }

  componentDidMount() {
    const { getDraftList, relTypes, setRelTypes } = this.props;
    const { paginationIdx, pageSize } = this.state;
    const fixUrl = undefined;
    setRelTypes(relTypes);
    getDraftList(fixUrl, paginationIdx, pageSize, relTypes);
  }

  getTableColumns = () => [
    {
      title: '종류',
      dataIndex: 'APPVGUBUN',
      key: 'APPVGUBUN',
      width: '15%',
      align: 'center',
      render: (text, record) => (record.REL_TYPE === 99 ? '폐기' : record.REL_TYPE === 999 ? '일괄폐기' : text),
    },
    {
      title: '제목',
      dataIndex: 'DRAFT_TITLE',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '기안일',
      dataIndex: 'REG_DTTM',
      key: 'regDttm',
      width: '8%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '상태',
      dataIndex: 'STATUS_NM',
      key: 'STATUS_NM',
      width: '8%',
      align: 'center',
    },
    {
      title: '기안자',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      width: '10%',
      align: 'center',
    },
  ];

  onRowClick = (record, rowIndex, e) => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { isDcc } = this.state;
    const { WORK_SEQ, TASK_SEQ, STEP, PROC_STATUS, APPV_STATUS, DRAFT_DATA, DRAFT_ID } = record;

    this.setState({ workPrcProps: { ...record } });
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  closeBtnFunc = () => {
    const { getDraftList, relTypes } = this.props;
    const { paginationIdx, pageSize } = this.state;
    this.props.setViewVisible(false);
    const fixUrl = undefined;
    getDraftList(fixUrl, paginationIdx, pageSize, relTypes);
  };

  setPaginationIdx = paginationIdx =>
    this.setState({ paginationIdx }, () => {
      const { getDraftList, relTypes } = this.props;
      const { pageSize } = this.state;

      const fixUrl = undefined;
      getDraftList(fixUrl, paginationIdx, pageSize, relTypes);
    });

  render() {
    // const { approveList } = this.props;
    const { draftList, selectedRow, opinionVisible, setOpinionVisible, profile, draftListCnt } = this.props;
    const { workPrcProps, paginationIdx } = this.state;
    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 기안함
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <AntdTable
            key="apps-workflow-user-draft-list"
            columns={this.getTableColumns()}
            dataSource={draftList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            pagination={{ current: paginationIdx, total: draftListCnt }}
            onChange={pagination => this.setPaginationIdx(pagination.current)}
          />
        </StyledContentsWrapper>
        <div>
          {this.props.viewVisible && (
            <DraggableModal key="draftListKeys" title="내용보기" visible={this.props.viewVisible}>
              <BizBuilderBase
                sagaKey="approveBase_approveView"
                viewType="VIEW"
                closeBtnFunc={this.closeBtnFunc}
                workSeq={selectedRow && selectedRow.WORK_SEQ}
                taskSeq={selectedRow && selectedRow.TASK_SEQ}
                selectedRow={selectedRow}
                ViewCustomButtons={({ closeBtnFunc }) => (
                  <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                    <StyledButton className="btn-light btn-sm" onClick={closeBtnFunc}>
                      닫기
                    </StyledButton>
                  </StyledButtonWrapper>
                )}
              />
            </DraggableModal>
          )}
        </div>
      </>
    );
  }
}

DraftList.propTypes = {
  draftList: PropTypes.array,
  getDraftList: PropTypes.func,
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

DraftList.defaultProps = {
  draftList: [],
  getDraftList: () => {},
  selectedRow: {},
};

export default DraftList;
