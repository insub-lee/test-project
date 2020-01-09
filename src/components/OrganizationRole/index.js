import React, { Component } from 'react';
import Modal from 'react-modal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Row, Col } from 'antd';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import PropTypes from 'prop-types';
import { intlObj, isDesktop } from 'utils/commonUtils';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import basicStyle from 'config/basicStyle';
import StyleModal from 'containers/portal/components/Modal/StyleModal';
import Input from 'components/Input';
// import { BtnDkGray, BtnLgtGray } from 'containers/portal/components/uielements/buttons.style';
import Draggable from 'react-draggable';
import GroupData from 'components/OrganizationRole/groupData';
import StyledButton from '../Button/StyledButton';

import SelectedUser from './selecteduser';
import reducer from './reducer';
import saga from './saga';
import Grid from './grid';
import * as selectors from './selectors';
import * as actions from './actions';
import messages from './messages';

const { rowStyle, colStyle, gutter } = basicStyle;

// 트리에서 선택한 데이터(부서, 직위, 직책, 가상그룹)를 임시로 저장할 변수
let deptList = [];
let grpList = [];
let pstnList = [];
let dutyList = [];

class Organization extends Component {
  constructor(props) {
    super(props);
    console.log(props.orgName, 'constructor******');



    this.state = {
      // 현재 선택된 탭 (구성원: 0, 직위: 1, 직책: 2, 가상그룹: 3)
      selected: 0,
      // 선택 목록에 선택된 구성원, 부서, 가상그룹, 직위, 직책
      // 초기값을 undefined로 해주는 이유 : componentDidUpdate에서 아래의 값들이 undefiend일 때만
      // 바닥에서 가져오는 데이터들을 state로 저장해주기 위함.
      // 초기화 함수에서도 해당 값들을 undefined로 setState 해줘야 함
      selectedusers: undefined,
      checkedDept: undefined,
      selectedGrp: undefined,
      checkedPstn: undefined,
      checkedDuty: undefined,
      complete: false,
      users: [],
      checkDept: [],
      checkgrp: [],
      checkpstn: [],
      checkduty: [],
      checkAll: false,

      // 검색어, 무한 스크롤 때 필요한 검색된 검색어
      keyword: '',
      isDragged: false,
      isDraggedEnd: true,

      // groupData의 목록 선택 시 grid의 체크박스 초기화 플래그
      gridFlag: true,
    };
  }

  componentDidMount() {
    const { ROLE_CD, handleGetGroupData } = this.props;

    handleGetGroupData(ROLE_CD);
  }

  // Input 태그의 경우 Tab 변경 후 Input 태그가 렌더링 되므로, handleSelect 함수에서 아래의 작업을 할 수 없다.
  componentDidUpdate(prevProps) {
    const { isDragged, isDraggedEnd } = this.state;
    const { show, closeModalInit, selectedUsers, checkedDept, checkedPstn, checkedDuty, checkedGrp } = this.props;
    if (!this.state.selectedusers) {
      if (!isDragged && isDraggedEnd) {
        this.setState({
          selectedusers: selectedUsers.slice(),
        });
      }
    }
    if (!this.state.checkedDept) {
      this.setState({
        checkedDept: checkedDept.slice(),
      });
    }
    if (!this.state.checkedPstn) {
      this.setState({
        checkedPstn: checkedPstn.slice(),
      });
    }
    if (!this.state.checkedDuty) {
      this.setState({
        checkedDuty: checkedDuty.slice(),
      });
    }
    if (!this.state.selectedGrp) {
      this.setState({
        selectedGrp: checkedGrp.slice(),
      });
    }
    if (!prevProps.show && show) {
      closeModalInit();
    }
  }

