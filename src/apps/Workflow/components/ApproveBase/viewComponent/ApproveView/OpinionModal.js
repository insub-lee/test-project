import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import StyledTable from 'components/CommonStyled/StyledTable';
const { TextArea } = Input;

class OpinionModal extends Component {
  handleReqApprove = (e, appvStatus) => {
    e.preventDefault();
    this.props.reqApprove(appvStatus);
    this.props.setOpinionVisible(false);
  };

  handleCloseOpinionModal = () => {
    this.props.setOpinion('');
    this.props.setOpinionVisible(false);
  };

  render() {
    return (
      <StyledTable style={{ padding: '5px' }}>
        <table>
          <tbody>
            <tr>
              <th>의견</th>
              <td>
                <TextArea rows={4} onChange={e => this.props.setOpinion(e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>
      </StyledTable>
    );
  }
}

OpinionModal.propTypes = {
  opinionVisible: PropTypes.bool,
  setOpinionVisible: PropTypes.func,
  opinion: PropTypes.string,
  setOpinion: PropTypes.func,
  reqApprove: PropTypes.func,
};

OpinionModal.defaultProps = {
  opinionVisible: false,
  opinion: '',
};

export default OpinionModal;
