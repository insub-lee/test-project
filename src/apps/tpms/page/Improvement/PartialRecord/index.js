import React from 'react';

import GlobalStyle from '../../../components/GlobalStyle';
import Spin from '../../../components/AntdSpinner';
import Button from '../../../components/Button';
import TitleContainerWithSub from '../../../components/TitleContainerWithSub';
import DatePicker from '../../../components/FormPreview/DatePicker';
import RadioGroup from '../../../components/FormPreview/RadioGroup';
import CheckboxGroup from '../../../components/FormPreview/CheckboxGroup';

import StyledForm from './StyledForm';
import { ReportDetail } from './ReportDetail';

import { useHooks } from './useHooks';
import useAuth from '../../../hooks/useAuth';

/**
 * TPMS - 개선활동 - 조회 - 부분별조회
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '개선활동' }, { title: '조회' }, { title: '부분별조회' }];

const PartialRecord = () => {
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();

  const {
    isLoading,
    showDetail,
    headQuarts,
    part,
    projectlevel,
    optionPjtType,
    optionTerm,
    team,
    selectorFab,
    selectorArea,
    selectorKeyno,
    selectorModel,
    searchType,
    detailRequestQuery,
    expandableContainerRef,
    status,
    action: { submitData, fetchTeam, setFab, setArea },
  } = useHooks();

  return (
    <div className="tpms-view">
      <Spin spinning={isAuthLoading || isLoading}>
        <TitleContainerWithSub
          title="개선활동 - 조회"
          nav={nav}
          useCollapsed
          ref={expandableContainerRef}
          mainbody={
            <StyledForm onSubmit={e => submitData(e)}>
              <ul className="sub_form small2">
                <li className="flCustom width33">
                  <label className="title" htmlFor="headQuarts">
                    본부
                  </label>
                  <select name="headQuarts" id="headQuarts">
                    {headQuarts.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </li>
                <li className="flCustom width33">
                  <label className="title" htmlFor="part">
                    담당
                  </label>
                  <select
                    name="part"
                    id="part"
                    onChange={e => {
                      e.preventDefault();
                      fetchTeam();
                    }}
                  >
                    <option value="all">전체</option>
                    {part.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </li>
                <li className="flCustom width33 marginNone">
                  <label className="title" htmlFor="team">
                    팀
                  </label>
                  <select name="team" id="team">
                    <option value="all">전체</option>
                    {team.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </li>

                <li className="flCustom width50">
                  <div className="title">Project Type</div>
                  <div className="radio">
                    <RadioGroup name={optionPjtType.name} values={optionPjtType.values} />
                  </div>
                </li>
                <li className="frCustom width50 marginNone">
                  <label className="title" htmlFor="projectLevel">
                    Project Level
                  </label>
                  <div className="checkbox">
                    <CheckboxGroup name={projectlevel.name} values={projectlevel.values} />
                  </div>
                </li>

                <li className="flCustom width50">
                  <label className="title" htmlFor="status">
                    상태
                  </label>
                  <select name="status" id="status">
                    {status.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </li>
                <li className="frCustom width50 marginNone">
                  <div className="title">기간</div>
                  <DatePicker label={optionTerm.label} values={optionTerm.values} />
                </li>

                <li className="">
                  <div className="title">장비</div>
                  <ul className="sub_form small2">
                    <li className="w100">
                      <label className="title" htmlFor="select6">
                        FAB
                      </label>
                      <select
                        name="fab"
                        id="fab"
                        onChange={e => {
                          setFab(e.target.value);
                        }}
                      >
                        <option value="all">전체</option>
                        {selectorFab.map(option => (
                          <option value={option.cd}>{`${option.cdnm}`}</option>
                        ))}
                      </select>
                    </li>
                    <li className="">
                      <label className="title" htmlFor="select7">
                        AREA
                      </label>
                      <select
                        name="area"
                        id="area"
                        onChange={e => {
                          setArea(e.target.value);
                        }}
                      >
                        <option value="all">전체</option>
                        {selectorArea.map(option => (
                          <option value={option.cd}>{`${option.cdnm}`}</option>
                        ))}
                      </select>
                    </li>
                    <li>
                      <label className="title" htmlFor="select8">
                        keyNo
                      </label>
                      <select name="keyno" id="keyno">
                        <option value="all">전체</option>
                        {selectorKeyno.map(option => (
                          <option value={option.cd}>{`${option.cdnm}`}</option>
                        ))}
                      </select>
                    </li>
                    <li>
                      <label className="title" htmlFor="select2">
                        Model
                      </label>
                      <select name="model" id="model">
                        <option value="all">전체</option>
                        {selectorModel.map(option => (
                          <option value={option.cd}>{`${option.cdnm}`}</option>
                        ))}
                      </select>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="btn_wrap">
                <Button type="submit" color="primary">
                  검색하기
                </Button>
              </div>
            </StyledForm>
          }
          subbody={
            showDetail && (
              <ReportDetail
                key={detailRequestQuery?.searchKey}
                enableFixView={() => {}}
                disableFixView={() => {}}
                requestQuery={detailRequestQuery}
                userid={authInfo?.empNo || ''}
              />
            )
          }
        />
      </Spin>
      <GlobalStyle />
    </div>
  );
};

export default PartialRecord;
