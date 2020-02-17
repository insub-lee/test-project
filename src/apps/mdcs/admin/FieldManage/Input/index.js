import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Row, Col, Input } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import RichTextEditor from 'components/FormStuff/RichTextEditor';
import { froalaEditorConfig } from 'components/FormStuff/config';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledContentField from '../../../styled/Modals/StyledContentField';
import Styled from '../Styled';

const { Option } = Select;

class FiledManageInput extends Component {
  state = {
    colGroup: undefined,
    colType: undefined,
    IN: undefined,
    MO: undefined,
    VI: undefined,
    fieldName: '',
    fieldDesc: '',
    key: 'fieldList',
  };

  componentDidMount() {
    const { getCallDataHandler, apiArray, id } = this.props;
    getCallDataHandler(id, apiArray);
    console.log(this.props, '테스트...');
  }

  onChangeSelectList = (value, name) => {
    this.setState({ [name]: value });
  };

  callApiData = (key, value) => {
    const { getCallDataHandler, id } = this.props;
    const { COL_GROUP_IDX, COL_TYPE_IDX } = value;
    const apiArr = [{ key, url: `/api/builder/v1/work/FieldList`, type: 'POST', params: { key, COL_GROUP_IDX, COL_TYPE_IDX } }];
    getCallDataHandler(id, apiArr);
  };

  onClickSave = () => {
    const { id, getCallDataHandler, onCloseModal } = this.props;
    const params = this.state;
    const apiArr = [{ key: 'fieldList', url: `/api/builder/v1/work/FieldCreate`, type: 'POST', params }];
    if (this.checkValidate()) {
      getCallDataHandler(id, apiArr);
      message.success(<MessageContent>저장 완료.</MessageContent>, 3);
      onCloseModal();
    }
  };

  onChangeDesc = (model, name) => {
    this.setState({ fieldDesc: model });
  };

  checkValidate = () => {
    const { colGroup, colType, IN, MO, VI, fieldDesc, fieldName } = this.state;

    if (colGroup === undefined) {
      message.warning(<MessageContent>컬럼형식을 선택해 주세요</MessageContent>, 3);
      return false;
    }
    if (colType === undefined) {
      message.warning(<MessageContent>DB타입을 선택해 주세요</MessageContent>, 3);
      return false;
    }
    if (IN === undefined) {
      message.warning(<MessageContent>입력 컴포넌트를 선택해 주세요</MessageContent>, 3);
      return false;
    }
    if (MO === undefined) {
      message.warning(<MessageContent>수정 컴포넌트를 선택해 주세요</MessageContent>, 3);
      return false;
    }
    if (VI === undefined) {
      message.warning(<MessageContent>조회 컴포넌트를 선택해 주세요</MessageContent>, 3);
      return false;
    }
    if (fieldName === '' || fieldName === ' ') {
      message.warning(<MessageContent>필드명을 입력해 주세요</MessageContent>, 3);
      return false;
    }
    if (fieldDesc === '') {
      message.warning(<MessageContent>필드 설명을 입력해 주세요</MessageContent>, 3);
      return false;
    }

    return true;
  };

  render() {
    const {
      id,
      removeReduxStateByKey,
      result: { groupList, typeList, compList },
    } = this.props;
    console.log(this.props, '프롭스');
    return (
      <StyledContentField>
        <div>
          <Row>
            <div className="pop_tit">필드관리</div>
          </Row>
          <div className="pop_con">
            <div className="sub_form">
              <Row>
                <div className="w100Table">
                  <Col span={3}>컬럼형식(논리):</Col>
                  <Col span={21}>
                    <Select
                      placeholder="컬럼형식을 선택해 주세요"
                      value={this.state.colGroup}
                      style={{ width: 300, marginRight: 10 }}
                      onChange={value => {
                        this.onChangeSelectList(value, 'colGroup');
                        this.callApiData('typeList', { COL_GROUP_IDX: value });
                        removeReduxStateByKey(id, 'compList');
                        this.setState({ colType: undefined, IN: undefined, MO: undefined, VI: undefined });
                      }}
                    >
                      {groupList && groupList.list && groupList.list.map(item => <Option value={item.COL_GROUP_IDX}>{item.COL_GROUP_NAME}</Option>)}
                    </Select>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>컬럼형식 DB타입</Col>
                  <Col span={21}>
                    <Select
                      placeholder="DB타입을 선택해 주세요"
                      value={this.state.colType}
                      style={{ width: 300, marginRight: 10 }}
                      onChange={value => {
                        this.onChangeSelectList(value, 'colType');
                        this.callApiData('compList', { COL_GROUP_IDX: this.state.colGroup, COL_TYPE_IDX: value });
                        this.setState({ IN: undefined, MO: undefined, VI: undefined });
                      }}
                    >
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
                        입력:
                        <Select
                          style={{ width: 300, marginRight: 10 }}
                          placeholder="컴포넌트를 설정해 주세요"
                          value={this.state.IN}
                          onChange={value => this.setState({ IN: value })}
                        >
                          {compList && compList.list && compList.list.map(item => <Option value={item.COMP_POOL_IDX}>{item.COMP_NAME}</Option>)}
                        </Select>
                      </div>
                    </Row>
                    <Row>
                      <div className="w100Table">
                        수정:
                        <Select
                          style={{ width: 300, marginRight: 10 }}
                          placeholder="컴포넌트를 설정해 주세요"
                          value={this.state.MO}
                          onChange={value => this.setState({ MO: value })}
                        >
                          {compList && compList.list && compList.list.map(item => <Option value={item.COMP_POOL_IDX}>{item.COMP_NAME}</Option>)}
                        </Select>
                      </div>
                    </Row>
                    <Row>
                      <div className="w100Table">
                        조회:
                        <Select
                          style={{ width: 300, marginRight: 10 }}
                          placeholder="컴포넌트를 설정해 주세요"
                          value={this.state.VI}
                          onChange={value => this.setState({ VI: value })}
                        >
                          {compList && compList.list && compList.list.map(item => <Option value={item.COMP_POOL_IDX}>{item.COMP_NAME}</Option>)}
                        </Select>
                      </div>
                    </Row>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>필드명</Col>
                  <Col span={21}>
                    <Input value={this.state.fieldName} onChange={e => this.setState({ fieldName: e.target.value })}></Input>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>필드 설명</Col>
                  <Col span={21}>
                    <RichTextEditor
                      name="field_desc"
                      config={froalaEditorConfig()}
                      saveTempContents={(model, name) => {
                        this.onChangeDesc(model, name);
                      }}
                      defaultValue={this.state.fieldDesc}
                    ></RichTextEditor>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="btn-wrap">
                  <Col span={24}>
                    <StyledButton className="btn-primary btn-sm" onClick={this.onClickSave}>
                      저장
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

FiledManageInput.defaultProps = {
  apiArray: [{ key: 'groupList', url: `/api/builder/v1/work/FieldList`, type: 'POST', params: { key: 'groupList' } }],
};

export default FiledManageInput;
