import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Table, InputNumber } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';

const AntdTable = StyledAntdTable(Table);
const AntdInputNumber = StyledInputNumber(InputNumber);

// Ehs - 용폐수 - 관리 - 유량 (검색결과 리스트 테이블)
class WaterRateTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listData, onChangeFormData, onSaveRate } = this.props;
    const columns = [
      {
        title: '등록일',
        children: [
          {
            title: `${moment().format('YYYY.MM.DD')}`,
            className: 'REG_DTTM',
            dataIndex: 'REG_DTTM',
            align: 'center',
          },
        ],
      },
      {
        title: '상수도',
        children: [
          {
            title: (
              <AntdInputNumber
                className="ant-input-number-xs"
                style={{ width: '100%' }}
                defaultValue={0}
                min={0}
                onChange={value => onChangeFormData('WATER_WORKS', value)}
              />
            ),
            dataIndex: 'WATER_WORKS',
            key: 'WATER_WORKS',
            align: 'center',
          },
        ],
      },
      {
        title: '공업용수',
        children: [
          {
            title: (
              <AntdInputNumber
                className="ant-input-number-xs"
                style={{ width: '100%' }}
                defaultValue={0}
                min={0}
                onChange={value => onChangeFormData('INDUSTRIAL_WATER', value)}
              />
            ),
            dataIndex: 'INDUSTRIAL_WATER',
            key: 'INDUSTRIAL_WATER',
            align: 'center',
          },
        ],
      },
      {
        title: '냉각수량',
        children: [
          {
            title: (
              <AntdInputNumber
                className="ant-input-number-xs"
                style={{ width: '100%' }}
                defaultValue={0}
                min={0}
                onChange={value => onChangeFormData('COOLING_WATER', value)}
              />
            ),
            dataIndex: 'COOLING_WATER',
            key: 'COOLING_WATER',
            align: 'center',
          },
        ],
      },
      {
        title: '',
        children: [
          {
            title: (
              <StyledButton className="btn-gray btn-xs ml5" onClick={() => onSaveRate()}>
                저장
              </StyledButton>
            ),
            dataIndex: 'REG_DTTM',
            align: 'center',
            render: (data, record, index) => {
              if (index === 0) {
                return (
                  <span style={{ fontWeight: 600 }}>
                    <CheckOutlined style={{ color: '#5cd65c' }} /> 적용중
                  </span>
                );
              }
              return (
                <span>
                  <CloseOutlined style={{ color: '#ff4d4d' }} /> 미적용
                </span>
              );
            },
          },
        ],
      },
    ];
    return <AntdTable columns={columns} dataSource={listData} footer={() => <span>{`${(listData && listData.length) || 0} 건`}</span>} />;
  }
}

WaterRateTable.propTypes = {
  onChangeFormData: PropTypes.func,
  listData: PropTypes.array,
  onSaveRate: PropTypes.func,
};

WaterRateTable.defaultProps = {
  listData: [],
};

export default WaterRateTable;
