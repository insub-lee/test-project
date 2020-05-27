import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Modal } from 'antd';
import DeptSelect from 'components/DeptSelect';
class UserSelectComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
    };
  }

  onComplete = deptInfo => {
    const { sagaKey: id, changeFormData, COMP_FIELD } = this.props;
    changeFormData(id, COMP_FIELD, `${deptInfo.DEPT_CD}`);
    changeFormData(id, COMP_FIELD.replace('CD', 'NM'), `${deptInfo.NAME_KOR}`);
    this.setState({
      isOpenModal: false,
    });
  };

  onCancel = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  render() {
    const { CONFIG, visible, readOnly, colData, isSearch, searchCompRenderer, viewType, formData, COMP_FIELD } = this.props;
    if (isSearch && visible) {
      if (CONFIG.property.searchType !== 'CUSTOM') {
        return searchCompRenderer(this.props);
      }
      return <Input onChange={e => this.handleOnChangeSearch(e.target.value)} className={CONFIG.property.className || ''} />;
    }

    return visible ? (
      <>
        {readOnly || viewType === 'LIST' ? (
          <span className={CONFIG.property.className || ''}>
            {formData[COMP_FIELD.replace('CD', 'NM')] ? `${formData[COMP_FIELD.replace('CD', 'NM')]} (${colData})` : colData}
          </span>
        ) : (
          <>
            <Input
              readOnly
              placeholder="select me"
              value={formData[COMP_FIELD.replace('CD', 'NM')] ? `${formData[COMP_FIELD.replace('CD', 'NM')]} (${colData})` : colData}
              onClick={() => this.setState({ isOpenModal: true })}
              className={CONFIG.property.className || ''}
            />
            <Modal visible={this.state.isOpenModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
              <DeptSelect onComplete={this.onComplete} onCancel={this.onCancel} defaultRootDeptId={72761} />
            </Modal>
          </>
        )}
      </>
    ) : (
      ''
    );
  }
}

UserSelectComp.propTypes = {
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.any,
  CONFIG: PropTypes.any,
  changeFormData: PropTypes.any,
  colData: PropTypes.any,
};

export default UserSelectComp;
