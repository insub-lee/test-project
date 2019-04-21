import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';

import { Form, Input } from 'antd';
import ReactDataGrid from 'react-data-grid';
import { Draggable } from 'react-data-grid-addons';
// import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import messages from '../messages';

import StyleDataGridDrag from '../../../../store/components/uielements/dataGridDrag.style';
import StyleCodeAdminForm from './StyleCodeAdminForm.js';
import StyleCodeAdminDtl from './StyleCodeAdminDtl.js';
import { LinkBtnLgtGray, BtnDkGray, BtnLgtGray, LinkBtnList, BtnDelete } from '../../../../store/components/uielements/buttons.style';
import Select, { SelectOption } from '../../../../../components/Select';

const Option = SelectOption;
const FormItem = Form.Item;
const { RowActionsCell, DropTargetRowContainer } = Draggable;
const RowRenderer = DropTargetRowContainer(ReactDataGrid.Row);
let isInit = false; // inputbox value init flag

class CodeAdminDtl extends React.Component {
  constructor(props, context) {
    super(props, context);
    const { match } = this.props;
    const { params } = match;
    const { CODE_GRP_CD, CURRENT_MODE } = params;

    // 공통코드 목록에서 넘어온 Data
    const location = this.props.history.location.state;
    // console.log('CodeAdminDtl_location', location);

    this.state = {
      keywordType: '',
      keyword: '',
      codeGrpCd: CODE_GRP_CD,
      codeNameKor: '',
      codeNameEng: '',
      codeNameChn: '',
      codeNameJpn: '',
      codeNameEtc: '',
      currentMode: CURRENT_MODE, // 현재화면모드(D: 상세 U: 수정 R:등록)
      orgCodeGrpCd: '',
      count: this.props.setCodeAdminDtl.length + 1,
      orgKeyword: '',
      codeGrpKeyValid: false,
      listSortColumn: location === undefined ? '' : location.sortColumnParam,
      listSortDirection: location === undefined ? '' : location.sortDirectionParam,
      listKeywordType: location === undefined ? 'codeNameKor' : location.keywordType,
      listKeyword: location === undefined ? '' : location.keyword,
    };

    // 컬럼 설정
    this.columns = [
      {
        key: 'SORT_SQ',
        name: 'No',
        width: 40,
        visible: false,
      },
      {
        key: 'CODE_GRP_CD',
        name: '코드그룹 ID',
        visible: false,
        editable: true,
      },
      {
        key: 'CODE_CD',
        name: intlObj.get(messages.codeCd),
        visible: true,
        editable: true,
      },
      {
        key: 'NAME_KOR',
        name: intlObj.get(messages.codeGrpKor),
        visible: true,
        editable: true,
      },
      {
        key: 'NAME_ENG',
        name: intlObj.get(messages.codeGrpEng),
        visible: true,
        editable: true,
      },
      {
        key: 'NAME_CHN',
        name: intlObj.get(messages.codeGrpChn),
        visible: true,
        editable: true,
      },
      {
        key: 'NAME_JPN',
        name: intlObj.get(messages.codeGrpJpn),
        visible: true,
        editable: true,
      },
      {
        key: 'NAME_ETC',
        name: intlObj.get(messages.codeGrpEtc),
        visible: true,
        editable: true,
      },
      { key: 'NODE_TYPE', name: '폴더구분', visible: false },
      // { key: 'LVL', name: '레벨', visible: false },
      // { key: 'SORT_SQ', name: '정렬 순서', visible: false },
      { key: 'PRNT_CD', name: '상위 코드', visible: false },
      { key: 'REG_USER_ID', name: '등록자ID', visible: false },
      { key: 'REG_DTTM', name: '등록일', visible: false },
      { key: 'UPD_USER_ID', name: '수정자ID', visible: false },
      { key: 'UPD_DTTM', name: '수정일', visible: false },
      {
        key: 'ROW_DEL',
        name: '',
        visible: true,
        width: 36,
        resizable: true,
        // headerRenderer: <div> <Icon type="search"/> </div>
        formatter: this.IconFormatter,
        getRowMetaData: data => data,
      },
    ];

    // 화면 로드 시 데이터 가져옴
    this.props.getCodeAdminDtl(this.state.keywordType, this.state.keyword, this.state.codeGrpCd);
  }

