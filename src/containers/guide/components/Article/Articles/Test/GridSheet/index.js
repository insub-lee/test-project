import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Select } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as feed from 'components/Feedback/functions';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import { BtnSearchDkGray } from './buttons.style';
import Grid from './grid.js';

const Options = Select.Option;
const isNull = value => value === '' || value === undefined || value === null;
class PMSheet extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultBox: [],
      fab: undefined,
      team: undefined,
      sdpt: undefined,
      fl: [],
      model: [],
      version: undefined,
      signStatus: undefined,
    };
    this.props.handleLoadingFabParam();
  }

  handleFabChange = event => {
    const { handleLoadingParam } = this.props;
    handleLoadingParam(event);
    this.setState({
      fab: event,
      team: undefined,
      sdpt: undefined,
      fl: [],
      model: [],
    });
  };

  handleTeamChange = event => {
    const { handleLoadingTeamParam } = this.props;
    handleLoadingTeamParam(event);
    this.setState({
      team: event,
      sdpt: undefined,
      fl: [],
      model: undefined,
    });
  };

  handleSdptChange = event => {
    const { handleLoadingSdptParam } = this.props;
    handleLoadingSdptParam(event);
    this.setState({
      sdpt: event,
      model: [],
    });
  };

  handleFlChange = event => {
    this.setState({
      fl: event,
    });
  };

  handleModelChange = event => {
    this.setState({
      model: event,
    });
  };

  handleVersionChange = event => {
    this.setState({
      version: event,
    });
  };

  handleSignStatusChange = event => {
    this.setState({
      signStatus: event,
    });
  };

  handleSearch = () => {
    const { handlePmSheetSearch } = this.props;
    const {
      fab,
      team,
      sdpt,
      fl,
      model,
      // version,
      // signStatus,
    } = this.state;
    if (isNull(fab) || isNull(team) || isNull(sdpt)) {
      feed.error('FAB, Team, SDPT은 필수 값입니다.');
    } else {
      const param = {
        tabGubun: 'FAB',
        PARAM_BEBER: fab,
        PARAM_STORT: team,
        PARAM_ARBPL: sdpt,
        MULTI_PARAM_ACTIVE: '',
        MULTI_PARAM_EQART: model && model.length > 0 ? model.map(m => `'${m.value}'`).join(',') : '',
        MULTI_PARAM_EQUNR: '',
        MULTI_PARAM_TPLNR: fl && fl.length > 0 ? fl.map(f => `'${f.value}'`).join(',') : '',
        PARAM_APPROVAL: '',
      };
      // MULTI_PARAM_ACTIVE: "'Y','R'" // Version
      // MULTI_PARAM_EQART: "'F00009'"
      // MULTI_PARAM_EQUNR: "'IM0000204627'"
      // MULTI_PARAM_TPLNR: "'M2-03-05-01','M2-03-05-02'" // FL
      // PARAM_APPROVAL: "S"
      // PARAM_ARBPL: "22024" // SDPT
      // PARAM_BEBER: "224" // FAB
      // PARAM_STORT: "P224-01" // TEAM
      // tabGubun: "FAB"
      handlePmSheetSearch(param);
    }
  };

  render() {
    const { defaultBox, fab, team, sdpt, fl, model, version, signStatus } = this.state;
    const { fabList, teamList, sdptList, flList, modelList, versionList, signStatusList, pmSheetDataList } = this.props;
    return (
      <div>
        <div className="PMSheetTitle">
          <h2>PM(TBM) Plan Modeling</h2>
          <br />
        </div>
        <div>
          <div className="SearchBox">
            <table>
              <tbody>
                <tr>
                  <th style={{ width: 55 }}>FAB</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={defaultBox}
                      value={fab}
                      style={{ width: 150 }}
                      onChange={this.handleFabChange}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      defaultActiveFirstOption={false}
                    >
                      {fabList.map(factoryKey => (
                        <Options key={factoryKey.CODE}>{factoryKey.NAME}</Options>
                      ))}
                    </Select>
                  </td>
                  <th style={{ width: 60 }}>Team</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={this.state.defaultBox}
                      value={team}
                      style={{ width: 150 }}
                      onChange={this.handleTeamChange}
                      notFoundContent="All"
                      placeholder="All"
                      defaultActiveFirstOption={false}
                    >
                      {teamList.map(detailFactoryKey => (
                        <Options value={detailFactoryKey.CODE}>{detailFactoryKey.NAME}</Options>
                      ))}
                    </Select>
                  </td>
                  <th style={{ width: 55 }}>SDPT</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={defaultBox}
                      value={sdpt}
                      style={{ width: 150 }}
                      onChange={this.handleSdptChange}
                      notFoundContent="All"
                      placeholder="All"
                      defaultActiveFirstOption={false}
                    >
                      {sdptList.map(sdptKey => (
                        <Options /* onDeselect, onSelect */ value={sdptKey.CODE}>{sdptKey.NAME}</Options>
                      ))}
                    </Select>
                  </td>
                  <th style={{ width: 55 }}>F/L</th>
                  {/* <td style={{ width: 247 }}>
                    <Select
                      defaultValue={defaultBox}
                      value={fl}
                      style={{ width: 150 }}
                      onChange={this.handleFlChange}
                      notFoundContent="All"
                      placeholder="All"
                      defaultActiveFirstOption={false}
                      mode="multiple"
                    >
                      { flList.map(sdptKey => <Options value={sdptKey.CODE}>{sdptKey.NAME}</Options>) }
                    </Select>
                  </td> */}
                  <td style={{ width: 247 }}>
                    <ReactMultiSelectCheckboxes
                      placeholderButtonLabel="ALL"
                      defaultValue={defaultBox}
                      value={fl}
                      onChange={this.handleFlChange}
                      hideSearch
                      options={flList.map(sdptKey => ({ label: sdptKey.NAME, value: sdptKey.CODE }))}
                      width={150}
                    />
                  </td>
                  <th style={{ width: 55 }}>EQ Model</th>
                  <td style={{ width: 247 }}>
                    <ReactMultiSelectCheckboxes
                      placeholderButtonLabel="ALL"
                      defaultValue={defaultBox}
                      value={model}
                      onChange={this.handleModelChange}
                      hideSearch
                      options={modelList.map(modelKey => ({ label: modelKey.NAME, value: modelKey.CODE }))}
                      width={150}
                    />
                  </td>
                  {/* <td style={{ width: 247 }}>
                    <Select
                      defaultValue={this.state.defaultBox}
                      value={model}
                      style={{ width: 150 }}
                      onChange={this.handleModelChange}
                      notFoundContent="All"
                      placeholder="All"
                      defaultActiveFirstOption={false}
                      mode="multiple"
                      transitionName="transitionName"
                    >
                      { modelList.map(modelKey => <Options value={modelKey.CODE} title="title">{modelKey.NAME}</Options>) }
                    </Select>
                  </td> */}
                </tr>
                <tr>
                  <th style={{ width: 55 }}>EQ ID</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={this.state.searchCompCd}
                      value={this.state.searchCompCd}
                      style={{ width: 150 }}
                      onChange={this.handleCompChange}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      defaultActiveFirstOption={false}
                    >
                      {modelList.map(modelKey => (
                        <Options value={modelKey.CODE}>{modelKey.NAME}</Options>
                      ))}
                    </Select>
                  </td>
                  <th style={{ width: 55 }}>Version</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={defaultBox}
                      value={version}
                      style={{ width: 150 }}
                      onChange={this.handleVersionChange}
                      notFoundContent="All"
                      placeholder="All"
                      defaultActiveFirstOption={false}
                    >
                      {versionList.map(versionKey => (
                        <Options value={versionKey.CODE}>{versionKey.NAME}</Options>
                      ))}
                    </Select>
                  </td>
                  <th style={{ width: 60 }}>결재상태</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={defaultBox}
                      value={signStatus}
                      style={{ width: 150 }}
                      onChange={this.handleSignStatusChange}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      defaultActiveFirstOption={false}
                    >
                      {signStatusList.map(signStatusKey => (
                        <Options value={signStatusKey.CODE}>{signStatusKey.NAME}</Options>
                      ))}
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ padding: 20, textAlign: 'right' }}>
          <BtnSearchDkGray title="조회" className="searchBtn" onClick={this.handleSearch}>
            조회
          </BtnSearchDkGray>
        </div>
        <div>
          <Grid pmSheetDataList={pmSheetDataList} />
        </div>
      </div>
    );
  }
}
PMSheet.propTypes = {
  handleLoadingFabParam: PropTypes.func.isRequired,
  handleLoadingParam: PropTypes.func.isRequired,
  handleLoadingTeamParam: PropTypes.func.isRequired,
  handleLoadingSdptParam: PropTypes.func.isRequired,
  handlePmSheetSearch: PropTypes.func.isRequired,
  fabList: PropTypes.array,
  teamList: PropTypes.array,
  sdptList: PropTypes.array,
  flList: PropTypes.array,
  modelList: PropTypes.array,
  versionList: PropTypes.array,
  signStatusList: PropTypes.array,
  pmSheetDataList: PropTypes.array,
};
PMSheet.defaultProps = {
  fabList: [],
  teamList: [],
  sdptList: [],
  flList: [],
  modelList: [],
  versionList: [],
  signStatusList: [],
  pmSheetDataList: [],
};
const mapStateToProps = createStructuredSelector({
  fabList: selectors.makeFabList(),
  teamList: selectors.makeTeamList(),
  sdptList: selectors.makeSdptList(),
  flList: selectors.makeFlList(),
  modelList: selectors.makeModelList(),
  versionList: selectors.makeVersionList(),
  signStatusList: selectors.makeSignStatusList(),
  pmSheetDataList: selectors.makePmSheetDataList(),
});
export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingFabParam: () => dispatch(actions.loadingFabParam()),
    handleLoadingParam: value => dispatch(actions.loadingParam(value)),
    handleLoadingTeamParam: value => dispatch(actions.loadingTeamParam(value)),
    handleLoadingSdptParam: value => dispatch(actions.loadingSdptParam(value)),
    handlePmSheetSearch: param => dispatch(actions.pmSheetSearch(param)),
  };
}
const withReducer = injectReducer({ key: 'gridsheet', reducer });
const withSaga = injectSaga({ key: 'gridsheet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withReducer, withSaga, withConnect)(PMSheet);
