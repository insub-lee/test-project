import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import { Input, Select, Table } from 'antd';

const { Option } = Select;
const AntdLineTable = StyledLineTable(Table);

class ImproveCond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      improveCondTable: [],
      defaultCurrent: 1,
      initImprove: {
        REQ_CD: this.props && this.props.formData && this.props.formData.REQ_CD,
        TASK_SEQ: this.props && this.props.formData && this.props.formData.TASK_SEQ,
        CATEGORY_CD: 2128,
        DEPT_CD: 2118,
        QUAL_COMMENT: '',
        FILE_TYPE: 'TEMP',
        STEP: '2',
      },
      deptCodeList: ['MN3Q', 'MN3R', 'MN3T', 'MN3S', 'MN1B', '23754', 'ZZZZ', 'ZZZ1', 'ZZ'],
      improveCategories: [],
      improveDept: [],
      columns: [
        {
          title: '개선계획',
          dataIndex: 'QUAL_COMMENT',
          align: 'center',
          width: '50%',
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
          width: '25%',
          render: (text, record) => {
            const { viewType } = this.props;
            const improveCategories = this.state.improveCategories || [];
            if (viewType === 'INPUT') {
              return (
                <Select defaultValue={record.CATEGORY_CD || ''} style={{ width: '100%' }} onChange={e => this.debounceHandelOnChange('CATEGORY_CD', e, record)}>
                  {improveCategories &&
                    improveCategories.map(c => (
                      <Option key={c.NODE_ID} value={c.NODE_ID}>
                        {c.NAME_KOR}
                      </Option>
                    ))}
                </Select>
              );
            }
            if (viewType === 'VIEW') {
              const nodeIndex = improveCategories.findIndex(a => a.NODE_ID === record.CATEGORY_CD);
              if (nodeIndex > -1) {
                return <span>{improveCategories[nodeIndex].NAME_KOR}</span>;
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
            const { viewType } = this.props;
            const improveDept = this.state.improveDept || [];
            if (viewType === 'INPUT') {
              return (
                <Select defaultValue={record.DEPT_CD || ''} style={{ width: '100%' }} onChange={e => this.debounceHandelOnChange('DEPT_CD', e, record)}>
                  {improveDept &&
                    improveDept.map(d => (
                      <Option key={d.NODE_ID} value={d.NODE_ID}>
                        {d.NAME_KOR}
                      </Option>
                    ))}
                </Select>
              );
            }
            if (viewType === 'VIEW') {
              const nodeIndex = improveDept.findIndex(d => d.NODE_ID === record.DEPT_CD);
              if (nodeIndex > -1) {
                return <span>{improveDept[nodeIndex].NAME_KOR}</span>;
              }
              return <span></span>;
            }
          },
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
        key: 'improveCategories',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 2127 } },
      },
      {
        key: 'improveDept',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 648 } },
      },
    ];
    if (taskSeq) {
      apiArray.push({
        key: `improveCondList`,
        type: 'GET',
        url: `/api/eshs/v1/common/eshsGetCondList/${taskSeq}/2`,
      });
    }
    getExtraApiData(id, apiArray, this.appStart);
  }

  appStart = () => {
    const { id, extraApiData, setFormData, formData, viewType, initForm } = this.props;
    const { deptCodeList } = this.state;

    const categories = (extraApiData && extraApiData.improveCategories && extraApiData.improveCategories.categoryMapList) || [];
    const depts = (extraApiData && extraApiData.improveDept && extraApiData.improveDept.categoryMapList) || [];
    const improveCondList = (extraApiData && extraApiData.improveCondList && extraApiData.improveCondList.list) || [];
    this.setState({
      improveCategories: categories.filter(c => c.LVL === 3 && c.USE_YN === 'Y'),
      improveDept: depts.filter(d => deptCodeList.indexOf(d.CODE) > -1 && d.USE_YN === 'Y'),
    });
    setFormData(id, { ...formData, improveCondList, improveCondViewType: viewType });

    if (initForm && !improveCondList.length && viewType === 'INPUT') {
      return this.handlePlusTd();
    }
    this.debounceHandelSetTable();
  };

  handlePlusTd = () => {
    const { id, formData, changeFormData } = this.props;
    const { initImprove } = this.state;
    const improveCondList = (formData && formData.improveCondList) || [];
    let index = improveCondList.length + 1;
    const initImproveList = [
      { ...initImprove, SEQ: index++ },
      { ...initImprove, SEQ: index++ },
      { ...initImprove, SEQ: index++ },
    ];
    changeFormData(id, 'improveCondList', improveCondList.concat(initImproveList));
    this.debounceHandelSetTable();
  };

  debounceHandelSetTable = () => {
    const { formData, id } = this.props;
    const { columns, defaultCurrent } = this.state;
    const improveCondList = (formData && formData.improveCondList) || [];
    return this.setState({
      improveCondTable: [
        <AntdLineTable
          key={`${id}_improveCond`}
          className="tableWrapper"
          rowKey={improveCondList && improveCondList.INDEX}
          columns={columns}
          dataSource={improveCondList || []}
          bordered
          pagination={{
            hideOnSinglePage: false,
            defaultCurrent,
            pageSize: 6,
            onChange: page => this.setState({ defaultCurrent: page, improveCondTable: [] }, this.debounceHandelSetTable),
          }}
          footer={() => <span>{`${improveCondList.length} 건`}</span>}
        />,
      ],
    });
  };

  debounceHandelOnChange = (target, value, record) => {
    const { id, changeFormData, formData } = this.props;
    const improveCondList = (formData && formData.improveCondList) || [];

    changeFormData(
      id,
      'improveCondList',
      improveCondList.map(a => (a.SEQ === record.SEQ ? { ...a, [target]: value } : a)),
    );
  };

  render() {
    const { improveCondTable } = this.state;
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
        {improveCondTable}
      </>
    );
  }
}

ImproveCond.propTypes = {
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

ImproveCond.defaultProps = {
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

export default ImproveCond;
