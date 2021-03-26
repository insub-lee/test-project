import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Modal } from 'antd';
import UserSelect from 'components/UserSelect';

class UserSelectComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      searchValue: '',
    };
  }

  onUserSelect = result => {
    console.debug(result);
  };

  onSelectedComplete = result => {
    const { sagaKey: id, changeFormData, COMP_FIELD } = this.props;

    if (result.length > 0) {
      // 커스텀영역이 필요하지만 일단 id 기준으로 야외행사 신청서 일경우 따로 formData Change 지정(이정현)
      // 발견된 이슈사항 :: result 조회시 EMP_NO (사번)이 NAME 으로 나타나고 있습니다.
      if (id === 'outdoorEvent') {
        changeFormData(id, COMP_FIELD, `${result[0].EMP_NO}`);
        changeFormData(id, COMP_FIELD.replace('NO', 'NM'), `${result[0].NAME_KOR}`);
      } else {
        changeFormData(id, COMP_FIELD, `${result[0].EMP_NO}`);
        changeFormData(id, COMP_FIELD.replace('NO', 'NAME'), `${result[0].NAME_KOR}`);
        changeFormData(id, COMP_FIELD.replace('NO', 'DEPT'), result[0].DEPT_NAME_KOR);
      }
      this.setState(
        {
          isOpenModal: false,
          searchValue: `${result[0].NAME_KOR}`,
        },
        () => this.handleOnChangeSearch(`${result[0].NAME_KOR}`),
      );
    }
  };

  // onSelectedCompleteBySearch
  // onSelectedCompleteAfter = result => {
  //   if (result.length > 0) {
  //     this.setState(
  //       {
  //         isOpenModal: false,
  //         searchValue: `${result[0].NAME_KOR}`,
  //       },
  //       () => this.handleOnChangeSearch(`${result[0].NAME_KOR}`),
  //     );
  //   }
  // };

  onCancel = () => {
    this.setState({ isOpenModal: false });
  };

  // custom search 예제
  /*
    handleOnChangeSearch = value => {
      const { sagaKey, COMP_FIELD, changeSearchData } = this.props;
      const searchText =
        value.length > 0
          ? `AND W.${COMP_FIELD} LIKE '%${value}%' AND W.${COMP_FIELD}1 LIKE '%${value}%' AND W.${COMP_FIELD}2 LIKE '%${value}%' AND W.${COMP_FIELD}3 LIKE '%${value}%'`
          : '';
      changeSearchData(sagaKey, COMP_FIELD, searchText);
    };
  */

  // custom search 예제
  handleOnChangeSearch = value => {
    const { sagaKey, COMP_FIELD, changeSearchData, workInfo } = this.props;
    const { WORK_SEQ, WORK_ID } = workInfo;
    let searchText = value.length > 0 ? `AND W.${COMP_FIELD} LIKE '%${value}%'` : '';
    // 안전작업허가, 안전작업자료(페이지 내 커스텀 검색)
    if (WORK_SEQ === 8361 || WORK_ID === 'SWTB_SAFETY_WORK_FILE') {
      searchText =
        value.length > 0 ? `AND W.${COMP_FIELD} in (select EMP_NO from fr_user where NAME_KOR like '%${value}%')` : '';
    }
    changeSearchData(sagaKey, COMP_FIELD, searchText);
  };

  render() {
    const {
      sagaKey: id,
      CONFIG,
      visible,
      readOnly,
      colData,
      isSearch,
      searchCompRenderer,
      viewType,
      formData,
      COMP_FIELD,
      workInfo,
    } = this.props;
    const { WORK_ID } = workInfo;
    const { searchValue } = this.state;
    let inputValue = formData[COMP_FIELD.replace('NO', 'NAME')]
      ? `${formData[COMP_FIELD.replace('NO', 'NAME')]}(${colData})`
      : colData;
    if (id === 'outdoorEvent') {
      inputValue = formData[COMP_FIELD.replace('NO', 'NM')]
        ? `${formData[COMP_FIELD.replace('NO', 'NM')]}(${colData})`
        : colData;
    }

    if (isSearch && visible) {
      if (CONFIG.property.searchType !== 'CUSTOM') {
        return searchCompRenderer(this.props);
      }
      // 안전작업자료(페이지 내 커스텀 검색)
      if (WORK_ID === 'SWTB_SAFETY_WORK_FILE') {
        return (
          <>
            <Input
              readOnly
              value={searchValue}
              onClick={() => this.setState({ isOpenModal: true })}
              className={CONFIG.property.className || ''}
            />
            <Modal visible={this.state.isOpenModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
              <UserSelect
                onUserSelectHandler={this.onUserSelect}
                onUserSelectedComplete={this.onSelectedComplete}
                onCancel={this.onCancel}
              />
            </Modal>
          </>
        );
      }
      return (
        <Input
          onChange={e => this.handleOnChangeSearch(e.target.value)}
          className={CONFIG.property.className || ''}
          defaultValue=""
        />
      );
    }

    return visible ? (
      <>
        {readOnly || viewType === 'LIST' ? (
          <span className={CONFIG.property.className || ''}>
            {formData[COMP_FIELD.replace('NO', 'NAME')]
              ? `${formData[COMP_FIELD.replace('NO', 'NAME')]}(${colData})`
              : colData}
          </span>
        ) : (
          <>
            <Input
              readOnly
              placeholder="select me"
              value={inputValue}
              onClick={() => this.setState({ isOpenModal: true })}
              className={CONFIG.property.className || ''}
            />
            <Modal visible={this.state.isOpenModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
              <UserSelect
                onUserSelectHandler={this.onUserSelect}
                onUserSelectedComplete={this.onSelectedComplete}
                onCancel={this.onCancel}
              />
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
  workInfo: PropTypes.object,
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.any,
  CONFIG: PropTypes.any,
  changeFormData: PropTypes.any,
  colData: PropTypes.any,
  changeSearchData: PropTypes.func,
};

export default UserSelectComp;
