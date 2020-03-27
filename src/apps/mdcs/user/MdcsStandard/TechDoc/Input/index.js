import React, { Component } from 'react';
import { Button, Input, Row, Col, Modal, Radio } from 'antd';
import PropTypes from 'prop-types';
import RichTextEditor from 'components/FormStuff/RichTextEditor';
import { froalaEditorConfig } from 'components/FormStuff/config';
import FileUpload from 'components/FormStuff/Upload';
import StyledContent from 'apps/mdcs/styled/Modals/StyledContent';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledModalWrapper from 'apps/mdcs/styled/Modals/StyledModalWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import WorkFlowBase from 'apps/Workflow/WorkFlowBase';
import * as Degree from 'apps/Workflow/WorkFlowBase/Nodes/Constants/modifyconst';
import CheckSelectList from '../../../../components/CheckSelectList/selectable';

const AntdModal = StyledModalWrapper(Modal);

class TechDocInput extends Component {
  state = {
    scopeModal: false,
    prevRegion: '',
    prevFab: '',
    prevProduct: '',
    prevTech: '',
    prevGen: '',
    prevDensity: '',
    prevPkg: '',
    prevModule: '',
    prevCustomer: '',
    REGION: '',
    FAB: '',
    PRODUCT: '',
    TECH: '',
    GEN: '',
    DENSITY: '',
    PKG: '',
    MODULE: '',
    CUSTOMER: '',
    isDraftModal: false,
    taskSeq: -1,
    formData: {},
    degree: Degree.MAJOR,
  };

  componentDidMount() {
    const { getExtraApiData, id, localApiArr, getTaskSeq, workSeq } = this.props;
    getExtraApiData(id, localApiArr);
    // getTaskSeq(id, workSeq);
  }

  onChangeScopeHandler = item => {
    const { changeFormData, id } = this.props;
    const { selectedText, selectedItems } = item;
    const { groupKey, selectedValue } = selectedItems;
    changeFormData(id, groupKey, selectedValue);
    this.setState({ [groupKey]: selectedText });
  };

  handlerRemarkChange = (model, name) => {
    const { id, changeFormData } = this.props;
    changeFormData(id, name, model);
  };

  handlerAttachChange = (detail, name) => {
    const { id, changeFormData } = this.props;
    changeFormData(id, name, detail);
  };

