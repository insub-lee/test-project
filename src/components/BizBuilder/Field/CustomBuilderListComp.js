import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Modal } from 'antd';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

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
    this.extraBuilderRender('LIST');
  }

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
        <ExtraBuilder
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
  };

  listOnRowClick = record => {
    const {
      customOnRowClick,
      sagaKey: id,
      changeFormData,
      changeValidationData,
      CONFIG: {
        property: { dataKey, isRequired },
      },
      COMP_FIELD,
      NAME_KOR,
    } = this.props;
    if (isRequired) {
      changeValidationData(id, COMP_FIELD, record || record[dataKey] !== '', record || record[dataKey] !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, record || record[dataKey]);
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
    } = this.props;
    const { modalVisible, ExtraBuilder } = this.state;
    if (readOnly || CONFIG.property.readOnly) {
      return <span>{colData}</span>;
    }
    return visible ? (
      <>
        <Search
          value={colData}
          placeholder={placeholder || ''}
          readOnly
          className={className || ''}
          style={{ width: 150 }}
          onClick={() => this.handleModalVisible('LIST')}
        />
        {inputBtn === 'Y' && <StyledButton onClick={() => this.handleModalVisible('INPUT')}>등록</StyledButton>}
        <Modal visible={modalVisible} width={modalWidth} height={modalHeight} onCancel={() => this.handleModalVisible('CANCEL')} footer={[null]}>
          {ExtraBuilder}
        </Modal>
      </>
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
};

CustomBuilderListComp.defaultProps = {
  sagaKey: '',
  colData: '',
  FieldCustomListPage: undefined,
  FieldCustomInputPage: undefined,
  customOnRowClick: undefined,
  ExtraBuilder: () => {},
  CONFIG: {
    property: {
      listSagaKey: '',
      listWorkSeq: -1,
      listMetaSeq: -1,
      dataKey: '',
      modalWidth: 1000,
      modalHeight: 700,
      inputBtn: 'N',
    },
  },
};

export default CustomBuilderListComp;
