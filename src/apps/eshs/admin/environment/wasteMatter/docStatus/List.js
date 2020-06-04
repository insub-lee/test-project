import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, message, Popconfirm } from 'antd';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

const AntdInput = StyledInput(Input);
const AntdTable = StyledAntdTable(Table);

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

  onChangeValue = (name, value) => {
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
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsDocGroup', submitData, this.succeedModify);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsDocGroup', submitData, this.succeedDelete);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsDocGroup', submitData, this.succeedInsert);
      }
    } else if (!docGroupCd) {
      message.warning('문서종류코드를 올바르게 입력하시오.');
    }
    this.onReset();
  };

  succeedInsert = (id, response) => {
    if (response.result === 1) {
      message.success('등록이 완료되었습니다.');
      this.initDataApi();
    } else {
      message.warning('서버의 문제가 발생했습니다.');
    }
  };

  succeedModify = (id, response) => {
    if (response.result === 1) {
      message.success('수정이 완료되었습니다.');
      this.initDataApi();
    } else {
      message.warning('서버의 문제가 발생했습니다.');
    }
  };

  succeedDelete = (id, response) => {
    if (response.result === 1) {
      message.success('삭제가 완료되었습니다.');
      this.initDataApi();
    } else {
      message.warning('서버의 문제가 발생했습니다.');
    }
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
    const { docList, docGroupCd, docGroupNm, occurPart, hynixDocGroup, tableNm } = this.state;
    const columns = [
      {
        title: '문서종류코드',
        align: 'center',
        children: [
          {
            title: (
              <AntdInput className="ant-input-xs" style={{ width: 80 }} value={docGroupCd} onChange={e => this.onChangeValue('docGroupCd', e.target.value)} />
            ),
            align: 'center',
            dataIndex: 'DOC_GROUP_CD',
          },
        ],
      },
      {
        title: '문서종류명',
        align: 'center',
        children: [
          {
            title: (
              <AntdInput className="ant-input-xs" style={{ width: 100 }} value={docGroupNm} onChange={e => this.onChangeValue('docGroupNm', e.target.value)} />
            ),
            align: 'center',
            dataIndex: 'DOC_GROUP_NM',
          },
        ],
      },
      {
        title: '발생업무명',
        align: 'center',
        children: [
          {
            title: (
              <AntdInput className="ant-input-xs" style={{ width: 80 }} value={occurPart} onChange={e => this.onChangeValue('occurPart', e.target.value)} />
            ),
            align: 'center',
            dataIndex: 'OCCUR_PART',
          },
        ],
      },
      {
        title: '문서분류번호',
        align: 'center',
        children: [
          {
            title: (
              <AntdInput
                className="ant-input-xs"
                style={{ width: 80 }}
                value={hynixDocGroup}
                onChange={e => this.onChangeValue('hynixDocGroup', e.target.value)}
              />
            ),
            align: 'center',
            dataIndex: 'HYNIX_DOC_GROUP',
          },
        ],
      },
      {
        title: '테이블명',
        align: 'center',
        children: [
          {
            title: <AntdInput className="ant-input-xs" style={{ width: 160 }} value={tableNm} onChange={e => this.onChangeValue('tableNm', e.target.value)} />,
            align: 'center',
            dataIndex: 'TABLE_NM',
          },
        ],
      },
    ];
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledContentsWrapper>
          <div className="selSaveWrapper alignLeft">
            <StyledButtonWrapper>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.insertOverlab()}>
                추가
              </StyledButton>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.onChangeData('U')}>
                수정
              </StyledButton>
              <Popconfirm title="삭제하시겠습니까?" onConfirm={() => this.onChangeData('D')} okText="Yes" cancelText="No">
                <StyledButton className="btn-light btn-first btn-sm">삭제</StyledButton>
              </Popconfirm>
              <StyledButton className="btn-primary btn-sm" onClick={() => this.onReset()}>
                Reset
              </StyledButton>
            </StyledButtonWrapper>
          </div>
          <AntdTable
            rowKey={docList && docList.WAREHOUSE_CD}
            columns={columns}
            dataSource={docList || []}
            onRow={record => ({
              onClick: () => {
                this.selectedRecord(record);
              },
            })}
            footer={() => <span>{`${(docList && docList.length) || 0} 건`}</span>}
          />
        </StyledContentsWrapper>
      </div>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
