import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Row, Col, Input, Select, Icon, Popconfirm, Modal, Radio } from 'antd';

import RichTextEditor from 'components/FormStuff/RichTextEditor';
import { froalaEditorConfig } from 'components/FormStuff/config';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContent from '../../../styled/Modals/StyledContent';
import CheckSelectList from '../../../components/CheckSelectList';
import StyledButton from '../../../styled/StyledButton';
import { clone } from '../utils';

import WorkFlowBase from 'apps/WorkFlow/WorkFlowBase';
import * as Degree from 'apps/WorkFlow/WorkFlowBase/Nodes/Constants/modifyconst';

const { Option } = Select;

class DwDoc extends Component {
  state = {
    isOpenBallSel: false,
    selectedItem: {},
    currentLBName: '',
    isDraftModal: false,
    taskSeq: -1,
    formData: {},
    degree: Degree.MAJOR,
  };

  componentDidMount() {
    const { getExtraApiData, id, rapiArr } = this.props;
    getExtraApiData(id, rapiArr);
  }

  componentWillUnmount() {
    console.debug('Redux 제거 필요');
  }

  makeOptions = obj => {
    const resultList = [];
    if (obj && obj.categoryMapList) {
      obj.categoryMapList
        .filter(x => x.LVL !== 0)
        .map(item => {
          resultList.push(<Option key={item.NODE_ID}>{item.NAME_KOR}</Option>);
        });
    }
    return resultList;
  };

  openLeadBall = isOpen => {
    console.debug(isOpen);
    this.setState({
      isOpenBallSel: isOpen,
    });
  };

  onChange = selectedItem => {
    console.log('!!!onChange selectedItem : ', selectedItem);
    this.setState({
      selectedItem,
    });
    console.debug(selectedItem);
  };

  onRemove = () => {
    console.debug('onRemove');
  };

  onLineSel = () => {
    const { selectedItem } = this.state;

    console.log('### onLineSel selectedItem : ', selectedItem);
    const { groupKey, selectedText, selectedValue } = selectedItem;
    let LB_TYPE = '';
    let LB = selectedValue;
    if (groupKey === 'ball') {
      LB_TYPE = 'B';
      LB = selectedValue;
    }
    if (groupKey === 'lead') {
      LB_TYPE = 'L';
      LB = selectedValue;
    }
    this.onChangeFormData('LB_TYPE', LB_TYPE);
    this.onChangeFormData('LB', LB);
    this.setState({
      isOpenBallSel: false,
      currentLBName: selectedText,
    });
  };

  onCopyDesc = () => {
    const { formData } = this.props;
    const { DW_DESC } = formData;
    // changeFormData(id, 'SP_DESC', DW_DESC);
    console.log('this.spDescEditor : ', this.spDescEditor);
    if (DW_DESC && DW_DESC.length > 0) {
      if (DW_DESC[0].DETAIL !== '') {
        this.spDescEditor.onModelChange(DW_DESC[0].DETAIL);
        message.success(<MessageContent>복사 되었습니다.</MessageContent>, 3);
      } else {
        message.warning(<MessageContent>설명을 입력하세요.</MessageContent>, 3);
      }
    } else {
      message.warning(<MessageContent>에러가 발생하였습니다. 관리자에게 문의하세요.</MessageContent>, 3);
    }
  };

  onChangeFormData = (name, model) => {
    const { id, changeFormData } = this.props;
    console.log('id : ', id);
    console.log('model : ', model);
    console.log('name : ', name);
    changeFormData(id, name, model);
  };

  checkValidation = () => {
    const { formData } = this.props;
    if (!formData) {
      message.warning(<MessageContent></MessageContent>, 3);
      return false;
    }
    if (formData.TITLE === '') {
      message.warning(<MessageContent>제목을 입력하세요.</MessageContent>, 3);
      return false;
    }
    if (formData.DW_ID === '') {
      message.warning(<MessageContent>NO.를 입력하세요.</MessageContent>, 3);
      return false;
    }
    return true;
  };

  onSave = () => {
    const { id, saveTask, formData, docNumber, changeFormData } = this.props;
    changeFormData(id, 'DW_ID', docNumber);
    if (this.checkValidation()) {
      saveTask(id, '', () => {
        message.success(<MessageContent>등록 성공</MessageContent>, 3);
      });
    }
  };

  setIsDraftModal = isDraftModal => this.setState({ isDraftModal });

  saveTaskAfter = (id, taskSeq, formData) => {
    this.setState({ isDraftModal: true, taskSeq, title: formData.TITLE, formData });
  };

