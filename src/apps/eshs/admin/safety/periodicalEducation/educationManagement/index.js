import React from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

class EducationManagement extends React.Component {
  render() {
    const { authority } = this.props;
    return (
      <BizBuilderBase
        sagaKey="EducationManagement"
        workSeq={6941}
        viewType="LIST"
        listMetaSeq={authority[0] === 'V' ? 6956 : 8901} // 테스트용 권한 체크
        // listMetaSeq={authority[0] !== 'V' ? 6956 : 8901}
        loadingComplete={this.loadingComplete}
        authority={authority}
        // ListCustomButtons={authority[0] === 'V' ? null : () => null}
        ListCustomButtons={authority[0] !== 'V' ? null : () => null}
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
