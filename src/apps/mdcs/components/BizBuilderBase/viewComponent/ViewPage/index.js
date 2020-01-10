import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Loadable from 'react-loadable';

import { isJSON } from 'utils/helpers';
import SignLine from 'apps/Workflow/SignLine';
import ApproveHistory from 'apps/Workflow/ApproveHistory';
import { CompInfo } from '../../CompInfo';

import Styled from './Styled';

class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
    };
  }

  // componentDidMount() {
  //   const { id, draftId } = this.props;
  //   if (draftId !== -1) {
  //     this.props.getDraftProcess(id, draftId);
  //   }
  // }

  // state값 reset테스트
  componentWillUnmount() {
    const { removeReduxState, id } = this.props;
    removeReduxState(id);
  }

  renderCol = (col, colData) => {
    const { id, getExtraApiData, extraApiData, formData, compProps } = this.props;
    if (col.CONFIG.property.COMP_SRC && col.CONFIG.property.COMP_SRC.length > 0 && CompInfo[col.CONFIG.property.COMP_SRC]) {
      return CompInfo[col.CONFIG.property.COMP_SRC].renderer({
        ...col,
        colData,
        id,
        getExtraApiData,
        extraApiData,
        formData,
        compProps,
        readOnly: true,
      });
    }
    return `component!!!`;
  };

  render = () => {
    const { id, viewLayer, formData, loadingComplete, draftId } = this.props;

    // 로딩
    if (!this.props.isLoading && this.state.initLoading) {
      this.setState(
        {
          initLoading: false,
        },
        () => loadingComplete(),
      );
    }

    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerList = JSON.parse(viewLayer[0].CONFIG).property.layer || [];
      return (
        <Styled>
          <div className="pop_con">
            <div className="sub_form">
              <div className="tableBody">
                {/* {draftId !== -1 && <WorkProcess id={id} processRule={{ DRAFT_PROCESS_STEP: draftProcess }} viewType={viewType} />} */}
                {draftId !== -1 && <SignLine id={id} draftId={draftId} />}
                {viewLayerList.length > 0 &&
                  viewLayerList.map((row, rowIdx) => (
                    <Row key={`BizBuilderBaseRow_${rowIdx}`}>
                      {row.length > 0 &&
                        row.map((col, colIdx) => (
                          <Col span={col.CONFIG.property.span} key={`BizBuilderBaseCol_${rowIdx}_${colIdx}`}>
                            {this.renderCol(col, col.CONFIG.property.COMP_FIELD ? formData[col.CONFIG.property.COMP_FIELD] : '')}
                          </Col>
                        ))}
                    </Row>
                  ))}
                {draftId !== -1 && <ApproveHistory draftId={draftId} />}
              </div>
            </div>
          </div>
        </Styled>
      );
    }
    return '';
  };
}

ViewPage.propTypes = {
  id: PropTypes.string,
  draftId: PropTypes.number,
  getDraftProcess: PropTypes.func,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  formData: PropTypes.object,
  compProps: PropTypes.object,
  viewLayer: PropTypes.array,
  draftProcess: PropTypes.array,
  viewType: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingComplete: PropTypes.func,
  removeReduxState: PropTypes.func,
};

ViewPage.defaultProps = {
  draftId: -1,
  draftProcess: [],
  loadingComplete: () => {},
};

export default ViewPage;
