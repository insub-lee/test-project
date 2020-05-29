import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'antd';
import StyledAntdTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import InputExamQuestion from 'apps/eshs/admin/safety/periodicalEducation/inputExamQuestion';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledContentsModal(Modal);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      modalVisible: false,
      selectedTaskSeq: -1,
    };
  }

  componentDidMount() {
    this.getDataSource();
  }

  getDataSource = () => {
    const { sagaKey: id, getCallDataHandler, profile } = this.props;
    const apiArr = [
      {
        key: 'examList',
        type: 'GET',
        url: `/api/eshs/v1/common/eduexamresult?USER_ID=${profile.USER_ID}`,
      },
    ];

    return getCallDataHandler(id, apiArr, this.setDataSource);
  };

  setDataSource = () => {
    const { result } = this.props;
    this.setState({
      dataSource: (result.examList && result.examList.list) || [],
    });
  };

  columns = [
    {
      title: '연도',
      dataIndex: 'EDU_YEAR',
      render: text => `${text}`,
    },
    {
      title: '월',
      dataIndex: 'EDU_MONTH',
      render: text => `${text}월`,
    },
    {
      title: '시작일',
      dataIndex: 'EDU_INIT',
    },
    {
      title: '종료일',
      dataIndex: 'EDU_END',
    },
    {
      title: '유효성평가 현황 (1차)',
      dataIndex: 'FIRST_SCORE',
    },
    {
      title: '유효성평가 응시',
      render: (text, record) => {
        switch (record.FIRST_SCORE) {
          case '불합격':
            return <span>불합격</span>;
          case '미응시':
            return (
              <StyledButton className="btn-primary btn-sm" onClick={() => this.handleModalVisible(record.PARENT_TASK_SEQ)}>
                응시
              </StyledButton>
            );
          case '합격':
            return <span>합격</span>;
          default:
            return null;
        }
      },
    },
  ];

  handleModalVisible = taskSeq => {
    this.setState({
      modalVisible: true,
      selectedTaskSeq: taskSeq,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalVisible: false,
      selectedTaskSeq: -1,
    });
  };

  render() {
    const { columns, handleModalClose, getDataSource } = this;
    const { dataSource, modalVisible, selectedTaskSeq } = this.state;
    const { authority, workSeq } = this.props;
    return (
      <>
        <AntdTable columns={columns} dataSource={dataSource} />
        <AntdModal visible={modalVisible} title="유효성 평가" onCancel={handleModalClose} destroyOnClose footer={null} width="80%">
          <InputExamQuestion
            handleModalClose={handleModalClose}
            authority={authority}
            parentWorkSeq={workSeq}
            parentTaskSeq={selectedTaskSeq}
            getDataSource={getDataSource}
          />
        </AntdModal>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  profile: PropTypes.object,
  result: PropTypes.object,
  authority: PropTypes.arrayOf('string'),
  workSeq: PropTypes.number,
};

List.defaultProps = {
  sagaKey: '',
  getCallDataHandler: null,
};

export default List;