  onSave = () => {
    const { selectedusers, checkedDept, checkedPstn, checkedDuty, selectedGrp } = this.state;
    const { getDataFromOrganization } = this.props;
    const resultObj = {
      selectedUsers: selectedusers,
      checkedDept,
      checkedPstn,
      checkedDuty,
      checkedGrp: selectedGrp,
    };
    if (getDataFromOrganization) {
      getDataFromOrganization(resultObj);
    }
    this.initializeSelectedList();
    this.props.closeModalInit();
    this.props.closeModal();
  };

  dndChangePositionUser = (draggedEmpNo, EmpNo) => {
    const { selectedusers } = this.state;
    const index = selectedusers.findIndex(i => i.EMP_NO === draggedEmpNo);
    const afterIndex = selectedusers.findIndex(i => i.EMP_NO === EmpNo);
    const temp = selectedusers[index];
    const temp2 = selectedusers[afterIndex];
    const selectedusersCopy = selectedusers.slice();
    selectedusersCopy.splice(index, 1, temp2);
    selectedusersCopy.splice(afterIndex, 1, temp);
    this.setState({
      selectedusers: selectedusersCopy,
    });
  };

  dndChangePositionCallback = () => {
    const { dndChangePositionCallback, item } = this.props;
    const { selectedusers, checkedDept, checkedPstn, checkedDuty, selectedGrp } = this.state;
    if (item) {
      dndChangePositionCallback(
        {
          users: selectedusers,
          dept: checkedDept,
          pstn: checkedPstn,
          duty: checkedDuty,
          grp: selectedGrp,
        },
        item,
      );
    } else {
      dndChangePositionCallback({
        users: selectedusers,
        dept: checkedDept,
        pstn: checkedPstn,
        duty: checkedDuty,
        grp: selectedGrp,
      });
    }
  };

  getTab = () => {
    const {
      checkboxInitialize,
      handleInitializeCheckbox,
      emptyRowsView,
      groupData,
      ROLE_CD,
      groupMemberData,
      searchResultData,
      handleGetGroupMemberData,
    } = this.props;
    const { gridFlag } = this.state;

    return (
      <div className="members">
        <GroupData groupData={groupData} getGroupMemberData={handleGetGroupMemberData} ROLE_CD={ROLE_CD} setGridFlag={this.setGridFlag} />

        <div className="userGridResult">
          <div className="userSearch">
            <div className="inputWrapper" ref={ref => (this.searchInputUser = ref)}>
              <Input placeholder={intlObj.get(messages.inputKeyowrd)} onKeyUp={this.changeInputKeyword} name="searchInput" />
              <Button className="searchButton" title={intlObj.get(messages.search)} onClick={this.organizationUserSearch} />
            </div>
          </div>
          <Grid
            emptyRowsView={emptyRowsView}
            loadSelected={this.loadSelected}
            checkboxInitialize={checkboxInitialize}
            handleInitializeCheckbox={handleInitializeCheckbox}
            loadSelectedUser={this.loadSelectedUser}
            groupMemberData={groupMemberData}
            searchResultData={searchResultData}
            gridFlag={gridFlag}
          />
        </div>
      </div>
    );
  };

  initializeSelectedList = () => {
    this.setState({
      users: [],
      selectedusers: undefined,
      checkDept: [],
      checkedDept: undefined,
      selectedGrp: undefined,
      checkgrp: [],
      checkedPstn: undefined,
      checkpstn: [],
      checkedDuty: undefined,
      checkduty: [],
    });
    deptList = [];
    grpList = [];
    pstnList = [];
    dutyList = [];
  };

  closeModal = () => {
    deptList = [];
    grpList = [];
    pstnList = [];
    dutyList = [];
    this.setState(
      {
        reload: true,
        reset: true,
        selected: 0,
        users: [],
        checkDept: [],
        checkpstn: [],
        checkduty: [],
        checkgrp: [],
        selectedusers: undefined,
        checkedDept: undefined,
        checkedPstn: undefined,
        checkedDuty: undefined,
        selectedGrp: undefined,
      },
      () => {
        this.props.closeModalInit();
        this.props.closeModal();
      },
    );
  };

