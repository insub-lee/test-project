import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'components/FormStuff/RichTextEditor';
import { froalaEditorConfig } from 'components/FormStuff/config';
import { Descriptions, Input, Select, Checkbox } from 'antd';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledPool from './StyledPool';

class CompPoolEditComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedComp: undefined,
      viewType: 'edit',
      formData: {
        COL_GROUP_IDX: undefined,
        COL_TYPE_IDX: undefined,
        COMP_SRC: '',
        COMP_SETTING_SRC: '',
        COMP_NAME: '',
        COMP_DESC: '',
      },
      tempFormData: {},
    };
  }

  // 렌더 전 수정을 위한 viewData를 가지고 있을시 formData 및 tempFormData 설정
  componentWillMount() {
    const { formData } = this.state;
    const { viewData } = this.props;
    if (viewData.viewType === 'modify' && formData.COMP_POOL_IDX !== viewData.metaData.COMP_POOL_IDX) {
      this.setState({
        viewType: viewData.viewType,
        formData: {
          COMP_POOL_IDX: viewData.metaData.COMP_POOL_IDX,
          COL_GROUP_IDX: viewData.metaData.COL_GROUP_IDX,
          COL_TYPE_IDX: viewData.metaData.COL_TYPE_IDX,
          COMP_SRC: viewData.metaData.COMP_SRC,
          COMP_SETTING_SRC: viewData.metaData.COMP_SETTING_SRC,
          COMP_NAME: viewData.metaData.COMP_NAME,
          COMP_DESC: viewData.metaData.COMP_DESC,
        },
        tempFormData: {
          COMP_POOL_IDX: viewData.metaData.COMP_POOL_IDX,
          COL_GROUP_IDX: viewData.metaData.COL_GROUP_IDX,
          COL_TYPE_IDX: viewData.metaData.COL_TYPE_IDX,
          COMP_SRC: viewData.metaData.COMP_SRC,
          COMP_SETTING_SRC: viewData.metaData.COMP_SETTING_SRC,
          COMP_NAME: viewData.metaData.COMP_NAME,
          COMP_DESC: viewData.metaData.COMP_DESC,
        },
      });
    }
  }

  // 프롭스가 달라지면 formData 값 수정
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { viewData } = this.props;
    const { viewData: prevValue } = prevProps;

    if (viewData !== prevValue && viewData.metaData !== undefined) {
      this.setState({
        viewType: viewData.viewType,
        formData: {
          COMP_POOL_IDX: viewData.metaData.COMP_POOL_IDX,
          COL_GROUP_IDX: viewData.metaData.COL_GROUP_IDX,
          COL_TYPE_IDX: viewData.metaData.COL_TYPE_IDX,
          COMP_SRC: viewData.metaData.COMP_SRC,
          COMP_SETTING_SRC: viewData.metaData.COMP_SETTING_SRC,
          COMP_NAME: viewData.metaData.COMP_NAME,
          COMP_DESC: viewData.metaData.COMP_DESC,
        },
        tempFormData: {
          COMP_POOL_IDX: viewData.metaData.COMP_POOL_IDX,
          COL_GROUP_IDX: viewData.metaData.COL_GROUP_IDX,
          COL_TYPE_IDX: viewData.metaData.COL_TYPE_IDX,
          COMP_SRC: viewData.metaData.COMP_SRC,
          COMP_SETTING_SRC: viewData.metaData.COMP_SETTING_SRC,
          COMP_NAME: viewData.metaData.COMP_NAME,
          COMP_DESC: viewData.metaData.COMP_DESC,
        },
      });
    } else if (viewData !== prevValue && viewData.viewType === 'edit') {
      this.setState({
        viewType: 'edit',
        formData: {
          COL_GROUP_IDX: undefined,
          COL_TYPE_IDX: undefined,
          COMP_SRC: '',
          COMP_SETTING_SRC: '',
          COMP_NAME: '',
          COMP_DESC: '',
        },
        tempFormData: {
          COL_GROUP_IDX: undefined,
          COL_TYPE_IDX: undefined,
          COMP_SRC: '',
          COMP_SETTING_SRC: '',
          COMP_NAME: '',
          COMP_DESC: '',
        },
      });
    }
  }

  componentDidMount() {
    const { getCallDataHanlder, id, apiArys } = this.props;
    getCallDataHanlder(id, apiArys);
  }

  modifyResetHandle = () => {
    const { formData, tempFormData } = this.state;
    this.setState(
      {
        formData: {
          ...formData,
          COMP_POOL_IDX: tempFormData.COMP_POOL_IDX,
          COL_GROUP_IDX: tempFormData.COL_GROUP_IDX,
          COL_TYPE_IDX: tempFormData.COL_TYPE_IDX,
          COMP_SRC: tempFormData.COMP_SRC,
          COMP_SETTING_SRC: tempFormData.COMP_SETTING_SRC,
          COMP_NAME: tempFormData.COMP_NAME,
          COMP_DESC: tempFormData.COMP_DESC,
        },
      },
      () => message.success(<MessageContent>정보가 초기화 되었습니다.</MessageContent>, 2),
    );
  };

  onChangeHandle = (name, value) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [name]: value,
      },
    });
  };

  onChangeColGroup = e => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        COL_GROUP_IDX: e,
      },
    });
  };

  colGroupSelect = colGroup => {
    const { formData } = this.state;
    const { Option } = Select;
    return (
      <Select
        showSearch
        style={{ width: '30%' }}
        value={formData.COL_GROUP_IDX}
        placeholder="컬럼형식을 선택해주십시오."
        onChange={e => this.onChangeColGroup(e)}
      >
        {colGroup.map(col => (
          <Option value={col.COL_GROUP_IDX}>{`${col.COL_GROUP_NAME}`}</Option>
        ))}
      </Select>
    );
  };

  // 컬럼 DB 타입 - 체크박스 렌더
  colTypeCheck = colTypes => {
    const { formData } = this.state;
    return (
      <Checkbox.Group style={{ width: '100%' }} value={[formData.COL_TYPE_IDX]}>
        {colTypes.map(type => (
          <Checkbox value={type.COL_TYPE_IDX} onChange={e => this.onChangeHandle('COL_TYPE_IDX', type.COL_TYPE_IDX)}>{`${type.COL_DB_TYPE}`}</Checkbox>
        ))}
      </Checkbox.Group>
    );
  };

  resetState = () => {
    this.setState(
      {
        formData: {
          COL_GROUP_IDX: undefined,
          COL_TYPE_IDX: undefined,
          COMP_SRC: '',
          COMP_SETTING_SRC: '',
          COMP_NAME: '',
          COMP_DESC: '',
        },
      },
      () => message.success(<MessageContent>Component Pool 이 저장되었습니다.</MessageContent>, 2),
    );
  };

  // 저장
  onSaveHandle = () => {
    const { id, getCallDataHanlder, closeBtnHandle, viewData } = this.props;
    const { formData, viewType } = this.state;
    if (formData.COL_GROUP_IDX === undefined) {
      return message.success(<MessageContent>컬럼형식(논리)을 선택해주십시오.</MessageContent>, 2);
    }

    if (formData.COL_TYPE_IDX === undefined) {
      return message.success(<MessageContent>컬럼 DB 타입을 선택해주십시오.</MessageContent>, 2);
    }

    if (formData.COMP_NAME === '') {
      return message.success(<MessageContent>컴포넌트 명을 입력해주십시오.</MessageContent>, 2);
    }

    if (formData.COMP_SRC === '') {
      return message.success(<MessageContent>컴포넌트 경로를 입력해주십시오.</MessageContent>, 2);
    }

    const insertApi = [
      {
        key: 'insertCompPoolData',
        url: '/api/builder/v1/work/ComponentPool',
        type: 'POST',
        params: {
          ...formData,
        },
      },
    ];

    const updateApi = [
      {
        key: 'updateCompPoolData',
        url: '/api/builder/v1/work/ComponentPool',
        type: 'PUT',
        params: {
          ...formData,
        },
      },
    ];

    if (viewType === 'edit') {
      getCallDataHanlder(id, insertApi, closeBtnHandle);
      // this.resetState();
    }

    if (viewType === 'modify') {
      getCallDataHanlder(id, updateApi, closeBtnHandle);
      message.success(<MessageContent>정보가 수정되었습니다.</MessageContent>, 2);
    }
  };

  render() {
    const { result, closeBtnHandle } = this.props;
    const { formData, viewType } = this.state;
    const { colGroupSelect, colTypeCheck, onChangeHandle, onSaveHandle, modifyResetHandle } = this;

    let colGroup = [];
    if (Object.prototype.hasOwnProperty.call(result, 'compPoolData')) {
      const colCroupArr = result.compPoolData.colGroup;
      colGroup = colCroupArr;
    }

    let colTypeList = [];
    if (formData.COL_GROUP_IDX !== undefined && result.compPoolData !== undefined) {
      colTypeList = result.compPoolData.colTypes.filter(item => item.COL_GROUP_IDX === formData.COL_GROUP_IDX);
    }

    return (
      <StyledPool>
        <Descriptions bordered>
          <Descriptions.Item label="컬럼형식(논리)" span={3}>
            {colGroupSelect(colGroup)}
          </Descriptions.Item>
          <Descriptions.Item label="컬럼 DB타입" span={3}>
            {formData.COL_GROUP_IDX === undefined ? '* 컬럼형식(논리)를 선택해주십시오.' : colTypeCheck(colTypeList)}
          </Descriptions.Item>
          <Descriptions.Item label="컴포넌트 명" span={3}>
            <Input name="COMP_NAME" value={formData.COMP_NAME} placeholder="컴포넌트 명" onChange={e => onChangeHandle(e.target.name, e.target.value)} />
          </Descriptions.Item>
          <Descriptions.Item label="컴포넌트 경로" span={3}>
            <Input name="COMP_SRC" value={formData.COMP_SRC} placeholder="컴포넌트 경로" onChange={e => onChangeHandle(e.target.name, e.target.value)} />
          </Descriptions.Item>
          <Descriptions.Item label="컴포넌트 설정경로" span={3}>
            <Input
              name="COMP_SETTING_SRC"
              value={formData.COMP_SETTING_SRC}
              placeholder="컴포넌트 설정경로"
              onChange={e => onChangeHandle(e.target.name, e.target.value)}
            />
          </Descriptions.Item>
          <Descriptions.Item label="컴포넌트 설명" span={3}>
            <RichTextEditor
              name="COMP_DESC"
              defaultValue={formData.COMP_DESC}
              saveTempContents={(model, name) => this.onChangeHandle(name, model)}
              config={froalaEditorConfig()}
            />
          </Descriptions.Item>
        </Descriptions>
        <div className="btnWrap" style={{ marginTop: '10px', textAlign: 'right' }}>
          {viewType === 'edit' ? (
            <StyledButton className="btn-primary btn-first" onClick={() => onSaveHandle()}>
              저장
            </StyledButton>
          ) : (
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
          )}
        </div>
      </StyledPool>
    );
  }
}

CompPoolEditComponent.propTypes = {
  viewData: PropTypes.object,
  id: PropTypes.string,
  apiArys: PropTypes.array,
  getCallDataHanlder: PropTypes.func,
  result: PropTypes.object,
  closeBtnHandle: PropTypes.func,
};

CompPoolEditComponent.defaultProps = {
  viewData: {
    viewType: 'edit',
  },
  id: 'ComponentPool',
  apiArys: [
    {
      key: 'compPoolData',
      url: '/api/builder/v1/work/ComponentPool',
      type: 'GET',
      params: {},
    },
  ],
  getCallDataHanlder: () => false,
  result: {},
  closeBtnHandle: () => false,
};

export default CompPoolEditComponent;
