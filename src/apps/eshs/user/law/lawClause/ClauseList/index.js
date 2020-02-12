import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Input, Select } from 'antd';

import request from 'utils/request';
import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import LawModal from '../../lawModal';

const AntdTable = StyledAntdTable(Table);
const Option = Select;

class ClauseListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      data: [],
      isOpenModal: false,
      selectedRechNo: '',
      selectedLawName: '',
      selectedRegUserName: '',
    };
  }

  componentDidMount() {
    this.callList();
  }

  isOpenLawModal = () => {
    this.setState({ isOpenModal: true });
  };

  onCancel = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  onSelected = rowData => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'MASTER_SEQ', rowData.TASK_SEQ);
    this.setState({ selectedRechNo: rowData.RECH_NO, selectedLawName: rowData.TITLE, selectedRegUserName: rowData.REG_USER_NAME });
    this.onCancel();
  };

  callList = () => {
    const fetchData = async () => {
      const result = await request({
        url: 'http://eshs-dev.magnachip.com/api/eshs/v1/common/eshlawlist',
        method: 'GET',
      });
      if (result.response) {
        this.setState({
          data: result.response.list,
        });
      }
    };
    fetchData();
  };

  searchData() {
    console.log('searchData 개발 중');
  }

  renderComp = (comp, colData, rowData, visible) => {
    if (comp.CONFIG.property.COMP_SRC && comp.CONFIG.property.COMP_SRC.length > 0 && CompInfo[comp.CONFIG.property.COMP_SRC]) {
      return CompInfo[comp.CONFIG.property.COMP_SRC].renderer({
        ...comp,
        colData,
        rowData,
        ...this.props,
        visible,
      });
    }
    return <div />;
  };

  setColumns = cols => {
    const columns = [];
    cols.forEach(node => {
      if (node.comp && node.comp.COMP_FIELD) {
        columns.push({
          dataIndex: node.comp.COMP_FIELD,
          title: node.comp.CONFIG.property.HEADER_NAME_KOR,
          width: node.style.width,
          render: (text, record) => this.renderComp(node.comp, text, record, true),
        });
      }
    });

    return columns;
  };

  renderList = (group, groupIndex) => {
    const columns = this.setColumns(group.rows[0].cols);

    return (
      <div key={group.key}>
        {group.useTitle && <GroupTitle title={group.title} />}
        <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
          <AntdTable rowKey="TASK_SEQ" key={`${group.key}_list`} className="view-designer-list" columns={columns} dataSource={this.state.data} />
        </Group>
      </div>
    );
  };

  render = () => {
    const { sagaKey: id, viewLayer, workFlowConfig, loadingComplete, viewPageData, changeViewPage } = this.props;

    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const {
        layer: { groups },
        bodyStyle,
      } = viewLayerData;
      const {
        info: { PRC_ID },
      } = workFlowConfig;

      // 로딩
      if (this.props.isLoading === false && this.state.initLoading) {
        this.setState(
          {
            initLoading: false,
          },
          () => loadingComplete(),
        );
      }
      return (
        <StyledViewDesigner>
          <Sketch {...bodyStyle}>
            {groups.map((group, groupIndex) => {
              if (group.type === 'listGroup') {
                return this.renderList(group, groupIndex);
              }
              return (
                <div key={group.key}>
                  {group.useTitle && <GroupTitle title={group.title} />}
                  <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
                    <StyledSearchWrap>
                      <div className="seach-group-layer"></div>
                      <div className="seach-group-layer"></div>
                      <div className="seach-group-layer"></div>
                      <div className="seach-group-layer"></div>

                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <span className="ant-select">법규</span>
                            </td>
                            <td>
                              <Input className="input-width200" value={this.state.selectedRechNo} placeholder="관리 번호" readOnly />
                              <Input className="input-width200" value={this.state.selectedLawName} placeholder="법규명" readOnly />
                              <StyledButton className="btn-primary" onClick={() => this.isOpenLawModal()} readOnly>
                                Law Search
                              </StyledButton>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>작성자</span>
                            </td>
                            <td>
                              <Input className="input-width200" value={this.state.selectedRegUserName} placeholder="작성자" readOnly />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>법령</span>
                            </td>
                            <td>
                              <Select className="input-width120" defaultValue="0">
                                <Option value="0">선택</Option>
                                <Option value="001">법</Option>
                                <Option value="002">시행령</Option>
                                <Option value="003">시행규칙</Option>
                                <Option value="004">기타</Option>
                              </Select>
                            </td>
                            <td>
                              <span>주요 법규 내용(요약)</span>
                            </td>
                            <td>
                              <Input className="input-width200" value={undefined} placeholder="주요 법규 내용(요약)" readOnly />
                            </td>
                            <td>
                              <span>운영 현황</span>
                            </td>
                            <td>
                              <Input className="input-width200" value={undefined} placeholder="운영 현황" readOnly />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>대응부서</span>
                            </td>
                            <td>
                              <Input className="input-width200" value={undefined} placeholder="대응부서" readOnly />
                            </td>
                            <td>
                              <span>책임자</span>
                            </td>
                            <td>
                              <Input className="input-width200" value={undefined} placeholder="책임자" readOnly />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </StyledSearchWrap>
                    <div align="right">
                      <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
                        Add
                      </StyledButton>
                      <StyledButton className="btn-primary" onClick={() => this.searchData()}>
                        Search
                      </StyledButton>
                    </div>
                  </Group>
                </div>
              );
            })}
          </Sketch>
          <Modal visible={this.state.isOpenModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
            <div>{this.state.isOpenModal && <LawModal onCancel={this.onCancel} onSelected={this.onSelected} />}</div>
          </Modal>
        </StyledViewDesigner>
      );
    }
    return '';
  };
}

ClauseListPage.propTypes = {
  sagaKey: PropTypes.string,
  workFlowConfig: PropTypes.object,
  workPrcProps: PropTypes.object,
  viewLayer: PropTypes.array,
  formData: PropTypes.object,
  processRule: PropTypes.object,
  getProcessRule: PropTypes.func,
  onCloseModleHandler: PropTypes.func,
  saveTask: PropTypes.func,
  setProcessRule: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingComplete: PropTypes.func,
  columns: PropTypes.array,
};

ClauseListPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
};

export default ClauseListPage;
