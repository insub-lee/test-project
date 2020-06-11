import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Button, Tooltip } from 'antd';
import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledSearchWrapper';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import Contents from 'components/BizBuilder/Common/Contents';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';
import { MULTI_DELETE_OPT_SEQ, LIST_NO_OPT_SEQ, EXCEL_DOWNLOAD_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import request from 'utils/request';
import { address, VIEW_TYPE, META_SEQ } from 'apps/eshs/admin/safety/InspectionTarget/FirePreAlarm/internal_constants';
import ViewPage from '../ViewPage';

const AntdModal = StyledModalWrapper(Modal);
const AntdTable = StyledAntdTable(Table);
const StyledButton = StyledAntdButton(Button);

const ListPage = props => {
  const [activateRegModal, setActivateRegModal] = useState(false);
  const [activateDetailModal, setActivateDetailModal] = useState(false);
  const [activateStatusModal, setActivateStatusModal] = useState(false);
  const [activateUsageModal, setActivateUsageModal] = useState(false);
  const [selectedTaskSeq, setSelectedTaskSeq] = useState(0);
  const [viewType, setViewType] = useState('');
  const [isSearched, setIsSearched] = useState(props.isSearched);
  const [isMultiDelete, setIsMultiDelete] = useState(false);
  const [isRowNo, setIsRowNo] = useState(false);
  const [rowClickable, setRowClickable] = useState(true);
  const [processedList, setProcessedList] = useState([]);
  // 엑셀다운로드 관련 state
  const [isExcelDown, setIsExcelDown] = useState(false);
  const [btnText, setExcelBtnText] = useState('');
  const [fileName, setExcelFileName] = useState('');
  const [sheetName, setExcelSheetName] = useState('');
  const [columns, setExcelColumns] = useState([]);
  const [fields, setExcelFields] = useState([]);

  useEffect(() => {
    const { viewSeq } = props;
    if (META_SEQ.MODAL_LIST === viewSeq) {
      setRowClickable(false);
    }
  }, []);

  useEffect(() => {
    if (props?.shouldSearchAll) {
      getListData(id, workSeq);
    }
  }, [props?.shouldSearchAll]);

  useEffect(() => {
    if (listData instanceof Array) {
      if (listData.length > 0) {
        if (props?.shouldSearchAll) {
          const temp = listData.map(e => {
            const splitedDT = e?.REG_DTTM.split(' ');
            return { ...e, REG_DTTM: splitedDT[0] };
          });
          setProcessedList(temp);
          setIsSearched(false);
        } else {
          const { QUARTER, INSPECTION_YEAR, IS_INSPECTED } = formData;
          if (QUARTER && INSPECTION_YEAR && isSearched) {
            request({
              method: 'POST',
              url: address.search,
              // FIRE_CODE: AL (Air Line Mask)
              data: { listData, QUARTER, INSPECTION_YEAR, IS_INSPECTED },
            }).then((response, error) => {
              if (!error) {
                const { result, data } = response.response || {};
                if (result === 1) {
                  setProcessedList(data);
                  setIsSearched(false);
                }
              }
            });
          }
        }
      } else {
        setProcessedList([]);
        setIsSearched(false);
      }
    }
  }, [props.listData]);

  // Builder OPT 설정적용 부분
  useEffect(() => {
    const { workInfo } = props;
    let isMultiDeleteTemp = false;
    let isRowNoTemp = false;
    // 엑셀 관련 Temps
    let isExcelDownTemp = false;
    let btnTextTemp = '';
    let fileNameTemp = '';
    let sheetNameTemp = '';
    let columnsTemp = [];
    let fieldsTemp = [];

    // Builder OPT forEach - 확인
    if (workInfo && workInfo.OPT_INFO) {
      workInfo.OPT_INFO.forEach(opt => {
        if (opt.OPT_SEQ === MULTI_DELETE_OPT_SEQ && opt.ISUSED === 'Y') isMultiDeleteTemp = true;
        if (opt.OPT_SEQ === LIST_NO_OPT_SEQ && opt.ISUSED === 'Y') isRowNoTemp = true;
        if (opt.OPT_SEQ === EXCEL_DOWNLOAD_OPT_SEQ && opt.ISUSED === 'Y') {
          isExcelDownTemp = true;
          if (isJSON(opt.OPT_VALUE)) {
            const ObjOptVal = JSON.parse(opt.OPT_VALUE);
            const { columnInfo } = ObjOptVal;
            btnTextTemp = ObjOptVal.btnTitle || '엑셀받기';
            fileNameTemp = ObjOptVal.fileName || 'excel';
            sheetNameTemp = ObjOptVal.sheetName || 'sheet1';
            columnsTemp = columnInfo.columns || [];
            fieldsTemp = columnInfo.fields || [];
          }
        }
      });
      setIsMultiDelete(isMultiDeleteTemp);
      setIsRowNo(isRowNoTemp);
      setIsExcelDown(isExcelDownTemp);
      setExcelBtnText(btnTextTemp);
      setExcelFileName(fileNameTemp);
      setExcelSheetName(sheetNameTemp);
      setExcelColumns(columnsTemp);
      setExcelFields(fieldsTemp);
    }
  }, []);

  function clickRegister() {
    setActivateRegModal(true);
    setSelectedTaskSeq(-1);
  }

  function clickStatus() {
    setActivateStatusModal(true);
    setSelectedTaskSeq(-1);
  }

  function clickUsage() {
    setActivateUsageModal(true);
    setSelectedTaskSeq(-1);
  }

  const openRegModal = (changedSagaKey, taskSeq) => {
    /* 
      changedSagaKey: modal쓰려고 바꾼 sagaKey, modal${id}
      taskSeq: 글 번호, INPUT 할 땐 -1, 나머지는 onRow{onClick}
      viewType: INPUT, MODIFY, VIEW
    */
    const { workSeq, sagaKey, CustomButtons } = props;

    return [
      <BizBuilderBase
        key={`${changedSagaKey}_MODAL_INPUT`}
        sagaKey={`${changedSagaKey}_MODAL_INPUT`}
        workSeq={workSeq} // metadata binding
        viewType={VIEW_TYPE.INPUT}
        taskSeq={taskSeq} // data binding
        onCloseModalHandler={() => setActivateRegModal(false)}
        baseSagaKey={sagaKey}
        InputCustomButtons={CustomButtons?.InputButtons}
      />,
      <BizBuilderBase
        key={`${changedSagaKey}_MODAL_LIST`}
        sagaKey={`${changedSagaKey}_MODAL_LIST`}
        workSeq={workSeq}
        viewType={VIEW_TYPE.LIST}
        taskSeq={taskSeq}
        CustomListPage={ListPage}
        onCloseModalHandler={() => setActivateRegModal(false)}
        baseSagaKey={sagaKey}
        listMetaSeq={META_SEQ.MODAL_LIST} // meta SEQ
        shouldSearchAll
        isSearched
      />,
    ];
  };

  const openStatusModal = (changedSagaKey, taskSeq) => {
    const { workSeq, sagaKey, CustomButtons } = props;
    return (
      <BizBuilderBase
        key={`${changedSagaKey}_MODAL_DETAIL`}
        sagaKey={`${changedSagaKey}_MODAL_DETAIL`}
        workSeq={workSeq} // metadata binding
        viewType={VIEW_TYPE.VIEW}
        taskSeq={taskSeq} // data binding
        onCloseModalHandler={() => setActivateStatusModal(false)}
        viewMetaSeq={META_SEQ.VIEW_STATUS}
        baseSagaKey={sagaKey}
        ViewCustomButtons={CustomButtons?.ViewHistory}
        CustomViewPage={ViewPage}
      />
    );
  };
  const openUsageModal = (changedSagaKey, taskSeq) => {
    const { workSeq, sagaKey, CustomButtons } = props;
    return (
      <BizBuilderBase
        key={`${changedSagaKey}_MODAL_DETAIL`}
        sagaKey={`${changedSagaKey}_MODAL_DETAIL`}
        workSeq={workSeq} // metadata binding
        viewType={VIEW_TYPE.LIST}
        taskSeq={taskSeq} // data binding
        onCloseModalHandler={() => setActivateUsageModal(false)}
        listMetaSeq={META_SEQ.LIST_USAGE_SEARCH}
        baseSagaKey={sagaKey}
        ListCustomButtons={CustomButtons?.ViewHistory}
        useExcelDownload={false}
      />
    );
  };

  const openDetailModal = (changedSagaKey, taskSeq) => {
    const { workSeq, sagaKey, CustomButtons } = props;

    return (
      <BizBuilderBase
        key={`${changedSagaKey}_MODAL_DETAIL`}
        sagaKey={`${changedSagaKey}_MODAL_DETAIL`}
        workSeq={workSeq} // metadata binding
        viewType={VIEW_TYPE.VIEW}
        taskSeq={taskSeq} // data binding
        onCloseModalHandler={() => setActivateDetailModal(false)}
        viewMetaSeq={META_SEQ.VIEW_BASIC}
        baseSagaKey={sagaKey}
        ViewCustomButtons={CustomButtons?.DetailButtons}
        CustomViewPage={ViewPage}
        ModifyCustomButtons={CustomButtons?.ModifyButtons}
      />
    );
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
    setSelectedTaskSeq(taskSeq);
    setActivateDetailModal(true);
    // setViewType('View');
  };

  const renderList = (group, groupIndex) => {
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
            dataSource={processedList || []}
            // LOCATION_DESC
            onRow={record => ({
              onClick: () => (rowClickable ? handleRowClick(record.TASK_SEQ) : null),
            })}
          />
        </Group>
      </div>
    );
  };

  const modalTitle = () => {
    if (activateRegModal) return 'Pre Action & Alarm Valve 신규등록';
    if (activateDetailModal) return 'Pre Action & Alarm Valve 점검';
    if (activateUsageModal) return 'Pre Action & Alarm Valve 사용/미사용 등록';
    return '';
  };

  const {
    CustomButtons,
    sagaKey: id,
    viewLayer,
    formData,
    workFlowConfig,
    loadingComplete,
    viewPageData,
    changeViewPage,
    getListData,
    workSeq,
    listData,
  } = props;
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
                <StyledSearchWrapper key={group.key}>
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
                          className="btn-gray btn-first"
                          onClick={() => {
                            getListData(id, workSeq);
                            setIsSearched(true);
                          }}
                        >
                          검색
                        </StyledButton>
                        {ViewButtons && <ViewButtons {...props} clickStatus={clickStatus} clickUsage={clickUsage} clickRegister={clickRegister} />}
                        {processedList && processedList.length > 0 && isExcelDown && (
                          <ExcelDownloadComp
                            isBuilder={false}
                            fileName={fileName || 'excel'}
                            className="workerExcelBtn"
                            btnText={btnText || '엑셀받기'}
                            sheetName={sheetName || 'sheet1'}
                            columns={columns || []}
                            fields={fields || []}
                            listData={processedList || []}
                          />
                        )}
                      </div>
                    )}
                  </Group>
                </StyledSearchWrapper>
              )
            );
          })}
          <AntdModal
            title={modalTitle()}
            width="80%"
            visible={activateRegModal || activateDetailModal || activateStatusModal || activateUsageModal}
            footer={null}
            destroyOnClose
            onCancel={() => {
              if (activateRegModal) setActivateRegModal(false);
              if (activateDetailModal) setActivateDetailModal(false);
              if (activateUsageModal) setActivateUsageModal(false);
            }}
          >
            {activateRegModal && openRegModal(`modal${id}`, selectedTaskSeq)}
            {activateDetailModal && openDetailModal(`modal${id}`, selectedTaskSeq)}
            {activateUsageModal && openUsageModal(`modal${id}`, selectedTaskSeq)}
          </AntdModal>
        </Sketch>
      </StyledViewDesigner>
    );
  }
  return '';
};

ListPage.propTypes = {
  listData: PropTypes.array,
};
ListPage.defaultProps = {};

export default ListPage;
