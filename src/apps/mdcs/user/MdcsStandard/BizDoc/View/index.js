import React, { Component } from 'react';
import { Button, Input, TreeSelect, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { getTreeFromFlatData } from 'react-sortable-tree';

import FileUpload from 'components/FormStuff/Upload';
import FroalaEditorView from 'components/FormStuff/RichTextEditor/FroalaEditorView';
import { froalaEditorConfig } from 'components/FormStuff/config';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledContent from 'apps/mdcs/styled/Modals/StyledContent';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import WorkFlowBase from 'apps/Workflow/WorkFlowBase';

import * as Degree from 'apps/Workflow/WorkFlowBase/Nodes/Constants/modifyconst';

const getCategoryMapListAsTree = flatData =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
    })),

    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: 0,
  });

class BizDocListModify extends Component {
  state = { isDraftModal: false, degree: Degree.MAJOR };

  componentDidMount() {
    const { id, getExtraApiData, localApiArr } = this.props;
    getExtraApiData(id, localApiArr);
  }

  componentWillUnmount() {
    const { removeReduxState, id } = this.props;
    removeReduxState(id);
  }

  onCopyDescHandler = () => {
    const { formData } = this.props;

    if (formData && formData.hasOwnProperty('REMARK') && formData.REMARK.length > 0) {
      const { REMARK } = formData;
      if (REMARK[0].DETAIL !== '') {
        this.copyMark.onModelChange(REMARK[0].DETAIL);
        message.success(<MessageContent>복사 되었습니다.</MessageContent>, 3);
      } else {
        message.warning(<MessageContent>설명을 입력하세요.</MessageContent>, 3);
      }
    } else {
      message.warning(<MessageContent>에러가 발생하였습니다. 관리자에게 문의하세요.</MessageContent>, 3);
    }
  };

  setIsDraftModal = isDraftModal => this.setState({ isDraftModal });

  saveTaskAfter = (id, taskSeq, formData) => {
    this.setState({ isDraftModal: true, taskSeq, title: formData.TITLE, formData });
  };

