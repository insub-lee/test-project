// 삭제 예정
// import React, { Component } from 'react';

// import { Select, Input } from 'antd';

// const { Option } = Select;

// class ManageCodeComp extends Component {
//   componentDidMount() {
//     const {
//       getExtraApiData,
//       sagaKey: id,
//       CONFIG: {
//         property: { mapId },
//       },
//     } = this.props;
//     const apiArray = [{ key: 'law_34', url: '/api/admin/v1/common/categoryMapList?MAP_ID=34', type: 'GET' }];
//     getExtraApiData(id, apiArray);
//   }

//   onChangeHandler = value => {
//     const {
//       changeFormData,
//       sagaKey: id,
//       CONFIG: {
//         property: { isRequired },
//       },
//       COMP_FIELD,
//       NAME_KOR,
//       changeValidationData,
//       getExtraApiData,
//       extraApiData,
//     } = this.props;
//     if (isRequired) {
//       // 기본값인지 체크
//       changeValidationData(id, COMP_FIELD, value.trim() !== '', value.trim() !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
//     }

//     const apiData = extraApiData.law_34.categoryMapList;
//     const find = apiData.find(f => f.NODE_ID === value);
//     const apiAry = [{ key: 'manageCntKey', url: `/api/eshs/v1/common/managecnt?RECH_CODE=${find.CODE}&NODE_ID=${value}`, type: 'GET' }];
//     changeFormData(id, COMP_FIELD, value);
//     getExtraApiData(id, apiAry);
//   };

//   componentDidUpdate() {
//     this.manageCnt();
//   }

//   manageCnt() {
//     const { changeFormData, sagaKey: id, extraApiData } = this.props;
//     if (extraApiData && extraApiData.manageCntKey && extraApiData.manageCntKey.newCode) {
//       changeFormData(id, 'RECH_NO', extraApiData.manageCntKey.newCode);
//     }
//   }

//   render() {
//     const {
//       CONFIG,
//       CONFIG: {
//         property: { mapId, defaultValue, placeholder },
//       },
//       extraApiData,
//       colData,
//       readOnly,
//       visible,
//       viewPageData,
//     } = this.props;
//     const apiData =
//       extraApiData &&
//       extraApiData.law_34 &&
//       extraApiData.law_34.categoryMapList &&
//       extraApiData.law_34.categoryMapList.filter(x => x.LVL > 0 && x.USE_YN === 'Y');

//     return visible && colData !== undefined && viewPageData.viewType === 'INPUT' ? (
//       <>
//         <Select
//           value={!colData || colData === 0 || (typeof colData === 'string' && colData.trim() === '') ? undefined : Number(colData)}
//           placeholder={placeholder}
//           style={{ width: 300, marginRight: 10 }}
//           onChange={value => {
//             this.onChangeHandler(value);
//           }}
//           disabled={readOnly || CONFIG.property.readOnly}
//           className={CONFIG.property.className || ''}
//         >
//           {apiData &&
//             apiData.map(item => (
//               <Option key={`selectMap_${item.NODE_ID}`} value={item.NODE_ID}>
//                 {item.NAME_KOR}
//               </Option>
//             ))}
//         </Select>
//       </>
//     ) : (
//       ''
//     );
//   }
// }

// export default ManageCodeComp;
