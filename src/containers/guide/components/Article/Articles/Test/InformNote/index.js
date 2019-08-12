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
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import { BtnSearchDkGray } from './buttons.style';
import InformTbl from './informTbl.js';

const Options = Select.Option;

class InformNote extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultBox: [],
      factory: undefined,
      // detailFactory: undefined,
      sdpt: undefined,
      model: undefined,
      version: undefined,
      signStatus: undefined,
    };
    this.props.handleLoadingFactoryParam();
  }

  handleFactoryChange = (event) => {
    const { handleLoadingParam } = this.props;
    handleLoadingParam(event);
    this.setState({
      factory: event,
      sdpt: undefined,
      model: undefined,
    });
  }

  handleSdptChange = (event) => {
    const { handleLoadingSdptParam } = this.props;
    handleLoadingSdptParam(event);
    this.setState({
      sdpt: event,
      model: undefined,
    });
  }

  handleModelChange = (event) => {
    this.setState({
      model: event,
    });
  }

  handleVersionChange = (event) => {
    this.setState({
      version: event,
    });
  }

  handleSignStatusChange = (event) => {
    this.setState({
      signStatus: event,
    });
  }

  handleSearch = () => {
    const { handlePmSheetSearch } = this.props;
    handlePmSheetSearch();
  }

  render() {
    const {
      defaultBox,
      factory,
      // detailFactory,
      sdpt,
      model,
      version,
      signStatus,
    } = this.state;

    const {
      factoryList,
      sdptList,
      modelList,
      versionList,
      signStatusList,
      pmSheetDataList,
    } = this.props;

    const factoryOptions = factoryList !== undefined ? factoryList.map(factoryKey => <Options key={factoryKey.CODE_CD}>{factoryKey.NAME_KOR}</Options>) : '';
    // const detailfactoryOption = detailFactory !== undefined ? detailFactory.map(detailFactoryKey => <Options value={detailFactoryKey.CODE_CD}>{detailFactoryKey.NAME_KOR}</Options> : '') : '';
    const sdptOptions = sdptList !== undefined ? sdptList.map(sdptKey => <Options value={sdptKey.CODE_CD}>{sdptKey.NAME_KOR}</Options>) : '';
    const modelOptions = modelList !== undefined ? modelList.map(modelKey => <Options value={modelKey.CODE_CD}>{modelKey.NAME_KOR}</Options>) : '';
    const versionOptions = versionList !== undefined ? versionList.map(versionKey => <Options value={versionKey.CODE_CD}>{versionKey.NAME_KOR}</Options>) : '';
    const signStatusOptions = signStatusList !== undefined ? signStatusList.map(signStatusKey => <Options value={signStatusKey.CODE_CD}>{signStatusKey.NAME_KOR}</Options>) : '';

    return (
      <div>
        <div className="PMSheetTitle">
          <h2>Inform Note 관리</h2><br />
        </div>
        <div>
          <div className="SearchBox">
            <table>
              <tbody>
                <tr>
                  <th style={{ width: 55 }} >FAB</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={defaultBox}
                      value={factory}
                      style={{ width: 180 }}
                      onChange={this.handleFactoryChange}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      defaultActiveFirstOption={false}
                    >
                      {factoryOptions}
                    </Select>
                  </td>
                  {/* <th style={{ width: 60 }} >세부공정</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={this.state.defaultBox}
                      value={detailFactory}
                      style={{ width: 180 }}
                      onChange={this.handleDetailFactoryChange}
                      notFoundContent="All"
                      placeholder="All"
                      defaultActiveFirstOption={false}
                    >
                      {detailfactoryOption}
                    </Select>
                  </td> */}
                  <th style={{ width: 55 }} >SDPT</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={defaultBox}
                      value={sdpt}
                      style={{ width: 180 }}
                      onChange={this.handleSdptChange}
                      notFoundContent="All"
                      placeholder="All"
                      defaultActiveFirstOption={false}
                    >
                      {sdptOptions}
                    </Select>
                  </td>
                  <th style={{ width: 55 }} >Model</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={this.state.defaultBox}
                      value={model}
                      style={{ width: 180 }}
                      onChange={this.handleModelChange}
                      notFoundContent="All"
                      placeholder="All"
                      defaultActiveFirstOption={false}
                    >
                      {modelOptions}
                    </Select>
                  </td>
                  {/* <th style={{ width: 55 }} >EQ ID</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={this.state.searchCompCd}
                      value={this.state.searchCompCd}
                      style={{ width: 180 }}
                      onChange={this.handleCompChange}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      defaultActiveFirstOption={false}
                    >
                      {compOptions}
                    </Select>
                  </td> */}
                  <tr>
                    <td rowSpan="2" style={{ width: 300, alignContent: 'center', paddingLeft: 20 }}>
                      <BtnSearchDkGray
                        title="조회"
                        className="searchBtn"
                        onClick={this.handleSearch}
                      >
                      조회
                      </BtnSearchDkGray>
                    </td>
                  </tr>
                </tr>
                <tr>
                  <th style={{ width: 55 }} >Down</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={defaultBox}
                      value={version}
                      style={{ width: 180 }}
                      onChange={this.handleVersionChange}
                      notFoundContent="All"
                      placeholder="All"
                      defaultActiveFirstOption={false}
                    >
                      {versionOptions}
                    </Select>
                  </td>
                  <th style={{ width: 60 }} >DownType</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={defaultBox}
                      value={signStatus}
                      style={{ width: 180 }}
                      onChange={this.handleSignStatusChange}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      defaultActiveFirstOption={false}
                    >
                      {signStatusOptions}
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <br />
        <div>
          <InformTbl
            pmSheetDataList={pmSheetDataList}
          />
        </div>
      </div>
    );
  }
}

InformNote.propTypes = {
  handleLoadingFactoryParam: PropTypes.func.isRequired,
  handleLoadingParam: PropTypes.func.isRequired,
  handleLoadingSdptParam: PropTypes.func.isRequired,
  handlePmSheetSearch: PropTypes.func.isRequired,
  factoryList: PropTypes.array.isRequired,
  // detailFactoryList: PropTypes.array.isRequired,
  sdptList: PropTypes.array.isRequired,
  modelList: PropTypes.array.isRequired,
  versionList: PropTypes.array.isRequired,
  signStatusList: PropTypes.array.isRequired,
  pmSheetDataList: PropTypes.array,
};

InformNote.defaultProps = {
  pmSheetDataList: [],
};

const mapStateToProps = createStructuredSelector({
  factoryList: selectors.makeFactoryList(),
  detailFactoryList: selectors.makedetailFactory(),
  sdptList: selectors.makeSdptList(),
  modelList: selectors.makeModelList(),
  versionList: selectors.makeVersionList(),
  signStatusList: selectors.makeSignStatusList(),
  pmSheetDataList: selectors.makePmSheetDataList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingFactoryParam: () => dispatch(actions.loadingFactoryParam()),
    handleLoadingParam: value => dispatch(actions.loadingParam(value)),
    handleLoadingSdptParam: value => dispatch(actions.loadingSdptParam(value)),
    handlePmSheetSearch: () => dispatch(actions.pmSheetSearch()),
  };
}

const withReducer = injectReducer({ key: 'informNote', reducer });
const withSaga = injectSaga({ key: 'informNote', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(InformNote);
