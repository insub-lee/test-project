import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon } from 'antd';
import moment from 'moment';

import HoldView from 'apps/Workflow/components/ApproveBase/viewComponent/MdcsAppvView/holdview';
import StyledLineTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import ContentsWrapper from 'commonStyled/MdcsStyled/Wrapper/ContentsWrapper';
import StyledContentsModal from 'commonStyled/MdcsStyled/Modal/StyledContentsModal';

const AntdLineTable = StyledLineTable(Table);
const AntdModal = StyledContentsModal(Modal);

class DraftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalWidth: 800,
    };
  }

  componentDidMount() {
    this.props.getDraftList();
  }

  getTableColumns = () => [
    {
      title: 'No',
      dataIndex: 'RNUM',
      key: 'rnum',
      width: '5%',
      align: 'center',
    },
    {
      title: '구분',
      dataIndex: 'APPVGUBUN',
      key: 'APPVGUBUN',
      width: '10%',
      align: 'center',
    },
    {
      title: '프로세스상태',
      dataIndex: 'STATUS_NM',
      key: 'STATUS_NM',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'DRAFT_TITLE',
      key: 'title',
      ellipsis: true,
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
    if (record.STATUS === 3) {
      record.PROC_STATUS = 3;
    }
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  onResizeModal = modalWidth => {
    this.setState({ modalWidth });
  };

  render() {
    // const { approveList } = this.props;
    const { draftList } = this.props;
    const { modalWidth } = this.state;
    return (
      <>
        <ContentsWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 기안함
            </p>
          </div>
          <AntdLineTable
            columns={this.getTableColumns()}
            dataSource={draftList.map(item => ({
              ...item,
              key: `draftList_${item.RNUM}`,
            }))}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            className="tableWrapper"
          />
        </ContentsWrapper>
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          title="기안함"
          width={modalWidth}
          visible={this.props.viewVisible}
          destroyOnClose
          footer={[]}
        >
          <HoldView {...this.props} onResizeModal={this.onResizeModal} />
        </AntdModal>
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
