import React, { Component } from 'react';
import { Button, Input, Row, Col, Modal, Select, Radio } from 'antd';
import PropTypes from 'prop-types';

import FroalaEditorView from 'components/FormStuff/RichTextEditor/FroalaEditorView';

import StyledContent from 'apps/mdcs/styled/Modals/StyledContent';
import StyledModalWrapper from 'apps/mdcs/styled/Modals/StyledModalWrapper';
import FileUpload from 'components/FormStuff/Upload';

class TechDocView extends Component {
  componentDidMount() {}

  render() {
    const { formData, metaList, workSeq, taskSeq } = this.props;
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
              <div className="tableBody">
                <Row>
                  <div className="leftTable">
                    <Col span={4}>문서번호</Col>
                    <Col span={8}>
                      <Input value={formData.SP_ID} readOnly />
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
                      <Input value={formData.TITLE} readOnly />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="w100Table">
                    <Col span={4}> 적용범위 및 조회정보 선택</Col>
                    <Col span={20}>{formData && formData.SCOPE}</Col>
                  </div>
                </Row>
                <Row>
                  <div className="w100Table">
                    <Col span={4}>Significance Of Change</Col>
                    <Col span={20}>
                      <Radio.Group value={formData.CHANGE}>
                        <Radio value="1">Major</Radio>
                        <Radio value="2">Minor</Radio>
                      </Radio.Group>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="w100Table">
                    <Col span={4}>FMEA 대상</Col>
                    <Col span={20}>
                      <Radio.Group value={formData && formData.FMEA_FLAG}>
                        ( <Radio value="1">실시</Radio>
                        <Radio value="2">미실시</Radio>) <Radio value="3">비대상</Radio>
                      </Radio.Group>
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
                {contentMeta && contentMeta.length > 0 && formData.hasOwnProperty('FMEA_DESC') && (
                  <Row className={formData && formData.FMEA_FLAG === '2' ? 'show' : 'noShow'}>
                    <div className="w100Table">
                      <Col span={4}> Description of FMEA</Col>
                      <Col span={20}>
                        <FroalaEditorView model={formData.FMEA_DESC.length > 0 ? formData.FMEA_DESC[0].DETAIL : formData.FMEA_DESC} />
                      </Col>
                    </div>
                  </Row>
                )}
                {contentMeta && contentMeta.length > 0 && formData.hasOwnProperty('COPY_REMARK') && (
                  <Row>
                    <div className="w100Table">
                      <Col span={4}> 재개정 이력</Col>
                      <Col span={20}>
                        <FroalaEditorView model={formData.COPY_REMARK.length > 0 ? formData.COPY_REMARK[0].DETAIL : formData.COPY_REMARK} />
                        <Button onClick={this.handlerCopyDesc}>Copy Description</Button>
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
                              <FileUpload workSeq={workSeq} taskSeq={taskSeq} defaultValue={formData.ATTACH} multiple={false} readOnly></FileUpload>
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
                              <FileUpload workSeq={workSeq} taskSeq={taskSeq} defaultValue={formData.ATTACH2} readOnly multiple={false}></FileUpload>
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
                              <FileUpload workSeq={workSeq} taskSeq={taskSeq} defaultValue={formData.ATTACH3} readOnly multiple={false}></FileUpload>
                            </Col>
                          </div>
                        </Row>
                      )}
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="ButtonWrap">
                    <Button onClick={this.handlerTempSave} style={{ display: 'none' }}>
                      임시저장
                    </Button>
                    <Button
                      onClick={() => {
                        alert('닫기');
                      }}
                    >
                      닫기
                    </Button>
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
export default TechDocView;

TechDocView.propTypes = {
  workSeq: PropTypes.number,
  apiArr: PropTypes.array,
  sp_rev: PropTypes.number,
  localApiArr: PropTypes.array,
  docNumber: PropTypes.string,
};

TechDocView.defaultProps = {
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
