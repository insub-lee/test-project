import * as PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'antd';
import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';

const AntdTable = StyledAntdTable(Table);

const columns = [
  {
    title: '발행번호',
    align: 'center',
    dataIndex: 'REQ_NO',
    width: '130px',
  },
  {
    title: '문서상태',
    align: 'center',
    dataIndex: 'STTLMNT_STATUS_NAME',
    width: '130px',
  },
  {
    title: '위치',
    align: 'center',
    dataIndex: 'LOC_NAME',
    width: '130px',
  },
  {
    title: '제목',
    align: 'center',
    dataIndex: 'TITLE',
    width: '800px',
  },
  {
    title: '요청팀',
    align: 'center',
    dataIndex: 'REQ_DEPT_NAME',
    width: '250px',
  },
  {
    title: '요청자',
    align: 'center',
    dataIndex: 'REQ_EMP_NM',
    width: '100px',
  },
  {
    title: '조치팀',
    align: 'center',
    dataIndex: 'ACP_DEPT_NM',
    width: '250px',
  },
  {
    title: '조치자',
    align: 'center',
    dataIndex: 'ACP_EMP_NM',
    width: '100px',
  },
  {
    title: '유형',
    align: 'center',
    dataIndex: 'EACH_TYPE',
    width: '80px',
  },
  {
    title: '등급',
    align: 'center',
    dataIndex: 'GRADE',
    width: '80px',
  },
];

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;

    spinningOn();
    const apiAry = [
      {
        key: 'list',
        url: '/api/eshs/v1/common/eshsSafetySwtbImproveList',
        type: 'POST',
      },
    ];

    getCallDataHandler(id, apiAry, spinningOff);
  };

  componentWillUnmount() {
    const { sagaKey: id, removeReduxState } = this.props;
    removeReduxState(id);
  }

  appStart = () => {};

  render() {
    const { result, onClickRow, modalVisible } = this.props;
    const list = (result && result.list && result.list.list) || [];
    return (
      <StyledContentsWrapper>
        <AntdTable
          columns={columns}
          bordered
          rowKey="REQ_NO"
          footer={() => <span>{`${list.length || 0} 건`}</span>}
          scroll={{ x: 700 }}
          dataSource={list || []}
          onRow={record => ({
            onClick: () => {
              onClickRow(record);
              modalVisible();
            },
          })}
        />
      </StyledContentsWrapper>
    );
  }
}

const SearchList = ({ onClickRow, modalVisible }) => (
  <BizMicroDevBase sagaKey="SearchList" onClickRow={onClickRow} modalVisible={modalVisible} component={Comp}></BizMicroDevBase>
);

SearchList.propTypes = {
  onClickRow: PropTypes.func,
  modalVisible: PropTypes.func,
};

SearchList.defaultProps = {
  onClickRow: () => {},
  modalVisible: () => {},
};

Comp.propTypes = {
  sagaKey: PropTypes.string,
  onClickRow: PropTypes.func,
  modalVisible: PropTypes.func,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

Comp.defaultProps = {
  result: {},
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default SearchList;
