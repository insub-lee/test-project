import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import Upload from 'components/FormStuff/Upload';

import { Input, Select, Table, Checkbox } from 'antd';

const { Option } = Select;
const AntdLineTable = StyledAntdTable(Table);

class EshsCondComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condTable: [],
      initRow: {
        REQ_CD: this.props && this.props.formData && this.props.formData.REQ_CD,
        TASK_SEQ: this.props && this.props.formData && this.props.formData.TASK_SEQ,
        CATEGORY_CD: 2128,
        DEPT_CD: 2118,
        QUAL_COMMENT: '',
        FILE_TYPE: 'TEMP',
        STEP: (this.props && this.props.CONFIG && this.props.CONFIG.property && this.props.CONFIG.property.STEP) || '0',
      },
      deptCodeList: ['MN3Q', 'MN3R', 'MN3T', 'MN3S', 'MN1B', '23754', 'ZZZZ', 'ZZZ1', 'ZZ'],
      columns: [],
    };
    this.debounceHandelOnChange = debounce(this.debounceHandelOnChange, 300);
    this.debounceHandelSetTable = debounce(this.debounceHandelSetTable, 300);
  }

  componentDidMount() {
    const {
      sagaKey: id,
      formData,
      getExtraApiData,
      CONFIG: {
        property: { STEP, COND_KEY },
      },
    } = this.props;
    const taskSeq = (formData && formData.TASK_SEQ) || 0;
    const apiArray = [
      {
        key: `${COND_KEY}_CATEGORY`,
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 2127 } },
      },
      {
        key: `${COND_KEY}_DEPT`,
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 648 } },
      },
    ];
    if (taskSeq) {
      apiArray.push({
        key: `${COND_KEY}CondList`,
        type: 'GET',
        url: `/api/eshs/v1/common/eshsGetCondList/${taskSeq}/${STEP}`,
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
        property: { COND_KEY, COND_COLUMN, COND_TYPE },
      },
    } = this.props;
    const list = (extraApiData && extraApiData[`${COND_KEY}CondList`] && extraApiData[`${COND_KEY}CondList`].list) || [];
    let isAllConfirm = false;
    if (COND_COLUMN === 'confirm' && list.length) {
      isAllConfirm = !list.filter(c => !c.QUAL_EMPID).length; // confirm 전부 체크되었을 경우
    }
    setFormData(id, { ...formData, [`${COND_COLUMN}CondList`]: list, [`${COND_COLUMN}_TYPE`]: COND_TYPE, [`isAll${COND_COLUMN}`]: isAllConfirm });

    if (COND_COLUMN) {
      return this.setColumns();
    }
  };

  setColumns = () => {
    const {
      extraApiData,
      CONFIG: {
        property: { COND_KEY, COND_TYPE, COND_COLUMN, BTN_FLAG, DEFAULT_LIST },
      },
    } = this.props;
    const { deptCodeList } = this.state;
    const categories = (extraApiData && extraApiData[`${COND_KEY}_CATEGORY`] && extraApiData[`${COND_KEY}_CATEGORY`].categoryMapList) || [];
    const depts = (extraApiData && extraApiData[`${COND_KEY}_DEPT`] && extraApiData[`${COND_KEY}_DEPT`].categoryMapList) || [];
    const list = (extraApiData && extraApiData[`${COND_KEY}CondList`] && extraApiData[`${COND_KEY}CondList`].list) || [];

    const condCategories = categories.filter(c => c.LVL === 3 && c.USE_YN === 'Y');
    const condDept = depts.filter(d => deptCodeList.indexOf(d.CODE) > -1 && d.USE_YN === 'Y');

    const columns = [];

    switch (COND_COLUMN) {
      case 'improve': {
        const newColumns = [
          {
            title: () => (
              <span>
                개선계획{' '}
                {BTN_FLAG === 'Y' && (
                  <span onClick={this.handlePlusTd} className="add-row">
                    [+3]
                  </span>
                )}
              </span>
            ),
            dataIndex: 'QUAL_COMMENT',
            align: 'center',
            width: '50%',
            render: (text, record) => {
              if (COND_TYPE === 'INPUT') {
                return (
                  <Input
                    className="ant-input-inline ant-input-sm input-left"
                    defaultValue={record.QUAL_COMMENT || ''}
                    onChange={e => this.debounceHandelOnChange('QUAL_COMMENT', e.target.value, record)}
                  />
                );
              }
              if (COND_TYPE === 'VIEW') {
                return <span>{record.QUAL_COMMENT}</span>;
              }
              return '';
            },
          },
          {
            title: 'Categories',
            dataIndex: 'CATEGORY_CD',
            align: 'center',
            width: '25%',
            render: (text, record) => {
              if (COND_TYPE === 'INPUT') {
                return (
                  <Select
                    defaultValue={record.CATEGORY_CD || ''}
                    style={{ width: '100%' }}
                    onChange={e => this.debounceHandelOnChange('CATEGORY_CD', e, record)}
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
              if (COND_TYPE === 'VIEW') {
                const nodeIndex = condCategories.findIndex(a => a.NODE_ID === record.CATEGORY_CD);
                if (nodeIndex > -1) {
                  return <span>{condCategories[nodeIndex].NAME_KOR}</span>;
                }
                return <span></span>;
              }
            },
          },
          {
            title: '담당부서',
            dataIndex: 'DEPT_CD',
            align: 'center',
            width: '25%',
            render: (text, record) => {
              if (COND_TYPE === 'INPUT') {
                return (
                  <Select defaultValue={record.DEPT_CD || ''} style={{ width: '100%' }} onChange={e => this.debounceHandelOnChange('DEPT_CD', e, record)}>
                    {condDept &&
                      condDept.map(d => (
                        <Option key={d.NODE_ID} value={d.NODE_ID}>
                          {d.NAME_KOR}
                        </Option>
                      ))}
                  </Select>
                );
              }
              if (COND_TYPE === 'VIEW') {
                const nodeIndex = condDept.findIndex(d => d.NODE_ID === record.DEPT_CD);
                if (nodeIndex > -1) {
                  return <span>{condDept[nodeIndex].NAME_KOR}</span>;
                }
                return <span></span>;
              }
              return '';
            },
          },
        ];

        columns.push(newColumns);
        break;
      }
      case 'approve': {
        const newColumns = [
          {
            //   <StyledButton className="btn-primary btn-sm" onClick={this.handlePlusTd}>
            //   [+3]
            // </StyledButton>
            title: () => (
              <span>
                승인조건{' '}
                {BTN_FLAG === 'Y' && (
                  <span onClick={this.handlePlusTd} className="add-row">
                    [+3]
                  </span>
                )}
              </span>
            ),
            dataIndex: 'QUAL_COMMENT',
            align: 'center',
            width: '45%',
            render: (text, record) => {
              if (COND_TYPE === 'INPUT') {
                return (
                  <Input
                    className="ant-input-inline ant-input-sm input-left"
                    defaultValue={record.QUAL_COMMENT || ''}
                    onChange={e => this.debounceHandelOnChange('QUAL_COMMENT', e.target.value, record)}
                  />
                );
              }
              if (COND_TYPE === 'VIEW') {
                return <span>{record.QUAL_COMMENT}</span>;
              }
              return '';
            },
          },
          {
            title: 'Categories',
            dataIndex: 'CATEGORY_CD',
            align: 'center',
            width: '20%',
            render: (text, record) => {
              if (COND_TYPE === 'INPUT') {
                return (
                  <Select
                    defaultValue={record.CATEGORY_CD || ''}
                    style={{ width: '100%' }}
                    onChange={e => this.debounceHandelOnChange('CATEGORY_CD', e, record)}
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
              if (COND_TYPE === 'VIEW') {
                const nodeIndex = condCategories.findIndex(a => a.NODE_ID === record.CATEGORY_CD);
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
            dataIndex: 'DEPT_CD',
            align: 'center',
            width: '20%',
            render: (text, record) => {
              if (COND_TYPE === 'INPUT') {
                return (
                  <Select defaultValue={record.DEPT_CD || ''} style={{ width: '100%' }} onChange={e => this.debounceHandelOnChange('DEPT_CD', e, record)}>
                    {condDept &&
                      condDept.map(d => (
                        <Option key={d.NODE_ID} value={d.NODE_ID}>
                          {d.NAME_KOR}
                        </Option>
                      ))}
                  </Select>
                );
              }
              if (COND_TYPE === 'VIEW') {
                const nodeIndex = condDept.findIndex(d => d.NODE_ID === record.DEPT_CD);
                if (nodeIndex > -1) {
                  return <span>{condDept[nodeIndex].NAME_KOR}</span>;
                }
                return <span></span>;
              }
              return '';
            },
          },
          {
            title: () => (COND_TYPE === 'INPUT' ? '파일첨부' : '첨부파일'),
            dataIndex: 'FILE_SEQ',
            align: 'center',
            width: '15%',
            render: (text, record) => (
              <Upload
                key={`sqApproveCond_${record.SEQ}`}
                readOnly={COND_TYPE === 'VIEW'}
                onlyDown
                defaultValue={{
                  DETAIL: record.FILE_SEQ
                    ? [{ fileName: record.FILE_NM, seq: record.FILE_SEQ, down: `/down/file/${record.FILE_SEQ}`, name: record.FILE_NM, fileExt: record.fileExt }]
                    : [],
                }}
                saveTempContents={condFileList => this.saveTempContents(condFileList, record.SEQ)}
                limit={1}
                multiple={false}
                customRemove={file => this.handleFileRemove(file, record)}
              />
            ),
          },
        ];
        columns.push(newColumns);
        break;
      }
      case 'result': {
        const newColumns = [
          {
            title: () => (
              <span>
                개선결과{' '}
                {BTN_FLAG === 'Y' && (
                  <span onClick={this.handlePlusTd} className="add-row">
                    [+3]
                  </span>
                )}
              </span>
            ),
            dataIndex: 'QUAL_COMMENT',
            align: 'center',
            width: '45%',
            render: (text, record) => {
              if (COND_TYPE === 'INPUT') {
                return (
                  <Input
                    className="ant-input-inline ant-input-sm input-left"
                    defaultValue={record.QUAL_COMMENT || ''}
                    onChange={e => this.debounceHandelOnChange('QUAL_COMMENT', e.target.value, record)}
                  />
                );
              }
              if (COND_TYPE === 'VIEW') {
                return <span>{record.QUAL_COMMENT}</span>;
              }
              return '';
            },
          },
          {
            title: 'Categories',
            dataIndex: 'CATEGORY_CD',
            align: 'center',
            width: '20%',
            render: (text, record) => {
              if (COND_TYPE === 'INPUT') {
                return (
                  <Select
                    defaultValue={record.CATEGORY_CD || ''}
                    style={{ width: '100%' }}
                    onChange={e => this.debounceHandelOnChange('CATEGORY_CD', e, record)}
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
              if (COND_TYPE === 'VIEW') {
                const nodeIndex = condCategories.findIndex(a => a.NODE_ID === record.CATEGORY_CD);
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
            dataIndex: 'DEPT_CD',
            align: 'center',
            width: '20%',
            render: (text, record) => {
              if (COND_TYPE === 'INPUT') {
                return (
                  <Select defaultValue={record.DEPT_CD || ''} style={{ width: '100%' }} onChange={e => this.debounceHandelOnChange('DEPT_CD', e, record)}>
                    {condDept &&
                      condDept.map(d => (
                        <Option key={d.NODE_ID} value={d.NODE_ID}>
                          {d.NAME_KOR}
                        </Option>
                      ))}
                  </Select>
                );
              }
              if (COND_TYPE === 'VIEW') {
                const nodeIndex = condDept.findIndex(d => d.NODE_ID === record.DEPT_CD);
                if (nodeIndex > -1) {
                  return <span>{condDept[nodeIndex].NAME_KOR}</span>;
                }
                return <span></span>;
              }
              return '';
            },
          },
          {
            title: () => (COND_TYPE === 'INPUT' ? '파일첨부' : '첨부파일'),
            dataIndex: 'FILE_SEQ',
            align: 'center',
            width: '15%',
            render: (text, record) => (
              <Upload
                key={`sqResultCond_${record.SEQ}`}
                readOnly={COND_TYPE === 'VIEW'}
                onlyDown
                defaultValue={{
                  DETAIL: record.FILE_SEQ
                    ? [{ fileName: record.FILE_NM, seq: record.FILE_SEQ, down: `/down/file/${record.FILE_SEQ}`, name: record.FILE_NM, fileExt: record.fileExt }]
                    : [],
                }}
                saveTempContents={condFileList => this.saveTempContents(condFileList, record.SEQ)}
                limit={1}
                multiple={false}
                customRemove={file => this.handleFileRemove(file, record)}
              />
            ),
          },
        ];
        columns.push(newColumns);
        break;
      }
      case 'confirm': {
        let changeWidth = '30%';
        if (COND_TYPE === 'INPUT') changeWidth = '25%';
        const newColumns = [
          {
            title: () => (
              <span>
                개선결과 확인{' '}
                {BTN_FLAG === 'Y' && (
                  <span onClick={this.handlePlusTd} className="add-row">
                    [+3]
                  </span>
                )}
              </span>
            ),
            dataIndex: 'QUAL_COMMENT',
            align: 'center',
            width: `${changeWidth}`,
            render: (text, record) => <span>{record.QUAL_COMMENT}</span>,
          },
          {
            title: 'Categories',
            dataIndex: 'CATEGORY_CD',
            align: 'center',
            width: '10%',
            render: (text, record) => {
              const nodeIndex = condCategories.findIndex(a => a.NODE_ID === record.CATEGORY_CD);
              if (nodeIndex > -1) {
                return <span>{condCategories[nodeIndex].NAME_KOR}</span>;
              }
              return <span></span>;
            },
          },
          {
            title: '담당부서',
            dataIndex: 'DEPT_CD',
            align: 'center',
            width: '10%',
            render: (text, record) => {
              const nodeIndex = condDept.findIndex(d => d.NODE_ID === record.DEPT_CD);
              if (nodeIndex > -1) {
                return <span>{condDept[nodeIndex].NAME_KOR}</span>;
              }
              return <span></span>;
            },
          },
          {
            title: '첨부파일',
            dataIndex: 'FILE_SEQ',
            align: 'center',
            width: '20%',
            render: (text, record) => (
              <Upload
                key={`sqConfirmCond_${record.SEQ}`}
                readOnly
                onlyDown
                defaultValue={{
                  DETAIL: record.FILE_SEQ
                    ? [{ fileName: record.FILE_NM, seq: record.FILE_SEQ, down: `/down/file/${record.FILE_SEQ}`, name: record.FILE_NM, fileExt: record.fileExt }]
                    : [],
                }}
                saveTempContents={condFileList => this.saveTempContents(condFileList, record.SEQ)}
                limit={1}
                multiple={false}
                customRemove={file => this.handleFileRemove(file, record)}
              />
            ),
          },
          {
            title: '확인자명',
            dataIndex: 'QUAL_EMPNM',
            align: 'center',
            width: '15%',
          },
          {
            title: '확인일자',
            dataIndex: 'QUAL_DT',
            align: 'center',
            width: '15%',
          },
        ];

        if (COND_TYPE === 'INPUT') {
          newColumns.push({
            title: '확인',
            align: 'center',
            width: '5%',
            render: (text, record) => (
              <Checkbox className="ant-checkbox-wrapper" defaultChecked={!!record.QUAL_EMPID} onChange={() => this.handleConfirmChecked(record.SEQ)} />
            ),
          });
        }
        columns.push(newColumns);
        break;
      }
      default:
        break;
    }
    this.setState({ columns: 0 in columns ? columns[0] : [] }, () =>
      DEFAULT_LIST === 'Y' && !list.length && COND_TYPE === 'INPUT' ? this.handlePlusTd() : this.debounceHandelSetTable(),
    );
  };

  debounceHandelSetTable = () => {
    const {
      formData,
      CONFIG: {
        property: { COND_COLUMN, COND_KEY },
      },
    } = this.props;
    const { columns } = this.state;
    const condList = (formData && formData[`${COND_COLUMN}CondList`]) || [];
    return this.setState({
      condTable: [
        <AntdLineTable
          key={`${COND_KEY}_condTable`}
          className="tableWrapper"
          rowKey={condList && condList.INDEX}
          columns={columns}
          dataSource={condList || []}
          bordered
          scroll={{ y: 135 }}
          pagination={false}
          footer={() => <span>{`${condList.length} 건`}</span>}
        />,
      ],
    });
  };

  handlePlusTd = () => {
    const {
      sagaKey: id,
      formData,
      changeFormData,
      CONFIG: {
        property: { COND_COLUMN },
      },
    } = this.props;
    const { initRow, columns } = this.state;
    const condList = (formData && formData[`${COND_COLUMN}CondList`]) || [];
    let index = condList.length + 1;
    const initCondList = [
      { ...initRow, SEQ: index++ },
      { ...initRow, SEQ: index++ },
      { ...initRow, SEQ: index++ },
    ];
    changeFormData(id, `${COND_COLUMN}CondList`, condList.concat(initCondList));
    this.debounceHandelSetTable();
  };

  debounceHandelOnChange = (target, value, record) => {
    const {
      sagaKey: id,
      changeFormData,
      formData,
      CONFIG: {
        property: { COND_COLUMN },
      },
    } = this.props;
    const condList = (formData && formData[`${COND_COLUMN}CondList`]) || [];

    changeFormData(
      id,
      `${COND_COLUMN}CondList`,
      condList.map(a => (a.SEQ === record.SEQ ? { ...a, [target]: value } : a)),
    );
  };

  handleConfirmChecked = key => {
    const {
      sagaKey: id,
      changeFormData,
      formData,
      CONFIG: {
        property: { COND_COLUMN },
      },
      profile: { USER_ID = '', EMP_NO = '' },
    } = this.props;

    const condList = (formData && formData[`${COND_COLUMN}CondList`]) || [];
    changeFormData(
      id,
      `${COND_COLUMN}CondList`,
      condList.map(c => (c.SEQ === key ? { ...c, QUAL_EMPNO: EMP_NO, QUAL_EMPID: c.QUAL_EMPID ? '' : USER_ID } : c)),
    );
  };

  saveTempContents = (newFiles, rowSeq) => {
    const {
      sagaKey: id,
      formData,
      setFormData,
      CONFIG: {
        property: { COND_COLUMN },
      },
    } = this.props;
    const condFileList = (formData && formData[`${COND_COLUMN}FileList`]) || [];
    const condList = (formData && formData[`${COND_COLUMN}CondList`]) || [];
    if (newFiles.length) {
      setFormData(id, {
        ...formData,
        [`${COND_COLUMN}CondList`]: condList.map(a =>
          a.SEQ === rowSeq ? { ...a, FILE_NM: newFiles[0].fileName, FILE_SEQ: newFiles[0].seq, FILE_TYPE: 'TEMP', DOWN: newFiles[0].down } : a,
        ),
        [`${COND_COLUMN}FileList`]: condFileList.filter(f => f.rowSeq !== rowSeq).concat({ ...newFiles[0], rowSeq }),
      });
    }
  };

  handleFileRemove = (file, record) => {
    const {
      sagaKey: id,
      changeFormData,
      formData,
      CONFIG: {
        property: { COND_COLUMN },
      },
    } = this.props;
    const condFileList = (formData && formData[`${COND_COLUMN}FileList`]) || [];
    const condList = (formData && formData[`${COND_COLUMN}CondList`]) || [];
    if (condFileList.findIndex(c => c.seq === file.seq) < 0) {
      changeFormData(
        id,
        `${COND_COLUMN}CondList`,
        condList.map(a => (a.SEQ === record.SEQ ? { ...a, FILE_SEQ: null } : a)),
      );
      return this.debounceHandelSetTable();
    }
    return changeFormData(
      id,
      `${COND_COLUMN}FileList`,
      condFileList.filter(f => f.seq !== file.seq),
    );
  };

  render() {
    const { CONFIG } = this.props;
    const { condTable } = this.state;
    return <>{condTable}</>;
  }
}

EshsCondComp.propTypes = {
  CONFIG: PropTypes.object,
  sagaKey: PropTypes.string,
  formData: PropTypes.object,
  changeFormData: PropTypes.func,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  setFormData: PropTypes.func,
  profile: PropTypes.object,
};

EshsCondComp.defaultProps = {
  CONFIG: {},
  sagaKey: '',
  formData: {},
  changeFormData: () => {},
  getExtraApiData: () => {},
  extraApiData: {},
  setFormData: () => {},
  profile: {},
};

export default EshsCondComp;