  // Props 값 변경 시
  componentWillReceiveProps(nextProps) {
    if (this.state.codeGrpCd !== null && nextProps.setCodeAdmin !== null) {
      this.setState({
        codeGrpCd: nextProps.setCodeAdmin.CODE_GRP_CD,
        codeNameKor: nextProps.setCodeAdmin.CODE_NAME_KOR,
        codeNameEng: nextProps.setCodeAdmin.CODE_NAME_ENG,
        codeNameChn: nextProps.setCodeAdmin.CODE_NAME_CHN,
        codeNameJpn: nextProps.setCodeAdmin.CODE_NAME_JPN,
        codeNameEtc: nextProps.setCodeAdmin.CODE_NAME_ETC,
      });
    }
    if (this.state.currentMode === 'R' && isInit) {
      this.setState({
        codeGrpCd: '',
        codeNameKor: '',
        codeNameEng: '',
        codeNameChn: '',
        codeNameJpn: '',
        codeNameEtc: '',
        keyword: '',
      });
    }
  }

  onClickToList = () => {
    const data = {
      sortColumn: this.state.listSortColumn,
      sortDirection: this.state.listSortDirection,
      keywordType: this.state.listKeywordType,
      keyword: this.state.listKeyword,
    };
    // console.log('!!!!!!', data);
    this.props.history.push({
      pathname: '/admin/AdminMain/CodeAdmin/', state: data,
    });
  }

  onIconClick = (sortSq) => {
    if (this.state.currentMode !== 'D') {
      this.deleteRows(sortSq);
    } else {
      message.error(`${intlObj.get(messages.canNotUdt)}`, 3);
    }
  }

  // 로우 삭제 아이콘 formatter
  IconFormatter = (val) => {
    const sortSq = val.dependentValues.SORT_SQ;
    if (this.state.currentMode !== 'D' && sortSq > 0) {
      return (
        <format onClick={() => this.onIconClick(sortSq)} >
          <div className="deleteRow" />
        </format>
      );
    }
    return '';
  };

  // 해당 Row 삭제
  deleteRows = (sortSq) => {
    let rows = this.props.setCodeAdminDtl.slice();
    rows = rows.filter(row => row.SORT_SQ !== sortSq);
    this.keyRearrange(rows);
    this.setState({
      count: rows.length + 1,
    });
  }

  // 순번 재배열
  keyRearrange =(rows) => {
    const rowData = rows;
    for (let i = 0; i < rowData.length; i += 1) {
      rowData[i].SORT_SQ = i + 1;
    }

    this.props.updateGrid(rowData);
  }

  // 로우 추가
  handleAddRow = () => {
    if (this.vaildChk) {
      let { count } = this.state;
      if (this.state.currentMode === 'R' && this.props.setCodeAdminDtl.length === 0) {
        count = 1;
      }
      const newrow = {
        CODE_GRP_CD: this.state.codeGrpCd,
        CODE_CD: '',
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_CHN: '',
        NAME_JPN: '',
        NAME_ETC: '',
        NODE_TYPE: 'E',
        // LVL: 1,
        SORT_SQ: count,
        PRNT_CD: this.state.codeGrpCd,
      };

      isInit = false;
      let rows = this.props.setCodeAdminDtl.slice();
      rows = update(rows, { $push: [newrow] });
      this.props.updateGrid(rows);
      this.setState({ count: count + 1 });
    }
  };

  // selectbox 값 변경 시
  handleSelect = (e) => {
    this.setState({ keywordType: e });
  }

  // Input 검색아이콘 클릭 시(조회)
  handleClick = () => {
    this.props.getCodeAdminDtl(this.state.keywordType, this.state.keyword, this.state.codeGrpCd);
  }

  // Input 검색값 변경 시
  handleSearch = (e) => {
    this.setState({ keyword: e.target.value });
  }

