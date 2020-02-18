import React, { Component } from 'react';
import { Table, Select, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';
import moment from 'moment';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import Group from 'components/BizBuilder/Sketch/Group';
import BizBuilderBase from 'components/BizBuilderBase';
import Modify from '../ModifyPage';

const AntdTable = StyledAntdTable(Table);
const { Option } = Select;

moment.locale('ko');
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initList: [],
      isWrite: false,
      selectedCategory: 'WF 생산량',
      chk_year: moment().format('YYYY'),
      first_value: '',
      second_value: '',
      modalVisible: false,
      viewType: '',
    };
  }

  columns = [
    // moment().unix() = 현재 시간 타임스탬프
    { title: '항목', dataIndex: 'title', key: 'RNUM' },
    { title: '연도', dataIndex: 'year', key: 'RNUM' },
    { title: '월', dataIndex: 'chk_month', key: 'RNUM' },
    {
      title: '지역',
      children: [
        {
          title: '청주',
          dataIndex: 'first_value',
          width: 250,
          key: 'RNUM',
        },
        {
          title: '구미',
          dataIndex: 'second_value',
          width: 250,
          key: 'RNUM',
        },
      ],
    },
    { title: '입력여부', dataIndex: 'isConfirm', key: 'RNUM' },
    { title: '작성자', dataIndex: 'reg_user_name', width: 200, key: 'RNUM' },
  ];

  handleAddClick = () => {
    // 추가 버튼 누르면 월 + 1, 12월이면 연도 + 1
    this.setState({
      modalVisible: true,
      selectedTaskSeq: -1,
    });
  };

  handleOnBuild = (changedSagaKey, taskSeq, viewType) => {
    /* 
      changedSagaKey: modal쓰려고 바꾼 sagaKey, modal${id}
      taskSeq: 글 번호, INPUT 할 땐 -1, 나머지는 onRow{onClick}
      viewType: INPUT, MODIFY, VIEW
    */
    const { workSeq, sagaKey, loadingComplete } = this.props;
    return (
      <BizBuilderBase
        sagaKey={changedSagaKey}
        workSeq={workSeq}
        viewType={viewType.toUpperCase()}
        taskSeq={taskSeq}
        CustomInputPage={Input}
        CustomModifyPage={Modify}
        loadingComplete={loadingComplete}
        onCloseModleHandler={this.handleModalClose}
        baseSagaKey={sagaKey}
      />
    );
  };

  handleInputChange = e => {
    switch (e.target.name) {
      case 'first_value':
        this.setState({
          first_value: e.target.value,
        });
        break;
      case 'second_value':
        this.setState({
          second_value: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  handleInputClick = () => {
    const { initList, isWrite, chk_year, selectedCategory, first_value, second_value } = this.state;
    const { sagaKey, changeFormData } = this.props;
    if (!isWrite) {
      return;
    }

    if (!first_value.length || !second_value.length) {
      alert('값을 입력하십시오. 수정해야 함');
      return;
    }

    const inputData = {
      title: selectedCategory, // 문자형 라벨
      year: chk_year, // 날짜형 라벨
      chk_month: initList.length,
      first_value,
      second_value,
      isConfirm: (
        <div>
          <StyledButton className="btn-primary">완료</StyledButton>
          <StyledButton className="btn-primary">수정</StyledButton>
        </div>
      ),
      reg_user_name: this.props.formData.REG_USER_NAME,
    };
    if (initList.length === 1) {
      // 빈 배열에서 첫 추가버튼 누를 때
      this.setState({
        initList: [inputData],
        isWrite: false,
      });
      return;
    }
    // initList.pop(); // 수정해야 함
    this.setState({
      isWrite: false,
      initList: [...initList.slice(0, initList.length - 1), inputData],
    });
  };

  handleDeleteClick = () => {
    const { initList, isWrite } = this.state;
    if (isWrite) {
      this.setState({
        isWrite: false,
        initList: initList.slice(0, initList.length - 1),
      });
    }
  };

  render() {
    const { initList, modalVisible } = this.state;
    return (
      <StyledViewDesigner>
        <Sketch>
          <Select onChange={this.handleSelectChange} defaultValue="WF 생산량">
            <Option value="WF 생산량">WF 생산량</Option>
            <Option value="전력">전력</Option>
            <Option value="연료">연료</Option>
            <Option value="용수">용수</Option>
            <Option value="경미재해">경미재해</Option>
          </Select>
          <div>
            <div>{`총 ${initList.length}건`}</div>
            <div className="alignRight">
              <StyledButton className="btn-primary" onClick={this.handleAddClick} style={{ 'margin-bottom': '5px' }}>
                항목 추가
              </StyledButton>
            </div>
            <Group>
              <AntdTable columns={this.columns} dataSource={initList.length ? initList : []} bordered></AntdTable>
            </Group>
            <Modal visible={modalVisible} closable onCancel={this.handleOnCancel} width={900} footer={null}>
              <div>{modalVisible && this.handleOnBuild(`modal${id}`, selectedTaskSeq, viewType)}</div>
            </Modal>
          </div>
        </Sketch>
      </StyledViewDesigner>
    );
  }
}

List.propTypes = {
  formData: PropTypes.object,
  sagaKey: PropTypes.string,
  workSeq: PropTypes.number,
  loadingComplete: PropTypes.func,
};

export default List;
