import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Popover } from 'antd';
import StyledLineTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

import BizMicroDevBase from 'components/BizMicroDevBase';

const AntdTable = StyledLineTable(Table);

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      reqDetails: [],
    };
  }

  componentDidMount = () => {
    const { sagaKey: id, taskSeq, spinningOn, spinningOff, getCallDataHandler } = this.props;
    spinningOn();
    const apiAry = [
      {
        key: 'dataSource',
        url: `/api/eshs/v1/common/protection-req?&TASK_SEQ=${taskSeq}`,
        type: 'POST',
      },
      {
        key: 'reqDetails',
        url: `/api/eshs/v1/common/protection-req-detail?TASK_SEQ=${taskSeq}`,
        type: 'GET',
      },
    ];

    return getCallDataHandler(id, apiAry, () => {
      const { result } = this.props;

      this.setState(
        {
          reqDetails: result?.reqDetails?.list || [],
          formData: result?.dataSource?.result || {},
        },
        spinningOff,
      );
    });
  };

  columns = [
    {
      title: '품명',
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <Popover content={<span>{record?.KIND || ''}</span>} title={null} trigger="hover">
          <span>{record?.KIND || ''}</span>
        </Popover>
      ),
    },
    {
      title: '모델',
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <Popover content={<span>{record?.MODEL || ''}</span>} title={null} trigger="hover">
          <span>{record?.MODEL || ''}</span>
        </Popover>
      ),
    },
    {
      title: '사이즈',
      align: 'center',
      width: '10%',
      render: (text, record, index) => <span>{record?.SIZE1 || ''}</span>,
    },
    {
      title: '신청수량',
      align: 'center',
      width: '10%',
      render: (text, record, index) => <span>{record?.QTY || ''}</span>,
    },
    {
      title: '신청사유',
      align: 'center',
      width: '13%',
      render: (text, record, index) => (
        <Popover content={<span>{record?.REQ_COMMENTS || ''}</span>} title={null} trigger="hover">
          <span>{record?.REQ_COMMENTS || ''}</span>
        </Popover>
      ),
    },
    {
      title: '사용장소',
      align: 'center',
      width: '10%',

      render: (text, record, index) => (
        <Popover content={<span>{record?.PLACE || ''}</span>} title={null} trigger="hover">
          <span>{record?.PLACE || ''}</span>
        </Popover>
      ),
    },
    {
      title: 'Comment',
      dataIndex: 'CONF_COMMENTS',
      align: 'center',
      width: '10%',
      render: (text, record) => (
        <Popover content={<span>{text || ''}</span>} title={null} trigger="hover">
          <span>{text || ''}</span>
        </Popover>
      ),
    },
  ];

  render() {
    const { formData, reqDetails } = this.state;
    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table className="table-border">
            <colgroup>
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
            </colgroup>
            <thead></thead>
            <tbody>
              <tr>
                <th>신청일</th>
                <td>{formData?.REQ_DT || ''}</td>
                <th>지급요청일</th>
                <td>{formData?.TARGET_DT || ''}</td>
              </tr>
            </tbody>
          </table>
          <br />
        </StyledHtmlTable>

        <AntdTable columns={this.columns} dataSource={reqDetails} pagination={false} />
      </StyledContentsWrapper>
    );
  }
}

Comp.propTypes = {
  taskSeq: PropTypes.number,
  sagaKey: PropTypes.string,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
};

Comp.defaultProps = {
  spinningOn: () => undefined,
  spinningOff: () => undefined,
  getCallDataHandler: () => undefined,
  result: {},
};

const PaymentModal = ({ taskSeq, sagaKey }) => <BizMicroDevBase sagaKey={sagaKey} taskSeq={taskSeq} component={Comp}></BizMicroDevBase>;

PaymentModal.propTypes = {
  taskSeq: PropTypes.number,
  sagaKey: PropTypes.string,
};

PaymentModal.defaultProps = {};

export default PaymentModal;