  // Input 키 누를 때
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  }

  // Grid data udpate
  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const rows = this.props.setCodeAdminDtl.slice();
    for (let i = fromRow; i <= toRow; i += 1) {
      const rowToUpdate = rows[i];
      const updatedRow = update(rowToUpdate, { $merge: updated });
      rows[i] = updatedRow;
    }
    this.props.updateGrid(rows);
    // this.setState({ rows });
  };

  // onChange Input value
  changeInputKeyword = (e, codeGroupInfo) => {
    if (codeGroupInfo === 'CODE_GRP_CD') {
      this.setState({ codeGrpCd: e.target.value });
      if (e.target.value !== '') this.setState({ codeGrpKeyValid: true });
      else this.setState({ codeGrpKeyValid: false });
    } else if (codeGroupInfo === 'CODE_NAME_KOR') {
      this.setState({ codeNameKor: e.target.value });
    } else if (codeGroupInfo === 'CODE_NAME_ENG') {
      this.setState({ codeNameEng: e.target.value });
    } else if (codeGroupInfo === 'CODE_NAME_CHN') {
      this.setState({ codeNameChn: e.target.value });
    } else if (codeGroupInfo === 'CODE_NAME_JPN') {
      this.setState({ codeNameJpn: e.target.value });
    } else if (codeGroupInfo === 'CODE_NAME_ETC') {
      this.setState({ codeNameEtc: e.target.value });
    }
  }

  // 공통코드 상세에서 등록버튼 클릭 시
  changeRegMode = () => {
    this.setState({
      codeGrpCd: '',
      currentMode: 'R',
      count: 1,
      orgCodeGrpCd: this.state.codeGrpCd,
      orgKeyword: this.state.keyword,
    });

    isInit = true;
    this.props.getCodeAdminDtl('', '', null);
    // 그리드 빈값으로
    const initGrid = [];
    this.props.updateGrid(initGrid);
  }

  // 공통코드 상세에서 수정버튼 클릭 시
  changeUdtMode = () => {
    // 수정하기 전 데이터를 담는다.
    this.setState({
      currentMode: 'U',
      orgCodeGrpCd: this.state.codeGrpCd,
      count: this.props.setCodeAdminDtl.length + 1,
      orgKeyword: this.state.keyword,
    });
    isInit = false;
    this.props.getCodeAdminDtl('', '', this.state.codeGrpCd);
  }

  // 공통코드 수정 or 등록 에서 취소버튼 클릭시
  cancelCodeAdmin = () => {
    if (this.state.currentMode === 'R') {
      this.setState({ count: 1 });
    }
    this.setState({
      currentMode: 'D',
      codeGrpCd: this.state.orgCodeGrpCd,
      keyword: this.state.orgKeyword,
    });
    isInit = false;
    // 그리드 수정하기전 데이터로
    this.props.getCodeAdminDtl(
      this.state.keywordType,
      this.state.orgKeyword,
      this.state.orgCodeGrpCd,
    );
  }

  // 공통코드 상세에서 삭제버튼 클릭 시
  delCodeAdmin = () => {
    const delGrpCode = this.state.codeGrpCd;
    let delCode = '';
    if (this.props.setCodeAdminDtl.length > 0) {
      delCode = this.props.setCodeAdminDtl[0].CODE_CD;
    }
    this.props.delCodeAdmin(delGrpCode, delCode, this.props.history);
  }

  // 공통코드 수정에서 저장버튼 클릭 시
  udtCodeAdmin = () => {
    if (this.vaildChk()) {
      this.props.udtCodeAdmin(
        this.state.codeGrpCd,
        this.state.codeNameKor,
        this.state.codeNameEng,
        this.state.codeNameChn,
        this.state.codeNameJpn,
        this.state.codeNameEtc,
        this.props.setCodeAdminDtl,
        this.state.keywordType,
        this.state.keyword,
      );
      isInit = false;
      this.setState({ currentMode: 'D' });
    }
  }

  // 공통코드 등록에서 등록버튼 클릭 시
  regCodeAdmin = () => {
    if (this.vaildChk()) {
      this.props.registerCodeAdmin(
        this.state.codeGrpCd,
        this.state.codeNameKor,
        this.state.codeNameEng,
        this.state.codeNameChn,
        this.state.codeNameJpn,
        this.state.codeNameEtc,
        this.props.setCodeAdminDtl,
      );
      isInit = false;
      this.setState({
        currentMode: 'D',
      });
    }
  }

  delConfirm = () => {
    feed.showConfirm(`${intlObj.get(messages.delConfirm)}`, '', this.delCodeAdmin);
  }

  regConfirm = () => {
    feed.showConfirm(`${intlObj.get(messages.regConfirm)}`, '', this.regCodeAdmin);
  }

  udtConfirm = () => {
    if (this.vaildChk()) {
      feed.showConfirm(`${intlObj.get(messages.udtConfirm)}`, '', this.udtCodeAdmin);
    }
  }

  // 유효성 체크
  vaildChk = () => {
    let isChk = true;
    let errorType = '';

    // 그룹코드명
    if (
      (this.state.codeNameKor === null || this.state.codeNameKor === '') &&
      (this.state.codeNameEng === null || this.state.codeNameEng === '') &&
      (this.state.codeNameChn === null || this.state.codeNameChn === '') &&
      (this.state.codeNameJpn === null || this.state.codeNameJpn === '') &&
      (this.state.codeNameEtc === null || this.state.codeNameEtc === '')
    ) {
      isChk = false;
      errorType = 'chkInputGCodeName';
    }

    // 그룹코드ID DB Data와 중복체크
    if (this.state.currentMode === 'R' && this.props.setCodeGrpCd) {
      isChk = false;
      errorType = 'overlapGCode';
    }

    // 그룹코드
    if (this.state.codeGrpCd === null || this.state.codeGrpCd === '') {
      isChk = false;
      errorType = 'chkInputGCode';
    }

    // 코드
    if (this.props.setCodeAdminDtl.length > 0) {
      for (let i = 0; i < this.props.setCodeAdminDtl.length; i += 1) {
        // 코드명
        if (
          (this.props.setCodeAdminDtl[i].NAME_KOR === null || this.props.setCodeAdminDtl[i].NAME_KOR === '') &&
          (this.props.setCodeAdminDtl[i].NAME_ENG === null || this.props.setCodeAdminDtl[i].NAME_ENG === '') &&
          (this.props.setCodeAdminDtl[i].NAME_CHN === null || this.props.setCodeAdminDtl[i].NAME_CHN === '') &&
          (this.props.setCodeAdminDtl[i].NAME_JPN === null || this.props.setCodeAdminDtl[i].NAME_JPN === '') &&
          (this.props.setCodeAdminDtl[i].NAME_ETC === null || this.props.setCodeAdminDtl[i].NAME_ETC === '')
        ) {
          isChk = false;
          errorType = 'chkInputCodeName';
        }
        // 코드 ID
        if (
          this.props.setCodeAdminDtl[i].CODE_CD === null ||
          this.props.setCodeAdminDtl[i].CODE_CD === ''
        ) {
          isChk = false;
          errorType = 'chkInputCode';
        }
      }
    }

    // 중복오류 체크
    if (this.props.setCodeAdminDtl.length > 0) {
      // 그룹코드ID와 코드ID가 중복되는지 체크
      for (let i = 0; i < this.props.setCodeAdminDtl.length; i += 1) {
        if (this.props.setCodeAdminDtl[i].CODE_CD === this.state.codeGrpCd) {
          isChk = false;
          errorType = 'overlapDifCode';
        }
        // 코드ID끼리 중복되는지 체크
        for (let r = 0; r < this.props.setCodeAdminDtl.length; r += 1) {
          if (i !== r) {
            if (this.props.setCodeAdminDtl[i].CODE_CD === this.props.setCodeAdminDtl[r].CODE_CD) {
              isChk = false;
              errorType = 'overlapCode';
            }
          }
        }
      }
    }

    if (errorType === 'chkInputGCode') {
      message.error(`${intlObj.get(messages.chkInputGCode)}`, 3);
    } else if (errorType === 'chkInputGCodeName') {
      message.error(`${intlObj.get(messages.chkInputGCodeName)}`, 3);
    } else if (errorType === 'chkInputCode') {
      message.error(`${intlObj.get(messages.chkInputCode)}`, 3);
    } else if (errorType === 'chkInputCodeName') {
      message.error(`${intlObj.get(messages.chkInputCodeName)}`, 3);
    } else if (errorType === 'overlapGCode') {
      message.error(`${intlObj.get(messages.overlapGCode)}`, 3);
    } else if (errorType === 'overlapDifCode') {
      message.error(`${intlObj.get(messages.overlapDifCode)}`, 3);
    } else if (errorType === 'overlapCode') {
      message.error(`${intlObj.get(messages.overlapCode)}`, 3);
    }
    return isChk;
  }

  dupliCheck = () => {
    isInit = false;
    if (this.state.codeGrpCd !== null && this.state.codeGrpCd !== '') {
      this.props.getCodeGrpCd(this.state.codeGrpCd);
    }
  }

  isDraggedRowSelected = (selectedRows, rowDragSource) => {
    if (selectedRows && selectedRows.length > 0) {
      const key = this.props.setCodeAdminDtl.SORT_SQ;
      return selectedRows.filter(r => r[key] === rowDragSource.data[key]).length > 0;
    }
    return false;
  };

  reorderRows = (e) => {
    if (this.state.currentMode !== 'D') {
      if (this.props.setCodeAdminDtl.length > 1) {
        const selectedRows = e.rowSource.idx;
        const draggedRows = this.isDraggedRowSelected(selectedRows, e.rowSource) ?
          selectedRows : [e.rowSource.data];
        const undraggedRows = this.props.setCodeAdminDtl.filter(r => draggedRows.indexOf(r) === -1);
        const args = [e.rowTarget.idx, 0].concat(draggedRows);
        Array.prototype.splice.apply(undraggedRows, args);
        this.keyRearrange(undraggedRows);
      }
    } else {
      message.error(`${intlObj.get(messages.canNotUdt)}`, 3);
    }
  };

  //  상세/등록/수정
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    };

    const rowGetter = rowNumber => this.props.setCodeAdminDtl[rowNumber];
    const mode = this.state.currentMode;
    const urlMode = this.props.history.location.search.replace('?', '');

    const title = (titleMode) => {
      if (titleMode === 'R') return intlObj.get(messages.codeRegister);
      else if (titleMode === 'D') return intlObj.get(messages.codeDetail);
      else if (titleMode === 'U') return intlObj.get(messages.codeUpdate);
      return '';
    };

    const dupliCodeGrpCd = (currentmode, stat) => {
      if (currentmode === 'R' && this.state.codeGrpCd !== '') {
        if (stat) return (<font color="RED">{intlObj.get(messages.unUsedCodeGrp)}</font>);
        return (<font color="GREEN">{intlObj.get(messages.usedCodeGrp)}</font>);
      }
      return '';
    };

    const controlBtn = (btnMode) => {
      if (btnMode === 'R') { // 등록
        return (
          urlMode === 'R' ?
            <React.Fragment>
              <div style={{ float: 'left' }}>
                <button onClick={this.handleAddRow} title={intlObj.get(messages.addRow)} className="addRow" />
              </div>
              {/* <LinkBtnLgtGray onClick={() => this.cancelCodeAdmin()}>
                <Link to="../">{intlObj.get(messages.cancel)}</Link>
              </LinkBtnLgtGray> */}
              <LinkBtnLgtGray onClick={this.onClickToList}>
                {intlObj.get(messages.cancel)}
              </LinkBtnLgtGray>
              <BtnDkGray onClick={this.regConfirm}>{intlObj.get(messages.register)}</BtnDkGray>
            </React.Fragment>
            :
            <React.Fragment>
              <div style={{ float: 'left' }}>
                <button onClick={this.handleAddRow} title={intlObj.get(messages.addRow)} className="addRow" />
              </div>
              <BtnLgtGray onClick={() => this.cancelCodeAdmin()}>
                {intlObj.get(messages.cancel)}
              </BtnLgtGray>
              <BtnDkGray onClick={this.regCodeAdmin}>{intlObj.get(messages.register)}</BtnDkGray>
            </React.Fragment>
        );
      } else if (btnMode === 'D') { // 상세
        return (
          <React.Fragment>
            <div style={{ float: 'left' }}>
              <BtnDelete onClick={this.delConfirm}>{intlObj.get(messages.delete)}</BtnDelete>
              {/* <Link to="../" style={{ marginLeft: 23 }}> */}
              <LinkBtnList onClick={this.onClickToList}>{intlObj.get(messages.toList)}</LinkBtnList>
              {/* </Link> */}
            </div>
            <BtnLgtGray onClick={this.changeUdtMode}>{intlObj.get(messages.update)}</BtnLgtGray>
            <BtnDkGray onClick={this.changeRegMode}>{intlObj.get(messages.new)}</BtnDkGray>
          </React.Fragment>
        );
      } else if (btnMode === 'U') { // 수정
        return (
          <React.Fragment>
            <div style={{ float: 'left' }}>
              <button onClick={this.handleAddRow} title={intlObj.get(messages.addRow)} className="addRow" />
              {/* <Link to="../"> */}
              <LinkBtnList onClick={this.onClickToList}>{intlObj.get(messages.toList)}</LinkBtnList>
              {/* </Link> */}
            </div>
            <BtnLgtGray onClick={this.cancelCodeAdmin} >{intlObj.get(messages.cancel)}</BtnLgtGray>
            <BtnDkGray onClick={this.udtConfirm}>{intlObj.get(messages.save)}</BtnDkGray>
          </React.Fragment>
        );
      }
      return '';
    };

    return (
      <div>
        <StyleCodeAdminDtl>
          <h3 className="pageTitle regist">{title(mode)}</h3>
          <StyleCodeAdminForm className={mode === 'D' ? 'modeD' : ''}>
            <Form>
              <table className="adminTbl codeGroupLngTbl">
                <tbody>
                  <tr>
                    <th className="required">
                      <label htmlFor="c1">{intlObj.get(messages.codeGrpCd)}</label>
                    </th>
                    <td style={{ wordBreak: 'break-all' }}>
                      <FormItem
                        {...formItemLayout}
                        // label="코드그룹 ID"
                        // className="required"
                        hasFeedback={mode === 'R'}
                        validateStatus={this.state.codeGrpKeyValid && !this.state.setCodeGrpCd ? 'success' : 'error'}
                      >
                        <Input
                          value={this.state.codeGrpCd}
                          onChange={event => this.changeInputKeyword(event, 'CODE_GRP_CD')}
                          onKeyUp={(e) => {
                            // 한글입력제한(임시)
                            this.setState({ codeGrpCd: e.target.value.replace(/[^a-z0-9_]/gi, '') });
                          }}
                          onBlur={this.dupliCheck}
                          readOnly={mode === 'D' || mode === 'U'}
                          maxLength="10"
                          id="c1"
                        />
                        <span className="tipText">{dupliCodeGrpCd(this.state.currentMode, this.props.setCodeGrpCd)}</span>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="c2">{intlObj.get(messages.codeGrpKor)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                        // label="코드그룹명(한국어)"
                      >
                        <Input
                          value={this.state.codeNameKor}
                          onChange={event => this.changeInputKeyword(event, 'CODE_NAME_KOR')}
                          readOnly={mode === 'D'}
                          id="c2"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="c3">{intlObj.get(messages.codeGrpEng)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                        // label="코드그룹명(영어)"
                      >
                        <Input
                          value={this.state.codeNameEng}
                          onChange={event => this.changeInputKeyword(event, 'CODE_NAME_ENG')}
                          readOnly={mode === 'D'}
                          id="c3"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="c4">{intlObj.get(messages.codeGrpChn)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                        // label="코드그룹명(중국어)"
                      >
                        <Input
                          value={this.state.codeNameChn}
                          onChange={event => this.changeInputKeyword(event, 'CODE_NAME_CHN')}
                          readOnly={mode === 'D'}
                          id="c4"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="c5">{intlObj.get(messages.codeGrpJpn)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                        // label="코드그룹명(일본어)"
                      >
                        <Input
                          value={this.state.codeNameJpn}
                          onChange={event => this.changeInputKeyword(event, 'CODE_NAME_JPN')}
                          readOnly={mode === 'D'}
                          id="c5"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="c6">{intlObj.get(messages.codeGrpEtc)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                        // label="코드그룹명(기타어)"
                      >
                        <Input
                          value={this.state.codeNameEtc}
                          onChange={event => this.changeInputKeyword(event, 'CODE_NAME_ETC')}
                          readOnly={mode === 'D'}
                          id="c6"
                        />
                      </FormItem>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Form>
          </StyleCodeAdminForm>
          <div className="searchBox">
            <Select
              defaultValue="codeNameKor"
              onChange={this.handleSelect}
              className="selectOpt"
              style={{ visibility: 'hidden' }}
              dropdownStyle={{ fontSize: 13 }}
            >
              <Option value="codeCd">{intlObj.get(messages.codeCd)}</Option>
              <Option value="codeNameKor">{intlObj.get(messages.codeName)}</Option>
            </Select>
            {/* 오른쪽 */}
            <div className="searchWrapper">
              <Input
                value={mode !== 'D' ? '' : this.state.keyword}
                onChange={this.handleSearch}
                onKeyPress={this.handleKeyPress}
                placeholder={mode !== 'D' ? intlObj.get(messages.notSearch) : intlObj.get(messages.inputSearch)}
                readOnly={mode !== 'D'}
              />
              <button title={intlObj.get(messages.search)} className="searchBtn" onClick={this.handleClick} />
            </div>
          </div>
          <StyleDataGridDrag style={{ height: 415 }} className={mode === 'D' ? 'codeAdminDtl modeD' : 'codeAdminDtl'}>
            <ReactDataGrid
              enableCellSelect={mode !== 'D'}
              columns={this.columns.filter(column => column.visible === true)}
              rowGetter={rowGetter}
              rowsCount={this.props.setCodeAdminDtl.length}
              minHeight={415}
              rowHeight={60}
              onGridRowsUpdated={this.handleGridRowsUpdated}
              rowActionsCell={RowActionsCell}
              // onRowClick={this.onRowClick}
              rowRenderer={<RowRenderer onRowDrop={this.reorderRows} />}
              onChange={this.onCellChange}
            />
          </StyleDataGridDrag>
          <div className="buttonWrapper">
            {controlBtn(mode)}
          </div>
        </StyleCodeAdminDtl>
      </div>
    );
  }
}

CodeAdminDtl.propTypes = {
  getCodeAdminDtl: PropTypes.func, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  setCodeAdminDtl: PropTypes.array, //eslint-disable-line
  updateGrid: PropTypes.func, //eslint-disable-line
  udtCodeAdmin: PropTypes.func, //eslint-disable-line
  delCodeAdmin: PropTypes.func, //eslint-disable-line
  registerCodeAdmin: PropTypes.func, //eslint-disable-line
  setCodeAdmin: PropTypes.object, //eslint-disable-line
  getCodeGrpCd: PropTypes.func, //eslint-disable-line
  setCodeGrpCd: PropTypes.bool, //eslint-disable-line
  match: PropTypes.object.isRequired, //eslint-disable-line		
  handleInitPage: PropTypes.func.isRequired, //eslint-disable-line
};

// 컴포넌트의 특정 함수형 props 를 실행 했을 때, 개발자가 지정한 action을 dispatch 하도록 설정
const mapDispatchToProps = dispatch => (
  {
    getCodeAdminDtl: (keywordType, keyword, codeGrpCd) =>
      dispatch(actions.getCodeAdminDtl(keywordType, keyword, codeGrpCd)),
    updateGrid: rows =>
      dispatch(actions.updateGrid(rows)),
    registerCodeAdmin: (
      codeGrpCd,
      codeNameKor,
      codeNameEng,
      codeNameChn,
      codeNameJpn,
      codeNameEtc,
      setCodeAdminDtl,
    ) =>
      dispatch(actions.registerCodeAdmin(
        codeGrpCd,
        codeNameKor,
        codeNameEng,
        codeNameChn,
        codeNameJpn,
        codeNameEtc,
        setCodeAdminDtl,
      )),
    delCodeAdmin: (delGrpCode, delCode, history) =>
      dispatch(actions.delCodeAdmin(delGrpCode, delCode, history)),
    udtCodeAdmin: (
      codeGrpCd,
      codeNameKor,
      codeNameEng,
      codeNameChn,
      codeNameJpn,
      codeNameEtc,
      setCodeAdminDtl,
      keywordType,
      keyword,
    ) =>
      dispatch(actions.udtCodeAdmin(
        codeGrpCd,
        codeNameKor,
        codeNameEng,
        codeNameChn,
        codeNameJpn,
        codeNameEtc,
        setCodeAdminDtl,
        keywordType,
        keyword,
      )),
    getCodeGrpCd: codeGrpCd =>
      dispatch(actions.getCodeGrpCd(codeGrpCd)),
  }
);

// (Function) store 의 state 를 컴포넌트의 props 에 매핑
const mapStateToProps = createStructuredSelector({
  setCodeAdminDtl: selectors.makeSelectCodeAdminDtl(),
  setCodeAdmin: selectors.makeSelectCodeAdmin(),
  setCodeGrpCd: selectors.makeSelectCodeGrpCd(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'CodeDtl', saga });
const withReducer = injectReducer({ key: 'CodeDtl', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CodeAdminDtl);
