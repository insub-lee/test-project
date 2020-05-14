import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';

class EducationManagement extends React.Component {
  render() {
    return <BizBuilderBase sagaKey="EducationManagement" workSeq={6941} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

EducationManagement.propTypes = {};

EducationManagement.defaultProps = {};

export default EducationManagement;
