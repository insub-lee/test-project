import React, { Component } from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce';
import { Select, Modal, message, Table } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

import moment from 'moment';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

moment.locale('ko');
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);

const modalColumns = [
  {
    title: '지역',
    align: 'center',
    dataIndex: 'REF01_NAME',
  },
  {
    title: '물질구분',
    align: 'center',
    dataIndex: 'REF02',
  },
  {
    title: '물질명',
    align: 'center',
    dataIndex: 'CD_NM',
  },
  {
    title: '등급',
    align: 'center',
    dataIndex: 'REF03',
  },
];
const { Option } = Select;

class MeterialModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ref01: 318,
      ref02: 'ALL',
    };
    this.onChangeData = debounce(this.onChangeData, 500);
  }

  componentDidMount() {
    const {
      extraApiData: { modalData, modalSelectData },
      formData,
    } = this.props;
    const nModalSelectData =
      modalSelectData && modalSelectData.categoryMapList && modalSelectData.categoryMapList.filter(f => f.LVL !== 0);
    const nModalData = modalData && modalData.list;

    const selectedRowKeys = [];
    const selectedMeterial = [];
    const infoData = (formData && formData.INFO_DATA) || {};
    if (JSON.stringify(infoData) !== '{}') {
      for (let index = 1; index <= 14; index += 1) {
        if (infoData[`C_NM${index}`]) {
          selectedRowKeys.push(infoData[`C_NM${index}`]);
          const idx = nModalData.findIndex(item => item.MINOR_CD === infoData[`C_NM${index}`]);
          idx > -1 && selectedMeterial.push(nModalData[idx]);
        }
      }
    }

    this.setState({
      modalData: nModalData,
      modalSelectData: nModalSelectData,
      selectedRowKeys,
      selectedMeterial,
    });
  }

  onChangeData = (name, value) => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, name, value);
  };

  filterSelect = () => {
    const {
      extraApiData: { modalData },
    } = this.props;
    const { ref01, ref02 } = this.state;
    if (modalData && modalData.list && modalData.list.length > 0) {
      const filterData =
        modalData &&
        modalData.list &&
        modalData.list.filter(item => {
          const firstYn = ref01 > 0 ? item.REF01 === ref01 : true;
          const secondYn = ref02 !== 'ALL' ? item.REF02 === ref02 : true;
          return firstYn && secondYn;
        });
      this.setState({ modalData: filterData });
    }
  };

  onSelectChangeModal = selectedRowKeys => {
    const { modalData } = this.state;
    const nData = modalData.filter(item => selectedRowKeys.findIndex(i => i === item.MINOR_CD) !== -1);
    this.setState({ selectedRowKeys, selectedMeterial: nData });
  };

  modalInsert = () => {
    const { selectedMeterial } = this.state;
    const { sagaKey: id, changeFormData, onChangeModal, formData } = this.props;
    const { INFO_DATA } = formData;
    if (selectedMeterial.length <= 14) {
      // INFO_DATA 에서 기존 유해화학물질 제거
      const allKey = Object.keys(INFO_DATA || {});
      const outKey = ['C_NM', 'C_NAME', 'C_GR'];
      let nextInfoData;
      allKey.forEach(key => {
        if (!outKey.includes(key)) {
          nextInfoData = {
            ...nextInfoData,
            [key]: INFO_DATA[key],
          };
        }
      });

      // 제거된 INFO_DATA에 유해화학물질 정보 추가
      for (let index = 0; index < 14; index += 1) {
        nextInfoData = {
          ...nextInfoData,
          ...{
            [`C_NM${index + 1}`]: selectedMeterial[index] && selectedMeterial[index].MINOR_CD,
            [`C_NAME${index + 1}`]: selectedMeterial[index] && selectedMeterial[index].CD_NM,
            [`C_GR${index + 1}`]: selectedMeterial[index] && selectedMeterial[index].REF03,
          },
        };
      }

      changeFormData(id, 'INFO_DATA', nextInfoData);
      onChangeModal();
    } else {
      message.warning('화학물질 종류는 최대 14개까지 선택할 수 있습니다.');
    }
  };

  render() {
    const { modalData, selectedRowKeys } = this.state;
    const { onChangeModal } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChangeModal,
    };
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <span className="text-label">지역</span>
            <AntdSelect
              className="mr5 select-sm"
              style={{ width: 150 }}
              defaultValue={this.state.ref01}
              onChange={value => this.setState({ ref01: String(value) }, this.filterSelect)}
              allowClear
            >
              <Option value={318}>구미</Option>
              <Option value={317}>청주</Option>
              <Option value={0}>전체</Option>
            </AntdSelect>
            <span className="text-label">물질구분</span>
            <AntdSelect
              className="mr5 select-sm"
              style={{ width: 150 }}
              defaultValue={this.state.ref02}
              onChange={value => this.setState({ ref02: value }, this.filterSelect)}
              allowClear
            >
              <Option value="ALL">전체</Option>
              <Option value="CHEMICAL">CHEMICAL</Option>
              <Option value="GAS">GAS</Option>
            </AntdSelect>
          </div>
          <div className="btn-area">
            <StyledButton className="btn-primary btn-first btn-sm" onClick={this.modalInsert}>
              저장
            </StyledButton>
            <StyledButton className="btn-gray btn-first btn-sm" onClick={onChangeModal}>
              취소
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <AntdTable
          columns={modalColumns}
          bordered
          rowKey="MINOR_CD"
          dataSource={modalData || []}
          rowSelection={rowSelection}
          pagination={false}
          scroll={{ y: 500 }}
          footer={() => <span>{`${(modalData && modalData.length) || 0} 건`}</span>}
        />
      </StyledContentsWrapper>
    );
  }
}

MeterialModal.propTypes = {
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.object,
  formData: PropTypes.object,
  changeFormData: PropTypes.func,
  onChangeModal: PropTypes.func,
};

MeterialModal.defaultProps = {};

export default MeterialModal;
