import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Row, Col, Input } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';

import FroalaEditorView from 'components/FormStuff/RichTextEditor/FroalaEditorView';
import { froalaEditorConfig } from 'components/FormStuff/config';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledContentField from '../../../styled/Modals/StyledContentField';
import Styled from '../Styled';

const { Option } = Select;

class FieldViewComponent extends Component {
  componentDidMount() {
    const { getCallDataHanlder, id, selectedIndex } = this.props;
    const apiArr = [{ key: 'fieldCompList', url: `/api/builder/v1/work/FieldList`, type: 'POST', params: { key: 'fieldCompList', FIELD_IDX: selectedIndex } }];
    getCallDataHanlder(id, apiArr);
  }

  render() {
    const {
      selectedIndex,
      result: { fieldCompList, compList, typeList, groupList, fieldList },
    } = this.props;
    const myField = fieldList && fieldList.list && fieldList.list.filter(item => item.FIELD_IDX === selectedIndex)[0];

    return (
      <StyledContentField>
        <div>
          <Row>
            <div className="pop_tit">필드 작성</div>
          </Row>
          <div className="pop_con">
            <div className="sub_form">
              <Row>
                <div className="w100Table">
                  <Col span={3}>컬럼형식(논리):</Col>
                  <Col span={21}>
                    <Select disabled value={myField.COL_GROUP_IDX} style={{ width: 300, marginRight: 10 }}>
                      {groupList && groupList.list && groupList.list.map(item => <Option value={item.COL_GROUP_IDX}>{item.COL_GROUP_NAME}</Option>)}
                    </Select>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>컬럼형식 DB타입</Col>
                  <Col span={21}>
                    <Select disabled value={myField.COL_TYPE_IDX} style={{ width: 300, marginRight: 10 }}>
                      {typeList && typeList.list && typeList.list.map(item => <Option value={item.COL_TYPE_IDX}>{item.COL_DB_TYPE}</Option>)}
                    </Select>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>컴포넌트명</Col>
                  <Col span={21}>
                    <Row>
                      <div className="w100Table">
                        <Col span={3}>입력:</Col>
                        <Col span={21}>
                          <Select
                            style={{ width: 300, marginRight: 10 }}
                            placeholder="컴포넌트를 설정해 주세요"
                            disabled
                            value={fieldCompList && fieldCompList.list && fieldCompList.list.filter(item => item.VIEWTYPE === 'IN')[0].COMP_POOL_IDX}
                          >
                            {compList && compList.list && compList.list.map(item => <Option value={item.COMP_POOL_IDX}>{item.COMP_NAME}</Option>)}
                          </Select>
                        </Col>
                      </div>
                    </Row>
                    <Row>
                      <div className="w100Table">
                        <Col span={3}>수정:</Col>
                        <Col span={21}>
                          <Select
                            style={{ width: 300, marginRight: 10 }}
                            placeholder="컴포넌트를 설정해 주세요"
                            disabled
                            value={fieldCompList && fieldCompList.list && fieldCompList.list.filter(item => item.VIEWTYPE === 'MO')[0].COMP_POOL_IDX}
                          >
                            {compList && compList.list && compList.list.map(item => <Option value={item.COMP_POOL_IDX}>{item.COMP_NAME}</Option>)}
                          </Select>
                        </Col>
                      </div>
                    </Row>
                    <Row>
                      <div className="w100Table">
                        <Col span={3}>조회:</Col>
                        <Col span={21}>
                          <Select
                            style={{ width: 300, marginRight: 10 }}
                            placeholder="컴포넌트를 설정해 주세요"
                            disabled
                            value={fieldCompList && fieldCompList.list && fieldCompList.list.filter(item => item.VIEWTYPE === 'VI')[0].COMP_POOL_IDX}
                          >
                            {compList && compList.list && compList.list.map(item => <Option value={item.COMP_POOL_IDX}>{item.COMP_NAME}</Option>)}
                          </Select>
                        </Col>
                      </div>
                    </Row>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>필드명</Col>
                  <Col span={21}>
                    <Input value={myField.FIELD_NAME} readOnly></Input>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>필드 설명</Col>
                  <Col span={21}>
                    <FroalaEditorView model={myField.FIELD_DESC} />
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="btn-wrap btn-right">
                  <Col span={24}>
                    <StyledButton
                      className="btn-primary btn-sm"
                      onClick={() => {
                        this.props.onChangeViewType('Modify');
                      }}
                    >
                      수정
                    </StyledButton>
                  </Col>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </StyledContentField>
    );
  }
}

export default FieldViewComponent;
