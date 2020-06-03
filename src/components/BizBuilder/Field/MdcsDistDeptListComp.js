import React, { Component } from 'react';
import styled from 'styled-components';

import { isJSON } from 'utils/helpers';

const StyledWrap = styled.div`
  table.mdcsDistDeptList {
    width: 100%;
    margin-bottom: 2px;
    & > thead > tr.mdcsDistDeptRow > th,
    & > tbody > tr.mdcsDistDeptRow > td {
      border: solid 1px #cccccc;
      padding: 4px;
    }
  }
`;

class MdcsDistDeptListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distributeDept: '',
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG } = this.props;
    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey]) {
        const disInfo = fieldSelectData[CONFIG.property.compSelectDataKey];
        this.initDataBind(disInfo);
      }
    }

    // const { sagaKey, submitExtraHandler, draftInfo } = this.props;
    // if (draftInfo && draftInfo.DRAFT_ID && draftInfo.DRAFT_ID > 0) {
    //   const url = `/api/mdcs/v1/common/distribute/distributeDeptByDraftIdHandler/${draftInfo.DRAFT_ID}`;
    //   submitExtraHandler(sagaKey, 'GET', url, {}, this.initData);
    // }
  }

  initDataBind = dept => {
    if (dept.APPV_MEMBER && dept.APPV_MEMBER.length > 0 && isJSON(dept.APPV_MEMBER)) {
      const deptArray = JSON.parse(dept.APPV_MEMBER);
      if (deptArray && deptArray.length > 0) {
        const distributeDept = deptArray.map(node => node.DEPT_NAME_KOR);
        this.setState({ distributeDept: distributeDept.toString().replaceAll(',', ' | ') });
      }
    }
  };

  render() {
    const { distributeDept } = this.state;
    return (
      <StyledWrap>
        {distributeDept && distributeDept.length > 0 && (
          <table className="mdcsDistDeptList">
            <thead>
              <tr className="mdcsDistDeptRow">
                <th>배포부서</th>
              </tr>
            </thead>
            <tbody>
              <tr className="mdcsDistDeptRow">
                <td>{distributeDept}</td>
              </tr>
            </tbody>
          </table>
        )}
      </StyledWrap>
    );
  }
}

export default MdcsDistDeptListComp;
