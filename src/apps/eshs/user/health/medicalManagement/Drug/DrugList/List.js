import React, { Component } from 'react';
import { Table, Input, Select, DatePicker, Modal } from 'antd';
import PropTypes from 'prop-types';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import DrugForm from 'apps/eshs/user/health/medicalManagement/Drug/DrugList/DrugForm';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: {},
      modalObj: {
        modalTitle: '',
        modalContent: [],
        modalVisible: false,
      },
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;

    spinningOn();

    this.getInitData();
  }

  getInitData = () => {
    const { sagaKey, getCallDataHandler, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'workAreaList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 316 },
        },
      },
      {
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsHealthMedicine`,
        type: 'POST',
        params: { PARAM: {} },
      },
    ];

    getCallDataHandler(sagaKey, apiAry, spinningOff);
  };

  getList = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { searchParam } = this.state;

    spinningOn();
    const apiAry = [
      {
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsHealthMedicine`,
        type: 'POST',
        params: { PARAM: { ...searchParam } },
      },
    ];
    return getCallDataHandler(id, apiAry, spinningOff);
  };

  onChangeSearchParam = (key, val) => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam[key] = val;
      return { searchParam };
    });
  };

  modalVisible = (formData = {}, type = 'INPUT') => {
    const { result } = this.props;
    const {
      modalObj: { modalVisible },
    } = this.state;
    const workAreaList = (result && result.workAreaList && result.workAreaList.categoryMapList) || [];
    if (modalVisible) {
      return this.setState({
        modalObj: { modalContent: [], modalTitle: '', modalVisible: !modalVisible },
      });
    }
    return this.setState({
      modalObj: {
        modalVisible: !modalVisible,
        modalContent: [
          <DrugForm key="DrugForm" defaultForm={formData} type={type} workAreaList={workAreaList} modalVisible={this.modalVisible} getList={this.getList} />,
        ],
        modalTitle: type === 'INPUT' ? '신규등록' : '관리',
      },
    });
  };

  columns = [
    {
      title: '품목',
      dataIndex: 'DRUG',
      width: '20%',
      align: 'center',
    },
    {
      title: '제약회사',
      dataIndex: 'COMPANY',
      width: '20%',
      align: 'center',
    },
    {
      title: '규격',
      dataIndex: 'SIZE1',
      width: '8%',
      align: 'center',
    },
    {
      title: '단위',
      dataIndex: 'UNIT',
      width: '8%',
      align: 'center',
    },
    {
      title: '유효기간',
      dataIndex: 'VALIDITY_TERM',
      width: '10%',
      align: 'center',
    },
    {
      title: '적정재고',
      dataIndex: 'PROPERSTOCK',
      width: '8%',
      align: 'center',
    },
    {
      title: '비고',
      dataIndex: 'COMMENTS',
      width: '26%',
      align: 'center',
    },
  ];

  render() {
    const { result, customOnRowClick, saveBtn } = this.props;
    const { modalObj } = this.state;
    const list = (result && result.List && result.List.list) || [];
    const workAreaList = (result && result.workAreaList && result.workAreaList.categoryMapList) || [];

    return (
      <>
        <AntdModal width={850} visible={modalObj.modalVisible} title={modalObj.modalTitle || ''} onCancel={this.modalVisible} destroyOnClose footer={null}>
          {modalObj.modalContent}
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="지역"
                onChange={val => this.onChangeSearchParam('WORK_AREA_CD', val)}
              >
                {workAreaList
                  .filter(item => item.LVL === 1)
                  .map(item => (
                    <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                      {item.NAME_KOR}
                    </AntdSelect.Option>
                  ))}
              </AntdSelect>
              <AntdInput
                placeholder="품목"
                allowClear
                className="ant-input-sm ant-input-inline mr5"
                style={{ width: 150 }}
                onPressEnter={this.getList}
                onChange={e => this.onChangeSearchParam('DRUG', e.target.value)}
              />
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            {saveBtn && (
              <StyledButton className="btn-primary btn-sm" onClick={() => this.modalVisible({}, 'INPUT')}>
                등록
              </StyledButton>
            )}
          </StyledButtonWrapper>
          <AntdTable
            columns={this.columns}
            footer={() => <span>{`${(list && list.length) || 0} 건`}</span>}
            // scroll={{ y: '100%' }}
            // pagination={false}
            dataSource={list || []}
            bordered
            rowKey="DRUG_CD"
            onRow={record => ({
              onClick: e => (typeof customOnRowClick === 'function' ? customOnRowClick(record) : this.modalVisible(record, 'MODIFY')),
            })}
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  customOnRowClick: PropTypes.any,
  saveBtn: PropTypes.bool,
};

List.defaultProps = {
  spinningOn: () => {},
  spinningOff: () => {},
  result: {},
  getCallDataHandler: () => {},
  customOnRowClick: undefined,
  saveBtn: true,
};

export default List;
