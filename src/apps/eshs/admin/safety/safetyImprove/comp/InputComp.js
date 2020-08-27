import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal, Popconfirm, Popover } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import InputTable from 'apps/eshs/admin/safety/safetyImprove/comp/InputTable';
import SearchList from 'apps/eshs/admin/safety/safetyImprove/comp/SearchList';
import HazardBuilder from 'apps/eshs/admin/safety/safetyImprove/comp/HazardBuilder';
import MasureRefuse from 'apps/eshs/admin/safety/safetyImprove/comp/MasureRefuse';
import DanestAdmin from 'apps/eshs/admin/safety/Danger/danestAdmin';

import { fields } from 'apps/eshs/admin/safety/safetyImprove/comp/fields';
import { getTreeFromFlatData } from 'react-sortable-tree';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdModal = StyledAntdModal(Modal);

const getCategoryMapListAsTree = (flatData, flag, viewLang, rootkey) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item[`NAME_${viewLang && viewLang.length > 0 ? viewLang : 'KOR'}`],
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: flag === 'Y' || item.CHILDREN_CNT === 0,
    })),

    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: rootkey || 0,
  });

class InputComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      initFormData: {},
      modalObj: {
        title: '',
        visible: false,
        content: [],
      },
      completeVisible: false,
      inputTable: [],
      categoryData: {},
      selectRow: {},
      viewType: 'INPUT',
      modifyBtnFlag: 'F',
      matchUserFlag: 3,
      endChk: 'N',
    };
  }

  componentDidMount = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;

    spinningOn();
    const apiAry = [
      {
        key: 'CATEGORY_LOC',
        type: 'POST',
        url: '/api/admin/v1/common/categoryChildrenListUseYn',
        params: { PARAM: { NODE_ID: 1533, USE_YN: 'Y' } },
      },
      {
        key: 'CATEGORY_MM',
        type: 'POST',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        params: { PARAM: { NODE_ID: 1551, USE_YN: 'Y' } },
      },
      {
        key: 'CATEGORY_EACH_TYPE',
        type: 'POST',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        params: { PARAM: { NODE_ID: 1552, USE_YN: 'Y' } },
      },
      {
        key: 'CATEGORY_GRADE',
        type: 'POST',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        params: { PARAM: { NODE_ID: 1561, USE_YN: 'Y' } },
      },
      {
        key: 'codeData',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 30431, USE_YN: 'Y' } },
      },
    ];

    getCallDataHandler(id, apiAry, this.appStart);
  };

  appStart = () => {
    const { result, profile, spinningOff, reqNo } = this.props;

    const initFormData = {
      ACP_PIC_FILE: {},
      PIC_FILE: {},
    };
    const flds = fields(profile);

    for (const name in flds) {
      initFormData[name] = flds[name].DEFAULT_VALUE;
    }

    const loc = (result && result.CATEGORY_LOC && result.CATEGORY_LOC.categoryMapList) || [];

    const grade =
      (result &&
        result.CATEGORY_GRADE &&
        result.CATEGORY_GRADE.categoryMapList &&
        result.CATEGORY_GRADE.categoryMapList.filter(item => item.NODE_ID !== result.CATEGORY_GRADE.PARAM.NODE_ID && item.USE_YN === 'Y')) ||
      [];
    const eachType =
      (result &&
        result.CATEGORY_EACH_TYPE &&
        result.CATEGORY_EACH_TYPE.categoryMapList &&
        result.CATEGORY_EACH_TYPE.categoryMapList.filter(item => item.NODE_ID !== result.CATEGORY_EACH_TYPE.PARAM.NODE_ID && item.USE_YN === 'Y')) ||
      [];
    const mm =
      (result &&
        result.CATEGORY_MM &&
        result.CATEGORY_MM.categoryMapList &&
        result.CATEGORY_MM.categoryMapList.filter(item => item.NODE_ID !== result.CATEGORY_MM.PARAM.NODE_ID && item.USE_YN === 'Y')) ||
      [];

    const DANGERTYPE = [];
    const DANGERCAUSE = [];

    result &&
      result.codeData &&
      result.codeData.categoryMapList &&
      result.codeData.categoryMapList.forEach(item => {
        if (item.PARENT_NODE_ID === 30432) DANGERTYPE.push(item);
        if (item.PARENT_NODE_ID === 30433) DANGERCAUSE.push(item);
      });

    const categoryData = {
      LOC: getCategoryMapListAsTree(loc, 'Y', '', 1533),
      GRADE: grade,
      EACH_TYPE: eachType,
      MM: mm,
      DANGERTYPE,
      DANGERCAUSE,
    };

    this.setState(
      {
        initFormData,
        formData: { ...initFormData, locLabel: initFormData.LOC ? this.findTreeDataByNodeId(initFormData.LOC) : '' },
        inputTable: [
          <InputTable
            key="InputTable"
            formData={initFormData}
            changeFormData={this.changeFormData}
            setFormData={this.setFormData}
            findTreeDataByNodeId={this.findTreeDataByNodeId}
            categoryData={categoryData}
            acpTableButtons={this.getAcpTableButtons()}
            selectedMultiUserSave={this.selectedMultiUserSave}
            profile={profile}
          />,
        ],
        categoryData,
      },
      () => (reqNo ? this.search(reqNo) : spinningOff()),
    );
  };

  changeFormData = (target, value) => this.setState(prevState => ({ formData: { ...prevState.formData, [target]: value } }));

  setFormData = nextFormData => this.setState(prevState => ({ formData: { ...prevState.formData, ...nextFormData } }));

  changeStateData = (target, value) => this.setState({ [target]: value });

  findTreeDataByNodeId = nodeId => {
    const { result } = this.props;

    const loc = (result && result.CATEGORY_LOC && result.CATEGORY_LOC.categoryMapList) || [];

    const fidx = loc.findIndex(item => item.NODE_ID === nodeId);

    return fidx > -1 ? (loc[fidx].PARENT_NODE_ID === 1533 ? `${loc[fidx].NAME_KOR} 전체` : `${loc[fidx].NAME_KOR}`) : '';
  };

  saveBeforeCheck = (formData = this.state.formData) => {
    const flds = fields(this.props.profile);
    let check = true;

    // 단순 null체크
    for (const name in flds) {
      if (flds[name].REQUIRED && !formData[name]) {
        this.showMessage(flds[name].MSG);
        check = false;
        break;
      }
    }
    if (check) {
      if (!formData.PIC && JSON.stringify(formData.PIC_FILE) === '{}') {
        this.showMessage('사진을 등록하세요.');
        check = false;
      }
      // 위험성평가 실시 선택시에만 체크
      else if (formData.DANGERYN === 'Y') {
        if (!formData.DANGERCAUSE) {
          this.showMessage('사고의 발생원인을 선택해 주세요.');
          check = false;
        } else if (!formData.DANGERTYPE) {
          this.showMessage('사고의 발생유형을 선택해 주세요.');
          check = false;
        } else if (!formData.EQUIP_ID) {
          this.showMessage('세부공정을 선택해 주세요.');
          check = false;
        }
      }
    }

    return check;
  };

  improveDetailSaveBeforeCheck = (formData = this.state.formData) => {
    let ckeck = true;

    if (!formData.C_DATE) {
      this.showMessage('완료일은 입력하세요.');
      ckeck = false;
    } else if (!formData.ACP_COMMENTS) {
      this.showMessage('현상 및 조치내용을 입력하세요.');
      ckeck = false;
    } else if (!formData.ACP_PIC && (!JSON.stringify(formData.ACP_PIC_FILE) || JSON.stringify(formData.ACP_PIC_FILE) === '{}')) {
      this.showMessage('사진을 등록하세요');
      ckeck = false;
    }

    return ckeck;
  };

  save = formData => {
    const { sagaKey: id, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    return submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsSafetyImprove', { PARAM: formData }, (_, res) => {
      if (res && res.result === 1) {
        return this.formTableReload(
          {
            ...res.PARAM,
            DETAIL_ACP_EMP_NO: res.PARAM && res.PARAM.ACP_EMP_NO,
            DETAIL_ACP_DEPT_NM: res.PARAM && res.PARAM.ACP_DEPT_NM,
            DETAIL_ACP_EMP_NM: res.PARAM && res.PARAM.ACP_EMP_NM,
            DETAIL_ACP_PHONE: res.PARAM && res.PARAM.ACP_PHONE,
            DA_REG_NO: (res.PARAM && res.PARAM.DA_REG_NO) || '',
            DA_TASK_SEQ: (res.PARAM && res.PARAM.DA_TASK_SEQ) || undefined,
          },
          'MODIFY',
          () => {
            this.showMessage('저장되었습니다.');
            if (formData.DANGERYN === 'Y')
              return this.changeModalObj('위험성평가표 등록', true, [
                <DanestAdmin
                  key="DANESTADMIN_SAVE_AFTER"
                  improveDanger={{ IMPROVE: true, REG_DTTM: res.PARAM.REQ_DT, REG_NO: res.PARAM && res.PARAM.DA_REG_NO }}
                />,
              ]);
            return null;
          },
        );
      }
      return this.showMessage('저장에 실패하였습니다.');
    });
  };

  delete = () => {
    const { sagaKey: id, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const { formData } = this.state;
    spinningOn();
    return submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsSafetyImprove', { PARAM: formData }, (_, res) => {
      if (res && res.result === 1) {
        return this.showMessage('삭제되었습니다.');
      }
      return this.showMessage('사용되고 있는 데이타입니다. 삭제할 수 없습니다.');
    });
  };

  update = formData => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    return submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsSafetyImprove', { PARAM: formData }, (_, res) => {
      if (res && res.result === 1) {
        return this.formTableReload(
          {
            ...res.PARAM,
            DETAIL_ACP_EMP_NO: res.PARAM && res.PARAM.ACP_EMP_NO,
            DETAIL_ACP_DEPT_NM: res.PARAM && res.PARAM.ACP_DEPT_NM,
            DETAIL_ACP_EMP_NM: res.PARAM && res.PARAM.ACP_EMP_NM,
            DETAIL_ACP_PHONE: res.PARAM && res.PARAM.ACP_PHONE,
          },
          'MODIFY',
          () => this.showMessage('수정되었습니다.'),
        );
      }
      return this.showMessage('수정에 실패하였습니다.');
    });
  };

  formTableReload = (formData = this.state.formData, viewType = 'INPUT', callBackFunc = () => {}) =>
    this.setState(
      {
        formData,
        viewType,
        inputTable: [],
        selectRow: {},
      },
      () =>
        this.setState(
          prevState => ({
            inputTable: [
              <InputTable
                key="InputTable"
                formData={prevState.formData}
                changeFormData={this.changeFormData}
                setFormData={this.setFormData}
                findTreeDataByNodeId={this.findTreeDataByNodeId}
                categoryData={prevState.categoryData}
                acpTableButtons={this.getAcpTableButtons()}
                selectedMultiUserSave={this.selectedMultiUserSave}
                profile={this.props.profile}
              />,
            ],
          }),
          callBackFunc,
        ),
    );

  search = (reqNo = (this.state.selectRow && this.state.selectRow.REQ_NO) || '') => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;

    if (!reqNo) return;
    spinningOn();

    const apiAry = [
      {
        key: 'detail',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsSafetyImprove?REQ_NO=${reqNo}`,
      },
    ];

    getCallDataHandler(id, apiAry, () => {
      const { result } = this.props;
      const modifyBtnFlag = (result && result.detail && result.detail.flags && result.detail.flags.visible) || 'F';
      const matchUserFlag = (result && result.detail && result.detail.flags && result.detail.flags.findUser) || 3;
      const endChk = (result && result.detail && result.detail.flags && result.detail.flags.endChk) || 'N';
      const multiUsers = (result && result.detail && result.detail.userList) || [];

      const formData = (result && result.detail && result.detail.detail) || {};

      this.setState(
        {
          modifyBtnFlag,
          matchUserFlag,
          endChk,
        },
        () => this.formTableReload({ ...formData, MULTI_USERS: multiUsers }, 'MODIFY', spinningOff),
      );
    });
  };

  moveFileToReal = (target, formData = this.state.formData, callBackFunc, beforeFunc = () => true) => {
    const { sagaKey: id, submitHandlerBySaga, spinningOn } = this.props;

    // 필수값체크
    if (!beforeFunc(formData)) return null;
    spinningOn();

    const fileList = [];
    const file = (formData && formData[target] && formData[target].newFile) || false;

    if (file) fileList.push(formData[target]);

    if (!fileList.length) return callBackFunc(formData);

    return submitHandlerBySaga(id, 'POST', '/upload/moveFileToReal', { PARAM: { DETAIL: fileList } }, (_, result) => {
      if (result && result.message === 'success') {
        const realFileList = result.DETAIL || [];
        const seqObj = {};
        realFileList.forEach(f => {
          seqObj[f.target] = f.seq;
          seqObj[`${f.target}_FILE_NM`] = f.fileName;
        });
        return callBackFunc({ ...formData, ...seqObj });
      }
      return this.showMessage('파일저장에 실패하였습니다.');
    });
  };

  reset = () => {
    const { spinningOn, spinningOff } = this.props;
    spinningOn();

    return this.formTableReload(this.state.initFormData, 'INPUT', spinningOff);
  };

  showMessage = text => {
    this.props.spinningOff();
    return message.info(<MessageContent>{text}</MessageContent>);
  };

  changeModalObj = (title = '', visible = false, content = []) => this.setState({ modalObj: { title, visible, content } });

  getAcpTableButtons = () => {
    const { viewType, modifyBtnFlag, matchUserFlag, formData } = this.state;
    const sttlmnyStatus = (formData && formData.STTLMNT_STATUS) || ''; // 메인 TABLE의 문서상태
    const saveStatus = (formData && formData.SAVE_STATUS) || ''; // SUB TABLE 의 저장상태
    // const acp1EmpNo = (formData && formData.ACP1_EMP_NO) || ''; // 조치자
    const userFlag = Number(matchUserFlag) <= 2; // 로그인한 유저가 안전 책임자, 유지자, 담당자, 조치자에 속함
    const sFlag = (sttlmnyStatus !== '2' && sttlmnyStatus !== '3') || false;
    return [
      {
        text: '수신',
        onClick: () => this.handleDetailAction('APPLY'),
        className: 'btn-gray btn-sm mr5 mr5',
        visible: viewType !== 'INPUT' && modifyBtnFlag !== 'F', // real
        /* 
          복수지정 사용자중 
            1차 미수신 1차 수신자에 속할경우
            1차 수신, 2차 미수신 2차 수신자에 속할경우 사용가능
        */
        // visible: viewType !== 'INPUT', // test
      },
      {
        text: '저장',
        onClick: () =>
          this.moveFileToReal('ACP_PIC_FILE', this.state.formData, param => this.handleDetailAction('UPDATE', param), this.improveDetailSaveBeforeCheck),
        className: 'btn-primary btn-sm mr5 mr5',
        visible: viewType !== 'INPUT' && userFlag && sFlag, // real
        // 로그인한 유저가 안전 책임자, 유지자, 담당자, 조치자에 속하고 문서 상태가 조치완료, 완료 승인이 아닌경우 사용가능
        // visible: viewType !== 'INPUT', // test
      },
      {
        text: '조치',
        onClick: () => this.handleDetailAction('ADD'),
        className: 'btn-primary btn-sm mr5 mr5',
        visible: viewType !== 'INPUT' && userFlag && sFlag && saveStatus === '1', // real
        // 로그인한 유저가 안전 책임자, 유지자, 담당자, 조치자에 속하고 문서 상태가 조치완료, 완료 승인이 아닌경우 사용가능
        // visible: viewType !== 'INPUT', // test
      },
      {
        text: '요청반송',
        onClick: () =>
          this.changeModalObj('요청 반송', true, [
            <MasureRefuse
              key="MasureRefuse"
              formData={{ REQ_NO: formData.REQ_NO, TARGET_USER: formData.REQ_EMP_NAME, TARGET_DEPT: formData.REQ_DEPT_NAME, CONTENT: '' }}
              send={REFUSEINFO => this.handleDetailAction('REFUSE', { ...formData, REFUSEINFO })}
            />,
          ]),
        className: 'btn-light btn-sm mr5 mr5',
        visible: viewType !== 'INPUT' && sFlag && userFlag, // real
        // 로그인한 유저가 안전 책임자, 유지자, 담당자, 조치자에 속하고 문서 상태가 조치완료, 완료 승인이 아닌경우 사용가능
        // visible: viewType !== 'INPUT', // test
      },
      {
        text: '전달',
        onClick: () => this.handleDetailAction('FORWARD'),
        className: 'btn-gray btn-sm mr5 mr5',
        visible: viewType !== 'INPUT' && sFlag && userFlag, // real
        // 로그인한 유저가 안전 책임자, 유지자, 담당자, 조치자에 속하고 문서 상태가 조치완료, 완료 승인이 아닌경우 사용가능

        // visible: viewType !== 'INPUT', // test
      },
      {
        text: '인쇄',
        onClick: () => console.debug('인쇄'),
        className: 'btn-gray btn-sm mr5 mr5',
        visible: true,
      },
    ];
  };

  handleDetailAction = (actionType, formData = this.state.formData) => {
    const { sagaKey: id, submitHandlerBySaga, spinningOn, spinningOff, profile } = this.props;
    const daRegNo = (formData && formData.DA_REG_NO) || '';
    const { endChk } = this.state;
    spinningOn();
    const apiData = {
      url: '',
      method: '',
      callBackFunc: () => {},
      param: {},
    };
    switch (actionType) {
      case 'APPLY':
        apiData.method = 'POST';
        apiData.url = '/api/eshs/v1/common/eshsSafetyImproveDetailApply';
        apiData.param = {
          PARAM: {
            ...formData,
            ACTION: 'APPLY',
            ACP1_DEPT_ID: profile.DEPT_ID,
            ACP1_EMP_NM: profile.NAME_KOR,
            ACP1_EMP_NO: profile.EMP_NO,
            ACP1_USER_ID: profile.USER_ID,
            ACP1_DEPT_NM: profile.DEPT_NAME_KOR,
            ACP1_PHONE: profile.MOBILE_TEL_NO,
          },
        };
        apiData.callBackFunc = (_, res) => {
          if (res && res.result >= 1) {
            this.showMessage('수신정보가 수정되었습니다.');
            return this.search(formData.REQ_NO);
          }
          return this.showMessage('요청에 실패하였습니다. 다시 시도해주십시오');
        };
        break;
      case 'UPDATE':
        apiData.method = 'POST';
        apiData.url = '/api/eshs/v1/common/eshsSafetyImproveDetailUpdate';
        apiData.param = { PARAM: formData };
        apiData.callBackFunc = (_, res) => {
          if (res && res.result >= 1) {
            return this.formTableReload(formData, 'MODIFY', () => this.showMessage('저장되었습니다.'));
          }
          return this.showMessage('요청에 실패하였습니다. 다시 시도해주십시오');
        };

        break;
      case 'ADD':
        if (daRegNo && endChk === 'N') return this.showMessage('위험성평가 재평가 실시 되지 않았습니다. 재평가 실시 후 조치완료가 가능합니다.');

        return this.changeStatus('2', formData, (_, res) => {
          if (res && res.result >= 1) {
            return this.formTableReload({ ...formData, STTLMNT_STATUS: '2' }, 'MODIFY', () => this.showMessage('조치되었습니다.'));
          }
          return this.showMessage('요청에 실패하였습니다. 다시 시도해주십시오');
        });

      case 'REFUSE':
        return this.changeStatus('5', formData, (_, res) => {
          if (res && res.result >= 1) {
            return this.formTableReload({ ...formData, STTLMNT_STATUS: '5' }, 'MODIFY', () => this.showMessage('반송되었습니다.'));
          }
          return this.showMessage('요청에 실패하였습니다. 다시 시도해주십시오');
        });

      case 'FORWARD':
        apiData.method = 'POST';
        apiData.url = '/api/eshs/v1/common/eshsSafetyImproveDetailApply';
        apiData.param = { PARAM: { ...formData, ACTION: 'FORWARD' } }; // ACTION - FORWARD 일경우 조치자에게 메일 발송됨
        apiData.callBackFunc = (_, res) => {
          if (res && res.result >= 1) {
            return this.showMessage('전달되었습니다.');
          }
          return this.showMessage('요청에 실패하였습니다. 다시 시도해주십시오');
        };
        break;
      default:
        return spinningOff();
    }

    return submitHandlerBySaga(id, apiData.method, apiData.url, apiData.param, apiData.callBackFunc);
  };

  changeStatus = (status, formData = this.state.formData, callBackFunc) => {
    const { sagaKey: id, submitHandlerBySaga, spinningOn } = this.props;
    spinningOn();
    return submitHandlerBySaga(
      id,
      'POST',
      '/api/eshs/v1/common/eshsSafetyImproveChangeStuatus',
      { PARAM: { ...formData, STTLMNT_STATUS: status } },
      callBackFunc,
    );
  };

  selectedMultiUserSave = (userList = []) => {
    const { sagaKey: id, submitHandlerBySaga, spinningOn } = this.props;
    if (!userList.length) return this.showMessage('전달자를 선택하십시오');
    spinningOn();
    const hardAcp1Data = {
      ACP1_DEPT_ID: null,
      ACP1_DEPT_CD: '0000',
      ACP1_EMP_NO: '2040382',
      ACP1_EMP_NM: '복수지정',
      ACP1_PHONE: '8408',
      ACP1_USER_ID: null,
      ACP1_DEPT_NM: '복수지정 중',
    };

    return submitHandlerBySaga(
      id,
      'PUT',
      '/api/eshs/v1/common/eshsSafetyImproveDetailUpdate',
      {
        PARAM: { ...this.state.formData, ...hardAcp1Data, MULTI_USERS: userList, userIds: userList.map(user => user.USER_ID) },
      },
      (_, res) => {
        if (res && res.result >= 0) {
          this.showMessage('전달되었습니다.');
          return this.search(this.state.formData.REQ_NO);
        }
        return this.showMessage('요청에 실패하였습니다. 다시 시도해주십시오');
      },
    );
  };

  render() {
    const { spinningOff, spinningOn, profile } = this.props;
    const { inputTable, formData, modalObj, selectRow, viewType, completeVisible } = this.state;
    const dangerYn = (formData && formData.DANGERYN) || 'N';
    let statusStr = '';
    const sttltmntStatus = (formData && formData.STTLMNT_STATUS) || '';
    switch (String(sttltmntStatus)) {
      case '0':
        statusStr = '작성중';
        break;
      case '1':
        statusStr = '요청완료/조치중';
        break;
      case '2':
        statusStr = '조치완료';
        break;
      case '3':
        statusStr = '완료승인';
        break;
      case '4':
        statusStr = '부결';
        break;
      case '5':
        statusStr = '요청반송/재작성';
        break;
      default:
        statusStr = '작성요망';
        break;
    }
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area">
              <AntdSearchInput
                style={{ width: '150PX' }}
                value={selectRow.REQ_NO || formData.REQ_NO || undefined}
                className="input-search-sm ant-search-inline mr5"
                readOnly
                onClick={() =>
                  this.changeModalObj('안전개선 검색', true, [
                    <SearchList
                      key="searchList"
                      modalVisible={() => this.changeModalObj()}
                      onClickRow={data =>
                        this.setState({
                          selectRow: data,
                        })
                      }
                    />,
                  ])
                }
                onChange={() =>
                  this.changeModalObj('안전개선 검색', true, [
                    <SearchList
                      key="searchList"
                      modalVisible={() => this.changeModalObj()}
                      onClickRow={data =>
                        this.setState({
                          selectRow: data,
                        })
                      }
                    />,
                  ])
                }
              />
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm mr5" onClick={() => this.search()}>
                검색
              </StyledButton>
              {viewType === 'INPUT' &&
                (dangerYn !== 'Y' ? (
                  <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.moveFileToReal('PIC_FILE', formData, this.save, this.saveBeforeCheck)}>
                    저장
                  </StyledButton>
                ) : (
                  <div style={{ display: 'inline-block', position: 'absolute' }}>
                    <HazardBuilder
                      viewType="INPUT"
                      improveFormData={formData}
                      spinninOn={spinningOn}
                      spinningOff={spinningOff}
                      improveSaveBefore={this.saveBeforeCheck}
                      improveSave={param => this.moveFileToReal('PIC_FILE', param, this.save)}
                      taskSeq={-1}
                    />
                  </div>
                ))}
              {viewType === 'MODIFY' && (
                <>
                  {/* 현재 문서상태가 작성중이면서 접속한 사람의 사번과 같다면 삭제가능 */}
                  {sttltmntStatus === '0' && formData.REQ_USER_ID === profile.USER_ID && (
                    <Popconfirm title="삭제하시겠습니까?" onConfirm={this.delete} okText="Yes" cancelText="No">
                      <StyledButton className="btn-light btn-sm mr5">삭제</StyledButton>
                    </Popconfirm>
                  )}
                  {sttltmntStatus === '2' && (
                    <Popover
                      content={
                        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
                          <Popconfirm
                            title={`발행번호 ${formData.REQ_NO} [승인] 완료 합니다. 계속 하시겠습니까 ?`}
                            onConfirm={() =>
                              this.changeStatus('3', formData, (_, res) => {
                                if (res && res.result >= 1) {
                                  return this.formTableReload({ ...formData, STTLMNT_STATUS: '3' }, 'MODIFY', () => this.showMessage('승인되었습니다.'));
                                }
                                return this.showMessage('요청에 실패하였습니다. 다시 시도해주십시오');
                              })
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <StyledButton className="btn-primary btn-sm mr5">승인</StyledButton>
                          </Popconfirm>
                          <Popconfirm
                            title={`발행번호 ${formData.REQ_NO} [부결] 완료 합니다. 계속 하시겠습니까 ?`}
                            onConfirm={() =>
                              this.changeStatus('4', formData, (_, res) => {
                                if (res && res.result >= 1) {
                                  return this.formTableReload({ ...formData, STTLMNT_STATUS: '4' }, 'MODIFY', () => this.showMessage('부결되었습니다.'));
                                }
                                return this.showMessage('요청에 실패하였습니다. 다시 시도해주십시오');
                              })
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <StyledButton className="btn-primary btn-sm mr5">부결</StyledButton>
                          </Popconfirm>
                          <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.setState({ completeVisible: false })}>
                            취소
                          </StyledButton>
                        </StyledButtonWrapper>
                      }
                      title={
                        <div style={{ width: '300px', textAlign: 'center' }}>
                          <b>결제</b>
                        </div>
                      }
                      trigger="click"
                      visible={completeVisible}
                      onVisibleChange={() => this.setState(prevState => ({ completeVisible: !prevState.completeVisible }))}
                    >
                      <StyledButton className="btn-primary btn-sm mr5">완료</StyledButton>
                    </Popover>
                  )}

                  <StyledButton className="btn-gray btn-sm mr5" onClick={this.reset}>
                    초기화
                  </StyledButton>
                  {(sttltmntStatus === '5' || sttltmntStatus === '0' || sttltmntStatus === '' || sttltmntStatus === '4') &&
                    (dangerYn !== 'Y' ? (
                      <StyledButton
                        className="btn-primary btn-sm mr5"
                        onClick={() => this.moveFileToReal('PIC_FILE', formData, this.update, this.saveBeforeCheck)}
                      >
                        수정
                      </StyledButton>
                    ) : (
                      <div style={{ display: 'inline-block', position: 'absolute' }}>
                        <HazardBuilder
                          key="HAZARDBUILDER_MODIFY"
                          viewType="MODIFY"
                          improveFormData={formData}
                          spinninOn={spinningOn}
                          spinningOff={spinningOff}
                          improveSaveBefore={this.saveBeforeCheck}
                          improveSave={param => this.moveFileToReal('PIC_FILE', param, this.update)}
                          taskSeq={formData.DA_TASK_SEQ || -1}
                        />
                      </div>
                    ))}
                </>
              )}
            </div>
            <div className="div-comment" style={{ display: 'inline-block', float: 'right' }}>
              {`[ 문서상태 : ${statusStr} ]`}
            </div>
          </StyledCustomSearchWrapper>
          {inputTable}
        </StyledContentsWrapper>

        <AntdModal
          title={modalObj.title || ''}
          visible={modalObj.visible}
          width={800}
          onCancel={() => this.changeModalObj()}
          footer={
            <StyledButton className="btn-gray btn-sm mr5" onClick={() => this.changeModalObj()}>
              닫기
            </StyledButton>
          }
          destroyOnClose
        >
          {modalObj.content}
        </AntdModal>
      </>
    );
  }
}
InputComp.propTypes = {
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  removeReduxState: PropTypes.func,
  profile: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
  reqNo: PropTypes.string,
};
InputComp.defaultProps = {
  result: {},
  sagaKey: '',
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
  removeReduxState: () => {},
  profile: {},
  submitHandlerBySaga: () => {},
  reqNo: '',
};

export default InputComp;
