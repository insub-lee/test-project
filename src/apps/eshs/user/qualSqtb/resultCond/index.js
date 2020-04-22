import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import Upload from 'components/FormStuff/Upload';

import { Input, Select, Table } from 'antd';

const { Option } = Select;
const AntdLineTable = StyledLineTable(Table);

class ResultCond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultCondTable: [],
      defaultCurrent: 1,
      initResult: {
        REQ_CD: this.props && this.props.formData && this.props.formData.REQ_CD,
        TASK_SEQ: this.props && this.props.formData && this.props.formData.TASK_SEQ,
        CATEGORY_CD: 2128,
        DEPT_CD: 2118,
        QUAL_COMMENT: '',
        FILE_TYPE: 'TEMP',
        STEP: '3',
      },
      deptCodeList: ['MN3Q', 'MN3R', 'MN3T', 'MN3S', 'MN1B', '23754', 'ZZZZ', 'ZZZ1', 'ZZ'],
      resultCategories: [],
      resultDept: [],
      columns: [
        {
          title: '개선결과',
          dataIndex: 'QUAL_COMMENT',
          align: 'center',
          width: '45%',
          render: (text, record) => {
            const { viewType } = this.props;

            if (viewType === 'INPUT') {
              return (
                <Input
                  className="ant-input-inline ant-input-sm input-left"
                  defaultValue={record.QUAL_COMMENT || ''}
                  onChange={e => this.debounceHandelOnChange('QUAL_COMMENT', e.target.value, record)}
                />
              );
            }
            if (viewType === 'VIEW') {
              return <span>{record.QUAL_COMMENT}</span>;
            }
          },
        },
        {
          title: 'Categories',
          dataIndex: 'CATEGORY_CD',
          align: 'center',
          width: '20%',
          render: (text, record) => {
            const { viewType } = this.props;
            const resultCategories = this.state.resultCategories || [];
            if (viewType === 'INPUT') {
              return (
                <Select defaultValue={record.CATEGORY_CD || ''} style={{ width: '100%' }} onChange={e => this.debounceHandelOnChange('CATEGORY_CD', e, record)}>
                  {resultCategories &&
                    resultCategories.map(c => (
                      <Option key={c.NODE_ID} value={c.NODE_ID}>
                        {c.NAME_KOR}
                      </Option>
                    ))}
                </Select>
              );
            }
            if (viewType === 'VIEW') {
              const nodeIndex = resultCategories.findIndex(a => a.NODE_ID === record.CATEGORY_CD);
              if (nodeIndex > -1) {
                return <span>{resultCategories[nodeIndex].NAME_KOR}</span>;
              }
              return <span></span>;
            }
          },
        },
        {
          title: '담당부서',
          dataIndex: 'DEPT_CD',
          align: 'center',
          width: '20%',
          render: (text, record) => {
            const { viewType } = this.props;
            const resultDept = this.state.resultDept || [];
            if (viewType === 'INPUT') {
              return (
                <Select defaultValue={record.DEPT_CD || ''} style={{ width: '100%' }} onChange={e => this.debounceHandelOnChange('DEPT_CD', e, record)}>
                  {resultDept &&
                    resultDept.map(d => (
                      <Option key={d.NODE_ID} value={d.NODE_ID}>
                        {d.NAME_KOR}
                      </Option>
                    ))}
                </Select>
              );
            }
            if (viewType === 'VIEW') {
              const nodeIndex = resultDept.findIndex(d => d.NODE_ID === record.DEPT_CD);
              if (nodeIndex > -1) {
                return <span>{resultDept[nodeIndex].NAME_KOR}</span>;
              }
              return <span></span>;
            }
          },
        },
        {
          title: () => (this.props && this.props.viewType === 'INPUT' ? '파일첨부' : '첨부파일'),
          dataIndex: 'FILE_SEQ',
          align: 'center',
          width: '15%',
          render: (text, record) => (
            <Upload
              key={`sqResultCond_${record.SEQ}`}
              readOnly={this.props.viewType === 'VIEW'}
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
      ],
    };
    this.debounceHandelSetTable = debounce(this.debounceHandelSetTable, 300);
    this.debounceHandelOnChange = debounce(this.debounceHandelOnChange, 300);
  }

  componentDidMount() {
    const { id, formData, getExtraApiData } = this.props;
    const taskSeq = (formData && formData.TASK_SEQ) || 0;
    const apiArray = [
      {
        key: 'resultCategories',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 2127 } },
      },
      {
        key: 'resultDept',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 648 } },
      },
    ];
    if (taskSeq) {
      apiArray.push({
        key: `resultCondList`,
        type: 'GET',
        url: `/api/eshs/v1/common/eshsGetCondList/${taskSeq}/3`,
      });
    }
    getExtraApiData(id, apiArray, this.appStart);
  }

  appStart = () => {
    const { id, extraApiData, setFormData, formData, viewType, initForm } = this.props;
    const { deptCodeList } = this.state;

    const categories = (extraApiData && extraApiData.resultCategories && extraApiData.resultCategories.categoryMapList) || [];
    const depts = (extraApiData && extraApiData.resultDept && extraApiData.resultDept.categoryMapList) || [];
    const resultCondList = (extraApiData && extraApiData.resultCondList && extraApiData.resultCondList.list) || [];
    this.setState({
      resultCategories: categories.filter(c => c.LVL === 3 && c.USE_YN === 'Y'),
      resultDept: depts.filter(d => deptCodeList.indexOf(d.CODE) > -1 && d.USE_YN === 'Y'),
    });
    setFormData(id, {
      ...formData,
      resultCondList,
      resultCondViewType: viewType,
    });
    if (initForm && !resultCondList.length && viewType === 'INPUT') {
      return this.handlePlusTd();
    }
    this.debounceHandelSetTable();
  };

  handlePlusTd = () => {
    const { id, formData, changeFormData } = this.props;
    const { initResult } = this.state;
    const resultCondList = (formData && formData.resultCondList) || [];
    let index = resultCondList.length + 1;
    const initResultList = [
      { ...initResult, SEQ: index++ },
      { ...initResult, SEQ: index++ },
      { ...initResult, SEQ: index++ },
    ];
    changeFormData(id, 'resultCondList', resultCondList.concat(initResultList));
    this.debounceHandelSetTable();
  };

  debounceHandelSetTable = () => {
    const { formData, id } = this.props;
    const { columns, defaultCurrent } = this.state;
    const resultCondList = (formData && formData.resultCondList) || [];
    return this.setState({
      resultCondTable: [
        <AntdLineTable
          key={`${id}_resultCond`}
          className="tableWrapper"
          rowKey={resultCondList && resultCondList.INDEX}
          columns={columns}
          dataSource={resultCondList || []}
          bordered
          pagination={{
            hideOnSinglePage: false,
            defaultCurrent,
            pageSize: 6,
            onChange: page => this.setState({ defaultCurrent: page, resultCondTable: [] }, this.debounceHandelSetTable),
          }}
          footer={() => <span>{`${resultCondList.length} 건`}</span>}
        />,
      ],
    });
  };

  debounceHandelOnChange = (target, value, record) => {
    const { id, changeFormData, formData } = this.props;
    const resultCondList = (formData && formData.resultCondList) || [];

    changeFormData(
      id,
      'resultCondList',
      resultCondList.map(a => (a.SEQ === record.SEQ ? { ...a, [target]: value } : a)),
    );
  };

  saveTempContents = (newFiles, rowSeq) => {
    const { id, formData, setFormData } = this.props;
    const condFileList = (formData && formData.condFileList) || [];
    const resultCondList = (formData && formData.resultCondList) || [];
    if (newFiles.length) {
      setFormData(id, {
        ...formData,
        resultCondList: resultCondList.map(a =>
          a.SEQ === rowSeq ? { ...a, FILE_NM: newFiles[0].fileName, FILE_SEQ: newFiles[0].seq, FILE_TYPE: 'TEMP', DOWN: newFiles[0].down } : a,
        ),
        condFileList: condFileList.filter(f => f.rowSeq !== rowSeq).concat({ ...newFiles[0], rowSeq }),
      });
    }
  };

  handleFileRemove = (file, record) => {
    const { id, changeFormData, formData } = this.props;
    const condFileList = (formData && formData.condFileList) || [];
    const resultCondList = (formData && formData.resultCondList) || [];
    if (condFileList.findIndex(c => c.seq === file.seq) < 0) {
      changeFormData(
        id,
        'resultCondList',
        resultCondList.map(a => (a.SEQ === record.SEQ ? { ...a, FILE_SEQ: null } : a)),
      );
      return this.debounceHandelSetTable();
    }
    return changeFormData(
      id,
      'condFileList',
      condFileList.filter(f => f.seq !== file.seq),
    );
  };

  render() {
    const { resultCondTable } = this.state;
    const { condTitle, btnPlusTd } = this.props;
    return (
      <>
        <span>
          {condTitle || ''}{' '}
          {btnPlusTd && (
            <StyledButton className="btn-primary btn-sm" onClick={this.handlePlusTd}>
              [+3]
            </StyledButton>
          )}
        </span>
        {resultCondTable}
      </>
    );
  }
}

ResultCond.propTypes = {
  formData: PropTypes.object,
  id: PropTypes.string,
  changeFormData: PropTypes.func,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  setFormData: PropTypes.func,
  viewType: PropTypes.string,
  condTitle: PropTypes.string,
  btnPlusTd: PropTypes.bool,
  initForm: PropTypes.bool,
};

ResultCond.defaultProps = {
  formData: {},
  changeFormData: () => {},
  getExtraApiData: () => {},
  extraApiData: {},
  setFormData: () => {},
  viewType: 'INPUT',
  condTitle: '',
  btnPlusTd: false,
  initForm: true,
};

export default ResultCond;
