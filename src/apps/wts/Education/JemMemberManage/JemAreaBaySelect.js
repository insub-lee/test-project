import React, { Component } from 'react';
import { Select, message, Row, Col } from 'antd';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import Wrapper from './ModalWrapper';
import StyledTable from '../../StyledTable';

const { Option } = Select;

class JemAreaBaySelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      areaList: [],
      bayList: [],
      areaNodeId: undefined,
      bayNodeId: undefined,
    };
  }

  componentDidMount() {
    const { categoryMapList } = this.props;
    if (categoryMapList) {
      const areaList = categoryMapList
        .filter(fNode => fNode.LVL === 1)
        .sort((a, b) => (a.NODE_ORDINAL < b.NODE_ORDINAL ? -1 : 1))
        .map(node => <Option value={node.NODE_ID}>{node.NAME_KOR}</Option>);
      this.setState({ areaList });
    }
  }

  onChangeArea = value => {
    const { categoryMapList } = this.props;

    const bayList = categoryMapList
      .filter(fNode => fNode.LVL === 2 && fNode.PARENT_NODE_ID === value)
      .sort((a, b) => (a.NODE_ORDINAL < b.NODE_ORDINAL ? -1 : 1))
      .map(node => <Option value={node.NODE_ID}>{node.NAME_KOR}</Option>);
    this.setState({ bayList, areaNodeId: value, bayNodeId: undefined });
  };

  onChangeBay = value => this.setState({ bayNodeId: value });

  saveJemMemberData = () => {
    const { areaNodeId, bayNodeId } = this.state;
    const { categoryMapList, saveJemMemberData } = this.props;
    if (areaNodeId && bayNodeId) {
      let area = 'ALL';
      let bay = 'ALL';
      if (areaNodeId !== -999) {
        const areaIdx = categoryMapList.findIndex(node => node.NODE_ID === areaNodeId);
        area = categoryMapList[areaIdx].NAME_KOR;
      }
      if (bayNodeId !== -999) {
        const bayIdx = categoryMapList.findIndex(node => node.NODE_ID === bayNodeId);
        bay = categoryMapList[bayIdx].NAME_KOR;
      }
      saveJemMemberData(area, bay);
    } else {
      if (areaNodeId) message.warning('Area가 선택되지 않았습니다.');
      if (bayNodeId) message.warning('Bay가 선택되지 않았습니다.');
    }
  };

  render() {
    const { checkedList, onCancelModal } = this.props;
    const { areaList, bayList, bayNodeId } = this.state;
    return (
      <Wrapper>
        <div className="title">
          <span>대상자</span>
        </div>
        <Row align="middle">
          <Col span={18}>
            <StyledTable className="tb_wrap">
              <table className="tb02 tbCateTable">
                <colgroup>
                  <col width="50%" />
                  <col width="25%" />
                  <col width="25%" />
                </colgroup>
                <tbody>
                  <tr className="bd">
                    <th>부서</th>
                    <th>이름</th>
                    <th>사번</th>
                  </tr>
                  {checkedList &&
                    checkedList.map(rowData => (
                      <tr className="bd" key={rowData.USER_ID}>
                        <td className="alignMid">{rowData.DEPT_NAME}</td>
                        <td className="alignMid">{rowData.USER_NAME}</td>
                        <td className="alignMid">{rowData.EMP_NO}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </StyledTable>
          </Col>
          <Col span={6}>
            <div className="select_wrap">
              <div className="select_area_wrap">
                <span className="title_span">Area</span>
                <Select className="select_area" placeholder="Area 선택" onChange={this.onChangeArea}>
                  <Option value={-999}>ALL</Option>
                  {areaList}
                </Select>
              </div>
              <div>
                <span className="title_span">Bay</span>
                <Select className="select_bay" placeholder="Bay 선택" value={bayNodeId} onChange={this.onChangeBay}>
                  <Option value={-999}>ALL</Option>
                  {bayList}
                </Select>
              </div>
            </div>
          </Col>
        </Row>
        <div className="btn_wrap">
          <StyledButton type="button" className="btn-sm btn-gray mr5" onClick={this.saveJemMemberData}>
            저장
          </StyledButton>
          <StyledButton type="button" className="btn-sm btn-gray" onClick={onCancelModal}>
            취소
          </StyledButton>
        </div>
      </Wrapper>
    );
  }
}
export default JemAreaBaySelect;
