import * as PropTypes from 'prop-types';
import React from 'react';
import { Popover } from 'antd';

class JoinToolTipComp extends React.Component {
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
    const text = colData && colData.replace(/(<([^>]+)>)/gi, '').replace('Powered by Froala Editor', '');
    const bold = property.boldCondition && property.boldTarget && String(rowData[property.boldCondition]) === String(property.boldTarget) ? 'bold' : '';
    return (
      <Popover placement="topLeft" title={formData[property.viewDataKey] || text} trigger="hover">
        {property.titleUse === 'Y' ? (
          <div
            role="button"
            tabIndex="0"
            onKeyPress={() => false}
            onClick={() =>
              isBuilderModal
                ? changeBuilderModalState(true, property.changeViewType || 'VIEW', rowData.WORK_SEQ, rowData.TASK_SEQ, rowData)
                : changeViewPage(id, rowData.WORK_SEQ, rowData.TASK_SEQ, property.changeViewType || 'VIEW')
            }
            className={property.className || ''}
            style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', fontWeight: `${bold}`, cursor: 'pointer' }}
          >
            {formData[property.viewDataKey] || text}
          </div>
        ) : (
          <div
            className={property.className || ''}
            style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', fontWeight: `${bold}` }}
          >
            {formData[property.viewDataKey] || text}
          </div>
        )}
      </Popover>
    );
  }
}

JoinToolTipComp.propTypes = {
  formData: PropTypes.object,
  rowData: PropTypes.object,
  CONFIG: PropTypes.object,
  colData: PropTypes.any,
  sagaKey: PropTypes.string,
  changeViewPage: PropTypes.func,
  changeBuilderModalState: PropTypes.func,
  isBuilderModal: PropTypes.bool,
};

export default JoinToolTipComp;
