import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import UserSearchModal from 'apps/eshs/common/userSearchModal/UserSearchModal';
import PropTypes from 'prop-types';

class EmpChkResultDetail extends Component {
  render() {
    const { sagaKey, visible, onClickRow, colData, columns } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={UserSearchModal} visible={visible} onClickRow={onClickRow} colData={colData} columns={columns} />;
  }
}

EmpChkResultDetail.propTypes = {
  sagaKey: PropTypes.string,
  visible: PropTypes.bool, // flase 시 colData값 라벨로 노출
  onClickRow: PropTypes.func, // list rowClick시 record값을 반환받는 함수
  columns: PropTypes.array, // antdTable columns
  colData: PropTypes.string, // InputSearch 초기값  userList rowClick 이벤트시 해당 사원의 사번으로 변경됨
};
EmpChkResultDetail.defaultProps = {
  sagaKey: 'userSearch',
  visible: true,
  onClickRow: () => {},
  columns: [
    {
      title: '사번',
      align: 'center',
      dataIndex: 'EMP_NO',
      width: '20%',
    },
    {
      title: '이름',
      align: 'center',
      dataIndex: 'NAME_KOR',
      width: '20%',
    },
    {
      title: '직위',
      align: 'center',
      dataIndex: 'PSTN_NAME_KOR',
      width: '20%',
    },
    {
      title: '부서명',
      align: 'left',
      dataIndex: 'DEPT_NAME_KOR',
      width: '40%',
    },
  ],
  colData: '',
};
export default EmpChkResultDetail;
