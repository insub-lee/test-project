import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'antd';

import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import BizBuilderBase from 'components/BizBuilderBase';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import Contents from 'components/BizBuilder/Common/Contents';
import { MULTI_DELETE_OPT_SEQ, LIST_NO_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import request from 'utils/request';

import { address, VIEW_TYPE, META_SEQ } from 'apps/eshs/admin/safety/InspectionTarget/internal_constants';

const AntdTable = StyledAntdTable(Table);

function ListPage(props) {
  const [activeModel, setActiveModel] = useState(false);
  const [selectedTaskSeq, setSelectedTaskSeq] = useState(0);
  const [viewType, setViewType] = useState('');
  const [isSearched, setIsSearched] = useState(props.isSearched);
  const [isMultiDelete, setIsMultiDelete] = useState(false);
  const [isRowNo, setIsRowNo] = useState(false);

  useEffect(() => {
    if (isSearched) {
      const { sagaKey: id, workSeq, formData } = props;
      getListData(id, workSeq);
    }
  }, [isSearched]);

  // saveTask // C
  // modifyTask // U
  // deleteTask // D
  //
  // useEffect(() => {
  //   request({
  //     method: 'GET',
  //     url: `${address.selectAllData}`,
  //   }).then(({ response }) => {
  //     console.info('@@@ res : ', response);
  //   });
  // }, []);

  useEffect(() => {
    const { workInfo } = props;
    let isMultiDelete = false;
    let isRowNo = false;
    if (workInfo && workInfo.OPT_INFO) {
      workInfo.OPT_INFO.forEach(opt => {
        if (opt.OPT_SEQ === MULTI_DELETE_OPT_SEQ && opt.ISUSED === 'Y') isMultiDelete = true;
        if (opt.OPT_SEQ === LIST_NO_OPT_SEQ && opt.ISUSED === 'Y') isRowNo = true;
      });
      setIsMultiDelete(isMultiDelete);  
      setIsRowNo(isRowNo);
    }
  }, []);

  function clickRegister() {
    setActiveModel(true);
    setSelectedTaskSeq(-1);
  }

  const openModal = (changedSagaKey, taskSeq) => {
    /* 
      changedSagaKey: modal쓰려고 바꾼 sagaKey, modal${id}
      taskSeq: 글 번호, INPUT 할 땐 -1, 나머지는 onRow{onClick}
      viewType: INPUT, MODIFY, VIEW
    */
    const { workSeq, sagaKey, CustomButtons, loadingComplete } = props;
    const { InputButtons } = CustomButtons;

    return [
      <BizBuilderBase
        key={`${changedSagaKey}_MODAL_INPUT`}
        sagaKey={`${changedSagaKey}_MODAL_INPUT`}
        workSeq={workSeq} // metadata binding
        viewType={VIEW_TYPE.INPUT}
        taskSeq={taskSeq} // data binding
        onCloseModleHandler={() => setActiveModel(false)}
        baseSagaKey={sagaKey}
        CustomButtons={InputButtons}
      />,
      <BizBuilderBase
        key={`${changedSagaKey}_MODAL_LIST`}
        sagaKey={`${changedSagaKey}_MODAL_LIST`}
        workSeq={workSeq}
        viewType={VIEW_TYPE.LIST}
        taskSeq={taskSeq}
        CustomListPage={ListPage}
        onCloseModleHandler={() => setActiveModel(false)}
        baseSagaKey={sagaKey}
        listMetaSeq={META_SEQ.LIST} // meta SEQ
        isSearched
      />,
    ];
  };

  const renderComp = (comp, colData, visible, rowClass, colClass, isSearch) => {
    if (comp.CONFIG.property.COMP_SRC && comp.CONFIG.property.COMP_SRC.length > 0 && CompInfo[comp.CONFIG.property.COMP_SRC]) {
      return CompInfo[comp.CONFIG.property.COMP_SRC].renderer({
        ...comp,
        colData,
        ...props,
        visible,
        rowClass,
        colClass,
        isSearch,
      });
    }
    return <div />;
  };

  const renderCompRow = (comp, colData, rowData, visible) => {
    if (comp.CONFIG.property.COMP_SRC && comp.CONFIG.property.COMP_SRC.length > 0 && CompInfo[comp.CONFIG.property.COMP_SRC]) {
      return CompInfo[comp.CONFIG.property.COMP_SRC].renderer({
        ...comp,
        colData,
        rowData,
        ...props,
        visible,
      });
    }
    return <div />;
  };

  const setColumns = cols => {
    const columns = [];
    if (isRowNo) {
      columns.push({
        dataIndex: 'RNUM',
        title: 'No.',
      });
    }
    cols.forEach(node => {
      if (node.comp && node.comp.COMP_FIELD) {
        columns.push({
          dataIndex: node.comp.CONFIG.property.viewDataKey || node.comp.COMP_FIELD,
          title: node.comp.CONFIG.property.HEADER_NAME_KOR,
          width: node.style.width,
          render: (text, record) => renderCompRow(node.comp, text, record, true),
        });
      }
    });
    return columns;
  };

  const handleRowClick = taskSeq => {
    // setActiveModel(true);
    // setSelectedTaskSeq(taskSeq);
    // setViewType('View');
  };

  function renderList(group, groupIndex) {
    if (isSearched) {
      const { listData, sagaKey: id, changeFormData, COMP_FIELD } = props;
      const columns = setColumns(group.rows[0].cols);
      return (
        <div key={group.key}>
          {group.useTitle && <GroupTitle title={group.title} />}
          <Group key={group.key} className={`view-designer-group group  -${groupIndex}`}>
            <AntdTable
              rowKey="TASK_SEQ"
              key={`${group.key}_list`}
              className="view-designer-list"
              columns={columns}
              dataSource={listData || []}
              onRow={record => ({
                onClick: () => handleRowClick(record.TASK_SEQ),
              })}
            />
          </Group>
        </div>
      );
    }
    return null;
  }

  const { CustomButtons, sagaKey: id, viewLayer, formData, workFlowConfig, loadingComplete, viewPageData, changeViewPage, getListData, workSeq } = props;
  const { ViewButtons } = CustomButtons || false;
  if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
    const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
    const {
      layer: { groups },
      bodyStyle,
    } = viewLayerData;
    const {
      info: { PRC_ID },
    } = workFlowConfig;

    return (
      <StyledViewDesigner>
        <Sketch {...bodyStyle}>
          {groups.map((group, groupIndex) => {
            if (group.type === 'listGroup') {
              return renderList(group, groupIndex);
            }
            return (
              (group.type === 'group' || (group.type === 'searchGroup' && group.useSearch)) && (
                <div key={group.key}>
                  {group.useTitle && <GroupTitle title={group.title} />}
                  <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
                    <div className={group.type === 'searchGroup' ? 'view-designer-group-search-wrap' : ''}>
                      <table className={`view-designer-table table-${groupIndex}`}>
                        <tbody>
                          {group.rows.map((row, rowIndex) => (
                            <tr key={row.key} className={`view-designer-row row-${rowIndex}`}>
                              {row.cols &&
                                row.cols.map((col, colIndex) => (
                                  <td
                                    key={col.key}
                                    {...col}
                                    comp=""
                                    colSpan={col.span}
                                    className={`view-designer-col col-${colIndex}${col.className && col.className.length > 0 ? ` ${col.className}` : ''}`}
                                  >
                                    <Contents>
                                      {col.comp &&
                                        renderComp(
                                          col.comp,
                                          col.comp.COMP_FIELD ? formData[col.comp.COMP_FIELD] : '',
                                          true,
                                          `${viewLayer[0].COMP_FIELD}-${groupIndex}-${rowIndex}`,
                                          `${viewLayer[0].COMP_FIELD}-${groupIndex}-${rowIndex}-${colIndex}`,
                                          group.type === 'searchGroup',
                                        )}
                                    </Contents>
                                  </td>
                                ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {group.type === 'searchGroup' && group.useSearch && (
                      <div className="view-designer-group-search-btn-wrap">
                        <StyledButton
                          className="btn-primary"
                          onClick={() => {
                            getListData(id, workSeq);
                            setIsSearched(true);
                          }}
                        >
                          Search
                        </StyledButton>
                      </div>
                    )}
                  </Group>
                </div>
              )
            );
          })}
          {ViewButtons && <ViewButtons {...props} clickRegister={clickRegister} />}
          <Modal visible={activeModel} closable onCancel={() => setActiveModel(false)} width={900} footer={null}>
            <div>{activeModel && openModal(`modal${id}`, selectedTaskSeq)}</div>
          </Modal>
        </Sketch>
      </StyledViewDesigner>
    );
  }
}

ListPage.propTypes = {};
ListPage.defaultProps = {};

export default ListPage;
