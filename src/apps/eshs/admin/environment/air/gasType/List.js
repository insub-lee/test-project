import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, message, Modal } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';

import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';
import Edit from './Edit';

const AntdTable = StyledAntdTable(Table);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalEdit: false,
      gasCd: '',
      gasNm: '',
      permissionDensity: '',
      gasWeight: '',
      unit: '',
      modalProps: '',
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
    getCallDataHandler(id, apiAry, this.renderTable);
  };

  changeInputValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCancel = () => {
    this.setState({
      modalEdit: false,
      modalProps: '',
    });
  };

  renderTable = () => {
    const { columns, result } = this.props;
    return (
      <AntdTable
        style={{ cursor: 'pointer' }}
        rowKey={result && result.gasType && result.gasType.list.GAS_CD}
        columns={columns}
        dataSource={result && result.gasType && result.gasType.list}
        bordered
        onRow={record => ({
          onClick: () => {
            this.selectedRecord(record);
          },
        })}
        pagination={{ pageSize: 100 }}
        scroll={{ y: 500 }}
        footer={() => <div style={{ textAlign: 'center' }}>{`${result && result.gasType && result.gasType.list.length - 1} 건`}</div>}
      />
    );
  };

  selectedRecord = record => {
    this.setState({
      modalEdit: true,
      modalProps: {
        gasCd: record.GAS_CD,
        gasNm: record.GAS_NM,
        permissionDensity: record.PERMISSION_DENSITY,
        gasWeight: record.GAS_WEIGHT,
        unit: record.UNIT,
      },
    });
  };

  isOpenEdit = () => {
    this.setState({ modalEdit: true });
  };

  onEditCancel = () => {
    this.setState({
      modalEdit: false,
      modalProps: '',
    });
    this.listDataApi();
  };

  editModalTemplate = () => <Edit {...this.props} modalProps={this.state.modalProps} onEditCancel={this.onEditCancel} onCancel={this.onCancel} />;

  render() {
    console.log(this.state, 'state');
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <div className="alignRight" style={{ marginBottom: '10px' }}>
                <StyledButton className="btn-primary btn-first" onClick={() => this.isOpenEdit()}>
                  추가
                </StyledButton>
              </div>
              {this.renderTable()}
              <Modal visible={this.state.modalEdit} width="600px" onCancel={this.onCancel} destroyOnClose footer={[]}>
                <div>{this.state.modalEdit && this.editModalTemplate()}</div>
              </Modal>
            </Group>
          </Sketch>
        </StyledViewDesigner>
      </div>
    );
  }
}

List.propTypes = {
  columns: PropTypes.array,
};

List.defaultProps = {
  getCallDataHandler: () => {},
  formData: {},
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
