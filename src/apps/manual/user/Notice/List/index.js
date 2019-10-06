import React, { Component } from 'react';
import { TreeSelect, Input, Button, Table } from 'antd';
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
    console.log(model, '모델');
    changeFormData(id, 'CONTENT', model);
  };

  render() {
    // select EVENT HANDLER
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
      <Styled>
        {(viewType === 'List' && (
          <React.Fragment>
            <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} pagination={{ defaultPageSize: 10, showQuickJumper: true }} />
            <div>
              <span className="totalNumberPage">{dataSource ? dataSource.length : 0} 건</span>
              <Button>엑셀목록 다운</Button>
              <Button
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
              <table className="designedTable">
                <tbody>
                  <tr>
                    <td>분류</td>
                    <td>
                      <Input style={{ width: 300, marginRight: 10 }} defaultValue={record.categorie} readOnly />
                    </td>
                  </tr>
                  <tr>
                    <td>제목</td>
                    <td>
                      <Input defaultValue={record.title} readOnly />
                    </td>
                  </tr>
                  <tr>
                    <td>최종수정자</td>
                    <td>{record.updUser}</td>
                  </tr>
                  <tr>
                    <td>내용</td>
                    <td>
                      <FroalaEditorView model={formData.CONTENT.length > 0 ? formData.CONTENT[0].DETAIL : formData.CONTENT} />
                    </td>
                  </tr>
                  <tr>
                    <td>첨부파일</td>
                    <td>
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
                  onClick={() => {
                    viewChange('List', -1);
                  }}
                >
                  돌아가기
                </Button>
                {profile.USER_ID === record.updUserId && (
                  <React.Fragment>
                    <Button
                      onClick={() => {
                        viewChange('Edit', record.key);
                        record.categorieId && changeFormData(id, 'NODE_ID', record.categorieId);
                      }}
                    >
                      편집하기
                    </Button>
                    <Button onClick={this.removeData}>삭제하기</Button>
                  </React.Fragment>
                )}
              </div>
            </React.Fragment>
          )) ||
          (viewType === 'Edit' && (
            <React.Fragment>
              <table className="designedTable editTable">
                <tbody>
                  <tr>
                    <td>분류</td>
                    <td>
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
                  <tr>
                    <td>제목</td>
                    <td>
                      <Input onChange={this.titleChange} defaultValue={record && record.title}></Input>
                    </td>
                  </tr>
                  <tr>
                    <td>최종수정자</td>
                    <td>{profile.NAME_KOR}</td>
                  </tr>
                  <tr>
                    <td>내용</td>
                    <td>
                      {' '}
                      {formData.hasOwnProperty('CONTENT') && (
                        <RichTextEditor saveTempContents={this.onChangeRichFormData} defaultValue={formData.CONTENT} config={froalaEditorConfig()} />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>첨부파일</td>
                    <td>
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
                      onClick={() => {
                        modifyTask(id, () => {
                          viewChange('View', record.key);
                        });
                      }}
                    >
                      편집완료
                    </Button>
                    <Button onClick={this.removeData}>삭제하기</Button>
                  </React.Fragment>
                ) : (
                  <Button
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
