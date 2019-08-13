import View from 'components/WorkBuilder/View';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import WorkBuilder from 'components/WorkBuilder';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

class Designer extends Component {
  componentDidMount() {
    const { fetchData, id } = this.props;
    fetchData(id);
  }

  componentWillUnmount() {
    const { resetData } = this.props;
    resetData();
  }

  render() {
    const { property, action, onDragEnd, onPreview, layers, closePreview, isLoading } = this.props;
    const { boxes, formStuffs } = layers;
    return (
      <React.Fragment>
        <WorkBuilder property={property} action={action} onDragEnd={onDragEnd} isLoading={isLoading} />
        <Modal title="Preview" visible={onPreview} footer={null} onCancel={closePreview}>
          <View boxes={boxes} formStuffs={formStuffs} preview />
        </Modal>
      </React.Fragment>
    );
  }
}

Designer.propTypes = {
  property: PropTypes.shape({
    canvasProperty: PropTypes.object,
    panelsProperty: PropTypes.object,
  }).isRequired,
  action: PropTypes.shape({
    canvasAction: PropTypes.objectOf(PropTypes.func),
    panelsAction: PropTypes.objectOf(PropTypes.func),
  }).isRequired,
  onDragEnd: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  fetchData: PropTypes.func,
  layers: PropTypes.shape({
    boxes: PropTypes.arrayOf(PropTypes.object),
    formStuffs: PropTypes.arrayOf(PropTypes.object),
  }),
  onPreview: PropTypes.bool,
  closePreview: PropTypes.func,
  isLoading: PropTypes.bool,
};

Designer.defaultProps = {
  fetchData: () => console.debug('no bind events'),
  layers: {
    boxes: [],
    formStuffs: [],
  },
  onPreview: false,
  closePreview: () => console.debug('no bind events'),
  isLoading: true,
};

const mapStateToProps = createStructuredSelector({
  property: selectors.makeSelectProperty(),
  layers: selectors.makeSelectLayers(),
  onPreview: selectors.makeSelectOnPreview(),
  isLoading: selectors.makeSelectIsLoading(),
});

const mapDispatchToProps = dispatch => ({
  action: {
    canvasAction: {
      removeLayer: (id, layerType) => dispatch(actions.removeLayer(id, layerType)),
      activeLayer: (id, layerType) => dispatch(actions.activeLayer(id, layerType)),
      disableLayers: () => dispatch(actions.disableLayers()),
    },
    panelsAction: {
      optionsPanelAction: {
        openPreview: () => dispatch(actions.openPreview()),
        confirmClearLayers: () => {
          Modal.confirm({
            title: '전체 레이어를 초기화 하시겠습니까?',
            content: '삭제된 내용은 복구 되지 않습니다.',
            onOk() {
              dispatch(actions.clearLayers());
            },
            okType: 'danger',
            okText: '네',
            cancelText: '아니요',
          });
        },
        confirmSaveLayers: () => {
          Modal.confirm({
            title: '작성한 레이어를 저장하시겠습니까?',
            content: '작성된 데이터는 수정할 수 없습니다.',
            onOk() {
              dispatch(actions.saveLayers());
            },
            okType: 'danger',
            okText: '네',
            cancelText: '아니요',
          });
        },
      },
      viewsPanelAction: {
        activeTab: tabId => dispatch(actions.activeTab(tabId)),
      },
      viewsContainerPanelAction: {
        blocksAction: {
          addBox: () => {
            dispatch(actions.addBox());
          },
          addFormStuff: formStuffType => {
            dispatch(actions.addFormStuff(formStuffType));
          },
          toggleBlockOpenStatus: blockType => {
            dispatch(actions.toggleBlockOpenStatus(blockType));
          },
        },
        styleManagerAction: {
          changeLabel: (step, label) => {
            dispatch(actions.changeLabel(step, label));
          },
          changeId: (type, index, value) => {
            dispatch(actions.changeId({ type, index, value }));
          },
          changeTitle: (type, index, { target }) => {
            const { value } = target;
            dispatch(actions.changeTitle({ type, index, value }));
          },
          changeName: (type, index, e) => {
            let { value } = e.target;
            value = value.replace(/[^A-Z_]/gi, '').toUpperCase();
            e.target.value = value;
            dispatch(actions.changeName({ type, index, value }));
          },
          changeRequired: (type, index, value) => {
            dispatch(actions.changeRequired(type, index, value));
          },
          changeMaxLength: (type, index, e) => {
            let { value } = e.target;
            const number = parseInt(value, 10) || 0;
            e.target.value = number;
            if (number < 0) {
              e.target.value = 0;
              value = 0;
            }
            dispatch(actions.changeMaxLength({ type, index, value: Number(value) }));
          },
          changeUseLabel: (type, index, value) => {
            dispatch(actions.changeUseLabel({ type, index, value }));
          },
          changeBoxType: (index, value) => {
            dispatch(actions.changeBoxType(index, value));
          },
          changeBoxColumnCount: (index, value) => {
            dispatch(actions.changeBoxColumnCount(index, value));
          },
          changeFormStuffSpan: (index, value) => {
            dispatch(actions.changeFormStuffSpan(index, value));
          },
        },
        layersAction: {
          activeLayer: (id, layerType) => dispatch(actions.activeLayer(id, layerType)),
          disableLayers: () => dispatch(actions.disableLayers()),
        },
      },
    },
  },
  onDragEnd: dropResult => dispatch(actions.onDragEnd(dropResult)),
  fetchData: id => dispatch(actions.fetchData(id)),
  closePreview: () => dispatch(actions.closePreview()),
  resetData: () => dispatch(actions.resetData()),
});

const withReducer = injectReducer({ key: 'work-builder-detail-designer', reducer });
const withSaga = injectSaga({ key: 'work-builder-detail-designer', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Designer);
