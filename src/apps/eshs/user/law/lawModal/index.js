import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Select, Input } from 'antd';

import request from 'utils/request';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
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
        url: 'http://eshs-dev.magnachip.com/api/eshs/v1/common/eshlawlist',
        method: 'GET',
      });
      return result.response.list;
    };
    return fetchData();
  };

  onLawSeach = (type, text) => {
    const fetchData = async () => {
      const result = await request({
        url: 'http://eshs-dev.magnachip.com/api/eshs/v1/common/eshlawlist',
        method: 'POST',
        params: { TYPE: type, TEXT: text },
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

  setColumn = onSelected => {
    const columns = [
      {
        title: '법규명',
        dataIndex: 'TITLE',
        key: 'TITLE',
        render: (key, rowdata) => <sapn onClick={() => onSelected(rowdata)}>{key}</sapn>,
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
    ];
    return columns;
  };

  render = () => {
    const { onCancel, onSelected } = this.props;
    const lawColumn = this.setColumn(onSelected);
    return (
      <>
        <h2>법규 검색</h2>
        <hr />
        <StyledSearchWrap>
          <div className="seach-group-layer">
            <span>검색구분 </span>
            <Select style={{ width: 120 }} onChange={e => this.onTypeChange(e.target.value)} defaultValue="TITLE">
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
        <AntdTable rowKey="TASK_SEQ" key="lawListModal" className="view-designer-list" columns={lawColumn} dataSource={this.state.data} />
        <StyledButton className="btn-primary" onClick={onCancel}>
          Close
        </StyledButton>
      </>
    );
  };
}

LawModal.propTypes = {
  onCancel: PropTypes.func,
  onSelected: PropTypes.func,
};

LawModal.defaultProps = {};

export default LawModal;
