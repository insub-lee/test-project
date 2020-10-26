import React from 'react';
import { Select } from 'antd';

import GlobalStyle from '../../../components/GlobalStyle';
import Spin from '../../../components/AntdSpinner';
import TitleContainerWithSub from '../../../components/TitleContainerWithSub';
import DatePicker from '../../../components/FormPreview/DatePicker';
import RadioGroup from '../../../components/FormPreview/RadioGroup';
import Button from '../../../components/Button';

import StyledForm from '../PartialRecord/StyledForm';
import { PersonalReportDetail } from './PersonalReportDetail';

import { useHooks } from './useHooks';
import useAuth from '../../../hooks/useAuth';

/**
 * TPMS - 개선활동 - 실적조회 - 개인별실적
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '개선활동' }, { title: '실적조회' }, { title: '개인별실적' }];

const PersonalRecord = () => {
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();
  const {
    isLoading,
    expandableContainerRef,
    selectorFab,
    empNo,
    selectorArea,
    selectorKeyno,
    selectorModel,
    selectedOption,
    options,
    isLoadingOptions,
    showDetail,
    detailRequestQuery,
    optionTerm,
    optionPjtType,
    action: { submitData, handleChangeEmployee, getUsers, setFab, setArea },
  } = useHooks({ authInfo, isAuthLoading, isAuthError });

  return (
    <div className="tpms-view">
      <Spin spinning={isAuthLoading || isLoading}>
        <TitleContainerWithSub
          title="개선활동 - 실적조회"
          nav={nav}
          useCollapsed
          ref={expandableContainerRef}
          mainbody={
            <StyledForm onSubmit={submitData}>
              <ul className="sub_form small2">
                <li className="flCustom width50">
                  <label className="title" htmlFor="userId">
                    사원명
                  </label>
                  <input type="hidden" name="empNo" value={empNo} />
                  <Select
                    style={{ width: 300, border: '1px', borderColor: '#d9d9d9', boxShadow: 'none', marginTop: '7px' }}
                    showSearch
                    value={{ key: selectedOption.length > 0 ? selectedOption[0].key : '' }}
                    labelInValue
                    placeholder="사원명을 입력해주세요."
                    onChange={e => {
                      handleChangeEmployee(e);
                    }}
                    onSearch={() => {
                      getUsers();
                    }}
                    filterOption={false}
                    notFoundContent={isLoadingOptions ? <Spin size="small" /> : null}
                    loading={isLoadingOptions}
                  >
                    {options.map(option => (
                      <Select.Option key={option.key} value={option.key}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </li>
                <li className="frCustom width50">
                  <div className="title">Project Type</div>
                  <div className="radio">
                    <>
                      <RadioGroup name={optionPjtType.name} values={optionPjtType.values} />
                    </>
                  </div>
                </li>

                <li>
                  <div className="title">기간</div>
                  <DatePicker label={optionTerm.label} values={optionTerm.values} type="range" />
                </li>

                <li>
                  <div className="title">장비</div>
                  <ul className="sub_form small2">
                    <li>
                      <label className="title" htmlFor="fab">
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
                    <li>
                      <label className="title" htmlFor="area">
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
                      <label className="title" htmlFor="keyno">
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
                      <label className="title" htmlFor="model">
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
              <PersonalReportDetail enableFixView={() => {}} disableFixView={() => {}} requestQuery={detailRequestQuery} userid={authInfo?.empNo || ''} />
            )
          }
        />
      </Spin>
      <GlobalStyle />
    </div>
  );
};
export default PersonalRecord;
