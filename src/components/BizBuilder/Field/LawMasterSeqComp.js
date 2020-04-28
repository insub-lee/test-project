import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import LawModal from 'apps/eshs/user/operation/law/lawModal';

class LawMasterSeqComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      selectedRechNo: '',
      selectedLawName: '',
      selectedRegUserName: '',
    };
  }

  componentDidMount = () => {
    const { sagaKey: id, changeFormData, COMP_FIELD, compProps } = this.props;
    changeFormData(id, COMP_FIELD, (compProps && compProps.MASTER_SEQ) || ''); // 법규 SEQ
    changeFormData(id, 'RECH_LAW_NAME', (compProps && compProps.MASTER_RECH_NAME) || ''); // 법규명
    changeFormData(id, 'RECH_NO', (compProps && compProps.MASTER_NO) || ''); // 법규 관리번호
  };

  onSelected = rowData => {
    const { sagaKey: id, changeFormData, COMP_FIELD } = this.props;
    changeFormData(id, COMP_FIELD, rowData.TASK_SEQ); // 법규 SEQ
    changeFormData(id, 'RECH_LAW_NAME', rowData.TITLE); // 법규명
    changeFormData(id, 'RECH_NO', rowData.RECH_NO); // 법규 관리번호
    changeFormData(id, 'MASTER_REG_NAME', rowData.REG_USER_NAME); // 법규 등록자명
    this.setState({ selectedRechNo: rowData.RECH_NO, selectedLawName: rowData.TITLE, selectedRegUserName: rowData.REG_USER_NAME });
    this.handleOnChangeSearch(rowData.TASK_SEQ);
    this.onCancel();
  };

  isOpenLawModal = () => {
    this.setState({ isOpenModal: true });
  };

  onCancel = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  // custom search 예제
  handleOnChangeSearch = value => {
    const { sagaKey, COMP_FIELD, changeSearchData } = this.props;
    const searchText = value ? `AND W.${COMP_FIELD} = ${value} ` : '';
    changeSearchData(sagaKey, COMP_FIELD, searchText);
  };

  render = () => {
    const { CONFIG, colData, readOnly, visible, isSearch, searchCompRenderer } = this.props;

    return visible ? (
      <>
        <table>
          <tbody>
            <tr>
              <td style={{ width: '33%' }}>
                <span>법규</span>
              </td>
              <td style={{ width: '66%' }}>
                <Input style={{ width: '30%' }} value={this.state.selectedRechNo} placeholder="관리 번호" readOnly />
                <Input style={{ width: '30%' }} value={this.state.selectedLawName} placeholder="법규명" readOnly />
                <StyledButton className="btn-primary" onClick={() => this.isOpenLawModal()} readOnly>
                  Law Search
                </StyledButton>
              </td>
            </tr>
            <tr>
              <td style={{ width: '33%' }}>
                <span>작성자</span>
              </td>
              <td>
                <Input className="input-width200" value={this.state.selectedRegUserName} placeholder="작성자" readOnly />
              </td>
            </tr>
          </tbody>
        </table>
        <Modal visible={this.state.isOpenModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
          <div>{this.state.isOpenModal && <LawModal onCancel={this.onCancel} onSelected={this.onSelected} />}</div>
        </Modal>
      </>
    ) : (
      ''
    );
  };
}

LawMasterSeqComp.propTypes = {
  colData: PropTypes.any,
  visible: PropTypes.bool,
};

export default LawMasterSeqComp;
