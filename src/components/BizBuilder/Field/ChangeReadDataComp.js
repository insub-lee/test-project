import * as PropTypes from 'prop-types';
import React from 'react';

class ChangeReadDataComp extends React.Component {
  componentDidMount() {}

  render() {
    const {
      CONFIG: { property },
      formData,
      colData,
      rowData,
      sagaKey: id,
      changeViewPage,
      changeBuilderModalState,
      isBuilderModal,
    } = this.props;
    const changeData = property.changeList && property.changeList.find(item => item.originValue === (formData[property.viewDataKey] || colData));
    return (
      <>
        {property.titleUse === 'Y' ? (
          <span
            role="button"
            tabIndex="0"
            onKeyPress={() => false}
            onClick={() =>
              isBuilderModal
                ? changeBuilderModalState(true, property.changeViewType || 'VIEW', rowData.WORK_SEQ, rowData.TASK_SEQ, rowData)
                : changeViewPage(id, rowData.WORK_SEQ, rowData.TASK_SEQ, property.changeViewType || 'VIEW')
            }
            className={property.className || ''}
          >
            {(changeData && changeData.changeValue) || colData}
          </span>
        ) : (
          <span className={property.className || ''}>{(changeData && changeData.changeValue) || colData}</span>
        )}
      </>
    );
  }
}

ChangeReadDataComp.propTypes = {
  formData: PropTypes.object,
  rowData: PropTypes.object,
  CONFIG: PropTypes.object,
  colData: PropTypes.any,
  sagaKey: PropTypes.string,
  changeViewPage: PropTypes.func,
  changeBuilderModalState: PropTypes.func,
  isBuilderModal: PropTypes.bool,
};

export default ChangeReadDataComp;
