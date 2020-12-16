import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Spin } from 'antd';
import ReactTooltip from 'react-tooltip';
import Button from '../../../../components/Button';
import GridContainer from '../../../../components/GridContainer';
import GridBox from '../../../../components/Dashboard/GridBox';
import SignTotal from '../../../../components/Dashboard/BuiltChart/SignTotal';
import GroupAndTeam from '../../../../components/Dashboard/BuiltChart/GroupAndTeam';
import MonthlyTransition from '../../../../components/Dashboard/BuiltChart/MonthlyTransition';
import StyledDetail from '../StyledDetail';

import useHooks from './useHooks';

const getRowSpan = (list, row, key) => list.filter(item => item[key] === row[key]).length || 1;

const getDpnmGroup = (list, row, rowIndex) => {
  const { mdpcd, mdpnm, sdpcd, sdpnm, dpcd, dpnm } = row;
  const typeChecker = [mdpcd === sdpcd ? '1' : '0', sdpcd === dpcd ? '1' : '0'];
  const children = [];
  switch (typeChecker.join('')) {
    case '11':
      if (rowIndex === 0 || (rowIndex > 0 && list[rowIndex - 1].mdpcd !== row.mdpcd)) {
        children.push(
          <td colSpan={3} rowSpan={getRowSpan(list, row, 'mdpcd')}>
            {mdpnm}
          </td>,
        );
      }
      break;
    case '10':
      if (rowIndex === 0 || (rowIndex > 0 && list[rowIndex - 1].mdpcd !== row.mdpcd)) {
        children.push(
          <td colSpan={2} rowSpan={getRowSpan(list, row, 'mdpcd')}>
            {mdpnm}
          </td>,
        );
      }
      if (rowIndex === 0 || (rowIndex > 0 && list[rowIndex - 1].dpcd !== row.dpcd)) {
        children.push(<td rowSpan={getRowSpan(list, row, 'dpcd')}>{dpnm}</td>);
      }
      break;
    case '01':
      if (rowIndex === 0 || (rowIndex > 0 && list[rowIndex - 1].mdpcd !== row.mdpcd)) {
        children.push(<td rowSpan={getRowSpan(list, row, 'mdpcd')}>{mdpnm}</td>);
      }
      if (rowIndex === 0 || (rowIndex > 0 && list[rowIndex - 1].sdpcd !== row.sdpcd)) {
        children.push(
          <td colSpan={2} rowSpan={getRowSpan(list, row, 'sdpcd')}>
            {sdpnm}
          </td>,
        );
      }
      break;
    case '00':
    default:
      if (rowIndex === 0 || (rowIndex > 0 && list[rowIndex - 1].mdpcd !== row.mdpcd)) {
        children.push(<td rowSpan={getRowSpan(list, row, 'mdpcd')}>{mdpnm}</td>);
      }
      if (rowIndex === 0 || (rowIndex > 0 && list[rowIndex - 1].sdpcd !== row.sdpcd)) {
        children.push(<td rowSpan={getRowSpan(list, row, 'sdpcd')}>{sdpnm}</td>);
      }
      if (rowIndex === 0 || (rowIndex > 0 && list[rowIndex - 1].dpcd !== row.dpcd)) {
        children.push(<td rowSpan={getRowSpan(list, row, 'dpcd')}>{dpnm}</td>);
      }
  }
  return children;
};

