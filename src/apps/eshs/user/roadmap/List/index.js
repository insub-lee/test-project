import React, { Component } from 'react';
import { Table, Select, Input, Popover } from 'antd';
import PropTypes from 'prop-types';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';
import moment from 'moment';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import Group from 'components/BizBuilder/Sketch/Group';
import request from 'utils/request';

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
      currentYear: moment().format('YYYY'),
      C1: '',
      H3: '',
    };
  }

  componentDidMount() {
    this.appInit();
  }

  appInit = async () => {
    const result = await {
      method: 'GET',
      url: '',
    };
    return result.response;
  };

  columns = [
    // moment().unix() = 현재 시간 타임스탬프
    { title: '항목', dataIndex: 'title', key: moment().unix() },
    { title: '연도', dataIndex: 'year', key: moment().unix() },
    { title: '월', dataIndex: 'month', key: moment().unix() },
    {
      title: '지역',
      children: [
        {
          title: '청주',
          dataIndex: 'C1',
          width: 250,
          key: moment().unix(),
        },
        {
          title: '구미',
          dataIndex: 'H3',
          width: 250,
          key: moment().unix(),
        },
      ],
    },
    { title: '입력여부', dataIndex: 'isConfirm', key: moment().unix() },
    { title: '작성자', dataIndex: 'empName', width: 200, key: moment().unix() },
  ];

  handleAddClick = () => {
    const { initList, isWrite, currentYear } = this.state;
    if (isWrite) {
      return;
    }

    const inputDataForm = {
      title: this.state.selectedCategory,
      year: currentYear,
      month: initList.length + 1,
      C1: <Input placeholder="청주" width="100px" name="C1" onChange={this.handleInputChange} />,
      H3: <Input placeholder="구미" width="100px" name="H3" onChange={this.handleInputChange} />,
      isConfirm: (
        <div>
          <StyledButton className="btn-primary" onClick={this.handleInputClick}>
            추가
          </StyledButton>
          <StyledButton className="btn-primary" onClick={this.handleDeleteClick}>
            삭제
          </StyledButton>
        </div>
      ),
      empName: <div>{this.props.formData.REG_USER_NAME}</div>,
    };

    // 추가 버튼 누르면 월 + 1, 12월이면 연도 + 1
    this.setState({
      initList: [...initList, inputDataForm],
      isWrite: true,
      C1: '',
      H3: '',
    });
  };

  handleSelectChange = e => {
    // 바뀌면 api 호출하기
    this.setState({
      isWrite: false,
      selectedCategory: e,
    });
  };

  handleInputChange = e => {
    switch (e.target.name) {
      case 'C1':
        this.setState({
          C1: e.target.value,
        });
        break;
      case 'H3':
        this.setState({
          H3: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  handleInputClick = () => {
    const { initList, isWrite, currentYear, selectedCategory, C1, H3 } = this.state;
    const { sagaKey, saveTask, workSeq } = this.props;
    if (!isWrite) {
      return;
    }

    if (!C1.length || !H3.length) {
      alert('값을 입력하십시오. 수정해야 함');
      return;
    }

    const inputData = {
      workSeq,
      sagaKey,
      title: selectedCategory, // 문자형 라벨
      year: currentYear, // 날짜형 라벨
      month: initList.length,
      C1,
      H3,
      isConfirm: (
        <div>
          <StyledButton className="btn-primary">완료</StyledButton>
          <StyledButton className="btn-primary">수정</StyledButton>
        </div>
      ),
      empName: this.props.formData.REG_USER_NAME,
    };

    if (initList.length === 1) {
      // 빈 배열에서 첫 추가버튼 누를 때
      this.setState({
        initList: [inputData],
        isWrite: false,
      });
      saveTask(sagaKey);
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
    const { initList } = this.state;
    console.debug(this.props);
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
          </div>
        </Sketch>
      </StyledViewDesigner>
    );
  }
}

List.propTypes = {
  formData: PropTypes.object,
  sagaKey: PropTypes.string,
  saveTask: PropTypes.func,
  workSeq: PropTypes.number,
};

export default List;