  render() {
    const {
      saveTask,
      id,
      extraApiData,
      formData,
      workSeq,
      taskSeq,
      sp_rev,
      changeFormData,
      docNumber,
      selectedNodeId,
      fullNodeIds,
      draftType,
      metaList,
    } = this.props;
    // console.debug(this.props);
    console.error('this.props : ', this.props);
    const categoryData =
      extraApiData &&
      extraApiData.categoryMapInfo &&
      extraApiData.categoryMapInfo.categoryMapList &&
      getCategoryMapListAsTree(extraApiData.categoryMapInfo.categoryMapList.filter(x => x.USE_YN === 'Y')).length > 0
        ? getCategoryMapListAsTree(extraApiData.categoryMapInfo.categoryMapList.filter(x => x.USE_YN === 'Y'))[0]
        : [];

    const contentMeta = metaList && metaList.filter(meta => meta.COMP_TAG === 'rich-text-editor');
    const attachMeta = metaList && metaList.filter(meta => meta.COMP_TAG === 'file-upload');
    return (
      <StyledContent>
        <div>
          <div className="pop_tit">
            업무표준
            <button
              type="button"
              className="icon icon_pclose"
              onClick={() => {
                alert('닫기');
              }}
            />
          </div>
          <div className="pop_con">
            <div className="sub_form">
              <div className="tableBody">
                <Row>
                  <div className="leftTable">
                    <Col span={4}>문서번호</Col>
                    <Col span={8}>
                      <Input value={formData && formData.SP_ID} readOnly />
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={4}>Revision</Col>
                    <Col span={8}>
                      <Input value={formData && formData.VERSION && formData.VERSION.split('.')[0]} readOnly />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="w100Table">
                    <Col span={4}>Title</Col>
                    <Col span={20}>
                      <Input value={formData && formData.TITLE} readOnly />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="w100Table">
                    <Col span={4}> 적용범위 및 조회정보 선택</Col>
                    <Col span={20}>
                      <TreeSelect
                        name="scope"
                        style={{ width: 300, marginRight: 10 }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        disabled
                        value={formData && formData.SCOPE}
                        treeData={categoryData && categoryData.children}
                        placeholder="적용범위를 선택해주세요"
                      />
                    </Col>
                  </div>
                </Row>
                {contentMeta && contentMeta.length > 0 && formData.hasOwnProperty('REMARK') && (
                  <Row>
                    <div className="w100Table">
                      <Col span={4}> Description of Change(From/To)</Col>
                      <Col span={20}>
                        <FroalaEditorView model={formData.REMARK.length > 0 ? formData.REMARK[0].DETAIL : formData.REMARK} />
                      </Col>
                    </div>
                  </Row>
                )}
                {contentMeta && contentMeta.length > 0 && formData.hasOwnProperty('COPY_REMARK') && (
                  <Row>
                    <div className="w100Table">
                      <Col span={4}>
                        재개정 이력
                        <StyledButton className="btn-gray btn-xs" onClick={() => this.onCopyDescHandler()}>
                          Copy Description
                        </StyledButton>
                      </Col>
                      <Col span={20}>
                        <FroalaEditorView model={formData.COPY_REMARK.length > 0 ? formData.COPY_REMARK[0].DETAIL : formData.COPY_REMARK} />
                      </Col>
                    </div>
                  </Row>
                )}
                <Row>
                  <div className="w100Table">
                    <Col span={4}>첨부파일</Col>
                    <Col span={20}>
                      <Row>
                        <div className="w100Table">
                          <Col span={6} className="attachTitle">
                            별첨#(본문내용)
                          </Col>
                          <Col span={18}>
                            {formData && formData.ATTACH && (
                              <FileUpload
                                workSeq={workSeq}
                                taskSeq={taskSeq}
                                defaultValue={formData.ATTACH}
                                saveTempContents={detail => {
                                  this.handlerAttachChange(detail, 'ATTACH');
                                }}
                                multiple={false}
                              ></FileUpload>
                            )}
                          </Col>
                        </div>
                      </Row>
                      <Row>
                        <div className="w100Table">
                          <Col span={6} className="attachTitle">
                            별첨#1(서식지 or 기술자료)
                          </Col>
                          <Col span={18}>
                            {formData && formData.ATTACH2 && (
                              <FileUpload
                                workSeq={workSeq}
                                taskSeq={taskSeq}
                                defaultValue={formData.ATTACH2}
                                saveTempContents={detail => {
                                  this.handlerAttachChange(detail, 'ATTACH2');
                                }}
                                multiple={false}
                              ></FileUpload>
                            )}
                          </Col>
                        </div>
                      </Row>
                      <Row>
                        <div className="w100Table">
                          <Col span={6} className="attachTitle">
                            별첨#2(기술자료)
                          </Col>
                          <Col span={18}>
                            {formData && formData.ATTACH3 && (
                              <FileUpload
                                workSeq={workSeq}
                                taskSeq={taskSeq}
                                defaultValue={formData.ATTACH3}
                                saveTempContents={detail => {
                                  this.handlerAttachChange(detail, 'ATTACH3');
                                }}
                                multiple={false}
                              ></FileUpload>
                            )}
                          </Col>
                        </div>
                      </Row>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <Col>
                    <WorkFlowBase
                      viewType="draft"
                      isDraftModal={this.state.isDraftModal}
                      setIsDraftModal={this.setIsDraftModal}
                      selectedInitDraft={{ REL_TYPE: 1, REL_KEY: { WORK_SEQ: workSeq, TASK_SEQ: this.state.taskSeq }, PRC_ID: 138, TITLE: this.state.title }}
                      draftCompleteFunc={this.props.onCloseModleHandler}
                      externalData={{ draftType, fullNodeIds, degree: this.state.degree }}
                      formData={this.state.formData}
                    />
                  </Col>
                </Row>
                <Row>
                  <div className="btn-wrap">
                    <Button onClick={() => false} style={{ display: 'none' }}>
                      임시저장
                    </Button>
                    <StyledButton
                      className="btn-light btn-first"
                      onClick={() => {
                        alert('닫기');
                      }}
                    >
                      닫기
                    </StyledButton>
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </StyledContent>
    );
  }
}
export default BizDocListModify;

BizDocListModify.propTypes = {
  categoryMapInfo: PropTypes.object,
  workSeq: PropTypes.number,
  apiArr: PropTypes.array,
  sp_id: PropTypes.string,
  sp_rev: PropTypes.number,
  localApiArr: PropTypes.array,
  docNum: PropTypes.object,
  onChangeFormData: PropTypes.func,
};
BizDocListModify.defaultProps = {
  sp_id: ' ',
  sp_rev: 0,
  docNum: {},
  localApiArr: [{ key: 'categoryMapInfo', url: `/api/admin/v1/common/categoryMapList?MAP_ID=7`, type: 'GET' }],
};
