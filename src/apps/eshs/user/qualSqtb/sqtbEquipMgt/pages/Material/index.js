import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { Button, Select, Input, Table, Checkbox } from 'antd';
import UnitComp from 'components/BizBuilder/Field/UnitComp';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const { Option } = Select;
const AntdTable = StyledAntdTable(Table);

class Material extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materialTable: [],
      initMaterialRow: {
        IS_INPUT: '1',
        PIPE_TYPE: '',
        PIPE_NO: '',
        QUANTITY: '',
        QUANTITY_UNIT: '',
        DENSITY: '',
        DENSITY_UNIT: '',
        DI: '',
        DI_UNIT: '',
      },
      columns: [
        {
          title: '삭제',
          dataIndex: '',
          align: 'center',
          width: 50,
          render: (text, record) => <Checkbox key={record.INDEX}></Checkbox>,
        },
        {
          title: '구분',
          dataIndex: 'IS_INPUT',
          align: 'center',
          width: 90,
          render: (text, record) => {
            if (this.props.viewPageData.viewType !== 'VIEW') {
              return (
                <>
                  <Select
                    key={record.INDEX}
                    defaultValue={record.IS_INPUT}
                    style={{ width: 70 }}
                    onChange={value => this.handleSelectOnChange(value, 'IS_INPUT', record.INDEX)}
                  >
                    <Option value="1">IN</Option>
                    <Option value="0">OUT</Option>
                  </Select>
                </>
              );
            }
            return <span>{record.IS_INPUT === '1' ? 'IN' : 'OUT'}</span>;
          },
        },
        {
          title: 'Bath명/Size',
          dataIndex: '',
          align: 'center',
          width: 240,
          render: (text, record) => {
            if (this.props.viewPageData.viewType !== 'VIEW') {
              return (
                <span key={record.INDEX}>
                  <Input name="BATH_NM" defaultValue={record.BATH_NM} onChange={e => this.handleInputOnChange(e, record.INDEX)} />
                  <Input name="BATH_SIZE" defaultValue={record.BATH_SIZE} onChange={e => this.handleInputOnChange(e, record.INDEX)} /> ℓ
                </span>
              );
            }
            return <span>{`${record.BATH_NM || ''}/${record.BATH_SIZE || ''}ℓ`}</span>;
          },
        },
        {
          title: 'Material',
          dataIndex: '',
          align: 'center',
          width: 150,
          render: (text, record) => <span key={record.INDEX}>..Material작업후 수정</span>,
        },
        {
          title: 'Material명',
          dataIndex: '',
          align: 'center',
          width: 400,
          render: (text, record) => <span key={record.INDEX}>..Material작업후 수정</span>,
        },
        {
          title: 'Material종류',
          dataIndex: '',
          align: 'center',
          width: 100,
          render: (text, record) => <span key={record.INDEX}>..Material작업후 수정</span>,
        },
        {
          title: '폐수종류',
          dataIndex: '',
          align: 'center',
          width: 110,
          render: (text, record) => <span key={record.INDEX}>..Material작업후 수정</span>,
        },
        {
          title: '회수종류',
          dataIndex: '',
          align: 'center',
          width: 110,
          render: (text, record) => <span key={record.INDEX}>..Material작업후 수정</span>,
        },
        {
          title: '배관재질/No/Size',
          dataIndex: '',
          align: 'center',
          width: 250,
          render: (text, record) => {
            if (this.props.viewPageData.viewType !== 'VIEW') {
              return (
                <span key={record.INDEX}>
                  <Select key={record.INDEX} defaultValue={record.PIPE_TYPE} style={{ width: 90 }}></Select>
                  <Input name="PIPE_NO" defaultValue={record.PIPE_NO} onChange={e => this.handleInputOnChange(e, record.INDEX)} />
                  <Input name="PIPE_SIZE" defaultValue={record.PIPE_SIZE} onChange={e => this.handleInputOnChange(e, record.INDEX)} /> mm
                </span>
              );
            }
            return <span>{`${record.PIPE_TYPE_NM || ''}/${record.PIPE_NO || ''}/${record.PIPE_SIZE || ''}mm`}</span>;
          },
        },
        {
          title: '사용량/단위',
          dataIndex: '',
          align: 'center',
          width: 300,
          render: (text, record) => {
            if (this.props.viewPageData.viewType !== 'VIEW') {
              return (
                <span key={record.INDEX}>
                  <Input name="QUANTITY" defaultValue={record.QUANTITY} onChange={e => this.handleInputOnChange(e, record.INDEX)} />
                  <UnitComp
                    colData={record.QUANTITY_UNIT}
                    sagaKey={{ id: record.INDEX }}
                    COMP_FIELD="QUANTITY_UNIT"
                    changeFormData={(key, COMP_FIELD, value) => this.handleUnitComp(key, COMP_FIELD, value)}
                  />
                </span>
              );
            }
            return <span>{`${record.QUANTITY || ''} ${record.QUANTITY_UNIT || ''}`}</span>;
          },
        },
        {
          title: '농도/단위',
          dataIndex: '',
          align: 'center',
          width: 300,
          render: (text, record) => {
            if (this.props.viewPageData.viewType !== 'VIEW') {
              return (
                <span key={record.INDEX}>
                  <Input name="DENSITY" defaultValue={record.DENSITY} onChange={e => this.handleInputOnChange(e, record.INDEX)} />
                  <UnitComp
                    colData={record.DENSITY_UNIT}
                    sagaKey={{ id: record.INDEX }}
                    COMP_FIELD="DENSITY_UNIT"
                    changeFormData={(key, COMP_FIELD, value) => this.handleUnitComp(key, COMP_FIELD, value)}
                  />
                </span>
              );
            }
            return <span>{`${record.DENSITY || ''} ${record.DENSITY_UNIT || ''}`}</span>;
          },
        },
        {
          title: 'Di사용량/단위',
          dataIndex: '',
          align: 'center',
          width: 300,
          render: (text, record) => {
            if (this.props.viewPageData.viewType !== 'VIEW') {
              return (
                <span key={record.INDEX}>
                  <Input name="DI" defaultValue={record.DI} onChange={e => this.handleInputOnChange(e, record.INDEX)} />
                  <UnitComp
                    colData={record.DI_UNIT}
                    sagaKey={{ id: record.INDEX }}
                    COMP_FIELD="DI_UNIT"
                    changeFormData={(key, COMP_FIELD, value) => this.handleUnitComp(key, COMP_FIELD, value)}
                  />
                </span>
              );
            }
            return <span>{`${record.DI || ''} ${record.DI_UNIT || ''}`}</span>;
          },
        },
        {
          title: '회수율',
          dataIndex: '',
          align: 'center',
          width: 100,
          render: (text, record) => {
            if (this.props.viewPageData.viewType !== 'VIEW') {
              return (
                <span key={record.INDEX}>
                  <Input name="RECYCLE_RT" defaultValue={record.RECYCLE_RT} onChange={e => this.handleInputOnChange(e, record.INDEX)} /> %
                </span>
              );
            }
            return <span>{`${record.RECYCLE_RT || ''}%`}</span>;
          },
        },
        {
          title: '집결지-탱크/저장소/명',
          dataIndex: '',
          align: 'center',
          width: 250,
          render: (text, record) => {
            if (this.props.viewPageData.viewType !== 'VIEW') {
              return (
                <span key={record.INDEX}>
                  <Input name="STORAGETANK_CD" defaultValue={record.STORAGETANK_CD} onChange={e => this.handleInputOnChange(e, record.INDEX)} />
                  <Input name="STORAGEHOUSE_CD" defaultValue={record.STORAGEHOUSE_CD} onChange={e => this.handleInputOnChange(e, record.INDEX)} />
                  <Input name="STORAGEPLACE_NM" defaultValue={record.STORAGEPLACE_NM} onChange={e => this.handleInputOnChange(e, record.INDEX)} />
                </span>
              );
            }
            return <span>{`${record.STORAGETANK_CD || ''}/${record.STORAGEHOUSE_CD || ''}/${record.STORAGEPLACE_NM || ''}`}</span>;
          },
        },
      ],
    };
    this.debounceHandleInputChange = debounce(this.debounceHandleInputChange, 300);
    this.debounceHandleSelectOnChange = debounce(this.debounceHandleSelectOnChange, 300);
    this.debouncehandleSetMaterialTable = debounce(this.debouncehandleSetMaterialTable, 300);
  }

  componentDidMount() {
    const { id, formData, apiArray, getExtraApiData, viewPageData } = this.props;
    const taskSeq = (viewPageData && viewPageData.taskSeq) || 0;
    if (taskSeq > 0) {
      getExtraApiData(
        id,
        apiArray.concat({
          key: 'mtrlList',
          type: 'GET',
          url: `/api/eshs/v1/common/eshsGetMtrlList/${taskSeq}`,
        }),
        this.handleStart,
      );
    } else {
      getExtraApiData(id, apiArray, this.handleStart);
    }
  }

  handleStart = () => {
    const { extraApiData, formData, changeFormData, id } = this.props;
    const { columns, initMaterialRow } = this.state;

    const pipeType = (extraApiData && extraApiData.pipe_type && extraApiData.pipe_type.categoryMapList) || [];
    const newColumn = {
      title: '배관재질/No/Size',
      dataIndex: '',
      align: 'center',
      width: 250,
      render: (text, record) => {
        if (this.props.viewPageData.viewType !== 'VIEW') {
          return (
            <span key={record.INDEX}>
              <Select
                key={record.INDEX}
                defaultValue={record.PIPE_TYPE || String(556)}
                onChange={value => this.handleSelectOnChange(value, 'PIPE_TYPE', record.INDEX)}
                style={{ width: 90 }}
              >
                {pipeType
                  .filter(p => p.LVL > 0 && p.USE_YN === 'Y')
                  .map(item => (
                    <Option key={String(item.NODE_ID)} value={String(item.NODE_ID)}>
                      {item.NAME_KOR}
                    </Option>
                  ))}
              </Select>
              <Input name="PIPE_NO" defaultValue={record.PIPE_NO} onChange={e => this.handleInputOnChange(e, record.INDEX)} />
              <Input name="PIPE_SIZE" defaultValue={record.PIPE_SIZE} onChange={e => this.handleInputOnChange(e, record.INDEX)} /> mm
            </span>
          );
        }
        return <span>{`${record.PIPE_TYPE_NM || ''}/${record.PIPE_NO || ''}/${record.PIPE_SIZE || ''}mm`}</span>;
      },
    };

    const mtrlList = (extraApiData && extraApiData.mtrlList && extraApiData.mtrlList.list) || [];
    if (mtrlList.length) {
      changeFormData(
        id,
        'materialList',
        mtrlList.map((m, index) => true && { ...m, INDEX: index }),
      );
    } else {
      const materialList = [];

      materialList.push({ ...initMaterialRow, INDEX: 0 });
      materialList.push({ ...initMaterialRow, INDEX: 1 });
      materialList.push({ ...initMaterialRow, INDEX: 2 });
      changeFormData(id, 'materialList', materialList);
    }

    this.setState({ columns: columns.map(c => (c.title === '배관재질/No/Size' ? newColumn : c)) });
    this.debouncehandleSetMaterialTable();
  };

  handleUnitComp = (key, comp, value) => {
    const { formData, changeFormData, id } = this.props;
    const materialList = (formData && formData.materialList) || [];
    changeFormData(
      id,
      'materialList',
      materialList.map((m, index) => (index === key.id ? { ...m, [comp]: value } : m)),
    );
    this.debouncehandleSetMaterialTable();
  };

  handlePlusTd = () => {
    const { id, changeFormData, formData } = this.props;
    const { initMaterialRow } = this.state;

    const materialList = (formData && formData.materialList) || [];
    let index = materialList.length || 0;
    const initMaterial = [
      { ...initMaterialRow, INDEX: index++ },
      { ...initMaterialRow, INDEX: index++ },
      { ...initMaterialRow, INDEX: index++ },
    ];
    changeFormData(id, 'materialList', materialList.concat(initMaterial));
    this.debouncehandleSetMaterialTable();
  };

  debouncehandleSetMaterialTable = () => {
    const { formData } = this.props;
    const { columns } = this.state;
    const materialList = (formData && formData.materialList) || [];
    return this.setState({
      materialTable: [
        <AntdTable
          rowKey={materialList && materialList.INDEX}
          columns={columns}
          dataSource={materialList || []}
          bordered
          pagination={{ pageSize: 100 }}
          scroll={{ x: 1500, y: 200 }}
          pagination={false}
        />,
      ],
    });
  };

  handleInputOnChange = (e, rowIndex) => {
    e.persist();
    this.debounceHandleInputChange(e, rowIndex);
  };

  debounceHandleInputChange = (e, rowIndex) => {
    const { id, changeFormData, formData } = this.props;
    const materialList = (formData && formData.materialList) || [];
    const { name, value } = e.target;

    changeFormData(
      id,
      'materialList',
      materialList.map(m => (m.INDEX === rowIndex ? { ...m, [name]: value } : m)),
    );
  };

  handleSelectOnChange = (value, name, rowIndex) => {
    this.debounceHandleSelectOnChange(value, name, rowIndex);
  };

  debounceHandleSelectOnChange = (value, name, rowIndex) => {
    const { id, changeFormData, formData } = this.props;
    const materialList = (formData && formData.materialList) || [];

    changeFormData(
      id,
      'materialList',
      materialList.map(m => (m.INDEX === rowIndex ? { ...m, [name]: value } : m)),
    );
  };

  render() {
    const { formData, columns, extraApiData, viewPageData } = this.props;
    const { materialTable } = this.state;
    const viewType = (viewPageData && viewPageData.viewType) || '';
    return (
      <>
        <hr />
        <span>Material {viewType !== 'VIEW' && <Button onClick={this.handlePlusTd}>[+3]</Button>}</span>
        {materialTable}
      </>
    );
  }
}

Material.propTypes = {
  id: PropTypes.string,
  viewType: PropTypes.string,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
  apiArray: PropTypes.array,
  extraApiData: PropTypes.object,
  columns: PropTypes.array,
  viewPageData: PropTypes.object,
};
Material.defaultProps = {
  apiArray: [
    {
      key: 'pipe_type',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=59',
      type: 'GET',
    },
  ],
  extraApiData: { pipe_type: [] },
  columns: [],
};
export default Material;
