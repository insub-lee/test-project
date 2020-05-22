import React from 'react';

import LabelWithCopyCompConfig from 'components/BizBuilder/Field/LabelWithCopyCompConfig';
import TextCompConfig from 'components/BizBuilder/Field/TextCompConfig';
import TreeSelectCompConfig from 'components/BizBuilder/Field/TreeSelectCompConfig';
import SelectCompConfig from 'components/BizBuilder/Field/SelectCompConfig';
import CheckListCompConfig from 'components/BizBuilder/Field/CheckListCompConfig';
import CheckboxCompConfig from 'components/BizBuilder/Field/CheckboxCompConfig';
import DocSelectCompConfig from 'components/BizBuilder/Field/DocSelectCompConfig';
import ReadOnlyTextCompConfig from 'components/BizBuilder/Field/ReadOnlyTextCompConfig';
import RadioCompConfig from 'components/BizBuilder/Field/RadioCompConfig';
import DwCheckListCompConfig from 'components/BizBuilder/Field/DwCheckListCompConfig';
import DocStatusLabelConfig from 'components/BizBuilder/Field/DocStatusLabelConfig';
import RadioCharCompConfig from 'components/BizBuilder/Field/RadioCharCompConfig';
import JoinReadCompConfig from 'components/BizBuilder/Field/JoinReadCompConfig';
import DragUploadCompConfig from 'components/BizBuilder/Field/DragUploadCompConfig';
import DragUploadPdfCompConfig from 'components/BizBuilder/Field/DragUploadPdfCompConfig';
import NumberCompUnitConfig from 'components/BizBuilder/Field/NumberCompUnitConfig';
import TreeSelectRootKeyCompConfig from 'components/BizBuilder/Field/TreeSelectRootKeyCompConfig';
import SelectYearCompConfig from 'components/BizBuilder/Field/SelectYearCompConfig';
import CustomValueSelectCompConfig from 'components/BizBuilder/Field/CustomValueSelectCompConfig';
import ViewUploadedFileCompConfig from 'components/BizBuilder/Field/ViewUploadedFileCompConfig';
import CustomDataTableCompConfig from 'components/BizBuilder/Field/CustomDataTableCompConfig';
import ModalTableCompConfig from 'components/BizBuilder/Field/ModalTableCompConfig';
import EshsSearchbarConfig from 'components/BizBuilder/Field/EshsSearchbarConfig';
import DragUploadMDCSViewCompConfig from 'components/BizBuilder/Field/DragUploadMDCSViewCompConfig';
import CoverViewCompConfig from 'components/BizBuilder/Field/CoverViewCompConfig';
import DatePickerCompConfig from 'components/BizBuilder/Field/DatePickerCompConfig';
import TitleCompConfig from 'components/BizBuilder/Field/TitleCompConfig';
import CustomBuilderListConfig from 'components/BizBuilder/Field/CustomBuilderListConfig';
import ExcelDownloadCompConfig from 'components/BizBuilder/Field/ExcelDownloadCompConfig';
import RootKeyRadioConfig from 'components/BizBuilder/Field/RootKeyRadioConfig';
import ProfileConfig from 'components/BizBuilder/Field/ProfileConfig';
import EshsCondConfig from 'components/BizBuilder/Field/EshsCondConfig';
import ChangeReadDataCompConfig from 'components/BizBuilder/Field/ChangeReadDataCompConfig';
import EshsInterLockConfig from 'components/BizBuilder/Field/EshsInterLockConfig';
import CustomSelectSearchConfig from 'components/BizBuilder/Field/CustomSelectSearchConfig';
import CustomSearchInputConfig from 'components/BizBuilder/Field/CustomSearchInputConfig';
import LabelByNodeIdConfig from 'components/BizBuilder/Field/LabelByNodeIdConfig';
import EshsQualCondConfig from 'components/BizBuilder/Field/EshsQualCondConfig';
import ListButtonConfig from 'components/BizBuilder/Field/ListButtonConfig';
import UserSelectConfig from 'components/BizBuilder/Field/UserSelectConfig';
import MultiUserSelectConfig from 'components/BizBuilder/Field/MultiUserSelectConfig';
import EshsQualHeaderConfig from 'components/BizBuilder/Field/EshsQualHeaderConfig';
import DefaultValueConfig from 'components/BizBuilder/Field/DefaultValueConfig';
import TextDefaultValueConfig from 'components/BizBuilder/Field/TextDefaultValueConfig';
import JsonTableConfig from 'components/BizBuilder/Field/JsonTableConfig';

