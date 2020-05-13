import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';

// 차후 삭제예정
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StyledContentsWrapper>
        <div className="selSaveWrapper">
          test
          <iframe
            style={{ width: '100%' }}
            title="test"
            src="http://192.168.251.11:4488/jasperserver-pro/dashboard/viewer.html?j_username=jasperuser&j_password=jasperuser&sdd=20190511&edd=20200511&stdd=20200511&sdd1=20190511&edd1=20200511&stdd1=20200511&userid1=140376&sdd2=20190511&edd2=20200511&stdd2=20200511&userid2=140376&sdd3=20190511&edd3=20200511&stdd3=20200511&userid3=140376&viewAsDashboardFrame=true#/public/Samples/Dashboards/RecordReports_1"
          ></iframe>
        </div>
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
