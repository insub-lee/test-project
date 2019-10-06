import React, { Component } from 'react';
import { TreeSelect, Input, Button, Table } from 'antd';
import PropTypes from 'prop-types';
import Upload from 'apps/manual/components/xlsxFileUploader';
import RichTextEditor from 'components/FormStuff/RichTextEditor';
import FroalaEditorView from 'components/FormStuff/RichTextEditor/FroalaEditorView';
import { froalaEditorConfig } from 'components/FormStuff/config';
import { columns } from './ColumData';
import Styled from './Styled';
const getRowTree = (data, viewChange, selectedRecord) =>
  data.map(item => ({
    key: item.TASK_SEQ,
    categorie: item.NAME_KOR,
    categorieId: item.NODE_ID,
    updUser: item.USER_NAME,
    updUserId: item.UPD_USER_ID,
    title: item.TITLE,
    lastUpdate: item.UPD_DTTM,
    file: item.ATTACH > 0,
    viewChange,
    selectedRecord,
  }));
export default class NoticeList extends Component {
  componentDidMount() {}

  categorieOnChange = (value, selectedArray) => {
    const { changeFormData, id, selectedRecord, record } = this.props;
    changeFormData(id, 'NODE_ID', value);
    selectedRecord({ ...record, categorie: selectedArray[0], categorieId: value });
  };

  titleChange = e => {
    const { changeFormData, id } = this.props;
    changeFormData(id, 'TITLE', e.target.value);
  };

  saveEdit = () => {
    const { viewChange } = this.props;
    viewChange('List', -1);
  };

  removeData = () => {
    const { deleteTask, id, workSeq, taskSeq, viewChange } = this.props;
    deleteTask(id, workSeq, taskSeq);
    viewChange('List', -1);
  };

