import React from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import UserListPage from './userListPage';

class EducationManagement extends React.Component {
  render() {
    const { authority } = this.props;
    return (
      <BizBuilderBase
        sagaKey="EducationManagement"
        workSeq={6941}
        viewType="LIST"
        loadingComplete={this.loadingComplete}
        authority={authority}
        listMetaSeq={authority[0] === 'V' ? 6956 : 8901} // 관리자 페이지
        CustomListPage={authority[0] === 'V' ? null : UserListPage} // 커스텀 적용 X
        // listMetaSeq={authority[0] !== 'V' ? 6956 : 8901} // 사용자 페이지
        // CustomListPage={authority[0] !== 'V' ? null : UserListPage} // 커스텀 적용
      />
    );
  }
}

EducationManagement.propTypes = {
  authority: PropTypes.arrayOf('string'),
};

EducationManagement.defaultProps = {
  authority: null,
};

export default EducationManagement;
