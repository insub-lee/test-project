import React from 'react';

import { v4 as uuid } from 'uuid';
import GlobalStyle from '../../../components/GlobalStyle';
import TitleContainerWithSub from '../../../components/TitleContainerWithSub';
import DatePicker from '../../../components/FormPreview/DatePicker';
import StyledCommonForm from '../../../components/CommonStyledElement/StyledCommonForm';
import Button from '../../../components/Button';
import SubActionChartBody from './SubActionChartBody';
import SubActionDataBody from './SubActionDataBody';
import SubRegistChartBody from './SubRegistChartBody';
import SubRegistDataBody from './SubRegistDataBody';

import useHooks from './useHooks';

/**
 * TPMS - 개선요청활동(생산) - AREA별
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '개선요청활동생산' }, { title: 'AREA별' }];

const InfoByArea = () => {
  const {
    location,
    type,
    optionTerm,
    viewType,
    viewFilter,
    actionData,
    actionTrendInfo,
    registData,
    total,
    registTrendInfo,
    action: { handleReportDown, enableExpandedView, disableExpandedView, submitData },
  } = useHooks();

  return (
    <div className="tpms-view">
      <TitleContainerWithSub
        title="개선요청활동(생산)"
        nav={nav}
        mainbody={
          <StyledCommonForm onSubmit={submitData} autoComplete="off">
            <ul className="sub_form small2">
              <li className="half fl">
                <label className="title" htmlFor="location">
                  지역
                </label>
                <select
                  name="location"
                  id="location"
                  // onChange={this.handleChangeFilter}
                >
                  <option key={uuid()} value="">
                    ALL
                  </option>

                  {location.map(option => (
                    <option key={uuid()} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </li>
              <li className="half fr">
                <label className="title" htmlFor="type">
                  분류
                </label>
                <select
                  name="type"
                  id="type"
                  className="select_tab"
                  // onChange={this.handleChangeType}
                >
                  {type.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </li>
              <li className="half fl">
                <div className="title">기간</div>
                <DatePicker label={optionTerm.label} values={optionTerm.values} />
              </li>
            </ul>
            <div className="mb30 cr" />
            <div className="btn_wrap">
              <Button type="submit" color="primary">
                검색
              </Button>
              {/* {viewType !== 'none' && (
                <Button type="button" color="default" onClick={handleReportDown}>
                  엑셀받기
                </Button>
              )} */}
            </div>
          </StyledCommonForm>
        }
        subbody={
          <>
            {viewType === 'action' && (
              <>
                <SubActionDataBody
                  enableFixView={enableExpandedView}
                  disableFixView={disableExpandedView}
                  viewFilter={viewFilter}
                  actionData={actionData}
                />
                <SubActionChartBody
                  enableFixView={enableExpandedView}
                  disableFixView={disableExpandedView}
                  actionTrendInfo={actionTrendInfo}
                />
              </>
            )}
            {viewType === 'registration' && (
              <>
                <SubRegistDataBody
                  enableFixView={enableExpandedView}
                  disableFixView={disableExpandedView}
                  viewFilter={viewFilter}
                  registData={registData}
                  totalData={total}
                />
                <SubRegistChartBody
                  enableFixView={enableExpandedView}
                  disableFixView={disableExpandedView}
                  registTrendInfo={registTrendInfo}
                />
              </>
            )}
          </>
        }
      />
      <GlobalStyle />
    </div>
  );
};

export default InfoByArea;
