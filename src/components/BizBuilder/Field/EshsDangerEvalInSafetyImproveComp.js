import React from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

const AntdSelect = StyledSelect(Select);

class EshsDangerEvalInSafetyImproveComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accidentCauseList: [],
      accientTypes: [],
    };
  }

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList = () => {
    const { sagaKey, getExtraApiData } = this.props;
    const apiArr = [
      {
        key: 'accidentCauseList',
        type: 'POST',
        url: `/api/admin/v1/common/categoryMapList`,
        params: { PARAM: { NODE_ID: 30433 } },
      },
      {
        key: 'accidentTypes',
        type: 'POST',
        url: `/api/admin/v1/common/categoryMapList`,
        params: { PARAM: { NODE_ID: 30432 } },
      },
    ];

    getExtraApiData(sagaKey, apiArr, this.setCategory);
  };

  setCategory = () => {
    const { extraApiData } = this.props;
    this.setState({
      accidentCauseList: (extraApiData.accidentCauseList && extraApiData.accidentCauseList.categoryMapList.slice(1)) || [],
      accientTypes: (extraApiData.accidentTypes && extraApiData.accidentTypes.categoryMapList.slice(1)) || [],
    });
  };

  handleSelectChange = (key, value) => {
    const { sagaKey, changeFormData } = this.props;
    changeFormData(sagaKey, key.toUpperCase(), value);
  };

  render() {
    const { handleSelectChange } = this;
    const { accidentCauseList, accientTypes } = this.state;
    const { formData } = this.props;
    return (
      <>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
            </colgroup>
            <tbody>
              <tr>
                <th>위험성평가</th>
                <td colSpan={2}>
                  <AntdSelect
                    defaultValue="N"
                    className="select-sm"
                    value={formData.IS_DANGER}
                    onChange={value => handleSelectChange('IS_DANGER', value)}
                    style={{ width: '100%' }}
                  >
                    <Select.Option value="Y">실시</Select.Option>
                    <Select.Option value="N">해당 없음</Select.Option>
                  </AntdSelect>
                </td>
                <th>사고의 발생원인</th>
                <td colSpan={2}>
                  <AntdSelect
                    disabled={formData.IS_DANGER === 'N'}
                    className="select-sm"
                    value={formData.ACCIDENT_CAUSE}
                    onChange={value => handleSelectChange('ACCIDENT_CAUSE', value)}
                    style={{ width: '100%' }}
                  >
                    {accidentCauseList.map(cause => (
                      <Select.Option value={cause.NODE_ID}>{cause.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                </td>
                <th>사고의 발생유형</th>
                <td colSpan={2}>
                  <AntdSelect
                    disabled={formData.IS_DANGER === 'N'}
                    className="select-sm"
                    value={formData.ACCIDENT_TYPE}
                    onChange={value => handleSelectChange('ACCIDENT_TYPE', value)}
                    style={{ width: '100%' }}
                  >
                    {accientTypes.map(type => (
                      <Select.Option value={type.NODE_ID}>{type.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </>
    );
  }
}

EshsDangerEvalInSafetyImproveComp.propTypes = {
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
};

EshsDangerEvalInSafetyImproveComp.defaultProps = {};

export default EshsDangerEvalInSafetyImproveComp;
