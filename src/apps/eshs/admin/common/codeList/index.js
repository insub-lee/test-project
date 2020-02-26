import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Table, Select, Input, message } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import Moment from 'moment';

import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

const { Option } = Select;

Moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeSelectValue: '',
      name: '',
      code: '',
      selectBoxData: [],
      listData: [],
      codeType: '',
      pullpath: '',
      nodeOrdinal: '',
      nodeId: '',
    };
  }

  componentDidMount() {
    this.selectDataApi();
  }

  changeSelectValue = value => {
    this.setState({ changeSelectValue: value, code: '', name: '' }, () => this.selectCode());
  };

  changeInputValue = value => {
    this.setState({ name: value });
  };

  changeCodeValue = value => {
    this.setState({ code: value });
  };

  callBackApi = () => {
    this.selectDataApi();
  };

  selectDataApi() {
    const { sagaKey: id, getCallDataHandler, MAP_ID } = this.props;
    const apiAry = [
      {
        key: 'apiData',
        url: `/api/admin/v1/common/categoryMapList?MAP_ID=${MAP_ID}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const { result, INIT_NODE_ID } = this.props;
    const { changeSelectValue } = this.state;
    const selectBoxData =
      result && result.apiData && result.apiData.categoryMapList.filter(x => x.PARENT_NODE_ID === INIT_NODE_ID && x.LVL === 2 && x.USE_YN === 'Y');
    const listData = result && result.apiData && result.apiData.categoryMapList.filter(x => x.PARENT_NODE_ID === changeSelectValue && x.LVL === 3);
    const pullpath = result && result.apiData && result.apiData.categoryMapList.find(x => x.NODE_ID === changeSelectValue);
    this.setState({ selectBoxData, listData, pullpath: pullpath && pullpath.FULLPATH, nodeOrdinal: pullpath && pullpath.NODE_ORDINAL });
    this.codeFomat(listData && listData[0]);
  };

  selectCode = () => {
    const { result } = this.props;
    const { changeSelectValue } = this.state;
    if (changeSelectValue) {
      const listData = result && result.apiData && result.apiData.categoryMapList.filter(x => x.PARENT_NODE_ID === changeSelectValue && x.LVL === 3);
      const pullpath = result && result.apiData && result.apiData.categoryMapList.find(x => x.NODE_ID === changeSelectValue);
      this.setState({ listData, pullpath: pullpath && pullpath.FULLPATH, nodeOrdinal: pullpath && pullpath.NODE_ORDINAL });
      this.codeFomat(listData && listData[0]);
      this.renderTable();
    } else {
      this.warning('코드 구분을 선택해주세요.');
    }
  };

  codeFomat = codeData => {
    let codeType = '';
    if (codeData && codeData.CODE.indexOf('00') === 0) {
      codeType = '00Format';
    } else if (codeData && codeData.CODE === codeData.NAME_KOR) {
      codeType = 'nameFormat';
    } else {
      codeType = 'selfTyping';
    }
    this.setState({
      codeType,
    });
  };

  warning = value => {
    message.warning(value);
  };

  insertOverlab = () => {
    const { codeType, listData, name } = this.state;
    if (codeType === 'selfTyping') {
      const overlab = listData && listData[0] && listData.find(item => item.CODE === this.state.code);
      if (overlab) {
        this.warning('기존에 동일한 코드가 존재합니다.');
      } else {
        this.onChangeData('I');
      }
    } else if (codeType === '00Format') {
      let max;
      if (listData && listData[0]) {
        max =
          listData.length > 1
            ? listData.reduce((prev, curr) => (Number(prev.CODE) > Number(curr.CODE) ? Number(prev.CODE) : Number(curr.CODE)))
            : Number(listData[0].CODE);
      }
      this.setState({ code: `00${String(max + 1)}` }, () => this.onChangeData('I'));
    } else if (codeType === 'nameFormat') {
      this.setState({ code: name }, () => this.onChangeData('I'));
    } else {
      this.warning('코드 구분을 선택해주세요.');
    }
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga, MAP_ID } = this.props;

    const submitData = {
      MAP_ID,
      PARENT_NODE_ID: this.state.changeSelectValue,
      LVL: 3,
      NODE_ORDINAL: this.state.nodeOrdinal,
      FULLPATH: this.state.pullpath,
      CODE: this.state.code,
      NAME_KOR: this.state.name,
      NAME_ENG: '',
      NAME_CHN: '',
      DESCIPTION: '',
      USE_YN: value === 'D' ? 'N' : 'Y',
      NODE_ID: value !== 'I' ? this.state.nodeId : '',
    };
    if (this.state.name && this.state.changeSelectValue) {
      if (value === 'U' && this.state.code) {
        submitHandlerBySaga(id, 'PUT', '/api/admin/v1/common/categoryMap', submitData, this.callBackApi);
      } else if (this.state.code && (value === 'D' || value === 'R')) {
        submitHandlerBySaga(id, 'PUT', '/api/admin/v1/common/categoryMap', submitData, this.callBackApi);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', '/api/admin/v1/common/categoryMap', submitData, this.callBackApi);
      } else if (!this.state.code) {
        this.warning('코드가 올바르지 않습니다.');
      }
    } else if (!this.state.changeSelectValue) {
      this.warning('코드 구분을 선택해주세요.');
    } else if (!this.state.name) {
      this.warning('코드명을 올바르게 입력하시오.');
    }

    this.onReset();
  };

  onReset() {
    this.setState({
      name: '',
      code: '',
    });
  }

  renderTable() {
    const { columns } = this.props;
    const { listData } = this.state;
    let renderList = [
      {
        USE_YN: (
          <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('R')}>
            삭제 취소
          </StyledButton>
        ),
        CODE: <Input readOnly={this.state.codeType !== 'selfTyping'} value={this.state.code} onChange={e => this.changeCodeValue(e.target.value)} />,
        NAME_KOR: (
          <>
            <Input style={{ width: '300px' }} value={this.state.name} onChange={e => this.changeInputValue(e.target.value)}></Input>
            <StyledButton className="btn-primary btn-first" onClick={() => this.insertOverlab()}>
              추가
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('U')}>
              수정
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('D')}>
              삭제
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onReset()}>
              Reset
            </StyledButton>
          </>
        ),
      },
    ];
    const listDataTemp =
      listData &&
      listData.map(item => ({
        ...item,
        USE_YN: item.USE_YN === 'Y' ? '사용중' : '삭제',
      }));

    renderList = [...renderList, ...(listDataTemp || [])];
    return (
      <AntdTable
        rowKey={renderList.NODE_ID}
        key={renderList.NODE_ID}
        columns={columns}
        dataSource={renderList}
        bordered
        onRow={record => ({
          onClick: () => {
            this.selectedRecord(record);
          },
        })}
        pagination={{ pageSize: 100 }}
        scroll={{ y: 800 }}
        footer={() => <div style={{ textAlign: 'center' }}>{`${renderList.length - 1} 건`}</div>}
      />
    );
  }

  selectedRecord = record => {
    if (record.PARENT_NODE_ID) {
      this.setState({
        changeSelectValue: record.PARENT_NODE_ID,
        name: record.NAME_KOR,
        code: record.CODE,
        nodeId: record.NODE_ID,
      });
    }
  };

  renderSelect = () => {
    const { selectBoxData } = this.state;
    return (
      <Col span={4}>
        <Select style={{ width: '200px' }} onChange={value => this.changeSelectValue(value)} defaultValue="0">
          <Option value="0" disabled>
            선택
          </Option>
          {selectBoxData && selectBoxData.map(itme => <Option value={itme.NODE_ID}>{itme.NAME_KOR}</Option>)}
        </Select>
      </Col>
    );
  };

  render() {
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <Row>
                {this.renderSelect()}
                <Col span={4}>
                  <StyledButton className="btn-primary btn-first" onClick={() => this.selectCode()}>
                    검색
                  </StyledButton>
                  <StyledButton className="btn-primary btn-first">엑셀받기</StyledButton>
                </Col>
              </Row>
              {this.renderTable()}
            </Group>
          </Sketch>
        </StyledViewDesigner>
      </div>
    );
  }
}

List.propTypes = {};

List.defaultProps = {
  getCallDataHandler: () => {},
  formData: {},
  columns: [
    {
      title: '상태',
      dataIndex: 'USE_YN',
      align: 'center',
      width: 150,
    },
    {
      title: '코드',
      dataIndex: 'CODE',
      align: 'center',
      width: 150,
    },
    {
      title: '코드명',
      dataIndex: 'NAME_KOR',
      align: 'left',
    },
  ],
};

export default List;
