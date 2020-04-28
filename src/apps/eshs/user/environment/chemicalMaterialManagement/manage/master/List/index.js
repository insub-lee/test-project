import React from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
    };
  }

  defaultColDef = {
    width: 120,
    resizable: true,
  };

  columnDefs = [
    {
      headerName: '',
      children: [
        {
          headerName: 'SAP_NO',
          field: 'SAP_NO',
        },
        {
          headerName: 'CAS_NO',
          field: 'CAS_NO',
        },
        {
          headerName: '화학물질명_국문',
          field: 'NAME_KOR',
        },
        {
          headerName: '화학물질명_영문',
          field: 'NAME_ENG',
        },
        {
          headerName: '화학물질명_SAP',
          field: 'NAME_SAP',
        },
        {
          headerName: '관용명 및 이명',
          field: 'NAME_ETC',
        },
        {
          headerName: '수입구분',
          field: 'IS_IMPORT',
        },
        {
          headerName: '공급업체',
          field: 'WRK_CMPNY_NM',
        },
        {
          headerName: '함량(%) 표현값',
          field: 'CONTENT_EXP',
        },
        {
          headerName: '함량(%) 정량',
          field: 'CONTENT_DOSE',
        },
      ],
    },
    {
      headerName: '화학물질관리법',
      children: [
        {
          headerName: '유독물질 검색(함량 판단 기준)',
          field: 'HARMFUL_MATERIAL',
        },
        {
          headerName: '사고대비물질 검색(함량 판단 기준)',
          field: 'ACCIDENT_MATERIAL',
        },
        {
          headerName: '유독물질',
          field: 'TOXIC_EXPRESSION',
        },
        {
          headerName: '사고대비물질',
          field: 'ACCIDENT_EXPRESSION',
        },
        {
          headerName: '허가물질',
          field: 'ALLOW_EXPRESSION',
        },
        {
          headerName: '제한물질',
          field: 'RESTRICT_CONTENT_FACTOR',
        },
        {
          headerName: '금지물질',
          field: 'BAN_CONTENT_FACTOR',
        },
        {
          headerName: '유해화학물질(함량기준 X)',
          field: 'HARMFUL_MATERIAL_NO_CONTENT',
        },
        {
          headerName: '유해화학물질(함량기준 분류)',
          field: 'HARMFUL_MATERIAL_CONTENT',
        },
        {
          headerName: 'PRTR(대상물질 구분)',
          field: 'PRTR_GROUP',
        },
        {
          headerName: 'PRTR(취급량 기준)',
          field: 'PRTR_USAGE',
        },
        {
          headerName: '조사대상범위(무게함유율%)',
          field: 'INVESTIGATION_TARGET_RANGE',
        },
        {
          headerName: '2018 PRTR(조사대상 화학물질)',
          field: '',
        },
      ],
    },
    {
      headerName: '화평법',
      children: [
        {
          headerName: 'CMR 등록 대상물질',
          field: 'IS_REGISRATION_ACT_APPLICATE',
        },
        {
          headerName: '수입화학물질여부',
          field: 'REGISTRATION_ACT_IS_IMPORT',
        },
      ],
    },
    {
      headerName: '위험물 안전관리법',
      children: [
        {
          headerName: '위험물(제품기준분류)',
          field: 'HARMFUL_CATEGORY',
        },
      ],
    },
    {
      headerName: '산업안전보건법',
      children: [
        {
          headerName: '노출기준설정물질(산안법 39조)',
          field: 'IS_EXPOSURE',
        },
        {
          headerName: '허용기준설정물질(산안법 39조2)',
          field: 'IS_PERMISSION',
        },
        {
          headerName: '허가대상물질(산안법 38조)',
          field: 'IS_ALLOW',
        },
        {
          headerName: '작업환경측정물질(산안법시행규칙93조)',
          field: 'IS_BAN',
        },
        {
          headerName: '작업환경측정물질(함량 1%이상)',
          field: 'IS_WORKSPACE_MATERIAL',
        },
        {
          headerName: '관리대상물질(보건기준 420조)',
          field: 'IS_WORKSPACE_MATERIAL_CONTENT',
        },
        {
          headerName: '특별관리대상물질(보건기준 440조)',
          field: 'IS_MANAGED',
        },
        {
          headerName: '특수건강검진대상(산안법 201조)',
          field: 'IS_SPE_MANAGED',
        },
        {
          headerName: 'PSM(PSM대상물질 51종)',
          field: 'IS_APPLICATE',
        },
        {
          headerName: 'C',
          field: 'CARCINOGENICITY',
        },
        {
          headerName: 'M',
          field: 'MUTAGENICITY',
        },
        {
          headerName: 'R',
          field: 'REPRODUCTIVE_TOXICIT',
        },
      ],
    },
  ];

  componentDidMount() {
    this.getRowData();
  }

  getRowData = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'chemicalMaterials',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalmaterialmastermanagement',
      },
    ];
    getCallDataHandler(id, apiArr, this.setRowData);
  };

  setRowData = () => {
    const { result } = this.props;
    this.setState({
      rowData: (result.chemicalMaterials && result.chemicalMaterials.list) || [],
    });
  };

  render() {
    return (
      <>
        <div style={{ width: '100%', height: '100%' }}>
          <div className="ag-theme-balham tableWrapper" style={{ padding: '0px 20px', height: '540px' }}>
            <AgGridReact defaultColDef={this.defaultColDef} columnDefs={this.columnDefs} rowData={this.state.rowData} suppressRowTransform />
          </div>
        </div>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.arrayOf('object'),
};

export default List;
