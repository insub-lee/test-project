import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

import StyledNode from '../StyledNode';

const { Option } = Select;
class NodeRegist extends Component {
  componentDidMount() {
    const { id, setFormData, initNode, actionType } = this.props;
    if (actionType === 'I') setFormData(id, initNode);
  }

  render() {
    const { id, formData } = this.props;
    console.debug('NodeRegit', this.props);
    return (
      <StyledNode>
        <table className="adminTbl">
          <tbody>
            <tr>
              <th className="required">
                <label htmlFor="v2">노드명(KOR)</label>
              </th>
              <td>
                <Input value={formData.NAME_KOR} onChange={e => this.props.changeFormData(id, 'NAME_KOR', e.target.value)} style={{ width: '300px' }} />
              </td>
            </tr>
            <tr>
              <th className="required">
                <label htmlFor="v2">노드형식</label>
              </th>
              <td>
                {console.debug(formData.NODE_TYPE)}
                <Select
                  value={ formData.NODE_TYPE}
                  onChange={val => this.props.changeFormData(id, 'NODE_TYPE', val)}
                  style={{ width: '300px' }}
                  placeholder="노드유형을 선택해주세요"
                >
                  <Option value="NU">사용자</Option>
                  <Option value="ND">부서</Option>
                  <Option value="NG">그룹</Option>
                  <Option value="NS">시스템</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="v2">노드경로</label>
              </th>
              <td>
                <Input value={formData.SRC_PATH} onChange={e => this.props.changeFormData(id, 'SRC_PATH', e.target.value)} />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="v2">서비스 클래스명</label>
              </th>
              <td>
                <Input value={formData.CLASSNAME} onChange={e => this.props.changeFormData(id, 'CLASSNAME', e.target.value)} />
              </td>
            </tr>
            <tr>
              <th className="required">
                <label htmlFor="v2">처리주체</label>
              </th>
              <td>
                <Select
                  value={formData.NODE_GUBUN === null ? undefined : formData.NODE_GUBUN}
                  onChange={val => this.props.changeFormData(id, 'NODE_GUBUN', val)}
                  style={{ width: '300px' }}
                  placeholder="처리주체를 선택해주세요"
                >
                  <Option value={1}>사용자</Option>
                  <Option value={9}>시스템</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <th className="required">
                <label htmlFor="v2">결재라인 표시설정</label>
              </th>
              <td>
                <Select
                  value={formData.VIEW_TYPE === null ? undefined : formData.VIEW_TYPE}
                  onChange={val => this.props.changeFormData(id, 'VIEW_TYPE', val)}
                  style={{ width: '300px' }}
                  placeholder="표시형식 선택해주세요"
                >
                  <Option value={1}>결재라인(인장)에 표시</Option>
                  <Option value={2}>수신 & 참조라인에 표시</Option>
                  <Option value={9}>표시하지 않음</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="v2">노드옵션</label>
              </th>
              <td>
                <Input value={formData.NODE_OPTION} onChange={e => this.props.changeFormData(id, 'NODE_OPTION', e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>
      </StyledNode>
    );
  }
}

NodeRegist.propTypes = {
  match: PropTypes.object.isRequired,
  initNode: PropTypes.object,
  getNodeDetail: PropTypes.func,
  saveNode: PropTypes.func,
  updateNode: PropTypes.func,
  changeFormData: PropTypes.func,
};

NodeRegist.defaultProps = {
  initNode: {
    NODE_ID: -1,
    NAME_KOR: '',
    CLASSNAME: '',
    SRC_PATH: '',
    NODE_OPTION: '',
    NODE_TYPE: undefined,
    ORD: 1,
    NODE_GUBUN: undefined,
    USE_YN: undefined,
    VIEW_TYPE: undefined,
  },
};

export default NodeRegist;
