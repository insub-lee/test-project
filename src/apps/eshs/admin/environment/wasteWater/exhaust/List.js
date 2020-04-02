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
      exhuastNm: '',
      exhuastCd: '',
    };
  }

  componentDidMount() {
    this.listDataApi();
    this.setColumns();
  }

  changeInputValue = value => {
    this.setState({ exhuastNm: value });
  };

  callBackApi = () => {
    this.listDataApi();
  };

  listDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'eshsexhaust',
        url: '/api/eshs/v1/common/eshsexhaust',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry);
    this.renderTable();
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;

    const submitData = {
      PARAM: { EXHAUST_CD: this.state.exhuastCd, EXHAUST_NM: this.state.exhuastNm },
    };
    if (this.state.exhuastNm) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsexhaust', submitData, this.callBackApi);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsexhaust', submitData, this.callBackApi);
      } else {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsexhaust', submitData, this.callBackApi);
      }
    } else {
      message.warning('배출시설명을 올바르게 입력하시오.');
    }

    this.onCancel();
  };

  onCancel() {
    this.setState({
      exhuastNm: '',
      exhuastCd: '',
    });
  }

  selectedRecord = record => {
    if (typeof record.EXHAUST_NM === 'string') {
      this.setState({
        exhuastNm: record.EXHAUST_NM,
        exhuastCd: record.EXHAUST_CD,
      });
    }
  };

  setColumns = () => {
    const { exhuastNm, exhuastCd } = this.state;
    const columns = [
      {
        title: (
          <>
            <span className="th-label">상태</span>
            <div className="td-input-wrapper">
              <span className="span-item">{exhuastCd}</span>
            </div>
          </>
        ),
        dataIndex: 'EXHAUST_CD',
        align: 'center',
        width: 150,
        render: item => <span>{item === 'Y' ? '사용중' : '삭제'}</span>,
      },
      {
        title: (
          <>
            <span className="th-label">코드</span>
            <div className="td-input-wrapper">
              <AntdInput style={{ width: '300px' }} value={exhuastNm} onChange={e => this.changeInputValue(e.target.value)} />
            </div>
          </>
        ),
        dataIndex: 'EXHAUST_NM',
        align: 'left',
      },
    ];
    this.setState({ columns });
  };

  render() {
    const { columns } = this.state;
    const {
      result: { renderList },
    } = this.props;
    return (
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <StyledButtonWrapper>
            <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.onChangeData('I')}>
              추가
            </StyledButton>
            <StyledButton className="btn-primary btn-first btn-light btn-sm" onClick={() => this.onChangeData('U')}>
              수정
            </StyledButton>
            <StyledButton className="btn-primary btn-first btn-light btn-sm" onClick={() => this.onChangeData('D')}>
              삭제
            </StyledButton>
            <StyledButton className="btn-primary btn-first btn-light btn-sm" onClick={() => this.onCancel()}>
              Reset
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <AntdLineTable
          rowKey={renderList && renderList.EXHAUST_CD}
          columns={columns}
          dataSource={renderList || []}
          onRow={record => ({
            onClick: () => {
              this.selectedRecord(record);
            },
          })}
          footer={() => <div style={{ textAlign: 'center' }}>{`${renderList && renderList.length} 건`}</div>}
        />
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