  handlerCopyDesc = () => {
    const { formData } = this.props;
    formData.hasOwnProperty('REMARK');
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

  handlerModalOpen = () => {
    const { REGION, FAB, PRODUCT, TECH, GEN, DENSITY, PKG, MODULE, CUSTOMER } = this.props.formData;
    this.setState({
      scopeModal: true,
      prevRegion: REGION,
      prevFab: FAB,
      prevProduct: PRODUCT,
      prevTech: TECH,
      prevGen: GEN,
      prevDensity: DENSITY,
      prevPkg: PKG,
      prevModule: MODULE,
      prevCustomer: CUSTOMER,
    });
  };

  handlerModalOk = () => {
    const { formData, changeFormData, id } = this.props;
    const { REGION, FAB, PRODUCT, TECH, GEN, DENSITY, PKG, MODULE, CUSTOMER } = this.state;

    if (formData.FAB && formData.FAB === ' ') {
      message.warning(<MessageContent>적용Line/Site는 반드시 선택이 되어야 합니다.</MessageContent>, 3);
      return;
    }
    if (formData.PRODUCT && formData.PRODUCT === ' ') {
      message.warning(<MessageContent>적용Product는 반드시 선택이 되어야 합니다.</MessageContent>, 3);
      return;
    }
    const nameScope = `SITE:${REGION} | FAB:${FAB} | Tech:${TECH} | Generation:${GEN} | Density:${DENSITY} | PKG Type:${PKG} | Product:${PRODUCT} |  Module:${MODULE} | Customer:${CUSTOMER} `;
    changeFormData(id, 'SCOPE', nameScope);

    this.setState({ scopeModal: false });
  };

  handlerModalCancel = () => {
    const { changeFormData, id } = this.props;
    const { prevRegion, prevFab, prevProduct, prevTech, prevGen, prevDensity, prevPkg, prevModule, prevCustomer } = this.state;
    const resetValue = [prevRegion, prevFab, prevProduct, prevTech, prevGen, prevDensity, prevPkg, prevModule, prevCustomer];
    const resetKey = ['REGION', 'FAB', 'PRODUCT', 'TECH', 'GEN', 'DENSITY', 'PKG', 'MODULE', 'CUSTOMER'];
    resetKey.forEach((key, index) => changeFormData(id, key, resetValue[index]));
    this.setState({ scopeModal: false, REGION: '', FAB: '', PRODUCT: '', TECH: '', GEN: '', DENSITY: '', PKG: '', MODULE: '', CUSTOMER: '' });
  };

  clientValidation = () => {
    const { formData } = this.props;
    if (!formData) {
      message.warning(<MessageContent></MessageContent>, 3);
      return false;
    }
    if (formData.TITLE === '' || formData.TITLE === ' ') {
      message.warning(<MessageContent>제목을 입력하세요.</MessageContent>, 3);
      return false;
    }
    if (formData.SCOPE === '' || formData.SCOPE === ' ') {
      message.warning(<MessageContent>적용범위를 선택해 주세요</MessageContent>, 3);
      return false;
    }
    if (formData.FMEA_FLAG === '' || formData.FMEA_FLAG === ' ') {
      message.warning(<MessageContent>FMEA를 선택해 주세요</MessageContent>, 3);
      return false;
    }
    if (formData.FMEA_FLAG === '2' && formData.FMEA_DESC[0].DETAIL === '') {
      message.warning(<MessageContent>Description of FMEA를 입력해 주세요</MessageContent>, 3);
      return false;
    }

    return true;
  };

  onClickSave = () => {
    const { changeFormData, id, sp_rev, saveTask, formData, taskSeq, docNumber, selectedNodeId } = this.props;
    changeFormData(id, 'NODE_ID', selectedNodeId);
    changeFormData(id, 'SP_ID', docNumber);
    changeFormData(id, 'SP_REV', sp_rev);
    changeFormData(id, 'VERSION', '0.0');

    saveTask(id, id, this.saveTaskAfter);
    if (formData && formData.CHANGE === ' ') {
      changeFormData(id, 'CHANGE', this.state.degree);
    }
    if (this.clientValidation()) {
      message.success(<MessageContent>등록 성공</MessageContent>, 3);
      saveTask(id, id, this.saveTaskAfter);
    }
  };

  setIsDraftModal = isDraftModal => this.setState({ isDraftModal });

  saveTaskAfter = (id, taskSeq, formData) => {
    this.setState({ isDraftModal: true, taskSeq, title: formData.TITLE, formData });
  };

  render() {
    const {
      id,
      extraApiData: { siteList, lineSiteList, productList, techList, generationList, densityList, pkgList, moduleList, customerList },
      formData,
      workSeq,
      taskSeq,
      metaList,
      changeFormData,
      docNumber,
      fullNodeIds,
      draftType,
    } = this.props;

    const contentMeta = metaList.filter(meta => meta.COMP_TAG === 'rich-text-editor');
    const attachMeta = metaList.filter(meta => meta.COMP_TAG === 'file-upload');
    return (
      <StyledContent>
        <div>
          <div className="pop_tit">
            기술표준
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
              <Row>
                <div className="leftTable">
                  <Col span={4}>문서번호</Col>
                  <Col span={8}>
                    <Input value={docNumber} readOnly />
                  </Col>
                </div>
                <div className="rightTable">
                  <Col span={4}>Revision</Col>
                  <Col span={8}>
                    <Input value="0" readOnly />
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={4}>Title</Col>
                  <Col span={20}>
                    <Input
                      onChange={e => {
                        changeFormData(id, 'TITLE', e.target.value);
                      }}
                      value={formData.TITLE}
                    />
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={4}> 적용범위 및 조회정보 선택</Col>
                  <Col span={10}>{formData && formData.SCOPE}</Col>
                  <Col span={10}>
                    <AntdModal
                      className="modalWrapper"
                      width={1280}
                      visible={this.state.scopeModal}
                      onOk={this.handlerModalOk}
                      onCancel={this.handlerModalCancel}
                      destroyOnClose
                    >
                      <CheckSelectList
                        onChange={this.onChangeScopeHandler}
                        sourceData={[
                          {
                            groupName: 'Site',
                            groupKey: 'REGION',
                            dataSet: siteList && siteList.categoryMapList ? siteList.categoryMapList : [],
                            defaultSelected: formData && formData.REGION,
                          },
                          {
                            groupName: 'Line/Site',
                            groupKey: 'FAB',
                            dataSet: lineSiteList && lineSiteList.categoryMapList ? lineSiteList.categoryMapList : [],
                            defaultSelected: formData && formData.FAB,
                          },
                          {
                            groupName: 'Product',
                            groupKey: 'PRODUCT',
                            dataSet: productList && productList.categoryMapList ? productList.categoryMapList : [],
                            defaultSelected: formData && formData.PRODUCT,
                          },
                          {
                            groupName: 'Tech.',
                            groupKey: 'TECH',
                            dataSet: techList && techList.categoryMapList ? techList.categoryMapList : [],
                            defaultSelected: formData && formData.TECH,
                          },
                          {
                            groupName: 'Generation',
                            groupKey: 'GEN',
                            dataSet: generationList && generationList.categoryMapList ? generationList.categoryMapList : [],
                            defaultSelected: formData && formData.GEN,
                          },
                          {
                            groupName: 'Memory Density',
                            groupKey: 'DENSITY',
                            dataSet: densityList && densityList.categoryMapList ? densityList.categoryMapList : [],
                            defaultSelected: formData && formData.DENSITY,
                          },
                          {
                            groupName: 'PKG',
                            groupKey: 'PKG',
                            dataSet: pkgList && pkgList.categoryMapList ? pkgList.categoryMapList : [],
                            defaultSelected: formData && formData.PKG,
                          },
                          {
                            groupName: 'Module',
                            groupKey: 'MODULE',
                            dataSet: moduleList && moduleList.categoryMapList ? moduleList.categoryMapList : [],
                            defaultSelected: formData && formData.MODULE,
                          },
                          {
                            groupName: 'Customer',
                            groupKey: 'CUSTOMER',
                            dataSet: customerList && customerList.categoryMapList ? customerList.categoryMapList : [],
                            defaultSelected: formData && formData.CUSTOMER,
                          },
                        ]}
                      ></CheckSelectList>
                    </AntdModal>
                    <Button onClick={() => this.handlerModalOpen()}>적용범위 선택</Button>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={4}>Significance Of Change</Col>
                  <Col span={20}>
                    <Radio.Group
                      onChange={e => {
                        this.setState({
                          degree: e.target.value,
                        });
                        changeFormData(id, 'CHANGE', e.target.value);
                      }}
                      value={this.state.degree}
                    >
                      <Radio value={Degree.MAJOR}>Major</Radio>
                      <Radio value={Degree.MINOR}>Minor</Radio>
                    </Radio.Group>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={4}>FMEA 대상</Col>
                  <Col span={20}>
                    <Radio.Group
                      onChange={e => {
                        changeFormData(id, 'FMEA_FLAG', e.target.value);
                      }}
                      value={formData && formData.FMEA_FLAG === ' ' ? undefined : formData.FMEA_FLAG}
                    >
                      ( <Radio value="1">실시</Radio>
                      <Radio value="2">미실시</Radio>) <Radio value="3">비대상</Radio>
                    </Radio.Group>
                  </Col>
                </div>
              </Row>
              <div className="line" />
              {contentMeta && contentMeta.length > 0 && formData.hasOwnProperty('REMARK') && (
                <Row>
                  <div className="w100Table">
                    <Col span={4}> Description of Change(From/To)</Col>
                    <Col span={20}>
                      <RichTextEditor name="REMARK" saveTempContents={this.handlerRemarkChange} config={froalaEditorConfig()} defaultValue={formData.REMARK} />
                    </Col>
                  </div>
                </Row>
              )}
              {contentMeta && contentMeta.length > 0 && formData.hasOwnProperty('FMEA_DESC') && (
                <Row className={formData && formData.FMEA_FLAG === '2' ? 'show' : 'noShow'}>
                  <div className="w100Table">
                    <Col span={4}> Description of FMEA</Col>
                    <Col span={20}>
                      <RichTextEditor
                        name="FMEA_DESC"
                        saveTempContents={this.handlerRemarkChange}
                        config={froalaEditorConfig()}
                        defaultValue={formData.FMEA_DESC}
                      />
                    </Col>
                  </div>
                </Row>
              )}
              {contentMeta && contentMeta.length > 0 && formData.hasOwnProperty('COPY_REMARK') && (
                <Row>
                  <div className="w100Table">
                    <Col span={4}>
                      재개정 이력
                      <StyledButton className="btn-gray btn-xs" onClick={this.handlerCopyDesc}>
                        Copy Description
                      </StyledButton>
                    </Col>
                    <Col span={20}>
                      <RichTextEditor
                        ref={ref => {
                          this.copyMark = ref;
                        }}
                        name="COPY_REMARK"
                        saveTempContents={this.handlerRemarkChange}
                        config={froalaEditorConfig()}
                        defaultValue={formData.COPY_REMARK}
                      />
                    </Col>
                  </div>
                </Row>
              )}
              <Row>
                <div className="w100Table">
                  <Col span={4}>첨부파일</Col>
                  <Col span={20}>
                    {attachMeta && attachMeta.length > 0 && formData.hasOwnProperty('ATTACH') && (
                      <Row>
                        <div className="w100Table">
                          <Col span={6} className="attachTitle">
                            별첨#(본문내용)
                          </Col>
                          <Col span={18}>
                            <FileUpload
                              workSeq={workSeq}
                              taskSeq={taskSeq}
                              defaultValue={formData.ATTACH}
                              saveTempContents={detail => this.handlerAttachChange(detail, 'ATTACH')}
                              multiple={false}
                            ></FileUpload>
                          </Col>
                        </div>
                      </Row>
                    )}
                    {attachMeta && attachMeta.length > 0 && formData.hasOwnProperty('ATTACH2') && (
                      <Row>
                        <div className="w100Table">
                          <Col span={6} className="attachTitle">
                            별첨#1(서식지 or 기술자료)
                          </Col>
                          <Col span={18}>
                            <FileUpload
                              workSeq={workSeq}
                              taskSeq={taskSeq}
                              defaultValue={formData.ATTACH2}
                              saveTempContents={detail => this.handlerAttachChange(detail, 'ATTACH2')}
                              multiple={false}
                            ></FileUpload>
                          </Col>
                        </div>
                      </Row>
                    )}
                    {attachMeta && attachMeta.length > 0 && formData.hasOwnProperty('ATTACH3') && (
                      <Row>
                        <div className="w100Table">
                          <Col span={6} className="attachTitle">
                            별첨#2(기술자료)
                          </Col>
                          <Col span={18}>
                            <FileUpload
                              workSeq={workSeq}
                              taskSeq={taskSeq}
                              defaultValue={formData.ATTACH3}
                              saveTempContents={detail => this.handlerAttachChange(detail, 'ATTACH3')}
                              multiple={false}
                            ></FileUpload>
                          </Col>
                        </div>
                      </Row>
                    )}
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
                    draftCompleteFunc={this.props.onCloseModalHandler}
                    externalData={{ draftType, fullNodeIds, degree: this.state.degree }}
                    formData={this.state.formData}
                  />
                </Col>
              </Row>
              <Row>
                <div className="btn-wrap">
                  <Button onClick={this.handlerTempSave} style={{ display: 'none' }}>
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
                  <StyledButton
                    className="btn-primary"
                    onClick={() => {
                      this.onClickSave();
                    }}
                  >
                    상신
                  </StyledButton>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </StyledContent>
    );
  }
}
export default TechDocInput;

TechDocInput.propTypes = {
  workSeq: PropTypes.number,
  apiArr: PropTypes.array,
  sp_id: PropTypes.string,
  sp_rev: PropTypes.number,
  localApiArr: PropTypes.array,
  docNumber: PropTypes.string,
};

TechDocInput.defaultProps = {
  sp_id: 'test-123',
  sp_rev: 0,
  localApiArr: [
    { key: 'siteList', url: `/api/admin/v1/common/categoryMapList?MAP_ID=16`, type: 'GET' },
    { key: 'lineSiteList', url: `/api/admin/v1/common/categoryMapList?MAP_ID=11`, type: 'GET' },
    { key: 'productList', url: `/api/admin/v1/common/categoryMapList?MAP_ID=9`, type: 'GET' },
    { key: 'techList', url: `/api/admin/v1/common/categoryMapList?MAP_ID=18`, type: 'GET' },
    { key: 'generationList', url: `/api/admin/v1/common/categoryMapList?MAP_ID=19`, type: 'GET' },
    { key: 'densityList', url: `/api/admin/v1/common/categoryMapList?MAP_ID=20`, type: 'GET' },
    { key: 'pkgList', url: `/api/admin/v1/common/categoryMapList?MAP_ID=10`, type: 'GET' },
    { key: 'moduleList', url: `/api/admin/v1/common/categoryMapList?MAP_ID=21`, type: 'GET' },
    { key: 'customerList', url: `/api/admin/v1/common/categoryMapList?MAP_ID=22`, type: 'GET' },
  ],
  docNumber: [],
};