export const ConfigInfo = {
  'components/BizBuilder/Field/TextCompConfig': { renderer: property => <TextCompConfig {...property} /> },
  'components/BizBuilder/Field/TreeSelectCompConfig': { renderer: property => <TreeSelectCompConfig {...property} /> },
  'components/BizBuilder/Field/SelectCompConfig': { renderer: property => <SelectCompConfig {...property} /> },
  'components/BizBuilder/Field/CheckboxCompConfig': { renderer: property => <CheckboxCompConfig {...property} /> },
  'components/BizBuilder/Field/DocSelectCompConfig': { renderer: property => <DocSelectCompConfig {...property} /> },
  'components/BizBuilder/Field/ReadOnlyTextCompConfig': { renderer: property => <ReadOnlyTextCompConfig {...property} /> },
  'components/BizBuilder/Field/CheckListCompConfig': { renderer: property => <CheckListCompConfig {...property} /> },
  'components/BizBuilder/Field/RadioCompConfig': { renderer: property => <RadioCompConfig {...property} /> },
  'components/BizBuilder/Field/DwCheckListCompConfig': { renderer: property => <DwCheckListCompConfig {...property} /> },
  'components/BizBuilder/Field/LabelWithCopyCompConfig': { renderer: property => <LabelWithCopyCompConfig {...property} /> },
  'components/BizBuilder/Field/DocStatusLabelConfig': { renderer: property => <DocStatusLabelConfig {...property} /> },
  'components/BizBuilder/Field/RadioCharCompConfig': { renderer: property => <RadioCharCompConfig {...property} /> },
  'components/BizBuilder/Field/JoinReadCompConfig': { renderer: property => <JoinReadCompConfig {...property} /> },
  'components/BizBuilder/Field/DragUploadCompConfig': { renderer: property => <DragUploadCompConfig {...property} /> },
  'components/BizBuilder/Field/DragUploadPdfCompConfig': { renderer: property => <DragUploadPdfCompConfig {...property} /> },
  'components/BizBuilder/Field/NumberCompUnitConfig': { renderer: property => <NumberCompUnitConfig {...property} /> },
  'components/BizBuilder/Field/TreeSelectRootKeyCompConfig': { renderer: property => <TreeSelectRootKeyCompConfig {...property} /> },
  'components/BizBuilder/Field/SelectYearCompConfig': { renderer: property => <SelectYearCompConfig {...property} /> },
  'components/BizBuilder/Field/CustomValueSelectCompConfig': { renderer: property => <CustomValueSelectCompConfig {...property} /> },
  'components/BizBuilder/Field/ViewUploadedFileCompConfig': { renderer: property => <ViewUploadedFileCompConfig {...property} /> },
  'components/BizBuilder/Field/CustomDataTableCompConfig': { renderer: property => <CustomDataTableCompConfig {...property} /> },
  'components/BizBuilder/Field/ModalTableCompConfig': { renderer: property => <ModalTableCompConfig {...property} /> },
  'components/BizBuilder/Field/EshsSearchbarConfig': { renderer: property => <EshsSearchbarConfig {...property} /> },
  'components/BizBuilder/Field/DragUploadMDCSViewCompConfig': { renderer: property => <DragUploadMDCSViewCompConfig {...property} /> },
  'components/BizBuilder/Field/CoverViewCompConfig': { renderer: property => <CoverViewCompConfig {...property} /> },
  'components/BizBuilder/Field/DatePickerCompConfig': { renderer: property => <DatePickerCompConfig {...property} /> },
  'components/BizBuilder/Field/TitleCompConfig': { renderer: property => <TitleCompConfig {...property} /> },
  'components/BizBuilder/Field/CustomBuilderListConfig': { renderer: property => <CustomBuilderListConfig {...property} /> },
  'components/BizBuilder/Field/ExcelDownloadCompConfig': { renderer: property => <ExcelDownloadCompConfig {...property} /> },
  'components/BizBuilder/Field/RootKeyRadioConfig': { renderer: property => <RootKeyRadioConfig {...property} /> },
  'components/BizBuilder/Field/ProfileConfig': { renderer: property => <ProfileConfig {...property} /> },
  'components/BizBuilder/Field/EshsCondConfig': { renderer: property => <EshsCondConfig {...property} /> },
  'components/BizBuilder/Field/ChangeReadDataCompConfig': { renderer: property => <ChangeReadDataCompConfig {...property} /> },
  'components/BizBuilder/Field/EshsInterLockConfig': { renderer: property => <EshsInterLockConfig {...property} /> },
  'components/BizBuilder/Field/CustomSelectSearchConfig': { renderer: property => <CustomSelectSearchConfig {...property} /> },
  'components/BizBuilder/Field/CustomSearchInputConfig': { renderer: property => <CustomSearchInputConfig {...property} /> },
  'components/BizBuilder/Field/LabelByNodeIdConfig': { renderer: property => <LabelByNodeIdConfig {...property} /> },
  'components/BizBuilder/Field/EshsQualCondConfig': { renderer: property => <EshsQualCondConfig {...property} /> },
  'components/BizBuilder/Field/ListButtonConfig': { renderer: property => <ListButtonConfig {...property} /> },
  'components/BizBuilder/Field/UserSelectConfig': { renderer: property => <UserSelectConfig {...property} /> },
  'components/BizBuilder/Field/MultiUserSelectConfig': { renderer: property => <MultiUserSelectConfig {...property} /> },
  'components/BizBuilder/Field/EshsQualHeaderConfig': { renderer: property => <EshsQualHeaderConfig {...property} /> },
  'components/BizBuilder/Field/DefaultValueConfig': { renderer: property => <DefaultValueConfig {...property} /> },
  'components/BizBuilder/Field/TextDefaultValueConfig': { renderer: property => <TextDefaultValueConfig {...property} /> },
  'components/BizBuilder/Field/JsonTableConfig': { renderer: property => <JsonTableConfig {...property} /> },
};
