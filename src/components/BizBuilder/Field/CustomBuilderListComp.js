import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Modal } from 'antd';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import BizBuilderBase from 'components/BizBuilderBase';

const { Search } = Input;

class CustomBuilderListComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      ExtraBuilder: [],
    };
  }

  componentDidMount() {
    const {
      viewPageData: { viewType },
      getExtraApiData,
      sagaKey: id,
      CONFIG: {
        property: { listWorkSeq, dataKey, isFormData },
      },
      colData,
    } = this.props;
    if (viewType === 'INPUT' || viewType === 'MODIFY') this.extraBuilderRender('LIST');
    if (viewType === 'VIEW' || viewType === 'MODIFY') {
      if ((isFormData === 'Y' && colData !== '') || colData !== undefined || colData !== null) {
        const apiArray = [
          {
            key: 'CustomDetailData',
            url: `/api/eshs/v1/common/eshsBuilderCustomSearch/${listWorkSeq}`,
            type: 'POST',
            params: { PARAM: { whereString: [`AND W.${dataKey} = '${colData}'`] } },
          },
        ];
        getExtraApiData(id, apiArray, this.handleFieldStart);
      }
    }
  }

  handleFieldStart = () => {
    const {
      extraApiData,
      sagaKey: id,
      formData,
      setFormData,
      colData,
      CONFIG: {
        property: { dataKey },
      },
    } = this.props;
    const apiData = (extraApiData && extraApiData.CustomDetailData && extraApiData.CustomDetailData.list) || [];
    if (apiData.length === 1) {
      // System field 값이 중복되어 스프레드로 apiData[0]먼저 넣어줌
      setFormData(id, { ...apiData[0], ...formData });
    } else {
      console.debug(`------ CustomBuilderListComp ------ colData [${colData}]로 [${dataKey}]컬럼 조회결과 [${apiData.length}건]`);
      console.debug(`------ CustomBuilderListComp ------ 조회결과가 1개여야 formData값이 설정됩니다.`);
    }
  };

  handleModalVisible = action => {
    const { modalVisible } = this.state;

    switch (action) {
      case 'LIST':
        this.extraBuilderRender(action);
        break;
      case 'INPUT':
        this.extraBuilderRender(action);
        break;
      case 'CANCEL':
        this.setState({ ExtraBuilder: [] });
        break;
      default:
        break;
    }

    this.setState({ modalVisible: !modalVisible });
  };

  extraBuilderRender = viewType => {
    const {
      sagaKey: id,
      CONFIG: {
        property: { listSagaKey, listWorkSeq, listMetaSeq },
      },
      FieldCustomListPage,
      FieldCustomInputPage,
      ExtraBuilder,
      loadingComplete,
    } = this.props;

    this.setState({
      ExtraBuilder: [
        <BizBuilderBase
          key={listSagaKey}
          sagaKey={listSagaKey}
          baseSagaKey={id}
          workSeq={listWorkSeq}
          taskSeq={-1}
          listMetaSeq={listMetaSeq || undefined}
          viewType={viewType}
          CustomListPage={FieldCustomListPage}
          CustomInputPage={FieldCustomInputPage}
          loadingComplete={loadingComplete}
          isModalChange={this.isModalChange}
          saveTaskAfterCallbackFunc={() => this.extraBuilderRender('LIST')}
          customOnRowClick={record => this.listOnRowClick(record)}
        />,
      ],
    });
    // this.setState({  ExtraBuilder오류..
    //   ExtraBuilder: [
    //     <ExtraBuilder
    //       key={listSagaKey}
    //       sagaKey={listSagaKey}
    //       baseSagaKey={id}
    //       workSeq={listWorkSeq}
    //       taskSeq={-1}
    //       listMetaSeq={listMetaSeq || undefined}
    //       viewType={viewType}
    //       CustomListPage={FieldCustomListPage}
    //       CustomInputPage={FieldCustomInputPage}
    //       loadingComplete={loadingComplete}
    //       isModalChange={this.isModalChange}
    //       saveTaskAfterCallbackFunc={() => this.extraBuilderRender('LIST')}
    //       customOnRowClick={record => this.listOnRowClick(record)}
    //     />,
    //   ],
    // });
  };

  listOnRowClick = record => {
    console.debug('22222222222', record);
    const {
      customOnRowClick,
      sagaKey: id,
      changeFormData,
      changeValidationData,
      CONFIG: {
        property: { dataKey, isRequired, isFormData },
      },
      COMP_FIELD,
      NAME_KOR,
    } = this.props;
    if (isRequired) {
      changeValidationData(id, COMP_FIELD, record[dataKey] !== '', record[dataKey] !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }

    if (isFormData === 'Y') {
      const { formData, setFormData } = this.props;
      console.debug('setFormData', setFormData);
      setFormData(id, { ...record, ...formData, [COMP_FIELD]: record[dataKey] });
    } else {
      changeFormData(id, COMP_FIELD, record[dataKey]);
    }
    this.handleModalVisible('CANCEL');
    customOnRowClick(record);
  };

  render() {
    const {
      colData,
      CONFIG,
      CONFIG: {
        property: { modalWidth, modalHeight, placeholder, className, inputBtn },
      },
      readOnly,
      visible,
      viewPageData: { viewType },
    } = this.props;
    const { modalVisible, ExtraBuilder } = this.state;
    if (readOnly || CONFIG.property.readOnly) {
      return <span>{colData}</span>;
    }
    return visible ? (
      <div>
        <Search
          value={colData}
          placeholder={placeholder || ''}
          readOnly
          className={className || ''}
          style={{ width: 150 }}
          onClick={viewType === 'VIEW' ? () => {} : () => this.handleModalVisible('LIST')}
        />
        {inputBtn === 'Y' && <StyledButton onClick={() => this.handleModalVisible('INPUT')}>등록</StyledButton>}
        <Modal visible={modalVisible} width={modalWidth} height={modalHeight} onCancel={() => this.handleModalVisible('CANCEL')} footer={[null]}>
          {ExtraBuilder}
        </Modal>
      </div>
    ) : (
      ''
    );
  }
}

CustomBuilderListComp.propTypes = {
  CONFIG: PropTypes.object,
  sagaKey: PropTypes.string,
  colData: PropTypes.string,
  FieldCustomListPage: PropTypes.any,
  FieldCustomInputPage: PropTypes.any,
  ExtraBuilder: PropTypes.func,
  loadingComplete: PropTypes.any,
  customOnRowClick: PropTypes.any,
  readOnly: PropTypes.bool,
  visible: PropTypes.bool,
  COMP_FIELD: PropTypes.string,
  NAME_KOR: PropTypes.string,
  changeFormData: PropTypes.func,
  changeValidationData: PropTypes.func,
  setFormData: PropTypes.func,
  formData: PropTypes.object,
  extraApiData: PropTypes.object,
  viewPageData: PropTypes.object,
  getExtraApiData: PropTypes.func,
};

CustomBuilderListComp.defaultProps = {
  sagaKey: '',
  colData: '',
  FieldCustomListPage: undefined,
  FieldCustomInputPage: undefined,
  customOnRowClick: undefined,
  formData: {},
  ExtraBuilder: () => {},
  setFormData: () => {},
  CONFIG: {
    property: {
      listSagaKey: '',
      listWorkSeq: -1,
      listMetaSeq: -1,
      dataKey: 'TASK_SEQ',
      modalWidth: 1000,
      modalHeight: 700,
      inputBtn: 'N',
      isFormData: 'N',
    },
  },
  extraApiData: {},
  viewPageData: {},
  getExtraApiData: () => {},
};

export default CustomBuilderListComp;
