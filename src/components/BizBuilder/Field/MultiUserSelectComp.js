import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Modal } from 'antd';
import UserSelect from 'components/UserSelect';

class MultiUserSelectComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
    };
  }

  onSelectedComplete = result => {
    const { CONFIG } = this.props;
    if (result.length) {
      const data = this.multipleCheck(CONFIG.property.isMultiple, result);
      this.subBuilderCheck(data, this.props);
      // 커스텀영역이 필요하지만 일단 id 기준으로 야외행사 신청서 일경우 따로 formData Change 지정(이정현)
      // 발견된 이슈사항 :: result 조회시 EMP_NO (사번)이 NAME 으로 나타나고 있습니다.
      // if (id === 'outdoorEvent') {
      //   changeFormData(id, COMP_FIELD, `${result[0].USER_ID}`);
      //   changeFormData(id, COMP_FIELD.replace('NO', 'NM'), `${result[0].NAME_KOR}`);
      // } else {
      //   changeFormData(id, COMP_FIELD, `${result[0].EMP_NO}`);
      //   changeFormData(id, COMP_FIELD.replace('NO', 'NAME'), `${result[0].NAME_KOR}`);
      //   changeFormData(id, COMP_FIELD.replace('NO', 'DEPT'), result[0].DEPT_NAME_KOR);
      // }
      // this.setState({
      //   isOpenModal: false,
      // });
    }
  };

  multipleCheck = (isMultiple, result) => {
    if (isMultiple) {
      // return JSON.stringify(result);
      return result;
    }
    return result[0];
  };

  subBuilderCheck = (data, { sagaKey: id, saveTask, changeFormData, COMP_FIELD, CONFIG, parentWorkSeq, parentTaskSeq }) => {
    if (CONFIG.property.isSubComp) {
      console.debug('@@@@SUBBUILDER@@@@');
      changeFormData(id, 'PARENT_SEQ', parentWorkSeq);
      changeFormData(id, 'PARENT_TASK_SEQ', parentTaskSeq);
      changeFormData(id, 'EDU_USERS', data);
      saveTask(id, id);
    } else {
      console.debug('@@@@@MAIN BUILDER@@@@@');
      changeFormData(id, COMP_FIELD, data);
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
    const { CONFIG, visible, readOnly, colData, isSearch, searchCompRenderer, viewType, formData, COMP_FIELD, viewPageData } = this.props;

    if (!visible) {
      return null;
    }

    if (isSearch && visible) {
      if (CONFIG.property.searchType !== 'CUSTOM') {
        return searchCompRenderer(this.props);
      }
      return <Input onChange={e => this.handleOnChangeSearch(e.target.value)} className={CONFIG.property.className || ''} />;
    }

    if (CONFIG.property.isSubComp) {
      return (
        <>
          <UserSelect onUserSelectHandler={null} onUserSelectedComplete={this.onSelectedComplete} onCancel={this.onCancel} />
        </>
      );
    }

    if (readOnly || viewPageData.viewType.toUpperCase() === 'LIST' || viewPageData.viewType.toUpperCase() === 'VIEW') {
      switch (CONFIG.property.expression) {
        case 'name':
          return (
            <>
              <span>NAME</span>
            </>
          );

        case 'empNo':
          return (
            <>
              <span>EMPNO</span>
            </>
          );

        case 'nameAndEmpNo':
          return (
            <>
              <span>NAME</span>
              <span>EMPNO</span>
            </>
          );
        default:
          return null;
      }
    }

    return (
      <>
        <Input
          readOnly
          placeholder={CONFIG.property.placeholder}
          defaultValue={colData}
          value={formData[COMP_FIELD.replace('NO', 'NAME')] ? `${formData[COMP_FIELD.replace('NO', 'NAME')]}(${colData})` : colData}
          onClick={() => this.setState({ isOpenModal: true })}
          className={CONFIG.property.className || ''}
        />
        <Modal visible={this.state.isOpenModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
          <UserSelect onUserSelectHandler={null} onUserSelectedComplete={this.onSelectedComplete} onCancel={this.onCancel} />
        </Modal>
      </>
    );

    // return visible ? (
    //   <>
    //     {readOnly || viewType === 'LIST' ? (
    //       <span className={CONFIG.property.className || ''}>
    //         {formData[COMP_FIELD.replace('NO', 'NAME')] ? `${formData[COMP_FIELD.replace('NO', 'NAME')]}(${colData})` : colData}
    //       </span>
    //     ) : (
    //       <>
    //         <Input
    //           readOnly
    //           placeholder="select me"
    //           value={formData[COMP_FIELD.replace('NO', 'NAME')] ? `${formData[COMP_FIELD.replace('NO', 'NAME')]}(${colData})` : colData}
    //           onClick={() => this.setState({ isOpenModal: true })}
    //           className={CONFIG.property.className || ''}
    //         />
    //         <Modal visible={this.state.isOpenModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
    //           <UserSelect onUserSelectHandler={null} onUserSelectedComplete={this.onSelectedComplete} onCancel={this.onCancel} />
    //         </Modal>
    //       </>
    //     )}
    //   </>
    // ) : (
    //   ''
    // );
  }
}

MultiUserSelectComp.propTypes = {
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.string,
  CONFIG: PropTypes.object,
  changeFormData: PropTypes.func,
  changeSearchData: PropTypes.func,
  colData: PropTypes.string,
  visible: PropTypes.bool,
  isSearch: PropTypes.bool,
  readOnly: PropTypes.bool,
  searchCompRenderer: PropTypes.func,
  viewType: PropTypes.string,
  formData: PropTypes.object,
  viewPageData: PropTypes.object,
};

export default MultiUserSelectComp;
