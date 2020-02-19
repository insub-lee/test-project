import React from 'react';

import LabelComp from 'components/BizBuilder/Field/LabelComp';
import FmeaLabelComp from 'components/BizBuilder/Field/FmeaLabelComp';
import LabelWithCopyComp from 'components/BizBuilder/Field/LabelWithCopyComp';
import TextComp from 'components/BizBuilder/Field/TextComp';
import EditorComp from 'components/BizBuilder/Field/EditorComp';
import FmeaTextareaComp from 'components/BizBuilder/Field/FmeaTextareaComp';
import InsertBtnComp from 'components/BizBuilder/Field/InsertBtnComp';
import ModalInsertBtnComp from 'components/BizBuilder/Field/ModalInsertBtnComp';
import AttachComp from 'components/BizBuilder/Field/AttachComp';
import DragUploadComp from 'components/BizBuilder/Field/DragUploadComp';
import DragUploadMDCSComp from 'components/BizBuilder/Field/DragUploadMDCSComp';
import TreeSelectComp from 'components/BizBuilder/Field/TreeSelectComp';
import SelectComp from 'components/BizBuilder/Field/SelectComp';
import ReadOnlyTextComp from 'components/BizBuilder/Field/ReadOnlyTextComp';
import CheckboxComp from 'components/BizBuilder/Field/CheckboxComp';
import RadioComp from 'components/BizBuilder/Field/RadioComp';
import RadioYnComp from 'components/BizBuilder/Field/RadioYnComp';
import DocSelectComp from 'components/BizBuilder/Field/DocSelectComp';
import CustomCheckListComp from 'components/BizBuilder/Field/CustomCheckListComp';
import CheckListComp from 'components/BizBuilder/Field/CheckListComp';
import DwCheckListComp from 'components/BizBuilder/Field/DwCheckListComp';
import TitleComp from 'components/BizBuilder/Field/TitleComp';
import LabelViewComp from 'components/BizBuilder/Field/LabelViewComp';
import LabelVersion from 'components/BizBuilder/Field/LabelVersion';
import Label from 'components/BizBuilder/Field/Label';
import DocNumberComp from 'components/BizBuilder/Field/DocNumberComp';
import LabelDate from 'components/BizBuilder/Field/LabelDate';
import LabelNumber from 'components/BizBuilder/Field/LabelNumber';
import DocStatusLabel from 'components/BizBuilder/Field/DocStatusLabel';
import UserInfoComp from 'components/BizBuilder/Field/UserInfoComp';
import SummerNoteEditorComp from 'components/BizBuilder/Field/SummerNoteEditor';
import TextareaComp from 'components/BizBuilder/Field/TextareaComp';
import NumberComp from 'components/BizBuilder/Field/NumberComp';
import NodeIdComp from 'components/BizBuilder/Field/NodeIdComp';
import RadioCharComp from 'components/BizBuilder/Field/RadioCharComp';
import FmeaFlagLabelComp from 'components/BizBuilder/Field/FmeaFlagLabelComp';
import FmeaFlagRadioCharComp from 'components/BizBuilder/Field/FmeaFlagRadioCharComp';
import IFoundryLabelComp from 'components/BizBuilder/Field/IFoundryLabelComp';
import IFoundryTextareaComp from 'components/BizBuilder/Field/IFoundryTextareaComp';
import DCRBLabelComp from 'components/BizBuilder/Field/DCRBLabelComp';
import DCRBTextComp from 'components/BizBuilder/Field/DCRBTextComp';
import DwSelectLabelComp from 'components/BizBuilder/Field/DwSelectLabelComp';
import DwSelectComp from 'components/BizBuilder/Field/DwSelectComp';
import SelectIntComp from 'components/BizBuilder/Field/SelectIntComp';
import RadioMaterialComp from 'components/BizBuilder/Field/RadioMaterialComp';
import RadioMaterialLabelComp from 'components/BizBuilder/Field/RadioMaterialLabelComp';
import RadioPopupComp from 'components/BizBuilder/Field/RadioPopupComp';
import SelectYearComp from 'components/BizBuilder/Field/SelectYearComp';
import SelectSiteComp from 'components/BizBuilder/Field/SelectSiteComp';
import ManageCodeComp from 'components/BizBuilder/Field/ManageCodeComp';
import JoinReadComp from 'components/BizBuilder/Field/JoinReadComp';
import AttachDownComp from 'components/BizBuilder/Field/AttachDownComp';
import DatePickerComp from 'components/BizBuilder/Field/DatePickerComp';
import BusinessNumberComp from 'components/BizBuilder/Field/BusinessNumberComp';
import TitleModalComp from 'components/BizBuilder/Field/TitleModalComp';
import LabelDateWithoutTime from 'components/BizBuilder/Field/LabelDateWithoutTime';
import SelectInputSearchComp from 'components/BizBuilder/Field/SelectInputSearchComp';
import LawMasterSeqComp from 'components/BizBuilder/Field/LawMasterSeqComp';
import UserSelectComp from 'components/BizBuilder/Field/UserSelectComp';
import JoinToolTipComp from 'components/BizBuilder/Field/JoinToolTipComp';
import LawClauseSeqComp from 'components/BizBuilder/Field/LawClauseSeqComp';
import TitleModalPlusComp from 'components/BizBuilder/Field/TitleModalPlusComp';
import CheckableTreeSelectComp from 'components/BizBuilder/Field/CheckableTreeSelectComp';
import RoadmapCategoryComp from 'components/BizBuilder/Field/RoadmapCategoryComp';

