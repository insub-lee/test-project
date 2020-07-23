import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'antd';
import StyledAntdTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
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
      selectedExamSeq: -1,
    };
  }

  componentDidMount() {
    this.getDataSource();
  }

  getDataSource = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'examList',
        type: 'GET',
        url: `/api/eshs/v1/common/eduexamresult`,
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
      align: 'center',
    },
    {
      title: '교육차수',
      dataIndex: 'EDU_MONTH',
      render: text => `${text}차`,
      align: 'center',
    },
    {
      title: '시작일',
      dataIndex: 'EDU_INIT',
      align: 'center',
    },
    {
      title: '종료일',
      dataIndex: 'EDU_END',
      align: 'center',
    },
    {
      title: '시험차수',
      dataIndex: 'SEQ',
      align: 'center',
      render: text => <span>{text}차</span>,
    },
    {
      title: '유효성평가 현황',
      dataIndex: 'FIRST_EXAM_RESULT',
      align: 'center',
    },
    {
      title: '유효성평가 응시',
      render: (text, record) =>
        // switch (record.FIRST_EXAM_RESULT) {
        //   case '불합격':
        //     return <span>불합격</span>;
        //   case '불합격':
        //     return <span>불합격</span>;
        //   case '미응시':
        //     return (
        //       <StyledButton className="btn-primary btn-sm" onClick={() => this.handleModalVisible(record.TASK_SEQ, record.SEQ)} style={{ width: '50%' }}>
        //         응시
        //       </StyledButton>
        //     );
        //   case '합격':
        //     return <span>합격</span>;
        //   default:
        //     return null;
        // }
        record.FIRST_EXAM_RESULT === '미응시' ? (
          <StyledButton className="btn-primary btn-sm" onClick={() => this.handleModalVisible(record.TASK_SEQ, record.SEQ)} style={{ width: '50%' }}>
            응시
          </StyledButton>
        ) : (
          record.FIRSTeXAM_rESULT
        ),
      align: 'center',
    },
  ];

  handleModalVisible = (taskSeq, examSeq) => {
    this.setState({
      modalVisible: true,
      selectedTaskSeq: taskSeq,
      selectedExamSeq: examSeq,
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
    const { dataSource, modalVisible, selectedTaskSeq, selectedExamSeq } = this.state;
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
            seq={selectedExamSeq}
          />
        </AntdModal>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  authority: PropTypes.arrayOf('string'),
  workSeq: PropTypes.number,
};

List.defaultProps = {
  sagaKey: '',
  getCallDataHandler: null,
};

export default List;
