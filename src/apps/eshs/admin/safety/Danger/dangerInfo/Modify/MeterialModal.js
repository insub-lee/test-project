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
    this.state = {};
    this.onChangeData = debounce(this.onChangeData, 500);
  }

  componentDidMount() {
    const {
      extraApiData: { modalData, modalSelectData },
    } = this.props;
    console.debug('extraApiData : ', modalData, modalSelectData);
    const nModalSelectData = modalSelectData && modalSelectData.categoryMapList && modalSelectData.categoryMapList.filter(f => f.LVL !== 0);
    const nModalData = modalData && modalData.list;
    console.debug('nModalSelectData : ', nModalSelectData);
    console.debug('nModalData : ', nModalData);

    this.setState({ modalData: nModalData, modalSelectData: nModalSelectData });
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
      const filterData = modalData && modalData.list && modalData.list.filter(f => (ref01 ? f.REF01 === ref01 : true) && (ref02 ? f.REF02 === ref02 : true));
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
    if (selectedMeterial.length < 14) {
      let element;
      for (let index = 0; index < 14; index += 1) {
        element = {
          ...element,
          ...{
            [`C_NM${index + 1}`]: selectedMeterial[index] && selectedMeterial[index].MINOR_CD,
            [`C_NAME${index + 1}`]: selectedMeterial[index] && selectedMeterial[index].CD_NM,
            [`C_GR${index + 1}`]: selectedMeterial[index] && selectedMeterial[index].REF03,
          },
        };
      }
      changeFormData(id, 'INFO_DATA', { ...formData.INFO_DATA, ...element });
      onChangeModal();
    } else {
      message.warning('화학물질 종류는 최대 14개까지 선택할 수 있습니다.');
    }
  };

  render() {
    const { modalData, selectedRowKeys, modalSelectData } = this.state;
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
              placeholder="지역전체"
              allowClear
            >
              {modalSelectData && modalSelectData.map(item => <Option value={String(item.NODE_ID)}>{item.NAME_KOR}</Option>)}
            </AntdSelect>
            <span className="text-label">물질구분</span>
            <AntdSelect
              className="mr5 select-sm"
              style={{ width: 150 }}
              defaultValue={this.state.searchType}
              value={this.state.ref02}
              onChange={value => this.setState({ ref02: value }, this.filterSelect)}
              placeholder="물질전체"
              allowClear
            >
              <Option value="CHEMICAL">CHEMICAL</Option>
              <Option value="GAS">GAS</Option>
            </AntdSelect>
          </div>
        </StyledCustomSearchWrapper>
        <AntdTable
          columns={modalColumns}
          bordered
          rowKey="MINOR_CD"
          dataSource={modalData || []}
          rowSelection={rowSelection}
          pagination={20}
          footer={() => <span>{`${(modalData && modalData.length) || 0} 건`}</span>}
        />
        <StyledButtonWrapper className="btn-wrap-center">
          <StyledButton className="btn-primary btn-first btn-sm" onClick={this.modalInsert}>
            저장
          </StyledButton>
          <StyledButton className="btn-primary btn-first btn-sm" onClick={onChangeModal}>
            취소
          </StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    );
  }
}

MeterialModal.propTypes = {
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.object,
  formData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  onChangeModal: PropTypes.func,
  isModal: PropTypes.bool,
};

MeterialModal.defaultProps = {};

export default MeterialModal;
