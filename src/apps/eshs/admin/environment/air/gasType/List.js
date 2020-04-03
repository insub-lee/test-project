import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Modal, Input, InputNumber, message } from 'antd';

import StyledButton from 'commonStyled/Buttons/StyledButton';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';

import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import UnitType from 'components/BizBuilder/Field/UnitComp';

const AntdModal = StyledContentsModal(Modal);
const AntdLineTable = StyledLineTable(Table);

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
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsgastype', submitData, this.onResponse);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsgastype', submitData, this.onResponse);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsgastype', submitData, this.onResponse);
      }
    } else {
      message.warning('가스종류명 올바르게 입력하시오.');
    }
  };

  onResponse = (id, response) => {
    if (response.result !== 1) {
      message.warning('폐이지에 오류가 있습니다.');
    } else {
      this.onModalChange();
      this.listDataApi();
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
            <StyledButton className="btn-primary" onClick={this.onModalChange}>
              추가
            </StyledButton>
          </div>
          <AntdLineTable
            className="tableWrapper"
            rowKey={dataSource && dataSource.GAS_CD}
            columns={columns}
            dataSource={dataSource || []}
            bordered
            onRow={record => ({
              onClick: () => {
                this.selectedRecord(record);
              },
            })}
            footer={() => <span>{`${dataSource && dataSource.length} 건`}</span>}
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
                    <Input
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
                    <InputNumber
                      style={{ width: '100%' }}
                      value={formData && formData.GAS_WEIGHT}
                      onChange={value => this.onChangeValue('GAS_WEIGHT', value)}
                      name="gasWeight"
                    />
                    <span> 숫자만 입력해주세요.</span>
                  </td>
                </tr>
                <tr>
                  <th>법적허용농도</th>
                  <td>
                    <InputNumber
                      style={{ width: '100%' }}
                      value={formData && formData.PERMISSION_DENSITY}
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
            <StyledButtonWrapper className="btn-wrap-center">
              {!formData.GAS_CD ? (
                <StyledButton className="btn-primary btn-first" onClick={this.overlab}>
                  저장
                </StyledButton>
              ) : (
                <>
                  <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('U')}>
                    수정
                  </StyledButton>
                  <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('D')}>
                    삭제
                  </StyledButton>
                </>
              )}
              <StyledButton className="btn-primary" onClick={this.onModalChange}>
                취소
              </StyledButton>
            </StyledButtonWrapper>
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
      dataIndex: 'PERMISSION_DENSITY',
      align: 'right',
    },
    {
      title: '법적허용 농도(PPM)',
      dataIndex: 'GAS_WEIGHT',
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
