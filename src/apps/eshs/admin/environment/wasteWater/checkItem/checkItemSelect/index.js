import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

class checkTypeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
    };
  }

  componentDidMount() {
    request({
      method: 'POST',
      url: `/api/eshs/v1/common/wwCheckItem`,
      data: { PARAM: { type: 'SEARCH' } },
    }).then(({ response }) => {
      this.setState({
        listData: response?.list || [],
      });
    });
  }

  render() {
    const { onClickCheckItem } = this.props;
    const { listData } = this.state;
    const columns = [
      {
        title: '수질 측정항목 코드',
        dataIndex: 'ITEM_CD',
        key: 'ITEM_CD',
        align: 'center',
        width: '40%',
      },
      {
        title: '수질 측정항목 명',
        dataIndex: 'ITEM_NM',
        key: 'ITEM_NM',
        width: '60%',
      },
    ];

    return (
      <>
        <AntdTable
          pagination={false}
          columns={columns}
          dataSource={listData}
          onRow={record => ({
            onClick: () => onClickCheckItem(record),
          })}
        />
      </>
    );
  }
}

checkTypeSelect.propTypes = {
  onClickCheckItem: PropTypes.func,
};

checkTypeSelect.defaultProps = {};

export default checkTypeSelect;
