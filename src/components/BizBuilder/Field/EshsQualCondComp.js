import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from 'containers/common/Auth/selectors';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';

import Upload from 'components/FormStuff/Upload';
import ConfirmResult from 'apps/eshs/user/safety/eshsQual/qualApprove/confirmResult';

import { Input, Select, Table, Checkbox, message, Modal } from 'antd';

const AntdModal = StyledContentsModal(Modal);

const { Option } = Select;
const AntdLineTable = StyledAntdTable(Table);

class EshsQualCondComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initRow: {
        REQ_CD: this.props && this.props.formData && this.props.formData.REQ_CD,
        TASK_SEQ: this.props && this.props.formData && this.props.formData.TASK_SEQ,
      },
      deptCodeList: ['MN3Q', 'MN3R', 'MN3T', 'MN3S', 'MN1B', '23754', 'ZZZZ', 'ZZZ1', 'ZZ'],
      columns: [],
      modalVisible: false,
      confirmResult: [],
    };
    this.debounceHandelOnChange = debounce(this.debounceHandelOnChange, 300);
  }

  componentDidMount() {
    const {
      sagaKey: id,
      formData,
      getExtraApiData,
      CONFIG: {
        property: { ALL_LIST },
      },
    } = this.props;
    const taskSeq = ALL_LIST === 'Y' ? -2 : (formData && formData.TASK_SEQ) || 0;
    const apiArray = [
      {
        key: `${id}_COND_CATEGORY`,
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 2127 } },
      },
      {
        key: `${id}_COND_DEPT`,
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 648 } },
      },
    ];
    if (taskSeq > 0) {
      apiArray.push({
        key: `${id}_COND_LIST`,
        type: 'GET',
        url: `/api/eshs/v1/common/eshsGetCondList/${taskSeq}`,
      });
    } else if (taskSeq === -2) {
      apiArray.push({
        key: `${id}_COND_LIST`,
        type: 'POST',
        url: `/api/eshs/v1/common/eshsGetCondList/${taskSeq}`,
      });
    }
    getExtraApiData(id, apiArray, this.appStart);
  }

  appStart = () => {
    const {
      sagaKey: id,
      extraApiData,
      setFormData,
      formData,
      CONFIG: {
        property: { APPROVE_TYPE, RESULT_TYPE },
      },
    } = this.props;
    const list = (extraApiData && extraApiData[`${id}_COND_LIST`] && extraApiData[`${id}_COND_LIST`].list) || [];
    const isAllConfirm = !list.filter(c => !c.RESULT_EMP_ID).length || false; // confirm 전부 체크되었을 경우
    setFormData(id, { ...formData, condList: list, APPROVE_TYPE, RESULT_TYPE, isAllConfirm });

    this.setColumns();
  };

  setColumns = () => {
    const {
      sagaKey: id,
      extraApiData,
      CONFIG: {
        property: { APPROVE_TYPE, RESULT_TYPE, ALL_LIST },
      },
    } = this.props;
    const { deptCodeList } = this.state;
    const categories = (extraApiData && extraApiData[`${id}_COND_CATEGORY`] && extraApiData[`${id}_COND_CATEGORY`].categoryMapList) || [];
    const depts = (extraApiData && extraApiData[`${id}_COND_DEPT`] && extraApiData[`${id}_COND_DEPT`].categoryMapList) || [];

    const condCategories = categories.filter(c => c.LVL === 3 && c.USE_YN === 'Y');
    const condDept = depts.filter(d => deptCodeList.indexOf(d.CODE) > -1 && d.USE_YN === 'Y');

    let resultWidth = '50%';
    let approveWidth = '50%';
    const columns = [];

    if (ALL_LIST === 'Y') {
      approveWidth = '38%';
      columns.push({
        title: () => (
          <span>
            Qual
            <br />
            신청번호
          </span>
        ),
        width: '12%',
        align: 'center',
        dataIndex: 'REQ_CD',
        render: (text, record) => (
          <span
            className="add-row"
            onClick={() => this.setState({ confirmResult: [<ConfirmResult taskSeq={record.TASK_SEQ || -1} />] }, () => this.handleModalVisible())}
          >
            {text}
          </span>
        ),
      });
    }

    if (RESULT_TYPE === 'CHECK' || RESULT_TYPE === 'CHECK_VIEW') resultWidth = '40%';

    columns.push({
      title: () => (
        <span>
          개선항목
          {APPROVE_TYPE === 'INPUT' && (
            <span onClick={this.handlePlusTd} className="add-row">
              [+3]
            </span>
          )}
        </span>
      ),
      align: 'center',
      width: approveWidth,
      children: [
        {
          title: '승인조건',
          dataIndex: 'APPROVE_QUAL_COMMENT',
          align: 'center',
          width: '28%',
          render: (text, record, index) => {
            if (APPROVE_TYPE === 'INPUT') {
              return (
                <Input
                  className="ant-input-inline ant-input-sm input-left"
                  defaultValue={record.APPROVE_QUAL_COMMENT || ''}
                  onChange={e => this.debounceHandelOnChange('APPROVE_QUAL_COMMENT', e.target.value, index)}
                />
              );
            }
            if (APPROVE_TYPE === 'VIEW') {
              return <span>{record.APPROVE_QUAL_COMMENT}</span>;
            }
            return '';
          },
        },
        {
          title: 'Categories',
          dataIndex: 'APPROVE_CATEGORY_CD',
          align: 'center',
          width: '24%',
          render: (text, record, index) => {
            if (APPROVE_TYPE === 'INPUT') {
              return (
                <Select
                  defaultValue={record.APPROVE_CATEGORY_CD || ''}
                  style={{ width: '100%' }}
                  onChange={e => this.debounceHandelOnChange('APPROVE_CATEGORY_CD', e, index)}
                >
                  {condCategories &&
                    condCategories.map(c => (
                      <Option key={c.NODE_ID} value={c.NODE_ID}>
                        {c.NAME_KOR}
                      </Option>
                    ))}
                </Select>
              );
            }
            if (APPROVE_TYPE === 'VIEW') {
              const nodeIndex = condCategories.findIndex(a => a.NODE_ID === record.APPROVE_CATEGORY_CD);
              if (nodeIndex > -1) {
                return <span>{condCategories[nodeIndex].NAME_KOR}</span>;
              }
              return <span></span>;
            }
            return '';
          },
        },
        {
          title: '담당부서',
          dataIndex: 'APPROVE_DEPT_CD',
          align: 'center',
          width: '24%',
          render: (text, record, index) => {
            if (APPROVE_TYPE === 'INPUT') {
              return (
                <Select
                  defaultValue={record.APPROVE_DEPT_CD || ''}
                  style={{ width: '100%' }}
                  onChange={e => this.debounceHandelOnChange('APPROVE_DEPT_CD', e, index)}
                >
                  {condDept &&
                    condDept.map(d => (
                      <Option key={d.NODE_ID} value={d.NODE_ID}>
                        {d.NAME_KOR}
                      </Option>
                    ))}
                </Select>
              );
            }
            if (APPROVE_TYPE === 'VIEW') {
              const nodeIndex = condDept.findIndex(d => d.NODE_ID === record.APPROVE_DEPT_CD);
              if (nodeIndex > -1) {
                return <span>{condDept[nodeIndex].NAME_KOR}</span>;
              }
              return <span></span>;
            }
            return '';
          },
        },
        {
          title: () => (APPROVE_TYPE === 'INPUT' ? '파일첨부' : '첨부파일'),
          dataIndex: 'APPROVE_FILE_SEQ',
          align: 'center',
          width: '24%',
          render: (text, record, index) => (
            <Upload
              key={`approve_${index}`}
              readOnly={APPROVE_TYPE === 'VIEW'}
              onlyDown
              defaultValue={{
                DETAIL: record.APPROVE_FILE_SEQ
                  ? [
                      {
                        fileName: record.APPROVE_FILE_NM,
                        seq: record.APPROVE_FILE_SEQ,
                        down: `/down/file/${record.APPROVE_FILE_SEQ}`,
                        name: record.APPROVE_FILE_NM,
                        fileExt: record.APPROVE_FILE_EXT,
                      },
                    ]
                  : [],
              }}
              saveTempContents={condFileList => this.saveTempContents(condFileList, index)}
              limit={1}
              multiple={false}
              customRemove={file => this.handleFileRemove(file, 'APPROVE_FILE_SEQ', index)}
            />
          ),
        },
      ],
    });
    columns.push({
      title: () => (
        <span>
          개선결과
          {RESULT_TYPE === 'INPUT' && (
            <span onClick={this.handlePlusTd} className="add-row">
              [+3]
            </span>
          )}
        </span>
      ),
      align: 'center',
      width: resultWidth,
      children: [
        {
          title: '개선내용',
          dataIndex: 'RESULT_QUAL_COMMENT',
          width: '34%',
          render: (text, record, index) => {
            if (RESULT_TYPE === 'INPUT') {
              return (
                <Input
                  className="ant-input-inline ant-input-sm input-left"
                  defaultValue={record.RESULT_QUAL_COMMENT || ''}
                  onChange={e => this.debounceHandelOnChange('RESULT_QUAL_COMMENT', e.target.value, index)}
                />
              );
            }
            return <span>{record.RESULT_QUAL_COMMENT || ''}</span>;
          },
        },
        {
          title: '담당부서',
          dataIndex: 'RESULT_DEPT_CD',
          align: 'center',
          width: '33%',
          render: (text, record, index) => {
            if (RESULT_TYPE === 'INPUT') {
              return (
                <Select
                  defaultValue={record.RESULT_DEPT_CD || ''}
                  style={{ width: '100%' }}
                  onChange={e => this.debounceHandelOnChange('RESULT_DEPT_CD', e, index)}
                >
                  {condDept &&
                    condDept.map(d => (
                      <Option key={d.NODE_ID} value={d.NODE_ID}>
                        {d.NAME_KOR}
                      </Option>
                    ))}
                </Select>
              );
            }
            if (RESULT_TYPE === 'VIEW' || RESULT_TYPE === 'CHECK' || RESULT_TYPE === 'CHECK_VIEW') {
              const nodeIndex = condDept.findIndex(d => d.NODE_ID === record.RESULT_DEPT_CD);
              if (nodeIndex > -1) {
                return <span>{condDept[nodeIndex].NAME_KOR}</span>;
              }
              return <span></span>;
            }
            return '';
          },
        },
        {
          title: () => (RESULT_TYPE === 'INPUT' ? '파일첨부' : '첨부파일'),
          dataIndex: 'REUSLT_FILE_SEQ',
          align: 'center',
          width: '33%',
          render: (text, record, index) => (
            <Upload
              key={`result_${index}`}
              readOnly={RESULT_TYPE === 'VIEW' || RESULT_TYPE === 'CHECK' || RESULT_TYPE === 'CHECK_VIEW'}
              onlyDown
              defaultValue={{
                DETAIL: record.RESULT_FILE_SEQ
                  ? [
                      {
                        fileName: record.RESULT_FILE_NM,
                        seq: record.RESULT_FILE_SEQ,
                        down: `/down/file/${record.RESULT_FILE_SEQ}`,
                        name: record.RESULT_FILE_NM,
                      },
                    ]
                  : [],
              }}
              saveTempContents={condFileList => this.saveTempContents(condFileList, index)}
              limit={1}
              multiple={false}
              customRemove={file => this.handleFileRemove(file, 'RESULT_FILE_SEQ', index)}
            />
          ),
        },
      ],
    });

    if (RESULT_TYPE === 'CHECK') {
      columns.push({
        title: '확인',
        align: 'center',
        width: '10%',
        render: (text, record, index) => (
          <Checkbox className="ant-checkbox-wrapper" checked={!!record.RESULT_QUAL_EMPID} onChange={() => this.handleConfirmChecked(index)} />
        ),
      });
    }
    if (RESULT_TYPE === 'CHECK_VIEW') {
      columns.push({
        title: '확인자',
        align: 'center',
        dataIndex: 'RESULT_QUAL_EMP_NAME',
        width: '10%',
      });
    }

    this.setState({ columns });
  };

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    if (modalVisible) return this.setState({ confirmResult: [], modalVisible: !modalVisible });
    return this.setState({ modalVisible: !modalVisible });
  };

  debounceHandelSetTable = () => {
    // const {
    //   formData,
    //   CONFIG: {
    //     property: { ALL_LIST },
    //   },
    // } = this.props;
    // const { columns } = this.state;
    // const condList = (formData && formData.condList) || [];
    // return this.setState({
    //   condTable: [
    //     <AntdLineTable
    //       key="condTable"
    //       className="tableWrapper"
    //       rowKey={condList && condList.INDEX}
    //       columns={columns}
    //       dataSource={condList || []}
    //       bordered
    //       scroll={ALL_LIST === 'Y' ? { y: 45 * 12 } : { y: 45 * 6 }}
    //       pagination={false}
    //       footer={() => <span>{`${condList.length} 건`}</span>}
    //     />,
    //   ],
    // });
  };

  handlePlusTd = () => {
    const {
      sagaKey: id,
      formData,
      changeFormData,
      CONFIG: {
        property: { APPROVE_TYPE, RESULT_TYPE },
      },
    } = this.props;
    const { initRow, columns } = this.state;

    const condList = (formData && formData.condList) || [];
    const initCondList = [];
    if (APPROVE_TYPE === 'INPUT') {
      initCondList.push({ ...initRow, APPROVE_CATEGORY_CD: 2128, APPROVE_DEPT_CD: 2118, APPROVE_FILE_TYPE: 'TEMP', STEP: '1' });
      initCondList.push({ ...initRow, APPROVE_CATEGORY_CD: 2128, APPROVE_DEPT_CD: 2118, APPROVE_FILE_TYPE: 'TEMP', STEP: '1' });
      initCondList.push({ ...initRow, APPROVE_CATEGORY_CD: 2128, APPROVE_DEPT_CD: 2118, APPROVE_FILE_TYPE: 'TEMP', STEP: '1' });
    } else if (RESULT_TYPE === 'INPUT') {
      initCondList.push({ ...initRow, RESULT_CATEGORY_CD: 2128, RESULT_DEPT_CD: 2118, RESULT_FILE_TYPE: 'TEMP', STEP: '3' });
      initCondList.push({ ...initRow, RESULT_CATEGORY_CD: 2128, RESULT_DEPT_CD: 2118, RESULT_FILE_TYPE: 'TEMP', STEP: '3' });
      initCondList.push({ ...initRow, RESULT_CATEGORY_CD: 2128, RESULT_DEPT_CD: 2118, RESULT_FILE_TYPE: 'TEMP', STEP: '3' });
    }
    changeFormData(id, 'condList', condList.concat(initCondList));
  };

  debounceHandelOnChange = (target, value, targetIndex) => {
    const { sagaKey: id, changeFormData, formData } = this.props;
    const condList = (formData && formData.condList) || [];

    changeFormData(
      id,
      'condList',
      condList.map((a, index) => (index === targetIndex ? { ...a, [target]: value } : a)),
    );
  };

  handleConfirmChecked = targetIndex => {
    const {
      sagaKey: id,
      changeFormData,
      formData,
      profile: { USER_ID = '', EMP_NO = '' },
    } = this.props;

    const condList = (formData && formData.condList) || [];
    changeFormData(
      id,
      'condList',
      condList.map((c, index) => (index === targetIndex ? { ...c, RESULT_QUAL_EMPNO: EMP_NO, RESULT_QUAL_EMPID: c.RESULT_QUAL_EMPID ? '' : USER_ID } : c)),
    );
  };

  saveTempContents = (newFiles, targetIndex) => {
    const { sagaKey: id, formData, setFormData } = this.props;
    const condFileList = (formData && formData.condFileList) || [];
    const condList = (formData && formData.condList) || [];
    if (newFiles.length) {
      setFormData(id, {
        ...formData,
        condList: condList.map((a, index) =>
          index === targetIndex ? { ...a, FILE_NM: newFiles[0].fileName, FILE_SEQ: newFiles[0].seq, FILE_TYPE: 'TEMP', DOWN: newFiles[0].down } : a,
        ),
        condFileList: condFileList.filter(f => f.targetIndex !== targetIndex).concat({ ...newFiles[0], targetIndex }),
      });
    }
  };

  handleFileRemove = (file, target, targetIndex) => {
    const { sagaKey: id, changeFormData, formData } = this.props;
    const condFileList = (formData && formData.condFileList) || [];
    const condList = (formData && formData.condList) || [];
    if (condFileList.findIndex(c => c.seq === file.seq) < 0) {
      return changeFormData(
        id,
        'condList',
        condList.map((a, index) => (index === targetIndex ? { ...a, [target]: null } : a)),
      );
    }
    return changeFormData(
      id,
      'condFileList',
      condFileList.filter(f => f.targetIndex !== targetIndex),
    );
  };

  render() {
    const {
      formData,
      CONFIG: {
        property: { ALL_LIST },
      },
    } = this.props;

    const { columns, modalVisible, confirmResult } = this.state;
    const condList = (formData && formData.condList) || [];
    return (
      <>
        <AntdLineTable
          key="condTable"
          className="tableWrapper"
          rowKey="INDEX"
          columns={columns}
          dataSource={condList || []}
          bordered
          scroll={ALL_LIST === 'Y' ? { y: 45 * 12 } : { y: 45 * 6 }}
          pagination={false}
          footer={() => <span>{`${condList.length} 건`}</span>}
        />
        <AntdModal title="확인 개선결과 조회" visible={modalVisible} width={1000} height={600} onCancel={this.handleModalVisible} footer={[null]}>
          {confirmResult}
        </AntdModal>
      </>
    );
  }
}

EshsQualCondComp.propTypes = {
  CONFIG: PropTypes.object,
  sagaKey: PropTypes.string,
  formData: PropTypes.object,
  changeFormData: PropTypes.func,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  setFormData: PropTypes.func,
  profile: PropTypes.object,
};

EshsQualCondComp.defaultProps = {
  CONFIG: {},
  sagaKey: '',
  formData: {},
  changeFormData: () => {},
  getExtraApiData: () => {},
  extraApiData: {},
  setFormData: () => {},
  profile: {},
};

export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(EshsQualCondComp);