export const CompInfo = {
  'components/BizBuilder/Field/LabelComp': { renderer: property => <LabelComp {...property} /> },
  'components/BizBuilder/Field/FmeaLabelComp': { renderer: property => <FmeaLabelComp {...property} /> },
  'components/BizBuilder/Field/LabelWithCopyComp': { renderer: property => <LabelWithCopyComp {...property} /> },
  'components/BizBuilder/Field/TextComp': { renderer: property => <TextComp {...property} /> },
  'components/BizBuilder/Field/EditorComp': { renderer: property => <EditorComp {...property} /> },
  'components/BizBuilder/Field/FmeaTextareaComp': { renderer: property => <FmeaTextareaComp {...property} /> },
  'components/BizBuilder/Field/InsertBtnComp': { renderer: property => <InsertBtnComp {...property} /> },
  'components/BizBuilder/Field/ModalInsertBtnComp': { renderer: property => <ModalInsertBtnComp {...property} /> },
  'components/BizBuilder/Field/AttachComp': { renderer: property => <AttachComp {...property} /> },
  'components/BizBuilder/Field/DragUploadComp': { renderer: property => <DragUploadComp {...property} /> },
  'components/BizBuilder/Field/DragUploadMDCSComp': { renderer: property => <DragUploadMDCSComp {...property} /> },
  'components/BizBuilder/Field/TreeSelectComp': { renderer: property => <TreeSelectComp {...property} /> },
  'components/BizBuilder/Field/SelectComp': { renderer: property => <SelectComp {...property} /> },
  'components/BizBuilder/Field/ReadOnlyTextComp': { renderer: property => <ReadOnlyTextComp {...property} /> },
  'components/BizBuilder/Field/CheckboxComp': { renderer: property => <CheckboxComp {...property} /> },
  'components/BizBuilder/Field/RadioComp': { renderer: property => <RadioComp {...property} /> },
  'components/BizBuilder/Field/RadioYnComp': { renderer: property => <RadioYnComp {...property} /> },
  'components/BizBuilder/Field/DocSelectComp': { renderer: property => <DocSelectComp {...property} /> },
  'components/BizBuilder/Field/CustomCheckListComp': { renderer: property => <CustomCheckListComp {...property} /> },
  'components/BizBuilder/Field/CheckListComp': { renderer: property => <CheckListComp {...property} /> },
  'components/BizBuilder/Field/DwCheckListComp': { renderer: property => <DwCheckListComp {...property} /> },
  'components/BizBuilder/Field/TitleComp': { renderer: property => <TitleComp {...property} /> },
  'components/BizBuilder/Field/LabelViewComp': { renderer: property => <LabelViewComp {...property} /> },
  'components/BizBuilder/Field/LabelVersion': { renderer: property => <LabelVersion {...property} /> },
  'components/BizBuilder/Field/Label': { renderer: property => <Label {...property} /> },
  'components/BizBuilder/Field/DocNumberComp': { renderer: property => <DocNumberComp {...property} /> },
  'components/BizBuilder/Field/LabelDate': { renderer: property => <LabelDate {...property} /> },
  'components/BizBuilder/Field/LabelNumber': { renderer: property => <LabelNumber {...property} /> },
  'components/BizBuilder/Field/DocStatusLabel': { renderer: property => <DocStatusLabel {...property} /> },
  'components/BizBuilder/Field/UserInfoComp': { renderer: property => <UserInfoComp {...property} /> },
  'components/BizBuilder/Field/SummerNoteEditorComp': { renderer: property => <SummerNoteEditorComp {...property} /> },
  'components/BizBuilder/Field/TextareaComp': { renderer: property => <TextareaComp {...property} /> },
  'components/BizBuilder/Field/NumberComp': { renderer: property => <NumberComp {...property} /> },
  'components/BizBuilder/Field/NodeIdComp': { renderer: property => <NodeIdComp {...property} /> },
  'components/BizBuilder/Field/RadioCharComp': { renderer: property => <RadioCharComp {...property} /> },
  'components/BizBuilder/Field/FmeaFlagLabelComp': { renderer: property => <FmeaFlagLabelComp {...property} /> },
  'components/BizBuilder/Field/FmeaFlagRadioCharComp': { renderer: property => <FmeaFlagRadioCharComp {...property} /> },
  'components/BizBuilder/Field/IFoundryLabelComp': { renderer: property => <IFoundryLabelComp {...property} /> },
  'components/BizBuilder/Field/IFoundryTextareaComp': { renderer: property => <IFoundryTextareaComp {...property} /> },
  'components/BizBuilder/Field/DCRBLabelComp': { renderer: property => <DCRBLabelComp {...property} /> },
  'components/BizBuilder/Field/DCRBTextComp': { renderer: property => <DCRBTextComp {...property} /> },
  'components/BizBuilder/Field/DwSelectLabelComp': { renderer: property => <DwSelectLabelComp {...property} /> },
  'components/BizBuilder/Field/DwSelectComp': { renderer: property => <DwSelectComp {...property} /> },
  'components/BizBuilder/Field/SelectIntComp': { renderer: property => <SelectIntComp {...property} /> },
  'components/BizBuilder/Field/RadioMaterialComp': { renderer: property => <RadioMaterialComp {...property} /> },
  'components/BizBuilder/Field/RadioMaterialLabelComp': { renderer: property => <RadioMaterialLabelComp {...property} /> },
  'components/BizBuilder/Field/RadioPopupComp': { renderer: property => <RadioPopupComp {...property} /> },
  'components/BizBuilder/Field/SelectYearComp': { renderer: property => <SelectYearComp {...property} /> },
  'components/BizBuilder/Field/SelectSiteComp': { renderer: property => <SelectSiteComp {...property} /> },
  'components/BizBuilder/Field/ManageCodeComp': { renderer: property => <ManageCodeComp {...property} /> },
  'components/BizBuilder/Field/JoinReadComp': { renderer: property => <JoinReadComp {...property} /> },
  'components/BizBuilder/Field/AttachDownComp': { renderer: property => <AttachDownComp {...property} /> },
  'components/BizBuilder/Field/TitleModalComp': { renderer: property => <TitleModalComp {...property} /> },
  'components/BizBuilder/Field/DatePickerComp': { renderer: property => <DatePickerComp {...property} /> },
  'components/BizBuilder/Field/LabelDateWithoutTime': { renderer: property => <LabelDateWithoutTime {...property} /> },
  'components/BizBuilder/Field/BusinessNumberComp': { renderer: property => <BusinessNumberComp {...property} /> },
  'components/BizBuilder/Field/SelectInputSearchComp': { renderer: property => <SelectInputSearchComp {...property} /> },
  'components/BizBuilder/Field/LawMasterSeqComp': { renderer: property => <LawMasterSeqComp {...property} /> },
  'components/BizBuilder/Field/UserSelectComp': { renderer: property => <UserSelectComp {...property} /> },
  'components/BizBuilder/Field/JoinToolTipComp': { renderer: property => <JoinToolTipComp {...property} /> },
  'components/BizBuilder/Field/LawClauseSeqComp': { renderer: property => <LawClauseSeqComp {...property} /> },
  'components/BizBuilder/Field/TitleModalPlusComp': { renderer: property => <TitleModalPlusComp {...property} /> },
<<<<<<< HEAD
  'components/BizBuilder/Field/CheckableTreeSelectComp': { renderer: property => <CheckableTreeSelectComp {...property} /> },
=======
  'components/BizBuilder/Field/RoadmapCategoryComp': { renderer: property => <RoadmapCategoryComp {...property} /> },
>>>>>>> origin/magnachip
};
