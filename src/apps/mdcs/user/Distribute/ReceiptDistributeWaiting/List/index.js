import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
// import * as selectors from '../selectors';
import Styled from './Styled';
import { data } from './dummyData';
import ReceiptDistributeModal from '../Modal/ReceiptDistributeModal';

const columns = [
  { title: '종류', dataIndex: 'column1', key: 'column1' },
  { title: 'No', dataIndex: 'column2', key: 'column2' },
  { title: 'Rev', dataIndex: 'column3', key: 'column3' },
  { title: 'Title', dataIndex: 'column4', key: 'column4' },
  { title: '배포일', dataIndex: 'column5', key: 'column5' },
  { title: '확인일', dataIndex: 'column6', key: 'column6' },
];

export class ReceiptDistributeWaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    // const { getExtraApiData, id } = this.props;
    // const apiArr = [
    //   {
    //     key: '',
    //     url: '',
    //     type: '',
    //     params: {},
    //   },
    // ];
    // getExtraApiData(id, apiArr);
  }

  onOpenModal = () => {
    this.setState({ visible: true });
  };

  onCloseModal = () => {
    this.setState({ visible: false });
  };

  onClickRow = record => {
    console.log('onClickRow record : ', record);
    this.onOpenModal();
  };

  handleOk = () => {};

  handleCancel = () => {
    this.onCloseModal();
  };

  render() {
    // const { extraApiData } = this.props;
    const { visible } = this.state;
    return (
      <Styled>
        <Table
          columns={columns}
          dataSource={data}
          size="small"
          // rowSelection={{}}
          onRow={(record, rowIndex) => {
            console.log('record, rowIndex : ', record, rowIndex);
            return {
              onClick: () => {
                this.onClickRow(record);
              },
            };
          }}
        />
        <ReceiptDistributeModal visible={visible} handleOk={this.handleOk} handleCancel={this.handleCancel} />
      </Styled>
    );
  }
}

ReceiptDistributeWaiting.propTypes = {
  getExtraApiData: PropTypes.func.isRequired,
  extraApiData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ReceiptDistributeWaiting;
