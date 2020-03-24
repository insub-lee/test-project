import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import { Button, Select, Input, Table, Checkbox } from 'antd';
import UnitComp from 'components/BizBuilder/Field/UnitComp';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const { Option } = Select;
const AntdTable = StyledAntdTable(Table);

class Material extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materialIndex: 0,
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
    };
  }

  componentDidMount() {
    const { id, changeFormData, formData, apiArray, getExtraApiData } = this.props;
    const { initMaterialRow } = this.state;
    const taskSeq = (formData && formData.TASK_SEQ) || '';
    if (taskSeq) {
      // TODO MATERIAL LSIT SELECT
    } else {
      const materialList = [];

      materialList.push({ ...initMaterialRow, INDEX: 0 });
      materialList.push({ ...initMaterialRow, INDEX: 1 });
      materialList.push({ ...initMaterialRow, INDEX: 2 });
      changeFormData(id, 'materialList', materialList);
    }
    console.debug('여기는 DidMount');
    getExtraApiData(id, apiArray, this.handleSetMaterialTable);
  }

  setTreeSelect = () => {
    // const { extraApiData, id, changeFormData } = this.props;
    // const treeData = (extraApiData && extraApiData.treeData && extraApiData.treeData.categoryMapList) || [];
    // const interLockList = (extraApiData && extraApiData.interLockList && extraApiData.interLockList.list) || [];
    // if (!interLockList.length) {
    //   interLockList.push({ IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '' });
    //   interLockList.push({ IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '' });
    //   interLockList.push({ IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '' });
    // }
    // const categoryData = td.length > 0 ? td[0] : [];
    // changeFormData(id, 'interLockList', interLockList);
  };

  handleUnitComp = (key, comp, value) => {
    const { formData, changeFormData, id } = this.props;
    const materialList = (formData && formData.materialList) || [];
    console.debug('11111111111 ', key, comp, value);
    console.debug(materialList.map((m, index) => (index === key.index ? { ...m, [comp]: value } : m)));
    changeFormData(
      id,
      'materialList',
      materialList.map((m, index) => (index === key.index ? { ...m, [comp]: value } : m)),
    );
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
    this.handleSetMaterialTable();
  };

  handleSetMaterialTable = () => {
    const { formData } = this.props;
    const materialList = (formData && formData.materialList) || [];
    const { columns } = this.props;
    return this.setState({
      materialTable: [
        <AntdTable
          rowKey={materialList && materialList.INDEX}
          columns={columns}
          dataSource={materialList || []}
          bordered
          pagination={{ pageSize: 100 }}
          scroll={{ x: 1500, y: 300 }}
        />,
      ],
    });
  };

  handleSetPipeTypeOption = () => {
    const { extraApiData } = this.props;
    const pipeType = (extraApiData && extraApiData.pipe_type && extraApiData.pipe_type.categoryMapList) || [];
    console.debug('222222222222222222', pipeType);
    return pipeType
      .filter(p => p.LVL > 0 && p.USE_YN === 'Y')
      .map(item => (
        <Option key={item.NODE_ID} value={item.NODE_ID}>
          {item.NAME_KOR}
        </Option>
      ));
  };

  render() {
    const { formData, columns, extraApiData } = this.props;
    const { materialTable } = this.state;
    return (
      <>
        <span>
          Material <Button onClick={this.handlePlusTd}>[+3]</Button>
        </span>
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
  columns: [
    {
      title: '식제',
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
        console.debug('text', text);
        console.debug('record', record);
        return (
          <>
            <Select key={record.INDEX} defaultValue={record.IS_INPUT}>
              <Option value="1">IN</Option>
              <Option value="0">OUT</Option>
            </Select>
          </>
        );
      },
    },
    {
      title: 'Bath명/Size',
      dataIndex: '',
      align: 'center',
      width: 240,
      render: (text, record) => (
        <span key={record.INDEX}>
          <Input name="BATH_NM" defaultValue={record.BATH_NM} />
          <Input name="BATH_SIZE" defaultValue={record.BATH_SIZE} /> ℓ
        </span>
      ),
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
      width: 110,
      render: (text, record) => (
        <span key={record.INDEX}>
          <Select key={record.INDEX} defaultValue={record.PIPE_TYPE}>
            {/* {this.handleSetPipeTypeOption.typeof === 'func' ? this.handleSetPipeTypeOption : ''} */}
          </Select>
          <Input name="PIPE_NO" dafaultValue={record.PIPE_NO} />
          <Input name="PIPE_SIZE" defaultValue={record.PIPE_SIZE} /> mm
        </span>
      ),
    },
    {
      title: '사용량/단위',
      dataIndex: '',
      align: 'center',
      width: 300,
      render: (text, record) => (
        <span key={record.INDEX}>
          <Input name="QUANTITY" defaultValue={record.QUANTITY} />
          <UnitComp
            colData={record.QUANTITY_UNIT}
            sagaKey={{ id: record.INDEX }}
            COMP_FIELD="QUANTITY_UNIT"
            changeFormData={(key, COMP_FIELD, value) => this.handleUnitComp(key, COMP_FIELD, value)}
          />
        </span>
      ),
    },
    {
      title: '농도/단위',
      dataIndex: '',
      align: 'center',
      width: 300,
      render: (text, record) => (
        <span key={record.INDEX}>
          <Input name="DENSITY" defaultValue={record.DENSITY} />
          <UnitComp
            colData={record.DENSITY_UNIT}
            sagaKey={{ id: record.INDEX }}
            COMP_FIELD="DENSITY_UNIT"
            changeFormData={(key, COMP_FIELD, value) => this.handleUnitComp(key, COMP_FIELD, value)}
          />
        </span>
      ),
    },
    {
      title: 'Di사용량/단위',
      dataIndex: '',
      align: 'center',
      width: 300,
      render: (text, record) => (
        <span key={record.INDEX}>
          <Input name="DI" defaultValue={record.DI} />
          <UnitComp
            colData={record.DI_UNIT}
            sagaKey={{ id: record.INDEX }}
            COMP_FIELD="DI_UNIT"
            changeFormData={(key, COMP_FIELD, value) => this.handleUnitComp(key, COMP_FIELD, value)}
          />
        </span>
      ),
    },
    {
      title: '회수율',
      dataIndex: '',
      align: 'center',
      width: 100,
      render: (text, record) => (
        <span key={record.INDEX}>
          <Input name="RECYCLE_RT" defaultValue={record.RECYCLE_RT} /> %
        </span>
      ),
    },
    {
      title: '집결지-탱크/저장소/명',
      dataIndex: '',
      align: 'center',
      width: 250,
      render: (text, record) => (
        <span key={record.INDEX}>
          <Input name="STORAGETANK_CD" defaultValue={record.STORAGETANK_CD} />
          <Input name="STORAGEHOUSE_CD" defaultValue={record.STORAGEHOUSE_CD} />
          <Input name="STORAGEPLACE_NM" defaultValue={record.STORAGEPLACE_NM} />
        </span>
      ),
    },
  ],
};
export default Material;
