import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Table, Popconfirm, message } from 'antd';

import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledInput from 'commonStyled/Form/StyledInput';

const AntdInput = StyledInput(Input);
const AntdLineTable = StyledLineTable(Table);

class EiItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnPlusColumns: [],
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    console.debug('여기는 DidMount');
    this.handleInitColumns();
  }

  handleInitColumns = () => {
    const { formData, dataKey, columns } = this.props;
    const itemList = (formData && formData.itemList) || [];
    const itemData = (formData && formData.itemData) || {};
    const btnOk = itemList.length;
    const searchFlag = (formData && formData.searchFlag) || false;
    console.debug('columns', columns);
    this.setState({
      btnPlusColumns: [
        {
          title: (
            <div className="selSaveWrapper">
              <StyledButtonWrapper className="btn-wrap-inline">
                <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.handleAction('EXCEL_DOWNLOAD')}>
                  Excel Download
                </StyledButton>
                {!searchFlag && (
                  <>
                    <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.handleAction('EXCEL_UPLOAD')}>
                      Excel Upload
                    </StyledButton>
                    <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.handleAction('SAVE')}>
                      추가
                    </StyledButton>
                    {btnOk > 0 && (
                      <>
                        <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.handleAction('UPDATE')}>
                          수정
                        </StyledButton>
                        <Popconfirm
                          title="선택하신 내용을(를) 정말로 삭제하시겠습니끼?"
                          onConfirm={() => this.handleAction('DELETE')}
                          okText="확인"
                          cancelText="취소"
                        >
                          <StyledButton className="btn-primary btn-first btn-sm">삭제</StyledButton>
                        </Popconfirm>
                        <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.handleAction('RESET')}>
                          Reset
                        </StyledButton>
                      </>
                    )}
                  </>
                )}
              </StyledButtonWrapper>
            </div>
          ),
          children: typeof columns === 'function' ? columns(itemData) : columns,
        },
      ],
    });
  };

  handleAction = type => {
    const { id, formData, submitHandlerBySaga, tbName, validationCheck, overLapCheck } = this.props;
    const itemData = (formData && formData.itemData) || {};
    const CHK_YEAR = (formData && formData.CHK_YEAR) || '';
    const DEPT_CD = (formData && formData.searchRow && formData.searchRow.DEPT_CD) || (formData && formData.myDept && formData.myDept.DEPT_CD) || '';

    switch (type) {
      case ('SAVE', 'UPDATE'):
        if (typeof validationCheck === 'function') {
          const msg = validationCheck(itemData);
          if (msg) {
            return message.warning(msg);
          }
        } else if (typeof overLapCheck === 'function') {
          const msg = overLapCheck();
          if (msg) {
            return message.warning('이미 동일한 Data가 존재합니다');
          }
        }
        if (type === 'SAVE') {
          submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/EshsEiItem', { itemData: { ...itemData, CHK_YEAR, DEPT_CD }, tbName }, this.handleFormReset);
        } else if (type === 'UPDATE') {
          submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/EshsEiItem', { itemData, tbName }, this.handleFormReset);
        }
        break;
      case 'DELETE':
        break;
      case 'RESET':
        this.handleFormReset();
        break;
      case 'EXCEL_DOWNLOAD':
        message.warning('미구현');
        break;
      case 'EXCEL_UPLOAD':
        message.warning('미구현');
        break;
      default:
        break;
    }
  };

  handleFormReset = () => {
    const { id, setFormData, formData, handleSearchOnClick } = this.props;
    setFormData(id, { ...formData, itemData: {} });
    this.setState({ rowSelections: [] });
    handleSearchOnClick();
  };

  handleRowClick = itemData => {
    const { id, changeFormData } = this.props;
    console.debug('여기는 rowClick', itemData);
    changeFormData(id, 'itemData', itemData);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { formData, dataKey, tbName } = this.props;
    const itemList = (formData && formData.itemList) || [];
    const { btnPlusColumns, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    return (
      <ContentsWrapper>
        <AntdLineTable
          key={(itemList && itemList[dataKey]) || undefined}
          className="tableWrapper tableCodeWrapper"
          rowKey={(itemList && itemList[dataKey]) || undefined}
          columns={btnPlusColumns}
          dataSource={itemList}
          bordered
          // rowSelection={rowSelection}
          onRow={record => ({
            onClick: () => {
              this.handleRowClick(record);
            },
          })}
          footer={() => <span>{`${itemList.length} 건`}</span>}
        />
      </ContentsWrapper>
    );
  }
}

EiItemTable.propTypes = {
  columns: PropTypes.any,
  validationCheck: PropTypes.any,
  id: PropTypes.string,
  formData: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
  tbName: PropTypes.string,
  overLapCheck: PropTypes.func,
  dataKey: PropTypes.string,
};
EiItemTable.defaultProps = {
  columns: [],
  validationCheck: undefined,
  id: '',
  formData: {},
  submitHandlerBySaga: () => {},
  tbName: '',
  dataKey: '',
  overLapCheck: undefined,
};

export default EiItemTable;