  render() {
    const {
      extraApiData: { ball, lead, lineSel, rkg, dwItem, product },
      formData,
      id,
      docNumber,
      workSeq,
      selectedNodeId,
      fullNodeIds,
      draftType,
      changeFormData,
      saveTask,
      sp_rev,
    } = this.props;
    const { currentLBName } = this.state;

    return (
      <div>
        <StyledContent>
          <div>
            <div className="pop_tit">
              도면기안
              <button type="button" className="icon icon_pclose" onClick={this.handleClose} />
            </div>
            <div className="pop_con">
              <div className="sub_form">
                <Row>
                  <div className="w100Table">
                    <Col className="title" span={3}>
                      Title
                    </Col>
                    <Col span={21}>
                      <Input
                        onChange={e => {
                          this.onChangeFormData('TITLE', e.target.value);
                        }}
                      />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="w100Table notpad">
                    <Col span={12}>
                      <Row>
                        <div className="w100Table">
                          <Col span={6}>No.</Col>
                          <Col span={18}>
                            <Input value={docNumber} />
                          </Col>
                        </div>
                      </Row>
                      <Row>
                        <div className="w100Table">
                          <Col span={6}>Rev.</Col>
                          <Col span={18}>
                            <Input value={sp_rev} />
                          </Col>
                        </div>
                      </Row>
                      <Row>
                        <div className="w100Table">
                          <Col span={6}>Qual 여부.</Col>
                          <Col span={18}>
                            <Radio.Group
                              onChange={e => {
                                this.onChangeFormData('QUAL', e.target.value);
                              }}
                              value={formData.QUAL}
                            >
                              <Radio value="Y">승인</Radio>
                              <Radio value="N">미승인</Radio>
                            </Radio.Group>
                          </Col>
                        </div>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Row>
                        <div className="w100Table">
                          <Col span={6}>도면구분</Col>
                          <Col span={18}>
                            <Select
                              onChange={value => {
                                this.onChangeFormData('DW_TYPE', value);
                              }}
                            >
                              {this.makeOptions(dwItem)}
                            </Select>
                          </Col>
                        </div>
                      </Row>
                      <Row>
                        <div className="w100Table">
                          <Col span={6}>적용 Product</Col>
                          <Col span={18}>
                            <Select
                              onChange={value => {
                                this.onChangeFormData('PRODUCT', value);
                              }}
                            >
                              {this.makeOptions(product)}
                            </Select>
                          </Col>
                        </div>
                      </Row>
                      <Row>
                        <div className="w100Table">
                          <Col span={6}>적용 RKG</Col>
                          <Col span={18}>
                            <Select
                              onChange={value => {
                                this.onChangeFormData('PKG', value);
                              }}
                            >
                              {this.makeOptions(rkg)}
                            </Select>
                          </Col>
                        </div>
                      </Row>
                      <Row>
                        <div className="w100Table">
                          <Col span={6}>적용 Line/Site</Col>
                          <Col span={18}>
                            <Select
                              onChange={value => {
                                this.onChangeFormData('FAB', value);
                              }}
                            >
                              {this.makeOptions(lineSel)}
                            </Select>
                          </Col>
                        </div>
                      </Row>
                      <Row>
                        <div className="w100Table">
                          <Col span={6}>적용 Lead/Ball</Col>
                          <Col span={18}>
                            <Input
                              addonAfter={
                                <a onClick={this.openLeadBall}>
                                  <Icon type="setting" />
                                </a>
                              }
                              value={currentLBName}
                            ></Input>
                            <Modal
                              ref="modalEventRef"
                              width={417}
                              bodyStyle={{ height: '350px', padding: '49px 8px 10px 8px' }}
                              visible={this.state.isOpenBallSel}
                              onOk={() => {
                                console.log('onOk !!');
                                this.onLineSel();
                              }}
                              onCancel={() => this.openLeadBall(false)}
                            >
                              <Row>
                                <Col>
                                  <CheckSelectList
                                    onChange={this.onChange}
                                    onRemove={this.onRemove}
                                    sourceData={[
                                      {
                                        groupName: 'ball',
                                        groupKey: 'ball',
                                        dataSet: ball && ball.categoryMapList ? ball.categoryMapList : [],
                                      },
                                      {
                                        groupName: 'lead',
                                        groupKey: 'lead',
                                        dataSet: lead && lead.categoryMapList ? lead.categoryMapList : [],
                                      },
                                    ]}
                                  />
                                </Col>
                              </Row>
                            </Modal>
                          </Col>
                        </div>
                      </Row>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="w100Table">
                    <Col span={3}>Description of Change(From/To)</Col>
                    <Col span={21}>
                      <RichTextEditor
                        config={clone(froalaEditorConfig())}
                        name="DW_DESC"
                        saveTempContents={(model, name) => {
                          this.onChangeFormData(name, model);
                        }}
                      />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="w100Table">
                    <Col span={3}>
                      제정이력
                      <StyledButton className="btn-gray btn-xs" onClick={this.onCopyDesc}>
                        Copy Description
                      </StyledButton>
                    </Col>
                    <Col span={21}>
                      <RichTextEditor
                        ref={ref => {
                          this.spDescEditor = ref;
                        }}
                        config={clone(froalaEditorConfig())}
                        name="SP_DESC"
                        saveTempContents={(model, name) => {
                          this.onChangeFormData(name, model);
                        }}
                      />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="w100Table">
                    <Col span={3}>첨부파일</Col>
                    <Col span={21}>첨부</Col>
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
                    <Col span={24}>
                      <StyledButton className="btn-light btn-first">취소</StyledButton>
                      <StyledButton
                        className="btn-primary"
                        onClick={() => {
                          if (this.checkValidation()) {
                            changeFormData(id, 'NODE_ID', selectedNodeId);
                            changeFormData(id, 'DW_ID', docNumber);
                            changeFormData(id, 'SP_REV', sp_rev);
                            saveTask(id, id, this.saveTaskAfter);
                          }
                        }}
                      >
                        저장
                      </StyledButton>
                    </Col>
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </StyledContent>
      </div>
    );
  }
}

DwDoc.propTypes = {
  rapiArr: PropTypes.array,
  sp_rev: PropTypes.number,
};

DwDoc.defaultProps = {
  // workSeq: -1,
  // taskSeq: -1,
  sp_rev: 0,
  rapiArr: [
    {
      key: 'dwItem',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=8',
      type: 'GET',
      params: {},
    },
    {
      key: 'product',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=9',
      type: 'GET',
      params: {},
    },
    {
      key: 'rkg',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=10',
      type: 'GET',
      params: {},
    },
    {
      key: 'lineSel',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=11',
      type: 'GET',
      params: {},
    },
    {
      key: 'lead',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=12',
      type: 'GET',
      params: {},
    },
    {
      key: 'ball',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=13',
      type: 'GET',
      params: {},
    },
  ],
};

export default DwDoc;
