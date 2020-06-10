import * as PropTypes from 'prop-types';
import React from 'react';
import { Modal, Table, message, Input, TreeSelect, Select } from 'antd';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

const AntdTable = StyledAntdTable(Table);
const AntdTextarea = StyledTextarea(Input.TextArea);
const AntdInput = StyledInput(Input);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledModal(Modal);

class DangerHazardSubComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  componentDidMount() {}

  onChangeModal = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  };

  modalInsert = () => {
    message.info('개발 중입니다.');
  };

  render() {
    const {
      columns,
      extraApiData: { hazard },
      formData,
    } = this.props;
    return (
      <>
        <StyledButtonWrapper className="btn-wrap-inline">
          <StyledButton className="btn-primary btn-first btn-sm" onClick={this.onChangeModal}>
            추가
          </StyledButton>
          <StyledButton className="btn-primary btn-first btn-sm" onClick={() => message.info('개발 중입니다.')}>
            삭제
          </StyledButton>
        </StyledButtonWrapper>

        <AntdTable
          rowKey="TASK_SEQ"
          columns={columns}
          dataSource={hazard.list || []}
          onRow={record => ({
            onClick: () => {
              this.modalSelected(record);
            },
          })}
        />
        <AntdModal title="위험요인 LIST" visible={this.state.modal} width={800} onCancel={this.handleModalVisible} footer={[]}>
          <StyledHtmlTable>
            <table>
              <tbody>
                <tr>
                  <td>분류</td>
                  <td>
                    <AntdTreeSelect
                      style={{ width: '300px' }}
                      className="mr5 select-sm"
                      // value={formData.SELECED_TREE}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      // treeData={treeData || []}
                      placeholder="Please select"
                      onChange={value => this.onChangeSelect(value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>위험요인</td>
                  <td>
                    <AntdTextarea />
                  </td>
                </tr>
                <tr>
                  <td>사고의 발생원인</td>
                  <td></td>
                </tr>
                <tr>
                  <td>사고의 발생유형</td>
                  <td>
                    <AntdSelect
                      className="select-sm mr5"
                      style={{ width: '100px' }}
                      // value={formData.DE_TYPE}
                      onChange={value => this.onChange('DE_TYPE', value)}
                    ></AntdSelect>
                    {formData.DE_TYPE === 30450 ? <AntdInput /> : ''}
                  </td>
                </tr>
              </tbody>
            </table>
            <StyledButtonWrapper className="btn-wrap-center">
              <StyledButton className="btn-primary btn-first btn-sm" onClick={this.modalInsert}>
                저장
              </StyledButton>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={this.onChangeModal}>
                취소
              </StyledButton>
            </StyledButtonWrapper>
          </StyledHtmlTable>
        </AntdModal>
      </>
    );
  }
}

DangerHazardSubComp.propTypes = {
  columns: PropTypes.array,
  extraApiData: PropTypes.object,
};
DangerHazardSubComp.defaultProps = {
  columns: [
    {
      title: '구분',
      align: 'center',
      children: [
        {
          title: '부서',
          dataIndex: 'ITEM_NM',
        },
        {
          title: '공정(장소)',
          dataIndex: 'ITEM_NM',
        },
        {
          title: '세부공정',
          dataIndex: 'ITEM_NM',
        },
        {
          title: '장비(설비)',
          dataIndex: 'ITEM_NM',
        },
        {
          title: '위험요인',
          dataIndex: 'ITEM_NM',
        },
      ],
    },
    {
      title: '사고의 발생원인',
      align: 'center',
      children: [
        {
          title: '인적',
          dataIndex: 'ITEM_NM',
        },
        {
          title: '기계적',
          dataIndex: 'ITEM_NM',
        },
        {
          title: '관리적',
          dataIndex: 'ITEM_NM',
        },
        {
          title: '물질 환경적',
          dataIndex: 'ITEM_NM',
        },
      ],
    },
    {
      title: '사고의 발생원인',
      dataIndex: 'ITEM_NM',
      align: 'left',
    },
    {
      title: 'R/A 실시여부',
      dataIndex: 'ITEM_NM',
      align: 'left',
    },
    {
      title: '비고',
      dataIndex: 'ITEM_NM',
      align: 'left',
    },
  ],
};
export default DangerHazardSubComp;
