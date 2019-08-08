import React from 'react';
import { Table, Button, Spin, Modal } from 'antd';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import selectors from '../selectors';
import * as actions from '../actions';

import Styled from './Styled';

const AntdTable = StyledAntdTable(Table);

const columns = handleChangeIsRelationMualModal => [
  {
    title: '매뉴얼명',
    dataIndex: 'MUAL_NAME',
    key: 'MUAL_IDX',
    width: '40%',
  },

  {
    title: '비고',
    dataIndex: 'MEMO',
    key: 'MEMO',
    width: '40%',
  },
  {
    title: 'Version',
    dataIndex: 'VERSION',
    key: 'VERSION',
    // width: '10%',
  },
  {
    title: (
      <button type="button" onClick={() => handleChangeIsRelationMualModal(true)}>
        +
      </button>
    ),
    dataIndex: '',
    key: '',
    render: (text, record) => (
      <button type="button" onClick={() => console.debug('~~~~!!!2222', record)}>
        <i className="xi-trash-o" />
      </button>
    ),
    // width: '10%',
  },
];

const OptionMgr = ({ relationManualList, isRelationMualModal, handleChangeIsRelationMualModal }) => (
  <Styled id="manualOptionMgr" className="optionMgrWrapper">
    <div className="optionMgr_title">퀵메뉴 정보</div>
    <div className="optionMgr_contents">
      <span className="optionMgr_subtitle">매뉴얼</span>
      <AntdTable dataSource={relationManualList} columns={columns(handleChangeIsRelationMualModal)} rowKey="MUAL_IDX" />
    </div>
    <Modal
      width={800}
      bodyStyle={{ height: 'calc(100vh - 140px)', padding: '4px' }}
      style={{ top: 42 }}
      visible={isRelationMualModal}
      footer={null}
      onCancel={() => handleChangeIsRelationMualModal(false)}
      getContainer={() => document.querySelector('#manualOptionMgr')}
      title="관련 매뉴얼 선택"
    ></Modal>
  </Styled>
);

OptionMgr.propTypes = {
  relationManualList: PropTypes.object,
  isRelationMualModal: PropTypes.bool,
  handleChangeIsRelationMualModal: PropTypes.func,
};

OptionMgr.defaultProps = {
  relationManualList: fromJS({}),
  isRelationMualModal: false,
  handleChangeIsRelationMualModal: () => false,
};

const mapStateToProps = createStructuredSelector({
  relationManualList: selectors.makeSelectRelationManualList(),
  isRelationMualModal: selectors.makeSelectIsRelationMualModal(),
});

const mapDispatchToProps = dispatch => ({
  handleChangeIsRelationMualModal: flag => dispatch(actions.setIsRelationMualModalByReduc(flag)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionMgr);
