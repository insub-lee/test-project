import React from 'react';
import PropTypes from 'prop-types';
import { Select, Table, Input } from 'antd';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

const { Option } = Select;
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCode: '',
      columns: [
        {
          title: '상태',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          width: 200,
        },
        {
          title: '코드',
          dataIndex: 'code',
          key: 'code',
          align: 'center',
          width: 200,
        },
        {
          title: '코드명',
          dataIndex: 'name_kor',
          key: 'name_kor',
        },
      ],
      dataSource: [
        // {
        //   key: 0,
        //   status: '',
        //   code: '',
        //   name_kor: (
        //     <div>
        //       <Input
        //         placeholder="코드명을 입력하세요."
        //         style={{ width: 300 }}
        //         // value={this.state.inputCode}
        //         onChange={e => this.setState({ inputCode: e.target.value })}
        //       />
        //       <StyledButton className="btn-primary" onClick={this.handleAddClick}>
        //         추가
        //       </StyledButton>
        //       <StyledButton className="btn-primary" onClick={this.handleModifyClick}>
        //         수정
        //       </StyledButton>
        //       <StyledButton className="btn-primary" onClick={this.handleDeleteClick}>
        //         삭제
        //       </StyledButton>
        //       <StyledButton className="btn-primary" onClick={() => this.setState({ inputCode: '' })}>
        //         Reset
        //       </StyledButton>
        //     </div>
        //   ),
        // },
      ],
    };
  }

  componentDidMount() {
    const { inputCode } = this.state;
    const inputRow = {
      key: 0,
      status: '',
      code: '',
      name_kor: (
        <div>
          <Input placeholder="코드명을 입력하세요." style={{ width: 300 }} value={inputCode} onChange={this.handleInputChange} />
          <StyledButton className="btn-primary" onClick={this.handleAddClick}>
            추가
          </StyledButton>
          <StyledButton className="btn-primary" onClick={this.handleModifyClick}>
            수정
          </StyledButton>
          <StyledButton className="btn-primary" onClick={this.handleDeleteClick}>
            삭제
          </StyledButton>
          <StyledButton className="btn-primary" onClick={() => this.setState({ inputCode: '' })}>
            Reset
          </StyledButton>
        </div>
      ),
    };

    this.setState(prevState => ({
      dataSource: prevState.dataSource.concat(inputRow),
    }));
  }

  handleInputChange = e => {
    this.setState({
      inputCode: e.target.value,
    });
  };

  handleAddClick = () => {
    const { inputCode } = this.state;
    const data = {
      status: '사용',
      code: 'EX_0001',
      name_kor: inputCode,
    };
    this.setState(prevState => ({
      dataSource: [...prevState.dataSource, data],
      inputCode: '',
    }));
  };

  handleModifyClick = () => console.debug('@@@MODIFY');

  handleDeleteClick = () => console.debug('@@@DELETE');

  render() {
    const { columns, dataSource } = this.state;
    return (
      <StyledViewDesigner>
        <Sketch>
          <Select defaultValue="DMMG" style={{ width: 200, marginBottom: 10 }}>
            {/**
                DMMG: Dangerous Material Management
                WEHF: Workplace Environment Harmful Factor
                MGHM: Managed Harmful Material
                SHHF: Special Health diagnosis Harmful Factor
            */}
            <Option value="DMMG">위험물 관리</Option>
            <Option value="WEHF">작업환경측정 대상 유해인자</Option>
            <Option value="MGHM">관리대상 유해물질</Option>
            <Option value="SHHF">특수건강진단 대상 유해인자</Option>
          </Select>
          {/* {this.inputRow()} */}
          <Table columns={columns} dataSource={dataSource} bordered pagination={false} />
        </Sketch>
      </StyledViewDesigner>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
};

List.defaultProps = {
  sagaKey: '',
};

export default List;
