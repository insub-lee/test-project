import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
// import Upload from 'components/FormStuff/Upload/FileUploader';
import Upload from 'components/FormStuff/Upload';

import { Input, Select, Table, Button, message } from 'antd';
import axios from 'axios';

const { Option } = Select;
const AntdLineTable = StyledLineTable(Table);

class ApproveCond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approveCondTable: [],
      defaultCurrent: 1,
      initApprove: {
        REQ_CD: this.props && this.props.formData && this.props.formData.REQ_CD,
        TASK_SEQ: this.props && this.props.formData && this.props.formData.TASK_SEQ,
        CATEGORY_CD: 2128,
        DEPT_CD: 2118,
        QUAL_COMMENT: '',
        FILE_TYPE: 'TEMP',
      },
      deptCodeList: ['MN3Q', 'MN3R', 'MN3T', 'MN3S', 'MN1B', '23754', 'ZZZZ', 'ZZZ1', 'ZZ'],
      approveCategories: [],
      approveDept: [],
      columns: [
        {
          title: '승인조건',
          dataIndex: 'QUAL_COMMENT',
          align: 'center',
          width: '45%',
          render: (text, record) => (
            <Input
              className="ant-input-inline ant-input-sm input-left"
              defaultValue={record.QUAL_COMMENT || ''}
              onChange={e => this.debounceHandelOnChange('QUAL_COMMENT', e.target.value, record)}
            />
          ),
        },
        {
          title: 'Categories',
          dataIndex: 'CATEGORY_CD',
          align: 'center',
          width: '20%',
          render: (text, record) => (
            <Select defaultValue={record.CATEGORY_CD || ''} style={{ width: '100%' }} onChange={e => this.debounceHandelOnChange('CATEGORY_CD', e, record)}>
              {this.state &&
                this.state.approveCategories &&
                this.state.approveCategories.map(c => (
                  <Option key={c.NODE_ID} value={c.NODE_ID}>
                    {c.NAME_KOR}
                  </Option>
                ))}
            </Select>
          ),
        },
        {
          title: '담당부서',
          dataIndex: 'DEPT_CD',
          align: 'center',
          width: '20%',
          render: (text, record) => (
            <Select defaultValue={record.DEPT_CD || ''} style={{ width: '100%' }} onChange={e => this.debounceHandelOnChange('DEPT_CD', e, record)}>
              {this.state &&
                this.state.approveDept &&
                this.state.approveDept.map(d => (
                  <Option key={d.NODE_ID} value={d.NODE_ID}>
                    {d.NAME_KOR}
                  </Option>
                ))}
            </Select>
          ),
        },
        {
          title: '파일 첨부',
          dataIndex: 'FILE_SEQ',
          align: 'center',
          width: '15%',
          render: (text, record) => (
            <Upload
              key={`sqConfirmResult_${record.SEQ}`}
              readOnly={false}
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
        key: 'approveCategories',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 2127 } },
      },
      {
        key: 'approveDept',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 648 } },
      },
    ];
    if (taskSeq) {
      apiArray.push({
        key: 'approveCondList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsGetCondList/${taskSeq}`,
      });
    }
    getExtraApiData(id, apiArray, this.appStart);
  }

  appStart = () => {
    const { id, extraApiData, changeFormData } = this.props;
    const { deptCodeList } = this.state;

    const categories = (extraApiData && extraApiData.approveCategories && extraApiData.approveCategories.categoryMapList) || [];
    const depts = (extraApiData && extraApiData.approveDept && extraApiData.approveDept.categoryMapList) || [];
    const approveCondList = (extraApiData && extraApiData.approveCondList && extraApiData.approveCondList.list) || [];
    this.setState({
      approveCategories: categories.filter(c => c.LVL === 3 && c.USE_YN === 'Y'),
      approveDept: depts.filter(d => deptCodeList.indexOf(d.CODE) > -1 && d.USE_YN === 'Y'),
      approveCondList,
    });
    changeFormData(id, 'approveCondList', approveCondList);

    if (!approveCondList.length) {
      return this.handlePlusTd();
    }
    this.debounceHandelSetTable();
  };

  handlePlusTd = () => {
    const { id, formData, changeFormData } = this.props;
    const { initApprove } = this.state;
    const approveCondList = (formData && formData.approveCondList) || [];
    let index = approveCondList.length + 1;
    const initApproveList = [
      { ...initApprove, SEQ: index++ },
      { ...initApprove, SEQ: index++ },
      { ...initApprove, SEQ: index++ },
    ];
    changeFormData(id, 'approveCondList', approveCondList.concat(initApproveList));
    this.debounceHandelSetTable();
  };

  debounceHandelSetTable = () => {
    const { formData, id } = this.props;
    const { columns, defaultCurrent } = this.state;
    const approveCondList = (formData && formData.approveCondList) || [];
    return this.setState({
      approveCondTable: [
        <AntdLineTable
          key={`${id}_approveCond`}
          className="tableWrapper"
          rowKey={approveCondList && approveCondList.INDEX}
          columns={columns}
          dataSource={approveCondList || []}
          bordered
          pagination={{
            hideOnSinglePage: false,
            defaultCurrent,
            pageSize: 6,
            onChange: page => this.setState({ defaultCurrent: page, approveCondTable: [] }, this.debounceHandelSetTable),
          }}
          footer={() => <span>{`${approveCondList.length} 건`}</span>}
        />,
      ],
    });
  };

  debounceHandelOnChange = (target, value, record) => {
    const { id, changeFormData, formData } = this.props;
    const approveCondList = (formData && formData.approveCondList) || [];

    changeFormData(
      id,
      'approveCondList',
      approveCondList.map(a => (a.SEQ === record.SEQ ? { ...a, [target]: value } : a)),
    );
  };

  // handleFileDown = (e, fileSeq, type) => {
  //   e.stopPropagation();
  //   if (type === 'REAL') {
  //     window.location.href = `/down/file/${Number(fileSeq)}`;
  //   } else if (type === 'TEMP') {
  //     window.location.href = `/down/tempfile/${Number(fileSeq)}`;
  //   }
  // };

  saveTempContents = (newFiles, rowSeq) => {
    const { id, formData, setFormData } = this.props;
    const condFileList = (formData && formData.condFileList) || [];
    const approveCondList = (formData && formData.approveCondList) || [];
    if (newFiles.length) {
      setFormData(id, {
        ...formData,
        approveCondList: approveCondList.map(a =>
          a.SEQ === rowSeq ? { ...a, FILE_NM: newFiles[0].fileName, FILE_SEQ: newFiles[0].seq, FILE_TYPE: 'TEMP', DOWN: newFiles[0].down } : a,
        ),
        condFileList: condFileList.filter(f => f.rowSeq !== rowSeq).concat({ ...newFiles[0], rowSeq }),
      });
    }
  };

  handleFileRemove = (file, record) => {
    const { id, changeFormData, formData } = this.props;
    const condFileList = (formData && formData.condFileList) || [];
    const approveCondList = (formData && formData.approveCondList) || [];
    if (condFileList.findIndex(c => c.seq === file.seq) < 0) {
      changeFormData(
        id,
        'approveCondList',
        approveCondList.map(a => (a.SEQ === record.SEQ ? { ...a, FILE_SEQ: null } : a)),
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
    const { approveCondTable } = this.state;
    return (
      <>
        <span>
          안전확인결과내용 <Button onClick={this.handlePlusTd}>[+3]</Button>
        </span>
        {approveCondTable}
      </>
    );
  }
}

ApproveCond.propTypes = {
  formData: PropTypes.object,
  id: PropTypes.string,
  changeFormData: PropTypes.func,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  setFormData: PropTypes.func,
};

ApproveCond.defaultProps = {
  formData: {},
  changeFormData: () => {},
  getExtraApiData: () => {},
  extraApiData: {},
  setFormData: () => {},
};

export default ApproveCond;
