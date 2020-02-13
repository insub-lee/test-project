import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Modal } from 'antd';
import UserSelect from 'components/UserSelect';

class UserSelectComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
    };
  }

  onUserSelect = result => {
    console.debug(result);
  };

  onSelectedComplete = result => {
    const { sagaKey: id, changeFormData, COMP_FIELD } = this.props;
    if (result.length > 0) {
      changeFormData(id, COMP_FIELD, `${result[0].NAME_KOR}(${result[0].EMP_NO})`);
      changeFormData(id, COMP_FIELD.replace('NO', 'DEPT'), result[0].DEPT_NAME_KOR);

      this.setState({
        isOpenModal: false,
      });
    }
  };

  onCancel = () => {
    this.setState({ isOpenModal: false });
  };

  // custom search 예제
  handleOnChangeSearch = value => {
    const { sagaKey, COMP_FIELD, changeSearchData } = this.props;
    const searchText =
      value.length > 0
        ? `AND W.${COMP_FIELD} LIKE '%${value}%' AND W.${COMP_FIELD}1 LIKE '%${value}%' AND W.${COMP_FIELD}2 LIKE '%${value}%' AND W.${COMP_FIELD}3 LIKE '%${value}%'`
        : '';
    changeSearchData(sagaKey, COMP_FIELD, searchText);
  };

  // custom search 예제
  handleOnChangeSearch = value => {
    const { sagaKey, COMP_FIELD, changeSearchData } = this.props;
    const searchText = value.length > 0 ? `AND W.${COMP_FIELD} LIKE '%${value}%'` : '';
    changeSearchData(sagaKey, COMP_FIELD, searchText);
  };

  render() {
    const { CONFIG, visible, readOnly, colData, isSearch, searchCompRenderer, viewType } = this.props;
    if (isSearch && visible) {
      if (CONFIG.property.searchType !== 'CUSTOM') {
        return searchCompRenderer(this.props);
      }
      return <Input onChange={e => this.handleOnChangeSearch(e.target.value)} className={CONFIG.property.className || ''} />;
    }

    return visible ? (
      <>
        {viewType !== 'LIST' ? (
          <>
            <Input
              readOnly
              placeholder="select me"
              value={colData}
              onClick={() => this.setState({ isOpenModal: true })}
              className={CONFIG.property.className || ''}
            />
            <Modal visible={this.state.isOpenModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
              <UserSelect onUserSelectHandler={this.onUserSelect} onUserSelectedComplete={this.onSelectedComplete} onCancel={this.onCancel} />
            </Modal>
          </>
        ) : (
          <span className={CONFIG.property.className || ''}>{colData}</span>
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
