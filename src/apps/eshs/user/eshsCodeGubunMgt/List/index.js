import React, { Component } from 'react';
import { Table, Column, AutoSizer } from 'react-virtualized';
import { Select, Input, message } from 'antd';
import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import { getCallDataHandler } from 'components/BizMicroDevBase/actions';
import { changeFormData } from 'components/BizBuilderBase/actions';
import ListSearchStyled from './ListSearchStyled';

const { Option } = Select;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      systemCodeList: [],
      codeList: [],
    };
  }

  componentDidMount = () => {
    const { id, getCallDataHandler, apiAry } = this.props;
    getCallDataHandler(id, apiAry, this.handleAppStart);
  };

  handleAppStart = () => {
    const { result, id, changeFormData, getCallDataHandler } = this.props;
    const systemCodeList = (result && result.systemCodeList && result.systemCodeList.systemCodeList) || [];

    if (systemCodeList.length) {
      this.setState({
        systemCodeList,
      });
      changeFormData(id, 'info', { system_cd: systemCodeList[0].system_cd, code_type: '0' });
      const apiAry = [
        {
          key: 'codeList',
          type: 'GET',
          url: `/api/eshs/v1/common/EshsCodeGubun/${systemCodeList[0].system_cd}`,
        },
      ];
      getCallDataHandler(id, apiAry, this.setList);
    }
  };

  setList = () => {
    const { result } = this.props;
    const codeList = (result && result.codeList && result.codeList.codeList) || [];
    this.setState({
      codeList,
    });
  };

  noRowsRenderer = () => <div className="noRows"> </div>;

  getColumns = () => [
    { label: '시스템코드', dataKey: 'system_cd', width: 150, ratio: 10 },
    { label: '구분', dataKey: 'gubun', width: 300, ratio: 20 },
    { label: '구분명', dataKey: 'gubun_nm', width: 375, ratio: 25 },
    { label: 'SEQ', dataKey: 'seq', width: 150, ratio: 10 },
    { label: '삭제', dataKey: 'is_readable_name', width: 150, ratio: 10 },
    { label: '코드타입', dataKey: 'code_type_option', width: 300, ratio: 25 },
  ];

  getTablewidth = () => {
    this.getColumns()
      .map(({ width }) => width)
      .reduce((a, b) => a + b);
  };

  handleCodeOnChange = e => {
    const { id, changeFormData, formData, getCallDataHandler } = this.props;
    const info = (formData && formData.info) || {};
    changeFormData(id, 'info', { system_cd: e, code_type: '0' });
    changeFormData(id, 'action', ' ');
    const apiAry = [
      {
        key: 'codeList',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsCodeGubun/${e}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.setList);
  };

  handleInputChange = e => {
    const { id, changeFormData, formData } = this.props;
    const info = (formData && formData.info) || {};
    changeFormData(id, 'info', { ...info, [e.target.name]: e.target.value });
  };

  handleCodeTypeChange = e => {
    const { id, formData, changeFormData } = this.props;
    const info = (formData && formData.info) || {};
    changeFormData(id, 'info', { ...info, code_type: e });
  };

  onRowClick = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'info', e.rowData);
    changeFormData(id, 'action', 'MODIFY');
  };

  handleInsertOnClick = () => {
    const { id, getCallDataHandler, formData, changeFormData } = this.props;
    const info = (formData && formData.info) || {};
    const apiAry = [
      {
        key: 'validationCheck',
        type: 'POST',
        url: '/api/eshs/v1/common/EshsCodeGubun/NULL',
        params: info,
      },
    ];
    changeFormData(id, 'action', 'INSERT');
    getCallDataHandler(id, apiAry, this.validationCheck);
  };

  validationCheck = sagaKey => {
    const { result, submitHandlerBySaga, formData } = this.props;
    const msg = (result && result.validationCheck && result.validationCheck.msg) || '';
    const waring = (result && result.validationCheck && result.validationCheck.waring) || '';

    if (msg) {
      message.warning(msg);
      return false;
    }
    const submitData = (formData && formData.info) || {};
    submitHandlerBySaga(sagaKey, 'PUT', '/api/eshs/v1/common/EshsCodeGubun/NULL', submitData, this.saveComplete);
  };

  saveComplete = () => {
    const { formData } = this.props;
    const system_cd = (formData && formData.info && formData.info.system_cd) || '';
    const action = (formData && formData.action) || '';
    const is_readable = (formData && formData.info && formData.info.is_readable) || '1';
    if (action === 'INSERT') message.success('등록되었습니다.');
    if (action === 'MODIFY') message.success('수정되었습니다');
    if (action === 'DELETE') {
      if (is_readable === '1') message.success('삭제되었습니다.');
      if (is_readable === '0') message.success('삭제가 취소되었습니다.');
    }
    this.handleCodeOnChange(system_cd);
  };

  handleEditOnClick = () => {
    // /api/eshs/v1/common/EshsCodeGubunUpdate

    const { id, submitHandlerBySaga, formData, changeFormData } = this.props;
    const submitData = (formData && formData.info) || {};
    changeFormData(id, 'action', 'MODIFY');
    submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/EshsCodeGubunUpdate', submitData, this.saveComplete);
  };

  handleDeleteOnClick = () => {
    const { id, submitHandlerBySaga, formData, changeFormData } = this.props;
    const submitData = (formData && formData.info) || {};
    const is_readable = (submitData && submitData.is_readable) || '0';
    const action = (formData && formData.action) || '';

    if (action !== 'MODIFY') return;

    changeFormData(id, 'action', 'DELETE');
    submitHandlerBySaga(
      id,
      'DELETE',
      '/api/eshs/v1/common/EshsCodeGubun/NULL',
      { ...submitData, is_readable: is_readable === '1' ? '0' : '1' },
      this.saveComplete,
    );
  };

  handleResetOnClick = () => {
    const { id, formData, changeFormData } = this.props;
    const info = (formData && formData.info) || {};
    const system_cd = (info && info.system_cd) || '';
    changeFormData(id, 'action', ' ');
    changeFormData(id, 'info', { system_cd });
  };

  render() {
    const { codeList, systemCodeList } = this.state;
    const { formData } = this.props;
    const info = (formData && formData.info) || {};
    const is_readable = (info && info.is_readable) || '1';
    const action = (formData && formData.action) || '';
    return (
      <>
        <ListSearchStyled>
          <div className="search-group-layer">
            <table>
              <tbody>
                <tr>
                  <td>시스템코드</td>
                  <td colSpan={3}>
                    <Select className="search-item input-width120" value={info.system_cd || ''} onChange={this.handleCodeOnChange} style={{ width: 150 }}>
                      {systemCodeList.map(s => (
                        <Option key={s.system_cd} style={{ height: 30 }}>
                          {s.system_cd}
                        </Option>
                      ))}
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>구분코드</td>
                  <td>
                    <Input placeholder="구분코드" name="gubun" value={info.gubun} onChange={this.handleInputChange} readOnly={action === 'MODIFY'} />
                  </td>
                  <td>구분명</td>
                  <td>
                    <Input placeholder="구분명" name="gubun_nm" value={info.gubun_nm} onChange={this.handleInputChange} />
                  </td>
                </tr>
                <tr>
                  <td>SEQ</td>
                  <td>
                    <Input placeholder="SEQ" name="seq" value={info.seq} onChange={this.handleInputChange} />
                  </td>
                  <td>코드 타입</td>
                  <td>
                    <Select className="search-item input-width120" value={info.code_type || '0'} onChange={this.handleCodeTypeChange} style={{ width: 150 }}>
                      <Option key="0" style={{ height: 30 }}>
                        001, 002, 003..
                      </Option>
                      <Option key="1" style={{ height: 30 }}>
                        1, 2, 3..
                      </Option>
                      <Option key="2" style={{ height: 30 }}>
                        구분코드 = 구분명
                      </Option>
                      <Option key="3" style={{ height: 30 }}>
                        직접입력
                      </Option>
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <StyledButton classNmae="btn-gray btn-first" onClick={this.handleInsertOnClick}>
                등록
              </StyledButton>
              <StyledButton onClick={this.handleEditOnClick}>수정</StyledButton>
              <StyledButton onClick={this.handleDeleteOnClick}>{is_readable === '1' ? '삭제' : '삭제취소'}</StyledButton>
              <StyledButton onClick={this.handleResetOnClick}>Reset</StyledButton>
            </div>
          </div>
        </ListSearchStyled>
        <StyledVirtualizedTable>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                width={width}
                height={500}
                headerHeight={40}
                rowHeight={53}
                rowCount={codeList.length}
                rowGetter={({ index }) => codeList[index]}
                noRowsRenderer={this.noRowsRenderer}
                onRowClick={this.onRowClick}
              >
                {this.getColumns().map(({ label, dataKey, ratio }) => (
                  <Column key={dataKey} label={label} dataKey={dataKey} width={(width / 100) * ratio} />
                ))}
              </Table>
            )}
          </AutoSizer>
        </StyledVirtualizedTable>
      </>
    );
  }
}

List.defaultProps = {
  id: 'EshsCodeGubun',
  getCallDataHandler: () => {},
  result: {},
  apiAry: [
    {
      key: 'systemCodeList',
      type: 'GET',
      url: '/api/eshs/v1/common/EshsCodeGubunDistinctSystemCode',
    },
  ],
};

export default List;
