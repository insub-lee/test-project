import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, message } from 'antd';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledInput from 'commonStyled/Form/StyledInput';

const AntdInput = StyledInput(Input);
const AntdLineTable = StyledLineTable(Table);

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
    this.setColumns();
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
    this.setState({ [name]: value }, this.setColumns);
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
    this.setState(
      {
        docGroupCd: '',
        docGroupNm: '',
        occurPart: '',
        hynixDocGroup: '',
        tableNm: '',
      },
      this.setColumns,
    );
  }

  setColumns() {
    const { docGroupCd, docGroupNm, occurPart, hynixDocGroup, tableNm } = this.state;
    const columns = [
      {
        title: '문서종류코드',
        align: 'center',
        children: [
          {
            title: (
              <AntdInput
                className="ant-input-sm"
                style={{ width: '200px' }}
                value={docGroupCd}
                onChange={e => this.onChangeValue('docGroupCd', e.target.value)}
              />
            ),
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
              <AntdInput
                className="ant-input-sm"
                style={{ width: '200px' }}
                value={docGroupNm}
                onChange={e => this.onChangeValue('docGroupNm', e.target.value)}
              />
            ),
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
              <AntdInput
                className="ant-input-sm"
                style={{ width: '200px' }}
                value={occurPart}
                onChange={e => this.onChangeValue('occurPart', e.target.value)}
              />
            ),
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
                className="ant-input-sm"
                style={{ width: '200px' }}
                value={hynixDocGroup}
                onChange={e => this.onChangeValue('hynixDocGroup', e.target.value)}
              />
            ),
            dataIndex: 'HYNIX_DOC_GROUP',
          },
        ],
      },
      {
        title: '테이블명',
        align: 'center',
        children: [
          {
            title: (
              <AntdInput className="ant-input-sm" style={{ width: '200px' }} value={tableNm} onChange={e => this.onChangeValue('tableNm', e.target.value)} />
            ),
            dataIndex: 'TABLE_NM',
          },
        ],
      },
    ];
    this.setState({ columns });
  }

  selectedRecord = record => {
    this.setState(
      {
        docGroupCd: record.DOC_GROUP_CD,
        docGroupNm: record.DOC_GROUP_NM,
        occurPart: record.OCCUR_PART,
        hynixDocGroup: record.HYNIX_DOC_GROUP,
        tableNm: record.TABLE_NM,
      },
      this.setColumns,
    );
  };

  render() {
    const { docList, columns } = this.state;
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <ContentsWrapper>
          <div className="selSaveWrapper alignLeft">
            <StyledButtonWrapper>
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
            </StyledButtonWrapper>
          </div>
          <AntdLineTable
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
        </ContentsWrapper>
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