const RecordReportDetail = ({ requestQuery, authInfo, enableFixView, disableFixView }) => {
  const {
    isLoading,
    isExpanded,
    list,
    tooltipList,
    count: {
      totRegcnt,
      totSavecnt,
      totDropcnt,
      totDelaycnt,
      totProgresscnt,
      totFinishcnt,
      totRegfinishcnt,
      totProgress1,
      totProgress2,
      totProgress3,
      totProgress4,
      totProgress5,
    },
    actions: { handleReportDown, downloadAll, toggleExpanded, handleTooltip, loadModal },
  } = useHooks({ requestQuery, authInfo, enableFixView, disableFixView });

  const { startDate, endDate, stdDate, headQuartsLabel, prjTypeLabel, prjLvlLabels } = requestQuery;
  return (
    <StyledDetail className={`${isExpanded ? 'expanded' : ''}`}>
      <div className="sub_wrap">
        <div className="sub_tit2">
          <span className="small">
            조건 : &nbsp;&nbsp;
            {`${headQuartsLabel || ''}`} &nbsp;&nbsp;
            {`${prjTypeLabel || ''}`} &nbsp;&nbsp;
            {`${prjLvlLabels || ''}`} &nbsp;&nbsp;
            {`${stdDate || ''}`}
            <br />
            기간 : &nbsp;&nbsp; {`${startDate} ~ ${endDate}`}
          </span>
          <div className="btn_wrap">
            <button type="button" className={`icon icon_arr_big ${isExpanded ? 'on' : ''}`} onClick={toggleExpanded}>
              축소/확대
            </button>
          </div>
        </div>
        <div className="sub_line" />
        <div className="sub_tit2 bg">
          <span className="big">총 건수</span>
          <span className="line" />
          <span className="col">{totRegcnt + totSavecnt} 건</span>
          <div className="btn_wrap">
            <Button type="button" color="gray" size="small" onClick={handleReportDown}>
              엑셀
            </Button>
            <Button type="button" color="gray" size="small" onClick={downloadAll}>
              출력
            </Button>
          </div>
        </div>
        <div className="sub_con">
          <div className="tb_wrap mb30">
            <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
              <table className="tb02 wb">
                <colgroup>
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                  <col width="5.8%" />
                </colgroup>
                <thead>
                  <tr className="bd">
                    <th colSpan="3" rowSpan="3">
                      부 문
                    </th>
                    <th colSpan="6">진행현황</th>
                    <th rowSpan="3">일정준수율(정상 vs (정상+지연))</th>
                    <th rowSpan="3">완료율(완료수/등록수)</th>
                    <th colSpan="6">단계별 진척현황</th>
                  </tr>
                  <tr className="bd">
                    <th rowSpan="2">등록</th>
                    <th rowSpan="2">등록중</th>
                    <th rowSpan="2">삭제</th>
                    <th colSpan="2">진행</th>
                    <th rowSpan="2">완료</th>
                    <th rowSpan="2">등록완료</th>
                    <th rowSpan="2">현황/발생보고</th>
                    <th rowSpan="2">측정/원인</th>
                    <th rowSpan="2">분석/대책</th>
                    <th rowSpan="2">개선</th>
                    <th rowSpan="2">관리/공유</th>
                  </tr>
                  <tr className="bd">
                    <th>지연</th>
                    <th>정상</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bd">
                    <th colSpan="3">전체(Total)</th>
                    <td>{totRegcnt}</td>
                    <td>{totSavecnt}</td>
                    <td>{totDropcnt}</td>
                    <td>{totDelaycnt}</td>
                    <td>{totProgresscnt}</td>
                    <td>{totFinishcnt}</td>
                    <td>{totProgresscnt + totDelaycnt === 0 ? 0 : ((totProgresscnt / (totProgresscnt + totDelaycnt)) * 100).toFixed(2)} %</td>
                    <td>{totFinishcnt === 0 ? 0 : ((totFinishcnt / totRegcnt) * 100).toFixed(2)} %</td>
                    <td>{totRegfinishcnt}</td>
                    <td>{totProgress1}</td>
                    <td>{totProgress2}</td>
                    <td>{totProgress3}</td>
                    <td>{totProgress4}</td>
                    <td>{totProgress5}</td>
                  </tr>
                  {list.map((item, rowIndex) => (
                    <tr className="bd" key={item.dpnm}>
                      {getDpnmGroup(list, item, rowIndex)}
                      {item.counts.map((count, index) => {
                        if (count.value === 0 || `${count.value}`.includes('%') || (index > 5 && index < 9)) {
                          return <td>{count.value}</td>;
                        }
                        return (
                          <td>
                            <span
                              className="tootip"
                              data-tip
                              data-for={`${rowIndex}_${index}`}
                              onClick={() => {
                                if (index < 6 || index > 8) {
                                  loadModal(count.key, count.dpcd, rowIndex, index);
                                }
                              }}
                            >
                              {count.value}
                            </span>
                            {(index < 6 || index > 8) && (
                              <ReactTooltip
                                id={`${rowIndex}_${index}`}
                                type="dark"
                                afterShow={
                                  tooltipList.length > 0 && (index > 8 ? !tooltipList[rowIndex][index - 3].checked : !tooltipList[rowIndex][index].checked)
                                    ? () => handleTooltip(count.key, count.dpcd, rowIndex, index)
                                    : null
                                }
                              >
                                <Spin
                                  indicator={<Icon type="loading" spin style={{ color: 'white' }} />}
                                  spinning={index > 8 ? tooltipList?.[rowIndex]?.[index - 3]?.isLoading : tooltipList?.[rowIndex]?.[index]?.isLoading}
                                >
                                  {index > 8 ? (
                                    <ul style={{ minHeight: 50, textAlign: 'left' }}>
                                      {(tooltipList?.[rowIndex]?.[index - 3]?.list || []).map(tooltip => (
                                        <li key={tooltip.project_id}>{`${tooltip.project_id} :: ${tooltip.project_title}`}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <ul style={{ minHeight: 50, textAlign: 'left' }}>
                                      {(tooltipList?.[rowIndex]?.[index]?.list || []).map(tooltip => (
                                        <li key={tooltip.project_id}>{`${tooltip.project_id} :: ${tooltip.project_title}`}</li>
                                      ))}
                                    </ul>
                                  )}
                                </Spin>
                              </ReactTooltip>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Spin>
          </div>
          <br />
          <GridContainer className="grid">
            <GridBox size={3}>
              <section>
                <SignTotal requestQuery={requestQuery} isDev />
              </section>
            </GridBox>
            <GridBox size={3}>
              <section>
                <MonthlyTransition requestQuery={requestQuery} isDev />
              </section>
            </GridBox>
            <GridBox size={4}>
              <section>
                <GroupAndTeam requestQuery={requestQuery} />
              </section>
            </GridBox>
          </GridContainer>
        </div>
      </div>
    </StyledDetail>
  );
};

RecordReportDetail.propTypes = {
  requestQuery: PropTypes.object.isRequired,
  authInfo: PropTypes.object.isRequired,
  enableFixView: PropTypes.func,
  disableFixView: PropTypes.func,
};

RecordReportDetail.defaultProps = {
  enableFixView: () => {},
  disableFixView: () => {},
};

export default RecordReportDetail;
