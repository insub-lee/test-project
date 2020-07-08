import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Table, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import MedicineOutList from './medicineOutList';

const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdTable = StyledAntdTable(Table);
class SelectMedicine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      keyword: '',
      medicineQuantityList: [],
      selectedDrugName: '',
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.getDataSource();
  }

  getDataSource = () => {
    const { keyword } = this.state;
    const { sagaKey, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'medicines',
        url: `/api/eshs/v1/common/health-usage-meidicine-list?KEYWORD=${keyword}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(sagaKey, apiArr, this.setDataSource);
  };

  setDataSource = () => {
    const { result } = this.props;
    this.setState({
      dataSource: (result.medicines && result.medicines.list) || [],
    });
  };

  columns = [
    {
      title: 'No',
      dataIndex: 'ROWNUM',
      align: 'center',
      width: '10%',
      render: (text, record) => (
        <div
          role="button"
          tabIndex="0"
          onKeyPress={e => (e.key === 'Enter' ? () => this.handleRowClick(record) : null)}
          onClick={() => this.handleRowClick(record)}
        >
          {text}
        </div>
      ),
    },
    {
      title: '일반의약품 List',
      dataIndex: 'DRUG',
      align: 'center',
      width: '50%',
      render: (text, record) => (
        <div
          role="button"
          tabIndex="0"
          onKeyPress={e => (e.key === 'Enter' ? () => this.handleRowClick(record) : null)}
          onClick={() => this.handleRowClick(record)}
        >
          {text}
        </div>
      ),
    },
    {
      title: '현재 재고(EA)',
      dataIndex: 'QUANTITY',
      align: 'center',
      width: '15%',
      render: (text, record) => (
        <div
          role="button"
          tabIndex="0"
          onKeyPress={e => (e.key === 'Enter' ? () => this.handleRowClick(record) : null)}
          onClick={() => this.handleRowClick(record)}
        >
          {text}
        </div>
      ),
    },
    {
      title: '제공량(EA)',
      dataIndex: '',
      align: 'center',
      width: '25%',
      render: (text, record) => (
        <AntdInputNumber
          defaultValue={0}
          className="ant-input-number-sm"
          onChange={value => this.handleQuantityChange(record.DRUG_CD, value)}
          min={0}
          max={record.QUANTITY}
          style={{ width: '100%' }}
        />
      ),
    },
  ];

  handleInputChange = event => {
    this.setState({ keyword: event.target.value });
  };

  handleQuantityChange = (key, value) => {
    this.setState(prevState => {
      const tempList = prevState.medicineQuantityList;
      const existValueIndex = tempList.findIndex(item => item.DRUG_CD === key);
      if (!value) {
        return { medicineQuantityList: tempList.filter(item => item.DRUG_CD !== key) };
      }
      if (existValueIndex !== -1) {
        tempList[existValueIndex] = { DRUG_CD: key, QUANTITY: value };
        return { medicineQuantityList: tempList };
      }
      return { medicineQuantityList: tempList.concat({ DRUG_CD: key, QUANTITY: value }) };
    });
  };

  handleRowClick = record => {
    this.setState({ modalVisible: true, selectedDrugName: record.DRUG, selectedRecord: record });
  };

  handleModalClose = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { columns } = this;
    const { getDataSource, handleInputChange, handleModalClose } = this;
    const { dataSource, medicineQuantityList, selectedDrugName, modalVisible, selectedRecord } = this.state;
    const { handleSelectMedicineComplete } = this.props;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <span className="text-label">약품명</span>
              <AntdInput
                className="ant-input-mid ant-input-inline"
                onChange={handleInputChange}
                onPressEnter={getDataSource}
                placeholder="약품명을 입력하세요."
                style={{ width: '85% ' }}
              />
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm" onClick={getDataSource}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable columns={columns} dataSource={dataSource} />
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20 btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm mr5" onClick={() => handleSelectMedicineComplete(medicineQuantityList)}>
              저장
            </StyledButton>
            <StyledButton className="btn-light btn-sm">닫기</StyledButton>
          </StyledButtonWrapper>
          <AntdModal title={`${selectedDrugName} 출고 내역`} visible={modalVisible} footer={null} onCancel={handleModalClose} destroyOnClose>
            <MedicineOutList
              record={selectedRecord}
              sagaKey={this.props.sagaKey}
              getCallDataHandler={this.props.getCallDataHandler}
              result={this.props.result}
              handleModalClose={handleModalClose}
            />
          </AntdModal>
        </StyledContentsWrapper>
      </>
    );
  }
}

SelectMedicine.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  handleSelectMedicineComplete: PropTypes.func,
};

SelectMedicine.defaultProps = {};

export default SelectMedicine;
