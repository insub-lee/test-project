import * as PropTypes from 'prop-types';
import React from 'react';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';

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
    return visible ? (
      <>
        <StyledHtmlTable className="tableWrapper">
          <table className="table-border">
            <colgroup>
              <col width="15%" />
              <col width="15%" />
              <col width="15%" />
              <col width="15%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <thead>
              <tr>
                <th>SITE</th>
                <th>FAB</th>
                <th>공정</th>
                <th>BAY</th>
                <th>장비명</th>
                <th>장비코드</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan={6}>{equipMentUsedList.length} 건</td>
              </tr>
            </tfoot>
            <tbody></tbody>
          </table>
        </StyledHtmlTable>
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
