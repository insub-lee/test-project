import React, { Component } from 'react';
import { Button, Input, Row, Col, Select, Checkbox, Modal, Table } from 'antd';
import PropTypes from 'prop-types';

import RichTextEditor from 'components/FormStuff/RichTextEditor';
import { froalaEditorConfig } from 'components/FormStuff/config';
import FileUpload from 'components/FormStuff/Upload';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import WorkFlowBase from 'apps/WorkFlow/WorkFlowBase';
import * as Degree from 'apps/WorkFlow/WorkFlowBase/Nodes/Constants/modifyconst';

import StyledContent from '../../../../styled/Modals/StyledContent';
import StyledCommonForm from '../../../../styled/CommonStyledElement/StyledCommonForm';
import StyledModalWrapper from '../../../../styled/Modals/StyledModalWrapper';
import StyledButton from '../../../../styled/StyledButton';
import TableSelection from '../TableSelection';
import * as columData from '../TableSelection/columData';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledModalWrapper(Modal);
const { Option } = Select;

class PmDoc extends Component {
  state = {
    spec: false,
    dw: false,
    keyword: '',
    specTemp: [],
    selectedSpec: [],
    dwTemp: [],
    selectedDw: [],
    isDraftModal: false,
    taskSeq: -1,
    formData: {},
    degree: Degree.MAJOR,
  };

  componentDidMount() {
    const { getExtraApiData, id, localApiArr, getTaskSeq, workSeq } = this.props;
    getExtraApiData(id, localApiArr);
    getTaskSeq(id, workSeq);
  }

  onChangeFormData = (detail, fieldName, compType, contSeq) => {
    const { id, changeFormData } = this.props;
    changeFormData(id, fieldName, detail);
  };

  handlerAttachChange = (detail, name) => {
    const { id, changeFormData } = this.props;
    changeFormData(id, name, detail);
  };

  getTestSpecValue(testSpec, idx) {
    let retVal = '';
    if (testSpec && testSpec.length === 5) {
      const prevVal = testSpec.charAt(idx);
      Array.from(testSpec).forEach((node, nodeIdx) => {
        if (nodeIdx === idx) {
          retVal += prevVal === '1' ? '0' : '1';
        } else {
          retVal += node;
        }
      });
    } else {
      const tempSpec = '00000';
      Array.from(tempSpec).forEach((node, nodeIdx) => {
        if (nodeIdx === idx) {
          retVal += '1';
        } else {
          retVal += node;
        }
      });
    }
    return retVal;
  }

  handlerModalOpen = text => {
    const { spec, dw } = this.state;
    this.setState({ keyword: '' });
    switch (text) {
      case 'spec':
        this.setState({
          spec: !spec,
        });
        break;
      case 'dw':
        this.setState({
          dw: !dw,
        });
        break;
      default:
        break;
    }
  };

  onChngeKeyword = e => {
    this.setState({ keyword: e.target.value });
  };

  onSearchKeyword = type => {
    const { id, getExtraApiData } = this.props;
    const { keyword } = this.state;
    const specApi = [
      {
        key: 'specList',
        url: `/api/mdcs/v1/common/MdcsStandard/${type}/${keyword}`,
        type: 'GET',
        params: {},
      },
    ];
    const dwApi = [
      {
        key: 'dwList',
        url: `/api/mdcs/v1/common/MdcsStandard/${type}/${keyword}`,
        type: 'GET',
        params: {},
      },
    ];
    switch (type) {
      case 'spec':
        getExtraApiData(id, specApi);
        break;
      case 'dw':
        getExtraApiData(id, dwApi);
        break;
      default:
        break;
    }
  };

