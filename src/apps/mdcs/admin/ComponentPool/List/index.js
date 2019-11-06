/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Modal } from 'antd';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import ComponentPoolEdit from 'apps/mdcs/admin/ComponentPool';
import StyledModalWrapper from 'apps/mdcs/styled/Modals/StyledModalWrapper';
import CompDetail from './compDetail';
import StyledPool from './StyledPool';

const AntdModal = StyledModalWrapper(Modal);

class ComponentPoolListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addVisible: false,
      editVisible: false,
      detailVisible: false,
      viewData: {
        viewType: undefined,
        COMP_POOL_IDX: undefined,
        COL_GROUP_IDX: undefined,
        COL_TYPE_IDX: undefined,
        COMP_SRC: '',
        COMP_SETTING_SRC: '',
        COMP_NAME: '',
        COMP_DESC: '',
      },
    };
  }

  componentDidMount() {
    const { getCallDataHanlder, id, apiArys } = this.props;
    getCallDataHanlder(id, apiArys);
  }

  onClickRow = (record, index) => {
    // console.log(record);
  };

  onModal = (type, record) => {
    if (type === 'modify' || type === 'detail') {
      this.setState(
        {
          viewData: {
            viewType: type,
            metaData: record,
          },
        },
        () => {
          type === 'modify' ? this.setState({ editVisible: true }) : this.setState({ detailVisible: true });
        },
      );
    }
    if (type === 'add') {
      this.setState({ addVisible: true }, () => this.setState({ editVisible: true }));
    }
  };

  onCloseEdit = orgId => {
    const { id, getCallDataHanlder, apiArys } = this.props;
    this.setState(
      {
        addVisible: false,
        editVisible: false,
      },
      () => getCallDataHanlder(id, apiArys),
    );
  };

  render() {
    const { result } = this.props;
    const { editVisible, detailVisible, addVisible, viewData } = this.state;

    const columns = [
      {
        title: '컴포넌트 명',
        dataIndex: 'COMP_NAME',
        key: 'COMP_NAME',
        width: '15%',
      },
      {
        title: '컬럼형식',
        dataIndex: 'COL_GROUP_NAME',
        key: 'COL_GROUP_NAME',
        width: '10%',
      },
      {
        title: '컬럼 DB타입',
        dataIndex: 'COL_DB_TYPE',
        key: 'COL_DB_TYPE',
        width: '10%',
      },
      {
        title: '컴포넌트 경로',
        dataIndex: 'COMP_SRC',
        key: 'COMP_SRC',
        width: '25%',
      },
      {
        title: '컴포넌트 설정경로',
        dataIndex: 'COMP_SETTING_SRC',
        key: 'COMP_SETTING_SRC',
        width: '25%',
      },
      {
        title: '자세히 / 수정',
        align: 'center',
        dataIndex: 'COMP_POOL_IDX',
        key: 'COMP_POOL_IDX',
        width: '15%',
        render: (text, record) => (
          <div className="compPool_btn_group" style={{ textAlign: 'center' }}>
            <StyledButton className="btn-light btn-first btn-sm" onClick={() => this.onModal('detail', record)}>
              <Icon type="plus" />
            </StyledButton>
            <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.onModal('modify', record)}>
              <Icon type="edit" />
            </StyledButton>
          </div>
        ),
      },
    ];

    let compPoolList = [];
    if (Object.prototype.hasOwnProperty.call(result, 'compPoolData')) {
      const listData = result.compPoolData.compPoolList;
      compPoolList = listData;
    }

    return (
      <StyledPool>
        <div className="list_top">
          <StyledButton className="btn-primary btn-sm" onClick={() => this.onModal('add', undefined)}>
            <Icon type="plus" /> Component Add
          </StyledButton>
        </div>
        <Table
          columns={columns}
          dataSource={compPoolList}
          bordered
          onRow={(record, rowIndex) => ({
            onClick: event => {
              this.onClickRow(record, rowIndex);
            },
          })}
        />
        <AntdModal
          className="modalWrapper  modalCustom"
          visible={editVisible}
          footer={null}
          width={1080}
          onCancel={() => {
            this.setState({ editVisible: false, addVisible: false });
          }}
        >
          <React.Fragment>
            <div className="pop_tit">ComponentPool Editor</div>
            <div className="pop_con">
              {addVisible ? (
                <ComponentPoolEdit viewType="edit" closeBtnHandle={this.onCloseEdit} />
              ) : (
                <ComponentPoolEdit viewData={viewData} viewType="edit" closeBtnHandle={this.onCloseEdit} />
              )}
            </div>
          </React.Fragment>
        </AntdModal>
        <AntdModal
          className="modalWrapper  modalCustom"
          visible={detailVisible}
          footer={null}
          width={1080}
          onCancel={() => {
            this.setState({ detailVisible: false });
          }}
        >
          <React.Fragment>
            <div className="pop_tit">ComponentPool Detail</div>
            <div className="pop_con">
              <CompDetail viewData={viewData} />
            </div>
          </React.Fragment>
        </AntdModal>
      </StyledPool>
    );
  }
}

ComponentPoolListComponent.propTypes = {
  getCallDataHanlder: PropTypes.func,
  id: PropTypes.string,
  apiArys: PropTypes.array,
  result: PropTypes.object,
};

ComponentPoolListComponent.defaultProps = {
  id: 'ComponentPool',
  apiArys: [
    {
      key: 'compPoolData',
      url: '/api/builder/v1/work/ComponentPool',
      type: 'GET',
      params: {},
    },
  ],
  getCallDataHanlder: () => false,
  result: {},
};

export default ComponentPoolListComponent;
