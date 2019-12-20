import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './node-content-renderer.module.scss';

function isDescendant(older, younger) {
  return !!older.children && typeof older.children !== 'function' && older.children.some(child => child === younger || isDescendant(child, younger));
}

// eslint-disable-next-line react/prefer-stateless-function
class CustomThemeNodeContentRenderer extends Component {
  render() {
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      title,
      subtitle,
      draggedNode,
      path,
      treeIndex,
      isSearchMatch,
      isSearchFocus,
      icons,
      buttons,
      className,
      style,
      didDrop,
      lowerSiblingCounts,
      listIndex,
      swapFrom,
      swapLength,
      swapDepth,
      treeId, // Not needed, but preserved for other renderers
      isOver, // Not needed, but preserved for other renderers
      parentNode, // Needed for dndManager
      ...otherProps
    } = this.props;
    const nodeTitle = title || node.title;
    const nodeSubtitle = subtitle || node.subtitle;

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;

    const nodeContent = connectDragPreview(
      <div
        className={`${styles.row} rstcustom__row ${isLandingPadActive ? ` ${styles.rowLandingPad} rstcustom__rowLandingPad` : ''} ${
          isLandingPadActive && !canDrop ? ` ${styles.rowCancelPad} rstcustom__rowCancelPad` : ''
        } ${isSearchMatch ? ` ${styles.rowSearchMatch} rstcustom__rowSearchMatch` : ''} ${
          isSearchFocus ? ` ${styles.rowSearchFocus} rstcustom__rowSearchFocus` : ''
        } ${className ? ` ${className}` : ''}`}
        style={{
          opacity: isDraggedDescendant ? 0.5 : 1,
          ...style,
        }}
      >
        <div className={styles.rowContents + (!canDrag ? ` ${styles.rowContentsDragDisabled} rstcustom__rowContentsDragDisabled` : '')}>
          <div className={`${styles.rowLabel} rstcustom__rowLabel`}>
            <span className={`${styles.rowTitle} rstcustom__rowTitle${node.subtitle ? ` ${styles.rowTitleWithSubtitle} rstcustom__rowTitleWithSubtitle` : ''}`}>
              {typeof nodeTitle === 'function'
                ? nodeTitle({
                  node,
                  path,
                  treeIndex,
                })
                : nodeTitle}
            </span>

            {nodeSubtitle && (
              <span className={`${styles.rowSubtitle} rstcustom__rowSubtitle`}>
                {typeof nodeSubtitle === 'function'
                  ? nodeSubtitle({
                    node,
                    path,
                    treeIndex,
                  })
                  : nodeSubtitle}
              </span>
            )}
          </div>

          <div className={`${styles.rowToolbar} rstcustom__rowToolbar`}>
            {buttons.map((btn, index) => (
              <div
                key={index} // eslint-disable-line react/no-array-index-key
                className={styles.toolbarButton}
              >
                {btn}
              </div>
            ))}
          </div>
        </div>
      </div>,
    );

    const renderButton = () => {
      let jsx = '';
      if (toggleChildrenVisibility) {
        // if (node.NODE_TYPE === 'F' || node.children && (node.children.length > 0 || typeof node.children === 'function')) {
        if ((node.children !== undefined && node.children != null && node.children.length > 0) || typeof node.children === 'function') {
          jsx = (
            <div>
              <button
                // 추가버튼명 ordinary (임시) / 가장 하위 목록일 시 버튼
                // rst__lineHalfHorizontalRight 전부 안보이도록
                // Marketing / Quality 는 위에 검은선 안보이는데 전사는 위에 검은선이 보임
                // 클릭 시 글자와 버튼 모두 같이 색상 변경
                type="button"
                aria-label={node.expanded ? 'Collapse' : 'Expand'}
                className={node.expanded ? `${styles.collapseButton} rstcustom__collapseButton` : `${styles.expandButton} rstcustom__expandButton`}
                style={{ left: -0.5 * scaffoldBlockPxWidth }}
                onClick={() =>
                  toggleChildrenVisibility({
                    node,
                    path,
                    treeIndex,
                  })
                }
              />

              {node.expanded && !isDragging && (
                <div
                  style={{ width: scaffoldBlockPxWidth }}
                  // className={styles.lineChildren}
                />
              )}
            </div>
          );
        } else {
          jsx = (
            <div>
              <button
                type="button"
                aria-label="ordinary"
                // className={styles.ordinaryButton}
                className={`${styles.ordinaryButton} rstcustom__ordinaryButton ${node.selectedIndex === node.key ? 'active' : `${node.selectedIndex}/${node.key}`}`}
                style={{ left: -0.5 * scaffoldBlockPxWidth }}
              />
            </div>
          );
        }
      }
      return jsx;
    };

    return (
      <div style={{ height: '100%' }} {...otherProps}>
        {renderButton()}
        <div className={styles.rowWrapper + (!canDrag ? ` ${styles.rowWrapperDragDisabled}` : '')}>
          {canDrag ? connectDragSource(nodeContent, { dropEffect: 'copy' }) : nodeContent}
        </div>
      </div>
    );
  }
}

CustomThemeNodeContentRenderer.defaultProps = {
  buttons: [],
  canDrag: false,
  canDrop: false,
  className: '',
  draggedNode: null,
  icons: [],
  isSearchFocus: false,
  isSearchMatch: false,
  parentNode: null,
  style: {},
  subtitle: null,
  swapDepth: null,
  swapFrom: null,
  swapLength: null,
  title: null,
  toggleChildrenVisibility: null,
  listIndex: 0,
  lowerSiblingCounts: [],
};

CustomThemeNodeContentRenderer.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node),
  canDrag: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  className: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.node),
  isSearchFocus: PropTypes.bool,
  isSearchMatch: PropTypes.bool,
  listIndex: PropTypes.number,
  lowerSiblingCounts: PropTypes.arrayOf(PropTypes.number),
  node: PropTypes.shape({}).isRequired,
  path: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  style: PropTypes.shape({}),
  subtitle: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  swapDepth: PropTypes.number,
  swapFrom: PropTypes.number,
  swapLength: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  toggleChildrenVisibility: PropTypes.func,
  treeIndex: PropTypes.number.isRequired,
  treeId: PropTypes.string.isRequired,

  // Drag and drop API functions
  // Drag source
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  didDrop: PropTypes.bool.isRequired,
  draggedNode: PropTypes.shape({}),
  isDragging: PropTypes.bool.isRequired,
  parentNode: PropTypes.shape({}), // Needed for dndManager
  // Drop target
  canDrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  isOver: PropTypes.bool.isRequired,
};

export default CustomThemeNodeContentRenderer;
