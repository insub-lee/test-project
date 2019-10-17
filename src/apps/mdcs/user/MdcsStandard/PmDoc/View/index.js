import React, { Component } from 'react';
import { Button, Input, Row, Col, Select, Checkbox, Modal, Table } from 'antd';
import PropTypes from 'prop-types';

import FroalaEditorView from 'components/FormStuff/RichTextEditor/FroalaEditorView';
import { froalaEditorConfig } from 'components/FormStuff/config';
import FileUpload from 'components/FormStuff/Upload';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import StyledContent from '../../../../styled/Modals/StyledContent';
import StyledModalWrapper from '../../../../styled/Modals/StyledModalWrapper';
import StyledButton from '../../../../styled/StyledButton';
import TableSelection from '../TableSelection';
import * as columData from '../TableSelection/columData';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledModalWrapper(Modal);
const { Option } = Select;

class PmDocView extends Component {
  state = {
    spec: false,
    dw: false,
    keyword: '',
    specTemp: [],
    selectedSpec: undefined,
    dwTemp: [],
    selectedDw: undefined,
    callSubSpecApi: true,
    callSubDwApi: true,
  };

  componentDidMount() {}

  render() {
    const {
      extraApiData: { materialList, supplierList, regionList, specList, dwList, subSpecList, subDwList },
      saveTask,
      id,
      metaList,
      formData,
      taskSeq,
      changeFormData,
      docNumber,
      getExtraApiData,
    } = this.props;
    const { callSubDwApi, callSubSpecApi } = this.state;
    const editor = metaList.filter(meta => meta.COMP_TAG === 'rich-text-editor');
    const editorConfig = {};
    if (editor && editor.length > 0) {
      editor.forEach(node => {
        editorConfig[node.COMP_FIELD] = JSON.parse(node.CONFIG);
      });
    }

    const defaultLeftDataSource = formData && formData.SUB_SPEC_SEQ && formData.SUB_SPEC_SEQ !== ' ' && formData.SUB_SPEC_SEQ.split(',');
    const defaultRightDataSource = formData && formData.SUB_DRW_SEQ && formData.SUB_DRW_SEQ !== ' ' && formData.SUB_DRW_SEQ.split(',');
    if (defaultLeftDataSource && callSubSpecApi) {
      const subSpecApi = [
        {
          key: 'subSpecList',
          url: `/api/mdcs/v1/common/MdcsStandard/subData`,
          type: 'POST',
          params: { list: defaultLeftDataSource, type: 'spec' },
        },
      ];
      getExtraApiData(id, subSpecApi);
      this.setState({ callSubSpecApi: false });
    }
    if (defaultRightDataSource && callSubDwApi) {
      const subDwApi = [
        {
          key: 'subDwList',
          url: `/api/mdcs/v1/common/MdcsStandard/subData`,
          type: 'POST',
          params: { list: defaultRightDataSource, type: 'dw' },
        },
      ];
      getExtraApiData(id, subDwApi);
      this.setState({ callSubDwApi: false });
    }
    // console.log('레프트', defaultLeftDataSource);
    // console.log('롸이트', defaultRightDataSource);
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
                      <Input value={formData && formData.VERSION && formData.VERSION.split('.')[0]} readOnly />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="leftTable">
                    <Col span={4}>자재명 </Col>
                    <Col span={8}>
                      <Select disabled placeholder="select me" value={formData.PART_ID || undefined}>
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
                      <Input value={formData.MODEL} readOnly />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="w100Table">
                    <Col span={4}>Material Name</Col>
                    <Col span={20}>
                      <Input value={formData.PART_DESCRIPTION} readOnly />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="leftTable">
                    <Col span={4}>Supplier</Col>
                    <Col span={8}>
                      <Select disabled placeholder="select me" value={formData.SUPPLIER_ID || undefined}>
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
                      <Input value={formData.HYNIX_PART_NO} readOnly />
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="leftTable">
                    <Col span={4}>Supplier Part No</Col>
                    <Col span={8}>
                      <Input value={formData.SUPPLIER_PART_NO} readOnly />
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={4}>적용지역</Col>
                    <Col span={8}>
                      <Select disabled placeholder="select me" value={Number(formData.REGION) || undefined}>
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
                      <Checkbox disabled checked={formData && formData.TEST_SPEC && formData.TEST_SPEC.length === 5 && formData.TEST_SPEC.charAt(0) === '1'}>
                        외관 및 치수
                      </Checkbox>
                      <Checkbox checked={formData && formData.TEST_SPEC && formData.TEST_SPEC.length === 5 && formData.TEST_SPEC.charAt(1) === '1'} disabled>
                        특성 평가
                      </Checkbox>
                      <Checkbox checked={formData && formData.TEST_SPEC && formData.TEST_SPEC.length === 5 && formData.TEST_SPEC.charAt(2) === '1'} disabled>
                        공정 평가
                      </Checkbox>
                      <Checkbox checked={formData && formData.TEST_SPEC && formData.TEST_SPEC.length === 5 && formData.TEST_SPEC.charAt(3) === '1'} disabled>
                        신뢰성 시험
                      </Checkbox>
                      <Checkbox checked={formData && formData.TEST_SPEC && formData.TEST_SPEC.length === 5 && formData.TEST_SPEC.charAt(4) === '1'} disabled>
                        기타
                      </Checkbox>
                      <Input style={{ width: '200px' }} disabled value={formData.TEST_SPEC_DESC} />
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
                      {formData && formData.PRODUCT_ETC && <FileUpload {...this.props} defaultValue={formData.PRODUCT_ETC} readOnly></FileUpload>}
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={4}>설명</Col>
                    <Col span={8}>
                      <Input value={formData.PRODUCT_ETC_DESC} readOnly />
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
                      {formData && formData.DRAFT_DEPT_ATTACH && <FileUpload {...this.props} defaultValue={formData.DRAFT_DEPT_ATTACH} readOnly></FileUpload>}
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={4}>설명</Col>
                    <Col span={8}>
                      <Input value={formData.DRAFT_DEPT_DESC} readOnly />
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
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={12} style={{ textAlign: 'center' }}>
                      Drawing
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="leftTable">
                    <Col span={12}>
                      <AntdTable
                        pagination={false}
                        columns={columData.rightTableColumns}
                        dataSource={this.state.selectedSpec || (subSpecList && subSpecList.dataList)}
                        className="tableCustom"
                      ></AntdTable>
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={12}>
                      <AntdTable
                        pagination={false}
                        columns={columData.rightTableColumns}
                        dataSource={this.state.selectedDw || (subDwList && subDwList.dataList)}
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
                      {editor && editorConfig && editorConfig.REMARK && formData.hasOwnProperty('REMARK') && (
                        <FroalaEditorView model={formData.REMARK.length > 0 ? formData.REMARK[0].DETAIL : formData.REMARK} />
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
                      <Input value={formData.SP_REV} readOnly />
                    </Col>
                  </div>
                  <div className="rightTable">
                    <Col span={4}>Date</Col>
                    <Col span={8}>
                      <Input value={formData.SP_REV} readOnly />
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
                      {editor && editorConfig && editorConfig.REMARK2 && formData.hasOwnProperty('REMARK2') && (
                        <FroalaEditorView model={formData.REMARK2.length > 0 ? formData.REMARK2[0].DETAIL : formData.REMARK2} />
                      )}
                    </Col>
                  </div>
                </Row>
              </div>
            </div>
            <div className="sub_form" style={{ textAlign: 'center' }}></div>
          </div>
        </div>
      </StyledContent>
    );
  }
}

PmDocView.propTypes = {
  extraRes: PropTypes.object.isRequired,
  metaList: PropTypes.arrayOf(PropTypes.object).isRequired,
  docNumber: PropTypes.string,
};

PmDocView.defaultProps = {
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
};

export default PmDocView;
