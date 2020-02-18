import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popover, Input, Select } from 'antd';

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
import xlxImg from './image/xls_file.gif';
import docImg from './image/doc_file.gif';
import pptImg from './image/ppt_file.gif';
import gifImg from './image/gif_file.gif';
import pdfImg from './image/pdf_file.gif';
import txtImg from './image/txt_file.gif';
import ftv2Img from './image/ftv2doc.gif';

const AntdTable = StyledAntdTable(Table);
const { Option } = Select;

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      data: [],
      selectedRowKeys: [],
      title: '',
      rechInstitution: '',
      rechGubun: '',
      regUserName: '',
      regUserDept: '',
      content: '',
    };
  }

  componentDidMount() {
    this.callList();
  }

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

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  deleteData = selectedRowKeys => {
    if (!selectedRowKeys) {
      return;
    }
    const fetchData = async r => {
      await request({
        url: 'http://eshs-dev.magnachip.com/api/eshs/v1/common/eshlawlist',
        method: 'DELETE',
        params: { TASK_SEQ: r },
      });
    };
    selectedRowKeys.map(r => fetchData(r).then(this.callList()));

    // 삭제후 선택된 rows 초기화
    this.setState({
      selectedRowKeys: [],
    });
  };

  onSearchSelect = value => {
    this.setState({ rechGubun: value });
  };

  onSearchValue = (type, value) => {
    switch (type) {
      case 'title':
        this.setState({ title: value });
        break;
      case 'rechInstitution':
        this.setState({ rechInstitution: value });
        break;
      case 'rechGubun':
        this.setState({ rechGubun: value });
        break;
      case 'regUserName':
        this.setState({ regUserName: value });
        break;
      case 'regUserDept':
        this.setState({ regUserDept: value });
        break;
      case 'content':
        this.setState({ content: value });
        break;
      default:
        break;
    }
  };

  searchData() {
    const fetchData = async () => {
      const result = await request({
        url: 'http://eshs-dev.magnachip.com/api/eshs/v1/common/eshlawlist',
        method: 'POST',
        params: {
          SEARCHYN: 1,
          TITLE: this.state.title,
          RECH_INSTITUTION: this.state.rechInstitution,
          RECH_GUBUN: this.state.rechGubun,
          REG_USER_NAME: this.state.regUserName,
          REG_USER_DEPT: this.state.regUserDept,
          CONTENT: this.state.content,
        },
      });
      if (result.response) {
        this.setState({
          data: result.response.list,
        });
      }
    };
    fetchData();
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

  imgSet = fileExt => {
    if (!fileExt || fileExt === '' || fileExt === undefined) {
      return;
    }
    let img = ftv2Img;

    if (fileExt === 'xls' || fileExt === 'xlsx') {
      img = xlxImg;
    } else if (fileExt === 'doc' || fileExt === 'docx') {
      img = docImg;
    } else if (fileExt === 'ppt' || fileExt === 'pptx') {
      img = pptImg;
    } else if (fileExt === 'jpg' || fileExt === 'gif') {
      img = gifImg;
    } else if (fileExt === 'pdf') {
      img = pdfImg;
    } else if (fileExt === 'txt') {
      img = txtImg;
    }
    return img;
  };

  setColumns = cols => {
    const columns = [
      {
        title: '법규구분',
        dataIndex: 'RECH_GUBUN_NM',
        key: 'RECH_GUBUN_NM',
      },
    ];
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

    columns.push(
      {
        title: '관리번호',
        dataIndex: 'RECH_NO',
        key: 'RECH_NO',
      },
      {
        title: '관련기관',
        dataIndex: 'RECH_INSTITUTION',
        key: 'RECH_INSTITUTION',
      },
      {
        title: '주요내용',
        dataIndex: 'CONTENT',
        key: 'CONTENT',
        render: key => (
          <span>
            <Popover placement="topLeft" title={key.replace(/(<([^>]+)>)/gi, '').replace('Powered by Froala Editor', '')} trigger="hover">
              <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100px', whiteSpace: 'nowrap' }}>
                {key.replace(/(<([^>]+)>)/gi, '').replace('Powered by Froala Editor', '')}
              </div>
            </Popover>
          </span>
        ),
      },
      {
        title: '관련문서',
        dataIndex: 'FILE_NAME',
        key: 'FILE_NAME',
        render: key => (
          <>
            {key && JSON.parse(key).length > 0
              ? JSON.parse(key).map(k => (
                  <Popover placement="topLeft" title={k.fileName} trigger="hover">
                    <a href={k.down}>
                      <img src={this.imgSet(k.fileExt)} alt={k.fileName} />
                    </a>
                  </Popover>
                ))
              : ''}
          </>
        ),
      },

      {
        title: '적용일자',
        dataIndex: 'REG_DTTM',
        key: 'REG_DTTM',
      },
      {
        title: '개정일자',
        dataIndex: 'UPD_DTTM',
        key: 'UPD_DTTM',
      },
      {
        title: '작성부서',
        dataIndex: 'REG_USER_DEPT',
        key: 'REG_USER_DEPT',
      },
      {
        title: '작성자',
        dataIndex: 'REG_USER_NAME',
        key: 'REG_USER_NAME',
      },
      {
        title: '상태',
        dataIndex: 'STATUS',
        key: 'STATUS',
      },
    );
    return columns;
  };

  renderList = (group, groupIndex) => {
    const columns = this.setColumns(group.rows[0].cols);
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: false,
    };
    return (
      <div key={group.key}>
        {group.useTitle && <GroupTitle title={group.title} />}
        <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
          <AntdTable
            rowKey="TASK_SEQ"
            key={`${group.key}_list`}
            className="view-designer-list"
            columns={columns}
            dataSource={this.state.data}
            rowSelection={rowSelection}
          />
        </Group>
      </div>
    );
  };

  render = () => {
    const { sagaKey: id, viewLayer, formData, workFlowConfig, loadingComplete, viewPageData, isOpenInputModal } = this.props;

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
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <span>법규정보</span>
                            </td>
                            <td>
                              <span>법규명</span>
                            </td>
                            <td>
                              <Input
                                className="input-width200"
                                value={this.state.title}
                                onChange={e => this.onSearchValue('title', e.target.value)}
                                placeholder="법규명"
                              />
                            </td>
                            <td>
                              <span>관련기관</span>
                            </td>
                            <td>
                              <Input
                                className="input-width200"
                                value={this.state.rechInstitution}
                                onChange={e => this.onSearchValue('rechInstitution', e.target.value)}
                                placeholder="관련기관"
                              />
                            </td>
                            <td>
                              <span>법규구분</span>
                            </td>
                            <td>
                              <Select style={{ width: 120 }} onChange={this.onSearchSelect} value={this.state.rechGubun}>
                                <Option value="">선택</Option>
                                <Option value="환경관련">환경관련 법규</Option>
                                <Option value="소방관련">소방관련 법규</Option>
                                <Option value="기타">기타</Option>
                                <Option value="규격 및 고객요구사항">규격 및 고객요구사항</Option>
                                <Option value="안전보건관련">안전보건관련 법규</Option>
                              </Select>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>작성자 정보</span>
                            </td>
                            <td>
                              <span>작성자</span>
                            </td>
                            <td>
                              <Input
                                className="input-width200"
                                value={this.state.regUserName}
                                onChange={e => this.onSearchValue('regUserName', e.target.value)}
                                placeholder="작성자"
                              />
                            </td>
                            <td>
                              <span>작성부서</span>
                            </td>
                            <td>
                              <Input
                                className="input-width200"
                                value={this.state.regUserDept}
                                onChange={e => this.onSearchValue('regUserDept', e.target.value)}
                                placeholder="작성부서"
                              />
                            </td>
                            <td>
                              <span>주요내용</span>
                            </td>
                            <td>
                              <Input
                                className="input-width200"
                                value={this.state.content}
                                onChange={e => this.onSearchValue('content', e.target.value)}
                                placeholder="주요내용"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </StyledSearchWrap>
                    <div align="right">
                      <StyledButton className="btn-primary" onClick={() => isOpenInputModal()}>
                        Add
                      </StyledButton>
                      <StyledButton className="btn-primary" onClick={() => this.deleteData(this.state.selectedRowKeys)}>
                        Delete
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
        </StyledViewDesigner>
      );
    }
    return '';
  };
}

ListPage.propTypes = {
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

ListPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
};

export default ListPage;
