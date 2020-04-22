import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import Upload from 'components/FormStuff/Upload';

import { Checkbox, Table } from 'antd';

const AntdLineTable = StyledLineTable(Table);

class ConfirmCond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmCondTable: [],
      defaultCurrent: 1,
      initConfirm: {
        REQ_CD: this.props && this.props.formData && this.props.formData.REQ_CD,
        TASK_SEQ: this.props && this.props.formData && this.props.formData.TASK_SEQ,
        CATEGORY_CD: 2128,
        DEPT_CD: 2118,
        QUAL_COMMENT: '',
        FILE_TYPE: 'TEMP',
        STEP: '3',
      },
      deptCodeList: ['MN3Q', 'MN3R', 'MN3T', 'MN3S', 'MN1B', '23754', 'ZZZZ', 'ZZZ1', 'ZZ'],
      confirmCategories: [],
      confirmDept: [],
      columns: [
        {
          title: '개선결과확인',
          dataIndex: 'QUAL_COMMENT',
          align: 'center',
          width: () => (this.props && this.props.viewType === 'INPUT' ? '25%' : '30%'),
          render: (text, record) => <span>{record.QUAL_COMMENT}</span>,
        },
        {
          title: 'Categories',
          dataIndex: 'CATEGORY_CD',
          align: 'center',
          width: '10%',
          render: (text, record) => {
            const { viewType } = this.props;
            const confirmCategories = this.state.confirmCategories || [];
            const nodeIndex = confirmCategories.findIndex(a => a.NODE_ID === record.CATEGORY_CD);
            if (nodeIndex > -1) {
              return <span>{confirmCategories[nodeIndex].NAME_KOR}</span>;
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
            const { viewType } = this.props;
            const confirmDept = this.state.confirmDept || [];
            const nodeIndex = confirmDept.findIndex(d => d.NODE_ID === record.DEPT_CD);
            if (nodeIndex > -1) {
              return <span>{confirmDept[nodeIndex].NAME_KOR}</span>;
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
        {
          title: '확인',
          align: 'center',
          width: () => (this.props && this.props.viewType === 'INPUT' ? '5%' : '0%'),
          render: (text, record) => (
            <Checkbox className="ant-checkbox-wrapper" defaultChecked={!!record.QUAL_EMPID} onChange={() => this.handleConfirmChecked(record.SEQ)} />
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
        key: 'confirmCategories',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 2127 } },
      },
      {
        key: 'confirmDept',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 648 } },
      },
    ];
    if (taskSeq) {
      apiArray.push({
        key: `confirmCondList`,
        type: 'GET',
        url: `/api/eshs/v1/common/eshsGetCondList/${taskSeq}/3`,
      });
    }
    getExtraApiData(id, apiArray, this.appStart);
  }

  appStart = () => {
    const { id, extraApiData, setFormData, formData, viewType, initForm } = this.props;
    const { deptCodeList } = this.state;

    const categories = (extraApiData && extraApiData.confirmCategories && extraApiData.confirmCategories.categoryMapList) || [];
    const depts = (extraApiData && extraApiData.confirmDept && extraApiData.confirmDept.categoryMapList) || [];
    const confirmCondList = (extraApiData && extraApiData.confirmCondList && extraApiData.confirmCondList.list) || [];
    this.setState({
      confirmCategories: categories.filter(c => c.LVL === 3 && c.USE_YN === 'Y'),
      confirmDept: depts.filter(d => deptCodeList.indexOf(d.CODE) > -1 && d.USE_YN === 'Y'),
    });
    setFormData(id, { ...formData, confirmCondList, confirmCondViewType: viewType, isAllConfirm: !!confirmCondList.filter(r => !!r.QUAL_EMPID).length });
    console.debug('isAllConfirm', !!confirmCondList.filter(r => !!r.QUAL_EMPID).length);

    if (initForm && !confirmCondList.length && viewType === 'INPUT') {
      return this.handlePlusTd();
    }
    this.debounceHandelSetTable();
  };

  handlePlusTd = () => {
    const { id, formData, changeFormData } = this.props;
    const { initConfirm } = this.state;
    const confirmCondList = (formData && formData.confirmCondList) || [];
    let index = confirmCondList.length + 1;
    const initConfirmList = [
      { ...initConfirm, SEQ: index++ },
      { ...initConfirm, SEQ: index++ },
      { ...initConfirm, SEQ: index++ },
    ];
    changeFormData(id, 'confirmCondList', confirmCondList.concat(initConfirmList));
    this.debounceHandelSetTable();
  };

  debounceHandelSetTable = () => {
    const { formData, id } = this.props;
    const { columns, defaultCurrent } = this.state;
    const confirmCondList = (formData && formData.confirmCondList) || [];
    return this.setState({
      confirmCondTable: [
        <AntdLineTable
          key={`${id}_confirmCond`}
          className="tableWrapper"
          rowKey={confirmCondList && confirmCondList.INDEX}
          columns={columns}
          dataSource={confirmCondList || []}
          bordered
          pagination={{
            hideOnSinglePage: false,
            defaultCurrent,
            pageSize: 6,
            onChange: page => this.setState({ defaultCurrent: page, confirmCondTable: [] }, this.debounceHandelSetTable),
          }}
          footer={() => <span>{`${confirmCondList.length} 건`}</span>}
        />,
      ],
    });
  };

  debounceHandelOnChange = (target, value, record) => {
    const { id, changeFormData, formData } = this.props;
    const confirmCondList = (formData && formData.confirmCondList) || [];

    changeFormData(
      id,
      'confirmCondList',
      confirmCondList.map(a => (a.SEQ === record.SEQ ? { ...a, [target]: value } : a)),
    );
  };

  handleConfirmChecked = key => {
    const {
      id,
      changeFormData,
      formData,
      profile: { USER_ID, EMP_NO, NAME_KOR },
    } = this.props;

    const confirmCondList = (formData && formData.confirmCondList) || [];
    changeFormData(
      id,
      'confirmCondList',
      confirmCondList.map(c => (c.SEQ === key ? { ...c, QUAL_EMPNO: EMP_NO, QUAL_EMPID: c.QUAL_EMPID ? '' : USER_ID } : c)),
    );
  };

  render() {
    const { confirmCondTable } = this.state;
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
        {confirmCondTable}
      </>
    );
  }
}

ConfirmCond.propTypes = {
  formData: PropTypes.object,
  id: PropTypes.string,
  changeFormData: PropTypes.func,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  setFormData: PropTypes.func,
  viewType: PropTypes.string,
  condTitle: PropTypes.string,
  btnPlusTd: PropTypes.bool,
  profile: PropTypes.object,
  initForm: PropTypes.bool,
};

ConfirmCond.defaultProps = {
  formData: {},
  changeFormData: () => {},
  getExtraApiData: () => {},
  extraApiData: {},
  setFormData: () => {},
  viewType: 'INPUT',
  condTitle: '',
  btnPlusTd: false,
  profile: {},
  initForm: true,
};

export default ConfirmCond;
