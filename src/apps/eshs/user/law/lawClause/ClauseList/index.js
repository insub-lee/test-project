import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popover, Modal } from 'antd';

import request from 'utils/request';
import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import Contents from 'components/BizBuilder/Common/Contents';
import LawModal from '../../lawModal';

const AntdTable = StyledAntdTable(Table);

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
    const { sagaKey: id, viewLayer, formData, workFlowConfig, loadingComplete, viewPageData, changeViewPage } = this.props;

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
                    <table className={`view-designer-table table-${groupIndex}`}>
                      <tbody>
                        <tr>
                          <td>법규</td>
                          <td>
                            <input value={this.state.selectedRechNo} placeholder="관리 번호" readOnly />
                          </td>
                          <td>
                            <input value={this.state.selectedLawName} placeholder="법규명" readOnly />
                            <input type="button" value="법규검색" onClick={() => this.isOpenLawModal()} readOnly />
                          </td>
                        </tr>
                        <tr>
                          <td>작성자</td>
                          <td>
                            <input value={this.state.selectedRegUserName} placeholder="작성자" readOnly />
                          </td>
                        </tr>
                        <tr>
                          {/* onChangeHandler 작성할 것 */}
                          <td>법령</td>
                          <td colSpan="2">
                            <select defaultValue={0}>
                              <option value="0">선택</option>
                              <option value="001">법</option>
                              <option value="002">시행령</option>
                              <option value="003">시행규칙</option>
                              <option value="004">기타</option>
                            </select>
                          </td>
                          <td>주요 법규 내용(요약)</td>
                          <td>
                            <input value={undefined} placeholder="주요 법규 내용(요약)" readOnly />
                          </td>
                          <td>운영 현황</td>
                          <td>
                            <input value={undefined} placeholder="운영 현황" readOnly />
                          </td>
                        </tr>
                        <tr>
                          <td>대응부서</td>
                          <td colSpan="2">
                            <input value={undefined} placeholder="대응부서" readOnly />
                          </td>
                          <td>책임자</td>
                          <td>
                            <input value={undefined} placeholder="책임자" readOnly />
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
