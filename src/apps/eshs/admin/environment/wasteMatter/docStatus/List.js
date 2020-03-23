import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Table, Input, message } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import Moment from 'moment';

import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

Moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docGroupCd: '',
      docGroupNm: '',
      occurPart: '',
      hynixDocGroup: '',
      tableNm: '',
      docList: [],
    };
  }

  componentDidMount() {
    this.initDataApi();
  }

  initDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'docList',
        url: '/api/eshs/v1/common/eshsDocGroup',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  };

  initData = () => {
    const { result } = this.props;
    this.setState({ docList: result && result.docList && result.docList.list });
  };

  changeInputValue = (name, value) => {
    this.setState({ [name]: value });
  };

  insertOverlab = () => {
    const { docList, docGroupCd } = this.state;
    const overlab = docList.find(item => item.DOC_GROUP_CD === docGroupCd);
    if (overlab) {
      message.warning('중복된 문서종류코드가 존재합니다.');
    } else {
      this.onChangeData('I');
    }
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { docGroupCd, docGroupNm, occurPart, hynixDocGroup, tableNm } = this.state;
    const submitData = {
      DOC_GROUP_CD: docGroupCd,
      DOC_GROUP_NM: docGroupNm,
      OCCUR_PART: occurPart,
      HYNIX_DOC_GROUP: hynixDocGroup,
      TABLE_NM: tableNm,
    };
    if (docGroupCd) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsDocGroup', submitData, this.initDataApi);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsDocGroup', submitData, this.initDataApi);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsDocGroup', submitData, this.initDataApi);
      }
    } else if (!docGroupCd) {
      message.warning('문서종류코드를 올바르게 입력하시오.');
    }
    this.onReset();
  };

  onReset() {
    this.setState({
      docGroupCd: '',
      docGroupNm: '',
      occurPart: '',
      hynixDocGroup: '',
      tableNm: '',
    });
  }

  renderTable() {
    const { docList } = this.state;
    const columns = [
      {
        title: (
          <>
            <span>문서종류코드</span>
            <br />
            <Input style={{ width: '200px' }} value={this.state.docGroupCd} onChange={e => this.changeInputValue('docGroupCd', e.target.value)} />
          </>
        ),
        dataIndex: 'DOC_GROUP_CD',
        align: 'center',
      },
      {
        title: (
          <>
            <span>문서종류명</span>
            <br />
            <Input style={{ width: '200px' }} value={this.state.docGroupNm} onChange={e => this.changeInputValue('docGroupNm', e.target.value)} />
          </>
        ),
        dataIndex: 'DOC_GROUP_NM',
        align: 'center',
      },
      {
        title: (
          <>
            <span>발생업무명</span>
            <br />
            <Input style={{ width: '200px' }} value={this.state.occurPart} onChange={e => this.changeInputValue('occurPart', e.target.value)} />
          </>
        ),
        dataIndex: 'OCCUR_PART',
        align: 'center',
      },
      {
        title: (
          <>
            <span>문서분류번호</span>
            <br />
            <Input style={{ width: '200px' }} value={this.state.hynixDocGroup} onChange={e => this.changeInputValue('hynixDocGroup', e.target.value)} />
          </>
        ),
        dataIndex: 'HYNIX_DOC_GROUP',
        align: 'center',
      },
      {
        title: (
          <>
            <span>테이블명</span>
            <br />
            <Input style={{ width: '200px' }} value={this.state.tableNm} onChange={e => this.changeInputValue('tableNm', e.target.value)} />
          </>
        ),
        dataIndex: 'TABLE_NM',
        align: 'center',
      },
    ];

    return (
      <AntdTable
        style={{ cursor: 'pointer' }}
        rowKey={docList && docList.WAREHOUSE_CD}
        columns={columns}
        dataSource={docList || []}
        bordered
        onRow={record => ({
          onClick: () => {
            this.selectedRecord(record);
          },
        })}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 600 }}
        footer={() => <div style={{ textAlign: 'center' }}>{`${(docList && docList.length) || 0} 건`}</div>}
      />
    );
  }

  selectedRecord = record => {
    this.setState({
      docGroupCd: record.DOC_GROUP_CD,
      docGroupNm: record.DOC_GROUP_NM,
      occurPart: record.OCCUR_PART,
      hynixDocGroup: record.HYNIX_DOC_GROUP,
      tableNm: record.TABLE_NM,
    });
  };

  render() {
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <Row>
                <Col span={12}>
                  <div style={{ float: 'left' }}>
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
                  </div>
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
};

export default List;
