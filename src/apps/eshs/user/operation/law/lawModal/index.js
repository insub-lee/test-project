import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Select, Input } from 'antd';

import request from 'utils/request';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';

const AntdTable = StyledAntdTable(Table);
const { Option } = Select;
class LawModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      type: '',
      text: '',
    };
  }

  componentDidMount() {
    this.callList().then(res => this.initData(res));
  }

  callList = () => {
    const fetchData = async () => {
      const result = await request({
        url: 'http://eshs-dev.magnachip.com/api/eshs/v1/common/eshslawlist',
        method: 'GET',
      });
      return result.response.list;
    };
    return fetchData();
  };

  onLawSeach = (type, text) => {
    const fetchData = async () => {
      const result = await request({
        url: `http://eshs-dev.magnachip.com/api/eshs/v1/common/eshslawlist?TYPE=${type}&TEXT=${text}`,
        method: 'GET',
      });
      return result.response.list;
    };
    return fetchData();
  };

  initData = list => {
    this.setState({
      data: list.filter(f => f.STATUS === '사용중'),
    });
  };

  onTypeChange = value => {
    this.setState({
      type: value,
    });
  };

  onTextChange = value => {
    this.setState({
      text: value,
    });
  };

  render = () => {
    const { onCancel, onSelected, sagaKey: id, lawColumns } = this.props;
    return (
      <StyledViewDesigner>
        <Sketch>
          <Group>
            <h2>법규 검색</h2>
            <hr />
            <StyledSearchWrap>
              <div className="seach-group-layer">
                <span>검색구분 </span>
                <Select style={{ width: 120 }} onChange={this.onTypeChange} defaultValue="TITLE">
                  <Option value="TITLE">법규명</Option>
                  <Option value="RECH_NO">관리번호</Option>
                  <Option value="REG_USER_NAME">작성자</Option>
                  <Option value="REG_USER_DEPT">작성부서</Option>
                </Select>
                <span> 검색어 </span>
                <Input style={{ width: 200 }} onChange={e => this.onTextChange(e.target.value)} value={this.state.text} />
                <StyledButton className="btn-primary" onClick={() => this.onLawSeach(this.state.type, this.state.text).then(res => this.initData(res))}>
                  Search
                </StyledButton>
              </div>
            </StyledSearchWrap>
            <hr />
            <AntdTable
              onRow={record => ({
                onClick: () => {
                  onSelected(record);
                },
              })}
              rowKey="TASK_SEQ"
              key={id}
              className="view-designer-list"
              columns={lawColumns}
              dataSource={this.state.data}
            />
            <StyledButton className="btn-primary" onClick={onCancel}>
              Close
            </StyledButton>
          </Group>
        </Sketch>
      </StyledViewDesigner>
    );
  };
}

LawModal.propTypes = {
  sagaKey: PropTypes.string,
  onCancel: PropTypes.func,
  onSelected: PropTypes.func,
  lawColumns: PropTypes.array,
};

LawModal.defaultProps = {
  lawColumns: [
    {
      title: '법규명',
      dataIndex: 'TITLE',
      key: 'TITLE',
    },
    {
      title: '관리번호',
      dataIndex: 'RECH_NO',
      key: 'RECH_NO',
    },
    {
      title: '종류',
      dataIndex: 'RECH_TYPE1',
      key: 'RECH_TYPE1',
    },
    {
      title: '작성부서',
      dataIndex: 'REG_USER_DEPT',
      key: 'REG_USER_DEPT',
    },
    {
      title: '작성자',
      dataIndex: 'REG_USER_NAME',
      key: 'REG_USER_NAME',
    },
  ],
};

export default LawModal;
