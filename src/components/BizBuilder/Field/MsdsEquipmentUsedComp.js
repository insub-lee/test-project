import * as PropTypes from 'prop-types';
import React from 'react';
import MsdsIngredientCompStyled from '../styled/compStyled/MsdsIngredientCompStyled';

class MsdsEquipmentUsedComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equipMentUsedList: [],
    };
  }

  componentDidMount() {}

  render() {
    const { CONFIG, visible, isSearch, searchCompRenderer, viewPageData } = this.props;
    const { equipMentUsedList } = this.state;
    const viewType = (viewPageData && viewPageData.viewType) || '';
    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer(this.props);
    }
    console.debug('?????????????????////');
    return visible ? (
      <>
        <MsdsIngredientCompStyled>
          <p>사용장비</p>
          <table className="msdsIngreDientTable">
            <thead>
              <tr>
                <td>SITE</td>
                <td>FAB</td>
                <td>공정</td>
                <td>BAY</td>
                <td>장비명</td>
                <td>장비코드</td>
              </tr>
            </thead>
            <tbody>
              {equipMentUsedList.length ? (
                ''
              ) : (
                <tr className="listCount">
                  <td colSpan={6}>{equipMentUsedList.length} 건</td>
                </tr>
              )}
            </tbody>
          </table>
        </MsdsIngredientCompStyled>
      </>
    ) : (
      ''
    );
  }
}

MsdsEquipmentUsedComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.any,
  CONFIG: PropTypes.any,
  colData: PropTypes.any,
  changeFormData: PropTypes.any,
  id: PropTypes.any,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  compProp: PropTypes.any,
  changeSearchData: PropTypes.any,
};

export default MsdsEquipmentUsedComp;
