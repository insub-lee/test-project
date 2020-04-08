// import React from 'react';
// import PropTypes from 'prop-types';
// import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
// import { debounce } from 'lodash';
// import StyledInput from 'commonStyled/Form/StyledInput';
// import { Input } from 'antd';

// const AntdInput = StyledInput(Input);
// class SearchComp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       keyword: '',
//     };
//     this.getSearchData = debounce(this.getSearchData, 300);
//   }

//   getSearchData = () => {
//     const { sagaKey: id, getCallDataHandler, apiUrl } = this.props;
//     const { keyword } = this.state;
//     const apiArr = [
//       {
//         key: 'materialList',
//         type: 'GET',
//         url: `${apiUrl}?keyword=${keyword}`,
//       },
//     ];
//     getCallDataHandler(id, apiArr, this.setDataSource);
//   };

//   setDataSource = () => {
//     const { result, sagaKey: id, changeFormData } = this.props;
//     changeFormData(id, 'dataSource', (result.materialList && result.materialList.list) || []);
//   };

//   render() {
//     return (
//       <>
//         <>
//           <StyledSearchWrap>
//             <span className="input-label">화학물질 검색</span>
//             <AntdInput.Search className="search-item input-width160" placeholder="검색" onChange={handleSearchChange} value={keyword} />
//           </StyledSearchWrap>
//         </>
//       </>
//     );
//   }
// }

// SearchComp.propTypes = {
//   sagaKey: PropTypes.string,
//   getCallDataHandler: PropTypes.func,
//   apiUrl: PropTypes.string,
//   result: PropTypes.object,
//   changeFormData: PropTypes.func,
// };

// SearchComp.defaultProps = {
//   sagaKey: '',
//   getCallDataHandler: () => {},
//   apiUrl: '',
//   result: {},
//   changeFormData: () => {},
// };

// export default SearchComp;
