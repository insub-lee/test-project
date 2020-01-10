import React, { Component } from 'react';
import FroalaEditor from 'components/FormStuff/RichTextEditor/FroalaEditor';
import { froalaEditorConfig } from 'components/FormStuff/config';
import { Descriptions, Input, Select, Checkbox } from 'antd';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledTextarea from 'commonStyled/Form/StyledTextarea';
import { isJSON } from 'utils/helpers';
import StyledButton from '../Styled/StyledButton';
import StyledPool from './StyledPool';

const { TextArea } = Input;
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTextArea = StyledTextarea(TextArea);

const { Option } = Select;
class Edit extends Component {
  componentDidMount() {}

  changeGroupIdx = val => {
    const { id, formData, changeFormData } = this.props;
    console.debug(val);
    changeFormData(id, 'COL_GROUP_IDX', val);
    if (val === 3) {
      if (formData.COMP_CONFIG && formData.COMP_CONFIG.length > 0 && isJSON(formData.COMP_CONFIG)) {
        const compConfig = JSON.parse(formData.COMP_CONFIG);
        compConfig.info.isClob = true;
        changeFormData(id, 'COMP_CONFIG', JSON.stringify(compConfig));
      } else {
        changeFormData(id, 'COMP_CONFIG', '{"info":{"isClob": true}}');
      }
    }
  };

  render() {
    const { result, id, formData } = this.props;
    console.debug('props', this.props);
    return (
      <StyledPool>
        <Descriptions bordered>
          <Descriptions.Item label="구분" span={3}>
            <AntdSelect
              allowClear
              value={formData.COL_GROUP_IDX !== null ? formData.COL_GROUP_IDX : undefined}
              onChange={val => this.changeGroupIdx(val)}
              placeholder="컴포넌트 구분을 선택해주세요"
              style={{ width: '100%' }}
            >
              {result && result.compPoolData && result.compPoolData.colGroup.map(col => <Option value={col.COL_GROUP_IDX}>{col.COL_GROUP_NAME}</Option>)}
            </AntdSelect>
          </Descriptions.Item>
          <Descriptions.Item label="컬럼DB형식" span={3}>
            <AntdSelect
              onChange={val => this.props.changeFormData(id, 'COL_TYPE_IDX', val)}
              value={formData.COL_TYPE_IDX !== null ? formData.COL_TYPE_IDX : undefined}
              allowClear
              placeholder="컬럼 DB형식을 선택해주세요"
              style={{ width: '100%' }}
            >
              {result &&
                result.compPoolData &&
                result.compPoolData.colTypes
                  .filter(x => x.COL_GROUP_IDX === formData.COL_GROUP_IDX)
                  .map(col => <Option value={col.COL_TYPE_IDX}>{col.COL_DB_TYPE}</Option>)}
            </AntdSelect>
          </Descriptions.Item>
          <Descriptions.Item label="컴포넌트 명" span={3}>
            <AntdInput
              name="COMP_NAME"
              placeholder="컴포넌트 명"
              value={formData.COMP_NAME !== null ? formData.COMP_NAME : undefined}
              onChange={e => this.props.changeFormData(id, 'COMP_NAME', e.target.value)}
            />
          </Descriptions.Item>
          <Descriptions.Item label="컴포넌트 TAG" span={3}>
            <AntdInput
              name="COMP_NAME"
              placeholder="컴포넌트 TAG"
              value={formData.COMP_TAG !== null ? formData.COMP_TAG : undefined}
              onChange={e => this.props.changeFormData(id, 'COMP_TAG', e.target.value)}
            />
          </Descriptions.Item>
          <Descriptions.Item label="컴포넌트 경로" span={3}>
            <AntdInput
              name="COMP_SRC"
              placeholder="컴포넌트 경로"
              value={formData.COMP_SRC !== null ? formData.COMP_SRC : undefined}
              onChange={e => this.props.changeFormData(id, 'COMP_SRC', e.target.value)}
            />
          </Descriptions.Item>
          <Descriptions.Item label="컴포넌트 설정경로" span={3}>
            <AntdInput
              name="COMP_SETTING_SRC"
              placeholder="컴포넌트 설정경로"
              value={formData.COMP_SETTING_SRC !== null ? formData.COMP_SETTING_SRC : undefined}
              onChange={e => this.props.changeFormData(id, 'COMP_SETTING_SRC', e.target.value)}
            />
          </Descriptions.Item>
          <Descriptions.Item label="컴포넌트 설정" span={3}>
            <AntdTextArea
              name="COMP_CONFIG"
              placeholder="컴포넌트 설정"
              value={formData.COMP_CONFIG !== null ? formData.COMP_CONFIG : undefined}
              onChange={e => this.props.changeFormData(id, 'COMP_CONFIG', e.target.value)}
            />
          </Descriptions.Item>
          <Descriptions.Item label="컴포넌트 설명" span={3}>
            <FroalaEditor
              name="COMP_DESC"
              onModelChange={model => this.props.changeFormData(id, 'COMP_DESC', model)}
              config={froalaEditorConfig()}
              model={formData.COMP_DESC !== null ? formData.COMP_DESC : undefined}
            />
          </Descriptions.Item>
        </Descriptions>
        <div className="btnWrap" style={{ marginTop: '10px', textAlign: 'right' }}>
          {this.props.actionType === 'I' ? (
            <StyledButton className="btn-primary btn-first" onClick={() => this.props.onCompSave()}>
              저장
            </StyledButton>
          ) : (
            <StyledButton className="btn-primary btn-first" onClick={() => this.props.onModifySave()}>
              수정
            </StyledButton>
          )}
          {/* ) : (
            <React.Fragment>
              <StyledButton className="btn-primary btn-first" onClick={() => onSaveHandle()}>
                수정
              </StyledButton>
              <StyledButton className="btn-light btn-first" onClick={() => modifyResetHandle()}>
                초기화
              </StyledButton>
              <StyledButton className="btn-light btn-first" onClick={() => closeBtnHandle()}>
                닫기
              </StyledButton>
            </React.Fragment>
          )} */}
        </div>
      </StyledPool>
    );
  }
}

Edit.propTypes = {};

Edit.defaultProps = {};

export default Edit;