  modalOnOk = () => {
    const { changeFormData, id } = this.props;
    const { spec, dw, specTemp, dwTemp } = this.state;
    const model = [];
    if (spec) {
      specTemp.map(item => model.push(item.key));
      changeFormData(id, 'SUB_SPEC_SEQ', model.join());
      this.setState({ selectedSpec: specTemp });
      this.setState({ spec: !spec, specTemp: [] });
    }
    if (dw) {
      dwTemp.map(item => model.push(item.key));
      changeFormData(id, 'SUB_DRW_SEQ', model.join());
      this.setState({ selectedDw: dwTemp });
      this.setState({ dw: !dw, dwTemp: [] });
    }
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

  setSpecTemp = data => {
    this.setState({ specTemp: data });
  };

  setDwTemp = data => {
    this.setState({ dwTemp: data });
  };

  setIsDraftModal = isDraftModal => this.setState({ isDraftModal });

  saveTaskAfter = (id, taskSeq, formData) => {
    this.setState({ isDraftModal: true, taskSeq, title: formData.TITLE, formData });
  };

  render() {
    const {
      extraApiData: { materialList, supplierList, regionList, specList, dwList },
      saveTask,
      id,
      metaList,
      formData,
      changeFormData,
      docNumber,
      selectedNodeId,
      sp_rev,
      workSeq,
      draftType,
      fullNodeIds,
    } = this.props;

    const editor = metaList.filter(meta => meta.COMP_TAG === 'rich-text-editor');
    const editorConfig = {};
    if (editor && editor.length > 0) {
      editor.forEach(node => {
        editorConfig[node.COMP_FIELD] = JSON.parse(node.CONFIG);
      });
    }

    return (
      <StyledContent>
        <div>
          <div className="pop_tit">
            자재 승인서
            <button type="button" className="icon icon_pclose" onClick={this.handleClose} />
          </div>
          <div className="pop_con">
            <div className="sub_form">
              <div className="sub_title">기본 입력사항</div>
              <div className="tableBody">
                <Row>
                  <div className="leftTable">
                    <Col span={4}>Control No</Col>
                    <Col span={8}>
                      <Input value={docNumber} readOnly />
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={4}>Control Rev</Col>
                    <Col span={8}>
                      <Input value={sp_rev} />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="leftTable">
                    <Col span={4}>자재명 </Col>
                    <Col span={8}>
                      <Select
                        placeholder="select me"
                        onChange={(value, opt) => {
                          const partName = opt.props.children;
                          changeFormData(id, 'PART_ID', value);
                          changeFormData(id, 'PART_NAME', partName);
                        }}
                        value={formData.PART_ID || undefined}
                      >
                        {materialList &&
                          materialList.categoryMapList
                            .filter(filterItem => filterItem.LVL > 0 && filterItem.USE_YN === 'Y')
                            .map(node => (
                              <Option key={`Material_${node.NODE_ID}`} value={node.NODE_ID}>
                                {node.NAME_KOR}
                              </Option>
                            ))}
                      </Select>
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={4}>Application Device</Col>
                    <Col span={8}>
                      <Input value={formData.MODEL} onChange={e => changeFormData(id, 'MODEL', e.target.value)} />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="w100Table">
                    <Col span={4}>Material Name</Col>
                    <Col span={20}>
                      <Input value={formData.PART_DESCRIPTION} onChange={e => changeFormData(id, 'PART_DESCRIPTION', e.target.value)} />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="leftTable">
                    <Col span={4}>Supplier</Col>
                    <Col span={8}>
                      <Select placeholder="select me" onChange={value => changeFormData(id, 'SUPPLIER_ID', value)} value={formData.SUPPLIER_ID || undefined}>
                        {supplierList &&
                          supplierList.categoryMapList
                            .filter(filterItem => filterItem.LVL > 0 && filterItem.USE_YN === 'Y')
                            .map(node => (
                              <Option key={`supplier_${node.NODE_ID}`} value={node.NODE_ID}>
                                {node.NAME_KOR}
                              </Option>
                            ))}
                      </Select>
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={4}>MagnaChip Part No(SAP Code)</Col>
                    <Col span={8}>
                      <Input value={formData.HYNIX_PART_NO} onChange={e => changeFormData(id, 'HYNIX_PART_NO', e.target.value)} />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="leftTable">
                    <Col span={4}>Supplier Part No</Col>
                    <Col span={8}>
                      <Input value={formData.SUPPLIER_PART_NO} onChange={e => changeFormData(id, 'SUPPLIER_PART_NO', e.target.value)} />
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={4}>적용지역</Col>
                    <Col span={8}>
                      <Select placeholder="select me" onChange={value => changeFormData(id, 'REGION', value)} value={formData.REGION || undefined}>
                        {regionList &&
                          regionList.categoryMapList
                            .filter(filterItem => filterItem.LVL > 0 && filterItem.USE_YN === 'Y')
                            .map(node => (
                              <Option key={`region_${node.NODE_ID}`} value={node.NODE_ID}>
                                {node.NAME_KOR}
                              </Option>
                            ))}
                      </Select>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="w100Table">
                    <Col span={4}>시험항목</Col>
                    <Col span={20}>
                      <Checkbox
                        checked={formData && formData.TEST_SPEC && formData.TEST_SPEC.length === 5 && formData.TEST_SPEC.charAt(0) === '1'}
                        onChange={e => changeFormData(id, 'TEST_SPEC', this.getTestSpecValue(formData.TEST_SPEC, 0))}
                      >
                        외관 및 치수
                      </Checkbox>
                      <Checkbox
                        checked={formData && formData.TEST_SPEC && formData.TEST_SPEC.length === 5 && formData.TEST_SPEC.charAt(1) === '1'}
                        onChange={e => changeFormData(id, 'TEST_SPEC', this.getTestSpecValue(formData.TEST_SPEC, 1))}
                      >
                        특성 평가
                      </Checkbox>
                      <Checkbox
                        checked={formData && formData.TEST_SPEC && formData.TEST_SPEC.length === 5 && formData.TEST_SPEC.charAt(2) === '1'}
                        onChange={e => changeFormData(id, 'TEST_SPEC', this.getTestSpecValue(formData.TEST_SPEC, 2))}
                      >
                        공정 평가
                      </Checkbox>
                      <Checkbox
                        checked={formData && formData.TEST_SPEC && formData.TEST_SPEC.length === 5 && formData.TEST_SPEC.charAt(3) === '1'}
                        onChange={e => changeFormData(id, 'TEST_SPEC', this.getTestSpecValue(formData.TEST_SPEC, 3))}
                      >
                        신뢰성 시험
                      </Checkbox>
                      <Checkbox
                        checked={formData && formData.TEST_SPEC && formData.TEST_SPEC.length === 5 && formData.TEST_SPEC.charAt(4) === '1'}
                        onChange={e => changeFormData(id, 'TEST_SPEC', this.getTestSpecValue(formData.TEST_SPEC, 4))}
                      >
                        기타
                      </Checkbox>
                      <Input
                        style={{ width: '200px' }}
                        disabled={!(formData && formData.TEST_SPEC && formData.TEST_SPEC.length === 5 && formData.TEST_SPEC.charAt(4) === '1')}
                        value={formData.TEST_SPEC_DESC}
                        onChange={e => changeFormData(id, 'TEST_SPEC_DESC', e.target.value)}
                      />
                    </Col>
                  </div>
                </Row>
              </div>
            </div>
            <div className="sub_form">
              <div className="sub_title">협력업체 첨부서류</div>
              <div className="tableBody">
                <Row>
                  <div className="leftTable">
                    <Col span={4}>제품승인원</Col>
                    <Col span={8}>
                      {formData && formData.PRODUCT_APPROVAL && (
                        <FileUpload
                          {...this.props}
                          defaultValue={formData.PRODUCT_APPROVAL}
                          saveTempContents={detail => this.handlerAttachChange(detail, 'PRODUCT_APPROVAL')}
                        ></FileUpload>
                      )}
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={4}>시료수량</Col>
                    <Col span={8}>
                      <Input value={formData.SAMPLE_CNT} onChange={e => changeFormData(id, 'SAMPLE_CNT', e.target.value)} />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="leftTable">
                    <Col span={4}>기타파일</Col>
                    <Col span={8}>
                      {formData && formData.PRODUCT_ETC && (
                        <FileUpload
                          {...this.props}
                          defaultValue={formData.PRODUCT_ETC}
                          saveTempContents={detail => this.handlerAttachChange(detail, 'PRODUCT_ETC')}
                        ></FileUpload>
                      )}
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={4}>설명</Col>
                    <Col span={8}>
                      <Input value={formData.PRODUCT_ETC_DESC} onChange={e => changeFormData(id, 'PRODUCT_ETC_DESC', e.target.value)} />
                    </Col>
                  </div>
                </Row>
              </div>
            </div>
            <div className="sub_form">
              <div className="sub_title">기안부서 첨부서류</div>
              <div className="tableBody">
                <Row>
                  <div className="leftTable">
                    <Col span={4}>파일</Col>
                    <Col span={8}>
                      {formData && formData.DRAFT_DEPT_ATTACH && (
                        <FileUpload
                          {...this.props}
                          defaultValue={formData.DRAFT_DEPT_ATTACH}
                          saveTempContents={detail => this.handlerAttachChange(detail, 'DRAFT_DEPT_ATTACH')}
                        ></FileUpload>
                      )}
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={4}>설명</Col>
                    <Col span={8}>
                      <Input value={formData.DRAFT_DEPT_DESC} onChange={e => changeFormData(id, 'DRAFT_DEPT_DESC', e.target.value)} />
                    </Col>
                  </div>
                </Row>
              </div>
            </div>
            <div className="sub_form">
              <div className="sub_title">Related Doc</div>
              <div className="tableBody">
                <Row className="tableHead">
                  <div className="leftTable">
                    <Col span={12} style={{ textAlign: 'center' }}>
                      SPEC
                      <StyledButton className="btn-gray btn-sm" onClick={() => this.handlerModalOpen('spec')}>
                        사내표준선택
                      </StyledButton>
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={12} style={{ textAlign: 'center' }}>
                      Drawing
                      <StyledButton className="btn-gray btn-sm" onClick={() => this.handlerModalOpen('dw')}>
                        도면 선택
                      </StyledButton>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="leftTable">
                    <Col span={12}>
                      <Modal
                        width="760px"
                        destroyOnClose
                        title="SPEC MODAL"
                        visible={this.state.spec}
                        onOk={this.modalOnOk}
                        onCancel={() => this.handlerModalOpen('spec')}
                      >
                        <Row>
                          <div className="w100Table">
                            <Col span={12}> 사내 표준 번호 및 키워드를 입력하세요(제목 + 내용요약)</Col>
                            <Col span={12}>
                              {' '}
                              <Input.Search
                                value={this.state.keyword}
                                onChange={this.onChngeKeyword}
                                onSearch={() => this.onSearchKeyword('spec')}
                              ></Input.Search>
                            </Col>
                          </div>
                        </Row>
                        <Row>
                          <div className="w100Table">
                            <TableSelection tempSave={this.setSpecTemp} dataList={specList} view="spec"></TableSelection>
                          </div>
                        </Row>
                      </Modal>
                      <AntdTable
                        pagination={false}
                        columns={columData.rightTableColumns}
                        dataSource={this.state.selectedSpec}
                        className="tableCustom"
                      ></AntdTable>
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={12}>
                      <Modal
                        width="760px"
                        destroyOnClose
                        title="DW MODAL"
                        visible={this.state.dw}
                        onOk={this.modalOnOk}
                        onCancel={() => this.handlerModalOpen('dw')}
                      >
                        <Row>
                          <div className="w100Table">
                            <Col span={12}> 사내 표준 번호 및 키워드를 입력하세요(제목 + 내용요약)</Col>
                            <Col span={12}>
                              {' '}
                              <Input.Search
                                value={this.state.keyword}
                                onChange={this.onChngeKeyword}
                                onSearch={() => this.onSearchKeyword('dw')}
                              ></Input.Search>
                            </Col>
                          </div>
                        </Row>
                        <Row>
                          <Row>
                            <div className="w100Table">
                              <TableSelection tempSave={this.setDwTemp} dataList={dwList} view="dw"></TableSelection>
                            </div>
                          </Row>
                        </Row>
                      </Modal>
                      <AntdTable
                        pagination={false}
                        columns={columData.rightTableColumns}
                        dataSource={this.state.selectedDw}
                        className="tableCustom"
                      ></AntdTable>
                    </Col>
                  </div>
                </Row>
              </div>
            </div>
            <div className="sub_form">
              <div className="sub_title">기안부서 조건부 승인요청 및 개발의견</div>
              <div className="tableBody">
                <Row>
                  <div className="w100Table">
                    <Col span={24}>
                      {editorConfig && editorConfig.REMARK && formData.hasOwnProperty('REMARK') && (
                        <RichTextEditor
                          {...editorConfig.REMARK.property.property}
                          saveTempContents={this.onChangeFormData}
                          config={froalaEditorConfig()}
                          defaultValue={formData.REMARK}
                        />
                      )}
                    </Col>
                  </div>
                </Row>
              </div>
            </div>
            <div className="sub_form">
              <div className="sub_title">Revision History</div>
              <div className="tableBody">
                <Row>
                  <div className="leftTable">
                    <Col span={4}>Rev</Col>
                    <Col span={8}>
                      <Input value={formData.SP_REV} />
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={4}>Date</Col>
                    <Col span={8}>
                      <Input value={formData.SP_REV} />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="w100Table">
                    <Col span={4}>
                      Short Description(Including the Para./clause)
                      <StyledButton className="btn-gray btn-xs" onClick={this.handlerCopyDesc}>
                        Copy Description
                      </StyledButton>
                    </Col>
                    <Col span={20}>
                      {editorConfig && editorConfig.REMARK2 && formData.hasOwnProperty('REMARK2') && (
                        <RichTextEditor
                          {...editorConfig.REMARK2.property.property}
                          ref={ref => {
                            this.copyMark = ref;
                          }}
                          saveTempContents={this.onChangeFormData}
                          config={froalaEditorConfig()}
                          defaultValue={formData.REMARK2}
                        />
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
                      draftCompleteFunc={this.props.onCloseModleHandler}
                      externalData={{ draftType, fullNodeIds, degree: this.state.degree }}
                      formData={this.state.formData}
                    />
                  </Col>
                </Row>
              </div>
            </div>
            <div className="sub_form" style={{ textAlign: 'center' }}>
              <StyledButton
                className="btn-primary"
                onClick={() => {
                  changeFormData(id, 'NODE_ID', selectedNodeId);
                  changeFormData(id, 'PM_ID', docNumber);
                  changeFormData(id, 'SP_REV', sp_rev);
                  this.setState({ selectedDw: [], selectedSpec: [] });
                  saveTask(id, id, this.saveTaskAfter);
                }}
              >
                SAVE
              </StyledButton>
            </div>
          </div>
        </div>
      </StyledContent>
    );
  }
}

PmDoc.propTypes = {
  extraRes: PropTypes.object.isRequired,
  metaList: PropTypes.arrayOf(PropTypes.object).isRequired,
  docNumber: PropTypes.string,
  sp_rev: PropTypes.number,
};

PmDoc.defaultProps = {
  localApiArr: [
    {
      key: 'materialList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=14',
      type: 'GET',
      params: {},
    },
    {
      key: 'supplierList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=15',
      type: 'GET',
      params: {},
    },
    {
      key: 'regionList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=16',
      type: 'GET',
      params: {},
    },
  ],
  docNumber: [],
  sp_rev: 0,
};

export default PmDoc;
