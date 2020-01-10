import React from 'react';

import Title from '../../../components/Title';
import Styled from './Styled';
import approvalList from './data';

class ApprovalRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Styled>
        <Title title="결재 요청 건" />
        <div className="widget-body">
          <div className="widget-body-count">
            <strong>
              {approvalList.length}
              <span></span>
            </strong>
            건
          </div>
          <ul>
            {approvalList.map(item => (
              <li key={item.seq}>
                <button type="button">
                  <span className="widget-body-txt">{item.title}</span>
                  {/* <span className="widget-body-view">897</span> */}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Styled>
    );
  }
}
export default ApprovalRequest;
