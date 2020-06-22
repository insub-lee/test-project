import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Modal, Input, InputNumber, message, Popconfirm } from 'antd';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import UnitType from 'components/BizBuilder/Field/UnitComp';

const AntdModal = StyledContentsModal(Modal);
const AntdTable = StyledAntdTable(Table);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdInput = StyledInput(Input);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalEdit: false,
    };
  }

  componentDidMount() {
    this.listDataApi();
  }

  listDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'gasType',
        url: '/api/eshs/v1/common/eshsgastype',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry);
  };

  selectedRecord = record => {
    const { setFormData, sagaKey: id } = this.props;
    this.onModalChange();
    setFormData(id, record);
  };

  onChangeValue = (compField, value) => {
    const { changeFormData, sagaKey: id } = this.props;
    changeFormData(id, compField, value);
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga, formData } = this.props;
    const submitData = {
      PARAM: {
        ...formData,
      },
    };
    if (formData.GAS_NM) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsgastype', submitData, this.modifyCallback);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsgastype', submitData, this.deleteCallback);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsgastype', submitData, this.insertCallback);
      }
    } else {
      message.warning('가스종류명 올바르게 입력하시오.');
    }
  };

  insertCallback = (id, response) => {
    if (response.result === 1) {
      message.success('등록이 완료되었습니다.');
      this.onModalChange();
      this.listDataApi();
    } else {
      message.warning('서버의 문제가 발생했습니다.');
    }
  };

  modifyCallback = (id, response) => {
    if (response.result === 1) {
      message.success('수정이 완료되었습니다.');
      this.onModalChange();
      this.listDataApi();
    } else {
      message.warning('서버의 문제가 발생했습니다.');
    }
  };

  deleteCallback = (id, response) => {
    if (response.result === 1) {
      message.success('삭제가 완료되었습니다.');
      this.onModalChange();
      this.listDataApi();
    } else {
      message.warning('서버의 문제가 발생했습니다.');
    }
  };

  onModalChange = () => {
    const { modalEdit } = this.state;
    this.setState({
      modalEdit: !modalEdit,
    });
  };

  onReset = () => {
    const { sagaKey: id, setFormData } = this.props;
    setFormData(id, {});
  };

  overlab = () => {
    const { result, formData } = this.props;
    const overlab = result && result.gasType && result.gasType.list && result.gasType.list.findIndex(item => item.GAS_CD === formData.GAS_NM);
    if (overlab !== -1) {
      message.warning('중복된 가스종류가 있습니다.');
    } else {
      this.onChangeData('I');
    }
  };

  render() {
    const {
      sagaKey: id,
      formData,
      changeFormData,
      columns,
      result: { gasType },
    } = this.props;
    const dataSource = gasType && gasType.list;
    return (
      <>
        <ContentsWrapper>
          <div className="selSaveWrapper">
            <StyledButton className="btn-primary btn-sm" onClick={this.onModalChange}>
              추가
            </StyledButton>
          </div>
          <AntdTable
            rowKey={dataSource && dataSource.GAS_CD}
            columns={columns}
            dataSource={dataSource || []}
            bordered
            onRow={record => ({
              onClick: () => {
                this.selectedRecord(record);
              },
            })}
            footer={() => <span>{`${(dataSource && dataSource.length) || 0} 건`}</span>}
          />
        </ContentsWrapper>
        <AntdModal
          className="modal-table-pad"
          title="가스종류 등록"
          visible={this.state.modalEdit}
          width={600}
          onCancel={this.onModalChange}
          destroyOnClose
          afterClose={this.onReset}
          footer={null}
        >
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="20%"></col>
                <col width="80%"></col>
              </colgroup>
              <tbody>
                {formData.GAS_CD ? (
                  <tr>
                    <th>가스종류코드</th>
                    <td>{formData.GAS_CD}</td>
                  </tr>
                ) : (
                  ''
                )}
                <tr>
                  <th>가스종류명</th>
                  <td>
                    <AntdInput
                      className="ant-input-sm"
                      style={{ width: '100%' }}
                      defaultValue={formData && formData.GAS_NM}
                      onChange={e => this.onChangeValue('GAS_NM', e.target.value)}
                      name="gasNm"
                    />
                  </td>
                </tr>
                <tr>
                  <th>가스분자량</th>
                  <td>
                    <AntdInputNumber
                      className="ant-input-number-sm"
                      style={{ width: '100%' }}
                      value={formData && formData.GAS_WEIGHT}
                      max={100}
                      onChange={value => this.onChangeValue('GAS_WEIGHT', value)}
                      name="gasWeight"
                    />
                    <span> 숫자만 입력해주세요.</span>
                  </td>
                </tr>
                <tr>
                  <th>법적허용농도</th>
                  <td>
                    <AntdInputNumber
                      className="ant-input-number-sm"
                      style={{ width: '100%' }}
                      value={formData && formData.PERMISSION_DENSITY}
                      max={1000}
                      onChange={value => this.onChangeValue('PERMISSION_DENSITY', value)}
                      name="permissionDensity"
                    />
                    <span> 숫자만 입력해주세요.</span>
                  </td>
                </tr>
                <tr>
                  <th>단위</th>
                  <td>
                    <UnitType sagaKey={id} colData={formData && formData.UNIT} changeFormData={changeFormData} COMP_FIELD="UNIT" visible />
                  </td>
                </tr>
              </tbody>
            </table>
            <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
              <StyledButton className="btn-primary mr5 btn-sm" onClick={!formData.GAS_CD ? this.overlab : () => this.onChangeData('U')}>
                저장
              </StyledButton>
              <StyledButton className="btn-light btn-sm" onClick={this.onModalChange}>
                취소
              </StyledButton>
            </StyledButtonWrapper>
            {!formData.GAS_CD ? (
              ''
            ) : (
              <StyledButtonWrapper className="btn-wrap-ab-right">
                <Popconfirm title="삭제하시겠습니까?" onConfirm={() => this.onChangeData('D')} okText="Yes" cancelText="No">
                  <StyledButton className="btn-gray mr5 btn-sm">삭제</StyledButton>
                </Popconfirm>
              </StyledButtonWrapper>
            )}
          </StyledHtmlTable>
        </AntdModal>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  columns: PropTypes.array,
  result: PropTypes.any,
  formData: PropTypes.any,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  changeFormData: PropTypes.func,
  setFormData: PropTypes.func,
};

List.defaultProps = {
  getCallDataHandler: () => {},
  columns: [
    {
      title: '가스종류명',
      dataIndex: 'GAS_NM',
      align: 'center',
    },
    {
      title: '가스분자량',
      dataIndex: 'GAS_WEIGHT',
      align: 'right',
    },
    {
      title: '법적허용 농도(PPM)',
      dataIndex: 'PERMISSION_DENSITY',
      align: 'center',
    },
    {
      title: '단위',
      dataIndex: 'UNIT',
      align: 'left',
    },
  ],
};

export default List;