  onChangeFormData = detail => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'ATTACH', detail);
  };

  onChangeRichFormData = model => {
    const { id, changeFormData } = this.props;
    //   console.log(model, '모델');
    changeFormData(id, 'CONTENT', model);
  };

  render() {
    // select EVENT HANDLER 업데이트해야됨
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
      //   name: record.name,
      // }),
    };
    const {
      workSeq,
      selectedCategorie,
      filteredDataByKey,
      viewType,
      viewChange,
      selectedRecord,
      record,
      categoryData,
      id,
      saveTask,
      modifyTask,
      changeFormData,
      profile,
      formData,
      getTaskSeq,
    } = this.props;

    let dataSource = [];
    if (filteredDataByKey.length > 0) {
      dataSource = getRowTree(filteredDataByKey, viewChange, selectedRecord);
    }
    //  const viewField = list && list.filter(item => item.TASK_SEQ === taskSeq);
    return (
      <Styled className="manual-descriptions-view">
        {(viewType === 'List' && (
          <React.Fragment>
            <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} pagination={{ defaultPageSize: 10, showQuickJumper: true }} />
            <div>
              <span className="totalNumberPage">{dataSource ? dataSource.length : 0} 건</span>
              <Button
                type="button"
                className="btn-primary"
                onClick={() => {
                  viewChange('Edit', -1);
                  getTaskSeq(id, workSeq);
                  selectedCategorie && changeFormData(id, 'NODE_ID', selectedCategorie);
                }}
              >
                글쓰기
              </Button>
            </div>
          </React.Fragment>
        )) ||
          (viewType === 'View' && (
            <React.Fragment>
              <table>
                <tbody>
                  <tr className="manual-descriptions-row">
                    <td className="manual-descriptions-item-label manual-descriptions-item-colon">분류</td>
                    <td className="manual-descriptions-item-content">
                      <Input style={{ width: 300, marginRight: 10 }} defaultValue={record.categorie} readOnly />
                    </td>
                  </tr>
                  <tr className="manual-descriptions-row">
                    <td className="manual-descriptions-item-label manual-descriptions-item-colon">제목</td>
                    <td className="manual-descriptions-item-content">
                      <Input defaultValue={record.title} readOnly />
                    </td>
                  </tr>
                  <tr className="manual-descriptions-row">
                    <td className="manual-descriptions-item-label manual-descriptions-item-colon">최종수정자</td>
                    <td className="manual-descriptions-item-content">{record.updUser}</td>
                  </tr>
                  <tr className="manual-descriptions-row">
                    <td className="manual-descriptions-item-label manual-descriptions-item-colon">내용</td>
                    <td className="manual-descriptions-item-content">
                      <FroalaEditorView model={formData.CONTENT.length > 0 ? formData.CONTENT[0].DETAIL : formData.CONTENT} />
                    </td>
                  </tr>
                  <tr className="manual-descriptions-row">
                    <td className="manual-descriptions-item-label manual-descriptions-item-colon">첨부파일</td>
                    <td className="manual-descriptions-item-content">
                      <Upload
                        saveTempContents={this.onChangeFormData}
                        workSeq={this.props.workSeq}
                        taskSeq={this.props.taskSeq}
                        defaultValue={formData.ATTACH}
                        readOnly
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="EditButtons">
                <Button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    viewChange('List', -1);
                  }}
                >
                  돌아가기
                </Button>
                {profile.USER_ID === record.updUserId && (
                  <React.Fragment>
                    <Button
                      type="button"
                      className="btn-primary"
                      onClick={() => {
                        viewChange('Edit', record.key);
                        record.categorieId && changeFormData(id, 'NODE_ID', record.categorieId);
                      }}
                    >
                      편집하기
                    </Button>
                    <Button type="button" className="btn-primary" onClick={this.removeData}>
                      삭제하기
                    </Button>
                  </React.Fragment>
                )}
              </div>
            </React.Fragment>
          )) ||
          (viewType === 'Edit' && (
            <React.Fragment>
              <table>
                <tbody>
                  <tr className="manual-descriptions-row">
                    <td className="manual-descriptions-item-label manual-descriptions-item-colon">분류</td>
                    <td className="manual-descriptions-item-content">
                      <TreeSelect
                        name="categorie"
                        style={{ width: 300, marginRight: 10 }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeDefaultExpandAll
                        defaultValue={record.categorieId || selectedCategorie}
                        onChange={this.categorieOnChange}
                        treeData={categoryData}
                        placeholder="적용범위를 선택해주세요"
                      />
                    </td>
                  </tr>
                  <tr className="manual-descriptions-row">
                    <td className="manual-descriptions-item-label manual-descriptions-item-colon">제목</td>
                    <td className="manual-descriptions-item-content">
                      <Input onChange={this.titleChange} defaultValue={record && record.title}></Input>
                    </td>
                  </tr>
                  <tr className="manual-descriptions-row">
                    <td className="manual-descriptions-item-label manual-descriptions-item-colon">최종수정자</td>
                    <td className="manual-descriptions-item-content">{profile.NAME_KOR}</td>
                  </tr>
                  <tr className="manual-descriptions-row">
                    <td className="manual-descriptions-item-label manual-descriptions-item-colon">내용</td>
                    <td className="manual-descriptions-item-content">
                      {' '}
                      {formData.hasOwnProperty('CONTENT') && (
                        <RichTextEditor saveTempContents={this.onChangeRichFormData} defaultValue={formData.CONTENT} config={froalaEditorConfig()} />
                      )}
                    </td>
                  </tr>
                  <tr className="manual-descriptions-row">
                    <td className="manual-descriptions-item-label manual-descriptions-item-colon">첨부파일</td>
                    <td className="manual-descriptions-item-content">
                      <Upload
                        saveTempContents={this.onChangeFormData}
                        workSeq={this.props.workSeq}
                        taskSeq={this.props.taskSeq}
                        name={id}
                        defaultValue={formData.ATTACH}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="EditButtons">
                <Button
                  onClick={() => {
                    viewChange('List', -1);
                  }}
                >
                  돌아가기
                </Button>
                {Object.prototype.hasOwnProperty.call(record, 'key') ? (
                  <React.Fragment>
                    <Button
                      type="button"
                      className="btn-primary"
                      onClick={() => {
                        modifyTask(id, () => {
                          viewChange('View', record.key);
                        });
                      }}
                    >
                      편집완료
                    </Button>
                    <Button type="button" className="btn-primary" onClick={this.removeData}>
                      삭제하기
                    </Button>
                  </React.Fragment>
                ) : (
                  <Button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      saveTask(id, id, this.saveEdit);
                    }}
                  >
                    작성하기
                  </Button>
                )}
              </div>
            </React.Fragment>
          ))}
      </Styled>
    );
  }
}

NoticeList.defaultProps = {
  list: [],
  dataSource: [],
  selectedKey: '148',
};
NoticeList.propTypes = {
  changeFormData: PropTypes.func,
  id: PropTypes.string,
  selectedRecord: PropTypes.func,
  record: PropTypes.object,
  viewChange: PropTypes.func,
  deleteTask: PropTypes.func,
  workSeq: PropTypes.number,
  taskSeq: PropTypes.number,
  selectedCategorie: PropTypes.string,
  filteredDataByKey: PropTypes.array,
  viewType: PropTypes.string,
  categoryData: PropTypes.array,
  saveTask: PropTypes.func,
  modifyTask: PropTypes.func,
  profile: PropTypes.object,
  formData: PropTypes.object,
  getTaskSeq: PropTypes.func,
};