  initializeSearchInput = type => {
    switch (type) {
      case 'pstn':
        this.searchInputPstn.firstChild.value = '';
        break;
      case 'duty':
        this.searchInputDuty.firstChild.value = '';
        break;
      default:
        this.searchInputUser.firstChild.value = '';
        break;
    }
  };

  setIsDragged = () => {
    this.setState({
      isDragged: true,
    });
  };

  setIsDraggedEnd = () => {
    this.setState({
      isDraggedEnd: false,
    });
  };

  isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return !arr1.some(v => arr2.some(v1 => v.USER_ID !== v1.USER_ID));

    // arr1.forEach(v => {
    //   arr2.forEach(v2 => {
    //     if (v.USER_ID !== v2.USER_ID) {
    //       return false;
    //     }
    //   });
    // });
    // return true;
  };

  setGridFlag = () => {
    this.setState(prevState => ({
      gridFlag: !prevState.gridFlag,
    }));
  };

  // 트리에서 검색어 onChange 호출 시 불리는 함수
  setSearchString = (searchString, treeType) => {
    switch (treeType) {
      case 'user':
        this.setState({
          searchString,
        });
        break;
      case 'pstn':
        this.setState({
          searchStringPstn: searchString,
        });
        break;
      case 'duty':
        this.setState({
          searchStringDuty: searchString,
        });
        break;
      case 'grp':
        this.setState({
          searchStringGrp: searchString,
        });
        break;
      default:
        break;
    }
  };

  sendDelete = (id, type) => {
    // const { selectedusers, checkedDept, checkedPstn, checkedDuty, selectedGrp } = this.state;
    const { deleteCallback, isModal, item } = this.props;
    let deletedData = [];
    switch (type) {
      case 'user':
        this.setState(
          prevState => {
            const { selectedusers } = prevState;
            const target = selectedusers.find(user => user.USER_ID === id);
            deletedData = target ? [target] : [];
            return {
              selectedusers: selectedusers.filter(user => user.USER_ID !== id),
            };
          },
          () => {
            if (!isModal) {
              if (item) {
                deleteCallback(deletedData, item);
              } else {
                deleteCallback(deletedData);
              }
            }
          },
        );
        break;
      case 'dept':
        this.setState(
          prevState => {
            const { checkedDept } = prevState;
            const target = checkedDept.find(dept => dept.id === id);
            deletedData = target ? [target] : [];
            return {
              checkedDept: checkedDept.filter(dept => dept.id !== id),
            };
          },
          () => {
            if (!isModal) {
              if (item) {
                deleteCallback(deletedData, item);
              } else {
                deleteCallback(deletedData);
              }
            }
          },
        );
        break;
      case 'pstn':
        this.setState(
          prevState => {
            const { checkedPstn } = prevState;
            const target = checkedPstn.find(pstn => pstn.id === id);
            deletedData = target ? [target] : [];
            return {
              checkedPstn: checkedPstn.filter(pstn => pstn.id !== id),
            };
          },
          () => {
            if (!isModal) {
              if (item) {
                deleteCallback(deletedData, item);
              } else {
                deleteCallback(deletedData);
              }
            }
          },
        );
        break;
      case 'duty':
        this.setState(
          prevState => {
            const { checkedDuty } = prevState;
            const target = checkedDuty.find(duty => duty.id === id);
            deletedData = target ? [target] : [];
            return {
              checkedDuty: checkedDuty.filter(duty => duty.id !== id),
            };
          },
          () => {
            if (!isModal) {
              if (item) {
                deleteCallback(deletedData, item);
              } else {
                deleteCallback(deletedData);
              }
            }
          },
        );
        break;
      case 'grp':
        this.setState(
          prevState => {
            const { selectedGrp } = prevState;
            const target = selectedGrp.find(grp => grp.id === id);
            deletedData = target ? [target] : [];
            return {
              selectedGrp: selectedGrp.filter(grp => grp.id !== id),
            };
          },
          () => {
            if (!isModal) {
              if (item) {
                deleteCallback(deletedData, item);
              } else {
                deleteCallback(deletedData);
              }
            }
          },
        );
        break;
      default:
        break;
    }
  };

  deleteAll = () => {
    const { deleteAllCallback, isModal, item } = this.props;
    this.setState(
      {
        selectedusers: [],
        checkedDept: [],
        checkedPstn: [],
        checkedDuty: [],
        selectedGrp: [],
      },
      () => {
        if (!isModal) {
          if (item) {
            deleteAllCallback(item);
          } else {
            deleteAllCallback();
          }
        }
      },
    );
  };

  resetUsers = () => {
    this.setState({
      users: [],
      checkDept: [],
      checkgrp: [],
      checkpstn: [],
      checkduty: [],
      reset: true,
    });
  };

  sendAdd = () => {
    const { users, selectedusers, checkDept, checkgrp, checkpstn, checkduty } = this.state;
    const { addCallback, isModal, item } = this.props;
    const copyusers = users.slice();
    const list = selectedusers || [];
    const copyselectedusers = selectedusers.slice();
    const checklist = [];
    const comparelist = [];
    const selectedDept = checkDept;
    const selectedGrp = checkgrp;
    const selectedPstn = checkpstn;
    const selectedDuty = checkduty;
    let copyselectedDept = '';
    let copyselectedPstn = '';
    let copyselectedDuty = '';
    let copyselectedGrp = '';
    // 그리드에 표시된 구성원들의 사번을 comparelist에 넣는다.
    copyusers.map(l => comparelist.push(l.EMP_NO));
    list.map(l => checklist.push(l.EMP_NO));
    if (checklist.length > 0) {
      for (let i = 0; i < copyselectedusers.length; i++) {
        const idx = copyusers.findIndex(t => t.EMP_NO === checklist[i]);
        if (idx !== -1) {
          copyusers.splice(idx, 1);
          comparelist.splice(idx, 1);
        }
      }
    }
    if (copyusers.length !== 0) {
      for (let i = 0; i < copyusers.length; i++) {
        list.push(copyusers[i]);
      }
      this.setState({ selectedusers: list, checkAll: false });
    }
    if (selectedDept && selectedDept.length > 0) {
      copyselectedDept = checkDept.slice(); // Tree에서 Check 를 제거 했을 경우 바로 반영안되게 하기 위함
      this.setState({ checkedDept: copyselectedDept, checkAll: false, checkDept: [] });
    }
    if (selectedPstn && selectedPstn.length > 0) {
      copyselectedPstn = checkpstn.slice();
      this.setState({ checkedPstn: copyselectedPstn, checkAll: false });
    }
    if (selectedDuty && selectedDuty.length > 0) {
      copyselectedDuty = checkduty.slice();
      this.setState({ checkedDuty: copyselectedDuty, checkAll: false });
    }
    if (selectedGrp && selectedGrp.length > 0) {
      copyselectedGrp = checkgrp.slice();
      this.setState({ selectedGrp: copyselectedGrp, checkAll: false });
    }
    if (!isModal) {
      if (item) {
        addCallback({ users: list, dept: copyselectedDept, pstn: copyselectedPstn, duty: copyselectedDuty, grp: copyselectedGrp }, item);
      } else {
        addCallback({ users: list, dept: copyselectedDept, pstn: copyselectedPstn, duty: copyselectedDuty, grp: copyselectedGrp });
      }
    }
    // addCallback({ users: list, dept: copyselectedDept, pstn: copyselectedPstn, duty: copyselectedDuty, grp: copyselectedGrp });
    this.props.resetCheckbox();
    this.resetUsers();
  };

  // 탭변경
  handleSelect = (key, label) => {
    this.setState(prevState => {
      const { tabArr, tabType } = prevState;
      let i = 0;
      tabArr.some((la, index) =>
        la.some(l => {
          if (l === label) {
            i = index;
            return true;
          }
          return false;
        }),
      );
      const type = tabType[i];
      return {
        selected: i,
        users: [],
        checkDept: [],
        checkgrp: [],
        checkpstn: [],
        checkduty: [],
        typeTabChange: type,
        reset: true,
      };
    });
    deptList = [];
    grpList = [];
    pstnList = [];
    dutyList = [];
  };

  initializeCheckbox = () => {
    const { handleInitializeCheckbox } = this.props;
    handleInitializeCheckbox();
  };

  // 그리드에서 구성원 클릭 시 해당 구성원의 부서명을 이용해 선택 목록에 들어갈 데이터를 생성
  loadSelected = users => {
    if (users.length > 0 && users[0].ACNT_TYPE === 'D') {
      users[0].checked = true;
      users[0].title = users[0].NAME_KOR;
      users[0].id = users[0].USER_ID;
      const deptname = users[0].DEPT_NAME_KOR;
      deptList = this.state.checkedDept.slice();
      this.loadSelectedDept(users[0], deptname);
    } else if (users.length > 0) {
      this.setState({ users });
    }
  };

  loadSelectedDept = (dept, name) => {
    const { checkedDept } = this.state;
    // 상위 컴포넌트로부터 전달된 데이터와, 사용자가 선택한 데이터 중복 처리
    if (checkedDept.findIndex(item => item.id === dept.id) === -1) {
      const idx = deptList.findIndex(t => t.id === dept.id);
      if (deptList.length === 0) {
        deptList = this.state.checkedDept.slice();
      }
      if (dept.checked === true) {
        if (idx === -1) {
          const obj = {
            id: dept.id,
            NAME_KOR: dept.node.NAME_KOR,
            NAME_ENG: dept.node.NAME_ENG,
            NAME_CHN: dept.node.NAME_CHN,
            NAME_JPN: dept.node.NAME_JPN,
            NAME_ETC: dept.node.NAME_ETC,
          };
          if (name !== undefined) {
            obj.deptName = name;
          }
          deptList.push(obj);
        }
      } else if (dept.checked === false) {
        const listcheck = this.state.checkedDept.findIndex(t => t.id === dept.id);
        if (listcheck === -1) {
          deptList.splice(idx, 1);
        }
      }
      this.setState({ checkDept: deptList, reload: false, reset: false });
    }
  };

  loadSelectedGrp = grp => {
    const { selectedGrp } = this.state;
    // 상위 컴포넌트로부터 전달된 데이터와, 사용자가 선택한 데이터 중복 처리
    if (selectedGrp.findIndex(item => item.id === grp.id) === -1) {
      const idx = grpList.findIndex(t => t.id === grp.id);
      if (grpList.length === 0) {
        grpList = this.state.selectedGrp.slice();
      }
      if (grp.checked === true) {
        if (idx === -1) {
          const obj = {
            id: grp.id,
            NAME_KOR: grp.node.NAME_KOR,
            NAME_ENG: grp.node.NAME_ENG,
            NAME_CHN: grp.node.NAME_CHN,
            NAME_JPN: grp.node.NAME_JPN,
            NAME_ETC: grp.node.NAME_ETC,
          };
          grpList.push(obj);
        }
      } else if (grp.checked === false) {
        const listcheck = this.state.selectedGrp.findIndex(t => t.id === grp.id);
        if (listcheck === -1) {
          grpList.splice(idx, 1);
        }
      }
      this.setState({ checkgrp: grpList, reload: false, reset: false });
    }
  };

  loadSelectedPstn = (pstn, name) => {
    const { checkedPstn } = this.state;
    // 상위 컴포넌트로부터 전달된 데이터와, 사용자가 선택한 데이터 중복 처리
    if (checkedPstn.findIndex(item => item.id === pstn.id) === -1) {
      const idx = pstnList.findIndex(t => t.id === pstn.id);
      if (pstnList.length === 0) {
        pstnList = this.state.checkedPstn.slice();
      }
      if (pstn.checked === true) {
        if (idx === -1) {
          const obj = {
            id: pstn.id,
            NAME_KOR: pstn.node.NAME_KOR,
            NAME_ENG: pstn.node.NAME_ENG,
            NAME_CHN: pstn.node.NAME_CHN,
            NAME_JPN: pstn.node.NAME_JPN,
            NAME_ETC: pstn.node.NAME_ETC,
          };
          if (name !== undefined) {
            obj.deptName = name;
          }
          pstnList.push(obj);
        }
      } else if (pstn.checked === false) {
        const listcheck = this.state.checkedPstn.findIndex(t => t.id === pstn.id);
        if (listcheck === -1) {
          pstnList.splice(idx, 1);
        }
      }
      this.setState({ checkpstn: pstnList, reload: false, reset: false });
    }
  };

  loadSelectedDuty = (duty, name) => {
    const { checkedDuty } = this.state;
    // 상위 컴포넌트로부터 전달된 데이터와, 사용자가 선택한 데이터 중복 처리
    if (checkedDuty.findIndex(item => item.id === duty.id) === -1) {
      const idx = dutyList.findIndex(t => t.id === duty.id);
      if (dutyList.length === 0) {
        dutyList = this.state.checkedDuty.slice();
      }
      if (duty.checked === true) {
        if (idx === -1) {
          const obj = {
            id: duty.id,
            NAME_KOR: duty.node.NAME_KOR,
            NAME_ENG: duty.node.NAME_ENG,
            NAME_CHN: duty.node.NAME_CHN,
            NAME_JPN: duty.node.NAME_JPN,
            NAME_ETC: duty.node.NAME_ETC,
          };
          if (name !== undefined) {
            obj.deptName = name;
          }
          dutyList.push(obj);
        }
      } else if (duty.checked === false) {
        const listcheck = this.state.checkedDuty.findIndex(t => t.id === duty.id);
        if (listcheck === -1) {
          dutyList.splice(idx, 1);
        }
      }
      this.setState({ checkduty: dutyList, reload: false, reset: false });
    }
  };

  /* 구성원 검색 (검색 입력창에서 엔터를 쳤을 경우) */
  changeInputKeyword = e => {
    const { handleGetSearchResultData } = this.props;
    if (e.target.name === 'searchInput' && e.keyCode === 13) {
      handleGetSearchResultData('SM', e.target.value.trim());
    } else {
      this.setState({
        keyword: e.target.value,
      });
    }
  };

  /* 구성원 검색 (검색 버튼을 마우스로 클릭 했을 경우) */
  organizationUserSearch = () => {
    const { keyword } = this.state;
    const { handleGetSearchResultData } = this.props;

    handleGetSearchResultData('SM', keyword);
  };

  render() {
    const customstyle = {
      content: {
        width: 1200,
        height: 650,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    };
    const { isModal, isDraggable, view } = this.props;
    let modalWrapperClass = '';
    if (isModal) {
      modalWrapperClass = 'modalWrapper';
    } else {
      modalWrapperClass = 'modalWrapper inPage';
    }
    if (!isDesktop(view) && view !== 'Tablet') {
      modalWrapperClass = `${modalWrapperClass} mobile`;
    }
    // isModal = true인 경우, 디바이스에 따른 모달 크기
    const styleModalObject = {
      width: '1200px',
      marginLeft: '-600px',
    };

    if (isModal) {
      switch (view) {
        case 'Tablet':
          styleModalObject.width = '440px';
          styleModalObject.marginLeft = 'calc(440px / 2 * -1)';
          break;
        case 'Mobile':
          styleModalObject.width = '100vw';
          styleModalObject.height = '100vh';
          styleModalObject.marginLeft = 'calc(100vw / 2 * -1)';
          break;
        default:
      }
    }
    const content = this.getTab();
    const e = React.createElement;
    const modalProperty = {
      isOpen: this.props.show,
      onRequestClose: this.closeModal,
      contentLabel: 'SearchTree',
      style: customstyle,
      shouldCloseOnOverlayClick: false,
      ariaHideApp: false,
      portalClassName: 'portalCommonModal',
    };
    let common = (
      <Draggable handle="h2.modalTitle">
        <StyleModal className={modalWrapperClass} style={styleModalObject}>
          {isModal && (
            <h2 className="modalTitle" style={{ cursor: 'move' }}>
              {intlObj.get(messages.organization)}
              <Button className="modalClose" onClick={this.closeModal} title={intlObj.get(messages.closeModal)} />
            </h2>
          )}
          <div className="modalContents orgAcivityBody">
            <Row style={rowStyle} gutter={gutter} className="orgActivityInnerBody">
              {/* 탭이나 모바일일 경우, 프로필만 보여야 한다 */}
              {!(view === 'Tablet' || view === 'Mobile') && (
                <Col xl={16} style={colStyle} className="leftActivity">
                  <Tabs selected={this.state.selected} onSelect={this.handleSelect}>
                    <Tab label="ROLE">{content}</Tab>
                  </Tabs>
                  <Button className="inBtn" title={intlObj.get(messages.add)} onClick={this.sendAdd} />
                </Col>
              )}
              <Col xl={8} style={colStyle} className="rightActivity">
                <SelectedUser
                  selectedUsers={this.state.selectedusers}
                  complete={this.state.complete}
                  deptList={this.state.checkedDept}
                  grpList={this.state.selectedGrp}
                  pstnList={this.state.checkedPstn}
                  dutyList={this.state.checkedDuty}
                  checkAll={this.state.checkAll}
                  deleteCallback={this.sendDelete}
                  dndChangePositionUser={this.dndChangePositionUser}
                  dndChangePositionCallback={this.dndChangePositionCallback}
                  isDraggable={isDraggable}
                  deleteAll={this.deleteAll}
                  setIsDragged={this.setIsDragged}
                  setIsDraggedEnd={this.setIsDraggedEnd}
                />
              </Col>
            </Row>
          </div>
          {isModal && (
            <div className="modalFooter">
              {isDesktop(view) && (
                <StyledButton className="btn-light" onClick={this.closeModal}>
                  {intlObj.get(messages.cancel)}
                </StyledButton>
              )}
              <StyledButton className="btn-primary" onClick={this.onSave}>
                {intlObj.get(messages.confirm)}
              </StyledButton>
            </div>
          )}
        </StyleModal>
      </Draggable>
    );
    if (isModal) {
      common = e(Modal, modalProperty, common);
    }
    return <div>{common}</div>;
  }
}
Organization.propTypes = {
  emptyRowsView: PropTypes.func.isRequired,
  selectedUsers: PropTypes.array,
  checkedDept: PropTypes.array,
  checkedGrp: PropTypes.array,
  checkedPstn: PropTypes.array,
  checkedDuty: PropTypes.array,

  checkboxInitialize: PropTypes.bool.isRequired,
  closeModalInit: PropTypes.func.isRequired,

  handleInitializeCheckbox: PropTypes.func.isRequired,
  // 모달 플래그
  isModal: PropTypes.bool,
  show: PropTypes.bool, // 모달을 보일지 말지 결정하는 플래그
  // isProfile = true 일 때, 프로필 정보를 로딩하기 위해 필요한 정보
  selectedUserDeptId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectedUserDeptName: PropTypes.string, // 트리에 선택된 구성원의 부서가 주황색으로 표시되게 하기 위한 부서명
  // 선택 목록의 구성원 드래그 앤 드랍 플래그
  isDraggable: PropTypes.bool,
  // 조직도로부터 데이터 가져가는 함수
  getDataFromOrganization: PropTypes.func,
  // selecteduser에서 구성원 추가, 삭제, 드래그를 위한 콜백
  // isModal = false 일 때만 필요
  addCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
  dndChangePositionCallback: PropTypes.func,
  deleteAllCallback: PropTypes.func,
  orgName: PropTypes.string.isRequired,
  // componentWillUnmount에서 불리는 함수로,
  // 위젯에서 조직도 사용할 경우 위젯 item 정보
  item: PropTypes.object,
  view: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,

  // variation
  // ROLE_CD
  ROLE_CD: PropTypes.string.isRequired,
  groupData: PropTypes.array.isRequired,
  groupMemberData: PropTypes.array.isRequired,
  searchResultData: PropTypes.array.isRequired,

  // function
  // SITE, ROLE별 소속 그룹 정보 가져오기
  handleGetGroupData: PropTypes.func.isRequired,
  // 그룹별 소속 구성원 정보 가져오기
  handleGetGroupMemberData: PropTypes.func.isRequired,
  // 구성원 검색 결과 정보 가져오기
  handleGetSearchResultData: PropTypes.func.isRequired,
};
Organization.defaultProps = {
  isModal: true,
  show: false,
  selectedUserDeptId: '',
  isDraggable: false,
  addCallback: undefined,
  deleteCallback: undefined,
  deleteAllCallback: undefined,
  getDataFromOrganization: undefined,
  orgName: 'Nothing',
  item: undefined,
  selectedUsers: [],
  checkedDept: [],
  checkedGrp: [],
  checkedPstn: [],
  checkedDuty: [],
  selectedUserDeptName: '',
};
export function mapDispatchToProps(dispatch) {
  return {
    // 조직도 검색
    handleInitializeCheckbox: () => dispatch(actions.initializeCheckbox()),
    resetCheckbox: () => dispatch(actions.resetCheckbox()),
    closeModalInit: () => dispatch(actions.closeModalInit()),
    // set SelectedUserDeptName
    handleSetSelectedUserDeptName: selectedUserDeptName => dispatch(actions.setSelectedUserDeptName(selectedUserDeptName)),

    handleGetGroupData: ROLE_CD => dispatch(actions.getGroupData(ROLE_CD)),
    handleGetGroupMemberData: (ROLE_CD, ACNT_TYPE, ACNT_ID) => dispatch(actions.getGroupMemberData(ROLE_CD, ACNT_TYPE, ACNT_ID)),
    handleGetSearchResultData: (ROLE_CD, KEYWORD) => dispatch(actions.getSearchResultData(ROLE_CD, KEYWORD)),
  };
}
const mapStateToProps = createStructuredSelector({
  checkboxInitialize: selectors.makeCheckboxInitialize(),
  // emptyRowsView
  emptyRowsView: selectors.makeSelectEmptyRowsView(),
  emptyRowsViewForPstn: selectors.makeSelectEmptyRowsViewForPstn(),
  emptyRowsViewForDuty: selectors.makeSelectEmptyRowsViewForDuty(),
  emptyRowsViewForGrp: selectors.makeSelectEmptyRowsViewForGrp(),
  selectedUserDeptName: selectors.makeSelectSelectedUserDeptName(),
  searchString: selectors.makeSelectSelectedUserDeptName(),
  view: selectors.makeSelectView(),

  groupData: selectors.makeSelectGroupData(),
  groupMemberData: selectors.makeSelectGroupMemberData(),
  searchResultData: selectors.makeSelectSearchResultData(),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'orgRole', reducer });
const withSaga = injectSaga({ key: 'orgRole', saga });
export default compose(withReducer, withSaga, withConnect)(Organization);
